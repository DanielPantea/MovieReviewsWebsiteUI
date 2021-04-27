import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogIn = false;
  showSignIn = false;

  onHandleLogIn(){
    this.showLogIn = !this.showLogIn;
  }

  onHandleSignIn(){
    this.showSignIn = !this.showSignIn;
  }

  // showSignings = false;

  // showSigningsForm(){
  //   this.showSignings = !this.showSignings;
  // }
}
