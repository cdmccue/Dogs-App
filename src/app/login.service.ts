import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Post } from './post';
import { MessageService } from './message.service';
import { UserForm } from './userForm';
import { Router } from '@angular/router';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  private loginUrl = 'http://localhost:8080/services/rest/user';
  active_username: string;

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router) {
  }

  responseStatus: number;

  // login(user: UserForm): void {
  //
  //   this.http.post(this.loginUrl, JSON.stringify(user), httpOptions)
  //     .subscribe(
  //       (val) => {console.log(val['user'])}
  //     );
  // }

  login(user: UserForm): Observable<User> {
    return this.http
      .post(this.loginUrl, JSON.stringify(user), httpOptions)
      .pipe(
      map(
        (res) => res),
        tap(res => localStorage.setItem('currentUser', res['user']))//['user']
  );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getActiveUsername(): string {
    return localStorage.getItem('currentUser');
  }

  // /** POST a reply post */
  // login(user: UserForm): Observable<User> {
  //
  //   return this.http.post(this.loginUrl, JSON.stringify(user), httpOptions);
  //
  //     // .subscribe((response: Response) => this.responseStatus = response.status);
  //
  //   // console.log(this.responseStatus);
  //     // .map((response: Response) => {
  //     // this.responseStatus = response.status;
  //     // console.log(this.responseStatus);
  //     // return response.status;
  //     // })
  //
  //     // .pipe(
  //     // map(res: Response => {
  //     //   if (res.status === 226) {
  //     //     console.log("user taken");
  //     //   }
  //     //   else {
  //     //     return res.json();
  //     //   }
  //     // })
  //     // );
  //     // .subscribe(res => this.router.navigate(['/discussion']));
  //
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ReplyService message with the MessageService */
  private log(message: string) {
    this.messageService.add('LoginService: ' + message);
  }


}
