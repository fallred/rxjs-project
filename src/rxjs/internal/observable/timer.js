import { asyncScheduler } from "../scheduler/async.js";
import { Observable } from "../Observable.js";
import { Scheduler } from "../Scheduler.js";

export function timer(dueTime = 0, intervalOrScheduler, scheduler = asyncScheduler) {
  let intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (intervalOrScheduler instanceof Scheduler) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable((subscriber) => {
    let n = 0
    return scheduler.schedule(function () {
      subscriber.next(n++);
      if (intervalDuration > 0) {
        this.schedule(undefined, intervalDuration);
      } else {
        subscriber.complete();
      }
    }, dueTime);
    //setTimeout();
  });
}