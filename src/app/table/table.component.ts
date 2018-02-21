import {Component, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';
import {PeopleService} from '../services/people.service';
import {People} from '../people';
import {TableConfig} from 'patternfly-ng';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  constructor(private messageService: MessageService, private peopleService: PeopleService) {
  }

  viewName = 'Table View';
  columns: any[];
  rows: People[];
  tableConfig: TableConfig;

  ngOnInit() {

    this.columns = [
      {name: 'ID', prop: 'id', sortable: true},
      {name: 'Name', prop: 'name', sortable: true},
      {name: 'Address', prop: 'address', sortable: true},
      {name: 'City', prop: 'city', sortable: true},
      {name: 'State', prop: 'state', sortable: true}
    ];

    this.tableConfig = {
      showCheckbox: false
    };

    this.peopleService.getPeople()
      .subscribe(people => {
        this.rows = people;
        this.messageService.success('Successfully loaded people from service');
      });
  }

}
