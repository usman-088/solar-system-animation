const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const sun = new Image();
sun.src = "./images/sun.png";

const earth = new Image();
earth.src = "./images/earth.png";

const moon = new Image();
moon.src = "./images/moon.png";

let angleEarth = 0;
let angleMoon = 0;
const sunX = () => canvas.width / 2;
const sunY = () => canvas.height / 2;
const earthOrbitRadius = 200;
const moonOrbitRadius = 50;
let isPaused = false;
let isManualControl = false;
let manualSpeed = 0;

function drawOrbit(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawOrbit(sunX(), sunY(), earthOrbitRadius);

  let earthX = sunX() + earthOrbitRadius * Math.cos(angleEarth);
  let earthY = sunY() + earthOrbitRadius * Math.sin(angleEarth);

  drawOrbit(earthX, earthY, moonOrbitRadius);

  let moonX = earthX + moonOrbitRadius * Math.cos(angleMoon);
  let moonY = earthY + moonOrbitRadius * Math.sin(angleMoon);

  ctx.drawImage(sun, sunX() - 50, sunY() - 50, 100, 100);
  ctx.drawImage(earth, earthX - 25, earthY - 25, 50, 50);
  ctx.drawImage(moon, moonX - 10, moonY - 10, 20, 20);

  if (!isPaused) {
    angleEarth += isManualControl ? manualSpeed : 0.01;
    angleMoon += isManualControl ? manualSpeed * 2 : 0.05;
  }

  requestAnimationFrame(animate);
}

// Detect if mouse is over an orbit
canvas.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  let earthDist = Math.hypot(mouseX - sunX(), mouseY - sunY());
  let moonDist = Math.hypot(
    mouseX - (sunX() + earthOrbitRadius * Math.cos(angleEarth)),
    mouseY - (sunY() + earthOrbitRadius * Math.sin(angleEarth))
  );

  if (
    Math.abs(earthDist - earthOrbitRadius) < 10 ||
    Math.abs(moonDist - moonOrbitRadius) < 10
  ) {
    isPaused = true;
  } else {
    isPaused = false;
  }
});

// Allow user to manually rotate using arrow keys
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    isManualControl = true;
    manualSpeed = -0.02;
  } else if (event.key === "ArrowRight") {
    isManualControl = true;
    manualSpeed = 0.02;
  }
});

document.addEventListener("keyup", () => {
  isManualControl = false;
});

let imagesLoaded = 0;
function startAnimation() {
  imagesLoaded++;
  if (imagesLoaded === 3) {
    animate();
  }
}

sun.onload = startAnimation;
earth.onload = startAnimation;
moon.onload = startAnimation;
