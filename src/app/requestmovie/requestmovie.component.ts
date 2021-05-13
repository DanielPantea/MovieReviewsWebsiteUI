import { MatDialogRef } from '@angular/material/dialog';
import { Movie } from './../_model/movie.model';
import { UserService } from './../_service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-requestmovie',
  templateUrl: './requestmovie.component.html',
  styleUrls: ['./requestmovie.component.css']
})
export class RequestmovieComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Image Poster';

  movie: Movie = {
    movieId: null,
    movieTitle: '',
    movieDesc: '',
    posterImgUrl: '',
    releaseDate: null,
    trailerUrl: '',
    lengthMinutes: 0,
    movieDirectors: '',
    movieWriters: '',
    movieActors: '',
    isEnabled: false
  };
  
  isInvalid = false;

  constructor(

    private userService: UserService,
    private dialogRef: MatDialogRef<RequestmovieComponent>
  ) { }

  ngOnInit(): void {
  }


  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Image Poster';
    }
  }

  sendRequest(){
    
    if(this.movie.movieTitle == ''){
      this.isInvalid = true;
      return;
    }
    this.userService.sendRequest(this.movie).subscribe(
      () => {
        this.dialogRef.close();
      }
    );
  }
}
