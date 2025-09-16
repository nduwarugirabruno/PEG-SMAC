import {Routes} from '@angular/router';

export const auth_routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth').then(m => m.AuthComponent),
        children: [
            {
                path: 'signin',
                loadComponent: () => import('./signin/signin').then(m => m.SigninComponent)
            }, {
                path: '',
                redirectTo: 'signin',
                pathMatch: 'full'
            }, {
                path: '**',
                redirectTo: 'signin',
                pathMatch: 'full'
            }
        ]
    }, {
        path: '**',
        redirectTo: '/auth',
        pathMatch: 'full'
    }
];
