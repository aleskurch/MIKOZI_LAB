import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {saveAs} from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  wordToCode = 'ФАЛЬСИФИКАЦИЯ';
  wordToCodeHill = 'ХУВСПЖЁБ';
  alphabet = [...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'];
  kryptonKey = [...'БЯЖЬНВЩГЗПКШЪДОМЁЙЦИЧУЫЮАЭЕТЛСХРФ'];
  hillMatrix = [[11, 7], [24, 26]];
  resultWord = [];
  resultWordHill = [];
  countOfLater = 33;

  constructor(private cd: ChangeDetectorRef, private spinner: NgxSpinnerService) {
  }

  onEncode(): void {
    this.spinner.show();
    setTimeout(() => {
      this.resultWord = [];
      [...this.wordToCode].forEach((char) => {
        const index = this.alphabet.findIndex(alphabetChar => char === alphabetChar);
        this.resultWord.push(this.kryptonKey[index]);
      });
      console.log(this.resultWord);
      const file = new File([this.resultWord.join('')], 'Report Task1.txt', {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(file);
      this.spinner.hide();
      this.cd.detectChanges();
    }, 2000);
  }

  onHillDecode(): void {
    this.spinner.show();
    setTimeout(() => {
      this.resultWordHill = [];
      const detHillMatrix = this.hillMatrix[0][0] * this.hillMatrix[1][1] - this.hillMatrix[0][1] * this.hillMatrix[1][0];
      let detHillMinusOne;
      for (let i = 1; i <= Infinity; i++) {
        if (detHillMatrix * i % this.countOfLater === 1) {
          detHillMinusOne = i;
          break;
        }
      }
      const hillMatrixMinusOne = [[this.mod(detHillMinusOne * this.hillMatrix[1][1], this.countOfLater),
        this.mod(-(detHillMinusOne * this.hillMatrix[0][1]), this.countOfLater)],
        [this.mod(-(detHillMinusOne * this.hillMatrix[1][0]), this.countOfLater),
          this.mod(detHillMinusOne * this.hillMatrix[0][0], this.countOfLater)]];
      console.log(hillMatrixMinusOne);
      const wordToCodeArray = [...this.wordToCodeHill];
      for (let i = 1; i < this.wordToCodeHill.length; i += 2) {
        const firstLater = this.alphabet.findIndex(char => char === wordToCodeArray[i - 1]);
        const secondLater = this.alphabet.findIndex(char => char === wordToCodeArray[i]);
        const firstDecodedLater = this.alphabet[this.mod(this.mod(hillMatrixMinusOne[0][0] * firstLater, this.countOfLater) +
          this.mod(hillMatrixMinusOne[1][0] * secondLater, this.countOfLater),
          this.countOfLater)];
        const secondDecodedLater = this.alphabet[this.mod(this.mod(hillMatrixMinusOne[0][1] * firstLater, this.countOfLater) +
          this.mod(hillMatrixMinusOne[1][1] * secondLater, this.countOfLater),
          this.countOfLater)];
        this.resultWordHill.push(firstDecodedLater);
        this.resultWordHill.push(secondDecodedLater);
      }
      const file = new File([this.resultWordHill.join('')], 'Report Task2.txt', {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(file);
      this.spinner.hide();
      this.cd.detectChanges();
    }, 2000);
  }

  mod(num: number, value: number): number {
    if (num < 0) {
      return value - this.mod(Math.abs(num), value);
    } else {
      if (num >= value) {
        return num % value;
      } else {
        return num;
      }
    }
  }
}

