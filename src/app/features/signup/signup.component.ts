import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'steam-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm : FormGroup;
  constructor(
    private readonly  authService: AuthenticationService,
    private readonly route : Router
  ) {
    this.signUpForm = new FormGroup({})
   }

  public ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(4)]), 
      age: new FormControl('', [Validators.required,Validators.max(80)]),    
      email: new FormControl('', [Validators.required,Validators.email]),    
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  public signUp(){
    const signUpForm = this.signUpForm.controls
    this.authService.SignUp(signUpForm.email.value,signUpForm.password.value,signUpForm.age.value,signUpForm.username.value)
  }
  public logIn(){
    this.route.navigateByUrl('login')
  }
}
