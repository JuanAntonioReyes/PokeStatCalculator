export class Pokemon {
	id: number;
	name: string;
	level: number;
	baseStats: {
		hp: number;
		attack: number;
		defense: number;
		spAttack: number;
		spDefense: number;
		speed: number;
	}
}