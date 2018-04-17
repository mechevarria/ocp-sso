import {Component, OnInit} from '@angular/core';
import {StatusService} from './status.service';
import {MessageService} from '../common/message.service';

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

        const keys = res.headers.keys();
        const headers = keys.map(key => `${key}: ${res.headers.get(key)}`);

        this.status = {
          headers: headers,
          body: res.body
        };

        if (this.status.body != null) {
          this.messageService.success('Successfully checked status');
        }

      });
  }

  ngOnInit() {
  }

}
