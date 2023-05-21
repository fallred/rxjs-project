import { from, of, throwError } from "rxjs";
import { switchMap, catchError, reduce } from "rxjs/operators";
import axios from 'axios';

const fetchData = (url) => {
  return from(axios.get(url)).pipe(
    switchMap((response) => {
        // console.log('response.data:', response.data);
        if (response.status === 200) {
            return from(response.data);
        } else {
            return throwError("Error fetching data");
        }
        // return response.data;
    }),
    catchError((error) => {
      console.error(error);
      return of([]);
    }),
    // 必须要要将数据累积成数组。
    reduce((acc, value) => [...acc, value], [])
  );
};

fetchData("https://jsonplaceholder.typicode.com/posts").subscribe({
    next: (data) => {
        console.log('next data:', data);
    },
    error: (error) => console.error(error)
});
