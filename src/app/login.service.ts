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

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router) {
  }

  login(user: UserForm): Observable<User> {
    return this.http.put(this.loginUrl, JSON.stringify(user), httpOptions)
      .pipe(
      map(
        (res) => res)
  );
  }

  createLogin(user: UserForm): Observable<User> {
    return this.http.post(this.loginUrl, JSON.stringify(user), httpOptions)
      .pipe(
        map(
          (res) => res)
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getActiveUsername(): string {
    return localStorage.getItem('currentUser');
  }

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
