﻿import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  FeedingTransactionDetailPage,
  FeedingTransactionDetailPageModule,
  FeedingTransactionNewPage,
  FeedingTransactionNewPageModule,
  FeedingTransactionsPage,
  FeedingTransactionsPageModule,
  FeedTypePage,
  FeedTypePageModule
} from './pages';

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
    component: FeedingTransactionNewPage
  },
  {
    path: ':animalId/edit/:id',
    pathMatch: 'full',
    component: FeedingTransactionDetailPage
  }
];

@NgModule({
  imports: [
    FeedingTransactionDetailPageModule,
    FeedingTransactionNewPageModule,
    FeedingTransactionsPageModule,
    FeedTypePageModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedRoutingModule {}
