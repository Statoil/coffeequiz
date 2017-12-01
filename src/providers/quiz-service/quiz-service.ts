import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from "../../app/response";
import {QuizItem} from "../../app/quizitem";
import "rxjs/add/operator/map";


@Injectable()
export class QuizServiceProvider {

  constructor(public http: HttpClient) {
  }

  saveResponse(response: Response):void {
    this.http
      .post('/api/response', response)
      .subscribe(
        () => {},
        err => console.error(err.message)
      );
  }

  getQuizData() {
    return this.http.get<any[]>("assets/quizdata_test.json")
      .map(data => data.map(item => new QuizItem(item.id,
            item.question,
            "assets/imgs/quiz/" + item.image,
            item.alternatives,
            item.answer,
            new Date(item.startTime))));
  }

}
