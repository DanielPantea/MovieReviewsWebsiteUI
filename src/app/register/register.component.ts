import { AuthentificationService } from './../_services/authentification.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  cpassword: string;
  email: string;

  constructor(
    private authentificationService: AuthentificationService,
    private routing: Router
  ) { }

  ngOnInit(): void {
  }

  register(){
    if(this.cpassword != this.password)
      return;
    this.authentificationService.register(this.username,this.password,this.email).subscribe(
      data => {
        this.routing.navigate(["**"]);
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
  }
}
