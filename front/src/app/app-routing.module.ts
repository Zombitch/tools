import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeocodingComponent } from './geocoding/geocoding.component';

const routes: Routes = [
  { path: 'geocode', component: GeocodingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
