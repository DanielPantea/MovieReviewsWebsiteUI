import { LoginDialogComponent } from './_dialogs/login-dialog/login-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { RegisterDialogComponent } from './_dialogs/register-dialog/register-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './_pages/movie-details/movie-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MoviesComponent } from './_pages/movies/movies.component';
import { WatchlistComponent } from './_pages/watchlist/watchlist.component';
import { FilterDialogComponent } from './_dialogs/filter-dialog/filter-dialog.component';
import { SortDialogComponent } from './_dialogs/sort-dialog/sort-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingDialogComponent } from './_dialogs/rating-dialog/rating-dialog.component';
import { DiaryComponent } from './_pages/diary/diary.component';
import { MovieInfoDialogComponent } from './_dialogs/movie-info-dialog/movie-info-dialog.component';
import { MovieRequestsComponent } from './_pages/movie-requests/movie-requests.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    NavbarComponent,
    HeaderComponent,
    MovieDetailsComponent,
    MoviesComponent,
    WatchlistComponent,
    MoviesComponent,
    FilterDialogComponent,
    SortDialogComponent,
    RatingDialogComponent,
    DiaryComponent,
    MovieInfoDialogComponent,
    MovieRequestsComponent
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
    MatNativeDateModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
