export class Pokemon {
	id: number;
	name: string;
	level: number;
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

export const STATS_NAMES: string[][] = [
	['hp', 'HP'],
	['attack', 'Attack'],
	['defense', 'Defense'],
	['spAttack', 'Special Attack'],
	['spDefense', 'Special Defense'],
	['speed', 'Speed']
];