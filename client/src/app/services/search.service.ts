import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SearchService {
	constructor (private http: Http) {
	}

	findUsers(firstname, second_parameter, parameter_name) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('firstname', firstname);
		params.set(parameter_name, second_parameter);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		if (parameter_name == 'lastname') {
			return this.http.get('/api/users/searchbylastname', requestOptions)
				.map(res => res.json());
		} else {
			return this.http.get('/api/users/searchbyemail', requestOptions)
				.map(res => res.json());
		}
	}
}