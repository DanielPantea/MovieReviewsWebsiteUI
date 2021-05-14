import { RegisterDialogComponent } from '../_dialogs/register-dialog/register-dialog.component';
import { enAuthResult } from '../_models/auth-result.enum';
import { LoginDialogComponent } from '../_dialogs/login-dialog/login-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { RatingDialogComponent } from '../_dialogs/rating-dialog/rating-dialog.component';
import { Movie } from '../_models/movie.model';
import { enMovieInfoFormType } from '../_models/movie-info-form.enum';
import { MovieInfoDialogComponent } from '../_dialogs/movie-info-dialog/movie-info-dialog.component';

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

        this.loginSubscription = this.dialog.open(LoginDialogComponent).afterClosed().subscribe(
          (data) => {
    
            if(data?.authResult == enAuthResult.GoToRegister) {
              this.openRegister();
            }
          }
        );
    }

    openRegister(): void {

        this.registerSubscription = this.dialog.open(RegisterDialogComponent).afterClosed().subscribe(
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
    
    openMovieInfo(movie: Movie, cardTitle: string, formType: enMovieInfoFormType): void {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data =  {movie: movie, cardTitle: cardTitle, formType: formType};
      dialogConfig.width = '700px';
      dialogConfig.disableClose = true;

      this.dialog.open(MovieInfoDialogComponent,dialogConfig);
    }
}