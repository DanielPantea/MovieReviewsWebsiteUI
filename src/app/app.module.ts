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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


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
    SortDialogComponent
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
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
