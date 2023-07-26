import {sortNodesByDistance, getAllNodes, updateUnvisitedNeighborsBFS} from './algorithmFunctions';

export function bfs(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return null;
      }
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighborsBFS(closestNode, grid);
    }
}

