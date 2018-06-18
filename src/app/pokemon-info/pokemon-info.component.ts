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

	// Returns 1 if the stat is the highest (Or one of the highests), -1 if the
	// stat is the lowest and 0 if the stat is neither the highest or the lowest
	checkStatHighLow(statName: string): number {
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

	// Returns 1 if the stat is increased by the selected nature, -1 if it is
	// decreased and 0 if it is neither increased or decreased
	checkAffectingNature(stat: Stat): number {
		let isFavorable: boolean = false;
		let isUnfavorable: boolean = false;
		
		if(stat.affectingNatures.increase.includes(this.pokemonNature)) isFavorable = true;
		if(stat.affectingNatures.decrease.includes(this.pokemonNature)) isUnfavorable = true;
		
		if (isFavorable) return 1;
		if (isUnfavorable) return -1;
		return 0;
	}

	calculateStat(stat: Stat): number {
		let pokemon: Pokemon = this.pokemonService.selectedPokemon;

		let statFinalValue: number;

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
			statFinalValue = (commonValue + this.pokemonLevel + 10);
		} else {
			statFinalValue = ( (commonValue + 5) * natureMultiplier);
		}

		return Math.floor(statFinalValue);
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

	hiddenPowerType(): string {
		let hiddenPowerTypesList: string[] = ['Fighting', 'Flying', 'Poison',
																					'Ground', 'Rock', 'Bug', 'Ghost',
																					'Steel', 'Fire', 'Water', 'Grass',
																					'Electric', 'Psychic', 'Ice',
																					'Dragon', 'Dark']

		// If the IV of the corresponding stat are odd, the value will be 1,
		// otherwise, it will be 0
		// HP IV
		let a: number = (this.pokemonService.statsList[0].iv % 2) ? 1 : 0;
		// Attack IV
		let b: number = (this.pokemonService.statsList[1].iv % 2) ? 1 : 0;
		// Defense IV
		let c: number = (this.pokemonService.statsList[2].iv % 2) ? 1 : 0;
		// Speed IV
		let d: number = (this.pokemonService.statsList[5].iv % 2) ? 1 : 0;
		// Special Attack IV
		let e: number = (this.pokemonService.statsList[3].iv % 2) ? 1 : 0;
		// Special Defense IV
		let f: number = (this.pokemonService.statsList[4].iv % 2) ? 1 : 0;

		let valuesSum: number = (a + 2*b + 4*c + 8*d + 16*e + 32*f);
		let hPTypeIndex: number = Math.floor((valuesSum * 15) / 63)

		return hiddenPowerTypesList[hPTypeIndex];
	}

	hiddenPowerDamage(): number {
		let remainder: number;
		// If the IV of the corresponding stat divided by 4 have a remainder of
		// 2 or 3, the value will be 1, otherwise, it will be 0
		// HP IV
		remainder = (this.pokemonService.statsList[0].iv % 4);
		let u: number = ( (remainder === 2) || (remainder === 3) ) ? 1 : 0;
		// Attack IV
		remainder = (this.pokemonService.statsList[1].iv % 4);
		let v: number = ( (remainder === 2) || (remainder === 3) ) ? 1 : 0;
		// Defense IV
		remainder = (this.pokemonService.statsList[2].iv % 4);
		let w: number = ( (remainder === 2) || (remainder === 3) ) ? 1 : 0;
		// Speed IV
		remainder = (this.pokemonService.statsList[5].iv % 4);
		let x: number = ( (remainder === 2) || (remainder === 3) ) ? 1 : 0;
		// Special Attack IV
		remainder = (this.pokemonService.statsList[3].iv % 4);
		let y: number = ( (remainder === 2) || (remainder === 3) ) ? 1 : 0;
		// Special Defense IV
		remainder = (this.pokemonService.statsList[4].iv % 4);
		let z: number = ( (remainder === 2) || (remainder === 3) ) ? 1 : 0;

		let valuesSum: number = (u + 2*v + 4*w + 8*x + 16*y + 32*z);
		let hPDamageIndex: number = Math.floor( ((valuesSum * 40) / 63) + 30 );

		return hPDamageIndex;
	}

}
