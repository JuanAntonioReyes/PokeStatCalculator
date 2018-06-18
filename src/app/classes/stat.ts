export class Stat {
	id: number;
	shortName: string;
	name: string;
	iv: number;
	ev: number;
	affectingNatures: {
		increase: string[];
		decrease: string[];
	}
}