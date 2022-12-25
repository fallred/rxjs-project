import { asyncScheduler } from './rxjs';

function task(state) {
  console.log('state:', state);
  if (state < 5) {
    //如果state小于5的话，再次调度此任务，新的状态是state+1,延迟1s
    this.schedule(state + 1, 1000);
  }
}
//开始调度task任务 1参数是要执行的任务 2参数是延迟的时间 3参数是初始的状态
asyncScheduler.schedule(task, 1000, 0)

//setTimeout(task, 1000, 0);