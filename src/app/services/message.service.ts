import {Injectable} from '@angular/core';
import {Notification} from 'patternfly-ng';
import {NotificationType} from 'patternfly-ng';
import {NotificationService} from 'patternfly-ng';
import {NotificationEvent} from 'patternfly-ng';
import {MessageHistory} from '../message-history';


@Injectable()
export class MessageService {

  private messageHistory: MessageHistory[] = [];

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

  warn(msg: string): void {
    this.notify(NotificationType.WARNING, msg);
  }

  private notify(type: string, msg: string): void {
    this.messageHistory.push({
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
    this.messageHistory.length = 0;
  }

  close($event: NotificationEvent): void {
    this.notificationService.remove($event.notification);
  }

}
