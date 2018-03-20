import {Component, ViewChild} from '@angular/core';
import {QuizItem} from "../../app/quizitem";
import {NavParams,} from "ionic-angular";
import * as _ from "lodash";
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {ENV} from '@app/env';
import {AnimationBuilder, AnimationService} from "css-animator";

@Component({
    selector: 'page-question',
    templateUrl: 'question.html',
})
export class QuestionPage {
    @ViewChild('question') questionElement;
    @ViewChild('imageview') imageViewElement;

    quizItem: QuizItem;
    quizData: QuizItem[];
    quizItemIndex: number;
    nextQuizItemId: number;
    prevQuizItemId: number;
    browseMode: boolean;
    reloadIntervalId: any;
    questionAnimIntervalId: any;
    imageAnimIntervalId: any;
    mode: string = ENV.mode;
    pollInterval: number = 120;
    downloadError: boolean = false;
    private animator: AnimationBuilder;

    goToPage(quizItemId: number) {
        this.quizItemIndex = Math.max(0, Math.min(quizItemId, this.quizData.length));
        this.quizItem = this.quizData[this.quizItemIndex];
        this.updateNavIndexes();
    }

    constructor(
        private navParams: NavParams,
        private quizService: QuizServiceProvider,
        animationService: AnimationService)
    {
        this.animator = animationService.builder();
    }

    loadData(): void {
        const quizMetadata = this.navParams.get('quizMetadata');
        this.browseMode = this.navParams.get('browseMode');
        if (!quizMetadata) {
            return;
        }
        this.quizService.getQuiz(quizMetadata.id)
            .subscribe(
                (quizData) => {
                    if (!quizData || quizData.length === 0) {
                        return;
                    }
                    this.downloadError = false;
                    this.quizData = quizData;
                    this.quizItemIndex = QuestionPage.findQuizItemIndexByDate(quizData);
                    this.quizItem = this.quizData[this.quizItemIndex];
                    if (this.browseMode) {
                        this.updateNavIndexes();
                    }
                },
                (error) => {
                    console.log(error);
                    this.downloadError = true;
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
            this.reloadIntervalId = setInterval(() => this.loadData(), this.pollInterval * 1000);
        }
        else {
            console.log("Browse mode. Not polling server.");
        }
        this.loadData();
        setTimeout(() => {
            this.questionAnimIntervalId = setInterval(() => this.animateQuestion(),20000);
        }, 5000);
        this.imageAnimIntervalId    = setInterval(() => this.animateImage(),60000);

    }

    animateQuestion() {
        const rowElement = this.questionElement.nativeElement.parentNode;
        const parentHeight = rowElement.offsetHeight;
        const prevStyleHeight = rowElement.style.height;
        rowElement.style.height = (parentHeight - 1) + 'px';
        this.animator
            .setOptions({
                type: 'rubberBand',
                reject: false,
                fixed: false
            })
            .animate(this.questionElement.nativeElement)
            .then(() => {
                rowElement.style.height = prevStyleHeight;
            });
    }

    animateImage() {
        this.animator
            .setOptions({
                type: 'flash',
                reject: false,
                fixed: false
            })
            .animate(this.imageViewElement.nativeElement)
    }

    // noinspection JSUnusedGlobalSymbols
    ngOnDestroy() {
        if (this.reloadIntervalId) {
            clearInterval(this.reloadIntervalId);
        }
        if (this.questionAnimIntervalId) {
            clearInterval(this.questionAnimIntervalId);
        }
        if (this.imageAnimIntervalId) {
            clearInterval(this.imageAnimIntervalId);
        }
    }
}
