import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";
import * as _ from "lodash";


@Component({
    selector: 'load-error-popover',
    templateUrl: 'load-error-popover.html'
})
export class LoadErrorPopoverComponent {

    text: string;

    constructor(public viewCtrl: ViewController) {
        console.log('Hello LoadErrorPopoverComponent Component');
        this.text = 'Hello World';
        _.delay(() => viewCtrl.dismiss(), 50000);
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

