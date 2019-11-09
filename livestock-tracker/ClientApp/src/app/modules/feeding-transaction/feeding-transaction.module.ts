import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { FeedingTransactionContainerComponent } from './feeding-transaction-container.component';
import { FeedingTransactionComponent } from './feeding-transaction.component';
import { FeedingTransactionNewComponent } from './feeding-transaction-new/feeding-transaction-new.component';
import { FeedingTransactionFormComponent } from './feeding-transaction-form/feeding-transaction-form.component';
import { FeedingTransactionDetailComponent } from './feeding-transaction-detail/feeding-transaction-detail.component';
import { FeedingTransactionService } from './feeding-transaction.service';
import { AppRoutingModule } from '@app/app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FeedingTransactionContainerComponent,
    FeedingTransactionComponent,
    FeedingTransactionNewComponent,
    FeedingTransactionFormComponent,
    FeedingTransactionDetailComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [FeedingTransactionService],
  exports: [FeedingTransactionContainerComponent]
})
export class FeedingTransactionModule {}
