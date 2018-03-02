import {Component, OnInit} from '@angular/core';
import {EmptyStateConfig} from 'patternfly-ng';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  emptyStateConfig: EmptyStateConfig = {
    iconStyleClass: 'fa fa-arrow-circle-left',
    title: 'PatternFly-Ng Seed',
    info: 'Click one of the links on the left to get started.'
  };

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
