import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitContainerComponent } from '@unit/components/unit/unit.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: UnitContainerComponent, pathMatch: 'full' },
      { path: 'units', component: UnitContainerComponent, pathMatch: 'full' }
    ])
  ]
})
export class UnitRoutingModule {}
