import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridCreateComponent } from './modules/waterflow-simulator/grid-creation/grid-creation.component';

import { DragBlockComponent } from './modules/waterflow-simulator/drag-block/drag-block.component';
import { SimulateWaterComponent } from './modules/waterflow-simulator/simulate-water/simulate-water.component';

const routes: Routes = [
  { path: '', component: GridCreateComponent },
  { path: 'grid-create', component: GridCreateComponent },
  { path: 'drag-block', component: DragBlockComponent },
  { path: 'simulate-water', component: SimulateWaterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }