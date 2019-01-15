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

  subscription: Subscription;

  testTime: number;

  countdown = this.timeInMinutes.toString().padStart(2, '0') + ':' + (0).toString().padStart(2, '0');

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeTime(timeInMinutes) {
    this.timeInMinutes = timeInMinutes;
    this.countdown = this.timeInMinutes.toString().padStart(2, '0') + ':' + (0).toString().padStart(2, '0');
  }

  startTimer(timeInMinutes) {
    console.log('timer started ...');
    const timeInSeconds = timeInMinutes * 60;
    const source = interval(1000);

    this.subscription = source.subscribe(val => {
      if ((timeInSeconds - val) === 55) {
        this.subscription.unsubscribe();
      }

      this.testTime = timeInSeconds - val;
      console.log(this.testTime);

      const minutes: number = Math.floor(this.testTime / 60);
      console.log(minutes.toString().padStart(2, '0') + ':' +
           (this.testTime - minutes * 60).toString().padStart(2, '0'));
      this.countdown = minutes.toString().padStart(2, '0') + ':' + (this.testTime - minutes * 60).toString().padStart(2, '0');
    });
  }

  stopTimer() {
    this.subscription.unsubscribe();
  }

  clearTimer() {
    this.subscription.unsubscribe();
    this.countdown = this.timeInMinutes.toString().padStart(2, '0') + ':' + (0).toString().padStart(2, '0');
  }

  removeTimer(index) {
    this.compInteraction.removeTimer(index);
  }
}

export interface myinterface {
  removeTimer(index: number);
}
