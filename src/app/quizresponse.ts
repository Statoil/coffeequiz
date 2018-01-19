export class QuizResponse {
    // noinspection JSUnusedGlobalSymbols
    constructor(public quizItemId: number, public answerIndex: number, public isCorrect: boolean, public mode: string, public platform: string) {

    }
}
