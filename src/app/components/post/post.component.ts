import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  postImage: string = null;

  viewComments = false;

  postLiked = false;

  newMsg = '';

  @Input() post: Post;

  constructor( private postService: PostService) { }

  ngOnInit() {
    this.checkPostImage();
    console.log('Post view: ', this.post);
  }

  checkPostImage() {
    switch ( this.post.type ) {
      case 'information':
        this.postImage = './assets/undraw_Problem_solving_re_4gq3.svg';
        break;
      case 'question':
        this.postImage = './assets/undraw_Questions_re_1fy7.svg';
        break;
      case 'request':
        this.postImage = './assets/undraw_QA_engineers_dg5p.svg';
        break;
      default:
        this.postImage = './assets/undraw_QA_engineers_dg5p.svg';
        break;
    }
  }

  toggleViewComments() {
    this.viewComments = !this.viewComments;
  }

  addPostComment() {
    this.postService.addPostComment(this.newMsg, this.post.id).then(() => {
      this.newMsg = '';
    });
  }

  togglePostLiked() {
    this.postLiked = !this.postLiked;
  }

}
