import Node from "./node";

export default function setWall(node: Node) {
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
