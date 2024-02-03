var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./priorityQueue"], function (require, exports, priorityQueue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.aStar = void 0;
    priorityQueue_1 = __importDefault(priorityQueue_1);
    function aStar(startNode, endNode, gridNodes) {
        const visitedNodes = [];
        const shortestPathNodes = [];
        const calculateHeuristic = (node) => {
            return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
        };
        const unvisitedNodes = new priorityQueue_1.default();
        const distances = {};
        const totalCosts = {};
        const prevNodes = {};
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
        unvisitedNodes.enqueue(startNode, totalCosts[`${startNode.row}-${startNode.col}`]);
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
                        const distanceToNeighbor = distances[`${currNode.row}-${currNode.col}`] + 1;
                        if (distanceToNeighbor < distances[`${neighbor.row}-${neighbor.col}`]) {
                            distances[`${neighbor.row}-${neighbor.col}`] = distanceToNeighbor;
                            prevNodes[`${neighbor.row}-${neighbor.col}`] = currNode;
                            const heuristicCost = calculateHeuristic(neighbor);
                            totalCosts[`${neighbor.row}-${neighbor.col}`] =
                                distanceToNeighbor + heuristicCost;
                            unvisitedNodes.enqueue(neighbor, totalCosts[`${neighbor.row}-${neighbor.col}`]);
                        }
                    }
                });
            }
        }
        return [visitedNodes, shortestPathNodes.reverse()];
    }
    exports.aStar = aStar;
});
