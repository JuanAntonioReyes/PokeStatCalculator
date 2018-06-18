import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../classes/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	pokemonList: Pokemon[] = [];

  // Filters
  // They need to be in separate variables for making the filter pipe calls
  // when the bounded ngModel values are changed
  nameFilter: string = null;
  minHp: number = null;
  maxHp: number = null;
  minAttack: number = null;
  maxAttack: number = null;
  minDefense: number = null;
  maxDefense: number = null;
  minSpAttack: number = null;
  maxSpAttack: number = null;
  minSpDefense: number = null;
  maxSpDefense: number = null;
  minSpeed: number = null;
  maxSpeed: number = null;

  sortListBy: string = null;
  reverseList: number = null;

  constructor(private pokemonService: PokemonService) {
    this.nameFilter = '';

    this.sortListBy = 'id';
    this.reverseList = -1;
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

  clearFilters(): void {
    this.nameFilter = '';
    this.minHp = null;
    this.maxHp = null;
    this.minAttack = null;
    this.maxAttack = null;
    this.minDefense = null;
    this.maxDefense = null;
    this.minSpAttack = null;
    this.maxSpAttack = null;
    this.minSpDefense = null;
    this.maxSpDefense = null;
    this.minSpeed = null;
    this.maxSpeed = null;
  }

}
