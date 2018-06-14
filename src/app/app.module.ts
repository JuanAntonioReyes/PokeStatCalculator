import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
