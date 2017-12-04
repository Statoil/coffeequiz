import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizResponse } from "../../app/quizresponse";
import { QuizItem } from "../../app/quizitem";
import "rxjs/add/operator/map";
import { ENV } from '@app/env';
import { DomSanitizer } from "@angular/platform-browser";
import * as _ from "lodash";


@Injectable()
export class QuizServiceProvider {
  apiBase: string = ENV.apiBase;
  isUsingLocalFallback: boolean = false;

  constructor(public http: HttpClient, private sanitizer: DomSanitizer) {
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

  getQuizData():Promise<QuizItem[]> {
    const url = this.apiBase + '/api/quizdata';
    const localFallback = 'assets/quizdata.json';
    return this.http.get<any[]>(url)
      .toPromise()
      .catch(() => {
        console.log(`Could not access remote url: ${url}. Using local fallback: ${localFallback}`);
        this.isUsingLocalFallback = true;
        return this.http.get<any[]>(localFallback).toPromise();
      })
      .then((data: any[]) => this.mapData(data))
      .catch(error => {
        console.error("Error getting quizdata: " + error.message);
        return [];
      });
  }

  mapData(data: any[]): QuizItem[] {
    const imageUrlBase = this.isUsingLocalFallback ? "" : this.apiBase + "/";
    const quizData = data.map(item => {
      const cssImageUrl = `url('${imageUrlBase}assets/imgs/quiz/${item.image}')`;
      return new QuizItem(item._id,
        item.question,
        this.sanitizer.bypassSecurityTrustStyle(cssImageUrl),
        item.alternatives,
        item.answer,
        new Date(item.startTime));
      });
      return _.sortBy(quizData, quizItem => quizItem.startTime);
  }

}
