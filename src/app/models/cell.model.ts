export class Cell {
  private neighbors: number = 0;
  private rules: {
    birth: number[];
    survival: number[];
  };

  constructor(
    private row: number,
    private col: number,
    private rulestring: string = 'B3/S23',
    public state: 'dead' | 'alive' | 'dying' = 'dead'
  ) {
    this.rules = this.processRules(rulestring);
  }

  // cell will update the state when the number of neighbors change
  public setNeighbors(neighbors: number) {
    this.neighbors = neighbors;
    this.updateState();
  }

  private updateState(): Cell['state'] {
    switch (this.state) {
      case 'dead':
        return (this.state = this.rules.birth.some(
          (rule) => this.neighbors === rule
        )
          ? 'alive'
          : 'dead');
      case 'alive':
        return (this.state = this.rules.survival.some(
          (rule) => this.neighbors === rule
        )
          ? 'alive'
          : 'dead');
      default:
        return this.state;
    }
  }

  private processRules(rulestring: string) {
    let birth: number[] = [];
    let survival: number[] = [];

    const rules = rulestring.split('/');

    rules.forEach((rule) => {
      if (rule.startsWith('B')) {
        birth = Array.from(rule.slice(1)).map((char) => parseInt(char));
      } else if (rule.startsWith('S')) {
        survival = Array.from(rule.slice(1)).map((char) => parseInt(char));
      }
    });

    return { birth, survival };
  }
}
