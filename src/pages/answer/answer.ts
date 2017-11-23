import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Alternative } from "../../app/alternative";

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

  answer: Alternative;
  truth: Alternative;
  isCorrect: boolean;
  seconds: number = 3;
  messageHtml: string;

  countDown: number = setInterval(() => {
    this.seconds--;
    if (this.seconds <= 0) {
      clearInterval(this.countDown);
      this.viewCtrl.dismiss();
    }
  }, 1000);

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
    this.answer = navParams.get('answer');
    this.truth = navParams.get('truth');
    this.isCorrect = this.answer == this.truth;
    if (this.isCorrect) {
      this.messageHtml = `${this.answer.text} is correct!`;
    }
    else {
      this.messageHtml = `Unfortunately,<br><strong>${this.answer.text}</strong><br>is not correct.<br><br>The correct answer is<br><u>${this.truth.text}</u>`;
    }
  }

}
