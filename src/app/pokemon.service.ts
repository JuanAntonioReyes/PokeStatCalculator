import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from './pokemon';
import { Stat } from './stat';

import { STATSLIST } from './stats-list';

import { POKEMONLIST } from './mock-pokemon';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

	numberOfPokemon: number = null;
	naturesList: string[] = null;

	private baseApiUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {
  	this.numberOfPokemon = 5;
  	this.naturesList = [];
  }

	getPokemon(): Observable<Pokemon[]> {
		let pokemonList: Pokemon[] = [];

		for (let i = 1; i <= this.numberOfPokemon; i++) {
			this.http.get(this.baseApiUrl + 'pokemon/' + i)
			.subscribe( data => pokemonList.push(this.makePokemon(data)) );
		}

		return of(pokemonList);
		//return of(POKEMONLIST);
	}

	setStatsAffectingNatures(): void {
		// The stat 1 (HP) isn't affected by any nature
		for (let i = 2, l = STATSLIST.length; i <= l; i++) {
			this.http.get(this.baseApiUrl + 'stat/' + i)
			.subscribe( data => this.processStat(data) );
		}
		console.log(this.naturesList);
	}

	makePokemon(data): Pokemon {
		let pokemon: Pokemon = {
			id: data.id,
			name: data.name,
			level: 1,
			spriteUrl: data.sprites.front_default,
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

	processStat(data): void {
		data.affecting_natures.increase.forEach(inc => {
			STATSLIST[(data.id - 1)].affectingNatures.increase.push(inc.name);
			// inc.name will take the name of all the available natures, so
			// we can add them to the natures list to have them available
			// for the user
			this.naturesList.push(inc.name);
		});

		data.affecting_natures.decrease.forEach(dec => {
			STATSLIST[(data.id - 1)].affectingNatures.decrease.push(dec.name);
		});
	}
}
