// Sistema Solar
let sun = new Image();
let moon = new Image();
let earth = new Image();
const ctxS = document.getElementById("canvasSolarSystem").getContext("2d");

sun.src = "canvas_sun.png";
moon.src = "canvas_moon.png";
earth.src = "canvas_earth.png";

// Verificar si las imágenes se cargan correctamente
sun.onerror = () => console.error('Error al cargar canvas_sun.png');
moon.onerror = () => console.error('Error al cargar canvas_moon.png');
earth.onerror = () => console.error('Error al cargar canvas_earth.png');

function initSolarSystem() {
  window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
  ctxS.globalCompositeOperation = "destination-over";
  ctxS.clearRect(0, 0, 300, 300);

  ctxS.fillStyle = "rgba(0,0,0,0.4)";
  ctxS.strokeStyle = "rgba(0,153,255,0.4)";
  ctxS.save();
  ctxS.translate(150, 150);

  let time = new Date();
  ctxS.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
    ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctxS.translate(105, 0);
  ctxS.fillRect(0, -12, 50, 24);
  ctxS.drawImage(earth, -12, -12);

  ctxS.save();
  ctxS.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
    ((2 * Math.PI) / 6000) * time.getMilliseconds()
  );
  ctxS.translate(0, 28.5);
  ctxS.drawImage(moon, -3.5, -3.5);
  ctxS.restore();

  ctxS.restore();
  ctxS.beginPath();
  ctxS.arc(150, 150, 105, 0, Math.PI * 2, false);
  ctxS.stroke();
  ctxS.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawSolarSystem);
}

initSolarSystem();






function clock() {
  const now = new Date();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // Hour marks
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  const sec = now.getSeconds();
  // To display a clock with a sweeping second hand, use:
  // const sec = now.getSeconds() + now.getMilliseconds() / 1000;
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  ctx.fillStyle = "black";

  // Write image description
  canvas.innerText = `The time is: ${hr}:${min}`;

  // Write Hours
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Write Minutes
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "rgb(0 0 0 / 0%)";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325FA2";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);














const img = new Image();
img.src = "img.jpg"; // Asegúrate de que esta ruta sea correcta
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30;
const scale = 1.05;
const y = -4.5;

const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctxA;

img.onload = () => {
    imgW = img.width * scale;
    imgH = img.height * scale;

    if (imgW > canvasXSize) {
        x = canvasXSize - imgW;
    }

    clearX = Math.max(imgW, canvasXSize);
    clearY = Math.max(imgH, canvasYSize);

    ctxA = document.getElementById("canvasImg").getContext("2d");

    setInterval(draw, speed);
};

function draw() {
    ctxA.clearRect(0, 0, clearX, clearY);

    if (imgW <= canvasXSize) {
        if (x > canvasXSize) {
            x = -imgW + x;
        }
        if (x > 0) {
            ctxA.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
            ctxA.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    } else {
        if (x > canvasXSize) {
            x = canvasXSize - imgW;
        }
        if (x > canvasXSize - imgW) {
            ctxA.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }

    ctxA.drawImage(img, x, y, imgW, imgH);
    x += dx;
}
