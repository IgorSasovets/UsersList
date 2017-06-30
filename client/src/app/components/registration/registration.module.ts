import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: []
})
export class RegistrationModule { }