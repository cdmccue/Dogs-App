import { Component, OnInit } from '@angular/core';

import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { DiscussionService } from './discussion.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';

import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussion.component.html'
})

export class DiscussionComponent implements OnInit {

  discussions: Discussion[];
  activeusername: string;

  submitted: boolean = false;

  constructor(private discussionService: DiscussionService,
              public discussion_model: DiscussionForm,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.getDiscussions();
    this.activeusername = this.loginService.getActiveUsername();
  }

  getDiscussions(): void {
    this.discussionService.getDiscussions()
      .subscribe(discussions => this.discussions = discussions);
  }

  logout(): void {
    this.loginService.logout();
  }

  submitDiscussion(form: NgForm) {

    this.submitted = true;
    this.discussionService.createDiscussion(this.discussion_model);
  }

  redirect() {
    this.router.navigate(['/create'])
  }

  neighborhood() {

  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

}
