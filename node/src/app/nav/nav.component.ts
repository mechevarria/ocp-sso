import {Component, OnInit} from '@angular/core';
import {Notification} from 'patternfly-ng';
import {MessageService} from '../common/message.service';
import {MessageHistory} from '../common/message-history';
import {KeycloakService} from '../common/keycloak.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  logoutUrl = '';
  username = '';
  notifications: Notification[];
  messageHistory: MessageHistory[];
  navigationItems: any[] = [
    {
      title: 'Status',
      iconStyleClass: 'fa fa-thumbs-up',
      url: '/home/status'
    },
    {
      title: 'Cars',
      iconStyleClass: 'fa fa-car',
      url: '/home/cars'
    },
    {
      title: 'Profile',
      iconStyleClass: 'fa fa-user',
      url: '/home/profile'
    }
  ];

  constructor(public messageService: MessageService, private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.notifications = this.messageService.get();

    this.messageHistory = this.messageService.getHistory();

    const auth = this.keycloakService.getAuth();

    if (auth.loggedIn) {
      this.logoutUrl = auth.logoutUrl;
      this.username = `${auth.profile.firstName} ${auth.profile.lastName}`;
    }
  }
}
