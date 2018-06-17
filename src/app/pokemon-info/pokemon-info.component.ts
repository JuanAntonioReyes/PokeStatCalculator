import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../pokemon';
import { Stat } from '../stat';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})

export class PokemonInfoComponent implements OnInit {

	naturesList: string[] = [];

	@Input() pokemon: Pokemon;

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

	checkStatIsHighest(statName): boolean {
		let isHighest = true;

		this.pokemonService.statsList.forEach(stat => {
			if (this.pokemon.baseStats[statName] > this.pokemon.baseStats[stat.shortName]) {
				isHighest = false;
			}
		});

		return isHighest;
	}

	checkStatIsLowest(statName): boolean {
		let isLowest = true;

		this.pokemonService.statsList.forEach(stat => {
			if (this.pokemon.baseStats[statName] < this.pokemon.baseStats[stat.shortName]) {
				isLowest = false;
			}
		});

		return isLowest;
	}

	calculateStat(statId): number {
		let stat: Stat = this.pokemonService.statsList[(statId - 1)];
		let statValue: number;

		let natureMultiplier = 1;
		if (stat.affectingNatures.increase.includes(this.pokemonNature)){
			natureMultiplier = 1.1;
		}
		if (stat.affectingNatures.decrease.includes(this.pokemonNature)){
			natureMultiplier = 0.9;
		}

		// Check if the user input values (If they are not, change them to be correct)
		//if (this.pokemonLevel < 1) this.pokemonLevel = 1;
		//else if (this.pokemonLevel > 100) this.pokemonLevel = 100;

		let doublePlusIvEv = ( (this.pokemon.baseStats[stat.shortName] * 2) + stat.iv + (stat.ev / 4) );
		let commonValue = ( doublePlusIvEv * this.pokemonLevel / 100 );

		if (stat.shortName === 'hp') {
			statValue = (commonValue + this.pokemonLevel + 10);
		} else {
			statValue = ( (commonValue + 5) * natureMultiplier);
		}

		return Math.floor(statValue);
	}

	validateDataInput(validationType: string, statId: number = -1): void {
		if (validationType === 'level') {

			if (this.pokemonLevel < 1) this.pokemonLevel = 1;
			else if (this.pokemonLevel > 100) this.pokemonLevel = 100;

		} else if (validationType === 'iv') {

			let iv = this.pokemonService.statsList[(statId - 1)].iv;

			if (iv < 0) this.pokemonService.statsList[(statId - 1)].iv = 0;
			if (iv > 31) this.pokemonService.statsList[(statId - 1)].iv = 31;

		} else if (validationType === 'ev' ) {
			
			let ev = this.pokemonService.statsList[(statId - 1)].ev;

			if (ev < 0) this.pokemonService.statsList[(statId - 1)].ev = 0;
			if (ev > 255) this.pokemonService.statsList[(statId - 1)].ev = 255;

		}
	}

	totalEvs(): number {
		let totalEvs = 0;
		this.pokemonService.statsList.forEach(stat => totalEvs += stat.ev);
		return totalEvs;
	}

}
