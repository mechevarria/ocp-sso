import {Component, OnInit} from '@angular/core';
import {CardConfig, CardFilter} from 'patternfly-ng';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  basicConfig: CardConfig = {
    title: 'Basic Card',
    noPadding: false
  };

  filterConfig: CardConfig = {
    title: 'Filter Card',
    noPadding: false,
    filters: [{
      title: 'Last 30',
      value: '30'
    }, {
      title: 'Last 15',
      value: '15'
    }, {
      title: 'Last 10',
      value: '10'
    }],
  };
  selectedFilter = 'none';

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.success('Successfully changed route to Card View');
  }

  handleFilter($event: CardFilter): void {
    this.selectedFilter = $event.value;
  }

}
