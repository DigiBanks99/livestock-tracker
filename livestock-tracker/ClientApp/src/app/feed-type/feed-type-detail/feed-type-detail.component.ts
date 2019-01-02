import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { FeedType } from '../feed-type.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { FeedTypeService } from '../feed-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-type-detail',
  templateUrl: './feed-type-detail.component.html',
  styleUrls: ['./feed-type-detail.component.scss']
})
export class FeedTypeDetailComponent implements OnInit, OnDestroy {
  @Input() feedType: FeedType;
  @Output() remove = new EventEmitter<number>();
  @Output() save = new EventEmitter<FeedType>();

  public feedTypeForm: FormGroup;

  private onDescriptionChanged: Subscription;

  constructor(private feedTypeService: FeedTypeService) {
    this.feedTypeForm = null;
    this.onDescriptionChanged = new Subscription();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.onDescriptionChanged) this.onDescriptionChanged.unsubscribe();
  }

  public initForm() {
    let description: string;
    if (!isNullOrUndefined(this.feedType)) {
      description = this.feedType.description;
    } else {
      description = null;
    }

    this.feedTypeForm = new FormGroup({
      description: new FormControl(description, Validators.required)
    });

    this.onDescriptionChanged = this.feedTypeForm
      .get('description')
      .valueChanges.subscribe(_ => this.updateFeedType());
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
