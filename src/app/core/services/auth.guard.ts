import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    const user = await this.authService.isLoggedIn()
    if(user){
        if(state.url === '/login')
        {this.router.navigate(['/mainPage']);
    }
        return true;
        
    }
    else{ 
        if(state.url !== '/login'){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
  }
}