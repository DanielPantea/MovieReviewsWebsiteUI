import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { MovieService } from '../_service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  routeQueryParams: Subscription

  constructor(
    public dialog: MatDialog,
    public movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.movieService.getMovies();

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
    // console.log("Exit");

  }

  openFilter(): void {

    let tags = localStorage.getItem('tags')?.split(',') ?? [];

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data =  tags;

    const dialogRef = this.dialog.open(FilterDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => { 

        if(tags?.length != 0) {
          localStorage.setItem('tags', tags.toString());
        }
        else {
          localStorage.removeItem('tags')
        }

        this.movieService.getMovies();
        this.router.navigate(['.'], { relativeTo: this.activatedRoute });
      
      }
    );
  }

}
