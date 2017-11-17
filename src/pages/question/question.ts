import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnswerPage } from "../answer/answer";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  answerSelected(answer) {
    this.navCtrl.push(AnswerPage, {answer});
  }

}
