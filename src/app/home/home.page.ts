import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { UnicornComponent } from '../unicorn/unicorn.component';
import * as confetti from 'canvas-confetti';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, UnicornComponent, CommonModule],
})
export class HomePage {
  public photos: any[] = [];
  public photo: any;
  constructor(private modalController: ModalController) {
    this.getObject();
  }

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

  public async openCamera() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      this.photos.unshift({
        webviewPath: capturedPhoto.webPath,
      });
      this.setObject({ webviewPath: capturedPhoto.webPath });
    } catch (error) {
      alert(error);
    }
  }

  async setObject(fotos: any) {
    await Preferences.set({
      key: 'photos',
      value: JSON.stringify(fotos),
    });
  }

  async getObject() {
    const ret = await Preferences.get({ key: 'photos' });
    const photosString = ret.value;
    if (photosString !== null) {
      const photos = JSON.parse(photosString);
      this.photos.unshift(photos);
    }
  }

  public async showImage(photo: string) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: { imagen: photo },
    });
    return await modal.present();
  }

  public async onUpload(event: any): Promise<void> {
    console.log(event.target.files[0]);
    if (event && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.photo = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  public async deletePhotos() {
    this.photo = undefined;
    const ret = await Preferences.get({ key: 'photos' });
    const photosString = ret.value;
    if (photosString !== null) {
      this.photos = [];
      await Preferences.clear();
    }
  }
}
