import { express, Server, cors, os, SerialPort, ReadlineParser } from './dependencies.js'
const SERVER_IP = "192.168.1.28";//CAMBIAR IP SIEMPRE

const expressApp = express(); 
const PORT = 5050;

expressApp.use(cors({ origin: "*" }));
expressApp.use(express.json()) 
expressApp.use('/app', express.static('public - app'));
expressApp.use('/mupi', express.static('public - mupi'));


const protocolConfiguration = { 
    path: 'COM3', 
    baudRate: 9600
};
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser)

parser.on('data', (arData) =>{
    let dataArray = arData.split(' ')

    let arduinoMessage = {
    state : dataArray[0],
    screen : parseInt(dataArray[2]),
    play : parseInt(dataArray[1]),
     value : parseInt(dataArray[3])
    }
    console.log(arduinoMessage);
    io.emit('arduinoInst', arduinoMessage);
})

const httpServer = expressApp.listen(PORT, () => {

    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/app`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi` });
});

const io = new Server(httpServer, { path: '/real-time' }); 

io.on('connection', (socket) => {
    console.log('Conectado', socket.id);

    socket.on('mupi-screen', paquete1 =>{
        console.log(`Se envio el cambio de pantalla para el mupi case ${paquete1}`)
        socket.broadcast.emit('current-mupi-screen',paquete1);
    })
    socket.on('game-mupi-screen', tap2play =>{
       
        socket.broadcast.emit('game-phone-screen',tap2play);
    })
    socket.on('game-instructions', instrucciones =>{
        console.log(`El usario ya está jugando. Está llegando este valor ${instrucciones}`)
        socket.broadcast.emit('mupi-game-instructions',instrucciones);
    })
   
    
});

let userData;
expressApp.post('/user-data', (req, res) => {
    userData = req.body;
    res.send({Data: `User data is: ${userData}`})
    console.log(userData);
});
