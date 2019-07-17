import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchWordsService} from '../search-words.service';
import {Subject, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {ISuggestion} from '../interfaces';
import {ManualSelectorService} from '../manual-selector.service';

@Component({
  selector: 'app-manual-selector',
  templateUrl: './manual-selector.component.html',
  styleUrls: ['./manual-selector.component.css']
})
export class ManualSelectorComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<boolean>();
  inputText = new Subject<string>();
  currentSuggestions: any[] = [];
  selectedWord: ISuggestion = {sugText: '', sugId: ''};

  constructor(private searchWordsService: SearchWordsService, private manualSelectorService: ManualSelectorService) {
  }

  ngOnInit() {
    this.inputText.asObservable().pipe(debounce(() => timer(500))).subscribe((text) => {
      this.currentSuggestions = this.get_suggestions(text);
    });
  }

  changeInputEvent(text: string) {
    this.inputText.next(text);
  }


  close() {
    this.closeEvent.emit(false);
    this.selectedWord = {sugText: '', sugId: ''};
    this.inputText = new Subject<string>();
    this.currentSuggestions = [];
  }

  submit() {
    this.manualSelectorService.fireManualSelectionEvent(this.selectedWord);
    this.closeEvent.emit(false);
    this.selectedWord = {sugText: '', sugId: ''};
    this.inputText = new Subject<string>();
    this.currentSuggestions = [];
  }

  get_suggestions(userInput: string) {
    userInput = userInput.replace(', ', ' ');
    userInput = userInput.replace(',', ' ');
    const words = userInput.split(' ');
    return this.searchWordsService.search(words);
  }

  selectedColor(id: string) {
    if (id === this.selectedWord.sugId) {
      return 'blue';
    } else {
      return 'black';
    }
  }

  setError() {
    this.selectedWord = {sugText: 'Not Found', sugId: '-1'};
    this.submit();
  }

  selectWord(num: number) {
    this.selectedWord = this.currentSuggestions[num];
  }

}
