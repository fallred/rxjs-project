import { from } from "rxjs";
import { filter, map, reduce } from "rxjs/operators";

const data = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 30 },
  { id: 4, name: "xiaoming", age: 35 },
];

from(data)
  .pipe(
    filter((person) => person.age > 25),
    map((person) => `${person.name} (${person.age})`),
    reduce((accumulator, currentValue) => `${accumulator}, ${currentValue}`)
  )
  .subscribe((result) => console.log(result));