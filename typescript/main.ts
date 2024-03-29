import Node from "./node";
import dijkstra from "./dijkstra";
import greedyBestFirstSearch from "./greedy";
import depthFirstSearch from "./dfs";
import { aStar } from "./astar";
import { algDescriptions } from "./algDescriptions";
import { Algorithm } from "./types";
import { createGrid } from "./createGrid";
import { createHTMLTableFromNodes } from "./createHTMLTable";
import { setLearnMoreModal } from "./learnMore";

let startNode = new Node(10, 2, true);
let endNode = new Node(8, 8, false, true);

const ROW_COUNT = Math.floor((window.innerHeight * 0.75) / 20);
const COL_COUNT = Math.floor(window.innerWidth / 20);
const ALGORITHMS: { [key: string]: Algorithm } = {
  Dijkstra: {
    alg: dijkstra,
    title: "Dijkstra",
    desc: algDescriptions.dijkstra,
    ytVideoID: "pVfj6mxhdMw",
  },
  Greedy: {
    alg: greedyBestFirstSearch,
    title: "Greedy Best First Search",
    desc: "desc",
    ytVideoID: "HMAHrQHmrUQ",
  },
  DFS: {
    alg: depthFirstSearch,
    title: "Depth First Search",
    desc: "DFS desc",
    ytVideoID: "Urx87-NMm6c",
  },
  "A*": {
    alg: aStar,
    title: "A*",
    desc: "A* desc",
    ytVideoID: "71CEj4gKDnE",
  },
};
let SELECTED_ALGORITHM = "Dijkstra"; //change the way this works its stupid
let VISUALISATION_SPEED = 0.1;
const gridNodes = createGrid(startNode, endNode, ROW_COUNT, COL_COUNT);

const algorithmSelector = document.getElementById("algorithm-selector");
if (algorithmSelector instanceof HTMLSelectElement) {
  Object.keys(ALGORITHMS).forEach((algorithm) =>
    algorithmSelector.add(new Option(algorithm))
  );
  algorithmSelector.onchange = () => {
    SELECTED_ALGORITHM = algorithmSelector.value;
    setLearnMoreModal(ALGORITHMS[SELECTED_ALGORITHM]);
  };
}

const visualisationSpeedSelector = document.getElementById(
  "visualisation-speed-selector"
);
if (visualisationSpeedSelector instanceof HTMLInputElement) {
  visualisationSpeedSelector.onchange = () =>
    (VISUALISATION_SPEED = Number(visualisationSpeedSelector.value));
}

createHTMLTableFromNodes(ROW_COUNT, COL_COUNT, gridNodes);
setLearnMoreModal(ALGORITHMS[SELECTED_ALGORITHM]);

function updateTerminalNodePositions(node: Node, direction: string) {
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
    } else if (isEnd) {
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
    startControl.onclick = () =>
      updateTerminalNodePositions(startNode, direction);
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
  const [visitedNodes, shortestPathNodes] = ALGORITHMS[SELECTED_ALGORITHM].alg(
    startNode,
    endNode,
    gridNodes
  );
  visitedNodes.forEach((node, idx) => {
    const cell = document.getElementById(`${node.row}-${node.col}`);
    if (cell) {
      cell.classList.add("visited-cell");
      cell.style.animationDelay = `${(idx + 1) * (0.2 - VISUALISATION_SPEED)}s`;
    }
  });

  const highlightShortestPath = () => {
    shortestPathNodes.forEach((node, idx) => {
      const shortestPathCell = document.getElementById(
        `${node.row}-${node.col}`
      );
      if (shortestPathCell) {
        shortestPathCell.classList.replace(
          "visited-cell",
          "shortest-path-cell"
        );
        shortestPathCell.style.animationDelay = `${
          (idx + 1) * (0.2 - VISUALISATION_SPEED)
        }s`;
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
