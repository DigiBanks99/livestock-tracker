import { Component, OnInit, Input } from '@angular/core';

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
export class FeedTypeDetailComponent implements OnInit {
  @Input() feedType: FeedType;
  public feedTypeForm: FormGroup;

  private onDescriptionChanged: Subscription;

  constructor(private feedTypeService: FeedTypeService) {
    this.feedTypeForm = null;
    this.onDescriptionChanged = new Subscription();
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    let description: string;
    if (!isNullOrUndefined(this.feedType)) {
      description = this.feedType.description;
    } else {
      description = null;
    }

    this.feedTypeForm = new FormGroup({
      'description': new FormControl(description, Validators.required)
    });

    this.onDescriptionChanged = this.feedTypeForm
      .get('description')
      .valueChanges.subscribe((changedDescription: string) =>
        this.updateFeedType(changedDescription)
      );
  }

  public deleteFeedType(id: number) {
    this.feedTypeService.delete(id);
  }

  public updateFeedType(description) {
    this.feedType.description = description;
    this.feedTypeService.update(this.feedType);
  }
}
