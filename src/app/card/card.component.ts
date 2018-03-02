import {Component, OnInit} from '@angular/core';
import {CardConfig, CardFilter} from 'patternfly-ng';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  basicConfig: CardConfig;
  filterConfig: CardConfig;
  selectedFilter = 'none';

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.success('Successfully changed route to Card View');

    this.basicConfig = {
      title: 'Basic Card'
    } as CardConfig;

    this.filterConfig = {
      title: 'Filter Card',
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
    } as CardConfig;
  }

  handleFilter($event: CardFilter): void {
    this.selectedFilter = $event.value;
  }

}
