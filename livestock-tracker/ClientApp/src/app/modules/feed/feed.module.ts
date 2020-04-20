import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  feedingTransactionEffects,
  feedingTransactionReducer,
  feedTypeEffects,
  feedTypeReducer
} from '@feed-store';
import {
  FeedingTransactionComponent,
  FeedingTransactionContainerComponent,
  FeedingTransactionDetailComponent,
  FeedingTransactionFormComponent,
  FeedingTransactionNewComponent,
  FeedTypeComponent,
  FeedTypeContainerComponent,
  FeedTypeDetailComponent
} from '@feed/components';
import { FeedingTransactionService, FeedTypeService } from '@feed/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    FeedTypeComponent,
    FeedTypeContainerComponent,
    FeedTypeDetailComponent,
    FeedingTransactionComponent,
    FeedingTransactionContainerComponent,
    FeedingTransactionDetailComponent,
    FeedingTransactionFormComponent,
    FeedingTransactionNewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('feedTypes', feedTypeReducer.feedTypeReducer),
    StoreModule.forFeature(
      'feedingTransactions',
      feedingTransactionReducer.feedingTransactionReducer
    ),
    EffectsModule.forFeature([
      feedTypeEffects.FeedTypeEffects,
      feedingTransactionEffects.FeedingTransactionEffects,
    ]),
  ],
  providers: [FeedTypeService, FeedingTransactionService],
})
export class FeedModule {}
