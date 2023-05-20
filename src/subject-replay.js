import { ReplaySubject } from 'rxjs';

var subject = new ReplaySubject(3); // 为新的订阅者缓冲3个值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);