import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { QuestionPage } from "../pages/question/question";
import { AnswerPage } from "../pages/answer/answer";

import { AnimationService, AnimatesDirective } from "css-animator";

@NgModule({
  declarations: [
    MyApp,
    QuestionPage,
    AnswerPage,
    AnimatesDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuestionPage,
    AnswerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AnimationService
  ]
})
export class AppModule {}
