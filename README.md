# PokeStatCalculator

Angular app that calculates pokemon stats (For testing purposes)

(This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8)

## Installation
- Clone or download repository

- Install the dependencies

```
npm install
```

(For the sake of speed when loading, the app only load the info of the first gen pokemon, 151, from the pokeAPI. If you want to load more data, you only need to change the "numberOfPokemon" variable from "pokemon.service.ts" from 151 to the desired number of pokemon)
(Sometimes it may not display some of the pokemon, but it is due the pokeAPI limitations in number of calls to it)

## Usage
- Launch the project

```
ng serve
```

(The app will be served 'http://localhost:4200' with hot reload)

- Wait until all the pokemon data is loaded

- Click on a Pokemon to display its data (You can sort the Pokemon list by clicking in the table titles and filter by part of the name and max/min stat values)

- Enter a level and the app will calculate the stats of the Pokemon on that level based on the base stats
(The highest and lowest base stats will be marked)

- You can set the pokemon IV's and EV's and nature (The stats affected by the selected nature will be marked)

- The app will also tell you the pokemon hidden power type and it damage points