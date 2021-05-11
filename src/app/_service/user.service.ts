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
    ) { }

    getWatchlist(): Observable<Movie[]> {
        
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )
        console.log(this.currentUser.username);
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
        
        console.log(movieId)
        return this.http.delete<any>(`${environment.apiUrl}/user/watchlist/del/${movieId}`,{headers});
    }
}