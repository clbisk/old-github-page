import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  PUZZLE_URL = "https://wbeo70qxe2.execute-api.us-east-1.amazonaws.com/Prod/"

  constructor(private http: HttpClient) { }

  getPuzzle(id: string) {
    return this.http.get<Puzzle>(this.PUZZLE_URL + "Hitori/" + id);
  }
}

export interface Puzzle {
  id: string;
  data: string;
  solution: string;
  ratings: Array<number>;
}