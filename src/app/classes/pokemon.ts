export class Pokemon {
	id: number;
	name: string;
	spriteUrl: string;
	baseStats: {
		hp: number;
		attack: number;
		defense: number;
		spAttack: number;
		spDefense: number;
		speed: number;
	}
}