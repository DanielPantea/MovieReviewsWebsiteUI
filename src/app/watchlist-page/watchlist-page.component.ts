import { MovieService } from './../_service/movie.service';
import { UserService } from './../_service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from './../_model/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  movieId: number;
  movies: Movie[];

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    public movieService:MovieService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.movieId = +params.get('movieId');
      }
    )

    this.getWatchlist();
  }

  getWatchlist(){
    
    this.userService.getWatchlist().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

}
