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
        private authentificationService: AuthentificationService
    ) { 

        if(authentificationService.isLoggedIn) {

            this.currentUser = JSON.parse(localStorage.getItem('userDetails'));
        }
    }

    getWatchlist(): Observable<Movie[]> {
        
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        )
        return this.http.get<Movie[]>(`${environment.apiUrl}/user/watchlist`, {headers});
    }

    addToWatchlist(movieId: number){
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.currentUser.authdata
            }
        );
        return this.http.post<Movie>(`${environment.apiUrl}/user/watchlist/${movieId}`,{headers});
    }
}