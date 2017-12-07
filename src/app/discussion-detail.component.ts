import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Discussion } from './discussion';
import { DiscussionService} from './discussion.service';
import { ReplyService } from './reply.service';
import { Post } from './post';
import { PostForm } from './postForm';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'discussion-detail',
  templateUrl: 'discussion-detail-component.html'
})
export class DiscussionDetailComponent implements OnInit {
  @Input() discussion: Discussion;

  posts: Post[];
  discussion_id: number;
  discussion_id_for_post: number;

  submitted: boolean = false;

  constructor(
    private discussionService: DiscussionService,
    private replyService: ReplyService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public post_model: PostForm
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.discussionService.getDiscussion(+params['id']))
      .subscribe(discussion => this.discussion = discussion);

    this.getPosts();
  }

  getPosts(): void {
    //set discussion id from active route parameter
    this.route.params.subscribe(params => {this.discussion_id = +params['id'];});
    this.replyService.getPosts(this.discussion_id)
      .subscribe(posts => this.posts = posts);
  }

  goBack(): void {
    this.location.back();
  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

  submitPost(form: NgForm): void {

    this.submitted = true;

    this.route.params.subscribe(params => {this.discussion_id_for_post = +params['id'];});
    this.replyService.createPost(this.post_model, this.discussion_id_for_post);
  }
}
