import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {User} from '../shared/app.models';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalVariables} from '../shared/global.variables';
import {Role} from '../shared/app.enums';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-admin-center',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet
    ],
    templateUrl: './admin-center.html',
    styleUrl: './admin-center.scss'
})
export class AdminCenterComponent implements OnInit {
    c_user!: User;
    protected readonly title: string = 'ESPACE ADMINISTRATEUR - GROUPE SMAC';
    private fb = inject(FormBuilder);

    private cd = inject(ChangeDetectorRef);
    private param = inject(GlobalVariables);

    ngOnInit(): void {
        this.c_user = this.param.user ?? {
            nom: 'MAHRI',
            prenom: 'Valentin',
            matricule: '123456789',
            password: '123456789',
            role: Role.ADMIN
        };
        // throw new Error("Method not implemented.");
    }

}
