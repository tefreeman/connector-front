import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRecipe, ISuggestion} from '../interfaces';
import {SwipeService} from '../swipe.service';
import {ManualSelectorService} from '../manual-selector.service';
import {ResetViewService} from '../reset-view.service';

@Component({
  selector: 'app-ingredient-matcher',
  templateUrl: './ingredient-matcher.component.html',
  styleUrls: ['./ingredient-matcher.component.css']
})
export class IngredientMatcherComponent implements OnInit {
  @Input() recipe: IRecipe = null;
  @Output() ready = new EventEmitter<boolean>();
  @Output() isSelected = new EventEmitter<boolean>();
  @Output() manualSelected = new EventEmitter<boolean>(true);
  currentPos = 0;
  manualSug: Array<ISuggestion | null> = [];

  constructor(private swipeService: SwipeService, private manualSelectorService: ManualSelectorService, private resetViewService: ResetViewService) {
    swipeService.swipeEvent$.subscribe((num) => {
      this.changePos(num);
    });

    manualSelectorService.listenManualSelectionEvent().subscribe((suggestion) => {
      this.setMatch(suggestion.sugId, true, suggestion.sugText);
    });

    resetViewService.listen().subscribe(() => {
      this.resetMatchInterface();
    });
  }

  ngOnInit() {
  }

  resetMatchInterface() {
    this.currentPos = 0;
    this.manualSug = [];
    this.recipe.matches = [];
  }

  changePos(num) {
    this.currentPos = (this.currentPos + num) % this.recipe.ingredients.length;
    if (this.currentPos === -1) {
      this.currentPos = this.recipe.ingredients.length - 1;
    }
    this.isSelected.emit(this.checkIfCurrentPosSet());
  }

  setMatch(sugId: string, manual: boolean = false, sugText = '') {
    if (this.recipe.matches.length !== this.recipe.ingredients.length) {
      this.initMatches();
    }
    this.recipe.matches[this.currentPos].id = sugId;
    this.recipe.matches[this.currentPos].manual = manual;

    if (this.recipe.matches[this.currentPos].id === '-1') {
      this.recipe.matches[this.currentPos].err = true;
    }

    if (manual) {
      const sug = {sugId, sugText};
      this.manualSug.push(sug);
    } else {
      this.manualSug.push(null);
    }


    if (this.check_if_all_set()) {
      this.ready.emit(true);
    } else {
      this.ready.emit(false);
    }

    this.isSelected.emit(this.checkIfCurrentPosSet());
  }

  getTileClass(sugId: string) {
    if (this.currentPos < this.recipe.matches.length) {
      if (sugId === this.recipe.matches[this.currentPos].id) {
        return 'CTileSelected';
      } else {
        return 'CTile';
      }
    }
  }

  getPageIndexColor(index: number) {
    if (this.checkIfSet(index)) {
      return 'blue';
    }
  }

  private check_if_all_set() {
    for (const match of this.recipe.matches) {
      if (match.id === '') {
        return false;
      }
    }
    return true;
  }

  private checkIfSet(num: number) {
    if (this.currentPos < this.recipe.matches.length) {
      if (this.recipe.matches[num].id !== '') {
        return true;
      }
      return false;
    }
  }

  private checkIfCurrentPosSet() {
    if (this.currentPos < this.recipe.matches.length) {
      if (this.recipe.matches[this.currentPos].id !== '') {
        return true;
      }
      return false;
    }
  }

  private isManualMatch() {
    if (this.currentPos < this.recipe.matches.length) {
      return this.recipe.matches[this.currentPos].manual;
    }
    return null;
  }

  private getManualSuggest(): ISuggestion {
    if (this.currentPos < this.recipe.matches.length) {
      if (this.isManualMatch()) {
        return this.manualSug[this.currentPos];
      }
    }
    return {sugId: '', sugText: ''};
  }

  private initMatches() {
    console.log('reset matches');
    this.recipe.matches = [];
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      this.recipe.matches.push({
        id: '',
        manual: false,
        err: false
      });
    }

  }


}
