const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

function createGrid(boxNumber) {
    for (let x = 0; x < boxNumber; x++) {
        const box = document.createElement("div");
        box.classList.add('grid-item')
        box.id = x + 1
        gridContainer.append(box);
    }
}


// Create grid depending on page size
const ratio = screenWidth/screenHeight
const colNum = 200
const rowNum = Math.round(colNum/ratio)
const area = colNum * rowNum

const gridContainer = document.getElementById("grid-container");
gridContainer.style.gridTemplateColumns = `repeat(${colNum}, 1fr)`; 
gridContainer.style.gridTemplateRows = `repeat(${rowNum}, 1fr)`

createGrid(area); 


startingPoint = Math.round(Math.random() * area) + 1 // start at a random box on screen
infectedBoxes = [startingPoint]
archivedBoxes = []
fadedBoxes = []
deadBoxes = []

function infect() {
    if (archivedBoxes) {
        for (box in archivedBoxes) {
            if (archivedBoxes.length < 40) {
                break
            }
            else {
                const arcBox = document.getElementById(`${archivedBoxes[box]}`)
                arcBox.style.opacity = "0.5"
                fadedBoxes.push(archivedBoxes[box])
                archivedBoxes.splice(box, 1)
            }
        }
        for (box in fadedBoxes) {
            if (fadedBoxes.length < 40) {
                break
            }
            else {
                const fadeBox = document.getElementById(`${fadedBoxes[box]}`)
                fadeBox.style.cssText = '';
                fadeBox.style.backgroundColor = "rgba(255, 255, 255, 0)"
                fadeBox.style.border = "1px solid rgba(255, 255, 255, 1)";
                deadBoxes.push(fadedBoxes[box])
                fadedBoxes.splice(box, 1)
            }
        }
        
        for (box in deadBoxes) {
            if (deadBoxes.length < 500) {
                break
            }
            else {
                const deadBox = document.getElementById(`${deadBoxes[box]}`)
                deadBox.style.border = "1px solid rgba(0, 0, 0, 0.5)";
                deadBoxes.splice(box, 1)

            }
        }
    }


    for (box in infectedBoxes) {
        moves = [[infectedBoxes[box] + 1, "rgba(255, 142, 189"], // right
            [infectedBoxes[box] - 1, "rgba(133, 255, 133"], // left
            [infectedBoxes[box] - colNum, "rgba(142, 217, 255"], // up 
            [infectedBoxes[box] + colNum, "rgba(206, 142, 255"]] // down
        moves = moves.filter(function(move) {
            return move[0] > 1 && move[0] < area && !archivedBoxes.includes(move[0])
        })

        let x = Math.floor(Math.random() * (moves.length))

        if (moves.length == 0) {
            startingPoint = Math.round(Math.random() * area) + 1
            infectedBoxes = [startingPoint]
            break;
        }

        if (x == 0) { 
            infectedBoxes.push(moves[0][0])
            const newBox = document.getElementById(`${moves[0][0]}`)
            newBox.style.backgroundColor = `${moves[0][1]}, 0.9)`;
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[0][0])
        
        }

        if (x == 1) { 
            infectedBoxes.push(moves[1][0]) 
            const newBox = document.getElementById(`${moves[1][0]}`)
            newBox.style.backgroundColor = `${moves[1][1]}, 0.9)`
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[1][0])
        }
        if (x == 2) { 
            infectedBoxes.push(moves[2][0]) 
            const newBox = document.getElementById(`${moves[2][0]}`)
            newBox.style.backgroundColor = `${moves[2][1]}, 0.9)`
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[2][0])
        }

        if (x == 3) { 
            infectedBoxes.push(moves[3][0]) 
            const newBox = document.getElementById(`${moves[3][0]}`)
            newBox.style.backgroundColor = `${moves[3][1]}`;
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[3][0])
        }
    }

    setTimeout(function(){
        infect(infectedBoxes[box]);
    }, 1); // reload every millisecond
}


infect() 
