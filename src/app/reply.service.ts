import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './post';
import { MessageService } from './message.service';
import { PostForm } from './postForm';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReplyService {

  private discussionUrl = 'http://localhost:8080/services/rest/discussion';

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router) {
  }

  /** GET posts from the server */
  getPosts(id:number): Observable<Post[]> {
    const url = `${this.discussionUrl}/${id}/post`;
    return this.http.get<Post[]>(url)
      .pipe(
        tap(discussion => this.log(`fetched posts`)),
        catchError(this.handleError('getPosts', []))
      );
  }

  /** GET post by id. Will 404 if id not found */
  getPost(id: number, pid: number): Observable<Post> {
    const url = `${this.discussionUrl}/${id}/post/${pid}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched discussion id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  /** POST a reply post */
  createPost(post: PostForm, id: number): void {

    const POST_url = `${this.discussionUrl}/${id}/post`;

    this.http.post(POST_url, JSON.stringify(post), httpOptions)
      .subscribe(post => this.router.navigate([`/discussion/${id}`]));
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

  /** Log a ReplyService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ReplyService: ' + message);
  }


}
