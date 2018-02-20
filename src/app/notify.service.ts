import {Injectable} from '@angular/core';
import {Notification} from 'patternfly-ng';
import {NotificationType} from 'patternfly-ng';
import {NotificationService} from 'patternfly-ng';
import {NotificationEvent} from 'patternfly-ng';
import {NotifyHistory} from './notify-history';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class NotifyService {

  private notifyHistory: NotifyHistory[] = [];

  // css classes for the notification dropdown menu
  private classMap: Map<string, string> = new Map()
    .set(NotificationType.SUCCESS, 'pficon-ok')
    .set(NotificationType.INFO, 'pficon-info')
    .set(NotificationType.WARNING, 'pficon-warning-triangle-ok')
    .set(NotificationType.DANGER, 'pficon-error-circle-o');

  constructor(private notificationService: NotificationService) {
  }

  get(): Notification[] {
    return this.notificationService.getNotifications();
  }

  getHistory(): Observable<NotifyHistory[]> {
    return of(this.notifyHistory);
  }

  success(msg: string): void {
    this.notify(NotificationType.SUCCESS, msg);
  }

  private notify(type: string, msg: string): void {
    this.notifyHistory.push({
      class: this.classMap[type],
      msg: msg
    });

    this.notificationService.message(type,
      null,
      msg,
      false,
      null,
      null);
  }

  clear(): void {
    this.notifyHistory.length = 0;
  }

  close($event: NotificationEvent): void {
    this.notificationService.remove($event.notification);
  }

}
