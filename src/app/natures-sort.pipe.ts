import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'naturesSort'
})
export class NaturesSortPipe implements PipeTransform {

	transform(value: string[]): string[] {
		return value.sort();
	}

}
