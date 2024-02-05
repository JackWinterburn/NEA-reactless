define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(row, col, isStart = false, isEnd = false, isWall = false) {
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
            const unvisitedNeighbours = [];
            this.neighbours.forEach((neighbour) => {
                if (!neighbour.isVisited)
                    unvisitedNeighbours.push(neighbour);
            });
            return unvisitedNeighbours;
        }
        addNeighbour(neighbour) {
            this.neighbours.push(neighbour);
        }
    }
    exports.default = Node;
});
