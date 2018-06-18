import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'filterPokemon'
})
export class FilterPokemonPipe implements PipeTransform {

  transform(value: Pokemon[], nameInput: string): Pokemon[] {
    nameInput = nameInput.trim().toUpperCase();

		return value.filter(pokemon => {
			return ( pokemon.name.toUpperCase().includes(nameInput) );
		});

  }

}