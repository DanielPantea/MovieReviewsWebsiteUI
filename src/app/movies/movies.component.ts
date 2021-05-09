import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie.model';
import { MovieService } from '../_service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(){

    this.movieService.getAllMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        console.log(response);
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )

  }

}
