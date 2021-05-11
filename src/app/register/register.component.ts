import { AuthentificationService } from '../_service/authentification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../_service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { enAuthResult } from '../_model/auth-result.enum'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  cpassword: string;
  email: string;

  registerSubscription: Subscription

  constructor(
    private authentificationService: AuthentificationService,
    private userService: UserService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

  register(){
    if(this.cpassword != this.password)
      return;
      this.registerSubscription = this.authentificationService.register(this.username,this.password,this.email).subscribe(
      data => {
        this.dialogRef.close({data: enAuthResult.Registered });       
      },
      error =>{
        console.log(error);
      }
    )
  }
}
