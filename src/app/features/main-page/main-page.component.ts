import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'steam-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  games!: Observable<Game[]>;
  constructor(private authService: AuthenticationService,
    private gamesService: GamesService) {
     }

  ngOnInit(): void {
    this.getAllGames()
  }

  getAllGames(){
   this.games =  this.gamesService.getAllGames() 
  }
  signOut(){
    this.authService.SignOut()
  }

}
