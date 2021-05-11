import { UserService } from './../_service/user.service';
import { Movie } from './../_model/movie.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from './../_service/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {

  movieId: number;
  movie: Movie;

  constructor(
    private route:ActivatedRoute,
    private movieService: MovieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.movieId = +params.get('movieId');
      }
    )

    this.getMovieById();
  }

  getMovieById(){
    
    this.movieService.getMovieById(this.movieId).subscribe(
      (response: Movie) => {
        this.movie = response;
        console.log (response);
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

  addWatchlist(){

    this.userService.addWatchlist(this.movieId).subscribe();

  }

}
