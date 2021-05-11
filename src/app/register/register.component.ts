import { AuthentificationService } from '../_service/authentification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../_service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { enAuthResult } from '../_model/auth-result.enum'
import { User } from '../_model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  cpassword: string;
  email: string;
  isInvalid: boolean;

  registerSubscription: Subscription

  constructor(
    private authentificationService: AuthentificationService,
    private userService: UserService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

  register(): void {

    if(this.cpassword != this.password) {
      this.isInvalid = true;
      return;
    }
      
      this.registerSubscription = this.authentificationService.register(this.username,this.password,this.email).subscribe(
      (data:User) => {
        this.userService.currentUser = data;
        this.userService.currentUser.authdata = btoa(`${this.username}:${this.password}`);
        localStorage.setItem('userDetails', JSON.stringify(this.userService.currentUser));
        this.dialogRef.close({authResult: enAuthResult.Registered });       
      },
      error =>{
        if(this.authentificationService.isLoggedIn) {
          this.authentificationService.logout;
        }
        this.isInvalid = true;
      }
    );
  }

  goToLogin(): void {
    
    this.dialogRef.close({authResult: enAuthResult.GoToLogin });
  }
}
