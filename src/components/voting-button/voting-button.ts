import { Component, ElementRef, Input } from '@angular/core';
import { AnimationService, AnimationBuilder } from "css-animator";
import { AnswerPage } from "../../pages/answer/answer";
import { ModalController } from "ionic-angular";

@Component({
  selector: 'voting-button',
  templateUrl: 'voting-button.html'
})
export class VotingButtonComponent {
  @Input() answer: string;
  @Input() truth: string;

  private animator: AnimationBuilder;
  text: string;

  buttonClick() {
    console.log(this.answer);
    this.animator
      .setType('rubberBand')
      .animate(this.elementRef.nativeElement)
      .then(() => {
        const modal = this.modalCtrl.create(AnswerPage, {answer: this.answer, truth: this.truth});
        modal.present();
      });
  }

  constructor(animationService: AnimationService, private elementRef: ElementRef,
              public modalCtrl: ModalController) {
    this.animator = animationService.builder();
    this.elementRef = elementRef;
    console.log('Hello VotingButtonComponent Component');
    this.text = 'Hello World';
  }

}
