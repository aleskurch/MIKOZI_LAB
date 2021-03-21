import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  X = 90;
  K = 3788;
  K_BINARY = this.K.toString(2);
  X_BINARY = this.X.toString(2);
  S1_ARRAY = ['B', 'A',	'F',	'5',	'0',	'C',	'E',	'8',	'6',	'2',	'3',	'9',	'1',	'7',	'D',	'4'];
  S2_ARRAY = ['E',	'7',	'A',	'C',	'D',	'1',	'3',	'9', '0',	'2',	'B',	'4',	'F',	'8',	'5',	'6'];
  Y;

  onParse(): void {
    const K_BINARY_ARRAY = this.K_BINARY.split('');
    const K1_ARRAY = this.makeKi([1, 3, 5, 7, 2, 4, 6, 8], K_BINARY_ARRAY);
    const K2_ARRAY = this.makeKi([5, 7, 9, 11, 6, 8, 10, 12], K_BINARY_ARRAY);
    const K3_ARRAY = this.makeKi([12, 10, 4, 2, 1, 3, 9, 11], K_BINARY_ARRAY);
    const X_ARRAY = this.make8bit(this.X_BINARY.split(''));
    const T_ARRAY = this.make8bit(this.customXor(this.customXor(this.customXor(X_ARRAY, K1_ARRAY), K2_ARRAY), K3_ARRAY));
    const T1 = parseInt(T_ARRAY.slice(0, 4).join(''), 2);
    const T2 = parseInt(T_ARRAY.slice(4, 8).join(''), 2);
    console.log(parseInt(T_ARRAY.join(''), 2));
    const P = this.S1_ARRAY[T1] + this.S2_ARRAY[T2];
    console.log(parseInt(P, 16));
    this.Y = parseInt(this.cyclicShift3(this.make8bit(parseInt(P, 16).toString(2).split(''))).join(''), 2);
    console.log(this.Y);
  }

  makeKi(indexArray: number[], K_BINARY_ARRAY: string[]): string[] {
    const KI_ARRAY = [];
    indexArray.forEach((index) => {
      KI_ARRAY.push(K_BINARY_ARRAY[index - 1]);
    });
    return KI_ARRAY;
  }

  make8bit(binaryNumber: string[]): string[] {
    while (binaryNumber.length < 8) {
      binaryNumber.unshift('0');
    }
    return binaryNumber;
  }

  customXor(firstNum: string[], secondNum: string[]): string[] {
    const result = [];
    firstNum.forEach((item, index) => {
      if (item !== secondNum[index]) {
        result.push('1');
      } else {
        result.push('0');
      }
    });
    return result;
  }

  cyclicShift3(binaryNumber: string[]): string[] {
    binaryNumber.push(binaryNumber.shift());
    binaryNumber.push(binaryNumber.shift());
    binaryNumber.push(binaryNumber.shift());
    return binaryNumber;
  }
}
