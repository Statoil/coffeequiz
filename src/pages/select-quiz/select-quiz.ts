import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {QuizMetadata} from "../../app/quizmetadata";
import {QuestionPage} from "../question/question";
import {ENV} from '@app/env';


@Component({
    selector: 'page-select-quiz',
    templateUrl: 'select-quiz.html',
})
export class SelectQuizPage {
    quizes: QuizMetadata[];
    browseMode: boolean;
    mode: string = ENV.mode;
    errorMessage: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private quizService: QuizServiceProvider) {
        console.log("Select quiz");
        this.browseMode = this.navParams.get('browseMode') === "true" || this.mode === "dev";
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        this.quizService.getQuizes()
            .subscribe(
                (quizes) => {
                    setTimeout(() => console.log('Quizes retrieved: ' + quizes), 3000);
                    if (quizes && quizes.length === 1) {
                        this.selectQuiz(quizes[0]);
                    }
                    else {
                        this.errorMessage = "";
                        this.quizes = quizes;
                    }
                },
                (error) => {
                    setTimeout(() => console.log('Error retrieving quizes: ' + JSON.stringify(error)), 3000);
                    this.errorMessage = "CoffeeQuiz cannot read data from the server.<br><br>Please check you Internet connection.";
                });
    }

    selectQuiz(quizMetadata: QuizMetadata) {
        this.navCtrl.push(QuestionPage, {quizMetadata: quizMetadata, browseMode: this.browseMode});
    }

}
