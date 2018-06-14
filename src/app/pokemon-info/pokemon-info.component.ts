import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})

export class PokemonInfoComponent implements OnInit {

	@Input() pokemon: Pokemon;

/*	pokemon: Pokemon = {
		id: 1,
		name: 'Bulbasaur',
		level: 1,
		stats: {
			hp: 1,
			attack: 1,
			defense: 1,
			spAttack: 1,
			spDefense: 1,
			speed: 1
		}
	}*/

  constructor() { }

  ngOnInit() {
  }

}
