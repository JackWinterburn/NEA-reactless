var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./node", "./algDescriptions", "./createGrid", "./createHTMLTable", "./dijkstra", "./learnMore"], function (require, exports, node_1, algDescriptions_1, createGrid_1, createHTMLTable_1, dijkstra_1, learnMore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    node_1 = __importDefault(node_1);
    let startNode = new node_1.default(10, 2, true);
    let endNode = new node_1.default(8, 8, false, true);
    const ROW_COUNT = 20;
    const COL_COUNT = 40;
    const ALGORITHMS = {
        Dijkstra: {
            alg: dijkstra_1.dijkstra,
            title: "Dijkstra",
            desc: algDescriptions_1.algDescriptions.dijkstra,
            ytVideoID: "pVfj6mxhdMw",
        },
    };
    let SELECTED_ALGORITHM = "Dijkstra"; //change the way this works its stupid
    let VISUALISATION_SPEED = 0.1;
    const gridNodes = (0, createGrid_1.createGrid)(startNode, endNode, ROW_COUNT, COL_COUNT);
    const algorithmSelector = document.getElementById("algorithm-selector");
    if (algorithmSelector instanceof HTMLSelectElement) {
        Object.keys(ALGORITHMS).forEach((algorithm) => algorithmSelector.add(new Option(algorithm)));
        algorithmSelector.onchange = () => {
            SELECTED_ALGORITHM = algorithmSelector.value;
            (0, learnMore_1.setLearnMoreModal)(ALGORITHMS[SELECTED_ALGORITHM]);
        };
    }
    const visualisationSpeedSelector = document.getElementById("visualisation-speed-selector");
    if (visualisationSpeedSelector instanceof HTMLInputElement) {
        visualisationSpeedSelector.onchange = () => (VISUALISATION_SPEED = Number(visualisationSpeedSelector.value));
    }
    (0, createHTMLTable_1.createHTMLTableFromNodes)(ROW_COUNT, COL_COUNT, gridNodes);
    (0, learnMore_1.setLearnMoreModal)(ALGORITHMS[SELECTED_ALGORITHM]);
    function updateTerminalNodePositions(node, direction) {
        const { row, col, isStart, isEnd } = node;
        const cell = document.getElementById(`${row}-${col}`);
        if (cell instanceof HTMLTableCellElement) {
            let newRow = row;
            let newCol = col;
            switch (direction) {
                case "up":
                    newRow = Math.max(0, row - 1);
                    break;
                case "left":
                    newCol = Math.max(0, col - 1);
                    break;
                case "right":
                    newCol = Math.min(COL_COUNT - 1, col + 1);
                    break;
                case "down":
                    newRow = Math.min(ROW_COUNT - 1, row + 1);
                    break;
            }
            if (isStart) {
                startNode.isStart = false;
                startNode = gridNodes[newRow][newCol];
                startNode.isStart = true;
                cell.classList.remove("start-node");
                const newCell = document.getElementById(`${newRow}-${newCol}`);
                if (newCell instanceof HTMLTableCellElement) {
                    newCell.classList.add("start-node");
                }
            }
            else if (isEnd) {
                endNode.isEnd = false;
                endNode = gridNodes[newRow][newCol];
                endNode.isEnd = true;
                cell.classList.remove("end-node");
                const newCell = document.getElementById(`${newRow}-${newCol}`);
                if (newCell instanceof HTMLTableCellElement) {
                    newCell.classList.add("end-node");
                }
            }
        }
    }
    const directions = ["up", "left", "right", "down"];
    directions.forEach((direction) => {
        const startControl = document.getElementById(`${direction}-start`);
        const endControl = document.getElementById(`${direction}-end`);
        if (startControl instanceof HTMLButtonElement) {
            startControl.onclick = () => updateTerminalNodePositions(startNode, direction);
        }
        if (endControl instanceof HTMLButtonElement) {
            endControl.onclick = () => updateTerminalNodePositions(endNode, direction);
        }
    });
    function clearPaths() {
        gridNodes.forEach((row) => {
            row.forEach((node) => {
                node.isVisited = false;
                const cell = document.getElementById(`${node.row}-${node.col}`);
                if (cell instanceof HTMLTableCellElement) {
                    cell.classList.remove("visited-cell");
                    cell.classList.remove("shortest-path-cell");
                }
            });
        });
    }
    const clearPathsBtn = document.getElementById("clear-paths-btn");
    if (clearPathsBtn instanceof HTMLButtonElement) {
        clearPathsBtn.onclick = () => clearPaths();
    }
    function clearWalls() {
        gridNodes.forEach((row) => {
            row.forEach((node) => {
                node.isWall = false;
                const cell = document.getElementById(`${node.row}-${node.col}`);
                if (cell instanceof HTMLTableCellElement) {
                    cell.classList.remove("wall-node");
                }
            });
        });
    }
    const clearWallsBtn = document.getElementById("clear-walls-btn");
    if (clearWallsBtn instanceof HTMLButtonElement) {
        clearWallsBtn.onclick = () => clearWalls();
    }
    const startBtn = document.getElementById("start-btn");
    function runVisualisation() {
        const [visitedNodes, shortestPathNodes] = ALGORITHMS[SELECTED_ALGORITHM].alg(startNode, endNode, gridNodes);
        visitedNodes.forEach((node, idx) => {
            const cell = document.getElementById(`${node.row}-${node.col}`);
            if (cell) {
                cell.classList.add("visited-cell");
                cell.style.animationDelay = `${(idx + 1) * (0.2 - VISUALISATION_SPEED)}s`;
            }
        });
        const highlightShortestPath = () => {
            shortestPathNodes.forEach((node, idx) => {
                const shortestPathCell = document.getElementById(`${node.row}-${node.col}`);
                if (shortestPathCell) {
                    shortestPathCell.classList.replace("visited-cell", "shortest-path-cell");
                    shortestPathCell.style.animationDelay = `${(idx + 1) * (0.2 - VISUALISATION_SPEED)}s`;
                }
            });
        };
        const delay = visitedNodes.length * (0.2 - VISUALISATION_SPEED) * 1000 + 300; //milliseconds
        setTimeout(highlightShortestPath, delay);
    }
    if (startBtn) {
        startBtn.onclick = () => {
            runVisualisation();
        };
    }
});
