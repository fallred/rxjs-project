import { interval, from } from 'rxjs';
import { switchMap, retry } from 'rxjs/operators';

// 模拟获取最新数据的函数
function fetchData() {
  const isSuccess = Math.random() < 0.7; // 70% 的概率成功，30% 的概率失败
  if (isSuccess) {
    return Promise.resolve(Math.round(Math.random() * 100));
  } else {
    const error = new Error('Failed to fetch data');
    error['retryable'] = true; // 标记错误是可以重试的
    return Promise.reject(error);
  }
}
// 每 5 秒钟获取一次最新数据，最多重试 3 次
const source$ = interval(5000).pipe(
    switchMap(() => from(fetchData()).pipe(retry((error, attempt) => {
      if (attempt < 3 && error['retryable']) {
        console.log(`Retry attempt ${attempt + 1}`);
        return true;
      } else {
        console.log('Stop retrying');
        return false;
      }
    })))
);
  
source$.subscribe(
    value => console.log(value),
    error => console.error(error)
);