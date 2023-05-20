import { fromEvent } from "rxjs";

const button = document.querySelector("button");
button.addEventListener('click', () => {
    console.log("Clicked!");
});

fromEvent(button, "click").subscribe(() => {
  console.log("Clicked!");
});
