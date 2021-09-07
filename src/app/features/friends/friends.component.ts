import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Friend } from 'src/app/core/models/account';
import { ProfileService } from 'src/app/core/services/profile.service';
import firebase from 'firebase';

@Component({
  selector: 'steam-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  userString!:string
  searchedFriends!: Account[];
  friends!:Friend[];
  userData:any
  constructor(private profileSerivce: ProfileService,) { 
  }

  ngOnInit(): void {
    this.getFriends()
    this.getUserData()
  }
  public async getFriends(){
    this.friends =  await (await this.profileSerivce.getFriends()).toPromise()
  }
  public async getUserData(){
   this.userData = await this.profileSerivce.getUserData()
  }
  public async searchFriends(str:string){
   const friends =  await (await this.profileSerivce.searchFriends(str||'')).toPromise()
   const userData = await this.profileSerivce.getAccount()
   this.searchedFriends = friends.filter((a:Account)=>{
     const lol = [...this.friends]
     let res: string[] =[];
      lol.map(obj=>{
       let currUser = userData.username
       currUser==obj.user1 || currUser==obj.user2? res.push(obj.user1) && res.push(obj.user2):''
     });
 
    return !res.includes(a.username) 
    })
   console.log(this.searchedFriends)
   

  }

}
