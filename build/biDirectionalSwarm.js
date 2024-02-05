define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.biDirectionalSwarm = void 0;
    function biDirectionalSwarm(startNode, endNode, gridNodes) {
        const visitedNodes = [];
        const shortestPathNodes = [];
        const queueStart = [startNode];
        const queueEnd = [endNode];
        const prevNodesStart = {};
        const prevNodesEnd = {};
        while (queueStart.length > 0 && queueEnd.length > 0) {
            const currStartNode = queueStart.shift();
            const currEndNode = queueEnd.shift();
            visitedNodes.push(currStartNode, currEndNode);
            if (currStartNode === endNode || currEndNode === startNode) {
                shortestPathNodes.push(currStartNode);
                let currentNode = currStartNode;
                while (prevNodesStart[`${currentNode.row}-${currentNode.col}`]) {
                    currentNode = prevNodesStart[`${currentNode.row}-${currentNode.col}`];
                    shortestPathNodes.unshift(currentNode);
                }
                currentNode = currEndNode;
                while (prevNodesEnd[`${currentNode.row}-${currentNode.col}`]) {
                    currentNode = prevNodesEnd[`${currentNode.row}-${currentNode.col}`];
                    shortestPathNodes.push(currentNode);
                }
                break;
            }
            currStartNode.neighbours.forEach((neighbor) => {
                if (!prevNodesStart[`${neighbor.row}-${neighbor.col}`]) {
                    prevNodesStart[`${neighbor.row}-${neighbor.col}`] = currStartNode;
                    queueStart.push(neighbor);
                }
            });
            currEndNode.neighbours.forEach((neighbor) => {
                if (!prevNodesEnd[`${neighbor.row}-${neighbor.col}`]) {
                    prevNodesEnd[`${neighbor.row}-${neighbor.col}`] = currEndNode;
                    queueEnd.push(neighbor);
                }
            });
        }
        return [visitedNodes, shortestPathNodes];
    }
    exports.biDirectionalSwarm = biDirectionalSwarm;
});
