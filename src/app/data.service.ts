import {Injectable} from '@angular/core';
import {IMatchPayload, IProbabilityStats, IRecipe} from './interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataService {

  ingredientsDir = null;
  ingredientsTree = null;

  constructor(private http: HttpClient) {
  }

  async getWordsDir() {
    if (this.ingredientsDir !== null) {
      return this.ingredientsDir;
    } else {
      return this.http.get<any[]>('http://127.0.0.1:5002/get_ingredients_dir').pipe(tap((data) => {
        this.ingredientsDir = data;
      })).toPromise();
    }
  }

  async getWordsTree() {
    if (this.ingredientsTree !== null) {
      return this.ingredientsTree;
    } else {
      return this.http.get<any[]>('http://127.0.0.1:5002/get_ingredients_tree').pipe(tap((data) => {
        this.ingredientsTree = data;
      })).toPromise();
    }
  }


  async postMatchedRecipe(payload: IMatchPayload) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:5002/submit_recipe_match', payload, {headers}).toPromise();
  }

  async getProbStats(): Promise<IProbabilityStats> {
    return this.http.get<string>('http://127.0.0.1:5002/get_prob_info').pipe(map((probStats) => {
      return probStats;
    })).toPromise();
  }

  async getRandomRecipe(): Promise<IRecipe> {
    return this.http.get<IRecipe>('http://127.0.0.1:5002/get_random').pipe(map((recipe) => {
      recipe.matches = [];
      recipe.fSuggestions = this.suggestionsFormatter(recipe.suggestions);
      return recipe;
    })).toPromise();
  }

  private suggestionsFormatter(recipeSuggestions: number[][]) {
    const rSuggestions = [];
    let pos = 0;
    for (const ingredientSuggestions of recipeSuggestions) {
      rSuggestions.push([]);
      for (const suggestion of ingredientSuggestions) {
        const text = this.ingredientsDir[suggestion.toString()];
        rSuggestions[pos].push({sugId: suggestion, sugText: text});
      }
      pos++;
    }
    return rSuggestions;
  }
}
