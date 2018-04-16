import {Component, OnInit} from '@angular/core';
import {EmptyStateConfig} from 'patternfly-ng';
import {ActivatedRoute} from '@angular/router';
import {KeycloakService} from '../services/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


  name = '';
  profile: any;

  emptyStateConfig: EmptyStateConfig = {
    iconStyleClass: 'fa fa-arrow-circle-left',
    title: `Welcome ${this.name} to the JBoss Client`,
    info: 'Click one of the links on the left to get started.'
  };


  constructor(public route: ActivatedRoute, private keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.profile = this.keycloakService.getAuth();
  }

}
