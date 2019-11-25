import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ErrorsNotifyService} from '../services/errors-notify/errors-notify.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorsHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router, private errorNotifyService: ErrorsNotifyService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
      .handle(req)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorNotifyService.notifyErrors('Opps! Cliente não autenticado');
            setTimeout(() => {
              this.router.navigate(['']);
              return throwError(error);
            }, 1000);
          }
          return throwError(error);
        })
      );
  }
}
