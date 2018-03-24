import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import * as _ from "lodash";


@Component({
    selector: 'load-error-popover',
    templateUrl: 'load-error-popover.html'
})
export class LoadErrorPopoverComponent {
    errorMessage: string;

    constructor(public viewCtrl: ViewController, private navParams: NavParams) {
        _.delay(() => viewCtrl.dismiss(), 50000);
    }

    close() {
        this.viewCtrl.dismiss();
    }

    ngOnInit() {
        this.errorMessage = this.navParams.get("errorMessage");
    }
}

