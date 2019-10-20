// Components
import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  // TODO: Define object type
  // SEE: ../../../_shared/typedef.js
	@Input() identity: object;
	@Input() attributes: object;
}
