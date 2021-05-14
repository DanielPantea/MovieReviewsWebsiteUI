import { enUserRole } from './../_model/user-role.enum';
import { UserService } from './../_service/user.service';
import { DialogManagerService } from './../_service/dialog-manager.service';
import { AuthentificationService } from './../_service/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../_service/movie.service';
import { enMovieInfoFormType } from '../_model/movie-info-form.enum';

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

  ngOnInit(): void { }
  
  goToTrending(): void {

    localStorage.setItem('tags', 'trending');
    localStorage.removeItem('searchTags');
    this.movieService.getMovies();
    this.router.navigateByUrl('/movies');
  }

  openAddMovie() {
    this.dialogManagerService.openMovieInfo(null, 'Add Movie', enMovieInfoFormType.AddMovie);
  }

}
