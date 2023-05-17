import { asyncScheduler } from "../scheduler/async.js";
import { timer } from "./timer.js";

export function interval(period = 0, scheduler = asyncScheduler) {
  return timer(period, period, scheduler);
}