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
    loadError: boolean = false;

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
                    if (quizes && quizes.length === 1) {
                        this.selectQuiz(quizes[0]);
                    }
                    else {
                        this.loadError = false;
                        this.quizes = quizes;
                    }
                },
                (error) => {
                    console.log(error);
                    this.loadError = true;
                });
    }

    selectQuiz(quizMetadata: QuizMetadata) {
        this.navCtrl.push(QuestionPage, {quizMetadata: quizMetadata, browseMode: this.browseMode});
    }

}
