import {Component} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {LoadErrorPopoverComponent} from "../load-error-popover/load-error-popover";


@Component({
    selector: 'load-error',
    templateUrl: 'load-error.html'
})
export class LoadErrorComponent {
    text: string;

    constructor(public popoverCtrl: PopoverController) {}

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(LoadErrorPopoverComponent);
        popover.present({
            ev: myEvent
        });
    }

}


