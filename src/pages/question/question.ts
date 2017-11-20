import { Component } from '@angular/core';
import { QuizItem } from "../../app/quizitem";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  quizItem: QuizItem;
  quizData: QuizItem[];

  constructor(private http: HttpClient) {
    this.http.get<any[]>("assets/quizdata.json")
      .subscribe(data => {
        this.quizData = data.map(item => new QuizItem(item.question, "assets/imgs/" + item.image, item.alternatives, item.answer));
        this.quizItem = this.quizData[0];
      });
  }

}
