import Node from "./node";
import setWall from "./walls";

const tableEl = document.getElementById("grid-table");

let isMouseDown = false;

export function createHTMLTableFromNodes(
  ROW_COUNT: number,
  COL_COUNT: number,
  gridNodes: Node[][]
) {
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
        } else if (currentNode.isEnd) {
          cell.classList.add("end-node");
        } else if (currentNode.isWall) {
          cell.classList.add("wall-node");
        }

        cell.onmousedown = () => {
          isMouseDown = true;
          setWall(currentNode);
        };

        cell.onmousemove = () => {
          if (isMouseDown && !currentNode.isWall) {
            setWall(currentNode);
          }
        };

        cell.onmouseup = () => {
          isMouseDown = false;
        };
      }
    }
  } else {
    console.error("Grid table element not found");
  }
}
