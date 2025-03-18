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

function drawOrbit(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawOrbit(sunX(), sunY(), earthOrbitRadius);

  let earthX = sunX() + earthOrbitRadius * Math.cos(angleEarth);
  let earthY = sunY() + earthOrbitRadius * Math.sin(angleEarth);

  console.log(earthX, earthY, Math.cos(angleEarth), Math.sin(angleEarth));

  drawOrbit(earthX, earthY, moonOrbitRadius);

  let moonX = earthX + moonOrbitRadius * Math.cos(angleMoon);
  let moonY = earthY + moonOrbitRadius * Math.sin(angleMoon);

  ctx.drawImage(sun, sunX() - 50, sunY() - 50, 100, 100);

  ctx.drawImage(earth, earthX - 25, earthY - 25, 50, 50);

  ctx.drawImage(moon, moonX - 10, moonY - 10, 20, 20);

  angleEarth += 0.01;
  angleMoon += 0.05;

  requestAnimationFrame(animate);
}
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
