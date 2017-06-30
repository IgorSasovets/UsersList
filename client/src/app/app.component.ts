import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: '/app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent {
  	title = 'app';

  	constructor(private modalService: NgbModal) {}
}
