int LedPin = 5;
int ButtonPin = 2;

int TriggerPin = 3;
int EchoPin = 4;

int LedState = LOW;

bool estadoButton = false;
bool previousButtonState = false;

int saltoArduino = 4.6;
int velocidadArduino = 0;

int arduinoScreen = 1;
int startGame = 3;

void setup() {
  // put your setup code here, to run once:
  pinMode(LedPin,OUTPUT);
  pinMode(ButtonPin,INPUT);
  pinMode(TriggerPin,OUTPUT);
  pinMode(EchoPin,INPUT);

  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:

sendingData();



  }
    


void sendingData(){

  digitalWrite(TriggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(TriggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(TriggerPin, LOW);
  
  long duration = pulseIn(EchoPin, HIGH);
  int distance = duration / 58.2;

  if(distance <= 10){
    int flapArduino = velocidadArduino =- saltoArduino;
  sendSerialData('A', arduinoScreen, startGame ,flapArduino);
  }
  
  estadoButton = digitalRead(ButtonPin);
  if (estadoButton && !previousButtonState) {  //Pressed!
  LedState = HIGH;
  int flapArduino = velocidadArduino =- saltoArduino;
    sendSerialData('P', arduinoScreen, startGame, flapArduino);   
    previousButtonState = true;
  } else if (!estadoButton && previousButtonState) {  //Released!
    //Serial.println("Released");
    LedState = LOW;
    previousButtonState = false;
    
  }
 delay(50);
 digitalWrite(LedPin, LedState);
}

 void sendSerialData(char keyA, int arduinoScreen , int startGame, int flapArduino) {

 Serial.print(keyA);
Serial.print(' ');
 Serial.print(startGame);
Serial.print(' ');
 Serial.print(arduinoScreen);
Serial.print(' ');
 Serial.print(flapArduino);
Serial.println();
  
 }


