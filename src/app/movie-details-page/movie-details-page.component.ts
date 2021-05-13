import { Subscription } from 'rxjs';
import { UserService } from './../_service/user.service';
import { Movie } from './../_model/movie.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from './../_service/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {

  movieId: number;
  movie: Movie;
  rating: number = 0;

  paramSubscription: Subscription;
  getMovieByIdSubscription: Subscription;
  addWatchlistSubscription: Subscription;
  addDiarySubscription: Subscription;

  constructor(
    private route:ActivatedRoute,
    private movieService: MovieService,
    private userService: UserService
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
  }

  getMovieById(): void {
    
    this.getMovieByIdSubscription = this.movieService.getMovieById(this.movieId).subscribe(
      (response: Movie) => {
        this.movie = response;
        console.log (response);
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

  addWatchlist(): void {

    this.addWatchlistSubscription = this.userService.addWatchlist(this.movieId).subscribe();
  }

  addDiary(): void {

    this.addDiarySubscription = this.userService.addDiary(this.movieId).subscribe();
  }

  trailerLink(){
      window.location.href = this.movie.trailerUrl;
  }

}
