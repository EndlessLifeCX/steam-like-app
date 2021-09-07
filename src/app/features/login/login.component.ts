import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'steam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup;
  constructor(
    private readonly  authService: AuthenticationService,
    private readonly route: Router
  ) {
    this.loginForm = new FormGroup({})
   }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),    
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  public signUp(){
    this.route.navigateByUrl('signup')
  }

  public login(){
    const loginForm = this.loginForm.controls
    this.authService.SignIn(loginForm.email.value,loginForm.password.value)
  }
}
