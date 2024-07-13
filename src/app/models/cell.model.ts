import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  skip,
  Subscription,
  switchMap,
} from 'rxjs';

export type CellState = 'dead' | 'alive' | 'dying';
type Rules = {
  birth: number[];
  survival: number[];
};
export class Cell {
  private neighbors$ = new BehaviorSubject<number>(0);
  private rules: Rules;
  public state$ = new BehaviorSubject<CellState>('dead');

  private subscriptions: Subscription[] = [];

  constructor(
    private row: number,
    private col: number,
    private rulestring: string = 'B3/S23',
    private initialState: CellState = 'dead'
  ) {
    this.rules = this.processRules(rulestring);
    this.state$.next(this.initialState);

    // update state when number of neighbors change
    this.subscriptions.push(
      this.neighbors$
        .pipe(
          skip(1),
          distinctUntilChanged(),
          map((neighbors) => {
            if (
              (this.state$.value === 'dead' &&
                this.rules.birth.includes(neighbors)) ||
              (this.state$.value === 'alive' &&
                this.rules.survival.includes(neighbors))
            ) {
              return 'alive';
            }
            return 'dead';
          })
        )
        .subscribe((newState) => this.state$.next(newState))
    );
  }

  public setNeighbors(neighbors: number) {
    this.neighbors$.next(neighbors);
  }

  private processRules(rulestring: string): Rules {
    let birth: number[] = [];
    let survival: number[] = [];

    const rules = rulestring.split('/');

    rules.forEach((rule) => {
      if (rule.startsWith('B')) {
        birth = Array.from(rule.slice(1)).map((char) => parseInt(char, 10));
      } else if (rule.startsWith('S')) {
        survival = Array.from(rule.slice(1)).map((char) => parseInt(char, 10));
      }
    });

    return { birth, survival };
  }

  public destroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
