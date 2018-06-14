import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})

export class PokemonInfoComponent implements OnInit {

	@Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit() {
  }

}
