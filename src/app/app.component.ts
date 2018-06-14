import { Component } from '@angular/core';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PokeStat Calculator';

  public currentPokemon: Pokemon = null;

  pokemonSelected(pokemon) {
		this.currentPokemon = pokemon;
  }

}
