import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule,
  ],
  providers: [],
  bootstrap: []
})

export class SearchModule { }