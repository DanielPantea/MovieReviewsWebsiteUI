import { Component, OnInit } from '@angular/core';
import { MovieService } from '../_service/movie.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  public movieGenres: {[key: string]: string};
  tags: string[] = [];

  constructor(

    private movieService: MovieService
  ) {
    this.movieGenres = MovieService.movieGenres;
   }

  ngOnInit(): void {}

  getIndexOf(key: string){

    return this.tags.indexOf(key);
  }

  toggleMovieGenres(key: string){

    let index = this.getIndexOf(key);

    if(index != -1)
      this.tags.splice(index,1);
    else
      this.tags.push(key);

  }

  submitFilter(){
    localStorage.setItem('tags',JSON.stringify(this.tags));
  }

}
