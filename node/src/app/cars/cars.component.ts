import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {MessageService} from '../common/message.service';
import {PaginationConfig, PaginationEvent, TableComponent, TableConfig} from 'patternfly-ng';
import {CarsService} from './cars.service';
import {Car} from './car';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html'
})
export class CarsComponent implements AfterViewInit {
  constructor(private messageService: MessageService, private carsService: CarsService, private modalService: BsModalService) {
  }

  @ViewChild('carTable')
  carTable: TableComponent;

  @ViewChild('editTemplate')
  editTemplate: TemplateRef<any>;

  modalRef: BsModalRef;
  rows: Car[] = [];
  allRows: Car[] = [];
  selectedCar: Car = new Car();
  years: string[];

  columns: any[] = [
    {name: 'ID', prop: 'id', sortable: true},
    {name: 'Year', prop: 'year', sortable: false},
    {name: 'Make', prop: 'make', sortable: false},
    {name: 'Model', prop: 'model', sortable: false},
    {name: 'Created', prop: 'createDate', sortable: true},
    {name: 'Updated', prop: 'lastUpdateDate', sortable: true}
  ];

  paginationConfig: PaginationConfig = {
    pageSize: 100,
    pageNumber: 1,
    pageSizeIncrements: [10, 100]
  };


  tableConfig: TableConfig = {
    showCheckbox: true,
    paginationConfig: this.paginationConfig
  };

  handlePage($event: PaginationEvent): void {
    this.updateRows();
  }

  handleOnActivate($event: any): void {
    if ($event.type === 'click' && $event.cellIndex !== 0) {
      this.selectedCar = $event.row;
      this.openModal(this.editTemplate);
    }
  }

  updateRows(): void {
    this.rows = this.allRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }

  load(showMsg: boolean = false): void {
    this.carsService.getCars()
      .subscribe(res => {
        this.allRows = res;

        if (this.allRows != null) {
          if (showMsg) {
            this.messageService.success(`Successfully loaded ${this.allRows.length} cars from service`);
          }
          this.paginationConfig.totalItems = this.allRows.length;
          this.updateRows();
        } else {
          this.allRows = [];
          this.rows = [];
        }
      });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  delete(): void {
    this.recursiveDelete(this.carTable.selectedRows, 0);
  }

  private recursiveDelete(rows: any, numDeleted: number): void {
    const deleteRow = rows[0];

    this.carsService.deleteCar(deleteRow.id)
      .subscribe(res => {
        if (res != null) {
          numDeleted++;
          rows = rows.filter(row => row !== deleteRow);

          if (rows.length > 0) {
            this.recursiveDelete(rows, numDeleted);
          } else {

            // end of recursion
            this.messageService.success(`Successfully deleted ${numDeleted} Cars`);
            this.load();
            this.clear();
          }

        } else {
          this.clear();
        }
      });
  }

  saveOrUpdate(): void {
    if (this.selectedCar.id != null) {
      this.carsService.updateCar(this.selectedCar)
        .subscribe(res => {
          if (res != null) {
            this.messageService.success(`Successfully updated Car with ID ${res.id}`);
            this.load();
          }
        });
    } else {
      this.carsService.saveCar(this.selectedCar)
        .subscribe(res => {
          if (res != null) {
            this.messageService.success(`Successfully added new Car with ID ${res.id}`);
            this.load();
          }
        });
    }
    this.clear();
  }

  clear(): void {
    this.selectedCar = new Car();
    this.carTable.selectedRows = [];
    this.carTable.allRowsSelected = false;

    if (this.modalRef) {
      this.modalRef.hide();
    }

  }

  ngAfterViewInit() {
    this.load(true);

    const year: number = new Date().getFullYear();
    const range = [];
    range.push(year.toString());

    for (let i = 1; i < 30; i++) {
      range.push((year - i).toString());
    }
    this.years = range;
  }

}
