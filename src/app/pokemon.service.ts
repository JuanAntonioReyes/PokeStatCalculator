import { Injectable } from '@angular/core';
import { Observable, of/*, forkJoin*/ } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from './pokemon';

import { POKEMONLIST } from './mock-pokemon';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

	private baseApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

	pokemonList: Pokemon[] = [];
	numberOfPokemon: number = 10;

  constructor(private http: HttpClient) { }

	getPokemon(): /*Observable<Pokemon[]>*/void {
		//let pokemonList: Pokemon[] = [];
		//let observableList: Observable<Object>[] = [];

		for (let i = 1; i < (this.numberOfPokemon + 1); i++) {
			//observableList.push(this.http.get(this.baseApiUrl + i));
			this.http.get(this.baseApiUrl + i)
			.subscribe( data => this.pokemonList.push(this.makePokemon(data)) );
		}
/*
		forkJoin(observableList)
			.subscribe(
				data => {
					data.forEach((pokeData, i) => {
						pokemonList.push(this.makePokemon(pokeData));
					});
				}
			);*/

		//return of(pokemonList);
		//return of(POKEMONLIST);
	}

	makePokemon(data): Pokemon {
		let pokemon: Pokemon = {
			id: data.id,
			name: data.name,
			level: 1,
			baseStats: {
				hp: data.stats[5].base_stat,
				attack: data.stats[4].base_stat,
				defense: data.stats[3].base_stat,
				spAttack: data.stats[2].base_stat,
				spDefense: data.stats[1].base_stat,
				speed: data.stats[0].base_stat
			}
		}

		return pokemon;
	}
}
