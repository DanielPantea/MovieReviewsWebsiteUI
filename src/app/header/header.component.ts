import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../_service/authentification.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
  }

}
