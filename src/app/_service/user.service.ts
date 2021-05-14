import { enUserRole } from './../_model/user-role.enum';
import { Review } from './../_model/review.model';
import { Router } from '@angular/router';
import { Movie } from './../_model/movie.model';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { User } from "../_model/user.model";
import { AuthentificationService } from "./authentification.service";

@Injectable({ providedIn: 'root' })
export class UserService
{

    currentUser: User;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    

    isAdmin(): boolean {
        
        return this.currentUser?.userRole == enUserRole.ADMIN;
      }

    getWatchlist(): Observable<Movie[]> {
        
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )
        return this.http.get<Movie[]>(`${environment.apiUrl}/user/watchlist`, {headers});
    }

    addWatchlist(movieId: number) {
        
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/user/watchlist/add/${movieId}`, null, {headers});
    }

    removeWatchlist(movieId: number) {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );
        
        location.reload();
        return this.http.delete<any>(`${environment.apiUrl}/user/watchlist/del/${movieId}`,{headers});
    }

    getDiary(): Observable<Movie[]> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )
        return this.http.get<Movie[]>(`${environment.apiUrl}/user/diary`, {headers});
    }

    addDiary(movieId: number) {
        
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/user/diary/add/${movieId}`, null, {headers});
    }

    removeDiary(movieId: number) {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );
        
        location.reload();
        return this.http.delete<any>(`${environment.apiUrl}/user/diary/del/${movieId}`,{headers});
    }

    getUserReviews(movieId: number){
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )
        return this.http.get<Review[]>(`${environment.apiUrl}/review/user/${movieId}`, {headers});
    }

    getMovieReviews(movieId: number){
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )
        return this.http.get<Review[]>(`${environment.apiUrl}/review/all/${movieId}`, {headers});
    }

    sendRequest(movie: Movie){

        let body = movie;

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/movie/add`, body, {headers});
    }

    addReview(review: Review){

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/review/add`, review, {headers});
    }
}