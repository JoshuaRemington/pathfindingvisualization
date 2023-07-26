import React, {Component} from "react";
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra} from '../algorithms/dijkstra';
import {getNodesInShortestPathOrder} from "../algorithms/algorithmFunctions";
import {bfs} from '../algorithms/bfs';
import {dfs} from '../algorithms/dfs';
import {astar} from '../algorithms/astar';
import {greedyBFS} from "../algorithms/greedy";
import { randomMaze, recursiveDivision, randomWeightMaze } from "../mazes/mazes";
import Finish from '../Assets/Target.png';
import Start from '../Assets/Start.png';
import Wall from '../Assets/Wall.jpg';
import Weight from '../Assets/Weight.png';
import visited1 from '../Assets/visitedNode1.jpg';
import visited2 from '../Assets/visitedNode2.jpg';
import shortestPath from '../Assets/shortestPathNode.jpg';
import Navbar from "./Menu/Navbar";
import Tutorial from "../Tutorial/tutorial";

let START_NODE_ROW = 15;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 15;
let FINISH_NODE_COL = 35;
let SECOND_FINISH_NODE_ROW = 15;
let SECOND_FINISH_NODE_COL = 25;

let placedStart = true;
let placedFinish = true;
let placedTarget = true;
let previousRunDone = true;
let currentlyDisplaying = false;
let currentAlgorithm = 'Dijkstra\'s Algorithm';
let currentAlgorithmText = 'Dijkstra\'s Algorithm';
let isWeightedAlgo = 'weighted';
let doesGuarantee = 'guarantee';
let instant = false;
//const imageTest = {width: '50px', height: '50px'};

export default class pathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            isAlgoExpanded: false,
            isSpeedExpanded: false,
            isMazeExpanded: false,
            isTutorialOpen: true,
            speed: 15,
            currentSpeed: 'Fast',
            weightOrWall: 'Wall',
            targetOnOff: 'Add Target',
        };
    }
    setIsAlgoExpanded() {
        this.setState(prevState => ({isAlgoExpanded: !prevState.isAlgoExpanded}));
    }
    
    setIsSpeedExpanded() {
        this.setState(prevState => ({isSpeedExpanded: !prevState.isSpeedExpanded}));
    }

    setIsMazeExpanded() {
        this.setState(prevState => ({isMazeExpanded: !prevState.isMazeExpanded}));
    }

    setIsTutorialOpen() {
        this.setState(prevState =>({isTutorialOpen: !prevState.isTutorialOpen}));
    }

    changeSpeed(parameter) {
        if(parameter === 'Normal'){
            const speed = 50;
            this.setState({speed});
            const currentSpeed = 'Normal';
            this.setState({currentSpeed});
        }
        else if(parameter === 'Slow'){
            const speed = 400;
            this.setState({speed});
            const currentSpeed = 'Slow';
            this.setState({currentSpeed});
        }
        else if(parameter === 'Instant') {
            const speed = 0.00001;
            this.setState({speed});
            const currentSpeed = 'Instant';
            this.setState({currentSpeed});
        }
        else {
            const speed = 15;
            this.setState({speed});
            const currentSpeed = 'Fast';
            this.setState({currentSpeed});
        }
    }

    setWallOrWeight() {
        if(this.state.weightOrWall === 'Wall') {
            this.setState({weightOrWall: 'Weight'});
        }
        else {
            this.setState({weightOrWall: 'Wall'});
        }
    }

    setTarget() {
        if(!placedTarget)
            return;
        if(this.state.targetOnOff === 'Add Target'){
            this.setState({targetOnOff: 'Remove Target'})
            const grid = this.state.grid;
            grid[SECOND_FINISH_NODE_ROW][SECOND_FINISH_NODE_COL].isTarget = true;
            this.setState({grid});
            document.getElementById(`node-${SECOND_FINISH_NODE_ROW}-${SECOND_FINISH_NODE_COL}`).className =
                'node node-target';
        }
        else {
            this.setState({targetOnOff: 'Add Target'})
            document.getElementById(`node-${SECOND_FINISH_NODE_ROW}-${SECOND_FINISH_NODE_COL}`).className =
                'node';
            const grid = this.state.grid;
            grid[SECOND_FINISH_NODE_ROW][SECOND_FINISH_NODE_COL].isTarget = false;
            this.setState({grid});
            SECOND_FINISH_NODE_ROW = 15;
            SECOND_FINISH_NODE_COL = 25;
        }
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }
    
    handleMouseDown(row,col) {
        if(!previousRunDone) return; 
        let newGrid = this.state.grid;
        if(row === START_NODE_ROW && col === START_NODE_COL) {
            document.getElementById(`node-${row}-${col}`).className = 'node';
            newGrid[row][col].isStart = false;
            placedStart = false;
            START_NODE_ROW = -1000;
        }
        else if(placedStart === false){
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
            newGrid[row][col].isStart = true;
            newGrid[row][col].isWeight = false;
            newGrid[row][col].isWall = false;
            placedStart = true;
            START_NODE_COL = col;
            START_NODE_ROW = row;
            if(currentlyDisplaying) {
                const newGrid = resetForNextRun(this.state.grid);
                this.setState({newGrid});
                instant = true;
                this.runAlgorithm(currentAlgorithm);
            }
        }
        else if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            document.getElementById(`node-${row}-${col}`).className = 'node';
            newGrid[row][col].isFinish = false;
            placedFinish = false;
            FINISH_NODE_ROW = -1000;
        }
        else if(placedFinish === false){
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
            newGrid[row][col].isFinish = true;
            newGrid[row][col].isWeight = false;
            newGrid[row][col].isWall = false;
            placedFinish = true;
            FINISH_NODE_COL = col;
            FINISH_NODE_ROW = row;
            if(currentlyDisplaying) {
                const newGrid = resetForNextRun(this.state.grid);
                this.setState({newGrid});
                instant = true;
                this.runAlgorithm(currentAlgorithm);
            }
        }
        else if(this.state.targetOnOff === 'Remove Target' && row === SECOND_FINISH_NODE_ROW && col === SECOND_FINISH_NODE_COL) {
            document.getElementById(`node-${row}-${col}`).className = 'node';
            newGrid[row][col].isTarget = false;
            placedTarget = false;
            SECOND_FINISH_NODE_ROW = -1000;
        }
        else if(placedTarget === false){
            document.getElementById(`node-${row}-${col}`).className = 'node node-target';
            newGrid[row][col].isTarget = true;
            newGrid[row][col].isWeight = false;
            newGrid[row][col].isWall = false;
            this.setState({newGrid});
            placedTarget = true;
            SECOND_FINISH_NODE_COL = col;
            SECOND_FINISH_NODE_ROW = row;
            if(currentlyDisplaying) {
                const newGrid = resetForNextRun(this.state.grid);
                this.setState({newGrid});
                instant = true;
                this.runAlgorithm(currentAlgorithm);
            }
        }
        else if(this.state.weightOrWall === 'Wall' && newGrid[row][col].isWeight === false) {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({mouseIsPressed: true});
        }
        else if(this.state.weightOrWall === 'Weight'){
            newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
            this.setState({mouseIsPressed: true});
        }
        this.setState({grid: newGrid});
    }

    handleMouseEnter(row, col) {
        if(!this.state.mouseIsPressed || this.state.grid[row][col].isStart || this.state.grid[row][col].isFinish) return;
        let newGrid = this.state.grid;
        if (this.state.weightOrWall === 'Wall' && newGrid[row][col].isWeight === false) {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        }
        else  if(this.state.weightOrWall === 'Weight'){
            newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
        }
        this.setState({grid: newGrid});
    }
    
    handleMouseUp() {
        this.setState({mouseIsPressed: false})
    }
    

    animate(visitedNodesInOrder, nodesInShortestPathOrder, otherColor) {
        let timerForTarget;
        let otherColorText = '';
        if(otherColor)
            otherColorText = '-other-color';
        previousRunDone = false;
        for (let i = 0; visitedNodesInOrder && i <= visitedNodesInOrder.length && !instant; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                  this.animateShortestPath(nodesInShortestPathOrder);
                }, this.state.speed * i);
                timerForTarget = this.state.speed * i;
              }
          setTimeout(() => {
            let node = visitedNodesInOrder[i];
            if(!node)
                return;
            else if(node.isShortestAnimated)
                node.isShortestAnimated = true; //do nothing, makes sure we dont animate over it
            else if(node.isWeight) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-weight-visited${otherColorText}`;
            }
            else if(node.isStart)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-start-visited${otherColorText}`;
            else if(node.isFinish)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-finish-visited${otherColorText}`;
            else if(node.isTarget)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-target-visited${otherColorText}`;
            else
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-visited${otherColorText}`;
          }, this.state.speed * i);
        }
        for (let i = 0; visitedNodesInOrder &&  i <= visitedNodesInOrder.length && instant; i++) {
            if (i === visitedNodesInOrder.length) {
                this.animateShortestPath(nodesInShortestPathOrder);
                return;
            }
            let node = visitedNodesInOrder[i];
            if(node.isWeight)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-weight-visited-instant${otherColorText}`;
            else if(node.isShortestAnimated)
                node.isShortestAnimated = true; //do nothing, makes sure we dont animate over it
            else if(node.isStart)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-start-visited${otherColorText}`;
            else if(node.isFinish)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-finish-visited${otherColorText}`;
            else if (node.isTarget)
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node node-target-visited${otherColorText}`;
            else
                document.getElementById(`node-${node.row}-${node.col}`).className =
                `node node-visited-instant${otherColorText}`;
          }
          return timerForTarget;
    }
    
      animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0;nodesInShortestPathOrder && i < nodesInShortestPathOrder.length && !instant; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            if(node.isStart) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-start-shortest';
                    node.isShortestAnimated = true;
            }
            else if(node.isFinish){
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-finish-shortest';
                    node.isShortestAnimated = true;
            }
            else if(node.isWeight) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-weight-shortest';
                    node.isShortestAnimated = true;
            }
            else if(node.isTarget) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-target-shortest';
                    node.isShortestAnimated = true;
            }
            else {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
                    node.isShortestAnimated = true;
            }
          }, (this.state.speed*3) * i);
        }
        for (let i = 0;nodesInShortestPathOrder && i < nodesInShortestPathOrder.length && instant; i++) {
            const node = nodesInShortestPathOrder[i];
            if(node.isStart) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-start-shortest-instant';
                    node.isShortestAnimated = true;
            }
            else if(node.isFinish) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-finish-shortest-instant';
                    node.isShortestAnimated = true;
            }
            else if(node.isWeight) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-weight-shortest-instant';
                    node.isShortestAnimated = true;
            }
            else if(node.isTarget) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-target-shortest';
                    node.isShortestAnimated = true;
            } 
            else {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path-instant';
                    node.isShortestAnimated = true;
            }
        }
        if(nodesInShortestPathOrder)
            setTimeout(() => {previousRunDone = true;}, 50 * nodesInShortestPathOrder.length);
        currentlyDisplaying = true;
      }   
    
      async visualize(algorithmToRun, targetTrue, otherColor) {
        if(placedFinish === false || placedStart === false) return;
        const {grid} = this.state;
        let visitedNodesInOrder;
        let nodesInShortestPathOrder = [];
        let startNode = grid[START_NODE_ROW][START_NODE_COL];
        let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let targetNode = grid[SECOND_FINISH_NODE_ROW][SECOND_FINISH_NODE_COL];
        
        if(targetTrue === 1) {
            switch(algorithmToRun) {
                case 'Dijkstra\'s Algorithm': visitedNodesInOrder = dijkstra(grid, startNode, targetNode); break;
                case 'A*': visitedNodesInOrder = astar(grid, startNode, targetNode); break;
                case 'Gbfs': visitedNodesInOrder = greedyBFS(grid, startNode, targetNode); break;
                case 'Bfs': visitedNodesInOrder = bfs(grid, startNode, targetNode); break;
                case 'Dfs': visitedNodesInOrder = dfs(grid, startNode, targetNode); break;
                default: return;
            }
            nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
        }
        else if(targetTrue === 2) {
            switch(algorithmToRun) {
                case 'Dijkstra\'s Algorithm': visitedNodesInOrder = dijkstra(grid, targetNode, finishNode); break;
                case 'A*': visitedNodesInOrder = astar(grid, targetNode, finishNode); break;
                case 'Gbfs': visitedNodesInOrder = greedyBFS(grid, targetNode, finishNode); break;
                case 'Bfs': visitedNodesInOrder = bfs(grid, targetNode, finishNode); break;
                case 'Dfs': visitedNodesInOrder = dfs(grid, targetNode, finishNode); break;
                default: return;
            }
            nodesInShortestPathOrder = nodesInShortestPathOrder.concat(getNodesInShortestPathOrder(finishNode));
        } 
        else {
            switch(algorithmToRun) {
            case 'Dijkstra\'s Algorithm': visitedNodesInOrder = dijkstra(grid, startNode, finishNode); break;
            case 'A*': visitedNodesInOrder = astar(grid, startNode,finishNode); break;
            case 'Gbfs': visitedNodesInOrder = greedyBFS(grid, startNode, finishNode); break;
            case 'Bfs': visitedNodesInOrder = bfs(grid, startNode, finishNode); break;
            case 'Dfs': visitedNodesInOrder = dfs(grid, startNode, finishNode); break;
            default: return;
        }
        nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        }

        let temp = this.animate(visitedNodesInOrder, nodesInShortestPathOrder, otherColor);
        return temp;
      }

      run(algorithmToRun) {
        instant = false;
        this.runAlgorithm(algorithmToRun);
      }

      runAlgorithm(algorithmToRun) {
        if(!previousRunDone) return;
        const newGrid = resetForNextRun(this.state.grid);
        this.setState({newGrid});
        currentAlgorithm = algorithmToRun;
        if(this.state.targetOnOff === 'Remove Target') {
            let otherColor = true;
            let normal = false;
            this.targetVisualization(algorithmToRun, normal, otherColor);
        }
        else {
            this.visualize(algorithmToRun, 0);
        }
        return true;
      }

      targetVisualization = async (algorithmToRun, normal, otherColor) => {
        const temp = await this.visualize(algorithmToRun, 1, normal);
        const newGrid = resetForNextRunWithTarget(this.state.grid);
        this.setState({newGrid});
        if(!temp)
            console.log('not working');
        setTimeout(() =>
            this.visualize(algorithmToRun, 2, otherColor), temp);
      }


      resetGridToStartPosition()  {
        if(!previousRunDone) return;
        const grid = this.state.grid;
        for(let row = 0; row <30; row++) {
            for(let col = 0; col < 50; col++) {
                document.getElementById(`node-${row}-${col}`).className = 'node';
                grid[row][col].distance = Infinity;
                grid[row][col].f = Infinity;
                grid[row][col].hueristic = Infinity;
                grid[row][col].isVisited = false;
                grid[row][col].previousNode = null;
                grid[row][col].isWall = false;
                grid[row][col].isStart = false;
                grid[row][col].isFinish = false;
                grid[row][col].isWeight = false;
                grid[row][col].isTarget = false;
                grid[row][col].isShortestAnimated = false;
            }
        }
        grid[15][15].isStart = true;
        grid[15][35].isFinish = true;
        document.getElementById(`node-${15}-${15}`).className = 'node node-start';
        document.getElementById(`node-${15}-${35}`).className = 'node node-finish';
        START_NODE_ROW = 15;
        START_NODE_COL = 15;
        FINISH_NODE_ROW = 15;
        FINISH_NODE_COL = 35;
        SECOND_FINISH_NODE_ROW = 15;
        SECOND_FINISH_NODE_COL = 25;
        currentlyDisplaying = false;
        instant = false;
        if(this.state.targetOnOff === 'Remove Target')
            this.setTarget();
        return grid;
    };

    async clearWallAndWeights(){
        const grid = this.state.grid;
        for(let row = 0; row <30; row++) {
            for(let col = 0; col < 50; col++) {
                if(grid[row][col].isWeight || grid[row][col].isWall) {
                    document.getElementById(`node-${row}-${col}`).className = 'node';
                    grid[row][col].isWall = false;
                    grid[row][col].isWeight = false;
                }
            }
        }
        this.setState(grid);
        return true;
    }
 
    changeCurrentAlgorithm(text){
        currentAlgorithm = text;  
        switch(currentAlgorithm) {
            case 'Dijkstra\'s Algorithm': currentAlgorithmText = 'Dijkstra\'s Algorithm'; 
            isWeightedAlgo = 'weighted'; doesGuarantee = 'guarantees'; break;
            case 'A*': currentAlgorithmText = 'A* Search'; 
            isWeightedAlgo = 'weighted'; doesGuarantee = 'guarantees'; break;
            case 'Gbfs': currentAlgorithmText = 'Greedy Best-first Search'; 
            isWeightedAlgo = 'weighted'; doesGuarantee = 'does not guarantee'; break;
            case 'Bfs': currentAlgorithmText = 'Breath-first Search'; 
            isWeightedAlgo = 'unweighted'; doesGuarantee = 'guarantees'; break;
            case 'Dfs': currentAlgorithmText = 'Depth-first Search'; 
            isWeightedAlgo = 'unweighted'; doesGuarantee= 'does not guarantee'; break;
            default: return;
        }
    }

    generateMaze = async (mazeToGenerate) => {
        let grid = this.state.grid;
        resetForNextRun(grid);
        this.setState({grid});
        let maze;
        let wallToggle = true;
        let generate = await this.clearWallAndWeights();
        if(generate) {
            switch(mazeToGenerate) {
                case 'recursive': maze = recursiveDivision(this.state.grid); break;
                case 'random': maze = randomMaze(this.state.grid); break;
                case 'weight': maze = randomWeightMaze(this.state.grid); wallToggle = false; break;
                default: return;
            }
            for(let i = 0; i < maze.length; i++) {
                setTimeout(() => {let node = maze[i];
                    if(wallToggle)
                        getNewGridWithWallToggled(grid, node.row, node.col);
                    else
                        getNewGridWithWeightToggled(grid, node.row, node.col);
                    this.setState(grid)}, i*10)
            }
        }
    }


    render() {
        const {
            grid, 
            mouseIsPressed, 
            isAlgoExpanded, 
            isSpeedExpanded, 
            isMazeExpanded,
            weightOrWall, 
            currentSpeed, 
            targetOnOff,
            isTutorialOpen,
        } = this.state;
        return (
            <>
            <Navbar 
            currentAlgo={currentAlgorithmText}
            currentSpeed={currentSpeed}
            algoCurrentlyExpanded={isAlgoExpanded}
            speedCurrentlyExpanded={isSpeedExpanded}
            mazeCurrentlyExpanded={isMazeExpanded}
            textForWeightOrWall={weightOrWall}
            targetText={targetOnOff}
            setAlgoExpanded={() => this.setIsAlgoExpanded()}
            setSpeedExpanded={() => this.setIsSpeedExpanded()}
            setMazeExpanded={() => this.setIsMazeExpanded()}
            changeWallOrWeight={() => this.setWallOrWeight()}
            visualizeOnClick={() => this.run(currentAlgorithm)}
            resetOnClick={() => this.resetGridToStartPosition()}
            changeDijkstra={() => this.changeCurrentAlgorithm('Dijkstra\'s Algorithm')}
            changeAstar={() => this.changeCurrentAlgorithm('A*')}
            changeGBFS={() => this.changeCurrentAlgorithm('Gbfs')}
            changeBfs={() => this.changeCurrentAlgorithm('Bfs')}
            changeDfs={() => this.changeCurrentAlgorithm('Dfs')}
            changeToSlow={() => this.changeSpeed('Slow')}
            changeToFast={() => this.changeSpeed('Fast')}
            changeToInstant={() => this.changeSpeed('Instant')}
            changeToNormal={() => this.changeSpeed('Normal')}
            clearWallAndWeight={() => this.clearWallAndWeights()}
            recursiveMaze={() => this.generateMaze('recursive')}
            randomMaze={() => this.generateMaze('random')}
            weightMaze={() => this.generateMaze('weight')}
            setTarget={() => this.setTarget()}
            setTutorial={() => this.setIsTutorialOpen()}
            ></Navbar>
            <div className="txt"><img className="img" src={Start} alt="Start"></img>Start Node</div>
            <div className="txt"><img className="img" src={Finish} alt="Finish"></img>Target Node</div>
            <div className="txt"><img className="img" src={Wall} alt="Wall"></img>Wall Node</div>
            <div className="txt"><img className="img" src={Weight} alt="Weight"></img>Weight Node</div>
            <div className="txt"><img className="img" src={visited1} alt="Visited1"></img><img className="img" src={visited2} alt="Visited2"></img>Visited Nodes</div>
            <div className="txt"><img className="img" src={shortestPath} alt="Shortest"></img>Shortest Path</div>
            <div className='text'>{currentAlgorithmText} is <strong>{isWeightedAlgo}</strong> and <strong>{doesGuarantee}</strong> the shortest path!</div>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall, isWeight, isTarget} = node;
                                return (
                                    <Node 
                                    key={nodeIdx}
                                    col={col}
                                    row={row}
                                    isFinish={isFinish}
                                    isTarget={isTarget}
                                    isStart={isStart}
                                    isWall={isWall}
                                    isWeight={isWeight}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row,col) => this.handleMouseDown(row,col)}
                                    onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
                                    onMouseUp={() => this.handleMouseUp()}></Node>
                                );  
                            })}
                        </div>
                    );
                })}
            </div>
            <Tutorial
            tutorialCurrentlyExpanded={isTutorialOpen}
            setTutorialExpanded={() => this.setIsTutorialOpen()}
            ></Tutorial>
            </>
        );
    }
    
}



const getInitialGrid = () => {
    const grid = [];
    for(let row = 0; row <30; row++) {
        const currentRow = [];
        for(let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const resetForNextRun = (grid) => {
    for(let row = 0; row <30; row++) {
        for(let col = 0; col < 50; col++) {
            if(grid[row][col].isWeight) 
                document.getElementById(`node-${row}-${col}`).className =
                    'node node-weight';
            else if(grid[row][col].isStart)
                document.getElementById(`node-${row}-${col}`).className =
                    'node node-start';
            else if(grid[row][col].isFinish){
                document.getElementById(`node-${row}-${col}`).className =
                    'node node-finish';
                }   
            else if(grid[row][col].isTarget) {
                document.getElementById(`node-${row}-${col}`).className =
                    'node node-target';
            }
            else if(!grid[row][col].isWall) {
                document.getElementById(`node-${row}-${col}`).className =
                    'node';
            }
            grid[row][col].distance = Infinity;
            grid[row][col].f = Infinity;
            grid[row][col].hueristic = Infinity;
            grid[row][col].isVisited = false;
            grid[row][col].previousNode = null;
            grid[row][col].isShortestAnimated = null;
        }
    }
    return grid;
};

const resetForNextRunWithTarget = (grid) => {
    for(let row = 0; row <30; row++) {
        for(let col = 0; col < 50; col++) {
            grid[row][col].distance = Infinity;
            grid[row][col].f = Infinity;
            grid[row][col].hueristic = Infinity;
            grid[row][col].isVisited = false;
            grid[row][col].previousNode = null;
        }
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        f: Infinity,
        hueristic: Infinity,
        isWeight: false,
        isWall: false,
    };
};


export const getNewGridWithWallToggled = (grid, row, col) => {
    if(!previousRunDone || grid[row][col].isStart || grid[row][col].isFinish) return;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

export const getNewGridWithWeightToggled = (grid, row, col) => {
    if(!previousRunDone || grid[row][col].isStart || grid[row][col].isFinish) return;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWeight: !node.isWeight,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };