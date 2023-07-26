import {sortNodesGreedy, updateUnvisitedNeighborsAstar, getAllNodes} from './algorithmFunctions';

export function greedyBFS(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return null;
    }
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.hueristic = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesGreedy(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighborsAstar(closestNode, grid, finishNode);
    }
}