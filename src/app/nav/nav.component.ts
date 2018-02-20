import {Component, OnInit} from '@angular/core';
import {NavigationItemConfig} from 'patternfly-ng';
import {Notification} from 'patternfly-ng';
import {NotificationEvent} from 'patternfly-ng';
import {NotifyService} from '../notify.service';
import {NotifyHistory} from '../notify-history';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  navigationItems: NavigationItemConfig[];
  notifications: Notification[];
  notifyHistory: NotifyHistory[];

  constructor(private notifyService: NotifyService) {
  }

  close($event: NotificationEvent): void {
    this.notifyService.close($event);
  }

  clear(): void {
    this.notifyService.clear();
  }

  ngOnInit(): void {
    this.notifications = this.notifyService.get();

    this.notifyService.getHistory()
      .subscribe(history => this.notifyHistory = history);

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
  }
}
