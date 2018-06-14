import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { POKEMONLIST } from '../mock-pokemon';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	pokemonList = POKEMONLIST;

	@Output()
  selectedPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

	selectPokemon(pokemon: Pokemon): void {
		this.selectedPokemon.emit(pokemon);
	}

  constructor() { }

  ngOnInit() {
  }

}
