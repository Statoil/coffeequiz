import { Component, ElementRef, Input } from '@angular/core';
import { AnimationService, AnimationBuilder } from "css-animator";
import { AnswerPage } from "../../pages/answer/answer";
import { ModalController } from "ionic-angular";
import { QuizItem} from "../../app/quizitem";
import { QuizServiceProvider } from "../../providers/quiz-service/quiz-service";
import { QuizResponse } from "../../app/quizresponse";
import { ENV } from '@app/env';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'voting-button',
  templateUrl: 'voting-button.html',
  providers: [QuizServiceProvider]
})
export class VotingButtonComponent {
  @Input() quizItem: QuizItem;
  @Input() answerIndex: number;

  private animator: AnimationBuilder;
  text: string;
  mode: string = ENV.mode;

  buttonClick() {
    this.animator
      .setType('rubberBand')
      .animate(this.elementRef.nativeElement)
      .then(() => this.processAnswer());
  }

  processAnswer() {
    const modal = this.modalCtrl.create(AnswerPage, {answer: this.quizItem.getAnswer(this.answerIndex), truth: this.quizItem.getTruth()});
    modal.present();
    const response = new QuizResponse(this.quizItem.id, this.answerIndex, this.quizItem.isTrue(this.answerIndex), this.mode, this.getPlatform());
    this.quizService.saveResponse(response)
  }

  getPlatform(): string {
    return this.platform.is("ios") ? "ios": "web";
  }

  constructor(public animationService: AnimationService, private elementRef: ElementRef,
              public modalCtrl: ModalController, private quizService: QuizServiceProvider, private platform: Platform) {
    this.animator = animationService.builder();
    this.elementRef = elementRef;
  }

  // noinspection JSUnusedGlobalSymbols
  ngOnInit() {
    this.text = this.quizItem.getAnswer(this.answerIndex);
  }

}
