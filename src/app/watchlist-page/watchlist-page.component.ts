import { AuthentificationService } from './../_service/authentification.service';
import { Subscription } from 'rxjs';
import { MovieService } from './../_service/movie.service';
import { UserService } from './../_service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from './../_model/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit, OnDestroy {

  movieId: number;
  movies: Movie[];

  paramSubscription: Subscription;
  getWatchlistSubscription: Subscription;

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    public movieService:MovieService,
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {

    this.paramSubscription = this.route.paramMap.subscribe(
      params =>{
        this.movieId = +params.get('movieId');
      }
    )

    if(this.authentificationService.isLoggedIn()) {
        this.getWatchlist();
    }
  }

  ngOnDestroy(): void {

    this.paramSubscription?.unsubscribe();
    this.getWatchlistSubscription?.unsubscribe();
  }

  getWatchlist(): void {
    
    this.getWatchlistSubscription = this.userService.getWatchlist().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

}
