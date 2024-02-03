var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./walls"], function (require, exports, walls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createHTMLTableFromNodes = void 0;
    walls_1 = __importDefault(walls_1);
    const tableEl = document.getElementById("grid-table");
    let isMouseDown = false;
    function createHTMLTableFromNodes(ROW_COUNT, COL_COUNT, gridNodes) {
        if (tableEl instanceof HTMLTableElement) {
            for (let i = 0; i < ROW_COUNT; i++) {
                const row = tableEl.insertRow();
                for (let j = 0; j < COL_COUNT; j++) {
                    const cell = row.insertCell();
                    const currentNode = gridNodes[i][j];
                    cell.id = `${i}-${j}`;
                    cell.classList.add("cell");
                    if (currentNode.isStart) {
                        cell.classList.add("start-node");
                    }
                    else if (currentNode.isEnd) {
                        cell.classList.add("end-node");
                    }
                    else if (currentNode.isWall) {
                        cell.classList.add("wall-node");
                    }
                    cell.onmousedown = () => {
                        isMouseDown = true;
                        (0, walls_1.default)(currentNode);
                    };
                    cell.onmousemove = () => {
                        if (isMouseDown && !currentNode.isWall) {
                            (0, walls_1.default)(currentNode);
                        }
                    };
                    cell.onmouseup = () => {
                        isMouseDown = false;
                    };
                }
            }
        }
        else {
            console.error("Grid table element not found");
        }
    }
    exports.createHTMLTableFromNodes = createHTMLTableFromNodes;
});
