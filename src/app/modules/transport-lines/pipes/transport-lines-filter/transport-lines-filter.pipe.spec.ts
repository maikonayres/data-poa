import { TransportLinesFilterPipe } from './transport-lines-filter.pipe';

describe('FilterTrasportationLinesPipe', () => {
  it('create an instance', () => {
    const pipe = new TransportLinesFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
