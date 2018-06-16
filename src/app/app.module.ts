import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { OrderPipe } from './order.pipe';
import { NaturesSortPipe } from './natures-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonInfoComponent,
    PokemonListComponent,
    OrderPipe,
    NaturesSortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
