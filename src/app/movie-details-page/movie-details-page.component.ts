import { Subscription } from 'rxjs';
import { UserService } from './../_service/user.service';
import { Movie } from './../_model/movie.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from './../_service/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogManagerService } from '../_service/dialog-manager.service';
import { Rating } from '../_model/rating.model';
import { RatingService } from '../_service/rating.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {

  movieId: number;
  movie: Movie;
  userRating: Rating;
  totalRating: number;

  paramSubscription: Subscription;
  getMovieByIdSubscription: Subscription;
  addWatchlistSubscription: Subscription;

  constructor(
    private route:ActivatedRoute,
    private movieService: MovieService,
    private userService: UserService,
    public dialogManagerService: DialogManagerService,
    private ratingService: RatingService
  ) { }

  ngOnInit(): void {

    this.paramSubscription = this.route.paramMap.subscribe(
      params =>{
        this.movieId = +params.get('movieId');
      }
    )

    this.getMovieById();
  }

  ngOnDestroy(): void {

    this.paramSubscription?.unsubscribe();
    this.getMovieByIdSubscription?.unsubscribe();
    this.addWatchlistSubscription?.unsubscribe();
  }

  getMovieById(): void {
    
    this.getMovieByIdSubscription = this.movieService.getMovieById(this.movieId).subscribe(
      (response: Movie) => {
        this.movie = response;
        this.ratingService.getUserRating(this.movieId).subscribe(
          (data) => {
            this.userRating = data ? data : {movieId: this.movieId, grade: 0};
          },
          (error) => this.userRating = {movieId: this.movieId, grade: 0}
        );
        this.movieService.getMovieTotalRating(this.movieId).subscribe(
          (data: number) => {
            this.totalRating = data;
          }
        )
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

  getRating(): void {

  }

  addWatchlist(): void {

    this.addWatchlistSubscription = this.userService.addWatchlist(this.movieId).subscribe();
  }

  rateMovie(): void {

    this.dialogManagerService.openRatings(this.userRating);
  }

}
