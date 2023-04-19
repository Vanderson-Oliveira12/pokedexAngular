import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PokedexComponent } from '../pokedex/pokedex.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "pokedex", component: PokedexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
