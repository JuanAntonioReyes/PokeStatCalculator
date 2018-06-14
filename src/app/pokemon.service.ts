import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POKEMONLIST } from './mock-pokemon';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor() { }

  getPokemon(): Observable<Pokemon[]> {
  	return of(POKEMONLIST);
  }
}
