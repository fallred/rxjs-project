import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { fromEvent, interval } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const subscription = fromEvent(document.getElementById("menuButton"), "click")
      .pipe(
        switchMap(() => interval(10)),
        map((count) => count / 100),
        take(100)
      )
      .subscribe((value) => {
        document.getElementById("menu").style.transform = `scale(${isOpen ? 1 - value : value})`;
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [isOpen]);

  return (
    <div>
      <button id="menuButton">{isOpen ? "Close" : "Open"}</button>
      <div id="menu">
        <li key="1">11111</li>
        <li key="2">2222</li>
        <li key="3">3333</li>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);