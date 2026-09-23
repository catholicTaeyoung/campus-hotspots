"use strict";

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

const GAME_TIME = 90;
const BRICK_ROWS = 10;
const BRICK_COLUMNS = 8;
const brickWidth = 76;
const brickHeight = 19;
const brickGap = 7;
const brickLeft = (canvas.width - (BRICK_COLUMNS * brickWidth + (BRICK_COLUMNS - 1) * brickGap)) / 2;
const brickTop = 48;

let ball;
let paddle;
let bricks;
let score;
let clearedRows;
let remainingTime;
let lastTime;
let animationFrame;
let gameState;
let timerInterval;
let countdownInterval;
let countdownTimeout;
let moveLeft = false;
let moveRight = false;

function createBricks() {
	return Array.from({ length: BRICK_ROWS }, (_, row) =>
		Array.from({ length: BRICK_COLUMNS }, (_, column) => ({
			x: brickLeft + column * (brickWidth + brickGap),
			y: brickTop + row * (brickHeight + brickGap),
			row,
			visible: true
		}))
	);
}

function prepareGame() {
	cancelAnimationFrame(animationFrame);
	clearInterval(timerInterval);
	clearInterval(countdownInterval);
	clearTimeout(countdownTimeout);
	ball = { x: canvas.width / 2, y: canvas.height - 72, radius: 8, dx: 2, dy: -2 };
	paddle = { x: canvas.width / 2 - 55, y: canvas.height - 30, width: 110, height: 12, speed: 4 };
	bricks = createBricks();
	score = 0;
	clearedRows = 0;
	remainingTime = GAME_TIME;
	lastTime = performance.now();
	gameState = "ready";
	scoreElement.textContent = score;
	updateTimerText();
	messageElement.textContent = "시작 버튼을 눌러주세요";
	messageElement.hidden = false;
	draw();
}

function startGame() {
	prepareGame();
	restartButton.hidden = true;
	gameState = "countdown";
	let countdown = 3;
	messageElement.textContent = countdown;
	countdownInterval = setInterval(() => {
		countdown -= 1;
		if (countdown > 0) {
			messageElement.textContent = countdown;
			return;
		}
		clearInterval(countdownInterval);
		messageElement.textContent = "START";
		countdownTimeout = setTimeout(beginPlaying, 500);
	}, 700);
}

function beginPlaying() {
	gameState = "playing";
	lastTime = performance.now();
	messageElement.hidden = true;
	timerInterval = setInterval(() => {
		if (gameState !== "playing") return;
		remainingTime -= 1;
		updateTimerText();
		if (remainingTime <= 0) endGame(false);
	}, 1000);
	animationFrame = requestAnimationFrame(gameLoop);
}

function updateTimerText() {
	const minutes = Math.floor(Math.max(remainingTime, 0) / 60);
	const seconds = Math.max(remainingTime, 0) % 60;
	timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function endGame(isClear) {
	if (gameState !== "playing") return;
	gameState = isClear ? "clear" : "over";
	clearInterval(timerInterval);
	messageElement.innerHTML = isClear
		? `GAME CLEAR!<br><small>10줄을 모두 부쉈습니다.<br>점수: ${score}</small>`
		: `GAME OVER<br><small>점수: ${score}</small>`;
	messageElement.hidden = false;
	restartButton.textContent = "게임 다시 시작";
	restartButton.hidden = false;
}

function movePaddle() {
	if (moveLeft) paddle.x -= paddle.speed;
	if (moveRight) paddle.x += paddle.speed;
	paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, paddle.x));
}

function updateBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;

	if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) ball.dx *= -1;
	if (ball.y - ball.radius <= 0) ball.dy *= -1;

	if (ball.dy > 0 && ball.y + ball.radius >= paddle.y && ball.y - ball.radius <= paddle.y + paddle.height && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
		const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
		ball.dx = hitPosition * 3;
		ball.dy = -Math.abs(ball.dy);
		ball.y = paddle.y - ball.radius;
	}

	if (ball.y - ball.radius > canvas.height) {
		endGame(false);
		return;
	}

	bricks.flat().forEach((brick) => {
		if (!brick.visible) return;
		const hit = ball.x + ball.radius > brick.x && ball.x - ball.radius < brick.x + brickWidth && ball.y + ball.radius > brick.y && ball.y - ball.radius < brick.y + brickHeight;
		if (!hit) return;
		brick.visible = false;
		ball.dy *= -1;
		score += 10;
		scoreElement.textContent = score;
		const rowCleared = bricks[brick.row].every((rowBrick) => !rowBrick.visible);
		if (rowCleared) {
			clearedRows += 1;
			if (clearedRows >= BRICK_ROWS) endGame(true);
		}
	});
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#0b1325";
	context.fillRect(0, 0, canvas.width, canvas.height);

	bricks.flat().forEach((brick) => {
		if (!brick.visible) return;
		const hue = 185 + brick.row * 12;
		context.fillStyle = `hsl(${hue}, 78%, 62%)`;
		context.fillRect(brick.x, brick.y, brickWidth, brickHeight);
	});

	context.fillStyle = "#f5f7ff";
	context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	context.fill();
	context.fillStyle = "#ffca6b";
	context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function gameLoop(timestamp) {
	if (gameState !== "playing") {
		draw();
		return;
	}
	const elapsed = Math.min(timestamp - lastTime, 32);
	lastTime = timestamp;
	const stepCount = Math.max(1, Math.round(elapsed / 16));
	movePaddle();
	for (let step = 0; step < stepCount; step += 1) updateBall();
	draw();
	animationFrame = requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
	if (event.code === "Space" && !event.repeat && ["ready", "clear", "over"].includes(gameState)) {
		event.preventDefault();
		restartButton.click();
		return;
	}
	if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
		event.preventDefault();
		if (event.key === "ArrowLeft") moveLeft = true;
		if (event.key === "ArrowRight") moveRight = true;
	}
});
window.addEventListener("keyup", (event) => {
	if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.preventDefault();
	if (event.key === "ArrowLeft") moveLeft = false;
	if (event.key === "ArrowRight") moveRight = false;
});
restartButton.addEventListener("click", startGame);

prepareGame();
