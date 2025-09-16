import {HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {catchError, finalize, map, throwError} from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinner = inject(NgxSpinnerService);
    const toastr = inject(ToastrService);

    // Afficher le spinner et notifier le début de la requête
    spinner.show().then(r => console.log('r: ', r));
    toastr.info('Request Initialized');

    // Passer la requête au handler suivant
    return next(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                toastr.success('Request successful');
            }
            return event;
        }),

        catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                // Gestion des erreurs HTTP
                if (err.error.message === "NetworkError when attempting to fetch resource.") {
                    console.error('NetworkError when attempting to fetch resource.');
                    toastr.error('NetworkError when attempting to fetch resource.');
                } else if (err.status === 401) {
                    // Gestion spécifique des erreurs 401
                    console.error('Unauthorized request:', err);
                    toastr.error(`Unauthorized request: ${err.message}`);
                } else if (err.status === 404) {
                    console.error('Not found!');
                    toastr.error('Not found!');
                } else if (err.status === 500) {
                    console.error('Internal Server Error:', err);
                    toastr.error(`Internal Server Error: ${err.message}`);
                } else {
                    // Gestion des autres erreurs HTTP
                    console.error('HTTP error:', err);
                    toastr.error(`HTTP error: ${err.message}`);
                }
            } else {
                // Gestion des erreurs non-HTTP
                console.error('An error occurred:', err);
                toastr.error(`An error occurred: ${err.message}`);
            }
            return throwError(() => err);
        }),

        // Finalisation : masquer le spinner avec un délai
        finalize(() => {
            setTimeout(() => {
                spinner.hide().then(r => console.log('r: ', r));
            }, 1000);
        })
    );

};
