import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { RouterModule } from '@angular/router';


import { AppComponent }         from './app.component';
// import { DashboardComponent }   from './dashboard/dashboard.component';
import { DiscussionDetailComponent }  from './discussion-detail.component';
import { CreateComponent } from './create.component';
// import { HeroesComponent }      from './heroes/heroes.component';
// import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { DiscussionService }          from './discussion.service';
import { ReplyService } from './reply.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages.component';
import { DiscussionComponent } from './discussion.component';
import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { PostForm } from './postForm';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    // DashboardComponent,
    // DiscussionsComponent,
    DiscussionDetailComponent,
    MessagesComponent,
    DiscussionComponent,
    CreateComponent
    // DiscussionSearchComponent
  ],
  providers: [ DiscussionService, ReplyService, MessageService, Discussion, DiscussionForm, PostForm ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
