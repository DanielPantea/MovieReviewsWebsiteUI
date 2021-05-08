import { Tag } from './../_model/tag.model';
import { environment } from './../../environments/environment.prod';
import { UserService } from './user.service';
import { Movie } from './../_model/movie.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MovieService{

    constructor(
        private userService: UserService,
        private http: HttpClient
    ) {}
    
    getAllMovies(): Observable<Movie[]> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/all`, {headers});
    }

    getMoviesByTags(tags: Tag[]): Observable<Movie[]> {
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + this.userService.currentUser.authdata
            }
        );

        let tagsString = "";
        for(let tag of tags){
            tagsString+=tag.tagId + ",";
        }
        tagsString = tagsString.slice(0, -1);

        return this.http.get<Movie[]>(`${environment.apiUrl}/movie/tag/${tagsString}`, {headers});
    }
}