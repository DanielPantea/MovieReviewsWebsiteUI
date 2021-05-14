import { AuthentificationService } from '../_service/authentification.service';
import { Subscription } from 'rxjs';
import { MovieService } from '../_service/movie.service';
import { UserService } from '../_service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../_model/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy {

  movies: Movie[];

  paramSubscription: Subscription;
  getWatchlistSubscription: Subscription;
  removeWatchlistSubscription: Subscription;

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    public movieService:MovieService,
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {

    if(this.authentificationService.isLoggedIn()) {
        this.getWatchlist();
    }
  }

  ngOnDestroy(): void {

    this.paramSubscription?.unsubscribe();
    this.getWatchlistSubscription?.unsubscribe();
    this.removeWatchlistSubscription?.unsubscribe();
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

  removeWatchlist(movieId: number): void {
    
    this.removeWatchlistSubscription = this.userService.removeWatchlist(movieId).subscribe();
  }

}
