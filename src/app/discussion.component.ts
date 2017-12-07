import { Component, OnInit } from '@angular/core';

import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { DiscussionService } from './discussion.service';
import { Router } from '@angular/router';

import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussion.component.html'
})

export class DiscussionComponent implements OnInit {

  discussions: Discussion[];

  submitted: boolean = false;

  constructor(private discussionService: DiscussionService,
              public discussion_model: DiscussionForm,
              private router: Router) { }

  ngOnInit() {
    this.getDiscussions();
  }

  getDiscussions(): void {
    this.discussionService.getDiscussions()
      .subscribe(discussions => this.discussions = discussions);
  }

  submitDiscussion(form: NgForm) {

    this.submitted = true;
    this.discussionService.createDiscussion(this.discussion_model);
  }

  redirect() {
    this.router.navigate(['/create'])
  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

}
