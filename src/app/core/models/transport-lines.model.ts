import {Ideserializable} from './ideserializable';
import {CoordenateModel} from './coordenate.model';

export class TransportLinesModel implements Ideserializable {
  public id: string;
  public codigo: string;
  public nome: string;
  public type: string;
  public icon: string;
  public itineraryStrokeColor = '';
  public itinerary: CoordenateModel[] = [];
  public transportUnits: CoordenateModel[] = [];

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
