import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../log-in/log-in.component';
import { RegisterComponent } from '../register/register.component';
import { enAuthResult } from '../_model/auth-result.enum';
import { AuthentificationService } from '../_service/authentification.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription;
  registerSubscription: Subscription;

  constructor(
    public userService: UserService,
    public authentificationService: AuthentificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.registerSubscription?.unsubscribe();
  }

  openLogin(): void {

    this.loginSubscription = this.dialog.open(LogInComponent).afterClosed().subscribe(
      (data) => {

        if(data?.authResult == enAuthResult.GoToRegister) {
          this.openRegister();
        }

      }
    );

  }

  openRegister(): void {

    this.registerSubscription = this.dialog.open(RegisterComponent).afterClosed().subscribe(
      (data) => {

        if(data?.authResult == enAuthResult.GoToLogin) {
          this.openLogin();
        }
        
      }
    );

  }

}
