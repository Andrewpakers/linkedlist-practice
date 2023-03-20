/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import css from "./style.css"

function knight(tempx = 0,tempy = 0) {
    let x = tempx;
    let y = tempy;
    let destinationX = null;
    let destinationY = null;

    function getLocation() {
        return [x,y]
    }
    function setLocation(tempx, tempy) {
        x = tempx;
        y = tempy;
    }
    function setDestination(tempx, tempy) {
        destinationX = tempx;
        destinationY = tempy;
    }
    function getDestination() {
        return [destinationX,destinationY]
    }

    function moveFactory(tempMoveArray, tempPredecessor = null) {
        const moveArray = tempMoveArray;
        const destinationX = moveArray[3][0];
        const destinationY = moveArray[3][1];
        const originX = moveArray[0][0];
        const originY = moveArray[0][1];
        let predecessor = tempPredecessor;
        let _depth = 0;
        if (predecessor !== null) {
            _depth = predecessor.depth() + 1;
        }

        function getDestination() {
            return [destinationX, destinationY]
        }
        function getOrigin() {
            return [originX, originY]
        }
        function setPredecessor(newPredecessor) {
            predecessor = newPredecessor;
        }
        function getPredecessor() {
            return predecessor
        }
        function getMoveArray() {
            return moveArray
        }
        function depth() {
            return _depth
        }
        return {getDestination, getOrigin, setPredecessor, getPredecessor, getMoveArray, depth}
    }

    // Returns an array of arrays that contain each square touched by the knight in a move
    // getKnightMoves(x, y)[0][2] gets the final destination of the first legal move
    function getKnightMoves(tempx, tempy, predecessor = null) {
        const x = tempx;
        const y = tempy;

        const knightMoves = [
            [[0,0],[1,0],[1,1],[1,2]],
            [[0,0],[1,0],[1,-1],[1,-2]],
            [[0,0],[1,0],[2,0],[2,1]],
            [[0,0],[1,0],[2,0],[2,-1]],
            [[0,0],[-1,0],[-1,1],[-1,2]],
            [[0,0],[-1,0],[-1,-1],[-1,-2]],
            [[0,0],[-1,0],[-2,0],[-2,1]],
            [[0,0],[-1,0],[-2,0],[-2, -1]],
        ]
        const boardMoves = [];
        for (let i = 0; i < 8; i++) {

            let moveX = knightMoves[i][3][0];
            let moveY = knightMoves[i][3][1];

            const move = [];

            const destinationX = moveX + x;
            const destinationY = moveY + y;

            if (destinationX < 8 && destinationX > -1) {
                if (destinationY < 8 && destinationY > -1) {
                    knightMoves[i].forEach((square) => {
                        move.push([square[0] + x, square[1] + y]);
                    });
                }
            }
            if (move.length > 0) {
                const newMove = moveFactory(move, predecessor);
                boardMoves.push(newMove);
            }

        }
        return boardMoves
    }

    function determineMoves() {
        const moves = getKnightMoves(x,y);
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].getDestination().toString() === [destinationX,destinationY].toString()) {
                const arrayOfMoves = [];
                let tempMoves = moves[i];
                while (tempMoves !== null) {
                    arrayOfMoves.unshift(tempMoves);
                    tempMoves = tempMoves.getPredecessor();
                }
                return arrayOfMoves
            }
            const nextMoves = getKnightMoves(moves[i].getDestination()[0], moves[i].getDestination()[1], moves[i]);
            nextMoves.forEach((nextMove) => {
                moves.push(nextMove);
            });
        }
    }
    return {getLocation, setLocation, setDestination, getDestination, determineMoves}
}

const displayController = (() => {

    function setKnight(tempx, tempy) {
        // iterate through all squares and remove selected
        const spaces = document.querySelectorAll('.spot');
        spaces.forEach((space) => {
            space.classList.remove('selected');
            space.classList.remove('moveEven');
            space.classList.remove('moveOdd');
            space.classList.remove('destination');
            space.textContent = "";
        })
        // select knight location
        const coordinates = `[${[tempx,tempy].toString()}]`;
        const knightLocation = document.getElementById(`${coordinates}`);
        knightLocation.classList.add('selected');
        knightLocation.textContent = "Knight";
    }

    function setDestination(tempx, tempy) {
        // iterate through all squares and remove selected
        const spaces = document.querySelectorAll('.spot');
        spaces.forEach((space) => {
            space.classList.remove('destination');
            if (space.textContent !== "Knight") {
                space.textContent = "";
            }
        })
        // select knight location
        const coordinates = `[${[tempx,tempy].toString()}]`;
        const destinationLocation = document.getElementById(`${coordinates}`);
        destinationLocation.classList.add('destination');
        destinationLocation.textContent = "Destination";
    }

    function colorMoves(arrayOfMoves) {
        const allSquares = document.querySelectorAll('.spot');
        allSquares.forEach((square) => {
            square.classList.remove('moveEven');
            square.classList.remove('moveOdd');
        });
        for (let i = 0; i < arrayOfMoves.length; i++) {
            for (let j = 0; j < arrayOfMoves[i].getMoveArray().length; j++){
                const square = arrayOfMoves[i].getMoveArray()[j];
                const coordinates = `[${square.toString()}]`;
                const squareLocation = document.getElementById(`${coordinates}`);
                if (squareLocation.textContent !== "Knight" && squareLocation.textContent !== "Destination") {
                    squareLocation.textContent = "";
                }
                if (j === 0 && i !== 0 && squareLocation.textContent !== "Destination") {
                    squareLocation.textContent = i;
                }
                if (i % 2 === 0) {
                    squareLocation.classList.remove('moveOdd');
                    squareLocation.classList.add('moveEven');
                } else {
                    squareLocation.classList.remove('moveEven');
                    squareLocation.classList.add('moveOdd');
                }
            }
        }
    }
    return {setKnight, setDestination, colorMoves}
})();
const boardState = (() => {
    let knightPlaced = false;
    let destinationPlaced = false;
    const theKnight = knight();
    function clickOnSquare(event) {
        const tempcoordinates = event.target.id;
        if (knightPlaced) {
            const x = Number(tempcoordinates.charAt(1));
            const y = Number(tempcoordinates.charAt(3));
            displayController.setDestination(x,y);
            theKnight.setDestination(x,y);
            console.log(`x: ${x}, y: ${y}, knight destination: ${theKnight.getDestination()}`);
            destinationPlaced = true;
            const moves = theKnight.determineMoves();
            displayController.colorMoves(moves);

        } else if (!knightPlaced && !destinationPlaced) {
            const x = Number(tempcoordinates.charAt(1));
            const y = Number(tempcoordinates.charAt(3));
            displayController.setKnight(x,y);
            theKnight.setLocation(x,y);
            console.log(`x: ${x}, y: ${y}, knight location: ${theKnight.getLocation()}`);
            knightPlaced = true;
        }
    }
    function enter() {
        if (knightPlaced && destinationPlaced) {
            const x = theKnight.getDestination()[0];
            const y = theKnight.getDestination()[1];
            theKnight.setLocation(x,y);
            theKnight.setDestination(null,null);
            displayController.setKnight(x,y);
            destinationPlaced = false;
        }
    }
    return {clickOnSquare, enter}
})();

function init() {
    const squares = document.querySelectorAll('.spot');
    squares.forEach((square) => {
        square.addEventListener('click', boardState.clickOnSquare)
    });
    const body = document.querySelector('body');
    body.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            boardState.enter();
        }
    });
}
init();
