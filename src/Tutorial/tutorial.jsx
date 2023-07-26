import React, { Component } from "react";
import './tutorial.css';
import logo from '../Assets/PathfindingVisualizerLogo.png';
import path from '../Assets/pathImage.png';
import algorithmDropdown from '../Assets/AlgorithmDropdownForTutorial.jpg';
import WallWeight from '../Assets/WallWeightSelection.jpg';
import addTarget from '../Assets/AddTarget.jpg';
import MoreFeatures from '../Assets/MoreFeatures.jpg';
import movingNodes from '../Assets/movingNodes.gif';


export default class Tutorial extends Component {
    constructor() {
        super()
        this.state = {
            pageOne: true,
            pageTwo: false,
            pageThree: false,
            currentPage: 0,
        };
    }

    nextPage()  {
        let currentPage = this.state.currentPage;
        currentPage += 1;
        this.setState({currentPage: currentPage});
    }

    prevPage() {
        let currentPage = this.state.currentPage;
        currentPage -= 1;
        this.setState({currentPage: currentPage});
    }
    render() {
        const {
            currentPage,
        } = this.state;
        const {
            tutorialCurrentlyExpanded,
            setTutorialExpanded,
        } = this.props;
    
    return (<div>
        {tutorialCurrentlyExpanded &&
            <div className="container">
                {currentPage === 0 &&
                    <div className="title-text-tutorial">Pathfinding Visualizer Tutorial
                    <div className="simple-text-tutorial">This tutorial is meant to teach you how to use this pathfinding visualizer to it's fullest potential</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>If you don't need any help, click close tutorial in the bottom left corner</div>
                    <img className="image-tutorial" src={logo} alt="logo" style={{width: "20vh", height: "20vh"}}></img>
                    </div>
                }

                {currentPage === 1 &&
                    <div className="title-text-tutorial">What is a Pathfinding Algorithm?
                    <div className="simple-text-tutorial">A pathfinding algorithm attempts to find the shortest path between two points. This visualizer is meant to show how 
                    different pathfinding algorithms complete this task</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>The grid contains many nodes that have a distance of 1 unit from their neighbors. </div>
                    <img className="image-tutorial" src={path} alt="path" style={{width: '8vh'}}></img>
                    </div>
                }

                {currentPage === 2 &&
                    <div className="title-text-tutorial">How to choose an algorithm
                    <div className="simple-text-tutorial">Click the Algorithms drop-down menu to choose an algorithm</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>Some of the algorithms are 
                    <strong> weighted</strong> and others are <strong> unweighted</strong>. Weighted algorithms take weighted nodes into account, 
                    whereas unweighted algorithms do not. Also note that some algorithms do not garuntee the shortest path between the two nodes.</div>
                    <img className="image-tutorial" src={algorithmDropdown} alt="algorithmDropdown" style={{width: '12vh', height: '18vh'}}></img>
                    </div>
                }
                {currentPage === 3 &&
                    <div className="title-text-tutorial">Algorithm Descriptions
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>
                        <strong>Dijkstra's Algorithm</strong> (weighted): one of the first and most popular pathfinding algorithms; garuntees the shortest path. <br />
                        <strong>A* Search</strong> (weighted): One of the best pathfinding algorithms; uses hueristics to garuntee the shortest path faster than dijkstras. <br/>
                        <strong>Greedy Best-first Search</strong> (weighted): uses a faster hueristic algorithm than A*; but does not garuntee the shortest path <br/>
                        <strong>Breath-first Search</strong> (unweighted): A good algorithm for unweighted pathfinding; garuntees the shortest path<br/>
                        <strong>Depth First Search</strong> (unweighted): A terrible algorithm for pathfinding; does not garuntee the shortest path <br/>
                    </div>
                    </div>
                }
                {currentPage === 4 &&
                    <div className="title-text-tutorial">Placing Walls and Weights
                    <div className="simple-text-tutorial">Use the Wall/Weight button to switch between the two selections</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>What is currently selected will be added to the grid on a left mouse click over a node.
                    You can drag your mouse across multiple nodes while left clicking in order to create a blockade of wall or weights. To remove, either re-click the nodes 
                    or use the remove nodes and weights button</div>
                    <img className="image-tutorial" src={WallWeight} alt="WallWeightSelection" style={{width: '12vh', height: '4vh'}}></img>
                    </div>
                }
                {currentPage === 5 &&
                    <div className="title-text-tutorial">Adding a Second Target Node
                    <div className="simple-text-tutorial">Click Add Target to add the second target and Remove Target to remove the second target</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>The start node will seek out the newly added target first and then perform 
                    the algorithm again at the second target's location</div>
                    <img className="image-tutorial" src={addTarget} alt="AddTargetSelection" style={{width: '10vh', height: '4vh'}}></img>
                    </div>
                }
                {currentPage === 6 &&
                    <div className="title-text-tutorial">Moving nodes
                    <div className="simple-text-tutorial">The start and target nodes are movable to give you different paths
                    To move a node, left click on it to pick it up. Then hover over the desired location and left click again to place.</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>If you move the start or target nodes after an algorithm has already finished,
                    you will instantly see the new path and visited nodes.</div>
                    <img className="image-tutorial" src={movingNodes} alt="MovingNodes" style={{width: "25vh", height: "25vh"}}></img>
                    </div>
                }
                {currentPage === 7 &&
                    <div className="title-text-tutorial">Other Features
                    <div className="simple-text-tutorial">Check out other features such as a maze generator, a reset button, a clear button, and speed adjustment.</div>
                    <div className="simple-text-tutorial" style={{fontSize: "1.5vh"}}>If you get lost, you can bring this tutorial up by clicking on the tutorial button</div>
                    <img className="image-tutorial" src={MoreFeatures} alt="menu" style={{width: '45vh', height: '5vh'}}></img>
                    </div>
                }
                <div className="page-number"
                >{currentPage+1}/8 </div>
                {currentPage !== 7 && 
                <button className="tutorial-button" 
                style={{right: "2%"}}
                onClick={() => this.nextPage()}>Next</button>
                }
                {currentPage !== 0 &&
                <button className="tutorial-button" 
                style={{right: "13%", width: "7vh"}}
                onClick={() => this.prevPage()}>Previous</button>
                }   
                <button className="tutorial-button"
                style={{left: "2%", width: "10vh"}}
                onClick={() => setTutorialExpanded()}>Close Tutorial</button>
            </div>
        }
        </div>
      );
    }
}