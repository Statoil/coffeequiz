import { Component } from '@angular/core';
import { QuizItem } from "../../app/quizitem";
import { NavParams, NavController } from "ionic-angular";
import * as _ from "lodash";
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import { ENV } from '@app/env';

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  quizItem: QuizItem;
  nextQuizItemId: number;
  prevQuizItemId: number;
  browseMode: boolean;
  intervalId: any;
  envName: string;

  goToPage(pageId: number) {
    this.navCtrl.setRoot(QuestionPage, {'quizItemId': pageId});
  }

  constructor(private navParams: NavParams, private navCtrl: NavController, private quizService: QuizServiceProvider) {
    this.envName = ENV.mode;
    this.browseMode = _.isInteger(_.toNumber(this.navParams.get('quizItemId')));
    const quizItemId =  this.browseMode ?  _.toNumber(this.navParams.get('quizItemId')) : null;
    this.quizService.getQuizData()
      .subscribe(quizData => {
        this.prevQuizItemId = quizItemId > 0 ? quizItemId - 1 : undefined;
        this.nextQuizItemId = quizItemId < (quizData.length - 1) ? quizItemId + 1 : undefined;
        if (quizItemId === null) {
          this.quizItem = QuestionPage.selectQuizItemByDate(quizData);
        } else {
          this.quizItem = quizData[quizItemId];
        }
      });
  }

  static selectQuizItemByDate(quizData: QuizItem[]): QuizItem {
    const possibleIndex = _.sortedIndex(quizData.map(quizItem => quizItem.startTime), new Date()) - 1;
    let index = Math.max(0, possibleIndex);
    console.log("selected index: " + index);
    return quizData[index];
  }

  // noinspection JSUnusedGlobalSymbols
  ngOnInit() {
    if (!this.browseMode) {
      this.intervalId = setInterval(() => this.navCtrl.setRoot(QuestionPage), 60000);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  ngOnDestroy() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }
}
