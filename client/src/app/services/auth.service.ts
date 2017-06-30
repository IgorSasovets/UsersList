import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
	constructor (private http: Http) {
	}

	verifyUser(email, UserData) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('email', UserData.email);
		params.set('password', UserData.password);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get('/api/authorization/user', requestOptions)
			.map(res => res.json()); 
	}

	getRole() {
		let token = localStorage.getItem('token');
		let params: URLSearchParams = new URLSearchParams();
		params.set('token', token);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get('/api/authorized', requestOptions)
			.map(res => res.json()); 
	}
}