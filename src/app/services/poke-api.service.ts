import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private api: string = `https://pokeapi.co/api/v2`;

  /* /pokemon?offset=0&limit=151 */

  constructor(private http: HttpClient) {}

  getPokemonsPagination(minPokemon: number, maxPokemon: number): Observable<any> {
    return this.http.get<any>(`${this.api}/pokemon?offset=${minPokemon}&limit=${maxPokemon}`).pipe(
      tap((res) => {
        res.results.map((pokemon: any) => {
          this.http.get(pokemon.url).subscribe(status => {
            pokemon.status = status;
          })
        })
      }),
      tap((res) => {
        res.results.map((pokemon: any) => {
          this.http.get(pokemon.url).subscribe((details: any) => {
            this.http.get(details?.species.url).subscribe(species => {
              pokemon.species = species;
            })
          })
        })
      })
    )
  }

  getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.api}/pokemon?offset=0&limit=151`).pipe(
      tap((res) => {
        res.results.map((pokemon: any) => {
          this.http.get(pokemon.url).subscribe(status => {
            pokemon.status = status;
          })
        })
      }),
      tap((res) => {
        res.results.map((pokemon: any) => {
          this.http.get(pokemon.url).subscribe((details: any) => {
            this.http.get(details?.species.url).subscribe(species => {
              pokemon.species = species;
            })
          })
        })
      })
    )
  }

  getPokemonInfor(namePokemon: string): Observable<any>{
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}/`)
  }
}
