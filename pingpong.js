// Variáveis da Bolinha
let xBolinha = 400;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

// Variáveis da Velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// Variáveis da Raquete do Oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// Variável da Colisão
let colisao = false;

// Variáveis relacionadas aos pontos
let meusPontos = 0;
let pontosDoOponente = 0;

// Variáveis dos sons do jogo
let raquetada;
let ponto;
let trilha;

alert("Controle Player 1: W para Cima e S para Baixo");
alert("Controle Player 2: Up para Cima e Down para Baixo");

function preload() {
    trilha = loadSound("trilha.mp3");
    raquetada = loadSound("raquetada.mp3");
    ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(800, 400);
  trilha.loop();
  trilha.setVolume(0.2);
}

function draw() {
  background(0);
  bolinha();
  movimentoBolinha()
  colisaoBordaBolinha();
  raquete(xRaquete, yRaquete);
  movimentoRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  raquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaqueteOponente();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  pontos();
  incluirPontos();
  bolinhaNaoFicaPresa();
}

function bolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBordaBolinha() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function raquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentoRaquete() {
  if (keyIsDown(87) && yRaquete > 0) {
    yRaquete -= 10;
  }
  if (keyIsDown(83) && yRaquete < height - alturaRaquete) {
    yRaquete += 10;
  }
}

function colisaoRaquete(x, y) {
    colisao = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colisao) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function movimentoRaqueteOponente() {
    if (keyIsDown(UP_ARROW) && yRaqueteOponente > 0) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW) && yRaqueteOponente < height - alturaRaquete) {
        yRaqueteOponente += 10;
    }
}

function pontos () {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(251, 10, 40, 20);
    fill(255);
    text(meusPontos, 271, 26);
    fill(color(255, 140, 0));
    rect(521, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 541, 26);
}

function incluirPontos() {
    if (xBolinha > 790) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log("bolinha ficou presa");
    xBolinha = 400;
    }
}