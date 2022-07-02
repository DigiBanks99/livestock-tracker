import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

@NgModule({
  declarations: [CommandButtonComponent],
  exports: [CommandButtonComponent],
  imports: [MatButtonModule, MatIconModule]
})
export class CommandButtonComponentModule {}
