import { NgModule } from '@angular/core';
import { FeedTypeComponent } from './feed-type.component';
import { FeedTypeDetailComponent } from './feed-type-detail/feed-type-detail.component';
import { FeedTypeService } from './feed-type.service';
import { FeedTypeContainerComponent } from './feed-type-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FeedTypeContainerComponent,
    FeedTypeComponent,
    FeedTypeDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [FeedTypeService],
  exports: [FeedTypeContainerComponent]
})
export class FeedTypeModule {}
