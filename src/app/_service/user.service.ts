import { Injectable } from "@angular/core";
import { User } from "../_model/user.model";
import { AuthentificationService } from "./authentification.service";

@Injectable({ providedIn: 'root' })
export class UserService
{

    currentUser: User;

    constructor(
        private authentificationService: AuthentificationService
    ) { 

        if(authentificationService.isLoggedIn) {

            this.currentUser = JSON.parse(localStorage.getItem('userDetails'));
        }
    }
}