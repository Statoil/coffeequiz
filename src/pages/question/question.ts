import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnswerPage } from "../answer/answer";
import { delay } from 'lodash';

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  answerSelected(answer) {
    delay((answer) =>
        this.navCtrl.push(AnswerPage, {answer}),
      900, answer);
  }

}
