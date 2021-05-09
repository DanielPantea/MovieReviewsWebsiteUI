import { Component, OnInit } from '@angular/core';
import { MovieService } from '../_service/movie.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  public movieGenres: {[key: string]: string};
  tags: string[] = [];

  constructor() { }

  ngOnInit(): void {

    this.movieGenres = MovieService.movieGenres
  
  }

  getIndexOf(key: string){

    return this.tags.indexOf(key);
    
  }

  toggleMovieGenre(key: string){

    let index = this.getIndexOf(key);

    if(index != -1)
      this.tags.splice(index,1);
    else
      this.tags.push(key);

  }

}
