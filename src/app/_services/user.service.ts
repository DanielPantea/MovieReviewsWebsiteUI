import { Injectable } from "@angular/core";
import { User } from "../_model/user.model";

@Injectable({ providedIn: 'root' })
export class AuthentificationService
{
    currentUser: User;
    constructor() { }

    isLoggedIn(){
        return this.currentUser == null;
    }


}