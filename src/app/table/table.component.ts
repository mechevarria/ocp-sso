import {Component, OnInit} from '@angular/core';
import {NotifyService} from '../notify.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  constructor(private notifyService: NotifyService) {}

  ngOnInit() {
    this.notifyService.success('Successfully changed route to Table');
  }

}
