import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TransportLinesModel} from '../../../../core/models/transport-lines.model';
import {catchError} from 'rxjs/operators';
import {ErrorsNotifyService} from '../../../../core/services/errors-notify/errors-notify.service';

@Injectable({
  providedIn: 'root'
})
export class TransportLinesListService {

  private readonly DATA_POA_CONFIG = environment.dataPoa;

  private readonly BUS_TYPE = 'o';
  private readonly VAN_TYPE = 'l';

  private readonly TRANSPORT_LOCAL_STORAGE_KEY = '-transport-lines-list';
  private readonly TRANSPORT_LOCAL_STORAGE_KEY_EXP_IN = '-transport-lines-list-expire-in';
  private readonly HOURS_EXPIRE_IN: number = 4;
  private readonly EXPIRE_IN: number = 60 * 60 * this.HOURS_EXPIRE_IN * 1000;

  constructor(private httpClient: HttpClient, private errorNotifyService: ErrorsNotifyService) {
  }

  public getBusListLines(): Observable<TransportLinesModel[]> {
    return this.getTransportListLines(this.BUS_TYPE);
  }

  public getVanListLines(): Observable<TransportLinesModel[]> {
    return this.getTransportListLines(this.VAN_TYPE);
  }

  private getTransportListLines(transportType: string): Observable<TransportLinesModel[]> {
    return new Observable(subscriber => {
      const data = this.getTransportListLinesFromStorage(transportType);
      if (data.length) {
        subscriber.next(data);
      } else {
        this.getTransportListByTypeRequest(transportType)
          .subscribe(transportListRequest => {
            const transportLists = transportListRequest.map(transportList => {
              transportList.type = transportType;
              return new TransportLinesModel().deserialize(transportList);
            });
            subscriber.next(transportLists);
            this.setTransportListLinesFromStorage(transportType, transportLists);
          });
      }
    });
  }

  private setTransportListLinesFromStorage(transportType: string, data: any[]) {
    const timeNow = new Date().getTime();
    localStorage.setItem(transportType + this.TRANSPORT_LOCAL_STORAGE_KEY_EXP_IN, String(timeNow + this.EXPIRE_IN));
    localStorage.setItem(transportType + this.TRANSPORT_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  private getTransportListLinesFromStorage(transportType: string): TransportLinesModel[] {
    const timeNow = new Date().getTime();
    const expireIn = (localStorage.getItem(transportType + this.TRANSPORT_LOCAL_STORAGE_KEY_EXP_IN) || 0) as number;
    if (timeNow > expireIn) {
      return [];
    } else {
      const data = (JSON.parse(localStorage.getItem(transportType + this.TRANSPORT_LOCAL_STORAGE_KEY)) || []);
      if (data.length) {
        return data.map(transportationLine => {
          transportationLine.type = transportType;
          transportationLine.icon = transportType === 'o' ? 'directions_bus' : 'local_shipping';
          return new TransportLinesModel().deserialize(transportationLine);
        });
      } else {
        return [];
      }
    }
  }

  private getTransportListByTypeRequest(transportType): Observable<TransportLinesModel[]> {
    let params = new HttpParams().append('a', 'nc');
    params = params.append('p', '%');
    params = params.append('t', transportType);
    return this.httpClient
      .get<TransportLinesModel[]>(this.DATA_POA_CONFIG.baseUrl, {params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorNotifyService.notifyErrors('Opps! ocorreu um erro ao tentar buscar listagem de  ' + (transportType === 'o' ? 'Ônibus' : 'Lotação'));
          return throwError(error);
        })
      );
  }

}
