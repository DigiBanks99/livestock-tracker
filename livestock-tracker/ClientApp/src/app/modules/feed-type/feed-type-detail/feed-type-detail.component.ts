import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FeedType } from '@core/models/feed-type.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

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
    if (!isNullOrUndefined(this.feedType)) {
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
