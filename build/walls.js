define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setWall(node) {
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
            const cell = document.getElementById(`${node.row}-${node.col}`);
            if (cell instanceof HTMLTableCellElement) {
                node.isWall
                    ? cell.classList.add("wall-node")
                    : cell.classList.remove("wall-node");
            }
        }
    }
    exports.default = setWall;
});
