export default class Node {
  col: number;
  row: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  neighbours: Node[];

  constructor(
    row: number,
    col: number,
    isStart: boolean = false,
    isEnd: boolean = false
  ) {
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isVisited = false;
    this.neighbours = [];
  }

  reset() {
    this.isVisited = false;
  }

  addNeighbour(neighbour: Node) {
    this.neighbours.push(neighbour);
  }
}
