import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedType } from '@core/models/feed-type.model';

@Component({
  selector: 'app-feed-type-detail',
  templateUrl: './feed-type-detail.component.html',
  styleUrls: ['./feed-type-detail.component.scss']
})
export class FeedTypeDetailComponent implements OnInit {
  @Input() feedType: FeedType;
  @Output() remove = new EventEmitter<number>();
  @Output() save = new EventEmitter<FeedType>();

  public feedTypeForm: FormGroup;

  constructor() {
    this.feedTypeForm = null;
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    let description: string;
    let id: number;
    if (this.feedType !== undefined && this.feedType !== null) {
      description = this.feedType.description;
      id = this.feedType.id;
    } else {
      description = null;
    }

    this.feedTypeForm = new FormGroup({
      id: new FormControl(id),
      description: new FormControl(description, {
        updateOn: 'blur',
        validators: Validators.required
      })
    });
  }

  public deleteFeedType(id: number) {
    this.remove.emit(id);
  }

  public updateFeedType() {
    if (this.feedTypeForm.valid) {
      this.save.emit(this.feedTypeForm.value);
    }
  }
}
