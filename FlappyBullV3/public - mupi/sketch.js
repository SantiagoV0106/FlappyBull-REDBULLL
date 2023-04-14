// Aqui se conecta el servidor
const NGROK = `${window.location.hostname}`;
let socket = io(NGROK, {
  path: '/real-time'
});
console.log('192.168.1.28', NGROK);

let cnvWidth = 431
let cnvHeigth = 768
let currentMupiscreen = 0

let flapMupi

// declaro las variables del juego
var toro
var tubos = []
var score

// creo al toro
function Toro() {
  this.y = cnvHeigth / 2
  this.x = 50

// fisicas
this.gravedad = 0.25
this.salto = 4.6
this.velocidad = 0

  this.show = function() {
      fill(255)
      ellipse(this.x,this.y,40,40)
  }

  this.flap = function(){
    this.velocidad =- this.salto
    
  }

  this.update = function(){
    this.velocidad += this.gravedad
    this.y += this.velocidad

    if (this.y > cnvHeigth) {
      this.y = cnvHeigth
      this.velocidad = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.velocidad = 0
    }

  }


}

// se crean los tubos

function Tubo(){
  this.top = random(cnvHeigth/2)
  this.buttom = random(cnvHeigth/2)
  this.x = cnvWidth
  this.w = 80
  this.speed = 1

  this.show = function(){
    fill(255)
    rect(this.x,0,this.w,this.top)
    rect(this.x,cnvHeigth - this.buttom, this.w, this.buttom)
  }

  this.update = function(){
    this.x -= this.speed
  }
  this.offsscreen = function(){
   if (this.x < - this.w) {
    return true
   } else {
    return false
   }
  }

  this.hits = function(toro){
    if (toro.y < this.top || toro.y > cnvHeigth - this.buttom) {
      if (toro.x > this.x && toro.x < this.x + this.w) {
        currentMupiscreen = 4
        return true
      }
    }
    return false
  }

}

function Puntaje(){
  this.value = 0

  this.show = function(){
    fill(255)
    text(this.value, cnvWidth /2 - 78, cnvHeigth/2 - 80)
  }

  // this.update = function() {
  //   this.value = 0
  // }
}

function setup(){
createCanvas(cnvWidth,cnvHeigth)
toro = new Toro()
score = new Puntaje()
tubos.push(new Tubo())
}

function draw() {
switch (currentMupiscreen) {
  case 0:
    background('yellow')
    fill(0)
    text('Pantalla 1 del mupi <3',cnvWidth/2 - 120 , cnvHeigth/2)    
    break;

    case 1 : 
    background('blue')
    fill(255)
    text('Pantalla 2 del mupi Instrucciones <3',cnvWidth/2 - 120 , cnvHeigth/2)
    if (frameCount % 1000 == 0) {
      currentMupiscreen=2
      changeScreenPhone(2)
    }
    
    break;
    
     case 2 :
      background('red')
      fill(255)
      text('Pantalla START llegamos acá después de 40 segs <3',cnvWidth/2 - 120 , cnvHeigth/2)
      break;
      case 3 :
        background('black')
        toro.show()
        toro.update()
        score.show()

        if (frameCount % 200 == 0) {
          tubos.push(new Tubo())
        }

        for (var i = tubos.length - 1 ; i >= 0; i--) {
          tubos[i].show()
          tubos[i].update()

          if (tubos[i].hits(toro)) {
            console.log('HIT');
          }

          if (tubos[i].offsscreen()) {
            tubos.splice(i,1)
            score.value += 1
          }      
          
          }
        fill(255)
        text('Pantalla del juego, se supone que ya está JUGANDO <3',cnvWidth/2 - 120 , cnvHeigth/2)
        break;
        case 4 :
      background('red')
      fill(255)
      text('JAJAJA perdiste amigo, mete tus datos <3',cnvWidth/2 - 120 , cnvHeigth/2)
      changeScreenPhone(4)
      default:
        break;
        
      }
    }

    function mouseClicked(){
      if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && currentMupiscreen === 3) {
        console.log('Clikeado');
        toro.flap()
      }
    }
    
    function changeScreenPhone(tap2play) {
      socket.emit('game-mupi-screen', tap2play)
  
}

socket.on('current-mupi-screen',paquete1 => {
console.log(`Llegó el cambio de pantalla caso ${paquete1}`);
currentMupiscreen = paquete1
})
socket.on('mupi-game-instructions',instrucciones => {
console.log(`Llegaron estas instrucciones ${instrucciones}`);
flapMupi = instrucciones
toro.flap(flapMupi)
})

socket.on('arduinoInst', (arduinoMessage) => {
console.log(`Llegaron estas instrucciones ${arduinoMessage}`);
let {state, play, screen, value} = arduinoMessage
console.log(state);
if (currentMupiscreen == 0) {
  currentMupiscreen = screen
} else if (currentMupiscreen == 2) {
  currentMupiscreen = play
}
console.log(screen);
console.log(play);

flapMupi = value
toro.flap(flapMupi)
})


