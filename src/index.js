import { timer, interval, take } from './rxjs';
interval(1000)
  .pipe(take(5))
  .subscribe(console.log)