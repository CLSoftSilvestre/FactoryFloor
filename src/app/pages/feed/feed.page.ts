import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewPostModalPage } from 'src/app/pages/new-post-modal/new-post-modal.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewPostModalPage,
      cssClass: 'new-post-modal',
      swipeToClose: true,
    });
    return await modal.present();
  }

}
