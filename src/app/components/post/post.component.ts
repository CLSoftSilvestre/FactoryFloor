import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  postImage: string = null;

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
    this.checkPostImage();
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

}
