import {SafeUrl} from "@angular/platform-browser";

export class QuizItem {
    truth: string;

    constructor(public id: number, public question: string, public imageSrc: SafeUrl, public alternatives: string[], public truthIndex: number, public startTime: Date) {
        this.truth = this.alternatives[this.truthIndex];
    }

    getTruth(): string {
        return this.alternatives[this.truthIndex];
    }

    getAnswer(answerIndex: number) {
        return this.alternatives[answerIndex];
    }

    isTrue(answerIndex: number) {
        return this.truthIndex === answerIndex;
    }
}
