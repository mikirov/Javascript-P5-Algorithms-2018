var direction = {
        top : 0,
        right : 1,
        bottom : 2,
        left : 3

}
var cols, rows;
var w  = 10;
var SCREEN_WIDTH = 500
var SCREEN_HEIGHT = 500
var grid = []   
var current;
var stack = []


function index(i , j){
        if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return undefined;

        return j * cols + i;
}
class Cell{
        constructor(i, j){
                this.i = i
                this.j = j
                this.x = i * w
                this.y = j * w
                this.walls = [true, true, true, true]
                this.visited = false


        }

        show(){
                let x = this.x
                let y = this.y
                stroke(255)
                if(this.walls[direction.top]){
                        line(x, y, x + w, y)
                }
                if(this.walls[direction.right]){
                        line(x + w, y, x + w, y + w)
                }
                if(this.walls[direction.bottom]){
                        line(x + w, y + w, x, y + w)
                }
                if(this.walls[direction.left]){
                        line(x, y + w, x, y)
                }

                if(this.visited){
                        noStroke()
                        fill(255, 0, 255, 100)
                        rect(x, y, w, w)
                }
        }
        findRandomNeighbour(){
                let neighbours = []
                let i = this.i
                let j = this.j

                neighbours.push(grid[index(i, j-1)])

                neighbours.push(grid[index(i, j+1)])
                
                neighbours.push(grid[index(i + 1, j)])
                
                neighbours.push(grid[index(i - 1, j)])

                let filteredNeighbours = neighbours.filter(function(neighbour){
                        return neighbour && !neighbour.visited;
                })

                if(filteredNeighbours.length > 0){
                        return filteredNeighbours[floor(random(0, filteredNeighbours.length))]
                }
                else{
                        return undefined;
                }

        }

        highlight(){
                noStroke()
                fill(0,0,255)
                rect(this.x, this.y, w, w)
        }


}

function setup(){

        createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT)

        cols = floor(SCREEN_WIDTH / w)
        rows = floor(SCREEN_WIDTH / w)


        for(let j = 0; j < cols ; j++){
                for(let i = 0 ; i < rows; i++){
                        let cell = new Cell(i, j)
                        grid.push(cell);
                }
        }

        current = grid[0]
        current.visited = true;
        
}

function draw(){
        background(51)
        for(let i = 0; i< grid.length; i++){
                grid[i].show()
        }
        current.highlight()

// STEP 2.1.1
        var next = current.findRandomNeighbour()
// STEP 2.1
        if(next){


                //STEP 2.1.2
                stack.push(current)

                //STEP 2.1.3
                removeWalls(current, next)


                //STEP 2.1.4

                current = next
                current.visited = true
        }
        // STEP 2.2
        else if(stack.length > 0){
                current = stack.pop()

        }


}

function removeWalls(current, other){
        let x = current.i - other.i 
        let y = current.j - other.j

        if(x === 1){
                current.walls[direction.left] = false
                other.walls[direction.right] = false
        }
        else if(x === -1){
                current.walls[direction.right] = false
                other.walls[direction.left] = false
        }

        if(y === -1){
                current.walls[direction.bottom] = false
                other.walls[direction.top] = false
        }       
        else if(y === 1){
                current.walls[direction.top] = false
                other.walls[direction.bottom] = false
        }


}