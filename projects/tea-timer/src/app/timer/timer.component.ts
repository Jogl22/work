import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public index: number;
  public selfRef: TimerComponent;

  // interface for Parent-Child interaction
  public compInteraction: myinterface;

  timeInMinutes: number = 1;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  subscription: Subscription;

  testTime: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startTimer(timeInMinutes) {
    console.log('timer started ...');
    const timeInSeconds = timeInMinutes * 60;
    //emit 0 after 1 second then complete, since no second argument is supplied
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
    });
  }

  stopTimer() {

  }

  removeTimer(index) {
    this.compInteraction.removeTimer(index)
  }
}

export interface myinterface {
  removeTimer(index: number);
}
