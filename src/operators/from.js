import { Observable, from } from 'rxjs';

/**
 * 
 * of 和 from 都是用于创建 Observable 的 RxJS 操作符，它们之间的主要区别在于它们接收的参数类型。
of 操作符接收任意数量的参数，然后创建一个 Observable，它会依次发出这些参数的值。例如，of(1, 2, 3) 会创建一个 Observable，它依次发出值 1、2 和 3。
from 操作符接收一个数组、类数组对象、Promise 或 Iterable，并创建一个 Observable，它会依次发出这些对象的值。例如，from([1, 2, 3]) 会创建一个 Observable，它依次发出值 1、2 和 3。
因此，of 操作符适用于创建一个发出少量值的 Observable，而 from 操作符适用于将一个数组或类数组对象转换成 Observable。如果要将一个 Promise 转换成 Observable，也可以使用 from 操作符。
 */
function multiplyByTen(input) {
    var output = Observable.create(function subscribe(observer) {
      input.subscribe({
        next: (v) => observer.next(10 * v),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
    });
    return output;
  }
  
  var input = from([1, 2, 3, 4]);
  var output = multiplyByTen(input);
  output.subscribe(x => console.log(x));