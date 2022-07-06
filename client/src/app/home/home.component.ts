import {Component, OnInit} from '@angular/core';
import {Game} from "../common/model/game";
import {HomeService} from "./home.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  columnNames: string[] = ['select', 'id', 'title'];
  games: Game[] = [];
  gameDataSource: MatTableDataSource<Game> = new MatTableDataSource<Game>();
  gameSelection: SelectionModel<Game> = new SelectionModel<Game>(true, []);

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.homeService.fetchGames()
      .subscribe((games: Game[]) => {
        this.games = games;
        this.resetTable();
      });
  }

  addData(): void {
    let game = {title: 'Testing game'};
    this.homeService.addGame(game).subscribe((game: Game) => {
      this.games = [...this.games, game].sort();
      this.resetTable();
    });
  }

  removeData(): void {
    this.homeService.removeGame(this.gameSelection.selected).subscribe(() => {
      this.getGames();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gameDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    return this.gameSelection.selected.length === this.gameDataSource.data.length;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.gameSelection.clear();
      return;
    }
    this.gameSelection.select(...this.gameDataSource.data);
  }

  private resetTable() {
    this.gameDataSource.data = this.games;
  }

}
