import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../../../User';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  providers: [RegistrationService]
})

export class RegistrationComponent {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	dateofbirth: Date;
	role: string;
  closeResult: string;
  emptyField: boolean;

	constructor(private modalService: NgbModal, private registService: RegistrationService) {
		this.emptyField = false;
	}

  dataCleaner() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.dateofbirth = new Date;
    this.password = '';
    this.role = '';
  }

  emptyFieldChecking(): boolean {
    if (this.firstname == '') return false;
    if (this.lastname == '') return false;
    if (this.email == '') return false;
    if (this.password == '') return false;
    if (this.role == '') return false;

    return true;
  }

  preAddOperations(): boolean {
    if (this.emptyFieldChecking()) {
      let regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/g;
      let regExpEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
      let check_var_pass = this.password;
      let check_var_email = this.email;

      check_var_pass = check_var_pass.replace(regExpPassword, '');
      check_var_email = check_var_email.replace(regExpEmail, '');

      if (check_var_pass != '' || check_var_email != '') {
        (check_var_pass != '')? this.password = 'Wrong!' : this.password = this.password;
        (check_var_email != '')? this.email = 'Wrong!' : this.email = this.email;
        return false;
      } else {
        this.emptyField = false;
        return true;
      }
    } else {
      this.emptyField = true;
      return false;
    }
  }

  addUser(event) {
      event.preventDefault();

      if (this.preAddOperations()) {
        var newUser = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          dateofbirth: this.dateofbirth,
          role: this.role
        };

        this.registService.addUser(newUser)
          .subscribe(user => {
            this.dataCleaner();
          }); 
      } 
  }

	open(content) {
      this.dataCleaner();

      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

	private getDismissReason(reason: any): string {
  	if (reason === ModalDismissReasons.ESC) {
    		return 'by pressing ESC';
  	} else if (reason === 
  	ModalDismissReasons.BACKDROP_CLICK) {
    		return 'by clicking on a backdrop';
  	} else {
    		return  `with: ${reason}`;
  	}
	}
}
