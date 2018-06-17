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

  constructor(private pokemonService: PokemonService) {

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

		// iv and ep not implemented yet, used neutral values
		let iv = 0;
		let ep = 0;

		let natureMultiplier = 1;

		if (stat.affectingNatures.increase.includes(this.pokemon.nature)){
			console.log(stat.name + " increased by " + this.pokemon.nature + " nature.");
			natureMultiplier = 1.1;
		}

		if (stat.affectingNatures.decrease.includes(this.pokemon.nature)){
			console.log(stat.name + " decreased by " + this.pokemon.nature + " nature.");
			natureMultiplier = 0.9;
		}

		let doublePlusIvEp = ( (this.pokemon.baseStats[stat.shortName] * 2) + iv + ep );
		let commonValue = ( doublePlusIvEp * this.pokemon.level / 100 );

		if (stat.shortName === 'hp') {
			statValue = (commonValue + this.pokemon.level + 10);
		} else {
			statValue = ( (commonValue + 5) * natureMultiplier);
		}

		return Math.floor(statValue);
	}

}
