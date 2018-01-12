import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SelectQuizPage} from "../pages/select-quiz/select-quiz";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = SelectQuizPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.overlaysWebView(true);
            statusBar.hide();
            setTimeout(function () {
                splashScreen.hide();
            }, 5000);
        });
    }
}

