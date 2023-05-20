// 当作Observable
import { Subject, from } from 'rxjs';

// const source$ = new Subject();
// source$.subscribe((val) => console.log('Subject订阅A', val));
// source$.next(1);
// source$.next(2);
// source$.subscribe((val) => console.log('Subject订阅B', val));
// source$.next(3);
// source$.next(4);

// 当作observer
const subject = new Subject();
subject.subscribe({
    next: (v) => {console.log('observerA:', v)}
});
subject.subscribe({
    next: (v) => {console.log('observerB:', v)}
});
const observable = from([1,2,3]);
observable.subscribe(subject);


// const source = from([1, 2, 3]);
// const subject = new Subject();
// // const multicasted = source.pipe(multicast(subject));
// const multicasted = source.multicast(subject);

// // 在底层使用了 `subject.subscribe({...})`:
// multicasted.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// multicasted.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });

// // 在底层使用了 `source.subscribe(subject)`:
// multicasted.connect();