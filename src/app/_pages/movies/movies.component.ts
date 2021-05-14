import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../_dialogs/filter-dialog/filter-dialog.component';
import { SortDialogComponent } from '../../_dialogs/sort-dialog/sort-dialog.component';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  filterSubscription: Subscription;
  sortingSubscription: Subscription;
  searchTags: string;

  constructor(
    public dialog: MatDialog,
    public movieService: MovieService,
  ) { }

  ngOnInit(): void {

    this.movieService.getMovies();

    this.searchTags = localStorage.getItem('searchTags') ?? '';
  }

  ngOnDestroy(): void {
    
    this.filterSubscription?.unsubscribe();
    this.sortingSubscription?.unsubscribe();
  }

  openFilter(): void {

    let tags = localStorage.getItem('tags')?.split(',') ?? [];

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data =  tags;

    const dialogRef = this.dialog.open(FilterDialogComponent, dialogConfig);

    this.filterSubscription = dialogRef.afterClosed().subscribe(
      () => { 

        if(tags?.length != 0) {
          localStorage.setItem('tags', tags.toString());
        }
        else {
          localStorage.removeItem('tags')
        }

        this.movieService.getMovies();      
      }
    );
  }

  openSort(): void {

    const dialogConfig = new MatDialogConfig();

    let sortParams = JSON.parse(localStorage.getItem('sortParams')) ?? {sortType: '', sortDir: 1};

     dialogConfig.data = sortParams;

    const dialpgRef = this.dialog.open(SortDialogComponent, dialogConfig);

    this.sortingSubscription = dialpgRef.afterClosed().subscribe(
      () => {

        if(sortParams) {
          localStorage.setItem('sortParams', JSON.stringify(sortParams));
        }
        else {
          localStorage.removeItem('sortParams');
        }

        this.movieService.getMovies();
      }
    )

  }

  search(): void {
    if(!this.searchTags)
      localStorage.removeItem('searchTags');
    else
      localStorage.setItem('searchTags', this.searchTags);
    this.movieService.getMovies();
  }

}
