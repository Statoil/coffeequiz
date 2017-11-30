import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from "../../app/response";


@Injectable()
export class QuizServiceProvider {

  constructor(public http: HttpClient) {
  }

  saveResponse(response: Response):void {
    this.http
      .post('/api/response', response)
      .subscribe(
        data => {},
        err => console.error(err.message)
      );
  }

}
