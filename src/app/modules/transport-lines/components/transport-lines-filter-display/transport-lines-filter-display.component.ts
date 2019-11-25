import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransportLinesModel} from '../../../../core/models/transport-lines.model';

@Component({
  selector: 'app-transport-lines-filter-display',
  templateUrl: './transport-lines-filter-display.component.html',
  styleUrls: ['./transport-lines-filter-display.component.css']
})
export class TransportLinesFilterDisplayComponent implements OnInit {

  @Input() transportLines: TransportLinesModel[] = [];
  @Output() selectedTransportLine = new EventEmitter<TransportLinesModel>();

  constructor() {
  }

  ngOnInit() {
  }

  selectedTransportLineEmitter(transportLine) {
    this.selectedTransportLine.emit(transportLine);
  }

}
