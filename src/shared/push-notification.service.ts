import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  public permission: Permission;
  constructor() {
      this.permission = this.isSupported() ? 'default' : 'denied';
  }
  public isSupported(): boolean {
      return 'Notification' in window;
  }
  requestPermission(): void {
      const self = this;
      if ('Notification' in window) {
          Notification.requestPermission(function(status) {
              return self.permission = status;
          });
      }
  }
  create(title: string, options?: PushNotification): any {
      const self = this;
      return new Observable((obs) => {
          if (!('Notification' in window)) {
              console.log('Notifications are not available in this environment');
              obs.complete();
          }
          if (self.permission !== 'granted') {
              console.log('The user hasn not granted you permission to send push notifications');
              obs.complete();
          }
          let _notify = new Notification(title, options);
          _notify.onshow = (e) => {
              return obs.next({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onclick = (e) => {
              window.focus();
              return obs.next({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onerror = (e) => {
              return obs.error({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onclose = () => {
              return obs.complete();
          };
      });
  }
  generateNotification(source: Array <any>, imageName: string): void {
      let self = this;
      source.forEach((item) => {
          const options = {
              body: item.alertContent,
              icon: '../images/' + imageName
          };
          const notify = self.create(item.title, options).subscribe();
      })
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
    body?: string;
    icon?: string;
    tag?: string;
    data?: any;
    renotify?: boolean;
    silent?: boolean;
    sound?: string;
    noscreen?: boolean;
    sticky?: boolean;
    dir?: 'auto' | 'ltr' | 'rtl';
    lang?: string;
    vibrate?: number[];
}