import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {QuizMetadata} from "../../app/quizmetadata";
import {File} from '@ionic-native/file';
import {QuestionPage} from "../question/question";


@Component({
    selector: 'page-select-quiz',
    templateUrl: 'select-quiz.html',
})
export class SelectQuizPage {

    quizDirectory = "quizData";
    quizFileName = "quizFile.json";
    quizes: QuizMetadata[];
    browseMode: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private quizService: QuizServiceProvider,
                private file: File,
                private platform: Platform) {
        this.browseMode = this.navParams.get('browseMode') === "true";
    }

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
        if (this.isWeb()) {
            return Promise.resolve();
        }
        return this.createQuizDir()
            .then(() => {
                this.file.createFile(this.file.dataDirectory, this.quizFileName, true)
                    .then(fileEntry => {
                        fileEntry.createWriter(file => file.write(quizData), error => console.log(error))
                    })
            })
    }

    createQuizDir() {
        return this.file.checkDir(this.file.dataDirectory, this.quizDirectory)
            .then(_ => console.log('Directory exists'))
            .catch(() => this.file.createDir(this.file.dataDirectory, this.quizDirectory, false));
    }

    isWeb(): boolean {
        return !this.platform.is("ios");
    }

}
