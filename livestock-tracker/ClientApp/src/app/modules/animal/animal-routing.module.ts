import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimalDetailPage, AnimalListPage, AnimalNewPage } from '@animal/pages';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([
      {
        path: 'animal',
        pathMatch: 'full',
        component: AnimalListPage
      },
      { path: 'animal/new', component: AnimalNewPage },
      { path: 'animal/:id/edit', component: AnimalDetailPage }
    ])
  ]
})
export class AnimalRoutingModule {}
