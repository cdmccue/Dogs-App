import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionComponent }      from './discussion.component';
import { DiscussionDetailComponent} from './discussion-detail.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  { path: '', redirectTo: '/discussion', pathMatch: 'full' },
  { path: 'discussion',  component: DiscussionComponent },
  { path: 'discussion/:id', component: DiscussionDetailComponent },
  { path: 'create', component: CreateComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
