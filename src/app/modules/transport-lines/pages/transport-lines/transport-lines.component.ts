import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransportLinesListService} from '../../services/transport-lines-list/transport-lines-list.service';
import {TransportLinesModel} from '../../../../core/models/transport-lines.model';
import {ItineraryService} from '../../services/itinerary/itinerary.service';
import {TransportUnitsService} from '../../services/transport-units/transport-units.service';
import {ErrorsNotifyService} from '../../../../core/services/errors-notify/errors-notify.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-transport-lines.component',
  templateUrl: './transport-lines.component.html',
  styleUrls: ['./transport-lines.component.css']
})
export class TransportLinesComponent implements OnInit, OnDestroy {

  private readonly brandName = environment.brandName;
  private baseLat = -30.1084987;
  private baseLng = -51.317225;
  private baseZoom = 10;
  private transportLinesItinerary: TransportLinesModel[] = [];
  private filtered = '';
  private transportationLines: TransportLinesModel[] = [];
  private busSelected = true;
  private vanSelected = true;

  private errorsMessages: string[] = [];

  private transportUnitsIsOk = false;

  constructor(
    private errorsNotifyService: ErrorsNotifyService,
    private transportationLinesService: TransportLinesListService,
    private itineraryService: ItineraryService,
    private transportUnitsService: TransportUnitsService
  ) {

  }

  ngOnInit() {

    this.errorsNotifyService
      .getNotifyErrorsSubject()
      .subscribe((errors: string) => {
        this.errorsMessages.push(errors);
      });


    this.transportUnitsService
      .getAllTransportUnitsAndSave()
      .subscribe((result: boolean) => {
        setTimeout(() => {
          this.transportUnitsIsOk = result;
        }, 500);
      });

    this.transportationLinesService
      .getBusListLines()
      .subscribe((data: TransportLinesModel[]) => {
        this.transportationLines = this.transportationLines.concat(data);
      });

    this.transportationLinesService
      .getVanListLines()
      .subscribe((data: TransportLinesModel[]) => {
        this.transportationLines = this.transportationLines.concat(data);
      });
  }

  selectedTransportLine(transportLine: TransportLinesModel) {
    this.filtered = '';

    this.itineraryService
      .getItineraryByTransportLine(transportLine.id)
      .subscribe(itinerary => {
        transportLine.itinerary = itinerary;
        transportLine.transportUnits = this.transportUnitsService.getTransportUnitsByIdLine(transportLine.id);
        this.addItinerarTtransportLine(transportLine);
      });
  }

  addItinerarTtransportLine(transportLine: TransportLinesModel) {

    this.baseZoom = 15;
    this.baseLat = transportLine.itinerary[0].lat;
    this.baseLng = transportLine.itinerary[0].lng;

    if (!this.transportLinesItinerary.includes(transportLine)) {
      transportLine.itineraryStrokeColor = this.getRandomColor();
      this.transportLinesItinerary.push(transportLine);
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  removeItinerarTtransportLine(index: number) {
    this.transportLinesItinerary.splice(index, 1);
  }

  goToLink(lat: number, lng: number) {
    window.open(`https://www.google.com/maps/?q=${lat},${lng}`, '_blank');
  }

  removeMessage(index: number) {
    this.errorsMessages.splice(index, 1);
  }

  ngOnDestroy(): void {

  }
}

