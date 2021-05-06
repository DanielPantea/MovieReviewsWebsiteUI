import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthentificationService
{
    constructor(
        private http: HttpClient
    ) { }

    login(username: string, password: string)
    {
        let headers = new HttpHeaders(
            {
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        )
        return this.http.get<any>(`${environment.apiUrl}/login`, {headers});
    }
}