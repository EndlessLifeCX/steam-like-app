import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'steam-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public accountForm : FormGroup;
  account: Account
  constructor(private profileService: ProfileService) { 
    this.account={email:'',username:'',age:0}
    this.accountForm = this.accountForm  = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),    
      email: new FormControl('', [Validators.required,Validators.email]),    
      age: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
   
    this.getAccount().then( ()=>{ this.accountForm.controls['username'].setValue(this.account.username);
    this.accountForm.controls['email'].setValue(this.account.email);
    this.accountForm.controls['age'].setValue(this.account.age);
  }
    
    )
    
   
   
  }
  public async getAccount(){
    this.account =   await this.profileService.getAccount()
  }
  changeAccData(){
    const form = this.accountForm.controls
    this.profileService.changeAccData(form['age'].value,form['username'].value,form['email'].value)
  }
}
