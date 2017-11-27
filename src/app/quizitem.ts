export class QuizItem {
  truth: string;
  constructor(public question: string, public imageSrc: string, public alternatives: string[], public truthIndex: number) {
    this.truth = this.alternatives[this.truthIndex];
  }
}
