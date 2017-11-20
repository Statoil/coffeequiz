import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnswerPage } from "../answer/answer";
import { delay } from 'lodash';
import { QuizItem } from "../../app/quizitem";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  quizItem: QuizItem = new QuizItem();

  constructor(public navCtrl: NavController) {
    this.quizItem.question = "Which of these Statoil-countries exports the most coffee on a yearly basis?<br>\n" +
      "(i.e we can have a little Subsidiary in that country called Statcaff or CoffOil)";
    this.quizItem.alternatives = ["Colombia", "Brazil", "Indonesia"];
    this.quizItem.truthIndex = 1;
    this.quizItem.img = "q1b.png";
  }

  answerSelected(answer) {
    delay((answer) =>
        this.navCtrl.push(AnswerPage, {answer}),
      900, answer);
  }

}
