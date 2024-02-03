define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function depthFirstSearch(startNode, endNode, gridNodes) {
        const visitedNodes = [];
        const shortestPathNodes = [];
        const dfsVisit = (node) => {
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
    exports.default = depthFirstSearch;
});
