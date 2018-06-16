import { Component, OnInit, Input } from '@angular/core';
import { Pokemon, STATS_NAMES } from '../pokemon';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})

export class PokemonInfoComponent implements OnInit {

	statsNames: string[][];

	@Input() pokemon: Pokemon;

  constructor() {
  	this.statsNames = STATS_NAMES;
  }

  ngOnInit() {

  }

	checkStatIsHighest(stat): boolean {
		let isHighest = true;

		STATS_NAMES.forEach(statName => {
			if (this.pokemon.baseStats[statName[0]] > this.pokemon.baseStats[stat]) {
				isHighest = false;
			}
		});

		return isHighest;
	}

	checkStatIsLowest(stat): boolean {
		let isLowest = true;

		STATS_NAMES.forEach(statName => {
			if (this.pokemon.baseStats[statName[0]] < this.pokemon.baseStats[stat]) {
				isLowest = false;
			}
		});

		return isLowest;
	}

	calculateStat(stat): number {
		let statValue: number;

		// iv, ep and nature not implemented yet, used neutral values
		let iv = 0;
		let ep = 0;
		let natureMultiplier = 1;

		let doublePlusIvEp = ( (this.pokemon.baseStats[stat] * 2) + iv + ep );
		let commonValue = ( doublePlusIvEp * this.pokemon.level / 100 );

		if (stat === 'hp') {
			statValue = (commonValue + this.pokemon.level + 10);
		} else {
			statValue = ( (commonValue + 5) * natureMultiplier);
		}

		return Math.floor(statValue);
	}

}
