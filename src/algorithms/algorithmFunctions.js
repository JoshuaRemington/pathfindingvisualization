export function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

export function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.distance === Infinity && neighbor.isWeight)
            neighbor.distance = node.distance + 11;
        else if (neighbor.distance === Infinity)
            neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

export function updateUnvisitedNeighborsBFS(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}


export function getUnvisitedNeighbors(node, grid) {
    let neighbors = [];
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    neighbors = neighbors.filter(neighbors => !neighbors.isWall)
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShoertestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
        nodesInShoertestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShoertestPathOrder;
}

export function updateUnvisitedNeighborsAstar(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        let distance = node.distance + 1;
        let distanceIsBest = false;
        if (neighbor.isWall)
            continue;
        else if (neighbor.distance === Infinity) {
            distanceIsBest = true;
            neighbor.hueristic = hueristic(neighbor, finishNode);
        }
        else if (distance <= neighbor.distance) {
            distanceIsBest = true;
        }

        if (neighbor.isWeight)
            neighbor.hueristic += 10;

        if (distanceIsBest) {
            neighbor.distance = distance;
            neighbor.f = neighbor.distance + neighbor.hueristic;
            neighbor.previousNode = node;
        }
    }
}

export function hueristic(node1, node2) {
    let temp1 = Math.abs(node2.row - node1.row);
    let temp2 = Math.abs(node2.col - node1.col);
    return temp1 + temp2;
}

export function sortNodesAstar(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f)
    let k = 0;
    while(unvisitedNodes[k].isWall)
        k++;
    let tempF = unvisitedNodes[k].f;
    let tempG = unvisitedNodes[k].distance;
    for(let i = 1; !unvisitedNodes[i].isWall && tempF === unvisitedNodes[i].f; i++)
        if(tempG < unvisitedNodes[i].distance){
            let tempNode = unvisitedNodes[k];
            unvisitedNodes[k] = unvisitedNodes[i];
            unvisitedNodes[i] = tempNode;
        }
            
}

export function changeNeighborDistance(node, grid, neighborArray) {
    neighborArray = getNextNodeDfs(node, grid, neighborArray);
    for (const neighbor of neighborArray) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
    return neighborArray;
}

export function getNextNodeDfs(node, grid, neighborArray) {
    const { col, row } = node;
    if (col > 0) neighborArray.unshift(grid[row][col - 1]);
    if (row < grid.length - 1) neighborArray.unshift(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighborArray.unshift(grid[row][col + 1]);
    if (row > 0) neighborArray.unshift(grid[row - 1][col]);
    neighborArray = neighborArray.filter(neighbor => !neighbor.isWall);
    return neighborArray.filter(neighbor => !neighbor.isVisited);
}

export function sortNodesGreedy(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.hueristic - nodeB.hueristic);
}