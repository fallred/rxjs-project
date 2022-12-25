import { of, from } from './rxjs';
const arrayLikeObservable = of(1, 2, 3);

arrayLikeObservable.subscribe({
  next: value => console.log('arrayLikeObservable', value),
  complete: () => console.log('arrayLikeObservable complete')
});

const promiseLikeObservable = from(Promise.resolve(4));

promiseLikeObservable.subscribe({
  next: value => console.log('promiseLikeObservable', value),
  complete: () => console.log('promiseLikeObservable complete')
}); 