import React, {Component} from "react";
import './Navbar.css';

export default class Navbar extends Component{
    render() {
        const {
            visualizeOnClick,
            resetOnClick,
            clearWallAndWeight,
            changeDijkstra,
            changeAstar,
            changeGBFS,
            changeBfs,
            changeDfs,
            algoCurrentlyExpanded,
            speedCurrentlyExpanded,
            mazeCurrentlyExpanded,
            setAlgoExpanded,
            setSpeedExpanded,
            setMazeExpanded,
            currentAlgo,
            currentSpeed,
            textForWeightOrWall,
            changeWallOrWeight,
            changeToSlow,
            changeToNormal,
            changeToFast,
            changeToInstant,
            targetText,
            setTarget,
            recursiveMaze,
            randomMaze,
            weightMaze,
            setTutorial,
        } = this.props;
        return (
            <div>
            <div
            className='navbar'
            id='navbar'
            >
                <div className='title-text'>
                    Pathfinding Visualizer
                </div>
            </div >
            <div className='navbar'
            id='navbar'>
                <div>
                    <button
                    onClick={() => setAlgoExpanded()}
                    className="button-to-dropdown">
                        Algorithms
                        {algoCurrentlyExpanded && 
                    <div className="dropdown">
                        <button className="text-to-change-algorithm"  
                        style={{borderRadius: '5px 5px 0 0'}}
                        onClick={() => {changeDijkstra()}}
                        >
                            Dijkstra's Algorithm</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => changeAstar()}>
                            A* Search</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => changeGBFS()}>
                            Greedy Best-first Search</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => changeBfs()}>
                            Breadth-first Search</button>
                        <button className="text-to-change-algorithm" 
                        style={{borderRadius: '0 0 5px 5px'}}
                        onClick={() => changeDfs()}>
                            Depth-first Search</button>
                    </div>
                }
                        <div className="arrow"></div>
                    </button>
                </div>
                <button className='button'
                onClick={() => setTarget()}>
                    {targetText}
                </button>
                <button
                    className="button"
                    onClick={() => changeWallOrWeight()}>
                        Wall/Weight: {textForWeightOrWall}
                    </button>
                <button className='visualize-button'
                onClick={() => visualizeOnClick()}>
                    Visualize {currentAlgo}
                </button>
                <button
                    onClick={() => setMazeExpanded()}
                    className="button-to-dropdown">
                        Mazes
                        {mazeCurrentlyExpanded && 
                    <div className="dropdown">
                        <button className="text-to-change-algorithm"  
                        style={{borderRadius: '5px 5px 0 0'}}
                        onClick={() => {recursiveMaze()}}
                        >
                            Recursive Definition</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => {randomMaze()}}
                        >
                            Random Maze</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => {weightMaze()}}
                        style={{borderRadius: '0 0 5px 5px'}}
                        >
                            Weight Maze</button>
                    </div>
                }
                <div className="arrow"></div>
                        </button>
                <button className='button'
                onClick={() => resetOnClick()}>
                    Reset
                </button>
                <button className='button'
                onClick={() => clearWallAndWeight()}>
                    Clear Walls & Weights
                </button>
                <div>
                    <button
                    onClick={() => setSpeedExpanded()}
                    className="button-to-dropdown">
                        Speed: {currentSpeed}
                        {speedCurrentlyExpanded && 
                    <div className="dropdown">
                        <button className="text-to-change-algorithm"  
                        style={{borderRadius: '5px 5px 0 0'}}
                        onClick={() => {changeToFast()}}
                        >
                            Fast</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => changeToNormal()}>
                            Normal</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => changeToSlow()}>
                            Slow</button>
                        <button className="text-to-change-algorithm"
                        onClick={() => changeToInstant()}
                        style={{borderRadius: '0 0 5px 5px'}}>
                            Instant</button>
                    </div>
                }
                        <div className="arrow"></div>
                        </button>
                </div>
                <button className='button'
                onClick={() => setTutorial()}>
                    Tutorial
                </button>
                </div>
            </div>
        );
    }
}
