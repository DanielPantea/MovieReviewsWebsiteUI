import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_model/user.model';
import { AuthentificationService } from '../_service/authentification.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  isInvalid: boolean;

  loginSubscription: Subscription;

  constructor(
    private authentificationService: AuthentificationService,
    private routing: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  login()
  {
    this.loginSubscription = this.authentificationService.login(this.username, this.password).subscribe(
      (data: User) => {
        this.userService.currentUser = data;
        this.userService.currentUser.authdata = btoa(`${this.username}:${this.password}`);
        localStorage.setItem('userDetails', JSON.stringify(this.userService.currentUser));
        this.routing.navigate(["**"]);
      },
      (error: HttpErrorResponse) => {          
        this.authentificationService.logout;
        this.isInvalid = true;
      }
    );
  }
}
