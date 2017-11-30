import { Component } from '@angular/core';
import { QuizItem } from "../../app/quizitem";
import { HttpClient } from "@angular/common/http";
import { NavParams, NavController } from "ionic-angular";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  quizItem: QuizItem;
  nextQuizItemId: number;
  prevQuizItemId: number;

  goToPage(pageId: number) {
    this.navCtrl.setRoot(QuestionPage, {'quizItemId': pageId});
  }

  constructor(private http: HttpClient, private navParams: NavParams, private navCtrl: NavController) {
    this.http.get<any[]>("assets/quizdata_test.json")

      .subscribe(data => {
        const quizItemId =  this.navParams.get('quizItemId') || 0;
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
