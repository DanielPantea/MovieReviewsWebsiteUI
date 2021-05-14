import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rating } from '../../_models/rating.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {

  rating: Rating;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Rating, 
    private userService: UserService   
    ) { 
      this.rating = data;
    }

  ngOnInit(): void {
  }

  clearRating(): void {
    this.rating .grade= 0;
    this.userService.removeUserRating(this.rating.movieId).subscribe();
  }

  onChangeGrade(): void {

    this.userService.addUserRating(this.rating).subscribe();
  }

}
