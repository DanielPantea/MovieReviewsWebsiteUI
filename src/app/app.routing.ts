import { DiaryComponent } from './diary/diary.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieRequestsComponent } from './movie-requests/movie-requests.component';


const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: 'watchlist', component: WatchlistPageComponent },
    { path: 'diary', component: DiaryComponent },
    { path: 'movie-details/:movieId', component: MovieDetailsPageComponent },
    { path: 'movie-requests', component: MovieRequestsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/movies' }
];

export const appRoutingModule = RouterModule.forRoot(routes);