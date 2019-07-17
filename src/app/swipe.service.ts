import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SwipeService {

  private swipeEvent = new Subject<number>();
  swipeEvent$ = this.swipeEvent.asObservable();

  constructor() {

  }

  swipe(num) {
    this.swipeEvent.next(num);
  }

}
