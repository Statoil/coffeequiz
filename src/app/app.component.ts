import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SelectQuizPage} from "../pages/select-quiz/select-quiz";
import {NativeAudio} from "@ionic-native/native-audio";

import { Insomnia } from '@ionic-native/insomnia';

import { QuizServiceProvider } from "../providers/quiz-service/quiz-service";

@Component({
    templateUrl: 'app.html',
    providers: [QuizServiceProvider]
})
export class MyApp {
    rootPage: any = SelectQuizPage;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private nativeAudio: NativeAudio,
        private insomnia: Insomnia)
    {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.overlaysWebView(true);

            this.nativeAudio.preloadSimple("correct", 'assets/sounds/correct-answer.mp3')
                .then(() => this.nativeAudio.preloadSimple("incorrect", 'assets/sounds/wrong-answer.mp3'))
                .catch((error) => console.error(error));

            statusBar.hide();
            setTimeout(function () {
                splashScreen.hide();
            }, 5000);

            this.insomnia.keepAwake()
                .then(
                    () => console.log('Insomnia loaded successfully'),
                    () => console.log('Insomnia did not load')
                );
        });
    }
}

