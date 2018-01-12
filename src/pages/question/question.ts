import {Component} from '@angular/core';
import {QuizItem} from "../../app/quizitem";
import {NavParams,} from "ionic-angular";
import * as _ from "lodash";
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {ENV} from '@app/env';

@Component({
    selector: 'page-question',
    templateUrl: 'question.html',
})
export class QuestionPage {
    quizItem: QuizItem;
    quizData: QuizItem[];
    quizItemIndex: number;
    nextQuizItemId: number;
    prevQuizItemId: number;
    browseMode: boolean;
    intervalId: any;
    mode: string = ENV.mode;
    pollInterval: number = 120;

    goToPage(quizItemId: number) {
        this.quizItemIndex = Math.max(0, Math.min(quizItemId, this.quizData.length));
        this.quizItem = this.quizData[this.quizItemIndex];
        this.updateNavIndexes();
    }

    constructor(private navParams: NavParams, private quizService: QuizServiceProvider) {
        //this.browseMode = this.navParams.get('browseMode') === "true";
        this.browseMode = true;
    }

    loadData(): void {
        const quizMetadata = this.navParams.get('quizMetadata');
        if (!quizMetadata) {
            return;
        }
        this.quizService.getQuiz(quizMetadata.id)
            .subscribe(quizData => {
                if (!quizData || quizData.length === 0) {
                    return;
                }
                this.quizData = quizData;
                this.quizItemIndex = QuestionPage.findQuizItemIndexByDate(quizData);
                this.quizItem = this.quizData[this.quizItemIndex];
                if (this.browseMode) {
                    this.updateNavIndexes();
                }
            });
    }

    updateNavIndexes(): void {
        this.prevQuizItemId = this.quizItemIndex > 0 ? this.quizItemIndex - 1 : undefined;
        this.nextQuizItemId = this.quizItemIndex < (this.quizData.length - 1) ? this.quizItemIndex + 1 : undefined;
    }

    static findQuizItemIndexByDate(quizData: QuizItem[]): number {
        const possibleIndex = _.sortedIndex(quizData.map(quizItem => quizItem.startTime), new Date()) - 1;
        return Math.max(0, possibleIndex);
    }

    // noinspection JSUnusedGlobalSymbols
    ngOnInit() {
        if (!this.browseMode) {
            console.log(`Server poll interval: ${this.pollInterval} seconds`);
            this.intervalId = setInterval(() => this.loadData(), this.pollInterval * 1000);
        }
        else {
            console.log("Browse mode. Not polling server.");
        }
        this.loadData();
    }

    // noinspection JSUnusedGlobalSymbols
    ngOnDestroy() {
        if (this.intervalId) {
            clearTimeout(this.intervalId);
        }
    }
}
