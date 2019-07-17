import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ResetViewService {

  private view$ = new Subject();

  constructor() {
  }

  listen() {
    return this.view$.asObservable();
  }

  resetView() {
    this.view$.next(true);
  }
}
