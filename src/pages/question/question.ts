import { Component } from '@angular/core';
import { QuizItem } from "../../app/quizitem";
import { HttpClient } from "@angular/common/http";
import { NavParams, NavController } from "ionic-angular";
import * as _ from "lodash";

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

  constructor(private http: HttpClient, private navParams: NavParams, private navCtrl: NavController) {
    this.browseMode = this.navParams.get('browseMode') === 'true' || this.navParams.get('browseMode') === true;
    const possibleQuizItemId = _.toNumber(this.navParams.get('quizItemId'));
    const quizItemId =  _.isInteger(possibleQuizItemId) ?  possibleQuizItemId : 0;
    this.http.get<any[]>("assets/quizdata_test.json")

      .subscribe(data => {
        const quizData = data.map(item => new QuizItem(item.id,
          item.question,
          "assets/imgs/quiz/" + item.image,
          item.alternatives,
          item.answer,
          new Date(item.startTime)));
        this.prevQuizItemId = quizItemId > 0 ? quizItemId - 1 : undefined;
        this.nextQuizItemId = quizItemId < (quizData.length - 1) ? quizItemId + 1 : undefined;
        this.quizItem = quizData[quizItemId];
      });
  }

}
