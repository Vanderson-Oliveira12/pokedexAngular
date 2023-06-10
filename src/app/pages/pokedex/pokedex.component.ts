import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { cardHoverTrigger } from 'src/app/animations/animations';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  animations: [
    cardHoverTrigger
  ]
})
export class PokedexComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  pokeIndexHover: number = -1;
  debounce: Subject<string> = new Subject<string>();
  inputValue: string = '';
  isLoading: boolean = true;
  isLoadingSpinner: boolean = false;
  isLoadingModal: boolean = true;
  listPokemons: any[] = [];
  listPokemonsPagination: any[] = [];
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
  offSetMinPagination: number = 0;
  offSetMaxPagination: number = 6;

  constructor(private pokeApiService: PokeApiService, private el: ElementRef) {}

  isModalOpen: boolean = false;
  isDarkTheme: boolean = false;
  isMenuTypeOpen: boolean = false;
  isButtonMoreShow: boolean = true;

  ngOnInit(): void {
    this.getAllPokemon();
    this.getPokemonList();

    let themeStorage: any = localStorage.getItem('isDarkTheme');

    if (themeStorage == 'false') {
      themeStorage = false;
      this.isDarkTheme = themeStorage;
    } else {
      themeStorage = true;
      this.isDarkTheme = themeStorage;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getAllPokemon() {
    let sub = this.pokeApiService.getPokemons().subscribe((res) => {
      let results = res.results;
      this.listPokemonsAll = results;
    });

    this.subs.add(sub);
  }

  getPokemonList() {
    this.isLoading = true;

    const offSet = this.offSetMinPagination;
    const offSetMax = this.offSetMaxPagination;

    let sub = this.pokeApiService
      .getPokemonsPagination(offSet, offSetMax)
      .subscribe((res) => {
        const results = res.results;
        this.listPokemonsPagination = results;
        this.listPokemons = results;
        setTimeout(() => (this.isLoading = false), 1000);
      });

    this.subs.add(sub);
  }

  closeModalContainer() {
    this.isModalOpen = false;
    this.el.nativeElement.closest('body').style.overflowY = 'scroll';
    this.isLoadingModal = true;
  }

  openDetailsPokemon(pokemonSelected: any) {
    const idPokemon = String(pokemonSelected.status.id);
    this.isModalOpen = true;
    this.el.nativeElement.closest('body').style.overflow = 'hidden';

    this.pokemonSelected = {
      ...pokemonSelected
    }

    let sub = this.pokeApiService
      .getPokemonInfor(idPokemon)
      .subscribe((pokemon) => {
        this.isLoadingModal = false;
        this.pokemonSelected.details = pokemon;
      });

    this.subs.add(sub);
  }

  filterPokemonPerName(e: any) {
    const value = this.inputValue;
    if (value !== '') {
      this.listPokemons = this.listPokemonsAll.filter((pokemon) => {
        let inputFormat = value.toLocaleLowerCase();
        return pokemon.name.includes(inputFormat);
      });

    } else {
      this.listPokemons = this.listPokemonsPagination;
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
    this.isButtonMoreShow = false;
    let itemChecked = e.target.checked;
    let itemName = e.target.name;
    let newPokeFilterArr: any[] = [];

    if (itemChecked) {
      this.itemsMarked = [...this.itemsMarked, itemName];

      this.itemsMarked.forEach((type) => {
        this.listPokemonsAll.filter((pokemon) => {
          let typePoke = pokemon.status.types[0].type.name;
          let secondTypePoke = pokemon.status.types[1]?.type.name;

          if (type == typePoke || type == secondTypePoke) {
            newPokeFilterArr.push(pokemon);
          }
        });
      });

      this.listPokemons = newPokeFilterArr;
    } else {
      this.itemsMarked = this.itemsMarked.filter((name) => name !== itemName);

      this.itemsMarked.forEach((type) => {
        this.listPokemonsAll.filter((pokemon) => {
          let typePoke = pokemon.status.types[0].type.name;
          let secondTypePoke = pokemon.status.types[1]?.type.name;

          if (type == typePoke || type == secondTypePoke) {
            newPokeFilterArr.push(pokemon);
          }
        });
      });

      this.listPokemons = newPokeFilterArr;
    }

    if (!this.itemsMarked.length) {
      this.listPokemons = this.listPokemonsPagination;
      this.isButtonMoreShow = true;
    }
  }

  setDarkTheme(e: boolean) {
    this.isDarkTheme = e;
    localStorage.setItem('isDarkTheme', String(this.isDarkTheme));
  }

  getMorePokemon() {
    this.isLoadingSpinner = true;
    this.offSetMinPagination += 6;

    let sub = this.pokeApiService
      .getPokemonsPagination(this.offSetMinPagination, this.offSetMaxPagination)
      .subscribe((res) => {
        const results = res.results;
        this.listPokemons.push(...results);
        this.isLoadingSpinner = false;
      });

    this.subs.add(sub);
  }

  whichElementClicked(e: Event){
    let elementClicked = e.target as HTMLDivElement;
    let elementClassRef = "pokemons-details-modal"

    if(elementClicked.classList.contains(elementClassRef)){
      this.closeModalContainer();
    } else {
      return;
    }
  }
}
