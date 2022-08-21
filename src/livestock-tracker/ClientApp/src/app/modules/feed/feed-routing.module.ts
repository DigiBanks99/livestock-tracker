import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  FeedingTransactionsPage,
  FeedingTransactionsPageModule,
  FeedTypePage,
  FeedTypePageModule
} from '@feed/pages';
import {
  FeedingTransactionDetailComponent,
  FeedingTransactionDetailComponentModule,
  FeedingTransactionFormComponentModule,
  FeedingTransactionNewComponent
} from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '1' },
  { path: 'type', pathMatch: 'full', component: FeedTypePage },
  {
    path: ':animalId',
    pathMatch: 'full',
    component: FeedingTransactionsPage
  },
  {
    path: ':animalId/new',
    pathMatch: 'full',
    component: FeedingTransactionNewComponent
  },
  {
    path: ':animalId/edit/:id',
    pathMatch: 'full',
    component: FeedingTransactionDetailComponent
  }
];

@NgModule({
  imports: [
    FeedTypePageModule,
    FeedingTransactionsPageModule,
    FeedingTransactionFormComponentModule,
    FeedingTransactionDetailComponentModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedRoutingModule {}
