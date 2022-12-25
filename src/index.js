import { of, map, filter } from './rxjs';

/* of(1, 2, 3)
  .pipe(map(val => val * 2))//[2,4,6]
  .pipe(filter(val => val > 3))//[4,6]
  .pipe(map(val => val + 1))//[5,7]
  .subscribe(console.log)//5 7
 */

of(1, 2, 3)
  .pipe(map(val => val * 2), filter(val => val > 3), map(val => val + 1))//[2,4,6]
  .subscribe(console.log)//5 7