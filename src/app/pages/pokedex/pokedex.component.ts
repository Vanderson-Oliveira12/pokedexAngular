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

  ngOnInit(): void {
    this.getPokemonsService();
  }

  getPokemonsService() {
    const pokemon = this.pokeApiService.getPokemons();

    forkJoin([pokemon]).subscribe((res) => {
      let results = res[0].results;
      this.listPokemons = results;
      this.listPokemonsFiltered = results;
      this.listPokemonsAll = results;

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
}
