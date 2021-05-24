import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-command-button',
  template: ''
})
export class CommandButtonStubComponent {
  @Output() public buttonClick = new EventEmitter<void>();
}
