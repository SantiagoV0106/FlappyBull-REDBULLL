const NGROK = `${window.location.hostname}`;
console.log('192.168.1.28', NGROK);
let socket = io(NGROK, { path: '/real-time' });

const nameInput = document.getElementById('nombre')
const emailInput = document.getElementById('correo')
const sb = document.getElementById('submit')
sb.addEventListener('click', (event)=>{
    let user = {name : nameInput.value, email : emailInput.value}
    console.log('Enviado');
    userData(user);
})

//hola este es el archivo final


async function userData(user) {
  const data = {
      method: 'POST',
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
  }
  await fetch('/user-data', data);

}

  // let cnvWidth = 430
  // let cnvHeigth = 768
  // let mupiScreen
  // let phoneScreen = 0

  // // fisicas del toro

  // let saltoPhone = 4.6
  // let velocidadPhone = 0

  // function setup() {
  // createCanvas(cnvWidth, cnvHeigth);
  // }

  // function draw() {
  // switch (phoneScreen) {
  //   case 0:
  //     background('red');
  //     fill(255)
  //     text('Hola desde la primera pantalla del phone <3', cnvWidth/2 - 120 , cnvHeigth/2 )
      
  //     break;
  //     case 1 :
  //       background('blue')
  //       fill(255)
  //       text('Hola desde esperar a leer instrucciones', cnvWidth/2 - 120 , cnvHeigth/2 )
  //       break;
  //       case 2 :
  //         background('yellow')
  //         fill(0)
  //         text('Hola desde tap to play', cnvWidth/2 - 120 , cnvHeigth/2 )
  //         break;
          
  //         case 3 :            
  //         background('green')
  //         fill(255)
  //         text('Tapea que vas a perder CRACK <3', cnvWidth/2 - 120 , cnvHeigth/2 )
  //         break;
  //         case 4 :
  //           background('black')
  //           fill(255)
  //           text('Llená el formulario todo bien <3', cnvWidth/2 - 120 , cnvHeigth/2 )
            
  //   default:
  //     break;
  // }
  // }

  // function tapPhone(){
  // let flap = velocidadPhone =- saltoPhone
  // console.log(flap);
  // socket.emit('game-instructions', flap)

  // }

  // function changeScreenMupi(mupiScreen) {
  // socket.emit('mupi-screen', mupiScreen)

  // }

  // socket.on('game-phone-screen',tap2play => { 
  // phoneScreen = tap2play
  // } )


  // function mouseClicked() {
  // if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && phoneScreen === 0) {    
  //   phoneScreen = 1
  //   changeScreenMupi(1)
  // }
  // if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && phoneScreen === 2) {    
  //   phoneScreen = 3
  //   changeScreenMupi(3)
  // }
  // if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && phoneScreen === 3) {    
  //   tapPhone()
  // }

  // }



  //Function de guardar usuarios



