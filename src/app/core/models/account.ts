export interface Account 
{
    email:string,
    username:string,
    age:number,
}

export interface Friend {
    user1:string,
   user2:string,
    status:string
}


export enum FriendStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'FRIENDS',
  DECLINED = 'DECLINED',
}