import {Component, inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {PlanService} from '../../../services/plan/plan.service';
import {PlanRequest} from '../../../shared/app.request';
import {GlobalVariables} from '../../../shared/global.variables';

@Component({
    selector: 'app-confirm-plan-subscription',
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel
    ],
    templateUrl: './confirm-plan-subscription.html',
    styleUrl: './confirm-plan-subscription.scss'
})
export class ConfirmPlanSubscription implements OnInit {

    @Input() data!: {
        plan: string,
        montant: number,
        plafond: boolean,
        novemberAmount: number,
        decemberAmount: number
    };
    form!: FormGroup;
    private dialogRef = inject(DialogRef, {optional: true});
    private dialogData = inject(DIALOG_DATA, {optional: true});
    private plan = inject(PlanService);
    private fb = inject(FormBuilder);
    private param = inject(GlobalVariables);

    ngOnInit(): void {
        // If dialog data is provided, use it to set the loading property
        if (this.dialogData) {
            if (this.dialogData.content !== undefined) {
                this.data = this.dialogData.content;
            }
        }

        this.form = this.fb.group({
            matricule: ['', [Validators.required]],
            socialSecurityNumber: ['', [Validators.required]]
        });

    }

    submit() {
        if (this.form.valid) {
            /*this.plan.confirmSubscription(this.param.id, this.planRequest).subscribe({
                next: response => {
                    console.log(response)
                },
                error: err => {
                    console.error(err)
                },
                complete: () => {
                    console.info('The plan was confirmed')
                }
            });*/
            this.closeModal(true);
        } else {
            console.log("Error!!! Form is not valid")
        }
    }

    protected closeModal(response?: boolean) {
        this.dialogRef?.close(response);
    }

    get planRequest(): PlanRequest {
        return {
            plan: this.data.plan,
            montant: this.data.montant,
            plafond: this.data.plafond,
            novemberAmount: this.data.novemberAmount,
            decemberAmount: this.data.decemberAmount,

            matricule: this.matricule?.value,
            socialSecurityNumber: this.socialSecurityNumber?.value
        }
    }

    get matricule() {
        return this.form.get('matricule');
    }
    get socialSecurityNumber() {
        return this.form.get('socialSecurityNumber');
    }
}
