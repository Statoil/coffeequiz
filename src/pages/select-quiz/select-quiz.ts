import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {QuizMetadata} from "../../app/quizmetadata";
import {File} from '@ionic-native/file';
import {QuestionPage} from "../question/question";
import {ENV} from '@app/env';


@Component({
    selector: 'page-select-quiz',
    templateUrl: 'select-quiz.html',
})
export class SelectQuizPage {

    quizDirectoryName = "quizData";
    quizFileName = "quizFile.json";
    quizes: QuizMetadata[];
    browseMode: boolean;
    mode: string = ENV.mode;

        constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private quizService: QuizServiceProvider,
                private file: File) {
        console.log("Select quiz");
        this.browseMode = this.navParams.get('browseMode') === "true";
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        this.quizService.getQuizes()
            .subscribe(quizes => this.quizes = quizes);
    }

    selectQuiz(quizMetadata: QuizMetadata) {
        this.navCtrl.push(QuestionPage, {quizMetadata: quizMetadata, browseMode: this.browseMode});
    }

    saveImage(imageId: string, quizImage: any) {
        this.file.createFile(this.file.dataDirectory, imageId, true)
            .then(fileEntry => {
                console.log("Writing data to file " + imageId);
                return fileEntry.createWriter(file => file.write(quizImage), error => console.log(error));
            })
    }

}
