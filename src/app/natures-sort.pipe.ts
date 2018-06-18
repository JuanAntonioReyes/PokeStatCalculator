import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'naturesSort'
})
export class NaturesSortPipe implements PipeTransform {

	// UGLY PATCH? - TRY TO FIND A BETTER SOLUTION?
	// The "elements" parameter is passed to force the pipe to be called when
	// we add natures to the list with push (The pure pipe needs a pure change
	// to be called, like the "elements" value that changes with the list length)
	// So the natures will be sorted even if we see them wile they are being
	// pushed into the list
	transform(value: string[], elements: number): string[] {
		return value.sort();
	}

}
