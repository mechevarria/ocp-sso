import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { KeycloakService } from '../keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  fullName: string;

  constructor(public route: ActivatedRoute, private keycloakService: KeycloakService) {
    this.fullName = '';
  }

  ngOnInit() {
    const auth = this.keycloakService.getAuth();
    if (auth.isLoggedIn) {
      this.fullName = `${auth.profile.firstName} ${auth.profile.lastName}`;
    }
  }

}
