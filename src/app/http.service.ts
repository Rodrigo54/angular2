import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import * as $ from 'jquery';

@Injectable()
export class HttpService extends Http {

  public pendingRequests: number = 0;
  public showLoading: boolean = false;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url,options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    // console.log("In the intercept routine..");
    this.pendingRequests++;
    this.turnOnModal();
    return observable
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        // console.log("Caught error: " + err);
      })
      .finally(() => {
        // console.log("Finally.. delaying, though.")
        var timer = Observable.timer(300);
        timer.subscribe(t => {
          this.turnOffModal();
        });
      });
    }

  private turnOnModal() {
    if (!this.showLoading) {
      this.showLoading = true;
      $('.app-spinner').show();
      // console.log("Turned on modal");
    }
    this.showLoading = true;
  }

  private turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        $('.app-spinner').show();
      }
      this.showLoading = false;
      $('.app-spinner').hide();
    }
    // console.log("Turned off modal");
  }
};

export const HttpProvider = {
  provide: Http,
  useClass: HttpService,
  deps: [XHRBackend, RequestOptions]
};
