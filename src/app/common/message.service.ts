import {Injectable} from '@angular/core';
import {Notification, NotificationEvent, NotificationService, NotificationType} from 'patternfly-ng';
import {MessageHistory} from './message-history';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageHistory: MessageHistory[] = [];

  // css classes for the notification dropdown menu
  private classMap: Map<string, string> = new Map()
    .set(NotificationType.SUCCESS, 'pficon-ok')
    .set(NotificationType.INFO, 'pficon-info')
    .set(NotificationType.WARNING, 'pficon-warning-triangle-o')
    .set(NotificationType.DANGER, 'pficon-error-circle-o');

  constructor(private notificationService: NotificationService) {
  }

  get(): Notification[] {
    return this.notificationService.getNotifications();
  }

  getHistory(): MessageHistory[] {
    return this.messageHistory;
  }

  success(msg: string): void {
    this.notify(NotificationType.SUCCESS, msg);
  }

  error(msg: string): void {
    this.notify(NotificationType.DANGER, msg);
  }

  info(msg: string): void {
    this.notify(NotificationType.INFO, msg);
  }

  warning(msg: string): void {
    this.notify(NotificationType.WARNING, msg);
  }

  private notify(type: string, msg: string): void {
    // make the delay to dropdown the same as the notification fade
    setTimeout(function (history, map) {
      history.push({
        class: map.get(type),
        msg: msg
      });
    }, 8000, this.messageHistory, this.classMap);


    this.notificationService.message(type,
      null,
      msg,
      false,
      null,
      null);
  }

  clear(): void {
    this.messageHistory.length = 0;
  }

  close($event: NotificationEvent): void {
    this.notificationService.remove($event.notification);
  }

}
