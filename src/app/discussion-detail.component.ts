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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

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
  p_form: FormGroup;
  submitted: boolean = false;
  titleAlert:string = 'This field is required';
  activeusername: string;


  constructor(
    private discussionService: DiscussionService,
    private replyService: ReplyService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public post_model: PostForm
  ) {
    this.activeusername = localStorage.getItem('currentUser');
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.discussionService.getDiscussion(+params['id']))
      .subscribe(discussion => this.discussion = discussion);

    this.getPosts();

    this.p_form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(10)]],
      message: [null, [Validators.required]]
    })
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

  logout(): void {
    this.loginService.logout();
  }

  submitPost(form: NgForm): void {

    this.submitted = true;

    this.route.params.subscribe(params => {this.discussion_id_for_post = +params['id'];});
    this.replyService.createPost(this.post_model, this.discussion_id_for_post)
      .subscribe(post => {this.posts.push(post)});

    form.reset();
  }
}
