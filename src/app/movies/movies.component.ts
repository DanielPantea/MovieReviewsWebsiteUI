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
  routeQueryParams: Subscription

  constructor(
    public dialog: MatDialog,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMovies();

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
  }

  openFilter(): void {

    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(FilterDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log("Closed Filter " + result);
        this.router.navigate(['.'], {relativeTo: this.activatedRoute});
      }
    );
  }

  getAllMovies(): void {

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
