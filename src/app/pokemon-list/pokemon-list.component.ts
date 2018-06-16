import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	//pokemonList: Pokemon[];

  sortListBy: string = 'id';
  reverseList: number = -1;

	@Output()
  selectedPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemon();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon.emit(pokemon);
  }

/*  getPokemon(): void {
    this.pokemonService.getPokemon().subscribe(lista => this.pokemonList = lista);
  }*/

  changeListSorting(sortListBy): void {
    this.sortListBy = sortListBy;
    this.reverseList *= -1;
  }

}
