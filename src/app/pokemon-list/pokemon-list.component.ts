import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon, STATS_NAMES } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	pokemonList: Pokemon[] = [];

  statsNames: string[][];

  sortListBy: string = 'id';
  reverseList: number = -1;

	@Output()
  selectedPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private pokemonService: PokemonService) {
    this.statsNames = STATS_NAMES;
  }

  ngOnInit() {
    this.getPokemon();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon.emit(pokemon);
  }

  getPokemon(): void {
    this.pokemonService.getPokemon().subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  changeListSorting(sortListBy): void {
    this.sortListBy = sortListBy;
    this.reverseList *= -1;
  }

}
