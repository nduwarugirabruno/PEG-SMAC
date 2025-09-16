import {Component, inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-message-popup',
    imports: [
        MatIcon
    ],
    templateUrl: './message-popup.html',
    styleUrl: './message-popup.scss'
})
export class MessagePopup implements OnInit {

    @Input() message!: { icon?: string, title: string, body: string, btnMessage?: string};
    private dialogRef = inject(DialogRef, {optional: true});
    private dialogData = inject(DIALOG_DATA, {optional: true});

    ngOnInit(): void {
        // If dialog data is provided, use it to set the loading property
        if (this.dialogData) {
            if (this.dialogData.content !== undefined) {
                this.message = this.dialogData.content;
            }
        }
    }

    protected closeModal(response?: boolean) {
        this.dialogRef?.close(response);
    }
}
