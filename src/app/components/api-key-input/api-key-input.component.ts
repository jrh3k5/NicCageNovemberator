import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-api-key-input',
  templateUrl: './api-key-input.component.html',
  styleUrls: ['./api-key-input.component.css']
})
export class ApiKeyInputComponent {
  @Output() entered = new EventEmitter<string>();

  constructor() { }

  onKey(value: string) {
    this.entered.emit(value);
  }
}
