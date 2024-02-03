import Node from "./node";

export default function depthFirstSearch(
  startNode: Node,
  endNode: Node,
  gridNodes: Node[][]
): [Node[], Node[]] {
  const visitedNodes: Node[] = [];
  const shortestPathNodes: Node[] = [];

  const dfsVisit = (node: Node) => {
    visitedNodes.push(node);
    node.isVisited = true;

    if (node === endNode) {
      shortestPathNodes.push(node);
      return true;
    }

    for (const neighbor of node.neighbours) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        if (dfsVisit(neighbor)) {
          shortestPathNodes.push(node);
          return true;
        }
      }
    }

    return false;
  };

  dfsVisit(startNode);

  return [visitedNodes, shortestPathNodes.reverse()];
}
