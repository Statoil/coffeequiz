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
    private displayValue: any;
    private clickAnimationOngoing: boolean;
    private animationIntervalId: any;
    private animations = [
            {name: "bounce", hideAfter: false},
            {name: "rubberBand", hideAfter: false},
            {name: "zoomOut", hideAfter: true},
            {name: "rollOut", hideAfter: true},
            {name: "bounceOut", hideAfter: true},
            {name: "flip", hideAfter: false}
        ];
    mode: string = ENV.mode;

    constructor(
        public animationService: AnimationService,
        private elementRef: ElementRef,
        public modalCtrl: ModalController,
        private quizService: QuizServiceProvider,
        private platform: Platform)
    {
        this.animator = animationService.builder();
        this.elementRef = elementRef;
    }

    ngOnInit() {
        setTimeout(() => {
            this.animationIntervalId = setInterval(() => this.shakeButton(), 20000);
        }, 15000);
    }

    buttonClick() {
        this.displayValue = this.elementRef.nativeElement.style.display;
        const animation = this.getAnimation();
        this.clickAnimationOngoing = true;
        this.animator
            .setType(animation.name)
            .animate(this.elementRef.nativeElement)
            .then(() => {
                if (animation.hideAfter) {
                    this.elementRef.nativeElement.style.display = "none";
                }
                this.processAnswer();
            })
    }

    private getAnimation(): any {
        const index = Math.round(Math.random() * (this.animations.length - 1));
        return this.animations[index];
    }

    processAnswer() {
        const modal = this.modalCtrl.create(AnswerPage, {
            answer: this.quizItem.getAnswerText(this.answerIndex),
            truth: this.quizItem.getTruthText()
        });
        modal.present();
        modal.onDidDismiss(() => {
            this.elementRef.nativeElement.style.display = this.displayValue;
            this.clickAnimationOngoing = false;
        });
        const response = new QuizResponse(this.quizItem.id, this.quizItem.quizId, this.answerIndex, this.quizItem.isCorrect(this.answerIndex), this.mode, this.getPlatform());
        this.quizService.saveResponse(response);
    }

    getPlatform(): string {
        return this.platform.is("ios") ? "ios" : "web";
    }

    shakeButton(): void {
        if (this.clickAnimationOngoing) {
            return;
        }
        const rowElement = this.elementRef.nativeElement.parentNode;
        const parentHeight = rowElement.offsetHeight;
        const prevOffsetHeight = rowElement.style.height;
        rowElement.style.height = parentHeight + 'px';
        this.animator
            .setOptions({
                type: 'tada',
                reject: false
            })
            .animate(this.elementRef.nativeElement)
            .then(() => {
                rowElement.style.height = prevOffsetHeight;
            })
    }

    // noinspection JSUnusedGlobalSymbols
    ngOnDestroy() {
        if (this.animationIntervalId) {
            clearInterval(this.animationIntervalId);
        }
    }

}
