import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    }, {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.auth_routes)
    }, {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.HomeComponent)
    }, {
        path: 'plans',
        loadComponent: () => import('./plans/plans').then(m => m.PlansComponent)
    }, {
        path: 'admin-center',
        loadChildren: () => import('./admin-center/admin.routes').then(m => m.admin_routes)
    }
];
