var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./priorityQueue"], function (require, exports, priorityQueue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    priorityQueue_1 = __importDefault(priorityQueue_1);
    function greedyBestFirstSearch(startNode, endNode, gridNodes) {
        const visitedNodes = [];
        const shortestPathNodes = [];
        const heuristic = (node) => {
            const dx = node.row - endNode.row;
            const dy = node.col - endNode.col;
            return Math.sqrt(dx * dx + dy * dy);
        };
        const unvisitedNodes = new priorityQueue_1.default();
        const prevNodes = {};
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
    exports.default = greedyBestFirstSearch;
});
