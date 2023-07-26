import {sortNodesAstar, updateUnvisitedNeighborsAstar, getAllNodes} from './algorithmFunctions';

export function astar(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return null;
      }
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.f = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesAstar(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.f === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighborsAstar(closestNode, grid, finishNode);
    }
}

