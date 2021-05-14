import { DiaryComponent } from './diary/diary.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieRequestsComponent } from './movie-requests/movie-requests.component';


const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: 'watchlist', component: WatchlistPageComponent },
    { path: 'diary', component: DiaryComponent },
    { path: 'movie-details/:movieId', component: MovieDetailsComponent },
    { path: 'movie-requests', component: MovieRequestsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/movies' }
];

export const appRoutingModule = RouterModule.forRoot(routes);