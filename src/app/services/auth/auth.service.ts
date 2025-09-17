import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {AuthRequest, RegisterRequest} from '../../shared/app.request';
import {AuthenticationResponse} from '../../shared/app.responses';
import {API_PORT} from '../../shared/global.variables';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    private host = this.isBrowser ? window.location.hostname : undefined;
    private protocol = this.isBrowser ? window.location.protocol : 'http:';
    private base_url = `${this.protocol}//${this.host}:${API_PORT}/api/v1/auth/`;

    authenticate(authRequest: AuthRequest): Observable<AuthenticationResponse> {
        return this.http
            .post<AuthenticationResponse>(this.base_url + 'authenticate', authRequest //, { withCredentials: true } // Important pour les cookies ! observe: 'response' // Pour observer la réponse complète
            ).pipe(
                tap((data) => console.log('data: ', data)),
                catchError(this.handleError)
            );
    }

    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(this.base_url + 'register', registerRequest).pipe(
            tap((data) => console.log('data: ', data)),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof Error) {
            console.error('An error has occurred', error.error.message);
        } else {
            console.error(
                `Back error code: ${error.status}`,
                `Error body: ${error.error}`
            );
        }
        return throwError(() => 'Try again later please');
    }
}
