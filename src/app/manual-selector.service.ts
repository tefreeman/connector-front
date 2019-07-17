import {Injectable} from '@angular/core';
import {ISuggestion} from './interfaces';
import {Subject} from 'rxjs';
import {DataService} from './data.service';

@Injectable({providedIn: 'root'})
export class ManualSelectorService {
  private SelectionEvent$: Subject<ISuggestion> = new Subject();
  private ingredientDir: Promise<any> = null;

  constructor(private dataService: DataService) {
    this.ingredientDir = this.dataService.getWordsDir();
  }

  fireManualSelectionEvent(selection: ISuggestion) {
    this.SelectionEvent$.next(selection);
  }

  listenManualSelectionEvent() {
    return this.SelectionEvent$.asObservable();
  }

  getIngredientBySugId(sugId: string) {
    return this.ingredientDir.then((dir) => {
      if (this.ingredientDir.hasOwnProperty(sugId)) {
        return this.ingredientDir[sugId];
      }
    });
  }
}
