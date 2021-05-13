import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MoviesComponent } from './movies/movies.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RequestmovieComponent } from './requestmovie/requestmovie.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { DiaryComponent } from './diary/diary.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    NavbarComponent,
    HeaderComponent,
    MovieDetailsPageComponent,
    MoviesComponent,
    WatchlistPageComponent,
    MoviesComponent,
    FilterDialogComponent,
    SortDialogComponent,
    RequestmovieComponent,
    RatingDialogComponent,
    DiaryComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
