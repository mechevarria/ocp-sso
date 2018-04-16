import {Component, OnInit} from '@angular/core';
import {NavigationItemConfig, Notification} from 'patternfly-ng';
import {MessageService} from '../services/message.service';
import {MessageHistory} from '../message-history';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  notifications: Notification[];
  messageHistory: MessageHistory[];
  navigationItems: NavigationItemConfig[] = [
    {
      title: 'Status',
      iconStyleClass: 'fa fa-thumbs-up',
      url: '/home/status'
    },
    {
      title: 'Cars',
      iconStyleClass: 'fa fa-car',
      url: '/home/cars'
    }
  ];

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.notifications = this.messageService.get();

    this.messageHistory = this.messageService.getHistory();
  }
}
