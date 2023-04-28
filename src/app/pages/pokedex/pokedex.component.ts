import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  inputValue: string = '';
  isLoading: boolean = true;
  isLoadingModal: boolean = true;
  listPokemons: any[] = [];
  listPokemonsFiltered: any[] = [];
  listPokemonsAll: any[] = [];
  pokemonSelected: any = { color: '' };

  constructor(private pokeApiService: PokeApiService) {}

  isModalOpen: boolean = false;
  isDarkTheme: boolean = false;

  ngOnInit(): void {
    this.getPokemonsService();
    let themeStorage: any = localStorage.getItem("isDarkTheme");

    if(themeStorage == "false"){
      themeStorage = false
      this.isDarkTheme = themeStorage;
    } else {
      themeStorage = true
      this.isDarkTheme = themeStorage;
    }
  }

  getPokemonsService() {
    const pokemon = this.pokeApiService.getPokemons();

    forkJoin([pokemon]).subscribe((res) => {
      let results = res[0].results;
      this.listPokemons = results;
      this.listPokemonsFiltered = results;
      this.listPokemonsAll = results;

      console.log(results)

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  closeModalContainer() {
    this.isModalOpen = false;
  }

  openDetailsPokemon(e: any) {
    const idPokemon = String(e.status.id);
    this.isModalOpen = true;
    this.pokeApiService.getPokemonInfor(idPokemon).subscribe((pokemon) => {
      this.isLoadingModal = false;
      this.pokemonSelected = pokemon;
      console.log(this.pokemonSelected);
    });
  }

  filterPokemonPerName() {
    if (this.inputValue !== '') {
      this.listPokemonsFiltered = this.listPokemonsAll.filter((pokemon) => {
        let inputFormat = this.inputValue.toLocaleLowerCase();

        return pokemon.name.includes(inputFormat);
      });

      this.listPokemons = this.listPokemonsFiltered;
    } else {
      this.listPokemons = this.listPokemonsAll;
    }
  }

  typePokemonConvertToPortugues(typePokemon: string): string{
    let typeIng = "";

      if(typePokemon == "grass"){
         return typeIng = "Planta";
      } else if(typePokemon == "poison"){
        return typeIng = "Veneno";
      } else if(typePokemon == "fire"){
        return typeIng = "Fogo";
      } else if(typePokemon == "water"){
        return typeIng = "Água";
      } else if(typePokemon == "bug"){
        return typeIng = "Inseto";
      } else if(typePokemon == "flying"){
        return typeIng = "Voador";
      } else if(typePokemon == "normal"){
        return typeIng = "Normal";
      } else if(typePokemon == "electric"){
        return typeIng = "Elétrico";
      } else if(typePokemon == "ground"){
        return typeIng = "Terra";
      } else if(typePokemon == "fairy"){
        return typeIng = "Fada";
      } else if(typePokemon == "fairy"){
        return typeIng = "Fada";
      } else if(typePokemon == "fighting"){
        return typeIng = "Lutador";
      } else if(typePokemon == "psychic"){
        return typeIng = "Psiquico";
      } else if(typePokemon == "rock"){
        return typeIng = "Pedra";
      } else if(typePokemon == "steel"){
        return typeIng = "Metal";
      } else if(typePokemon == "ice"){
        return typeIng = "Gelo";
      } else if(typePokemon == "ghost"){
        return typeIng = "Fantasma";
      }
      return "";
  }

  setDarkTheme(e: boolean){
    this.isDarkTheme = e;
    localStorage.setItem("isDarkTheme", String(this.isDarkTheme))
  }
}
