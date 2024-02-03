import Node from "./node";
import PriorityQueue from "./priorityQueue";

export function aStar(
  startNode: Node,
  endNode: Node,
  gridNodes: Node[][]
): [Node[], Node[]] {
  const visitedNodes: Node[] = [];
  const shortestPathNodes: Node[] = [];

  const calculateHeuristic = (node: Node) => {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
  };

  const unvisitedNodes = new PriorityQueue<Node>();

  const distances: { [key: string]: number } = {};
  const totalCosts: { [key: string]: number } = {};
  const prevNodes: { [key: string]: Node | null } = {};

  gridNodes.forEach((row) => {
    row.forEach((node) => {
      distances[`${node.row}-${node.col}`] = Infinity;
      totalCosts[`${node.row}-${node.col}`] = Infinity;
      prevNodes[`${node.row}-${node.col}`] = null;
    });
  });
  distances[`${startNode.row}-${startNode.col}`] = 0;
  totalCosts[`${startNode.row}-${startNode.col}`] =
    calculateHeuristic(startNode);

  unvisitedNodes.enqueue(
    startNode,
    totalCosts[`${startNode.row}-${startNode.col}`]
  );

  while (!unvisitedNodes.isEmpty()) {
    const currNode = unvisitedNodes.dequeue();

    if (currNode) {
      currNode.isVisited = true;
      visitedNodes.push(currNode);

      if (currNode === endNode) {
        shortestPathNodes.push(currNode);
        let prevNode = prevNodes[`${currNode.row}-${currNode.col}`];
        while (prevNode) {
          shortestPathNodes.push(prevNode);
          prevNode = prevNodes[`${prevNode.row}-${prevNode.col}`];
        }

        break;
      }

      currNode.neighbours.forEach((neighbor) => {
        if (!neighbor.isWall) {
          const distanceToNeighbor =
            distances[`${currNode.row}-${currNode.col}`] + 1;

          if (
            distanceToNeighbor < distances[`${neighbor.row}-${neighbor.col}`]
          ) {
            distances[`${neighbor.row}-${neighbor.col}`] = distanceToNeighbor;
            prevNodes[`${neighbor.row}-${neighbor.col}`] = currNode;
            const heuristicCost = calculateHeuristic(neighbor);
            totalCosts[`${neighbor.row}-${neighbor.col}`] =
              distanceToNeighbor + heuristicCost;
            unvisitedNodes.enqueue(
              neighbor,
              totalCosts[`${neighbor.row}-${neighbor.col}`]
            );
          }
        }
      });
    }
  }

  return [visitedNodes, shortestPathNodes.reverse()];
}
