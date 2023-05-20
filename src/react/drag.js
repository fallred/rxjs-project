import { fromEvent } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client';

const DraggableDiv = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mouseDown = fromEvent(ref.current, "mousedown");
    const mouseMove = fromEvent(document, "mousemove");
    const mouseUp = fromEvent(document, "mouseup");

    const drag = mouseDown.pipe(
      map((event) => {
        event.preventDefault();
        return {
          x: event.clientX, 
          y: event.clientY,
          left: ref.current.offsetLeft,
          top: ref.current.offsetTop
        };
      }),
      map((startPosition) =>
        mouseMove.pipe(
          map((event) => {
            event.preventDefault();
            return {
              x: event.clientX,
              y: event.clientY
            };
          }),
          map((position) => ({
            x: position.x - startPosition.x + startPosition.left,
            y: position.y - startPosition.y + startPosition.top
          })),
          takeUntil(mouseUp)
        )
      )
    );

    const subscription = drag.subscribe((position) => setPosition(position));
    return () => subscription.unsubscribe();
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        backgroundColor: isDragging ? "lightblue" : "orange",
        width: "100px",
        height: "100px",
        cursor: "move"
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      Drag Me!
    </div>
  );
};

// export default DraggableDiv;

const root = createRoot(document.getElementById('root'));
root.render(<DraggableDiv />);