import { Component, computed, signal } from '@angular/core';
import { CellService } from '../../services/cell.service';
import { Cell } from '../../models/cell.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  rows = signal(100);
  cols = signal(50);
  grids = computed<Cell[][]>(() =>
    this.cellService.initializeCellGrid(this.rows(), this.cols(), {
      state: 'alive',
    })
  );

  constructor(private cellService: CellService) {}
}
