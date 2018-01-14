import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
    selector: 'page-answer',
    templateUrl: 'answer.html',
})
export class AnswerPage {

    answer: string;
    truth: string;
    isCorrect: boolean;
    seconds: number = 4;
    messageHtml: string;

    countDown: number = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
            clearInterval(this.countDown);
            this.viewCtrl.dismiss();
        }
    }, 1000);

    constructor(public navParams: NavParams, private viewCtrl: ViewController) {
        this.answer = navParams.get('answer');
        this.truth = navParams.get('truth');
        this.isCorrect = this.answer == this.truth;
        if (this.isCorrect) {
            this.messageHtml = `${this.answer} is correct!`;
            AnswerPage.playAudio('../../assets/sounds/correct-answer.mp3');
        }
        else {
            this.messageHtml = `The correct answer is<br><br><u>${this.truth}</u>`;
            AnswerPage.playAudio('../../assets/sounds/wrong-answer.mp3');
        }
    }

    private static playAudio(audioFileName: string): void {
        const audioWrong = new Audio();
        audioWrong.src = audioFileName;
        audioWrong.load();
        audioWrong.play();
    }

}
