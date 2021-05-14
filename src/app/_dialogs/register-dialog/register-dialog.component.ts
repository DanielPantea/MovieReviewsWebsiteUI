import { AuthentificationService } from '../../_services/authentification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { enAuthResult } from '../../_models/auth-result.enum'
import { User } from '../../_models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  cpassword: string;
  email: string;
  isInvalid: boolean;

  registerSubscription: Subscription

  constructor(
    private authentificationService: AuthentificationService,
    private userService: UserService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>
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
      (data: User) => {

        this.userService.currentUser = data;
        this.userService.currentUser.authdata = btoa(`${this.username}:${this.password}`);
        localStorage.setItem('userDetails', JSON.stringify(this.userService.currentUser));
        this.dialogRef.close({ authResult: enAuthResult.Registered });       
      },
      (error: HttpErrorResponse) =>{

        if(this.authentificationService.isLoggedIn)
          this.authentificationService.logout;
        
        this.isInvalid = true;
        console.log(error);
      }
    );
  }

  goToLogin(): void {
    
    this.dialogRef.close({ authResult: enAuthResult.GoToLogin });
  }
}
