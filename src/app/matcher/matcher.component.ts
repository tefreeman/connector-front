import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {SwipeService} from '../swipe.service';
import {ResetViewService} from '../reset-view.service';
import {IMatchPayload, IRecipe} from '../interfaces';

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {
  started = false;
  currentRecipe: IRecipe = {
    _id: '',
    id: 0,
    review_count: '',
    review_score: '',
    ingredients: [],
    suggestions: [],
    fSuggestions: [],
    name: 'select a recipe to start',
    directions: [],
    info: [],
    url: '',
    matches: [],
    isMatched: false
  };
  isReady = false;
  isSuggestionSet = false;
  manualSelectorStatus = false;
  userId = '';
  userRecipeCount = 0;
  errorText = 'Recipe Error';

  constructor(private dataService: DataService, private swipeService: SwipeService, private resetViewService: ResetViewService) {
  }

  ngOnInit() {
  }

  setErrorTextTemp() {
    this.errorText = 'Hold To Send';
    setTimeout(() => {
      this.errorText = 'Recipe Error';
    }, 3000);
  }

  setUserId(id: string) {
    this.userId = id;
    this.started = true;
  }

  setManualSelector(val) {
    this.manualSelectorStatus = val;
  }

  setSuggestionState(state) {
    this.isSuggestionSet = state;
    console.log(this.isSuggestionSet);
  }

  setIsReady(bool: boolean) {
    this.isReady = bool;
  }

  swipeIfRdy(num: number) {
    if (num === 1) {
      if (this.isSuggestionSet === true) {
        this.swipeService.swipe(num);
      }
    } else {
      this.swipeService.swipe(num);
    }
  }

  getRecipe() {
    this.dataService.getRandomRecipe().then((data) => {
      this.currentRecipe = data;
      this.started = true;
    });
  }

  async submitRecipe(err = false) {
    const payload: IMatchPayload = {
      id: this.currentRecipe.id,
      user: this.userId,
      err: false,
      matches: this.currentRecipe.matches
    };

    if (err) {
      payload.err = true;
    }
    await this.dataService.postMatchedRecipe(payload);
    this.clearCurrentRecipe();
    this.currentRecipe.name = 'Loading next recipe...';
    this.isReady = false;
    this.isSuggestionSet = false;
    this.manualSelectorStatus = false;
    this.resetViewService.resetView();
    this.currentRecipe = await this.dataService.getRandomRecipe();
    this.userRecipeCount += 1;
    console.log('matcher ', this.currentRecipe);
  }

  private clearCurrentRecipe() {
    this.currentRecipe._id = '';
    this.currentRecipe.id = 0;
    this.currentRecipe.name = '';
    this.currentRecipe.suggestions = [];
    this.currentRecipe.fSuggestions = [];
    this.currentRecipe.ingredients = [];
    this.currentRecipe.matches = [];
    this.currentRecipe.info = [];
    this.currentRecipe.directions = [];
    this.currentRecipe.review_count = '';
    this.currentRecipe.review_score = '';
  }

}
