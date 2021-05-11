import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../_service/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void { }
  
  goToTrending(): void {

    localStorage.setItem('tags', 'trending');
    this.movieService.getMovies();
    this.router.navigateByUrl('/movies');
  }

}
