import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  inputValue: string = "";
  isLoading: boolean = true;
  listPokemons: any[] = [];
  listPokemonsFiltered: any[] = [];
  listPokemonsAll: any[] = [];
  constructor(private pokeApiService: PokeApiService){}


  ngOnInit(): void {
    this.getPokemonsService();
  }


  getPokemonsService(){

    const pokemon = this.pokeApiService.getPokemons();

    forkJoin([pokemon]).subscribe(res => {
      let results = res[0].results;
      this.listPokemons = results;
      this.listPokemonsFiltered = results;
      this.listPokemonsAll = results;

      setTimeout(() => {
        this.isLoading = false;
      }, 1000)
    })
  }

  filterPokemonPerName(){
    if(this.inputValue !== ""){
      this.listPokemonsFiltered = this.listPokemonsAll.filter(pokemon => {
        let inputFormat = this.inputValue.toLocaleLowerCase();

        return pokemon.name.includes(inputFormat)
      })

      this.listPokemons = this.listPokemonsFiltered;
    } else {
      this.listPokemons = this.listPokemonsAll
    }


  }
}
