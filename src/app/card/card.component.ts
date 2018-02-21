import {Component, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  name = 'Card View';

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.success(`Successfully changed route to ${this.name}`);
  }

}
