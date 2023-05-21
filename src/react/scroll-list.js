import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { fromEvent, of } from 'rxjs';
import { throttleTime, map, switchMap, takeUntil, filter } from 'rxjs/operators';

function App() {
    const [dataList, setDataList] = useState([]);
    // 模拟异步加载数据的函数，返回一个 Promise 对象
    const loadMoreData = () => {
        // 模拟异步加载数据
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push(`Item ${i}`);
        }
        return Promise.resolve(data);
    };
    useEffect(() => {
        const list = document.querySelector('#load-more-list');
        const loadMoreBtn = document.querySelector('#load-more-btn');

        // 监听滚动事件，当滚动到底部时发出事件
        const scroll$ = fromEvent(list, 'scroll');
        // .pipe(
        //     throttleTime(500),
        //     map(() => list.scrollHeight - list.scrollTop <= list.clientHeight),
        //     filter(atBottom => atBottom)
        // );

        // 监听加载更多按钮点击事件
        const loadMoreBtn$ = fromEvent(loadMoreBtn, 'click');

        // 合并滚动事件和加载更多按钮点击事件，以便在任何一个事件发生时加载更多数据
        const loadMore$ = scroll$.pipe(
            throttleTime(500),
            map((event) => event.target.scrollTop),
            // switchMap(() => loadMoreData()),
            switchMap((scrollTop) => {
                if (scrollTop > 10) {
                  return loadMoreData();
                } else {
                  return of([]);
                }
              }),
            takeUntil(loadMoreBtn$)
        );

        // 订阅 `loadMore$` 可观察对象以加载更多数据，并将其添加到列表中
        const subscription = loadMore$.subscribe({
            next: data => {
                console.log('subscribe data:', data);
                setDataList(prevList => [...prevList, ...data]);
            }
        });
        // 在组件卸载时取消订阅
        return () => {
            subscription.unsubscribe();
        };
    }, [dataList]);

    return (
        <><ul id="load-more-list">
            <li>11111</li>
            <li>11111</li>
            <li>11111</li>
            <li>11111</li>
            <li>11111</li>
            <li>11111</li>
            <li>11111</li>
            <li>11111</li>
            {dataList.map((text, index) => (
                <li key={index}>{text}</li>
            ))}
        </ul><div id="load-more-btn">按钮</div></>
    );
}
    
export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);




