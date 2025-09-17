import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MessagePopup} from '../core/popups/message-popup/message-popup';
import {PopupService} from '../services/popup/popup.service';
import {CurrencyPipe} from '@angular/common';
import {ConfirmPlanSubscription} from '../core/popups/confirm-plan-subscription/confirm-plan-subscription';
import {GlobalVariables} from '../shared/global.variables';
import {User} from '../shared/app.models';
import {Role} from '../shared/app.enums';

@Component({
    selector: 'app-plans',
    imports: [
        ReactiveFormsModule,
        CurrencyPipe
    ],
    templateUrl: './plans.html',
    styleUrl: './plans.scss'
})
export class PlansComponent implements OnInit {

    protected readonly title: string = 'PLAN D’ÉPARGNE SALARIALE - GROUPE SMAC';
    form!: FormGroup;
    abondementOutput!: number;
    c_user!: User;
    private fb = inject(FormBuilder);

    private cd = inject(ChangeDetectorRef);
    private param = inject(GlobalVariables);
    private popup = inject(PopupService);

    private dialogContents = [
        {
            title: "Information Importante",
            body: "L’abondement total maximal versé au titre du PEG SMAC sur l’année 2025 sera de 1 480 560 euros.\n\n" +
                "Au-delà de ce montant, les versements des collaborateurs dans le PEG SMAC seront honorés, mais ils ne " +
                "généreront pas d’abondement (voir point 2. du présent bulletin individuel de versement volontaire, " +
                "ainsi que la plaquette du PEG SMAC 2025)."
        }, {
            title: "Calcul de l'Abondement",
            body: "media"
        }, {
            icon: "check_circle",
            title: "Merci !",
            body: "Votre souscription a bien été enregistrée.",
            btnMessage: "Fermer"
        }
    ]

    get plan() {
        return this.form.get('plan');
    }

    get montant() {
        return this.form.get('montant');
    }

    get plafond() {
        return this.form.get('plafond');
    }

    get novemberAmount() {
        return this.form.get('novemberAmount');
    }

    get decemberAmount() {
        return this.form.get('decemberAmount');
    }

    get invalidPrelevement() {
        return this.montant?.value !== this.novemberAmount?.value + this.decemberAmount?.value;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            plan: ['prudent', [Validators.required]],
            montant: ['', [Validators.required]],
            plafond: ['', [Validators.required]],
            novemberAmount: ['', [Validators.required]],
            decemberAmount: ['', [Validators.required]]
        });
        this.c_user = this.param.user ?? {nom: 'MAHRI', prenom: 'Valentin', matricule: '123456789', password: '123456789', role: Role.ADMIN};
        // this.getUserDetails();

        this.abondementOutput = 0;

        this.montant?.valueChanges.subscribe({
            next: value => this.abondementOutput = this.calculAbondement(value),
            error: err => console.error('error: ', err),
            complete: () => console.info(
                'complete'
            )
        });
    }

    submit() {
        let dialogRef = this.popup.showAsPopup(ConfirmPlanSubscription, {
            disableClose: true,
            data: {
                content: this.form.value
            }
        })

        dialogRef.closed.subscribe({
            next: (result) => {
                if (result === false) return;
                this.popup.showAsPopup(MessagePopup, {
                    disableClose: true,
                    data: {
                        content: this.dialogContents[2]
                    }
                })
            },
            error: (err) => console.error(err),
            complete: () => console.info('The dialog was closed')
        })
    }

    calculAbondement(versement: number): number {
        const tranche1 = Math.min(versement, 360) * 2;                   // 200 % = x2
        const tranche2 = Math.min(Math.max(versement - 360, 0), 360); // 100 % = x1
        const tranche3 = Math.min(Math.max(versement - 720, 0), 1080) * 0.25; // 25 %
        const total = tranche1 + tranche2 + tranche3;
        console.log(this.form.value);
        return Math.min(total, 1350); // plafond annuel
    }

    openModal(number: number) {
        let dialogRef = this.popup.showAsPopup(MessagePopup, {
            disableClose: true,
            data: {
                content: this.dialogContents[number]
            }
        });

        dialogRef.closed.subscribe({
            next: (result) => {
                console.log(result)
            },
            error: (err) => {
                console.error(err)
            },
            complete: () => {
                console.info('The dialog was closed')
            }
        })
    }

}
