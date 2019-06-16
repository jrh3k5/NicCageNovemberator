import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiKeyInputComponent } from './api-key-input/api-key-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiKeyInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
