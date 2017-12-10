import { Component, OnInit } from '@angular/core';

import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { DiscussionService } from './discussion.service';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})

export class CreateComponent implements OnInit {

  discussions: Discussion[];
  d_form: FormGroup;
  activeusername: string;
  titleAlert:string = 'This field is required';
  submitted: boolean = false;

  constructor(private discussionService: DiscussionService,
              private loginService: LoginService,
              public discussion_model: DiscussionForm,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.activeusername = localStorage.getItem('currentUser');
  }

  ngOnInit() {
    this.d_form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(10)]],
      town: [null, [Validators.required, Validators.maxLength(15)]],
      street: [null, [Validators.required, Validators.maxLength(15)]],
      subject: [null, [Validators.required]],
      message: [null, [Validators.required]]
    })
  }

  submitDiscussion(form: NgForm) {

    this.submitted = true;

    this.discussionService.createDiscussion(this.discussion_model);

    this.d_form.reset();

  }

  logout(): void {
    this.loginService.logout();
  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

}
