import { interval } from 'rxjs';

var observable1 = interval(400);
var observable2 = interval(300);

var subscription = observable1.subscribe(x => console.log('first: ' + x));
var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // subscription 和 childSubscription 都会取消订阅
  subscription.unsubscribe();
}, 1000);
