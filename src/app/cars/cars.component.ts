import {Component, OnInit} from '@angular/core';
import {MessageService} from '../common/message.service';
import {PaginationConfig, PaginationEvent, TableConfig} from 'patternfly-ng';
import {CarsService} from './cars.service';
import {Car} from './car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html'
})
export class CarsComponent implements OnInit {
  constructor(private messageService: MessageService, private carsService: CarsService) {
  }

  viewName = 'Cars';
  rows: Car[];
  allRows: Car[];

  columns: any[] = [
    {name: 'ID', prop: 'id', sortable: false},
    {name: 'Year', prop: 'year', sortable: false},
    {name: 'Make', prop: 'make', sortable: false},
    {name: 'Model', prop: 'model', sortable: false},
    {name: 'Created', prop: 'createDate', sortable: false},
    {name: 'Updated', prop: 'lastUpdateDate', sortable: false}
  ];

  paginationConfig: PaginationConfig = {
    pageSize: 10,
    pageNumber: 1,
    totalItems: 0
  };

  tableConfig: TableConfig = {
    showCheckbox: false,
    paginationConfig: this.paginationConfig
  };

  handlePage($event: PaginationEvent): void {
    this.updateRows();
  }

  updateRows(): void {
    this.rows = this.allRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }

  load(): void {
    this.carsService.getCars()
      .subscribe(res => {
        this.allRows = res;

        if (this.allRows.length > 0) {
          this.messageService.success(`Successfully loaded ${this.allRows.length} cars from service`);
          this.paginationConfig.totalItems = this.allRows.length;
          this.updateRows();
        }
      });
  }

  add(): void {

  }

  ngOnInit() {
  }

}

