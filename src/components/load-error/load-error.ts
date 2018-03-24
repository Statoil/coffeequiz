import {Component, Input} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {LoadErrorPopoverComponent} from "../load-error-popover/load-error-popover";


@Component({
    selector: 'load-error',
    templateUrl: 'load-error.html'
})
export class LoadErrorComponent {
    @Input() errorMessage: string;

    constructor(public popoverCtrl: PopoverController) {}

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(LoadErrorPopoverComponent, {errorMessage: this.errorMessage});
        popover.present({
            ev: myEvent
        });
    }

}


