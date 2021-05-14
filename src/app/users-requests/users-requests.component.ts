import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from './../_model/movie.model';
import { MovieService } from './../_service/movie.service';
import { UserService } from './../_service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-requests',
  templateUrl: './users-requests.component.html',
  styleUrls: ['./users-requests.component.css']
})
export class UsersRequestsComponent implements OnInit {

  movies: Movie[];

  constructor(
    public movieService: MovieService
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

  trailerLink(movie: Movie){
    window.location.href = movie.trailerUrl;
  }

}
