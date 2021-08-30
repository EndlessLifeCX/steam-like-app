import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'steam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup;
  constructor(
    private readonly  authService: AuthenticationService
  ) {
    this.loginForm = new FormGroup({})
   }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),    
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  public login(){
    const loginForm = this.loginForm.controls
    this.authService.SignIn(loginForm.email.value,loginForm.password.value)
  }
}
