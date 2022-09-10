const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
let leveltoplay = 0; 
let moveVertical=1;
let moveHorizontal=1;
let lives = 3;
const playerPosition = {};
const numberLives =document.getElementById("numbeLive");

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize",setCanvasSize);
// addEventLister movimiento del jugador 
up.addEventListener("click",moveWithButton);
down.addEventListener("click",moveWithButton);
left.addEventListener("click",moveWithButton);
right.addEventListener("click",moveWithButton);
window.addEventListener("keyup",keyDetection);


let canvassize;

function setCanvasSize(){
    
    if( window.innerWidth > window.innerHeight ){
        canvassize = window.innerHeight*0.70;
    }else{
        canvassize = window.innerWidth*0.60;
        
    }  
    
    canvas.setAttribute("width", canvassize);
    canvas.setAttribute("height", canvassize);
    startGame();
}
function startGame(){
    // Espera que se cargue la página
    // game.fillRect(0,50,100,100);
    // game.clearRect(50,50,100,100);
    // game.fillStyle ="Purple"; 
    // game.font = "25px Verdana";
    // game.textAlign ="center"; //start, end, left, center, right
    // game.fillText("Platzi",50,50,200);
    // const valueheight = window.innerHeight; // height value of windows
    // const valuewidth = window.innerWidth; // width value of windows 

    /* other form to fill the map 
    const valuemaps = Object.keys(emojis);
    console.log(valuemaps);
    let count1 = 1;
    let count2 = 1;
    for (let i = 0; i <maps[0].length; i++) {
        for (let j = 0; j < valuemaps.length; j++) {
           if(maps[0][i] == valuemaps[j]){
            game.fillText(emojis[valuemaps[j]] ,elementSize * count1 , elementSize * count2);
            if(count1 == 10){
                count1 = 1;
                count2++;
            }else{
                count1++;
               
            }          
           }
        }
        if(count2 > 10){
            count2 = 1 ;
        }  
    }
    console.log({count1,count2})
    
    */
    
    const elementSize = canvassize/10;
    console.log({elementSize,game});  
    game.textAlign = "end";
    game.textBaseline = "bottom"; // align text en forma vertical 'top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'
    game.font = String (elementSize -10) + "px Arial" ;
    renderMap(leveltoplay);
    

    
}
function renderMap(level){
    game.clearRect(0,0,canvas.width,canvas.height);
    const  filterMap = maps[level].trim().split("\n");
    const maprender = filterMap.map(function(key){ return key.trim().split("")});
    numberLives.innerText = "Vidas Sobrantes: \t"+String(lives);
    mapObjetcs(maprender);
    
}
function moveWithButton(event){
    
    if(event.path[0].id == "up"){
        moveVertical--;
    }else if(event.path[0].id == "down"){
        moveVertical++;
    }else if(event.path[0].id == "left"){
        moveHorizontal--;
    }else if(event.path[0].id == "right"){
        moveHorizontal++;
    }
    condicionalPosition();
    console.log({moveHorizontal,moveVertical});
    movePlayer();
}
function keyDetection(event){
    const keyButtonMove = [38,37,39,40];
    
    keyButtonMove.forEach(function(key){
        if(event.keyCode == key){
            
            if(key == 38){
                moveVertical--;
            }else if(key == 40){
                moveVertical++;
            }else if(key == 37){
                moveHorizontal--;
            }else if(key == 39){
                moveHorizontal++;
            }
            condicionalPosition();
            console.log({moveHorizontal,moveVertical});
            movePlayer();
        }
    });    
}
function condicionalPosition(){
    if(moveVertical>10){
        moveVertical =10;
    }else if(moveVertical < 1){
        moveVertical =1;
    }
    if(moveHorizontal>10){
        moveHorizontal =10;
    }else if(moveHorizontal < 1){
        moveHorizontal =1;
    }
}
function movePlayer(){
    renderMap(leveltoplay);
    // game.fillText(emojis['PLAYER'] ,elementSize * moveHorizontal , elementSize * moveVertical);
}
function mapObjetcs(maprender){
   
    const elementSize = canvassize/10;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {

            game.fillText(emojis[maprender[j][i]] ,elementSize * (i+1) , elementSize * (j+1));      
            
        }
        
    }
    
    mapPlayer(elementSize,maprender);
     
}

function mapPlayer(elementSize,maprender){
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
           

            if(maprender[j][i]=='O'){
                if (!playerPosition["y"]) {
                    playerPosition["y"] = j + 1;
                    moveVertical=j+1;
                } else {
                    playerPosition["y"] = moveVertical;
                }
                if(!playerPosition["x"]){
                    playerPosition["x"] = i + 1;
                    moveHorizontal = i+1;
                }else{
                    playerPosition["x"] = moveHorizontal;
                }
                game.fillText(emojis['PLAYER'] ,elementSize * playerPosition.x , elementSize * playerPosition.y);
                
        
            }          
                 
        }
        
    }
    console.log({playerPosition});
    if(maprender[playerPosition.y-1][playerPosition.x-1] == "X"){
        lives--;
        if(lives<1){
            leveltoplay=0;
            setTimeout(() => {
                window.alert("Perdistes Todas las vidas");
                yourDie();
            }, 50);
            lives=3;
        }
        setTimeout(() =>{window.confirm("Moriste");
        yourDie();},200);
        
    }
    if(maprender[playerPosition.y-1][playerPosition.x-1] == "I"){
        leveltoplay++;
        if(leveltoplay>(maps.length-1)){leveltoplay=0;}
        setTimeout(() => {
            window.alert("Juego finalizado");
            yourDie();
        }, 200);
        
    }
    
        
}
function yourDie(){
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}
//console.log(renderMap(0));