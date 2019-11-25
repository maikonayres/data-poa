import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CoordenateModel} from '../../../../core/models/coordenate.model';
import {catchError} from 'rxjs/operators';
import {ErrorsNotifyService} from '../../../../core/services/errors-notify/errors-notify.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private readonly DATA_POA_CONFIG = environment.dataPoa;

  private readonly ITINERARY_LOCAL_STORAGE_KEY = '-itinerary';
  private readonly ITINERARY_LOCAL_STORAGE_KEY_EXP_IN = '-itinerary-expire-in';

  private readonly HOURS_EXPIRE_IN: number = 5;
  private readonly EXPIRE_IN: number = 60 * 60 * this.HOURS_EXPIRE_IN * 1000;

  constructor(private httpClient: HttpClient, private errorNotifyService: ErrorsNotifyService) {
  }

  /*
   *  get coordinates from itinerary, if this is downloaded and not expired, request to local.
   *  if not request from api and save in local storage
   */
  public getItineraryByTransportLine(transportLineId: string): Observable<CoordenateModel[]> {
    return new Observable(subscriber => {
      const cordinateFromStorage = this.getItineraryCordinatesFromStorage(transportLineId);

      if (cordinateFromStorage.length) {
        subscriber.next(cordinateFromStorage);
      } else {
        this.getItineraryByTransportLineRequest(transportLineId)
          .subscribe(itineraryByTransportLine => {

            delete itineraryByTransportLine.idlinha;
            delete itineraryByTransportLine.nome;
            delete itineraryByTransportLine.codigo;

            const coordenates: CoordenateModel[] = [];
            Object.keys(itineraryByTransportLine).map(index => {
              coordenates.push(new CoordenateModel().deserialize(itineraryByTransportLine[index]));
            });
            this.setItineraryCordinatesFromStorage(transportLineId, coordenates);
            subscriber.next(coordenates);
          });
      }
    });
  }

  /*
  *  request from api geo coordinates from itinerary id
  *  return Observable<any> because data format is bad format, no can map this.
  */
  private getItineraryByTransportLineRequest(transportLineId: string): Observable<any> {

    let params = new HttpParams().append('a', 'il');
    params = params.append('p', transportLineId);
    return this.httpClient
      .get<any[]>(this.DATA_POA_CONFIG.baseUrl , {params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorNotifyService.notifyErrors('Opps! ocorreu um erro ao tentar buscar dados da rota ' + transportLineId);
          return throwError(error);
        })
      );
  }

  /*
  *  get geo coordinates from local storage if this token not is expired
  */
  private getItineraryCordinatesFromStorage(transportLineId: string) {

    const timeNow = new Date().getTime();
    const expireIn = (localStorage.getItem(transportLineId + this.ITINERARY_LOCAL_STORAGE_KEY_EXP_IN) || 0) as number;
    if (timeNow > expireIn) {
      return [];
    } else {
      const data = (JSON.parse(localStorage.getItem(transportLineId + this.ITINERARY_LOCAL_STORAGE_KEY)) || []);
      if (data.length) {
        return data.map(transportationLine => {
          return new CoordenateModel().deserialize(transportationLine);
        });
      } else {
        return [];
      }
    }
  }

  /*
  *  set geo coordinates to local storage
  */
  private setItineraryCordinatesFromStorage(transportLineId: string, coordenates: CoordenateModel[]) {
    const timeNow = new Date().getTime();
    localStorage.setItem(transportLineId + this.ITINERARY_LOCAL_STORAGE_KEY_EXP_IN, String(timeNow + this.EXPIRE_IN));
    localStorage.setItem(transportLineId + this.ITINERARY_LOCAL_STORAGE_KEY, JSON.stringify(coordenates));
  }
}
