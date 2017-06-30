import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { UserComponent } from './user.component';
import { SearchComponent } from '../search/search.component';
import { RegistrationComponent } from '../registration/registration.component';

@NgModule({
  declarations: [
    UserComponent, SearchComponent, RegistrationComponent
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
export class UserModule { }