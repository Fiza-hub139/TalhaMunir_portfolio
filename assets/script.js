tailwind.config = {
  theme: {
    extend: {
      colors: {
        themeBg: "var(--bg-color)",
        themeText: "var(--text-color)",
        themeMuted: "var(--text-muted)",
        themeGreen: "var(--primary-green)",
        themeDarkGreen: "var(--dark-green)",
        themeCard: "var(--card-bg)",
      },
    },
  },
};

// Theme Toggle Logic
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  htmlElement.setAttribute("data-theme", newTheme);

  if (newTheme === "light") {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = mobileMenuBtn
  ? document.getElementById("mobile-menu")
  : null;

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
// Scroll Progress Percentage Calculator
window.addEventListener("scroll", () => {
  const winScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
});

// Basic Three.js Scene Setup for 3D Effects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("full-stack-3d-canvas"),
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const mainGroup = new THREE.Group();
scene.add(mainGroup);

const techElements = [
  // Core Skills
  "ServiceNow",
  "ITSM",
  "ITOM",
  "CMDB",
  "GRC / IRM",
  "REST APIs",
  "Python",
  "FastAPI",
  "Kotlin",
  "C++",
  "MID Server",
  // Web & Frontend Development Specifics
  "<div/>",
  "HTML5",
  "CSS3",
  "Tailwind",
  "AngularJS",
  "DOM Node",
  "Flexbox",
  "UI / UX",
  "JavaScript",
  "Responsive",
  "Portal",
];

function createTechBadgeTexture(text, isWebTag) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = isWebTag
    ? "rgba(59, 130, 246, 0.08)"
    : "rgba(16, 185, 129, 0.08)";
  ctx.roundRect(10, 10, 492, 108, 24);
  ctx.fill();
  ctx.strokeStyle = isWebTag
    ? "rgba(59, 130, 246, 0.45)"
    : "rgba(16, 185, 129, 0.45)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = isWebTag ? "#60A5FA" : "#10B981";
  ctx.font = "Bold 42px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 64);

  return new THREE.CanvasTexture(canvas);
}

const allObjects = [];

techElements.forEach((item) => {
  const isWebTag =
    item.includes("<") ||
    item.includes("HTML") ||
    item.includes("CSS") ||
    item.includes("UI") ||
    item.includes("DOM") ||
    item.includes("Flexbox");
  const texture = createTechBadgeTexture(item, isWebTag);

  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.6,
  });
  const sprite = new THREE.Sprite(spriteMat);

  sprite.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 12,
  );

  sprite.scale.set(2.0, 0.5, 1);

  sprite.userData = {
    floatSpeed: 0.0015 + Math.random() * 0.0025,
  };

  allObjects.push(sprite);
  mainGroup.add(sprite);
});

const geometries = [
  new THREE.BoxGeometry(0.7, 0.7, 0.7), // UI Layout Block
  new THREE.OctahedronGeometry(0.55), // AI Core Crystal
  new THREE.IcosahedronGeometry(0.45, 1), // Network Node
];

const wireframeMat = new THREE.MeshBasicMaterial({
  color: 0x10b981,
  wireframe: true,
  transparent: true,
  opacity: 0.25,
});

for (let i = 0; i < 16; i++) {
  const randomGeom = geometries[Math.floor(Math.random() * geometries.length)];
  const mesh = new THREE.Mesh(randomGeom, wireframeMat);

  mesh.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 12,
  );

  mesh.userData = {
    rotSpeedX: (Math.random() - 0.5) * 0.008,
    rotSpeedY: (Math.random() - 0.5) * 0.008,
    floatSpeed: 0.0015 + Math.random() * 0.0025,
  };

  allObjects.push(mesh);
  mainGroup.add(mesh);
}

const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x10b981,
  transparent: true,
  opacity: 0.15,
});

const linesGeometry = new THREE.BufferGeometry();
const lineMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
mainGroup.add(lineMesh);

camera.position.z = 7.5;

// Mouse Movement Parallax
let mouseX = 0,
  mouseY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
});

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  allObjects.forEach((obj) => {
    if (obj.isMesh) {
      obj.rotation.x += obj.userData.rotSpeedX;
      obj.rotation.y += obj.userData.rotSpeedY;
    }

    obj.position.y += obj.userData.floatSpeed;
    if (obj.position.y > 10) obj.position.y = -10;
  });

  const linePositions = [];
  for (let i = 0; i < allObjects.length; i++) {
    for (let j = i + 1; j < allObjects.length; j++) {
      const dist = allObjects[i].position.distanceTo(allObjects[j].position);
      if (dist < 4.2) {
        linePositions.push(
          allObjects[i].position.x,
          allObjects[i].position.y,
          allObjects[i].position.z,
          allObjects[j].position.x,
          allObjects[j].position.y,
          allObjects[j].position.z,
        );
      }
    }
  }

  linesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3),
  );

  mainGroup.rotation.y += (mouseX - mainGroup.rotation.y) * 0.03;
  mainGroup.rotation.x += (-mouseY - mainGroup.rotation.x) * 0.03;

  renderer.render(scene, camera);
}

animate();

// Window Resize Handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
