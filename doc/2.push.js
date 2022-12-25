

let promise = new Promise((resolve) => {
  setTimeout(resolve('data'), 3000);
});
promise.then(res => {
  console.log(res);
});

//rxjs 引入了可观察对象 ，它是一个推送系统，可以把多个值，然后推送给观察者，也就是消费者

document.addEventListener('click', (event) => {
  console.log(event);
});