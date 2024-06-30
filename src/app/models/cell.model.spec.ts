import { Cell } from './cell.model';

describe('Cell', () => {
  let rulestring = 'B2/S23';

  it('should create an instance of Cell', () => {
    const cell = new Cell(1, 1);
    expect(cell).toBeTruthy();
  });

  it('should update the state based on the number of neighbors', () => {
    rulestring = 'B2/S23';
    const cell = new Cell(0, 0, rulestring);

    cell.setNeighbors(0);
    expect(cell.state).toBe('dead');

    cell.setNeighbors(1);
    expect(cell.state).toBe('dead');

    cell.setNeighbors(2);
    expect(cell.state).toBe('alive');

    cell.setNeighbors(3);
    expect(cell.state).toBe('alive');

    cell.setNeighbors(4);
    expect(cell.state).toBe('dead');
  });

  it('should assign state according to the rulestring', () => {
    rulestring = 'B1/S2';
    const cell = new Cell(0, 0, rulestring);

    cell.setNeighbors(0);
    expect(cell.state).toBe('dead');

    cell.setNeighbors(1);
    expect(cell.state).toBe('alive');

    cell.setNeighbors(2);
    expect(cell.state).toBe('alive');

    cell.setNeighbors(3);
    expect(cell.state).toBe('dead');
  });
});
