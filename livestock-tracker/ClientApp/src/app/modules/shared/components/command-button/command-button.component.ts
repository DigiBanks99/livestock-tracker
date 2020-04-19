import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-command-button',
  templateUrl: './command-button.component.html',
  styleUrls: ['./command-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandButtonComponent {
  @Output() public click = new EventEmitter<void>();

  public onClick() {
    this.click.emit();
  }
}
