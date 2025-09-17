/*
 * Copyright (c) 2025, Bruno NDUWARUGIRA. | GitHub Name: nduwarugirabruno
 */

export interface AuthRequest {
    nom: string;
    prenom: string;
    matricule: string;
    password: string
}
export interface RegisterRequest {
    nom: string;
    prenom: string;
    matricule: string;
    password: string
}

export interface PlanRequest {
    plan: string;
    montant: number;
    plafond: boolean;
    novemberAmount: number;
    decemberAmount: number;

    matricule: string;
    socialSecurityNumber: string
}
