import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../pokemon';
import { Stat } from '../stat';

import { STATSLIST } from '../stats-list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	pokemonList: Pokemon[] = [];

  stats: Stat[];

  sortListBy: string = 'id';
  reverseList: number = -1;

	@Output()
  selectedPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private pokemonService: PokemonService) {
    this.stats = STATSLIST;
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
