import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
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
                private file: File,
                private platform: Platform) {
        console.log("Select quiz");
        this.browseMode = this.navParams.get('browseMode') === "true";
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        console.log('loading select-quiz');
        this.quizService.getQuizes()
            .subscribe(quizes => this.quizes = quizes);

    }

    selectQuiz(quizMetadata: QuizMetadata) {
        console.log("downloading quiz with id: " + quizMetadata.id);
        this.quizService.getNewQuizData(quizMetadata.id)
            .subscribe(quizData => {
                console.log(quizData);
                this.downLoadQuiz(quizData)
                    .then(() => this.navCtrl.push(QuestionPage, {quizMetadata: quizMetadata, browseMode: this.browseMode}))
            });

    }

    downLoadQuiz(quizData) {
        if (!this.isIOSApp()) {
            return Promise.resolve();
        }
        return this.createQuizDir()
            .then(() => {
                console.log("Creating file " + this.quizFileName);
                this.file.createFile(this.file.dataDirectory, this.quizFileName, true)
                    .then(fileEntry => {
                        console.log("Writing data to file " + this.quizFileName);
                        return fileEntry.createWriter(file => file.write(quizData), error => console.log(error));
                    })
            })
    }

    createQuizDir() {
        console.log(`Checking if dir ${this.quizDirectoryName} exists`);
        return this.file.checkDir(this.file.dataDirectory, this.quizDirectoryName)
            .then(() => console.log('Directory exists'))
            .catch(() => {
                console.log(`Creating dir ${this.quizDirectoryName}`);
                return this.file.createDir(this.file.dataDirectory, this.quizDirectoryName, false)
            });
    }

    isIOSApp(): boolean {
        return this.platform.is("ios") && !this.platform.is("mobileweb");
    }

}
