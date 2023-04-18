import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {


  listPokemons: any[] = [];
  constructor(private pokeApiService: PokeApiService){}


  ngOnInit(): void {
    this.getPokemonsService();
  }


  getPokemonsService(){
    this.pokeApiService.getPokemons().subscribe(res => {
      let results = res.results;
      this.listPokemons = results;

      console.log(this.listPokemons)

    })
  }
}
