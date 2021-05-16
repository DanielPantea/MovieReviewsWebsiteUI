import { enUserRole } from '../_models/user-role.enum';
import { UserService } from '../_services/user.service';
import { DialogManagerService } from '../_services/dialog-manager.service';
import { AuthentificationService } from '../_services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../_services/movie.service';
import { enMovieInfoFormType } from '../_models/movie-info-form.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private movieService: MovieService,
    public userService: UserService,
    public authentificationService: AuthentificationService,
    public dialogManagerService: DialogManagerService,
  ) { }

  ngOnInit(): void { 
  }

  goToTrending(): void {

    localStorage.setItem('tags', 'trending');
    localStorage.removeItem('searchTags');
    this.movieService.getMovies();
    this.router.navigateByUrl('/movies');
  }

  goToWatchlist(): void {
    if(!this.authentificationService.isLoggedIn())
      this.dialogManagerService.openLogin();
    else
      this.router.navigateByUrl('/watchlist');
  }

  goToDiary(): void {
    if(!this.authentificationService.isLoggedIn())
      this.dialogManagerService.openLogin();
    else
      this.router.navigateByUrl('/diary');
  }

  openMovieRequest() {
    this.dialogManagerService.openMovieInfo(null, 'Request Missing Movie', enMovieInfoFormType.MovieRequest);
  }

  openAddMovie() {
    this.dialogManagerService.openMovieInfo(null, 'Add Movie', enMovieInfoFormType.AddMovie);
  }

}
