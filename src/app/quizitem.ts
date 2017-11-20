export class QuizItem {
  question: string;
  img: string;
  alternatives: string[];
  truthIndex: number;

  getTruth():string {
    return this.alternatives[this.truthIndex];
  }
}
