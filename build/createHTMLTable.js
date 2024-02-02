define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createHTMLTableFromNodes = void 0;
    const tableEl = document.getElementById("grid-table");
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
                    if (currentNode.isEnd) {
                        cell.classList.add("end-node");
                    }
                    cell.onclick = () => {
                        console.log(cell.id);
                        console.log("Node details:", currentNode);
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
