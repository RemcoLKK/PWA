const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE"
};

const paddleWidth = 10, paddleHeight = 100;
const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "WHITE",
  score: 0
};
const computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "WHITE",
  score: 0
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px Arial";
  ctx.fillText(text, x, y);
}
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "BLACK");
  drawText(player.score, canvas.width/4, 50, "WHITE");
  drawText(computer.score, 3*canvas.width/4, 50, "WHITE");
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
    ball.velocityY = -ball.velocityY;
  }
  computer.y += ((ball.y - (computer.y + paddleHeight/2))) * 0.09;

  function collision(b, p){
    return b.x < p.x + p.width && b.x > p.x &&
           b.y < p.y + p.height && b.y > p.y;
  }

  if(collision(ball, player) || collision(ball, computer)){
    ball.velocityX = -ball.velocityX;
  }

  if(ball.x - ball.radius < 0){
    computer.score++;
    resetBall();
  } else if(ball.x + ball.radius > canvas.width){
    player.score++;
    resetBall();
  }
}
function resetBall(){
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.velocityY = 5;
}

canvas.addEventListener("mousemove", evt => {
  let rect = canvas.getBoundingClientRect();
  player.y = evt.clientY - rect.top - player.height / 2;
});

function game(){
  update();
  render();
}
setInterval(game, 1000/60);
