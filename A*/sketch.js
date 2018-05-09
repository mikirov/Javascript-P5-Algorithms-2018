let SCREEN_WIDTH = 800
let SCREEN_HEIGHT = 800

let COLS = 100
let ROWS = 100     

let width = SCREEN_WIDTH / COLS
let height = SCREEN_HEIGHT / ROWS

let grid = new Array(COLS)
let OpenSet = []
let ClosedSet = []
let path = []

let start, end;
let current;

class Node{
        constructor(i, j){

                this.i = i
                this.j = j
                this.x = i * width
                this.y = j * height
                this.FScore = Infinity
                this.GScore = Infinity
                this.HScore
                this.neighbours = []
                this.previous = undefined
                this.isWall = false
                if(random(1) < 0.4){
                        this.isWall = true
                }
        }
        show(color){
                fill(color)
                rect(this.x, this.y, width, height)
        }

        calculateHeuristic(){
                end = grid[COLS - 1][ROWS - 1]
                return dist(this.x, this.y, end.x, end.y)
        }

        addneighbours(){
                let i = this.i
                let j = this.j 
                // add four sides
                if(this.i < ROWS - 1){
                        this.neighbours.push(grid[i + 1][j])
                }
                if(this.i > 0){
                        this.neighbours.push(grid[i-1][j])
                }
                if(this.j < COLS - 1){
                        this.neighbours.push(grid[i][j+1])
                }
                if(this.j > 0){
                        this.neighbours.push(grid[i][j-1])
                }
                // add diagonals
                if(this.j < COLS - 1 && this. i < ROWS - 1){ // down right
                        this.neighbours.push(grid[i+1][j+1])
                }
                if(this.j > 0 && this. i > 0){
                        this. neighbours.push(grid[i-1][j-1]) // up left
                }
                if(this.i < ROWS -1 && this.j > 0){
                        this.neighbours.push(grid[i+1][j-1])
                } // up right
                if(this.i > 0 && this.j < COLS - 1){ // down left
                        this.neighbours.push(grid[i-1][j+1])
                }

        }
}

function removeFromArray(arr, element){
        for(let i = arr.length - 1; i >= 0; i --){
                if(arr[i] == element){
                        arr.splice(i, 1);
                }
        }
}
function setup(){
        createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT)

        for(let i = 0; i < COLS; i++){
                grid[i] = new Array(ROWS);
        }

        for(let i = 0; i < COLS; i++){
             for(let j = 0; j < ROWS; j ++){
                     grid[i][j] = new Node(i, j);
             }   
        }
        for(let i = 0; i < COLS; i++){
                for(let j = 0; j < ROWS; j ++){
                        grid[i][j].addneighbours();
                }   
        }

        start = grid[0][0]
        end = grid[COLS -1][ROWS - 1]

        start.GScore = 0
        start.FScore = start.calculateHeuristic()

        OpenSet.push(start)

        end.isWall = false
        start.isWall = false


}

function draw(){

        if(OpenSet.length > 0){ // we can keep going , actual algorithm starts here
                let winnerIndex = 0;

                // check if there is winner        

                for(let i =  0; i < OpenSet.length; i ++){ // find the best FScore
                        if(OpenSet[i].FScore < OpenSet[winnerIndex].FScore){
                                winnerIndex = i 
                        }
                }
                current = OpenSet[winnerIndex] // select element with best FScore
                if(current === end){
                        console.log("found a solution")
                        noLoop()
                
                        
                }
                removeFromArray(OpenSet, current)
                ClosedSet.push(current)

                let neighbours = current.neighbours; // get current node neighbours
                for(neighbour of neighbours){ // check each neighbour and find the best 
                        if(!ClosedSet.includes(neighbour) && !neighbour.isWall){

                                if(!OpenSet.includes(neighbour)){
                                        OpenSet.push(neighbour)
                                }
                                
                                neighbour.previous = current 
                                neighbour.GScore = current.GScore + 1// or + distance between current and neighbour
                                neighbour.FScore = neighbour.GScore + neighbour.calculateHeuristic()
  

                        }


                }

        }
        else{ // no solution
                console.log("no solution")
                noLoop()
                return;
        }


        // drawing
        background(0)
        for(let i = 0; i < COLS; i++){
                for(let j = 0; j < ROWS; j++){
                        if(grid[i][j].isWall){
                                grid[i][j].show(color(0))
                        }
                        else{
                                grid[i][j].show(color(255, 255, 255))
                        }
                }
        }

        for(node of OpenSet){
                node.show(color(0, 255, 0))
        }
        for(node of ClosedSet){
                node.show(color(255, 0, 0))
        }

        //find path
        let temp = current
        path = []
        path.push(temp)
        while(temp.previous != undefined){
                path.push(temp.previous)
                temp = temp.previous
        }

        for(node of path){
                node.show(color(0, 0, 255))
        }
   

}