import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie.model';
import { Tag } from '../_model/tag.model';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  movies: Movie[];
  tags: Tag[];

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
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

  getMoviesByTags(){

    this.tags = new Array(new Tag(1,"Trending"));
    this.movieService.getMoviesByTags(this.tags).subscribe(
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
