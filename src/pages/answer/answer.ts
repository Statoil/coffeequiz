import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

  answer: string;
  truth: string;
  isCorrect: boolean;
  seconds: number = 3;

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
    this.isCorrect = this.answer === this.truth;
  }

}
