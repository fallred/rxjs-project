
import { Subscriber } from './Subscriber';
export class Observable {
  constructor(subscribe) {
    if (subscribe) {
      //保存订阅函数,在创建实例的时候函数并没有执行
      this._subscribe = subscribe;
    }
  }
  //当调用Observable的subscribe方法的时候，就要开始执行_subscribe
  subscribe(observerOrNext) {
    //创建一个订阅者的对象
    const subscriber = new Subscriber(observerOrNext);
    this._subscribe(subscriber);
    return subscriber;
  }
}