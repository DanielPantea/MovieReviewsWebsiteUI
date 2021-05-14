import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  movieGenres: {[key: string]: string};
  tags: string[]

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) { 

    this.tags = data;
  }

  ngOnInit(): void {

    this.movieGenres = MovieService.movieGenres
  }

  getIndexOf(key: string): number {

    return this.tags.indexOf(key);
  }

  toggleMovieGenre(key: string): void {

    let index = this.getIndexOf(key);

    if(index != -1)
      this.tags.splice(index,1);
    else
      this.tags.push(key);
  }

}
