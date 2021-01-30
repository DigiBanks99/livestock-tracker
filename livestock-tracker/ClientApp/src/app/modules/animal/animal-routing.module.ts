import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimalDetailPage, AnimalListPage, AnimalNewPage } from '@animal/pages';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AnimalListPage },
      { path: 'new', component: AnimalNewPage },
      { path: ':id/edit', component: AnimalDetailPage }
    ])
  ]
})
export class AnimalRoutingModule {}
