/*
 * Copyright (c) 2025, Bruno NDUWARUGIRA. | GitHub Name: nduwarugirabruno
 */

import {MessageType} from './app.types';

export interface Responses {
    data: any;
    message: string;
    type: MessageType;
}

export interface SuccessResponse extends Responses {
    type: 'SUCCESS';
}

export interface WarningResponse extends Responses {
    type: 'WARNING';
}

export interface InfoResponse extends Responses {
    type: 'INFO';
}

export interface ErrorResponse extends Responses {
    type: 'ERROR';
}

export interface AuthenticationResponse {
    token: string;
    refreshToken: string;
}
