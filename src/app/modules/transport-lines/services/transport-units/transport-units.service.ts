import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {TransportLinesModel} from '../../../../core/models/transport-lines.model';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {CoordenateModel} from '../../../../core/models/coordenate.model';
import {catchError} from 'rxjs/operators';
import {ErrorsNotifyService} from '../../../../core/services/errors-notify/errors-notify.service';

@Injectable({
  providedIn: 'root'
})
export class TransportUnitsService {

  private readonly DATA_POA_CONFIG = environment.dataPoa;
  private readonly TRANSPORT_UNITS_LOCAL_STORAGE_KEY = '-transport-units';
  private readonly TRANSPORT_UNITS_LOCAL_STORAGE_KEY_EXP_IN = 'transport-units-expire-in';
  private readonly HOURS_EXPIRE_IN: number = 4;
  private readonly EXPIRE_IN: number = 60 * 60 * this.HOURS_EXPIRE_IN * 1000;
  private itineraryIds = [];

  constructor(private httpClient: HttpClient, private errorNotifyService: ErrorsNotifyService) {
  }

  getAllTransportUnitsAndSave(): Observable<boolean> {

    return new Observable(subscriber => {
      const timeNow = new Date().getTime();
      const expireIn = (localStorage.getItem(this.TRANSPORT_UNITS_LOCAL_STORAGE_KEY_EXP_IN) || 0) as number;

      if (timeNow > expireIn) {
        this.getAllTransportUnitsAndSaveRequest()
          .subscribe(transportUnits => {

            transportUnits.map(unit => {
              const cords = new CoordenateModel();
              cords.lat = unit.latitude;
              cords.lng = unit.longitude;

              for (let i = 0; i < unit.linhas.length; i++) {
                const idLine = unit.linhas[i].idLinha;
                if (!this.itineraryIds.includes(unit.linhas[i].idLinha)) {
                  this.itineraryIds.push(unit.linhas[i].idLinha);
                  this.removeTransportUnitsByIdLine(unit.linhas[i].idLinha);
                }
                this.addTransportUnitsByIdLine(idLine, cords);
              }
            });
            this.setLastScan();
            subscriber.next(true);
          });
      } else {
        subscriber.next(true);

      }
    });
  }

  getTransportUnitsByIdLine(idLine) {
    return (JSON.parse(localStorage.getItem(idLine + this.TRANSPORT_UNITS_LOCAL_STORAGE_KEY)) || []);
  }

  private addTransportUnitsByIdLine(idLine: string, coordenates: CoordenateModel) {
    const getAllCoordenates = this.getTransportUnitsByIdLine(idLine);
    getAllCoordenates.push({lat: coordenates.lat, lng: coordenates.lng});
    localStorage.setItem(idLine + this.TRANSPORT_UNITS_LOCAL_STORAGE_KEY, JSON.stringify(getAllCoordenates));
  }

  private removeTransportUnitsByIdLine(idLine) {
    localStorage.removeItem(idLine + this.TRANSPORT_UNITS_LOCAL_STORAGE_KEY);
  }

  private getAllTransportUnitsAndSaveRequest(): Observable<any> {
    let params = new HttpParams().append('a', 'tp');
    params = params.append('p', '((-30.14296222668432,-51.87917968750003),(-29.79200328961529,-50.56082031250003))))');
    return this.httpClient
      .get<TransportLinesModel[]>(this.DATA_POA_CONFIG.baseUrl, {params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorNotifyService.notifyErrors('Opps! ocorreu um erro ao tentar buscar listagem de paradas');
          return throwError(error);
        })
      );
  }

  private setLastScan() {
    const timeNow = new Date().getTime();
    localStorage.setItem(this.TRANSPORT_UNITS_LOCAL_STORAGE_KEY_EXP_IN, String(timeNow + this.EXPIRE_IN));
  }

}
