import { DialogManagerService } from '../_services/dialog-manager.service';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../_services/authentification.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authentificationService: AuthentificationService,
    public dialogManagerService: DialogManagerService
  ) { }

  ngOnInit(): void { }
}
