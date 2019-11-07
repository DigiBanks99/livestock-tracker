import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LivestockComponent } from './livestock.component';
import { LivestockNewComponent } from './livestock-new/livestock-new.component';
import { LivestockListComponent } from './livestock-list/livestock-list.component';
import { LivestockDetailComponent } from './livestock-detail/livestock-detail.component';
import { LivestockFormComponent } from './livestock-form/livestock-form.component';
import { LivestockService } from './livestock.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule, MatCommonModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LivestockComponent,
    LivestockNewComponent,
    LivestockListComponent,
    LivestockDetailComponent,
    LivestockFormComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule,
    MatCommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
    SharedModule
  ],
  providers: [LivestockService],
  exports: [LivestockComponent]
})
export class LivestockModule {}
