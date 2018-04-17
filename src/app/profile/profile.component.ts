import {Component, OnInit} from '@angular/core';
import {KeycloakService} from '../common/keycloak.service';
import {CardConfig} from 'patternfly-ng';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) {
  }

  profile: any;

  basicConfig: CardConfig = {
    title: 'Profile',
    noPadding: false
  };

  ngOnInit() {
    const auth = this.keycloakService.getAuth();

    if (auth.loggedIn) {
      this.profile = auth.profile;
    }
  }
}
