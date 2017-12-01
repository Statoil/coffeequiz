import { Component } from '@angular/core';
import { QuizItem } from "../../app/quizitem";
import { NavParams, NavController } from "ionic-angular";
import * as _ from "lodash";
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  quizItem: QuizItem;
  nextQuizItemId: number;
  prevQuizItemId: number;
  browseMode: boolean;

  goToPage(pageId: number) {
    this.navCtrl.setRoot(QuestionPage, {'quizItemId': pageId, 'browseMode': this.browseMode});
  }

  constructor(private navParams: NavParams, private navCtrl: NavController, private quizService: QuizServiceProvider) {
    this.browseMode = this.navParams.get('browseMode') === 'true' || this.navParams.get('browseMode') === true;
    const possibleQuizItemId = _.toNumber(this.navParams.get('quizItemId'));
    const quizItemId =  _.isInteger(possibleQuizItemId) ?  possibleQuizItemId : null;
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
    return quizData[Math.max(0, possibleIndex)];
  }

}
