import { Review } from '../../_models/review.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../_models/movie.model';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../../_services/authentification.service';
import { MovieService } from '../../_services/movie.service';
import { UserService } from '../../_services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit, OnDestroy {

  movies: Movie[];
  reviews: Review[][] = [];

  getDiarySubscription: Subscription;
  removeDiarySubscription: Subscription;
  getReviewSubscription: Subscription

  constructor(
    private userService:UserService,
    public movieService:MovieService,
    public authentificationService: AuthentificationService,
  ) { }

  ngOnInit(): void {

    if(this.authentificationService.isLoggedIn()) {
      this.getDiary();
    }
  }

  ngOnDestroy(): void {

    this.getDiarySubscription?.unsubscribe();
    this.removeDiarySubscription?.unsubscribe();
    this.getReviewSubscription?.unsubscribe();
  }

  getDiary(): void {
    
    this.getDiarySubscription = this.userService.getDiary().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        for(let movie of this.movies){
          this.getReviews(movie.movieId);
        }
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  removeDiary(movieId: number): void {
    
    this.removeDiarySubscription = this.userService.removeDiary(movieId).subscribe();
  }

  getReviews(movieId: number): void {

    this.getReviewSubscription = this.userService.getUserReviews(movieId).subscribe(
      (response: Review[]) => {
        this.reviews[movieId] = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

}
