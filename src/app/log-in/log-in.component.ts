import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { AuthentificationService } from '../_services/authentification.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  username: string;
  password: string;
  isInvalid: boolean;

  constructor(
    private authentificationService: AuthentificationService,
    private routing: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login()
  {
    this.authentificationService.login(this.username, this.password).subscribe(
      data => {
        this.userService.currentUser = new User(this.username, this.password);
        this.routing.navigate(["**"]);
        
      },
      error => {
        this.isInvalid = true;
      }
    )
  }
}
