export class Pokemon {
	id: number;
	name: string;
	level: number;
	stats: {
		hp: number;
		attack: number;
		defense: number;
		spAttack: number;
		spDefense: number;
		speed: number;
	}
}