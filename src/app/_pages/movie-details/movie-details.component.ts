import { Review } from '../../_models/review.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { Movie } from '../../_models/movie.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from '../../_services/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogManagerService } from '../../_services/dialog-manager.service';
import { Rating } from '../../_models/rating.model';
import { enMovieInfoFormType } from '../../_models/movie-info-form.enum';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieId: number;
  reviewsLength: number;
  movie: Movie;
  reviews: Review[][] = [];
  userRating: Rating;
  totalRating: number;
  reviewText: string;

  paramSubscription: Subscription;
  getMovieByIdSubscription: Subscription;
  addWatchlistSubscription: Subscription;
  addDiarySubscription: Subscription;
  getAllReviewsSubscription: Subscription;
  addReviewSubscription: Subscription;

  constructor(
    private route:ActivatedRoute,
    private movieService: MovieService,
    public userService: UserService,
    public dialogManagerService: DialogManagerService,
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
    this.addDiarySubscription?.unsubscribe();
    this.getAllReviewsSubscription?.unsubscribe();
    this.addReviewSubscription?.unsubscribe();
  }

  getMovieById(): void {
    
    this.getMovieByIdSubscription = this.movieService.getMovieById(this.movieId).subscribe(
      (response: Movie) => {
        this.movie = response;
        
        this.getReviews(this.movie.movieId);

        this.getRating();

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

    this.userService.getUserRating(this.movieId).subscribe(
      (data:number) => {
        this.userRating = {
                            movieId: this.movieId,
                            grade: data ?? 0  
                          };
      },
      (error) => this.userRating = {movieId: this.movieId, grade: 0}
    );
  }

  addWatchlist(): void {

    this.addWatchlistSubscription = this.userService.addWatchlist(this.movieId).subscribe();
  }

  rateMovie(): void {

    this.dialogManagerService.openRatings(this.userRating);
  }
  
  addDiary(): void {

    this.addDiarySubscription = this.userService.addDiary(this.movieId).subscribe();
  }

  getReviews(movieId: number): void {

    this.getAllReviewsSubscription = this.movieService.getMovieReviews(movieId).subscribe(
      (response: Review[]) => {
        this.reviews[movieId] = response;
        this.reviewsLength = this.reviews[movieId].length;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  addReview(review: Review): void {

    this.addReviewSubscription = this.userService.addReview(review).subscribe(
      () =>{
        location.reload();
      }
    );
  }

  trailerLink(){
      window.location.href = this.movie.trailerUrl;
  }

  openEditMovie()
  {
    if(!this.userService.isAdmin())
      return;
    
    this.dialogManagerService.openMovieInfo(this.movie, 'Edit Movie', enMovieInfoFormType.UpdateMovie);
  }

  deleteMovie(): void {

    if(!this.userService.isAdmin())
      return;

    this.movieService.deleteMovie(this.movieId).subscribe();
  }

}
