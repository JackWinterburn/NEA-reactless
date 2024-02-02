var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./priorityQueue"], function (require, exports, priorityQueue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dijkstra = void 0;
    priorityQueue_1 = __importDefault(priorityQueue_1);
    function dijkstra(startNode, endNode, gridNodes) {
        const visitedNodes = [];
        const shortestPathNodes = [];
        console.log(startNode);
        const unvisitedNodes = new priorityQueue_1.default();
        const distances = {};
        const prevNodes = {};
        gridNodes.forEach((row) => {
            row.forEach((node) => {
                distances[`${node.row}-${node.col}`] = Infinity;
                prevNodes[`${node.row}-${node.col}`] = null;
            });
        });
        distances[`${startNode.row}-${startNode.col}`] = 0;
        unvisitedNodes.enqueue(startNode, 0);
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
                    const distanceToNeighbor = distances[`${currNode.row}-${currNode.col}`] + 1;
                    if (distanceToNeighbor < distances[`${neighbor.row}-${neighbor.col}`]) {
                        distances[`${neighbor.row}-${neighbor.col}`] = distanceToNeighbor;
                        prevNodes[`${neighbor.row}-${neighbor.col}`] = currNode;
                        unvisitedNodes.enqueue(neighbor, distanceToNeighbor);
                    }
                });
            }
        }
        return [visitedNodes, shortestPathNodes.reverse()];
    }
    exports.dijkstra = dijkstra;
});
