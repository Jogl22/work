import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  public index: number;
  public selfRef: TimerComponent;

  // interface for Parent-Child interaction
  public compInteraction: myinterface;

  timeInMinutes = 1;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  countdownInSeconds = this.timeInMinutes * 60;
  timerStatus: TimerStatus = TimerStatus.DEFAULT;

  subscription: Subscription;


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeTime(timeInMinutes) {
    this.timeInMinutes = timeInMinutes;
    this.countdownInSeconds = timeInMinutes * 60;
  }

  startTimer(timeInMinutes) {
    this.timerStatus = TimerStatus.STARTED;

    const timeInSeconds = timeInMinutes * 60;
    const source = interval(1000);

    this.subscription = source.subscribe(interval => {
      const countdownSeconds = timeInSeconds - interval;
      if (countdownSeconds === 0) {
        console.log('timer ended ....');
        this.subscription.unsubscribe();
        this.countdownInSeconds = timeInSeconds;
      } else {
        this.countdownInSeconds = countdownSeconds;
      }

    });
  }

  pauseTimer() {
    this.timerStatus = TimerStatus.PAUSED;

    this.subscription.unsubscribe();
  }

  continueTimer(currentTimeInSecond) {
    this.timerStatus = TimerStatus.STARTED;
    const currentTimeInMinutes = currentTimeInSecond / 60;

    this.startTimer(currentTimeInMinutes);
  }

  clearTimer() {
    this.timerStatus = TimerStatus.DEFAULT;

    this.subscription.unsubscribe();
    this.countdownInSeconds = this.timeInMinutes * 60;
  }

  removeTimer(index) {
    this.compInteraction.removeTimer(index);
  }
}

export interface myinterface {
  removeTimer(index: number);
}

export enum TimerStatus {
  DEFAULT = 'DEFAULT',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED'
}
