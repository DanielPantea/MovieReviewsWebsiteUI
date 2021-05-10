import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';


const routes: Routes = [
    { path: 'navbar',component: NavbarComponent },
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'watchlist', component: WatchlistPageComponent },
    { path: 'movie-details/:movieId', component: MovieDetailsPageComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/movies' }
];

export const appRoutingModule = RouterModule.forRoot(routes);