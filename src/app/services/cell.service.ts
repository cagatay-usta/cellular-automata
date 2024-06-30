import { Injectable } from '@angular/core';
import { Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root',
})
export class CellService {
  constructor() {}

  public initializeCellGrid(
    rows: number,
    cols: number,
    options?: {
      rulestring?: string;
      state?: Cell['state'];
    }
  ): Cell[][] {
    return Array.from({ length: rows }, (row: number) =>
      Array.from(
        { length: cols },
        (col: number) => new Cell(row, col, options?.rulestring, options?.state)
      )
    );
  }
}
