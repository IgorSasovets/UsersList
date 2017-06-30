import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { UserComponent } from './components/users/user.component';
import { SearchComponent } from './components/search/search.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent, 
    UserComponent, 
    SearchComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    FormsModule, 
    NgxPaginationModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
