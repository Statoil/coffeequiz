import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {SelectQuizPage} from "../select-quiz/select-quiz";
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
})
export class AuthPage {

    constructor(
        public navCtrl: NavController,
        private storageProvider: StorageProvider,
        private quizService: QuizServiceProvider) {
    }

    saveToken(token) {
        console.log("Token: " + token);
        this.storageProvider.setToken(token)
            .then(() => {
                this.quizService.setToken(token);
                this.navCtrl.push(SelectQuizPage);
            })
            .catch(error => {
                console.error(error);
            });
    }



}
