import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

function Form() {
    const [inputValue, setInputValue] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    
    const minLength = 6;

    // 用于验证输入的函数
    function validateInput(value) {
        if (value.length < minLength) {
            return '输入长度必须大于等于 ' + minLength;
        } else {
            return null;
        }
    }

    useEffect(() => {
        // 创建一个 Observable，用于监听 input 元素的输入事件
        const input$ = fromEvent(document.querySelector('input'), 'input').pipe(
        map(event => event.target.value), // 提取输入的值
            debounceTime(300), // 等待 300 毫秒后才处理值
            distinctUntilChanged() // 仅在值发生变化时才处理
        );

        // 创建另一个 Observable，用于验证输入的值，并更新验证消息的内容
        const validationMessage$ = input$.pipe(
            map(value => validateInput(value)) // 验证输入的值
        );
        const subscription = validationMessage$.subscribe(message => {
            setValidationMessage(message || '');
        });

        // 在组件卸载时取消订阅
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <form>
        <label>
            输入：
            <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            />
        </label>
        {validationMessage && (
            <div className="validation-message">{validationMessage}</div>
        )}
        </form>
    );
}
    
export default Form;

const root = createRoot(document.getElementById('root'));
root.render(<Form />);