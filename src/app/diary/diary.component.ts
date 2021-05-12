import { AuthentificationService } from './../_service/authentification.service';
import { MovieService } from './../_service/movie.service';
import { UserService } from './../_service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  constructor(
    private userService:UserService,
    public movieService:MovieService,
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
  }

}
