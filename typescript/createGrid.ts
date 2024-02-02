import Node from "./node";

export function createGrid(
  startNode: Node,
  endNode: Node,
  ROW_COUNT: number,
  COL_COUNT: number
) {
  const gridNodes: Node[][] = [];

  for (let i = 0; i < ROW_COUNT; i++) {
    gridNodes[i] = [];
    for (let j = 0; j < COL_COUNT; j++) {
      let newNode;
      if (i === startNode.row && j === startNode.col) newNode = startNode;
      else if (i === endNode.row && j === endNode.col) newNode = endNode;
      else newNode = new Node(i, j);

      gridNodes[i][j] = newNode;
    }
  }

  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT - 1; j++) {
      gridNodes[i][j].addNeighbour(gridNodes[i][j + 1]);
      gridNodes[i][j + 1].addNeighbour(gridNodes[i][j]);
    }
  }

  for (let i = 0; i < ROW_COUNT - 1; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      gridNodes[i][j].addNeighbour(gridNodes[i + 1][j]);
      gridNodes[i + 1][j].addNeighbour(gridNodes[i][j]);
    }
  }

  return gridNodes;
}
