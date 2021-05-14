import { UserService } from './user.service';
import { environment } from '../../environments/environment.prod';
import { Movie } from '../_model/movie.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MovieService{

    static readonly movieGenres: {[key: string]: string} = {
        'trending': 'Trending',
        'action': 'Action',
        'adventure': 'Adventure',
        'animated': 'Animated',
        'comedy': 'Comedy',
        'crime': 'Crime',
        'drama': 'Drama',
        'docu': 'Documentary',
        'fantasy': 'Fantasy',
        'history': 'Historical',
        'horror': 'Horror',
        'musical': 'Musical',
        'romance': 'Romance',
        'satire': 'Satire',
        'scifi': 'Sci-Fi',
        'thriller': 'Thriller',
        'war': 'War',
        'western': 'Western',
    };
    static readonly sortTypes: {[key: string]: string} = {
        'title': 'By Title',
        'date': 'By Release Date',
        'length': 'By Length'
    }

    movies: Movie[];

    subscription: Subscription;

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }
    
    getMovies(): void {
        let tags = localStorage.getItem('tags') ?? '';
        if(localStorage.getItem('searchTags'))
        {
            tags += tags == '' ? '' : ',';
            tags += localStorage.getItem('searchTags').split(/[\s,.-]+/).toString();
        }

        let resp = tags == '' ? this.getAllMovies() : this.getMoviesByTags(tags);

        // To avoid memory leaks, unsubscribe from the last subscription
        this.subscription?.unsubscribe();

        this.subscription = resp.subscribe(
            (response: Movie[]) => {
                
                this.movies = response;

                let sortParams = JSON.parse(localStorage.getItem('sortParams'));
                if(sortParams) {
                    this.sortMovies(sortParams.sortType, sortParams.sortDir);
                }
            },
        
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    sortMovies(sortType: string, sortDir: number): void {

        switch(sortType) {
            case 'length':
                this.movies.sort((m1, m2) => (m1.lengthMinutes > m2.lengthMinutes) ? sortDir : -sortDir )
                break;
            case 'title':
                this.movies.sort((m1, m2) => (m1.movieTitle > m2.movieTitle) ? sortDir : -sortDir )
                break;
            case 'date':
                this.movies.sort((m1, m2) => (m1.releaseDate > m2.releaseDate) ? sortDir : -sortDir )
                break;
        }
    }

    getMovieTotalRating(movieId): Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/movie/rating/${movieId}`);
    }

    getMovieById(movieId: number): Observable<Movie>{

        return this.http.get<Movie>(`${environment.apiUrl}/movie/${movieId}`);
    }

    private getAllMovies(): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/all`);
    }

    getRequestsMovies(): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/requests`);
    }

    private getMoviesByTags(tags: string): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/tag/${tags}`);
    }

    
    allowRequest(movieId: number){

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );
        
        return this.http.put<any>(`${environment.apiUrl}/movie/enable/${movieId}`,null, {headers})
    }
}