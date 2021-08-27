import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'steam-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm : FormGroup;
  constructor(
    private readonly  authService: AuthenticationService
  ) {
    this.signUpForm = new FormGroup({})
   }

  public ngOnInit(): void {
    this.signUpForm = new FormGroup({
      login: new FormControl('', [Validators.required,Validators.email]),    
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  public signUp(){
    const signUpForm = this.signUpForm.controls
    this.authService.SignUp(signUpForm.login.value,signUpForm.password.value)

    console.log(signUpForm.login.value , signUpForm.password.value)
    
  }

}