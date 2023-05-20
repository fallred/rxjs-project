import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

// tap 操作符用于在 Observable 发出值之前或之后执行副作用。它不会改变 Observable 发出的值，只是在发出值之前或之后执行一些操作

const source$ = of(1, 2, 3);

source$.pipe(
  tap(value => console.log(`Source value: ${value}`)),
  tap(value => console.log(`Doubled value: ${value * 2}`)),
).subscribe();