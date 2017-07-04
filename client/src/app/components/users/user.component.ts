import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../User';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  providers: [UserService, AuthService]
})

export class UserComponent {
	closeResult: string;
	isVerified: boolean;
	isAuthorized: boolean;
	incorrectData: boolean;
	searchAvailable: boolean;
	emptyField: boolean;
	users: User[];
	user_role: string; 
	amountOfRecords: number;

	user_id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	dateofbirth: Date;
	role: string;

  	amount: number;
  	currentPage: number;

	constructor(private userService: UserService, private authService: AuthService) {
		this.currentPage = 1;
		this.incorrectData = false;
		this.searchAvailable = false;
		this.isVerified = this.isAuthorized = false;
		this.emptyField = false;
		this.getAllUsers();
	}

    initializePagination() {
  		this.amount = 1;
		this.amountOfRecords = this.users.length;
	}

	calcNumberOfRecords(amount) {
		this.amount = Number(amount);
		this.amountOfRecords = this.users.length;
	}

	getAllUsers() {
		this.userService.getUsers()
			.subscribe(users => {
				this.users = users;
				this.initializePagination();
			});
	}

	dataCleaner() {
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.password = '';
		this.dateofbirth = new Date();
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

  		this.getUserRole();

  		if (this.user_role == 'admin') {
	  		this.userService.addUser(newUser)
	  			.subscribe(user => {
	  				this.dataCleaner();
	  				this.getAllUsers();
	  				this.users.push(newUser);
	  				this.initializePagination();
	  			});  
  		} else {
  			console.log('Only admin can perform CRUD operations!');
  		}
		}  		
	}

	updateUserData() {
	    if (this.emptyFieldChecking()) {
	      var UserData = {
	            firstname: this.firstname,
	            lastname: this.lastname,
	            email: this.email,
	            password: this.password,
	            dateofbirth: this.dateofbirth,
	            role: this.role
	          };      

	        this.userService.updateRecord(this.user_id, UserData)
	          .subscribe(users => {
	            this.dataCleaner();
	            this.getAllUsers();
	          });  

	        this.emptyField = false;
	    } else {
	      this.emptyField = true;
	    }
    }

	deleteUser(id) {
		this.userService.deleteUser(id)
			.subscribe(users => {
				this.getAllUsers();
				this.users.pop();
				this.initializePagination();

				if (this.users.length == 0) {
					this.incorrectData = false;
					this.searchAvailable = false;
				this.isVerified = false;
				}
			}); 
	}

	editUser(user) {
		this.user_id = user._id;
		this.firstname = user.firstname;
		this.lastname = user.lastname;
		this.email = user.email;
		this.password = user.password;
		this.dateofbirth = user.dateofbirth;
		this.role = user.role;
	}

	getUserRole() {
  		this.authService.getRole()
  			.subscribe(user => {
  				this.user_role = user.role;
  			});
  	}

	verifyUser() {
		var newUser = {
			firstname: '',
			lastname: '',
			email: this.email,
			password: this.password,
			dateofbirth: new Date(),
			role: ''
		};

		this.authService.verifyUser(this.email, newUser)
			.subscribe(user => {
				if (user.token == 'error' || user.token == 'wrong data') {
					this.incorrectData = true;
					this.isVerified = false;
				} else {
					this.incorrectData = false;
					this.isVerified = true;
					localStorage.setItem('token', user.token);
					this.getUserRole();
					this.dataCleaner();
					this.getAllUsers();
				}	
			});  
	}

	signOut() {
		this.incorrectData = false;
		this.isAuthorized = this.isVerified = false;
		this.searchAvailable = false;
		this.dataCleaner();
		localStorage.removeItem('token');
	}

	getUsersPagination() {
		this.userService.getUsersPagination(this.amount, this.currentPage)
			.subscribe(users => {
				this.users = users;
			});
	}

	hideAuthPanel() {
		if (this.isVerified) {
			this.isAuthorized = true;
			this.dataCleaner();
		}
	}
}
