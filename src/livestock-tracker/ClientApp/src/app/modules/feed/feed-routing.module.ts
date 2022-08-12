import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  FeedingTransactionsPage,
  FeedingTransactionsPageModule,
  FeedTypePage,
  FeedTypePageModule
} from '@feed/pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '1' },
  { path: 'type', pathMatch: 'full', component: FeedTypePage },
  {
    path: ':animalId',
    pathMatch: 'full',
    component: FeedingTransactionsPage
  }
];

@NgModule({
  imports: [
    FeedTypePageModule,
    FeedingTransactionsPageModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedRoutingModule {}
