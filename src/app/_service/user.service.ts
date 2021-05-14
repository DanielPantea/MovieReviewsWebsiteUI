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
import { Rating } from '../_model/rating.model';

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
        return this.http.get<Movie[]>(`${environment.apiUrl}/user/watchlist/get`, {headers});
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
        return this.http.get<Movie[]>(`${environment.apiUrl}/user/diary/get`, {headers});
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
        return this.http.get<Review[]>(`${environment.apiUrl}/user/review/get/all/${movieId}`, {headers});
    }

    addReview(review: Review){

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/user/review/add`, review, {headers});
    }
    

    addUserRating(rating: Rating): Observable<any> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )

        return this.http.post<any>(`${environment.apiUrl}/user/rating/add`, rating, {headers});
    }


    getUserRating(movieId: number): Observable<number> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )

        return this.http.get<number>(`${environment.apiUrl}/user/rating/get/${movieId}`, {headers});
    }

    removeUserRating(movieId: number): Observable<any> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )

        return this.http.delete<any>(`${environment.apiUrl}/user/rating/del/${movieId}`, {headers});
    }

    sendMovieRequest(movie: Movie){

        movie.isEnabled = false;
        let body = movie;
        
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );

        return this.http.post<any>(`${environment.apiUrl}/user/movie/add`, body, {headers});
    }
}