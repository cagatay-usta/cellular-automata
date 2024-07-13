import { Cell } from './cell.model';
import { take } from 'rxjs/operators';

describe('Cell', () => {
  let rulestring = 'B2/S23';

  it('should create an instance of Cell', () => {
    const cell = new Cell(1, 1);
    expect(cell).toBeTruthy();
  });

  it('should update the state based on the number of neighbors', (done) => {
    rulestring = 'B2/S23';
    const cell = new Cell(0, 0, rulestring);

    cell.setNeighbors(0);
    cell.state$.pipe(take(1)).subscribe((state) => {
      expect(state).toBe('dead');

      cell.setNeighbors(1);
      cell.state$.pipe(take(1)).subscribe((state) => {
        expect(state).toBe('dead');

        cell.setNeighbors(2);
        cell.state$.pipe(take(1)).subscribe((state) => {
          expect(state).toBe('alive');

          cell.setNeighbors(3);
          cell.state$.pipe(take(1)).subscribe((state) => {
            expect(state).toBe('alive');

            cell.setNeighbors(4);
            cell.state$.pipe(take(1)).subscribe((state) => {
              expect(state).toBe('dead');
              cell.destroy();
              done();
            });
          });
        });
      });
    });
  });

  it('should assign state according to the rulestring', (done) => {
    rulestring = 'B1/S2';
    const cell = new Cell(0, 0, rulestring);

    cell.setNeighbors(0);
    cell.state$.pipe(take(1)).subscribe((state) => {
      expect(state).toBe('dead');

      cell.setNeighbors(1);
      cell.state$.pipe(take(1)).subscribe((state) => {
        expect(state).toBe('alive');

        cell.setNeighbors(2);
        cell.state$.pipe(take(1)).subscribe((state) => {
          expect(state).toBe('alive');

          cell.setNeighbors(3);
          cell.state$.pipe(take(1)).subscribe((state) => {
            expect(state).toBe('dead');
            cell.destroy();
            done();
          });
        });
      });
    });
  });
});
