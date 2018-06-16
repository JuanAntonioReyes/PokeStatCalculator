import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../pokemon';
import { Stat } from '../stat';

import { STATSLIST } from '../stats-list';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})

export class PokemonInfoComponent implements OnInit {

	stats: Stat[];
	naturesList: any[] = [];

	@Input() pokemon: Pokemon;

  constructor(private pokemonService: PokemonService) {
  	this.stats = STATSLIST;
  }

  ngOnInit() {
		this.pokemonService.setStatsAffectingNatures();
  }

	checkStatIsHighest(statName): boolean {
		let isHighest = true;

		this.stats.forEach(stat => {
			if (this.pokemon.baseStats[statName] > this.pokemon.baseStats[stat.shortName]) {
				isHighest = false;
			}
		});

		return isHighest;
	}

	checkStatIsLowest(statName): boolean {
		let isLowest = true;

		this.stats.forEach(stat => {
			if (this.pokemon.baseStats[statName] < this.pokemon.baseStats[stat.shortName]) {
				isLowest = false;
			}
		});

		return isLowest;
	}

	calculateStat(statName): number {
		let statValue: number;

		// iv, ep and nature not implemented yet, used neutral values
		let iv = 0;
		let ep = 0;
		let natureMultiplier = 1;

		let doublePlusIvEp = ( (this.pokemon.baseStats[statName] * 2) + iv + ep );
		let commonValue = ( doublePlusIvEp * this.pokemon.level / 100 );

		if (statName === 'hp') {
			statValue = (commonValue + this.pokemon.level + 10);
		} else {
			statValue = ( (commonValue + 5) * natureMultiplier);
		}

		return Math.floor(statValue);
	}

}
