import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private api: string = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`;

  /*  */

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.api}`).pipe(
      tap((res) => {
        res.results.map((pokemon: any) => {
          this.http.get(pokemon.url).subscribe(status => {
            pokemon.status = status;
          })
        })
      })
    )
  }

  getPokemonInfor(namePokemon: string): Observable<any>{
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}/`)
  }
}
