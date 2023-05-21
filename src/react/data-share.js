import { from, of } from "rxjs";
import { switchMap, catchError, shareReplay } from "rxjs/operators";

const fetchData = (url) => {
  return from(fetch(url)).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(response.json());
      } else {
        return throwError("Error fetching data");
      }
    }),
    catchError((error) => {
      console.error(error);
      return of([]);
    }),
    shareReplay(1) // 缓存最近的 1 个数据项
  );
};

fetchData("https://jsonplaceholder.typicode.com/posts").subscribe(
  (data) => console.log(data),
  (error) => console.error(error)
);

setTimeout(() => {
  // 5 秒后再次订阅
  fetchData("https://jsonplaceholder.typicode.com/posts").subscribe(
    (data) => console.log(data),
    (error) => console.error(error)
  );
}, 5000);