define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.algDescriptions = void 0;
    exports.algDescriptions = {
        dijkstra: `Start: Begin at a chosen node.\n

    Explore: Move to neighboring nodes, updating their distances if a shorter path is found.\n
    
    Priority: Always choose the node with the shortest known distance to explore next.\n
    
    Repeat: Continue exploring and updating distances until the destination is reached or all nodes are visited.\n
    
    Shortest Path: Reconstruct the shortest path by backtracking from the destination to the start.\n
    
    Optimality: Guarantees finding the shortest path due to the priority-based exploration.\n
    
    Termination: Stops when the destination is reached or all nodes are visited.`,
    };
});
