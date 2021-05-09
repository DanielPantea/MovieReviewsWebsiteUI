import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { Movie } from '../_model/movie.model';
import { MovieService } from '../_service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: Movie[];
  tags: string[];
  routeQueryParams: Subscription

  constructor(
    public dialog: MatDialog,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tags = localStorage.getItem('tags')?.split(',') ?? [];
    if(this.tags.length == 0) {
      this.getAllMovies();
    }
    else {
      this.getMoviesByTags();
    }

    this.routeQueryParams = this.activatedRoute.queryParams.subscribe(
      params => {
        if(params['filter']){
          this.openFilter();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routeQueryParams.unsubscribe();
    console.log("Exit");

  }

  openFilter(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.tags;
    dialogConfig.closeOnNavigation = true;

    const dialogRef = this.dialog.open(FilterDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        this.tags = result ?? this.tags;
        localStorage.setItem('tags', this.tags.toString());

        if(this.tags.length == 0) {
          this.getAllMovies();
        }
        else {
          this.getMoviesByTags();
        }
          
        this.router.navigate(['.'], {relativeTo: this.activatedRoute});
      }
    );
  }

  getAllMovies(): void {

    this.movieService.getAllMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  getMoviesByTags(): void {

    this.movieService.getMoviesByTags(this.tags.toString()).subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

}
