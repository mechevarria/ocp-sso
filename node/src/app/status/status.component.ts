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

  getJBoss(): void {
    this.statusService.getJBoss()
      .subscribe(res => {

        this.status = res;

        if (this.status.body != null) {
          this.messageService.success('Successfully checked jboss-api status');
        }

      });
  }

  getSpring(): void {
    this.statusService.getSpring()
      .subscribe(res => {

        this.status = res;

        if (this.status.body != null) {
          this.messageService.success('Successfully checked springboot-api status');
        }

      });
  }

  ngOnInit() {
  }

}
