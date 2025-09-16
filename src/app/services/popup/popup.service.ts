import {inject, Injectable} from '@angular/core';
import {Dialog, DialogConfig, DialogRef} from "@angular/cdk/dialog";
import {ComponentType} from "@angular/cdk/portal";

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    private dialog = inject(Dialog);

    showAsComponent(message: string) {
        throw new Error('Method not implemented.');
    }

    showAsPopup(component: ComponentType<any>, dialogConfig: DialogConfig<any, DialogRef<any, any>>): DialogRef<any, any> {
        return this.dialog.open(component, dialogConfig);
    }

    showAsElement(message: string) {
        throw new Error('Method not implemented.');
    }
}
