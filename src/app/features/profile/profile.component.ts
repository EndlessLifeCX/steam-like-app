import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/core/models/account';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'steam-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account: Account
  constructor(private profileService: ProfileService) { 
    this.account={email:'',username:'',age:0}
  }

  ngOnInit(): void {
    this.getAccount()
  }
  public async getAccount(){
    this.account =   await this.profileService.getAccount()
    console.log(this.account)
  }
}
