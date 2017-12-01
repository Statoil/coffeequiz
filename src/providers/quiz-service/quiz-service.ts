import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizResponse } from "../../app/quizresponse";
import { QuizItem } from "../../app/quizitem";
import "rxjs/add/operator/map";
import { ENV } from '@app/env';


@Injectable()
export class QuizServiceProvider {
  apiBase: string = ENV.apiBase;

  constructor(public http: HttpClient) {
  }

  saveResponse(quizResponse: QuizResponse):void {
    const url = this.apiBase + '/api/response';
    this.http
      .post(url, quizResponse)
      .subscribe(
        () => {},
        err => console.error(err.message)
      );
  }

  getQuizData() {
    return this.http.get<any[]>("assets/quizdata.json")
      .map(data => data.map(item => new QuizItem(item.id,
            item.question,
            "assets/imgs/quiz/" + item.image,
            item.alternatives,
            item.answer,
            new Date(item.startTime))));
  }

}
