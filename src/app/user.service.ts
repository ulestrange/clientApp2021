import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http'
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { User } from './user';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURI: string = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;



  constructor(private http: HttpClient) {

    const storedUser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('User' + storedUser);

    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.user = this.userSubject.asObservable();

    if (this.userSubject.value == null || this.userSubject.value._id == undefined) {
      this.userSubject.next(null)
    }

  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }


  createUser(user: User): Observable<User> {

    const uri: string = this.apiURI + '/users';

    return this.http.post<User>(uri, user).
      pipe(
        catchError(this.handleError)
      );
  }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${this.apiURI}/users`)
      .pipe(
        catchError(this.handleError)
      )
  }


  public login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.apiURI}/auth`, { email: email, password: password }).
      pipe(map(user => {

        // get the expiry time from the JWT
        const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
        const expires = new Date(payload.exp * 1000);


        localStorage.setItem('currentUser', JSON.stringify(user))
        this.userSubject.next(user);

        this.startAuthenticateTimer(expires);
        return user;
      }
      ))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }
  private getFreshToken(): Observable<any> {
    
    return this.http.get<any>(`${this.apiURI}/auth/refresh/${this.userValue?._id}` ).
      pipe(map(user => {
        console.log('here')

        // get the expiry time from the JWT
        const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
        const expires = new Date(payload.exp * 1000);

        localStorage.setItem('currentUser', JSON.stringify(user))
        this.userSubject.next(user);

        this.startAuthenticateTimer(expires);
        return user;
      }))
    }


  private handleError(error: HttpErrorResponse) {
        if(error.error instanceof ErrorEvent) {
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

        if(error.status == 412) {
      return throwError('412 Error' + JSON.stringify(error.error))
    }

  }
    // Return an observable with a user-facing error message.
    return throwError(
    'Something bad happened; please try again later.');
  }

  private authenticateTimeout ? : any;

  private startAuthenticateTimer(expires: Date) {
  console.log(expires);


  // set a timeout to re-authenticate with the api one minute before the token expires
  const hello = expires.getTime();

  const timeout = expires.getTime() - Date.now() - (60 * 1000);
  console.log('timeout is ' + timeout);
  //const { accessToken } = FB.getAuthResponse();
  this.authenticateTimeout = setTimeout(() => {
    console.log('timer gone ');
    this.getFreshToken().subscribe();
    //this.logout();
  }, timeout);
}



}


