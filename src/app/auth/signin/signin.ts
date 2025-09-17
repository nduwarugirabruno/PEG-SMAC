import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {PopupService} from '../../services/popup/popup.service';
import {MessagePopup} from '../../core/popups/message-popup/message-popup';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {GlobalVariables} from '../../shared/global.variables';
import {Role} from '../../shared/app.enums';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-signin-component',
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput
    ],
    templateUrl: './signin.html',
    styleUrl: './signin.scss'
})
export class SigninComponent implements OnInit {

    form!: FormGroup;
    notFound!: boolean;

    private dialogContents = [
        {
            title: "Récupération de mot de passe",
            body: "Un email contenant les instructions pour réinitialiser votre mot de passe a été envoyé à l\'adresse associée à votre compte. Veuillez consulter votre messagerie."
        }, {
            title: "Aide à la connexion",
            body: "Si vous rencontrez des difficultés pour vous connecter, veuillez contacter le support technique au 0 800 123 456 ou par email à support.epargne@entreprise.com."
        }, {
            title: "Champs requis",
            body: "Veuillez renseigner tous les champs pour continuer."
        }
    ]

    private fb = inject(FormBuilder);
    private cd = inject(ChangeDetectorRef);
    private popup = inject(PopupService);
    private param = inject(GlobalVariables);
    private user = inject(UserService);
    private auth = inject(AuthService);
    private router = inject(Router);

    get nom() {
        return this.form.get('nom');
    }

    get prenom() {
        return this.form.get('prenom');
    }

    get matricule() {
        return this.form.get('matricule');
    }

    get password() {
        return this.form.get('password');
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            nom: ['', [Validators.required]],
            prenom: ['', [Validators.required]],
            matricule: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.notFound = false;

        this.nom?.valueChanges.subscribe({
            next: value => this.notFound = false,
            error: err => console.error('error: ', err)
        });
        this.prenom?.valueChanges.subscribe({
            next: value => this.notFound = false,
            error: err => console.error('error: ', err)
        });
        this.matricule?.valueChanges.subscribe({
            next: value => this.notFound = false,
            error: err => console.error('error: ', err)
        });
        this.password?.valueChanges.subscribe({
            next: value => this.notFound = false,
            error: err => console.error('error: ', err)
        });
    }

    submit() {
        if (this.form.invalid) {
            this.openModal(2);
        } else {
            console.log(this.form.value);
            this.auth.authenticate(this.form.value).subscribe({
                next: response => {
                    this.param.token = response.token
                    this.getUserDetails()
                },
                error: err => {
                    console.error(err);
                    if (err.status === 404) {
                        this.notFound = true;
                        this.userNotFoundValidator(this.form);
                    }
                },
                complete: () => {
                    console.info('The authentication was completed');
                }
            });
            this.router.navigateByUrl('plans').then(r => console.log(r))
        }
    }

    userNotFoundValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const login = formGroup.get('login')?.value;

        if (this.notFound) {
            console.log("Error!!! Not found");
            formGroup
                .get('password')
                ?.setErrors({'invalidPassword': true});
        } else {
            // formGroup.get('password')?.setErrors(null);
        }
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

    getUserDetails() {
        this.param.user = {
            nom: this.nom?.value,
            prenom: this.prenom?.value,
            matricule: this.matricule?.value,
            password: this.password?.value,
            role: Role.ADMIN
        }
        /*this.user.getById(this.param.id).subscribe({
            next: response => {
                this.param.user = response.data
                this.cd.detectChanges();
            },
            error: err => console.error(err),
            complete: () => console.info('The user was retrieved')
        });*/
    }
}
