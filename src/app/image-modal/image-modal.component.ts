import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ImageModalComponent implements OnInit {
  @Input() imagen!: string;
  showGif = true;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  hideGif() {
    this.showGif = false;
  }
}
