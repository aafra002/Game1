//selecting canvas variable from html canvas tag
const canvas = document.querySelector('canvas')
//setting height and width of canvas to windows size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//setting up variable to reference 2d library
const ctx = canvas.getContext('2d')


//global gravity
const gravity = 0.5

//setting up a class for my player


class Player {
    constructor() {
        //postion on screen of character

        this.position = {
            x:100,
            y:100
        }
        // setting character height,width and velocity in variable

        this.width = 50
        this.height = 50
        this.velocity = {
            x:0,
            y:gravity
        }
    }

    //making a draw function to create characters and obstacles etc

draw() {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
    // adding update function to update player postion etc

update(){
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    this.velocity.y += gravity
    if(this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
    else
    this.velocity.y = 0
}
}
// calling class in variable to spawn player
class Terrain {
    constructor(){
        this.position = {
            x:500,
            y:400
        }
        this.width = 200
        this.height = 50
    }
    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x,this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        
    }
}
class Enermy{
    constructor(){
        this.position = {
            x:800,
            y:100
        }
        this.width = 50
        this.height = 50
        this.velocity = {
            x:0,
            y:gravity

        }
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.velocity.y += gravity
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else
        this.velocity.y = 0

    }
}
const player = new Player()
const terrain = new Terrain()
const enemy = new Enermy()
 
// taking in key pressed down
const keys = {
    right:{
        pressed:false

    },
    left:{
        pressed:false
    }
}




//set up loop for animation calling itself recursively

function animate(){
    requestAnimationFrame(animate)
    //clears frames to update player postion

    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    terrain.draw()
    enemy.update()
    
    
    // loop to move character left or right 

    if(keys.right.pressed ){
        player.velocity.x = 10
    }
    else if (keys.left.pressed ){
        player.velocity.x = -10
        
    }
    else 
    player.velocity.x = 0
// player platfrom collisions
     if(player.position.y + player.height 
        <= terrain.position.y 
        && player.position.y + player.height + player.velocity.y >= terrain.position.y && player.position.x + player.width
        >= terrain.position.x
        && player.position.x <= terrain.position.x + terrain.width){
        player.velocity.y = 0

    }
// stops character leaving screen
    if (keys.right.pressed && player.position.x > 900 ){
        terrain.position.x -= 10
        player.velocity.x= 0
    }
    if (keys.left.pressed && player.position.x < 100){
        terrain.position.x += 10
        player.velocity.x = 0


    }
    if (enemy.position.x == player.position.x && enemy.position.y == player.position.y){
        alert("Game Over!")
        location.reload()
}
    if(keys.right.pressed && player.position.x >= enemy.position.x ){
    enemy.velocity.x = 5
    
}
    if(keys.left.pressed && player.position.x <= enemy.position.x ){
    enemy.velocity.x = -5

}
}
animate()
//event listener takes input of player movement reads as key is pressed down

addEventListener('keydown',({keyCode}) =>{
switch (keyCode) {
    //A
    case 65:
        console.log('left')
        keys.left.pressed = true
        break
        //D
    case 68:
        console.log('right')
        keys.right.pressed = true
        break
        //W
    case 87:
        console.log('up')
        player.velocity.y -= 30
        break
        //S
    case 83:
        console.log('down')
        break
}
    console.log(keys.right.pressed)
})
// resets character movement to 0 once key is released by player

addEventListener('keyup',({keyCode}) =>{
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            break
        case 83:
            console.log('down')
            break
    }
    console.log(keys.right.pressed)
    })