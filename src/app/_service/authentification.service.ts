import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class AuthentificationService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { 
        if(this.isLoggedIn) {
            userService.currentUser = JSON.parse(localStorage.getItem('userDetails'));
        }
    }

    login(username: string, password: string): Observable<any> {

        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        );
        return this.http.get<any>(`${environment.apiUrl}/login`, {headers});
    }

    register(username: string, password: string, email: string) {

        let body = JSON.parse(
            `{
                "username": "${username}",
                "password": "${password}",
                "email": "${email}"
            }`
        )
        return this.http.post<any>(`${environment.apiUrl}/register`, body);
    }

    isLoggedIn() {
        return localStorage.getItem('userDetails') != null;
    }

    logout(): void {

        localStorage.removeItem('userDetails');
        this.userService.currentUser = null;
    }
}