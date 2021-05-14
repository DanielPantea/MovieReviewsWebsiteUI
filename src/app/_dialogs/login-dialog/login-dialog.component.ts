import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { enAuthResult } from '../../_models/auth-result.enum';
import { User } from '../../_models/user.model';
import { AuthentificationService } from '../../_services/authentification.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  isInvalid: boolean;

  loginSubscription: Subscription;

  constructor(
    private authentificationService: AuthentificationService,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
    this.loginSubscription?.unsubscribe();
  }

  login(): void {

    this.loginSubscription = this.authentificationService.login(this.username, this.password).subscribe(
      (data: User) => {
        this.userService.currentUser = data;
        this.userService.currentUser.authdata = btoa(`${this.username}:${this.password}`);
        localStorage.setItem('userDetails', JSON.stringify(this.userService.currentUser));
        this.dialogRef.close({authResult: enAuthResult.LoggedIn });
      },
      (error: HttpErrorResponse) => {          
        if(this.authentificationService.isLoggedIn) {
          this.authentificationService.logout;
        }
        this.isInvalid = true;
      }
    );
  }

  goToRegister(): void {
    
    this.dialogRef.close({authResult: enAuthResult.GoToRegister });
  }
}
