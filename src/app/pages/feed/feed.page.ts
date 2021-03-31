import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NewPostModalPage } from 'src/app/pages/new-post-modal/new-post-modal.page';
import { PostService, Post } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  posts: Observable<Post[]>;

  constructor(public modalController: ModalController, private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getPostMessage();
    console.log('Posts: ', this.posts);
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
