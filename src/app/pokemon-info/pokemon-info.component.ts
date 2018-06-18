import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../classes/pokemon';
import { Stat } from '../classes/stat';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})

export class PokemonInfoComponent implements OnInit {

	naturesList: string[] = [];

	pokemonLevel: number = null;
	pokemonNature: string = null;

  constructor(private pokemonService: PokemonService) {
  	this.pokemonLevel = 100;
  	this.pokemonNature = 'adamant';
  }

	ngOnInit() {
		this.getNatures();
	}

	getNatures(): void {
		this.pokemonService.getNatures().subscribe(naturesList => this.naturesList = naturesList);
	}

	checkStatHighLow(statName): number {
		let pokemon: Pokemon = this.pokemonService.selectedPokemon;

		let isHighest: boolean = true;
		let isLowest: boolean = true;
		
		this.pokemonService.statsList.forEach(stat => {
			if ( pokemon.baseStats[stat.shortName] > pokemon.baseStats[statName] ) {
				isHighest = false;
			}
			if ( pokemon.baseStats[stat.shortName] < pokemon.baseStats[statName] ) {
				isLowest = false;
			}
		});
		
		if (isHighest) return 1;
		if (isLowest) return -1;
		return 0;
	}

	checkAffectingNature(stat: Stat): number {
		let isFavorable: boolean = false;
		let isUnfavorable: boolean = false;
		
		if(stat.affectingNatures.increase.includes(this.pokemonNature)) isFavorable = true;
		if(stat.affectingNatures.decrease.includes(this.pokemonNature)) isUnfavorable = true;
		
		if (isFavorable) return 1;
		if (isUnfavorable) return -1;
		return 0;
	}

	calculateStat(statId): number {
		let pokemon: Pokemon = this.pokemonService.selectedPokemon;

		let stat: Stat = this.pokemonService.statsList[(statId - 1)];
		let statValue: number;

		let natureMultiplier = 1;
		if (stat.affectingNatures.increase.includes(this.pokemonNature)){
			natureMultiplier = 1.1;
		}
		if (stat.affectingNatures.decrease.includes(this.pokemonNature)){
			natureMultiplier = 0.9;
		}

		let doublePlusIvEv = ( (pokemon.baseStats[stat.shortName] * 2) + stat.iv + (stat.ev / 4) );
		let commonValue = ( doublePlusIvEv * this.pokemonLevel / 100 );

		if (stat.shortName === 'hp') {
			statValue = (commonValue + this.pokemonLevel + 10);
		} else {
			statValue = ( (commonValue + 5) * natureMultiplier);
		}

		return Math.floor(statValue);
	}

	validateDataInput(validationType: string, stat: Stat = null): void {
		if (validationType === 'level') {

			if (this.pokemonLevel < 1) this.pokemonLevel = 1;
			else if ( this.pokemonLevel > 100 ||
								isNaN(this.pokemonLevel) ||
								(this.pokemonLevel === null) ) this.pokemonLevel = 100;

		} else if (validationType === 'iv') {

			if (stat.iv < 0) stat.iv = 0;
			else if ( (stat.iv > 31) ||
								isNaN(stat.iv) ||
								(stat.iv === null) ) stat.iv = 31;

		} else if (validationType === 'ev' ) {
			
			if ( (stat.ev < 0) ||
						isNaN(stat.ev) ||
						(stat.ev === null) ) stat.ev = 0;
			else if (stat.ev > 255) stat.ev = 255;

		}
	}

	totalEvs(): number {
		let totalEvs = 0;
		this.pokemonService.statsList.forEach(stat => totalEvs += stat.ev);
		return totalEvs;
	}

}
