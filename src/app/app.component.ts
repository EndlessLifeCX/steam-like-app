import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 title = 'steam App'
 isLogged:boolean
  constructor(private authService: AuthenticationService) {
this.isLogged=false
   }

  ngOnInit(): void {
    this.isLoggedIn()
  }
  signOut(){
    this.authService.SignOut()
  }
  async isLoggedIn(){
   const user = await this.authService.isLoggedIn()
  if(user){
    this. isLogged=true;
  }
  else{  
    this. isLogged=false
  }
  }
}
