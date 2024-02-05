export default class Node {
  col: number;
  row: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  neighbours: Node[];

  constructor(
    row: number,
    col: number,
    isStart: boolean = false,
    isEnd: boolean = false,
    isWall: boolean = false
  ) {
    this.row = row;
    this.col = col;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
    this.isVisited = false;
    this.neighbours = [];
  }

  reset() {
    this.isVisited = false;
  }

  getUnvisitedNeighbours() {
    const unvisitedNeighbours: Node[] = [];
    this.neighbours.forEach((neighbour) => {
      if (!neighbour.isVisited) unvisitedNeighbours.push(neighbour);
    });
    return unvisitedNeighbours;
  }

  addNeighbour(neighbour: Node) {
    this.neighbours.push(neighbour);
  }
}
