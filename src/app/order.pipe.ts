import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

let sortByValue = null;
let reverseSort = -1;

@Pipe({
  name: 'order'
})

export class OrderPipe implements PipeTransform {

	transform(value: Pokemon[], sortListBy: string, reverseList: number): Pokemon[] {
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