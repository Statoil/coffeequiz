import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {QuizResponse} from "../../app/quizresponse";
import {QuizItem} from "../../app/quizitem";
import "rxjs/add/operator/map";
import {ENV} from '@app/env';
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {catchError, map} from "rxjs/operators";
import {QuizMetadata} from "../../app/quizmetadata";


@Injectable()
export class QuizServiceProvider {
    apiBase: string = ENV.apiBase;
    isUsingLocalFallback: boolean = false;

    constructor(public http: HttpClient, private sanitizer: DomSanitizer) {
    }

    saveResponse(quizResponse: QuizResponse): void {
        const url = this.apiBase + '/api/response';
        this.http
            .post(url, quizResponse)
            .subscribe(
                () => {
                },
                err => console.error(err.message)
            );
    }


    getQuiz(quizId: string): Observable<QuizItem[]> {
        const url = `${this.apiBase}/api/app-quiz/${quizId}`;
        return this.http.get<any[]>(url)
            .pipe(
                map(data => this.mapData(data)),
                catchError(error => {
                    console.error("Error getting quiz: " + error.message);
                    return [];
                })
            )

    }


    mapData(data: any): QuizItem[] {
        return data.map(item => new QuizItem(item.quizItemId,
                item.question,
                this.sanitizer.bypassSecurityTrustStyle(`url(${this.apiBase}/api/quiz/image/${item.imageId})`),
                item.alternative1,
                item.alternative2,
                item.alternative3,
                item.answer,
                new Date(item.startTime)));
    }


    getQuizes(): Observable<QuizMetadata[]> {
        return this.http.get<QuizMetadata[]>("http://localhost:3000/api/quizes")
            .pipe(
                catchError(error => {
                    console.error(error);
                    return []
                })
            )
    }

    getNewQuizData(quizId: string): Observable<QuizItem[]> {
        const url = this.apiBase + '/api/app-quiz/' + quizId;
        return this.http.get<any[]>(url)
            .pipe(
                catchError(error => {
                    console.error("Error getting quizdata: " + error.message);
                    return [];
                })
            )
    }

}
