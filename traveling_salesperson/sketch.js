var townCount = 6
var towns = []
var screen_width = 400
var screen_height = 400

var order = []

var bestPath
var bestDistance = 0;

var count;
var totalPermutations;

function setup(){
        createCanvas(screen_width, screen_height)

        for(let i = 0; i < townCount; i++){
                let town = createVector(random(0, screen_width), random(0, screen_height / 2 - 64))
                towns.push(town)
                order.push(i)
        }

        console.log(towns)
        bestPath = order.slice()
        bestDistance = calculateDistance()
        count = 1;
        totalPermutations = factorial(townCount)
        //frameRate(5)
}

function draw(){
        background(0, 0, 0)
    

// draw the best path yet
        stroke(0, 255, 255)
        strokeWeight(4)
        noFill()
        beginShape()
        for( i = 0; i < order.length; i++){
                
                vertex(towns[bestPath[i]].x, towns[bestPath[i]].y)
        }
        endShape()

// draw current permutation
        translate(0, screen_height / 2)
        stroke(255, 255, 255)
        strokeWeight(1)
        noFill()
        beginShape()
        for( i = 0; i < order.length; i++){
                
                vertex(towns[order[i]].x, towns[order[i]].y)
        }
        endShape()
// draw the towns
        fill(255)
        for(town of towns){
                ellipse(town.x, town.y, 8, 8)
        }   
// show current permutation percentage text
        textSize(24)
        let s = ''
        for(let i = 0; i < order.length;i++){
                s+=order[i]
        }
        let percent =  100 * count / totalPermutations 
        fill(255)
        text("current permutation: " + s, 20, screen_height/2 - 40)
        text(" percent complete: " + nf(percent, 0, 2) + "%", 20, screen_height/2 - 8)

// calculate next permutation
        permute()

// get distance of the new permutation
        let distance = calculateDistance()
// check for new best path
        if(distance < bestDistance){
                bestDistance = distance
                bestPath = order.slice()
        }
     

}


function swap(a, i, j){
        let temp = a[i]
        a[i] = a[j]
        a[j] = temp
}

function calculateDistance(){
        let sum = 0;
        for(let i = 0; i < towns.length - 1; i++){
                sum += dist(towns[order[i]].x, towns[order[i]].y, towns[order[i + 1]].x, towns[order[i + 1]].x)
        }
        return sum

}

function permute(){
        console.log(order)   

        count++; // current permutation count
        
        let largestX = -1

        for(let i = order.length - 2; i >= 0; i--){
                if(order[i] < order[i + 1]){
                        largestX = i;
                        break;
                }
        }
        if(largestX == -1){
                noLoop()
                console.log("finished")
        }
        let largestY = -1 
        for(let j = largestX + 1; j < order.length; j++){
                if(order[j] > order[largestX]){
                        largestY = j;

                }
        }

        if(largestY == -1){
                noLoop()
                console.log("finished")
        }

        swap(order, largestX, largestY)

        let endArray = order.splice(largestX + 1)
        endArray.reverse()
        order = order.concat(endArray)

        

}

function factorial(n){
        if (n == 1) return 1;
        else{
                return n * factorial(n - 1);
        }
}