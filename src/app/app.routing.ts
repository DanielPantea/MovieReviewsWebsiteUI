import { UsersRequestsComponent } from './users-requests/users-requests.component';
import { DiaryComponent } from './diary/diary.component';
import { RequestmovieComponent } from './requestmovie/requestmovie.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';


const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: 'watchlist', component: WatchlistPageComponent },
    { path: 'diary', component: DiaryComponent },
    { path: 'movie-details/:movieId', component: MovieDetailsPageComponent },
    { path: 'request', component: RequestmovieComponent },
    { path: 'users-requests', component: UsersRequestsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/movies' }
];

export const appRoutingModule = RouterModule.forRoot(routes);