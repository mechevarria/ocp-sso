import {
  ChangeDetectorRef,
  Component,
  OnInit, ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationItemConfig} from 'patternfly-ng';
import {Notification} from 'patternfly-ng';
import {NotificationEvent} from 'patternfly-ng';
import {NotificationType} from 'patternfly-ng';
import {NotificationService} from 'patternfly-ng';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-nav',
  styleUrls: ['./nav.component.css'],
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  notifications: Notification[];
  actionText: string;
  navigationItems: NavigationItemConfig[];

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.navigationItems = [
      {
        title: 'Card View',
        iconStyleClass: 'fa fa-file',
        url: '/card'
      },
      {
        title: 'Table View',
        iconStyleClass: 'fa fa-table',
        url: '/table'
      }
    ];

    this.notifications = this.notificationService.getNotifications();

    this.notificationService.message(NotificationType.SUCCESS,
      'this is a message that is happening right now',
      '',
      false,
      null,
      null);
    this.notificationService.message(NotificationType.SUCCESS,
      'this is a message that is happening right now',
      '',
      false,
      null,
      null);
    this.notificationService.message(NotificationType.SUCCESS,
      'this is a message that is happening right now',
      '',
      false,
      null,
      null);
    this.notificationService.message(NotificationType.SUCCESS,
      'this is a message that is happening right now',
      '',
      false,
      null,
      null);
    this.notificationService.message(NotificationType.SUCCESS,
      'this is a message that is happening right now',
      '',
      false,
      null,
      null);
  }

  handleClose($event: NotificationEvent): void {
    this.actionText = 'Close' + '\n' + this.actionText;
    this.notificationService.remove($event.notification);
  }
}
