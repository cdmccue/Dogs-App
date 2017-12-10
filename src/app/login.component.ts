import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { LoginService } from "./login.service";
import { UserForm } from "./userForm";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public activeusername: string;

  constructor(private router: Router,
              private loginService: LoginService,
              public user_model: UserForm) {
    this.activeusername = localStorage.getItem('currentUser');
  }

  goHome() {
    this.router.navigate(["/discussion"]);
  }

  login(form: NgForm): void {

    this.loginService.login(this.user_model)
      // .subscribe(res => localStorage.setItem('currentUser', res['user']));
      // .subscribe(res => {this.activeusername = res['user'];});
    // this.activeusername = this.loginService.active_username;
    // console.log(this.activeusername);
      // .subscribe(data => {console.log(data);});
      .subscribe(res => this.router.navigate(['/discussion']));

    // console.log(this.active_user);

    console.log(2);

    form.reset();
    // this.router.navigate(['/discussion']);
  }

  // authenticate(form: NgForm) {
  //   if (form.valid) {
  //     this.login.authenticate(this.username, this.password)
  //       .subscribe(response => {
  //         if (response) {
  //           this.router.navigateByUrl("/admin/main");
  //         }
  //         this.errorMessage = "Authentication Failed";
  //       })
  //   } else {
  //     this.errorMessage = "Form Data Invalid";
  //   }
  // }

}
