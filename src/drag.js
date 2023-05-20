import { fromEvent, withLatestFrom, takeUntil, switchMap, throttleTime } from 'rxjs';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const DraggableDiv = () => {
  const draggableRef = useRef(null);

  useEffect(() => {
    const draggableElement = draggableRef.current;
    const mouseDown$ = fromEvent(draggableElement, 'mousedown');
    const mouseMove$ = fromEvent(document, 'mousemove').pipe(throttleTime(30));
    const mouseUp$ = fromEvent(document, 'mouseup');

    const subscription = mouseDown$.pipe(
      switchMap(() => mouseMove$.pipe(takeUntil(mouseUp$))),
      withLatestFrom(mouseDown$, (moveEvent, downEvent) => {
        return {
          left: moveEvent.clientX - downEvent.offsetX,
          top: moveEvent.clientY - downEvent.offsetY
        }
      })
    ).subscribe(({ left, top }) => {
      draggableElement.style.left = left + 'px';
      draggableElement.style.top = top + 'px';
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      ref={draggableRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100px',
        height: '100px',
        backgroundColor: 'orange',
        cursor: 'move',
      }}
    >
      Drag Me!
    </div>
  );
};

// export default DraggableDiv;

const root = createRoot(document.getElementById('root'));
root.render(<DraggableDiv />);