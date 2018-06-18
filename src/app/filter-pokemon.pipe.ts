import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'filterPokemon'
})
export class FilterPokemonPipe implements PipeTransform {

	// UGLY PATCH? - TRY TO FIND A BETTER SOLUTION?
	// The "elements" parameter is passed to force the pipe to be called when
	// we add pokemon to the list with push (The pure pipe needs a pure change
	// to be called, like the "elements" value that changes with the list length)
	// So the pokemon will be visible and sorted even if we see them wile they 
	// are being pushed into the list
	transform(value: Pokemon[],
						name: string,
						minHp: number, maxHp: number,
						minAttack: number, maxAttack: number,
						minDefense: number, maxDefense: number,
						minSpAttack: number, maxSpAttack: number,
						minSpDefense: number, maxSpDefense: number,
						minSpeed: number, maxSpeed: number,
						elements: number): Pokemon[] {
		
		let filteredPokemon: Pokemon[];

		// Filter by name
		name = name.trim().toUpperCase();

		filteredPokemon = value.filter(pokemon => {
												return ( pokemon.name.toUpperCase().includes(name) );
											});

		// Filter by HP
		if ( (!isNaN(minHp) && (minHp !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.hp >= minHp );
												});
		}
		if ( (!isNaN(maxHp) && (maxHp !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.hp <= maxHp );
												});
		}

		// Filter by attack
		if ( (!isNaN(minAttack) && (minAttack !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.attack >= minAttack );
												});
		}
		if ( (!isNaN(maxAttack) && (maxAttack !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.attack <= maxAttack );
												});
		}

		// Filter by defense
		if ( (!isNaN(minDefense) && (minDefense !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.defense >= minDefense );
												});
		}
		if ( (!isNaN(maxDefense) && (maxDefense !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.defense <= maxDefense );
												});
		}

		// Filter by special attack
		if ( (!isNaN(minSpAttack) && (minSpAttack !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.spAttack >= minSpAttack );
												});
		}
		if ( (!isNaN(maxSpAttack) && (maxSpAttack !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.spAttack <= maxSpAttack );
												});
		}

		// Filter by special defense
		if ( (!isNaN(minSpDefense) && (minSpDefense !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.spDefense >= minSpDefense );
												});
		}
		if ( (!isNaN(maxSpDefense) && (maxSpDefense !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.spDefense <= maxSpDefense );
												});
		}

		// Filter by speed
		if ( (!isNaN(minSpeed) && (minSpeed !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.speed >= minSpeed );
												});
		}
		if ( (!isNaN(maxSpeed) && (maxSpeed !== null) ) {
			filteredPokemon = filteredPokemon.filter(pokemon => {
													return ( pokemon.baseStats.speed <= maxSpeed );
												});
		}

		return filteredPokemon;
	}

}