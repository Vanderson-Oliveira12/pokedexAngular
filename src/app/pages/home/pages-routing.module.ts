import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "pokedex", loadChildren: () => import("../pokedex/pokedex.module").then(res => res.PokedexModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
