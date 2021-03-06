import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PushNotificationService } from 'src/shared/push-notification.service';

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
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0.05];
  countdownInSeconds = this.timeInMinutes * 60;
  timerStatus: TimerStatus = TimerStatus.DEFAULT;

  subscription: Subscription;

  constructor(private pushNotificationService: PushNotificationService) {
      this.pushNotificationService.requestPermission();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeTime(timeInMinutes) {
    this.timeInMinutes = timeInMinutes;
    this.countdownInSeconds = timeInMinutes * 60;
  }

  startCountdown(timeInMinutes) {
    this.timerStatus = TimerStatus.STARTED;

    const timeInSeconds = timeInMinutes * 60;
    const source = interval(1000);

    this.subscription = source.subscribe(interval => {
      const countdownSeconds = timeInSeconds - interval;
      if (countdownSeconds === 0) {
        this.subscription.unsubscribe();
        this.sendPushNotifcation();
        this.countdownInSeconds = timeInSeconds;
        this.timerStatus = TimerStatus.DEFAULT;
      } else {
        this.countdownInSeconds = countdownSeconds;
      }

    });
  }

  pauseCountdown() {
    this.timerStatus = TimerStatus.PAUSED;

    this.subscription.unsubscribe();
  }

  continueCountdown(currentTimeInSecond) {
    this.timerStatus = TimerStatus.STARTED;
    const currentTimeInMinutes = currentTimeInSecond / 60;

    this.startCountdown(currentTimeInMinutes);
  }

  clearCountdown() {
    this.timerStatus = TimerStatus.DEFAULT;

    this.subscription.unsubscribe();
    this.countdownInSeconds = this.timeInMinutes * 60;
  }

  sendPushNotifcation() {
    let data: Array<any>= [];
    data.push({
        'title': 'Tee ist fertig',
        'alertContent': 'Beutel raus !'
    });
    this.pushNotificationService.generateNotification(data, 'tea.png');
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
