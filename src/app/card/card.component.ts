import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  name = 'Card';

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.success('Successfully changed route to Card');
  }

}
