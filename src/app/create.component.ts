import { Component, OnInit } from '@angular/core';

import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { DiscussionService } from './discussion.service';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})

export class CreateComponent {

  discussions: Discussion[];

  submitted: boolean = false;

  constructor(private discussionService: DiscussionService,
              public discussion_model: DiscussionForm,
              private router: Router) { }

  submitDiscussion(form: NgForm) {

    this.submitted = true;
    this.discussionService.createDiscussion(this.discussion_model);

  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

}
