import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {QuizResponse} from "../../app/quizresponse";
import {QuizItem} from "../../app/quizitem";
import "rxjs/add/operator/map";
import {ENV} from '@app/env';
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {QuizMetadata} from "../../app/quizmetadata";


@Injectable()
export class QuizServiceProvider {
    apiBase: string = ENV.apiBase;

    constructor(
        public http: HttpClient,
        private sanitizer: DomSanitizer)
    {}

    saveResponse(quizResponse: QuizResponse): void {
        const url = this.apiBase + '/api/quiz-response';
        this.http
            .post(url, quizResponse)
            .subscribe(
                () => {
                },
                err => console.error(err.message)
            );
    }

    getQuiz(quizId: string): Observable<QuizItem[]> {
        const url = `${this.apiBase}/api/quiz/${quizId}`;
        return this.http.get<any[]>(url)
            .map(data => this.mapData(data))
    }

    mapData(data: any): QuizItem[] {
        const quizItems = data.map(item => {
            //Validate object. Discard if not all properties present
            if (!item.quizId || !item.question || !item.imageUrl || !item.alternative1 || !item.alternative2 || !item.alternative3
                || !item.answer || !item.date) {
                return {}
            }
            const imageUrl = item.imageUrl && !item.imageUrl.startsWith('http') ?  `${this.apiBase}/${item.imageUrl}` : item.imageUrl;
            return new QuizItem(item.quizItemId,
                item.quizId,
                item.question,
                this.sanitizer.bypassSecurityTrustStyle(`url(${imageUrl})`),
                item.alternative1,
                item.alternative2,
                item.alternative3,
                item.answer,
                new Date(item.date))
        });
        return quizItems.filter(item => item.quizId);
    }

    getQuizes(): Observable<QuizMetadata[]> {
        return this.http.get<QuizMetadata[]>(this.apiBase + "/api/quizes");
    }

}
