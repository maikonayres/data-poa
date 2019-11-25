import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsNotifyService {

  private notifyErrorsSubject = new Subject<string>();


  constructor() {
  }

  getNotifyErrorsSubject(): Subject<string> {
    return this.notifyErrorsSubject;
  }

  notifyErrors(message: string) {
    this.notifyErrorsSubject
      .next(message);
  }
}
