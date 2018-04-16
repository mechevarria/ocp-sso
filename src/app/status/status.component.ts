import {Component, OnInit} from '@angular/core';
import {StatusService} from '../services/status.service';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {

  constructor(private messageService: MessageService, private statusService: StatusService) {
  }

  status: any = {};

  getStatus(): void {
    this.statusService.getStatus()
      .subscribe(res => {
        this.status = res;
        this.messageService.success('Successfully checked status');
      });
  }

  ngOnInit() {
  }

}
