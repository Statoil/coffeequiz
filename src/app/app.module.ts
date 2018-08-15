import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {QuestionPage} from "../pages/question/question";
import {AnswerPage} from "../pages/answer/answer";

import {AnimationService} from "css-animator";
import {VotingButtonComponent} from "../components/voting-button/voting-button";
import {HttpClientModule} from "@angular/common/http";
import {QuizServiceProvider} from '../providers/quiz-service/quiz-service';
import {SelectQuizPage} from "../pages/select-quiz/select-quiz";
import {LoadErrorComponent} from "../components/load-error/load-error";
import {LoadErrorPopoverComponent} from "../components/load-error-popover/load-error-popover";
import {NativeAudio} from "@ionic-native/native-audio";
import {Insomnia} from "@ionic-native/insomnia";
import {StorageProvider} from '../providers/storage/storage';
import {IonicStorageModule} from '@ionic/storage';
import {AuthPage} from "../pages/auth/auth";

@NgModule({
    declarations: [
        MyApp,
        QuestionPage,
        AnswerPage,
        SelectQuizPage,
        AuthPage,
        VotingButtonComponent,
        LoadErrorComponent,
        LoadErrorPopoverComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {}),
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        QuestionPage,
        AnswerPage,
        SelectQuizPage,
        AuthPage,
        LoadErrorPopoverComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AnimationService,
        QuizServiceProvider,
        NativeAudio,
        Insomnia,
        StorageProvider
    ]
})
export class AppModule {
}
