import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from "../question/question";

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

  selectedItem: any;
  seconds: number = 3;

  countDown: number = setInterval(() => {
    this.seconds--;
    if (this.seconds <= 0) {
      clearInterval(this.countDown);
      this.navCtrl.push(QuestionPage);
    }
  }, 1000);

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('answer');


  }



}
