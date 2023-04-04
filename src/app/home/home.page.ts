import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UnicornComponent } from '../unicorn/unicorn.component';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, UnicornComponent],
})
export class HomePage {
  constructor() {}

  public showConfetti(): void {
    try {
      this.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch (error) {
      console.log('error confetti', error);
    }
  }

  public confetti(args: any) {
    return window['confetti'].apply(this, args);
  }
}
