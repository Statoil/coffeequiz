export class QuizItem {
  constructor(public question: string, public imageSrc: string, public alternatives: string[], public truthIndex: number) {

  }

  getTruth():string {
    return this.alternatives[this.truthIndex];
  }
}
