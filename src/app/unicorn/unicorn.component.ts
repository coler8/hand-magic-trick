import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unicorn',
  templateUrl: './unicorn.component.html',
  styleUrls: ['./unicorn.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class UnicornComponent implements OnInit {
  public photos: any[] = [];

  constructor() {}

  ngOnInit() {}

  async openCamera() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath,
    });
  }
}
