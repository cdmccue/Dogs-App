import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { LoginService } from "./login.service";
import { UserForm } from "./userForm";
import { RegisterForm } from "./registerForm";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public activeusername: string;
  public newuser = false;

  //for alerts
  public taken: boolean;
  public incorrect: boolean;
  public doesntexist: boolean;

  constructor(private router: Router,
              private loginService: LoginService,
              public user_create: RegisterForm,
              public user_model: UserForm) {
    this.activeusername = localStorage.getItem('currentUser');
  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

  login(form: NgForm): void {

    this.loginService.login(this.user_model)
      .subscribe(
        result => {
          localStorage.setItem('currentUser', result['user']);
      },
      error => {
          if (error.status == 406) {
            this.doesntexist = false;
            this.incorrect = true;
          }
          if (error.status == 404) {
            this.incorrect = false;
            this.doesntexist = true;
          }
      },
      () => {
          this.router.navigate(['/discussion']);
      });

    form.reset();
    this.newuser = false;
  }

  create_login(form: NgForm): void {
    this.loginService.createLogin(this.user_create)
      .subscribe(
        result => {
          localStorage.setItem('currentUser', result['user']);
        },
        error => {
          if (error.status == 226) {
            this.taken = true;
          }
        },
        () => {
          this.taken = false;
          this.router.navigate(['/discussion']);
          form.reset();
          this.newuser = false;
        });
  }

  signup(): void {
    this.newuser = true;
  }
}
