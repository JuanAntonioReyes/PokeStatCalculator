import { Component } from '@angular/core';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PokeStat Calculator';

  //public currentPokemon: Pokemon;

  public currentPokemon: Pokemon = {
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
	}

  pokemonSelected(pokemon) {
		//console.log(pokemon);
		this.currentPokemon = pokemon;
  }

}
