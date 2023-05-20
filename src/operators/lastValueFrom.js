import { lastValueFrom, interval, take } from 'rxjs';

const source$ = interval(1000)
// take：过滤操作符，获取最新的值。
const lastValue = lastValueFrom(source$.pipe(take(5)));
lastValue.then(val => console.log(val))