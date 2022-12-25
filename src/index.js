import { fromEvent } from './rxjs';
const eventObservable = fromEvent(document, 'click');
const subscriber = eventObservable.subscribe(console.log);

setTimeout(() => {
  subscriber.unsubscribe();
}, 3000);