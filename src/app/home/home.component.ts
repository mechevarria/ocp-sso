import {Component, OnInit} from '@angular/core';
import {EmptyStateConfig} from 'patternfly-ng';
import {ActivatedRoute} from '@angular/router';
import {KeycloakService} from '../common/keycloak.service';
import {MessageService} from '../common/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


  name = '';
  profile: any;
  emptyStateConfig: EmptyStateConfig;


  constructor(public route: ActivatedRoute, private keycloakService: KeycloakService, private messageService: MessageService) {
  }

  ngOnInit() {
    const auth = this.keycloakService.getAuth();

    if (auth.loggedIn) {
      this.name = `${auth.profile.firstName} ${auth.profile.lastName}, `;
    } else {
      this.messageService.warning('You are not logged in');
    }

    this.emptyStateConfig = {
      iconStyleClass: 'fa fa-arrow-circle-left',
      title: `Welcome ${this.name} to the JBoss Client`,
      info: 'Click one of the links on the left to get started.'
    };
  }

}
