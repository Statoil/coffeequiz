import { Component, ElementRef, Input } from '@angular/core';
import { AnimationService, AnimationBuilder } from "css-animator";
import { AnswerPage } from "../../pages/answer/answer";
import { NavController } from 'ionic-angular';

/**
 * Generated class for the VotingButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'voting-button',
  templateUrl: 'voting-button.html'
})
export class VotingButtonComponent {
  @Input() answer: string;

  private animator: AnimationBuilder;
  text: string;

  buttonClick(answer: any) {
    this.animator
      .setType('rubberBand')
      .animate(this.elementRef.nativeElement)
      .then(() => {
        this.navCtrl.push(AnswerPage, {answer});
      });
  }

  constructor(animationService: AnimationService, private elementRef: ElementRef,
              private navCtrl: NavController) {
    this.animator = animationService.builder();
    this.elementRef = elementRef;
    console.log('Hello VotingButtonComponent Component');
    this.text = 'Hello World';
  }

}
