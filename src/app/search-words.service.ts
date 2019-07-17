import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {ISuggestion} from './interfaces';

@Injectable({providedIn: 'root'})
export class SearchWordsService {
  wordsTree = {};
  wordsDir = {};

  constructor(private dataService: DataService) {
    this.initWords().then(() => {
    });
  }

  async initWords() {
    const wordsTree = await this.dataService.getWordsTree();
    const wordsDir = await this.dataService.getWordsDir();
    this.wordsTree = wordsTree;
    this.wordsDir = wordsDir;

  }

  search(words: string[]) {
    let suggestions = {};
    let tempSuggestions = {};
    const len = words.length;
    for (let i = 0; i < len; i++) {
      if (this.wordsTree.hasOwnProperty(words[i])) {
        const ids = Object.keys(this.wordsTree[words[i]]);
        for (const id of ids) {
          if (i === 0) {
            suggestions[this.wordsDir[id]] = id;
          } else {
            if (suggestions.hasOwnProperty(this.wordsDir[id])) {
              tempSuggestions[this.wordsDir[id]] = id;
            }
          }
        }
        if (i !== 0) {
          suggestions = tempSuggestions;
          tempSuggestions = {};
        }
      }
    }
    const suggestionsList: ISuggestion[] = [];
    for (const key in suggestions) {
      // check if the property/key is defined in the object itself, not in parent
      if (suggestions.hasOwnProperty(key)) {
        suggestionsList.push({sugText: key, sugId: suggestions[key]});
      }
    }
    return suggestionsList;
  }
}
