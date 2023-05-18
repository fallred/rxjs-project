// 当作Observable
import { Subject, from } from 'rxjs';

const source$ = new Subject();
source$.subscribe((val) => console.log('Subject订阅A', val));
source$.next(1);
source$.next(2);
source$.subscribe((val) => console.log('Subject订阅B', val));
source$.next(3);
source$.next(4);

// 当作observer
// const subject = new Subject();
// subject.subscribe({
//     next: (v) => {console.log('observerA:', v)}
// });
// subject.subscribe({
//     next: (v) => {console.log('observerB:', v)}
// });
// const observable = from([1,2,3]);
// observable.subscribe(subject);