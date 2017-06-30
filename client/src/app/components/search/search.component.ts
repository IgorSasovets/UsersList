import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../../../User';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  providers: [SearchService]
})

export class SearchComponent {
    users: User[];
    firstName: string;
    lastName: string;
    userEmail: string;
    searchResultsAmount: number;
    searchByEmail: boolean;
    emptyField: boolean;

    constructor (private searchService: SearchService) {
      this.searchByEmail = false;
      this.searchResultsAmount = 0;
      this.emptyField = false;
      this.firstName = this.lastName = this.userEmail = '';
    }

    findUsers() {
      let second_parameter = '';
      let parameter_name = '';

      if (this.searchByEmail) {
        second_parameter = this.userEmail;
        parameter_name = 'email';
      } else {
        second_parameter = this.lastName;
        parameter_name = 'lastname';
      }

      if (this.firstName == '' || second_parameter == '') {
        this.emptyField = true;
      } else {
        this.emptyField = false;

        this.searchService.findUsers(this.firstName, second_parameter, parameter_name)
          .subscribe(users => {
            this.users = users;
            this.searchResultsAmount = this.users.length;
          });
      }
    }

    fieldsCleaner() {
      this.firstName = '';
      this.lastName = '';
      this.userEmail = '';
      this.searchResultsAmount = 0;
      this.users = [];
    }

    secondFieldCleaner() {
      this.lastName = '';
      this.userEmail = '';
    }

    resultsCleaner() {
      this.searchResultsAmount = 0;
      this.users = [];
    }
}
