import { SpinnerService } from './../spinner/spinner.service';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.requestStarted();
    
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestCompleted();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
          throw error;
        }
      )
    );
  }
}
