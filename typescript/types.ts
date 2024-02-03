import Node from "./node";

export type Algorithm = {
  alg: (
    startNode: Node,
    endNode: Node,
    gridNodes: Node[][]
  ) => [Node[], Node[]];
  title: string;
  desc: string;
  ytVideoID: string;
};
