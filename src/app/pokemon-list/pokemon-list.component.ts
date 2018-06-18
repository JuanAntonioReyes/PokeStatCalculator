import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	pokemonList: Pokemon[] = [];

  sortListBy: string = 'id';
  reverseList: number = -1;

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit() {
    this.getPokemon();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.pokemonService.selectedPokemon = pokemon;
  }

  getPokemon(): void {
    this.pokemonService.getPokemon().subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  changeListSorting(sortListBy): void {
    this.sortListBy = sortListBy;
    this.reverseList *= -1;
  }

}
