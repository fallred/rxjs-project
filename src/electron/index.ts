import { app } from 'electron';
import { webSocket } from 'rxjs/webSocket';

const ws = webSocket('ws://localhost:8000');

const rpcMessage$ = ws.pipe(
  map(message => JSON.parse(message.data)),
  filter(message => message.type === 'rpc')
);

const rpcMessageSubscription = rpcMessage$.subscribe(
  message => {
    // 将消息保存到本地存储中
    const messages = JSON.parse(localStorage.getItem('rpcMessages') || '[]');
    messages.push(message);
    localStorage.setItem('rpcMessages', JSON.stringify(messages));
  },
  error => {
    console.error(error);
  }
);

// 当应用程序关闭时取消订阅
app.on('before-quit', () => {
  rpcMessageSubscription.unsubscribe();
});

// 读取持久化的消息
const messages = JSON.parse(localStorage.getItem('rpcMessages') || '[]');