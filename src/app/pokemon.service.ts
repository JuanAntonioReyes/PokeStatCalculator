import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from './classes/pokemon';
import { Stat } from './classes/stat';

import { STATSLIST } from './classes/stats-list';

// Mock pokemon list
import { POKEMONLIST } from './classes/mock-pokemon';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

	private baseApiUrl: string = 'https://pokeapi.co/api/v2/';

	numberOfPokemon: number = 25;
	numberOfNatures: number = 25;

	selectedPokemon: Pokemon = null;

	statsList: Stat[] = null;

  constructor(private http: HttpClient) {
		this.statsList = STATSLIST;
  }

	getPokemon(): Observable<Pokemon[]> {
/*		let pokemonList: Pokemon[] = [];

		for (let i = 1; i <= this.numberOfPokemon; i++) {
			this.http.get(this.baseApiUrl + 'pokemon/' + i)
			.subscribe( data => pokemonList.push(this.makePokemon(data)) );
		}

		return of(pokemonList);*/
		return of(POKEMONLIST);
	}

	getNatures(): Observable<string[]> {
		let naturesList: string[] = [];

/*		for (let i = 1; i <= this.numberOfNatures; i++) {
			this.http.get(this.baseApiUrl + 'nature/' + i)
			.subscribe( data => naturesList.push(this.processNature(data)) );
		}*/

		return of(naturesList);
	}

	makePokemon(data): Pokemon {
		let pokemon: Pokemon = {
			id: data.id,
			name: data.name,
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

	processNature(data): string {
		let increasedStat = data.increased_stat;
		let decreasedStat = data.decreased_stat;
		let statId;

		if (increasedStat) {
			// Get stat id from its URL
			statId = parseInt( increasedStat.url.slice(-2, -1) );
			this.statsList[(statId - 1)].affectingNatures.increase.push(data.name);
		}

		if (decreasedStat) {
			// Get stat id from its URL
			statId = parseInt( decreasedStat.url.slice(-2, -1) );
			this.statsList[(statId - 1)].affectingNatures.decrease.push(data.name);
		}

		return data.name;
	}
}
