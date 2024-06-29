import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  rows = signal(100);
  cols = signal(50);
  grids = computed<string[][]>(() =>
    this.initializeGridArray(this.rows(), this.cols(), 'alive')
  );

  constructor() {}

  // TODO: create a model for grid class, grids should track neighbors and compute own states themselves
  private initializeGridArray(
    rows: number,
    cols: number,
    state: string = 'dead'
  ): string[][] {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => state)
    );
  }
}
