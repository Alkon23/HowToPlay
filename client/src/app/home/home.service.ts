import {Injectable} from '@angular/core';
import {Game} from "../common/model/game";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  fetchGames(): Observable<Game[]> {
    return this.http.get<Game[]>("http://localhost:8080/api/games/");
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>("http://localhost:8080/api/games/", game);
  }

  removeGame(games: Game[]): Observable<number[]> {
    let ids: number[] = [];
    games.map(game => {
      if (game.id) ids.push(game.id)
    });

    return this.http.delete<number[]>("http://localhost:8080/api/games/", {body: {ids: ids}});
  }

}
