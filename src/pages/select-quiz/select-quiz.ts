import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {QuizMetadata} from "../../app/quizmetadata";
import {QuestionPage} from "../question/question";
import {StorageProvider} from "../../providers/storage/storage";
import {AuthPage} from "../auth/auth";


@Component({
    selector: 'page-select-quiz',
    templateUrl: 'select-quiz.html',
    providers: []
})
export class SelectQuizPage {
    quizes: QuizMetadata[];
    errorMessage: string;

    constructor(public navCtrl: NavController,
                private quizService: QuizServiceProvider,
                private storageProvider: StorageProvider) {
        console.log("Select quiz");
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        this.storageProvider.getToken()
            .then(token => {
                if (token) {
                    this.quizService.setToken(token);
                    this.quizService.getQuizes()
                        .subscribe((quizes) => this.processQuizes(quizes),
                            (error) => {
                                if (error.status === 401) {
                                    this.navCtrl.push(AuthPage);
                                }
                                setTimeout(() => console.log('Error retrieving quizes: ' + JSON.stringify(error)), 3000);
                                this.errorMessage = "CoffeeQuiz cannot read data from the server.<br><br>Please check you Internet connection.";
                            });
                }
                else {
                    this.navCtrl.push(AuthPage);
                }
            })
    }

    processQuizes(quizes) {
        setTimeout(() => console.log('Quizes retrieved: ' + quizes), 3000);
        if (quizes && quizes.length === 1) {
            this.selectQuiz(quizes[0]);
        }
        else {
            this.errorMessage = "";
            this.quizes = quizes;
        }
    }

    selectQuiz(quizMetadata: QuizMetadata) {
        this.navCtrl.push(QuestionPage, {quizMetadata: quizMetadata});
    }

}
