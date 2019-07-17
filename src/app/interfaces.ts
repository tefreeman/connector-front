export interface ISuggestion {
  sugId: string;
  sugText: string;
}

export interface IProbabilityStats {
  pos: any[][];
  neg: any[][];
}

export interface IRecipe {
  _id: string;
  id: number;
  url: string;
  name: string;
  review_count: string;
  review_score: string;
  info: string[];
  directions: string[];
  ingredients: string[];
  suggestions: number[][];
  fSuggestions: ISuggestion[][];
  isMatched: boolean;
  matches: IMatch[];
}

export interface IMatch {
  id: string;
  manual: boolean;
  err: boolean;
}

export interface IMatchPayload {
  user: string;
  id: number;
  err: boolean;
  matches: IMatch[];
}
