import {Injectable} from '@angular/core';
import {User} from './app.models';
import {UUID} from 'node:crypto';

@Injectable({
    providedIn: 'root'
})
export class GlobalVariables {
    user!: User;
    token!: string;
    id!: UUID;
}

export const API_PORT = 8181;
