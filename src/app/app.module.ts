import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridCreateComponent } from './modules/waterflow-simulator/grid-creation/grid-creation.component';
import { DragBlockComponent } from './modules/waterflow-simulator/drag-block/drag-block.component';
import { SimulateWaterComponent } from './modules/waterflow-simulator/simulate-water/simulate-water.component';

@NgModule({
  declarations: [
    AppComponent,
    GridCreateComponent,
    DragBlockComponent,
    SimulateWaterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
