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
  columns: any[] = [
    {name: 'ID', prop: 'id', sortable: true},
    {name: 'Name', prop: 'name', sortable: true},
    {name: 'Address', prop: 'address', sortable: true},
    {name: 'City', prop: 'city', sortable: true},
    {name: 'State', prop: 'state', sortable: true}
  ];
  tableConfig: TableConfig = {
    showCheckbox: false
  };

  rows: People[];

  ngOnInit() {
    this.peopleService.getPeople()
      .subscribe(people => {
        this.rows = people;

		if (this.rows.length > 0) {
          this.messageService.success('Successfully loaded people from service');
		}
      });
  }

}
