import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURI: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {

    const uri: string = this.apiURI + '/users';
    
    return this.http.post<User> (uri, user).
      pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.


      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);



      // question over how much information you want to give to the end-user
      // it depends on who will be using the system
      // this information would not be returned in a public interface but might in an intranet.

      if (error.status == 412) {
        return throwError('412 Error' + JSON.stringify(error.error))
      }

    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
