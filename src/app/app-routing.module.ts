import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ItineraryplannerComponent } from './itineraryplanner/itineraryplanner.component';

const routes: Routes = [{
  path : "homepage",
  component : HomepageComponent
},
{
  path : "planner",
  component : ItineraryplannerComponent
},
// { path: '',  redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
