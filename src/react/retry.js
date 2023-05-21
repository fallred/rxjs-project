import { from, throwError, of } from "rxjs";
import { switchMap, retryWhen, delay } from "rxjs/operators";
import axios from 'axios';

const fetchData = (url) => {
  return from(axios.get(url)).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(response.json());
      } else {
        return throwError("Error fetching data");
      }
    }),
    retryWhen((errors) => errors.pipe(delay(5000)))
  );
};

fetchData("https://jsonplaceholder.typicode.com/posts").subscribe({
    next: (data) => {
        console.log('next data:', data);
    },
    error: (error) => console.error(error)
});