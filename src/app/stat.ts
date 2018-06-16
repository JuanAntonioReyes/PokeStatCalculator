export class Stat {
	id: number;
	shortName: string;
	name: string;
	affectingNatures: {
		increase: string[];
		decrease: string[];
	}
}