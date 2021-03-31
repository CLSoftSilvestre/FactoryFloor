import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService, Post } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.page.html',
  styleUrls: ['./new-post-modal.page.scss'],
})
export class NewPostModalPage implements OnInit {
  typeOfPost = 'information';
  newPostMsg = '';

  constructor(public modalController: ModalController, private postService: PostService) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  typePostChanged($event) {
    this.typeOfPost = $event.detail.value;
    console.log('Type of Post: ', $event.detail.value);
  }

  addNewPost(){
    this.postService.addPostMessage(this.newPostMsg, this.typeOfPost).then(() => {
      this.newPostMsg = '';
      this.dismissModal();
    });
  }
}
