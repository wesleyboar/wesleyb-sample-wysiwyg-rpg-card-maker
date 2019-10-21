import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

// Data
import exampleData from '../../../_shared/data/example/card--item.json';

@Component({
  selector: '#app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	exampleData: object = exampleData;
}
