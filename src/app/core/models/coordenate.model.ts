import {Ideserializable} from './ideserializable';

export class CoordenateModel implements Ideserializable {
  private _lat: number;

  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = +value;
  }

  private _lng: number;

  get lng(): number {
    return this._lng;
  }

  set lng(value: number) {
    this._lng = +value;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
