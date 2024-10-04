let colidiu = false;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro/2;

//velocidade da bolinha
let velXBolinha = 6;
let velYBolinha = 6;

//variáveis minha raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velXOponente;
let velYOponente;

let raqueteComprimento = 10;
let raqueteAltura = 100;

//placar do jogo
let pontosMeus =0;
let pontosOponente =0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//veriável de chance de erro
let chanceErro = 0.05; // chance de erro de 5%


//define dimensões da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//tudo dentro dessa função aparecerá no desenho
function draw() {
  background(0);
  
  //mostrabolinha
  mostraBolinha();
  
  //movimenta a bolinha
  movimentaBolinha();
  
  //se está colidindo, vá para o outro lado
  verificaColisao();
  
  //Criando Raquete
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente,yRaqueteOponente);
  
  //Movimentar Raquete
  movimentaMinhaRaquete();
  
  //Movimentar Raquete do Oponente
movimentaRaqueteOponente();
  
  //o nome já diz
  incluirPlacar();
  marcarPonto();
  
  //Colidir com a Raquete
  colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoMinhaRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

 function movimentaBolinha(){
      xBolinha += velXBolinha;
      yBolinha += velYBolinha;
  }

  function verificaColisao(){
      if(xBolinha + raio > width || xBolinha-raio < 0){
      velXBolinha *= -1;
      }
      if(yBolinha+ raio > height || yBolinha-raio < 0){
      velYBolinha *= -1;
      }
  }
    
  function mostrarRaquete(x,y){
    rect(x,y,raqueteComprimento,raqueteAltura);
  }

  function movimentaMinhaRaquete(){
    
    if(keyIsDown(UP_ARROW)){
      yRaquete -= 10;
    }
    
    if(keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
    }
  }

function movimentaRaqueteOponente(){
  
  velYOponente = velYBolinha;
  
   if (xBolinha > width / 2 && velXBolinha > 0) {
     
    // com chance de erro definida por chanceErro, a raquete do oponente irá para cima ou para baixo em vez de seguir a bola
     
    if (random() < chanceErro) {
      velYOponente *= -1;
    }
  }
  yRaqueteOponente += velYOponente;
}

//função verificar colisão pela biblioteca p5.collide2d
  function colisaoMinhaRaqueteBiblioteca(x,y){
    colidiu = 
      collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    
    if(colidiu){
      velXBolinha*=-1;
      raquetada.play();
    }
  }

//função incluir placar
 function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(250,140,0));
  rect(150,10,40,20);
  fill(255);
  text(pontosMeus, 170, 26);
  fill(color(250,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente, 470, 26);
    }



//função marcar pontuação
  function marcarPonto(){
    if(xBolinha>590){
      pontosMeus+=1;
      ponto.play();
    }
    if(xBolinha<10){
      pontosOponente+=1;
      ponto.play();
    }
  }