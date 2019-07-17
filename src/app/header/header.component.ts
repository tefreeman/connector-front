import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() loginEvent = new EventEmitter();
  userId = '';

  constructor() {
  }

  ngOnInit() {
  }

  inputChange(id: string) {
    this.userId = id;
  }

  login() {
    if (this.userId !== '') {
      this.loginEvent.emit(this.userId);
    }
  }

}
