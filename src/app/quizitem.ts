import {SafeUrl} from "@angular/platform-browser";

export class QuizItem {

    constructor(
        public id: number,
        public question: string,
        public imageUrl: SafeUrl,
        public alternative1: string,
        public alternative2: string,
        public alternative3: string,
        public answer: number,
        public startTime: Date)
    {
        if (answer < 1 || answer > 3) {
            throw new Error("Illegal value for answer: " + this.answer);
        }
    }

    getAnswerText(answerIndex) {
        return this['alternative' + answerIndex];
    }

    getTruthText(): string {
        return this['alternative' + this.answer];
    }

    isTrue(alternativeIndex: number) {
        return this.answer === alternativeIndex;
    }
}
