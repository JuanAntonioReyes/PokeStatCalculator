import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

let sortByValue = null;
let reverseSort = -1;

@Pipe({
  name: 'order'/*,
  pure: false*/
})

export class OrderPipe implements PipeTransform {

	// UGLY PATCH - TRY TO FIND A BETTER SOLUTION
	// The "elements" parameter is passed to force the pipe to be called when
	// we add pokemon to the list with push (The pure pipe needs a pure change
	// to be called, like the "elements" value that changes with the list length)
	transform(value: Pokemon[], sortListBy: string, reverseList: number, elements: number): Pokemon[] {
		sortByValue = sortListBy;
		reverseSort = reverseList;

		return value.sort(compareByStat);

	}

}

function compareByStat(a, b) {
	let byStat = false;
	if ((sortByValue !== 'id') && (sortByValue !== 'name')) {
		byStat = true;
	}

	let lt, gt;
	if (byStat) {
		lt = (a.baseStats[sortByValue] < b.baseStats[sortByValue]);
		gt = (a.baseStats[sortByValue] > b.baseStats[sortByValue]);
	} else {
		lt = (a[sortByValue] < b[sortByValue]);
		gt = (a[sortByValue] > b[sortByValue]);
	}

	if (lt) return (1 * reverseSort);
	if (gt) return (-1 * reverseSort);
	return 0;
}