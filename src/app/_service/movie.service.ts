import { Tag } from '../_model/tag.model';
import { environment } from '../../environments/environment.prod';
import { UserService } from './user.service';
import { Movie } from '../_model/movie.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MovieService{

    static readonly movieGenres: {[key: string]: string} = {};

    constructor(
        private userService: UserService,
        private http: HttpClient
    ) {
        MovieService.movieGenres['action'] = "Action";
        MovieService.movieGenres['adventure'] = "Adventure";
        MovieService.movieGenres['animated'] = "Animated";
        MovieService.movieGenres['comedy'] = "Comedy";
        MovieService.movieGenres['crime'] = "Crime";
        MovieService.movieGenres['drama'] = "Drama";
        MovieService.movieGenres['fantasy'] = "Fantasy";
        MovieService.movieGenres['historical'] = "Historical";
        MovieService.movieGenres['horror'] = "Horror";
        MovieService.movieGenres['musical'] = "Musical";
        MovieService.movieGenres['romance'] = "Romance";
        MovieService.movieGenres['satire'] = "Satire";
        MovieService.movieGenres['scifi'] = "Sci-Fi";
        MovieService.movieGenres['thriller'] = "Thriller";
        MovieService.movieGenres['trending'] = "Trending";
        MovieService.movieGenres['war'] = "War";
        MovieService.movieGenres['western'] = "Western";
    }
    
    getAllMovies(): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/all`);
    }

    getMovieById(movieId: number): Observable<Movie>{

        return this.http.get<Movie>(`${environment.apiUrl}/movie/${movieId}`);
    }

    getMoviesByTags(): Observable<Movie[]> {

        let currentTags = JSON.parse(localStorage.getItem("tags"));
        let tagsString = "";
        for(let tag of currentTags){
            tagsString+=tag + ",";
        }
        tagsString = tagsString.slice(0, -1);

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/tag/${tagsString}`);
    }
}