import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  FeedingTransactionDetailComponent,
  FeedingTransactionFormComponent,
  FeedingTransactionNewComponent
} from '@feed/components';
import {
  FeedingTransactionService,
  FeedTypeService
} from '@feed/services';
import { SharedModule } from '@shared/shared.module';

import { FeedRoutingModule } from './feed-routing.module';

@NgModule({
  declarations: [
    FeedingTransactionDetailComponent,
    FeedingTransactionFormComponent,
    FeedingTransactionNewComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [FeedTypeService, FeedingTransactionService]
})
export class FeedModule {}
