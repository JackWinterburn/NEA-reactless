import Node from "./node";
import PriorityQueue from "./priorityQueue";

export default function greedyBestFirstSearch(
  startNode: Node,
  endNode: Node,
  gridNodes: Node[][]
): [Node[], Node[]] {
  const visitedNodes: Node[] = [];
  const shortestPathNodes: Node[] = [];

  const heuristic = (node: Node) => {
    const dx = node.row - endNode.row;
    const dy = node.col - endNode.col;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const unvisitedNodes = new PriorityQueue<Node>();

  const prevNodes: { [key: string]: Node | null } = {};

  gridNodes.forEach((row) => {
    row.forEach((node) => {
      prevNodes[`${node.row}-${node.col}`] = null;
    });
  });

  unvisitedNodes.enqueue(startNode, heuristic(startNode));

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
        if (!neighbor.isVisited && !neighbor.isWall) {
          prevNodes[`${neighbor.row}-${neighbor.col}`] = currNode;
          unvisitedNodes.enqueue(neighbor, heuristic(neighbor));
        }
      });
    }
  }

  return [visitedNodes, shortestPathNodes.reverse()];
}
