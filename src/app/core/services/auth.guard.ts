import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    const user = await this.authService.isLoggedIn()
    console.log(next.url,state.url)
    this.authService.userData.subscribe(x=>console.log(x))
    if(user){
        if(state.url === '/login')
        {this.router.navigate(['/mainPage']);
    }
        console.log('loggedIn')
        return true;
        
    }
    else{ 
        console.log('notLoggedIn')
        if(state.url !== '/login'){
            this.router.navigate(['/login']);
        }
        return true;
    }
  }
}