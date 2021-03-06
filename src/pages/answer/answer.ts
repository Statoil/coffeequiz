import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

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

    constructor(public navParams: NavParams, private viewCtrl: ViewController, private nativeAudio: NativeAudio) {
        this.answer = navParams.get('answer');
        this.truth = navParams.get('truth');
        this.isCorrect = this.answer == this.truth;
        if (this.isCorrect) {
            this.messageHtml = `${this.answer} is correct!`;
            this.nativeAudio.play("correct");
        }
        else {
            this.messageHtml = `The correct answer is<br><br><u>${this.truth}</u>`;
            this.nativeAudio.play("incorrect");
        }
    }

}
