import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent }         from './app.component';
import { DiscussionDetailComponent }  from './discussion-detail.component';
import { CreateComponent } from './create.component';
import { DiscussionService }          from './discussion.service';
import { ReplyService } from './reply.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages.component';
import { DiscussionComponent } from './discussion.component';
import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { PostForm } from './postForm';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { UserForm } from './userForm';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from './user';
import { RegisterForm } from './registerForm';
import { StreetPipe } from './streetPipe';
import { TownPipe } from './townPipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DiscussionDetailComponent,
    MessagesComponent,
    DiscussionComponent,
    CreateComponent,
    LoginComponent,
    StreetPipe,
    TownPipe
  ],
  providers: [ DiscussionService, ReplyService, MessageService, Discussion, DiscussionForm,
    PostForm, LoginService, UserForm, User, RegisterForm],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
