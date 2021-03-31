import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.page.html',
  styleUrls: ['./new-post-modal.page.scss'],
})
export class NewPostModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  typePostChanged($event) {
    console.log($event.detail.value);
  }

}
