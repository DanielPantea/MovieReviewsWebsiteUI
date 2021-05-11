import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../_service/movie.service';

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrls: ['./sort-dialog.component.css']
})
export class SortDialogComponent implements OnInit {

  sortTypes: {[key: string]: string} = MovieService.sortTypes;
  sortParams: {sortType: string, sortDir: number}

  constructor(
    public dialogRef: MatDialogRef<SortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {sortType: string, sortDir: number}
  ) { 
    this.sortParams = data;
  }

  ngOnInit(): void {}

}
