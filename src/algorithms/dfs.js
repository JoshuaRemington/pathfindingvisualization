import {getAllNodes, changeNeighborDistance} from './algorithmFunctions';

export function dfs(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return null;
      }
    const visitedNodesInOrder = [];
    let closestNode = startNode;
    visitedNodesInOrder.push(closestNode);
    let neighborArray = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        if(!closestNode) return visitedNodesInOrder;
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) return visitedNodesInOrder;
        neighborArray = changeNeighborDistance(closestNode, grid, neighborArray);
        closestNode = neighborArray.shift();
    }
    return visitedNodesInOrder;
}