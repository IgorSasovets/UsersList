import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: '/app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
  	title = 'app';

  	constructor(private modalService: NgbModal) {}
}
