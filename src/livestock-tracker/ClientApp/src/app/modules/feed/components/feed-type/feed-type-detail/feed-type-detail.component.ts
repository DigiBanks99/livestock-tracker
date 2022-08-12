import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { FeedType } from '@core/models/feed-type.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-feed-type-detail',
  templateUrl: './feed-type-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedTypeDetailComponent {
  @Output() readonly save = new EventEmitter<FeedType>();
  public readonly feedTypeForm = new FormGroup({
    id: new FormControl(null),
    description: new FormControl(null, {
      updateOn: 'blur',
      validators: Validators.required
    })
  });

  @Input() set feedType(value: FeedType) {
    this.feedTypeForm.patchValue({
      id: value?.id ?? null,
      description: value?.description ?? null
    });
  }

  public onUpdate(): void {
    if (this.feedTypeForm.valid) {
      this.save.emit(this.feedTypeForm.value);
    }
  }
}

@NgModule({
  declarations: [FeedTypeDetailComponent],
  exports: [FeedTypeDetailComponent],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class FeedTypeDetailComponentModule {}
