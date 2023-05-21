import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

function App() {

    useEffect(() => {
        const button = document.getElementById("button");
        const subscription = fromEvent(button, "click")
        .pipe(
          throttleTime(1000),
          map((event) => event.target.innerText)
        )
        .subscribe((text) => console.log(text));
        // 在组件卸载时取消订阅
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div id="button">按钮</div>
    );
}
    
export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);
