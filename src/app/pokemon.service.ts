import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from './pokemon';
import { Stat } from './stat';

import { STATSLIST } from './stats-list';

import { POKEMONLIST } from './mock-pokemon';

const NUMBER_OF_POKEMON = 25;
const NUMBER_OF_NATURES = 25;

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

	//numberOfPokemon: number = null;
	//numberOfNatures: number = null;
	//naturesList: string[] = null;

	private baseApiUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {
  	//this.naturesList = [];
  }

	getPokemon(): Observable<Pokemon[]> {
/*		let pokemonList: Pokemon[] = [];

		for (let i = 1; i <= NUMBER_OF_POKEMON; i++) {
			this.http.get(this.baseApiUrl + 'pokemon/' + i)
			.subscribe( data => pokemonList.push(this.makePokemon(data)) );
		}

		return of(pokemonList);*/
		return of(POKEMONLIST);
	}

	getNatures(): Observable<string[]> {
		let naturesList: string[] = [];

/*		for (let i = 1; i <= NUMBER_OF_NATURES; i++) {
			this.http.get(this.baseApiUrl + 'nature/' + i)
			.subscribe( data => naturesList.push(this.processNature(data)) );
		}*/

		return of(naturesList);
	}

/*	setStatsAffectingNatures(): void {
		// The stat 1 (HP) isn't affected by any nature
		for (let i = 2, l = STATSLIST.length; i <= l; i++) {
			this.http.get(this.baseApiUrl + 'stat/' + i)
			.subscribe( data => this.processStat(data) );
		}
	}*/

	makePokemon(data): Pokemon {
		let pokemon: Pokemon = {
			id: data.id,
			name: data.name,
			level: 1,
			nature: 'adamant',
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

/*	processStat(data): void {
		data.affecting_natures.increase.forEach(inc => {
			STATSLIST[(data.id - 1)].affectingNatures.increase.push(inc.name);
			// TEMPORAL
			// - TODO - Load the natures from the API (There's some natures that don't have any effect)
			this.naturesList.push(inc.name);
		});

		data.affecting_natures.decrease.forEach(dec => {
			STATSLIST[(data.id - 1)].affectingNatures.decrease.push(dec.name);
		});
	}*/

	processNature(data): string {
		let increasedStat = data.increased_stat;
		let decreasedStat = data.decreased_stat;
		let statId;

		if (increasedStat) {
			// Get stat id from its URL
			statId = parseInt( increasedStat.url.slice(-2, -1) );
			STATSLIST[(statId - 1)].affectingNatures.increase.push(increasedStat.name);
		}

		if (decreasedStat) {
			// Get stat id from its URL
			statId = parseInt( increasedStat.url.slice(-2, -1) );
			STATSLIST[(statId - 1)].affectingNatures.decrease.push(decreasedStat.name);
		}

		return data.name;
	}
}
