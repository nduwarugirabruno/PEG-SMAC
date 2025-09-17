import {Routes} from '@angular/router';

export const admin_routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin-center').then(m => m.AdminCenterComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./admin-home/admin-home').then(m => m.AdminHomeComponent)
            }, {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }, {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    }, {
        path: '**',
        redirectTo: '/admin',
        pathMatch: 'full'
    }
];
