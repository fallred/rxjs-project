import { Observable } from './rxjs';
//可观察对象
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4);
});
//observer
/* const observer = {
  next: (value) => console.log(`next value:`, value),
  complete: () => console.log('complete')
}; */
//subscribe参数可以传一个观察者对象，也可以只传一个next函数
observable.subscribe((value) => console.log(`next value:`, value));