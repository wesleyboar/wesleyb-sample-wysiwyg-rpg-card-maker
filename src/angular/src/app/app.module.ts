import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// TODO: How can I use `card.module` to include component?
// import { CardModule } from './card.module';

import { AppComponent } from './app.component';
import { CardComponent } from './UNUSED.card.component';
// TODO: How can I use `card.module` to include component?
import { ElementInputComponent } from './element-input.component';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // TODO: How can I use `card.module` to include component?
    // CardModule,
  ],
  declarations: [
    AppComponent,
    CardComponent,
    // TODO: How can I use `card.module` to include component?
    ElementInputComponent,
    ToggleComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
