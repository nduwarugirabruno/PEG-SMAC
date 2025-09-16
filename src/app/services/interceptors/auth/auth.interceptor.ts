import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    //debugger;
    const authToken = localStorage.getItem('jwtToken');
    const serverIp = localStorage.getItem('serverIp');
    const host = window.location.hostname; // ex: 192.168.1.25 si vous ouvrez http://192.168.1.25:4200
    const protocol = window.location.protocol; // http: ou https:


    // Vérifier si la requête est destinée à /api/v1/auth/
    if (req.url.includes('/api/v1/auth/') || req.url.includes('/api/v1/meta-data/') || req.url.includes('/api/v1/demo/')) {
        // Si c'est une requête d'authentification, passer directement sans activer le spinner
        return next(req);
    }

    // const updatedUrl = req.url.includes('localhost') ? req.url.replace('localhost', serverIp ?? 'localhost') : req.url;

    // Clone the request and add the authorization header
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        },
        // url: updatedUrl
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq).pipe(
        catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                // Handle HTTP errors
                if (err.status === 401) {
                    // Specific handling for unauthorized errors
                    console.error('Unauthorized request:', err);
                    // You might trigger a re-authentication flow or redirect the user here
                } else {
                    // Handle other HTTP error codes
                    console.error('HTTP error:', err);
                }
            } else {
                // Handle non-HTTP errors
                console.error('An error occurred:', err);
            }

            // Re-throw the error to propagate it further
            return throwError(() => err);
        })
    );
};
