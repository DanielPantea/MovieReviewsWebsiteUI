import { UserService } from './user.service';
import { environment } from '../../environments/environment.prod';
import { Movie } from '../_models/movie.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Review } from '../_models/review.model';
import { Tag } from '../_models/tag.model';

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
                this.movies.forEach(m => {
                    if(m.posterImg)
                        m.posterImgUrl = 'data:image/jpeg;base64,' + m.posterImg.imageByte
                });

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

        return this.http.get<number>(`${environment.apiUrl}/movie/rating/get/${movieId}`);
    }

    getMovieReviews(movieId: number){

        return this.http.get<Review[]>(`${environment.apiUrl}/movie/review/get/all/${movieId}`);
    }

    getMovieById(movieId: number): Observable<Movie>{

        return this.http.get<Movie>(`${environment.apiUrl}/movie/get/${movieId}`)
    }

    private getAllMovies(): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/get/all`);
    }

    getMovieRequests(): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/requests/get`);
    }

    private getMoviesByTags(tags: string): Observable<Movie[]> {

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/tags/get/${tags}`);
    }

    
    allowRequest(movieId: number){

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );
        
        return this.http.put<any>(`${environment.apiUrl}/movie/upd/enable/${movieId}`,null, {headers})
    }

    deleteMovie(movieId: number): Observable<any> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );

        return this.http.delete<any>(`${environment.apiUrl}/movie/del/${movieId}`, {headers});
    }

    addMovie(movie: Movie){

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );
        console.log(movie);
        return this.http.post<any>(`${environment.apiUrl}/movie/add`, movie, {headers});
    }

    addMoviePoster(movieId: number, posterImg: File)
    {
        let uploadImageData = new FormData();
        uploadImageData.append('posterImg', posterImg);

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/movie/poster/add/${movieId}`, uploadImageData, {headers});
    }

    updateMovie(movie: Movie){

        let body = movie;

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );

        return this.http.put<any>(`${environment.apiUrl}/movie/upd`, body, {headers});
    }

    getMovieGenres(movie: Movie): string[] {

        if(!movie)
            return [];
            
        let temp = [];
        for(let tag of movie.movieTags) {

            if(MovieService.movieGenres[tag.tagKey] && tag.tagKey != 'trending')
                temp.push(MovieService.movieGenres[tag.tagKey]);
        }
        return temp;
    }
}