var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./node", "./createGrid", "./createHTMLTable", "./dijkstra"], function (require, exports, node_1, createGrid_1, createHTMLTable_1, dijkstra_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    node_1 = __importDefault(node_1);
    const startNode = new node_1.default(10, 2, true);
    const endNode = new node_1.default(8, 8, false, true);
    const gridNodes = (0, createGrid_1.createGrid)(startNode, endNode);
    const ROW_COUNT = 20;
    const COL_COUNT = 20;
    const ALGORITHMS = {
        Dijkstra: dijkstra_1.dijkstra,
    };
    let SELECTED_ALGORITHM = "Dijkstra";
    let VISUALISATION_SPEED = 0.1;
    const algorithmSelector = document.getElementById("algorithm-selector");
    if (algorithmSelector instanceof HTMLSelectElement) {
        Object.keys(ALGORITHMS).forEach((algorithm) => algorithmSelector.add(new Option(algorithm)));
        algorithmSelector.onchange = () => (SELECTED_ALGORITHM = algorithmSelector.value);
    }
    const visualisationSpeedSelector = document.getElementById("visualisation-speed-selector");
    if (visualisationSpeedSelector instanceof HTMLInputElement) {
        visualisationSpeedSelector.onchange = () => (VISUALISATION_SPEED = Number(visualisationSpeedSelector.value));
    }
    (0, createHTMLTable_1.createHTMLTableFromNodes)(ROW_COUNT, COL_COUNT, gridNodes);
    const startBtn = document.getElementById("start-btn");
    function runVisualisation() {
        const [visitedNodes, shortestPathNodes] = ALGORITHMS[SELECTED_ALGORITHM](startNode, endNode, gridNodes);
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
                    shortestPathCell.style.animationDelay = `${(idx + 1) * 0.2 - VISUALISATION_SPEED}s`;
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
