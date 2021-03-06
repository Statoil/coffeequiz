import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizResponse } from "../../app/quizresponse";
import { QuizItem } from "../../app/quizitem";
import "rxjs/add/operator/map";
import { ENV } from '@app/env';
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";


@Injectable()
export class QuizServiceProvider {

    apiBase: string = ENV.apiUrl + "/api/v1.0/app";
    requestOptions: any = {};

    constructor(
        public http: HttpClient,
        private sanitizer: DomSanitizer) { }

    saveResponse(quizId: string, quizResponse: QuizResponse): Observable<any> {
        const url = `${this.apiBase}/quiz/${quizId}/response`;
        return this.http
            .post(url, quizResponse, this.requestOptions);
    }

    getQuiz(quizId: string): Observable<QuizItem[]> {
        const url = `${this.apiBase}/quiz/${quizId}/items`;
        return this.http.get<any[]>(url, this.requestOptions)
            .map(data => this.mapData(data))
    }

    mapData(data: any): QuizItem[] {
        const quizItems = data.map(item => {
            //Validate object. Discard if not all properties present
            if (!item.quizId || !item.question || !item.imageUrl || !item.alternative1 || !item.alternative2 || !item.alternative3
                || !item.answer || !item.date) {
                return {}
            }
            let imageUrl = "";
            if (!item.imageUrl || typeof item.imageUrl !== "string") {
                console.error(`Quiz item id ${item.quizId} is missing image URL!`);
            }
            else {
                imageUrl = !item.imageUrl.startsWith('http') ? `${ENV.apiUrl}/${item.imageUrl}` : item.imageUrl;
            }
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

    getQuizes(): Observable<any[]> {
        const url = this.apiBase + "/quiz/notcompleted";
        setTimeout(() => console.log('Retrieving all (non completed) quizes from: ' + url), 3000);
        return this.http.get<any[]>(url, this.requestOptions)
            .map(quizMetadataList => this.filterQuizes(quizMetadataList))

    }

    filterQuizes(quizMetadataList): any[] {
        return quizMetadataList.filter(quizMetadata => Number(quizMetadata.numberOfItems) > 0)
    }

    setToken(token: string) {
        this.requestOptions = { headers: new HttpHeaders().set('X-COFFEEQUIZ-TOKEN', token) };
    }

}
