import {Component, inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';

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
    private dialogRef = inject(DialogRef, {optional: true});
    private dialogData = inject(DIALOG_DATA, {optional: true});
    private fb = inject(FormBuilder);
    form!: FormGroup;

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
            this.closeModal(true);
        } else {
            console.log("Error!!! Form is not valid")
        }
    }

    protected closeModal(response?: boolean) {
        this.dialogRef?.close(response);
    }
}
