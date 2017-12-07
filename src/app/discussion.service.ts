import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';
import { catchError, map, tap } from 'rxjs/operators';

import { Discussion } from './discussion';
import { DiscussionForm } from './discussionForm';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DiscussionService {

  private discussionUrl = 'http://localhost:8080/services/rest/discussion';
  // private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) {
  }

  /** GET discussions from the server */
  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(this.discussionUrl)
      .pipe(
        tap(discussion => this.log(`fetched discussions`)),
        catchError(this.handleError('getDiscussions', []))
      );
  }

  /** GET discussion by id. Will 404 if id not found */
  getDiscussion(id: number): Observable<Discussion> {
    const url = `${this.discussionUrl}/${id}`;
    return this.http.get<Discussion>(url).pipe(
      tap(_ => this.log(`fetched discussion id=${id}`)),
      catchError(this.handleError<Discussion>(`getDiscussion id=${id}`))
    );
  }

  /** POST discussion */
  createDiscussion(discussion: DiscussionForm): void {
    this.http.post(this.discussionUrl, JSON.stringify(discussion), httpOptions)
      .subscribe(discussion => this.router.navigate(['/discussion']));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a DiscussionService message with the MessageService */
  private log(message: string) {
    this.messageService.add('DiscussionService: ' + message);
  }


}
