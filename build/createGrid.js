var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./node"], function (require, exports, node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createGrid = void 0;
    node_1 = __importDefault(node_1);
    function createGrid(startNode, endNode) {
        const gridNodes = [];
        for (let i = 0; i < 20; i++) {
            gridNodes[i] = [];
            for (let j = 0; j < 20; j++) {
                let newNode;
                if (i === startNode.row && j === startNode.col)
                    newNode = startNode;
                else if (i === endNode.row && j === endNode.col)
                    newNode = endNode;
                else
                    newNode = new node_1.default(i, j);
                gridNodes[i][j] = newNode;
            }
        }
        for (let i = 0; i < 19; i++) {
            for (let j = 0; j < 20; j++) {
                gridNodes[i][j].addNeighbour(gridNodes[i + 1][j]);
                gridNodes[i + 1][j].addNeighbour(gridNodes[i][j]);
            }
        }
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 19; j++) {
                gridNodes[i][j].addNeighbour(gridNodes[i][j + 1]);
                gridNodes[i][j + 1].addNeighbour(gridNodes[i][j]);
            }
        }
        return gridNodes;
    }
    exports.createGrid = createGrid;
});
