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
  view_discussions: Discussion[];
  activeusername: string;
  neighborhood: boolean = false;
  submitted: boolean = false;
  selectedTown: string;
  selectedStreet: string;
  townList: string[];
  public postsPerPage = 4;
  public selectedPage = 1;

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
      .subscribe(discussions => {
        let pageIndex = (this.selectedPage - 1) * this.postsPerPage;
        this.discussions = discussions;
        this.view_discussions = this.discussions.slice(pageIndex, pageIndex + this.postsPerPage);
      });

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

  neighborhood_check() {
    this.neighborhood = true;//!this.neighborhood;
  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

  clearStreet() {
    this.selectedStreet = null;

    this.selectedPage = 1;
    let pageIndex = (this.selectedPage - 1) * this.postsPerPage;
    this.view_discussions = this.discussions;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    let pageIndex = (this.selectedPage - 1) * this.postsPerPage;
    this.view_discussions = this.discussions.slice(pageIndex, pageIndex + this.postsPerPage);
  }
  changePageSize(newSize: number) {
    this.postsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(Object.keys(this.discussions).length / this.postsPerPage))
      .fill(0).map((x, i) => i + 1)
  }

}
