let canvas = document.getElementById("languages-canvas");
let canvas_container = canvas.parentElement;
let cc_rect = canvas_container.getBoundingClientRect();
canvas_container.style.position = "relative";

canvas.width = cc_rect.width;
canvas.height = cc_rect.height + 100;

let ctx = canvas.getContext("2d");
ctx.imageSmoothingQuality = "high";

function random_range(a, b) {
  let diff = b - a;
  diff += 1
  return Math.floor(Math.random() * diff) + a;
}

let all_logos = [];

class Item {
  constructor(image_name) {
    this.image_name = image_name;
    this.raw_image = new Image();
    this.rect = {
      x: random_range(0, canvas.width),
      y: random_range(0, canvas.height),
      w: 10,
      h: random_range(30, 80),
    }
    this.image = document.createElement("canvas");
    this.raw_image.src = `/images/${this.image_name}`;
    this.raw_image.onload = () => {
      this.rect.w = this.raw_image.width * (this.rect.h / this.raw_image.height);
      this.image.width = this.rect.w;
      this.image.height = this.rect.h;
      this.image.getContext("2d").drawImage(this.raw_image, 0, 0, this.raw_image.width, this.raw_image.height,
        0, 0, this.rect.w, this.rect.h);
      this.draw();
    }

    this.xspeed = random_range(-10, 10);
    this.yspeed = random_range(0, -10);
    this.angle = 0;
    this.anglespeed = random_range(-5, 5);

    all_logos.push(this);
  }

  draw() {
    ctx.save();
    ctx.translate(this.centerx, this.centery);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.drawImage(this.image, 0 - this.rect.w / 2, 0 - this.rect.h / 2, this.rect.w, this.rect.h);
    ctx.restore();
  }

  update() {
    this.rect.x += this.xspeed;
    this.rect.y += this.yspeed;
    this.yspeed += 0.01;
    this.angle += this.anglespeed;

    if (this.right > canvas.width) {
      this.xspeed *= -0.9;
      this.rect.x = canvas.width - (this.rect.w + 5);
      this.anglespeed = random_range(-5, 5);
    }

    if (this.left < 0) {
      this.rect.x = 0;
      this.xspeed *= -0.9;
      this.anglespeed = random_range(-5, 5);
    }

    if (this.top > canvas.height) {
      this.rect.y = canvas.height-this.rect.h;
      this.rect.x = random_range(0, canvas.width)
      this.yspeed = random_range(0, -10);
      this.xspeed = random_range(-10, 10);
      this.anglespeed = random_range(-5, 5);
    }

  }

  get["right"]() {
    return this.rect.x + this.rect.h;
  }

  get["left"]() {
    return this.rect.x;
  }

  get["top"]() {
    return this.rect.y;
  }

  get["bottom"]() {
    return this.rect.y + this.rect.h;
  }

  get["centerx"]() {
    return this.rect.x + (this.rect.w / 2);
  }

  get["centery"]() {
    return this.rect.y + (this.rect.h / 2);
  }
}

let logo = new Item("gc_powerbuttonlogo_100x100.png");
let pylogo = new Item("python_logo.png");
let atom_logo = new Item("atom_icon.png");
let android_logo = new Item("android_logo.png");
let chrome_logo = new Item("chrome_logo.png");
let code_logo = new Item("code_icon.png");
let cpp_logo = new Item("cpp_logo.png");
let css_logo = new Item("css_logo.png");
let html_logo = new Item("html_logo.png");
let java_logo = new Item("java_logo.png");
let js_logo = new Item("js_logo.png");
let nginx_logo = new Item("nginx_logo.png");
let scratch_logo = new Item("scratch_logo.png");
let ubuntu_logo = new Item("ubuntu_logo.png");
new Item("sql_logo.png");

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let it of all_logos) {
    it.draw();
  }
}

function update() {
  for (let it of all_logos) {
    it.update();
  }
}

setInterval(() => {
  update();
  draw();
}, 1000 / 60);
