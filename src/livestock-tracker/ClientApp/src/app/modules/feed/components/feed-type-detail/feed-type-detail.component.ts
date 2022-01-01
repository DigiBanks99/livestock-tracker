import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedType } from '@core/models/feed-type.model';

@Component({
  selector: 'app-feed-type-detail',
  templateUrl: './feed-type-detail.component.html'
})
export class FeedTypeDetailComponent implements OnInit {
  @Input() feedType: FeedType;
  @Output() save = new EventEmitter<FeedType>();

  public feedTypeForm: FormGroup;

  constructor() {
    this.feedTypeForm = null;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public onUpdate(): void {
    if (this.feedTypeForm.valid) {
      this.save.emit(this.feedTypeForm.value);
    }
  }

  private initForm(): void {
    this.feedTypeForm = new FormGroup({
      id: new FormControl(this.feedType.id),
      description: new FormControl(this.feedType.description, {
        updateOn: 'blur',
        validators: Validators.required
      })
    });
  }
}
