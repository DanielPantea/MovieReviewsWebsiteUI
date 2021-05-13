import { RequestmovieComponent } from './../requestmovie/requestmovie.component';
import { Router } from '@angular/router';
import { RegisterComponent } from './../register/register.component';
import { enAuthResult } from './../_model/auth-result.enum';
import { LogInComponent } from './../log-in/log-in.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogManagerService implements OnDestroy {

    loginSubscription: Subscription;
    registerSubscription: Subscription;
    ratingSubscription: Subscription;
    requestSubscription: Subscription;

    constructor(
        private dialog: MatDialog,
    ) { }

    ngOnDestroy(): void {

        this.loginSubscription?.unsubscribe();
        this.registerSubscription?.unsubscribe();
        this.requestSubscription?.unsubscribe();
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

    openRatings(rating: {grade: number}): void {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.data = rating;

      this.ratingSubscription?.unsubscribe();
      this.ratingSubscription = this.dialog.open(RatingDialogComponent, dialogConfig).afterClosed().subscribe();
    }
    
    openRequest(): void {

      this.dialog.open(RequestmovieComponent,{width: '700px'});
    }
}