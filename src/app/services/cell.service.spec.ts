// cell.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { CellService } from './cell.service';
import { Cell } from '../models/cell.model';

describe('CellService', () => {
  let cellService: CellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cellService = TestBed.inject(CellService);
  });

  it('should be created', () => {
    expect(cellService).toBeTruthy();
  });

  describe('initializeCellGrid', () => {
    it('should initialize a grid with the given rows and columns', () => {
      const rows = 3;
      const cols = 3;
      const grid = cellService.initializeCellGrid(rows, cols);

      expect(grid.length).toBe(rows);
      grid.forEach((row) => {
        expect(row.length).toBe(cols);
        row.forEach((cell) => {
          expect(cell).toBeInstanceOf(Cell);
        });
      });
    });

    it('should initialize cells with default state if not provided', () => {
      const rows = 2;
      const cols = 2;
      const grid = cellService.initializeCellGrid(rows, cols);

      grid.forEach((row) => {
        row.forEach((cell) => {
          expect(cell.state).toBe('dead');
        });
      });
    });

    it('should initialize cells with the specified state', () => {
      const rows = 2;
      const cols = 2;
      const grid = cellService.initializeCellGrid(rows, cols, {
        state: 'alive',
      });

      grid.forEach((row) => {
        row.forEach((cell) => {
          expect(cell.state).toBe('alive');
        });
      });
    });
  });
});
