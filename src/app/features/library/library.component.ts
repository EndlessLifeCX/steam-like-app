import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'steam-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  library:string[] =[]
  games!: Game[];
  constructor(private profileSerivce: ProfileService) {
   }

  ngOnInit(): void {
    this.getLibGames();
    ;
  }
  public async getLibGames(){
  this.games = await this.profileSerivce.getGamesFromLibrary()
  }
 
  public shareGame(id:string){
    navigator.clipboard.writeText(id).then().catch(e => console.error(e));
  }
}
