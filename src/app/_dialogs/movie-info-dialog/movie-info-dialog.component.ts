import { MovieService } from '../../_services/movie.service';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../../_models/movie.model';
import { UserService } from '../../_services/user.service';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { enMovieInfoFormType } from '../../_models/movie-info-form.enum';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-info-dialog',
  templateUrl: './movie-info-dialog.component.html',
  styleUrls: ['./movie-info-dialog.component.css']
})
export class MovieInfoDialogComponent implements OnInit, OnDestroy {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Image Poster';

  movie: Movie = {
    movieId: null,
    movieTitle: '',
    movieDesc: '',
    posterImgUrl: null,
    posterImg: null,
    releaseDate: null,
    trailerUrl: '',
    lengthMinutes: 0,
    movieDirectors: '',
    movieWriters: '',
    movieActors: '',
    isEnabled: false,
    movieTags: []
  };
  
  posterImgFile: File = null;

  movieTags: string = '';

  cardTitle: string;

  isInvalid = false;

  formType: enMovieInfoFormType;

  movieInfoSubscription: Subscription;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<MovieInfoDialogComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: { movie: Movie, cardTitle: string, formType: enMovieInfoFormType }
  ) { 
    
    if(data.movie)
    {
      this.movie = data.movie;
      this.movieTags = this.movie.movieTags.map(tag => tag.tagKey).toString();
    }

    this.cardTitle = data.cardTitle;
    this.formType = data.formType;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.movieInfoSubscription?.unsubscribe();
  }

  onFileSelected(event: any): void {

    this.posterImgFile = event.target.files[0];
  }

  validateForm(): boolean {

    if(this.movie.movieTitle == '')
      return false;
    
    return true;
  }

  submit(): void {
    
    if(!this.validateForm())
      return;

    this.movie.movieTags = this.movieTags == '' ? [] : this.movieTags.split(',').map(t => ({tagKey: t}));

    let respRef;

    switch(this.formType) {

      case enMovieInfoFormType.AddMovie:
        console.log(enMovieInfoFormType.AddMovie);
        this.movie.isEnabled = true;
        respRef = this.movieService.addMovie(this.movie);
        break;
      case enMovieInfoFormType.MovieRequest:
        this.movie.isEnabled = false;
        console.log(enMovieInfoFormType.MovieRequest);
        respRef = this.userService.sendMovieRequest(this.movie);
        break;
      case enMovieInfoFormType.UpdateMovie:
        console.log(enMovieInfoFormType.UpdateMovie);
        respRef = this.movieService.updateMovie(this.movie);
        break;
    }

    respRef.subscribe(
      (response) => {
        console.log(response.body);
        if(this.posterImgFile)
          this.movieService.addMoviePoster(response.movieId, this.posterImgFile).subscribe(
            (error) => console.log(error)
          );
        this.dialogRef.close()
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

}
    