import {Component, ElementRef, Input} from '@angular/core';
import {AnimationBuilder, AnimationService} from "css-animator";
import {AnswerPage} from "../../pages/answer/answer";
import {ModalController, Platform} from "ionic-angular";
import {QuizItem} from "../../app/quizitem";
import {QuizServiceProvider} from "../../providers/quiz-service/quiz-service";
import {QuizResponse} from "../../app/quizresponse";
import {ENV} from '@app/env';

@Component({
    selector: 'voting-button',
    templateUrl: 'voting-button.html',
    providers: [QuizServiceProvider]
})
export class VotingButtonComponent {
    @Input() quizItem: QuizItem;
    @Input() answerIndex: number;

    private animator: AnimationBuilder;
    mode: string = ENV.mode;

    buttonClick() {
        this.animator
            .setType('rubberBand')
            .animate(this.elementRef.nativeElement)
            .then(() => this.processAnswer());
    }

    processAnswer() {
        const modal = this.modalCtrl.create(AnswerPage, {
            answer: this.quizItem.getAnswerText(this.answerIndex),
            truth: this.quizItem.getTruthText()
        });
        modal.present();
        const response = new QuizResponse(this.quizItem.id, this.answerIndex, this.quizItem.isTrue(this.answerIndex), this.mode, this.getPlatform());
        this.quizService.saveResponse(response)
    }

    getPlatform(): string {
        return this.platform.is("ios") ? "ios" : "web";
    }

    constructor(public animationService: AnimationService, private elementRef: ElementRef,
                public modalCtrl: ModalController, private quizService: QuizServiceProvider, private platform: Platform) {
        this.animator = animationService.builder();
        this.elementRef = elementRef;
    }

}
