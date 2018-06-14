import { Injectable } from '@angular/core';
import { POKEMONLIST } from './mock-pokemon';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor() { }

  getPokemon(): Pokemon[] {
  	return POKEMONLIST;
  }
}
