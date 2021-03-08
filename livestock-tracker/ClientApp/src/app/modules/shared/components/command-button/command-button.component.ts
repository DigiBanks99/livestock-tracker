import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-command-button',
  templateUrl: './command-button.component.html',
  styleUrls: ['./command-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandButtonComponent {
  @Output() public buttonClick = new EventEmitter<void>();

  public onClick() {
    this.buttonClick.emit();
  }
}
