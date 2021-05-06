import { Injectable } from "@angular/core";
import { User } from "../_model/user.model";

@Injectable({ providedIn: 'root' })
export class UserService
{
    currentUser: User;
    constructor() { }

    isLoggedIn(){
        return this.currentUser == null;
    }


}