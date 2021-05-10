import { environment } from '../../environments/environment.prod';
import { Movie } from '../_model/movie.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enSortMovie } from '../_model/sort-movie.enum';

@Injectable({ providedIn: 'root' })
export class MovieService{

    static readonly movieGenres: {[key: string]: string} = {
        'trending': "Trending",
        'action': "Action",
        'adventure': "Adventure",
        'animated': "Animated",
        'comedy': "Comedy",
        'crime': "Crime",
        'drama': "Drama",
        'docu': "Documentary",
        'fantasy': "Fantasy",
        'history': "Historical",
        'horror': "Horror",
        'musical': "Musical",
        'romance': "Romance",
        'satire': "Satire",
        'scifi': "Sci-Fi",
        'thriller': "Thriller",
        'war': "War",
        'western': "Western",
    };
    movies: Movie[];

    constructor(
        private http: HttpClient
    ) { }
    
    getMovies(): void {
        let tags = localStorage.getItem('tags')?.split(',') ?? [];

        let resp = tags.length == 0 ? this.getAllMovies() : this.getMoviesByTags(tags.toString());
        resp.subscribe(
            (response: Movie[]) => {
                this.movies = response;
            },
        
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    sortMovies(sortProp: enSortMovie, sortDir: number): void {

        switch(sortProp) {
            case enSortMovie.lengthMinutes:
                this.movies.sort((m1, m2) => (Math.sign(m1.lengthMinutes - m2.lengthMinutes) == sortDir) ? 1 : -1 )
                break;
            case enSortMovie.movieTitle:
                //this.movies.sort((m1, m2) => (Math.sign(m1.lengthMinutes - m2.lengthMinutes) == sortDir) ? 1 : -1 )
                break;
            case enSortMovie.releaseDate:
                //this.movies.sort((m1, m2) => (Math.sign(m1.lengthMinutes - m2.lengthMinutes) == sortDir) ? 1 : -1 )
                break;
        }

    }

    private getAllMovies(): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/all`);
    }

    private getMoviesByTags(tags: string): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/tag/${tags}`);
    }
}