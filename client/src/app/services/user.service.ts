import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {
	constructor (private http: Http) {
	}

	getUsers() {
		return this.http.get('/api/users')
			.map(res => res.json());
	}

	addUser(newUser) {
		let headers = new Headers();
		
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/user', JSON.stringify(newUser), {headers: headers})
			.map(res => res.json()); 
	}

	deleteUser(id) {
		let token = localStorage.getItem('token');
		let params: URLSearchParams = new URLSearchParams();
		params.set('token', token);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.delete('/api/user/' + id, requestOptions)
			.map(res => res.json());
	}

	updateRecord(id, UserData) {
		let token = localStorage.getItem('token');
		let params: URLSearchParams = new URLSearchParams();
		params.set('token', token);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.put('/api/user/' + id, UserData, requestOptions)
			.map(res => res.json()); 
	}

	getUsersPagination(amount, currentPage) {
		let token = localStorage.getItem('token');
		let params: URLSearchParams = new URLSearchParams();
		params.set('amount', amount);
		params.set('currpage', currentPage);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;
				
		return this.http.get('/api/users/pagination', requestOptions)
			.map(res => res.json());
	}
}