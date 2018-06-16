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

}
