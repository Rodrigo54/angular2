import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

export class CommonService {

  url: string = environment.apiBaseUrl;

  extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json();
      errMsg = body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
