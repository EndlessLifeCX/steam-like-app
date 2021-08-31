import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Friend, FriendStatus } from 'src/app/core/models/account';
import { ProfileService } from 'src/app/core/services/profile.service';
import firebase from 'firebase';

@Component({
  selector: 'steam-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friends!: Observable<Friend[]>;
  userData:any
  constructor(private profileSerivce: ProfileService,) { 
  }

  ngOnInit(): void {
    this.getFriends()
    this.getUserData()
  }
  public async getFriends(){
    this.friends =  await this.profileSerivce.getFriends()
  }
  public async getUserData(){
   this.userData = await this.profileSerivce.getUserData()
  }

}
