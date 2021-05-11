import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../log-in/log-in.component';
import { RegisterComponent } from '../register/register.component';
import { enAuthResult } from '../_model/auth-result.enum';
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
    public authentificationService: AuthentificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openLogin(): void {

    this.dialog.open(LogInComponent).afterClosed().subscribe(
      (data) => {

        if(data?.authResult == enAuthResult.GoToRegister) {
          this.openRegister();
        }

      }
    );

  }

  openRegister(): void {

    this.dialog.open(RegisterComponent).afterClosed().subscribe(
      (data) => {

        if(data?.authResult == enAuthResult.GoToLogin) {
          this.openLogin();
        }
        
      }
    );

  }

}
