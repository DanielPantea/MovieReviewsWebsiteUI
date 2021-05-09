<<<<<<< HEAD
import { HomepageComponent } from './homepage/homepage.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
=======
import { Component } from '@angular/core';
>>>>>>> main
import { DiarypageComponent } from './diarypage/diarypage.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD


const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent  },
    { path: 'diary', component:DiarypageComponent},
    { path: 'movie-details', component:MovieDetailsPageComponent},
    { path: 'homepage', component:HomepageComponent},
=======
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
>>>>>>> main
    // otherwise redirect to home
    { path: '**', redirectTo: '/movies' }
];

export const appRoutingModule = RouterModule.forRoot(routes);