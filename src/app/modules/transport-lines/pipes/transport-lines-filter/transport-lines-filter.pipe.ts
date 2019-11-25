import {Pipe, PipeTransform} from '@angular/core';
import {TransportLinesModel} from '../../../../core/models/transport-lines.model';

@Pipe({
  name: 'transportLinesFilter'
})
export class TransportLinesFilterPipe implements PipeTransform {

  transform(transportationLines: TransportLinesModel[], filterQuery: string, busSelected: boolean, vanSelected: boolean): TransportLinesModel[] {
    filterQuery = filterQuery.trim().toUpperCase();

    if (filterQuery.length === 0) {
      return [];
    }

    return transportationLines.filter(transportationLine => {
      if (busSelected && (transportationLine.type === 'o')) {
        return transportationLine.nome.toUpperCase().includes(filterQuery);
      }

      if (vanSelected && (transportationLine.type === 'l')) {
        return transportationLine.nome.toUpperCase().includes(filterQuery);
      }
      return false;
    });
  }

}
