define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(row, col, isStart = false, isEnd = false) {
            this.row = row;
            this.col = col;
            this.isStart = isStart;
            this.isEnd = isEnd;
            this.isVisited = false;
            this.neighbours = [];
        }
        reset() {
            this.isVisited = false;
        }
        addNeighbour(neighbour) {
            this.neighbours.push(neighbour);
        }
    }
    exports.default = Node;
});
