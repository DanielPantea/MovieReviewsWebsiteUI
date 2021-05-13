import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Rating } from "../_model/rating.model";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class RatingService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    addUserRating(rating: Rating): Observable<any> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        )

        return this.http.post<any>(`${environment.apiUrl}/rating/add/`, rating, {headers});
    }

    getUserRating(movieId: number): Observable<Rating> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        )

        return this.http.get<Rating>(`${environment.apiUrl}/rating/get/${movieId}/`, {headers});
    }

    removeUserRating(movieId: number): Observable<any> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        )

        return this.http.delete<any>(`${environment.apiUrl}/rating/del/${movieId}`, {headers});
    }
}