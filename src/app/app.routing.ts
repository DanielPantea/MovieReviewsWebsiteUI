import { Component } from '@angular/core';
import { DiarypageComponent } from './diarypage/diarypage.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';
import { MoviesComponent } from './movies/movies.component';


const routes: Routes = [
    { path: 'navbar',component: NavbarComponent },
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'diary', component: DiarypageComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'movies', component: MoviesComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/movies' }
];

export const appRoutingModule = RouterModule.forRoot(routes);