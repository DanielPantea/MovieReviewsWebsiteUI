import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie.model';
import { MovieService } from '../_service/movie.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-movie-requests',
  templateUrl: './movie-requests.component.html',
  styleUrls: ['./movie-requests.component.css']
})
export class MovieRequestsComponent implements OnInit {

  movies: Movie[];

  constructor(
    public movieService: MovieService,
    public userService: UserService
  ) { }

  ngOnInit(): void {

    this.getUsersRequests();
  }

  getUsersRequests(): void {

    this.movieService.getRequestsMovies().subscribe(
      (response: Movie[]) => {
        
        this.movies = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  } 

  allowRequest(movieId: number){

      this.movieService.allowRequest(movieId).subscribe();
  }

  denyRequest(movieId: number){

    this.movieService.deleteMovie(movieId).subscribe();
}

  trailerLink(movie: Movie){
    window.location.href = movie.trailerUrl;
  }

}