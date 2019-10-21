import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// TODO: How can I use `card.module` to include component?
// import { ElementInputComponent } from './element-input.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    // TODO: How can I use `card.module` to include component?
    // ElementInputComponent,
  ]
})
export class CardModule {}
