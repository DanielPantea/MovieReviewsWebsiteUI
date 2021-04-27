import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() closeLogIn = new EventEmitter<void>();
  onClose(){
    this.closeLogIn.emit();
  }

}
