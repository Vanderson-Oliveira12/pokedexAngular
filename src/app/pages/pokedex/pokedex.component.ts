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
  listPokemonsAll: any[] = [];
  listPokemonFilterCheckBox: any[] = [];
  pokemonSelected: any = { color: '' };
  itemsMarked: string[] = [];
  pokemonCheckboxType: string[] = [
    'grass',
    'poison',
    'fire',
    'water',
    'bug',
    'flying',
    'normal',
    'electric',
    'ground',
    'fairy',
    'fighting',
    'psychic',
    'rock',
    'steel',
    'ice',
    'ghost',
    'dragon',
  ];

  indexPagination: number = 1;
  resultsPagination: any[] = [];
  currentPage: number = 1;
  totalPagePokemons: number = 1;
  offSetMinPagination: number = 0;
  offSetMaxPagination: number = 9;

  constructor(private pokeApiService: PokeApiService) {}

  isModalOpen: boolean = false;
  isDarkTheme: boolean = false;
  isMenuTypeOpen: boolean = false;

  ngOnInit(): void {
    this.getPokemonsService();
    let themeStorage: any = localStorage.getItem('isDarkTheme');

    if (themeStorage == 'false') {
      themeStorage = false;
      this.isDarkTheme = themeStorage;
    } else {
      themeStorage = true;
      this.isDarkTheme = themeStorage;
    }
  }

  getPokemonsService() {
    const pokemonPagination = this.pokeApiService.getPokemonsPagination(this.offSetMinPagination, this.offSetMaxPagination);
    const pokemon = this.pokeApiService.getPokemons();

    forkJoin([pokemonPagination, pokemon]).subscribe((res) => {
      let resultsPagination = res[0].results;
      let results = res[1].results;
      this.resultsPagination = resultsPagination;
      this.listPokemons = resultsPagination;
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
    });
  }

  filterPokemonPerName() {
    if (this.inputValue !== '') {
      this.listPokemons = this.listPokemonsAll.filter((pokemon) => {
        let inputFormat = this.inputValue.toLocaleLowerCase();

        return pokemon.name.includes(inputFormat);
      });

    } else {
      this.listPokemons = this.resultsPagination;
    }
  }

  typePokemonConvertToPortugues(typePokemon: string): string {
    let typeIng = '';

    if (typePokemon == 'grass') {
      return (typeIng = 'Planta');
    } else if (typePokemon == 'poison') {
      return (typeIng = 'Veneno');
    } else if (typePokemon == 'fire') {
      return (typeIng = 'Fogo');
    } else if (typePokemon == 'water') {
      return (typeIng = 'Água');
    } else if (typePokemon == 'bug') {
      return (typeIng = 'Inseto');
    } else if (typePokemon == 'flying') {
      return (typeIng = 'Voador');
    } else if (typePokemon == 'normal') {
      return (typeIng = 'Normal');
    } else if (typePokemon == 'electric') {
      return (typeIng = 'Elétrico');
    } else if (typePokemon == 'ground') {
      return (typeIng = 'Terra');
    } else if (typePokemon == 'fairy') {
      return (typeIng = 'Fada');
    } else if (typePokemon == 'fighting') {
      return (typeIng = 'Lutador');
    } else if (typePokemon == 'psychic') {
      return (typeIng = 'Psiquico');
    } else if (typePokemon == 'rock') {
      return (typeIng = 'Pedra');
    } else if (typePokemon == 'steel') {
      return (typeIng = 'Metal');
    } else if (typePokemon == 'ice') {
      return (typeIng = 'Gelo');
    } else if (typePokemon == 'ghost') {
      return (typeIng = 'Fantasma');
    } else if (typePokemon == 'dragon') {
      return (typeIng = 'Dragão');
    }
    return '';
  }

  convertColorBackground(color: string): string {
    let background_color = '';

    if (color == 'grass') {
      return (background_color = '#048002');
    } else if (color == 'poison') {
      return (background_color = '#7f037f');
    } else if (color == 'fire') {
      return (background_color = '#f23219');
    } else if (color == 'water') {
      return (background_color = '#00a8ff');
    } else if (color == 'bug') {
      return (background_color = '#427a35');
    } else if (color == 'flying') {
      return (background_color = '#dac4be');
    } else if (color == 'normal') {
      return (background_color = '#e6a69a');
    } else if (color == 'electric') {
      return (background_color = '#b5bd00');
    } else if (color == 'ground') {
      return (background_color = '#8e413a');
    } else if (color == 'fairy') {
      return (background_color = '#ffabc6');
    } else if (color == 'fighting') {
      return (background_color = '#e68378');
    } else if (color == 'psychic') {
      return (background_color = '#d5db00');
    } else if (color == 'rock') {
      return (background_color = '#202020');
    } else if (color == 'steel') {
      return (background_color = '#808080');
    } else if (color == 'ice') {
      return (background_color = '#d8f1f5');
    } else if (color == 'ghost') {
      return (background_color = '#311ab8');
    } else if (color == 'dragon') {
      return (background_color = '#beda86');
    }
    return '';

    return '';
  }

  filterPokemonCheckbox(e: any) {
    let itemChecked = e.target.checked;
    let itemName = e.target.name;

    if (itemChecked) {
      this.itemsMarked = [...this.itemsMarked, itemName];
    } else {
      this.itemsMarked = this.itemsMarked.filter(
        (name) => name !== itemName
      );
    }

  }

  setDarkTheme(e: boolean) {
    this.isDarkTheme = e;
    localStorage.setItem('isDarkTheme', String(this.isDarkTheme));
  }

  /* Pagination */

  nextPagination(){
    this.offSetMaxPagination += 9;
    this.offSetMinPagination += 9;
    this.currentPage += 1;
    this.getPokemonsService();
  }
}
