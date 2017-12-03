import { Component } from '@angular/core';
import { QuizItem } from "../../app/quizitem";
import { NavParams, } from "ionic-angular";
import * as _ from "lodash";
import { QuizServiceProvider } from "../../providers/quiz-service/quiz-service";
import { ENV } from '@app/env';

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

  goToPage(quizItemId: number) {
    this.quizItemIndex = Math.max(0, Math.min(quizItemId, this.quizData.length));
    this.quizItem = this.quizData[this.quizItemIndex];
    this.updateNavIndexes();
  }

  constructor(private navParams: NavParams, private quizService: QuizServiceProvider) {
    this.browseMode = this.navParams.get('browseMode') === "true";
    this.loadData();
  }

  loadData(): void {
    this.quizService.getQuizData()
      .then(quizData => {
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
      this.intervalId = setInterval(() => this.loadData(), 60000);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  ngOnDestroy() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }
}
