import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {API_PORT} from '../../shared/global.variables';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Responses} from '../../shared/app.responses';
import {UUID} from 'node:crypto';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    private host = this.isBrowser ? window.location.hostname : undefined;
    private protocol = this.isBrowser ? window.location.protocol : 'http:'; // http: ou https:
    private base_url = `${this.protocol}//${this.host}:${API_PORT}/api/v1/user/`;

    getById(id: UUID): Observable<Responses> {
        return this.http.get<Responses>(this.base_url + `get/by_id/${id}`).pipe(
            tap((data) => console.log('data: ', data)),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof Error) {
            console.error('An error occurred:', (error.error as Error).message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(() => 'Something bad happened; please try again later.');
    }
}
