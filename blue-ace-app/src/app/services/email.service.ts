import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class EmailService {
  private betUrl = 'https://localhost/email/'

  constructor(private http: Http){}
  /*
  send_email(subject:string, body:string, email:string){
    let subject =
    return this.http.get(this.betUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  */

  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
