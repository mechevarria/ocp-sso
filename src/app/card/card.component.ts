import {Component, OnInit} from '@angular/core';
import {NotifyService} from '../notify.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  name = 'Card';

  constructor(private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.notifyService.success('Successfully changed route to Card');
  }

}
