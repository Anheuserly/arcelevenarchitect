import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.1/build/three.module.js";

const items = [
  { label: "Studio", href: "/studio", color: 0x1e332f },
  { label: "Services", href: "/services", color: 0x423225 },
  { label: "Product", href: "/product", color: 0x253a46 },
  { label: "Activity", href: "/activity", color: 0x47302f },
  { label: "Work", href: "/work", color: 0x2d2b41 },
  { label: "Contact", href: "/contact", color: 0x333633 },
];

const stage = document.querySelector("#cube-stage");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(stage.clientWidth, stage.clientHeight);
stage.append(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, stage.clientWidth / stage.clientHeight, 0.1, 100);
camera.position.set(0, 0.15, 4.65);
scene.add(new THREE.AmbientLight(0xffffff, 1.8));
const light = new THREE.DirectionalLight(0xffe4bb, 2.1);
light.position.set(4, 6, 5);
scene.add(light);

const cube = new THREE.Group();
scene.add(cube);
const faceMeshes = [];
const faceGeometry = new THREE.PlaneGeometry(2.45, 2.45);
const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.48, 2.48, 2.48)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.34 }));
cube.add(edges);

function makeTexture(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#d7ddda";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1a2220";
  ctx.font = "600 90px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
  return new THREE.CanvasTexture(canvas);
}

const transforms = [
  [0, 0, 1.25, 0, 0, 0], [0, 0, -1.25, 0, Math.PI, 0],
  [1.25, 0, 0, 0, Math.PI / 2, 0], [-1.25, 0, 0, 0, -Math.PI / 2, 0],
  [0, 1.25, 0, -Math.PI / 2, 0, 0], [0, -1.25, 0, Math.PI / 2, 0, 0],
];

items.forEach((item, index) => {
  const [x, y, z, rx, ry, rz] = transforms[index];
  const mesh = new THREE.Mesh(faceGeometry, new THREE.MeshStandardMaterial({ map: makeTexture(item.label), color: 0xffffff, roughness: 0.62, metalness: 0.08 }));
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.userData = item;
  cube.add(mesh);
  faceMeshes.push(mesh);
});

cube.rotation.set(-0.46, 0.66, 0.03);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function pick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(faceMeshes)[0];
  if (hit) window.location.assign(hit.object.userData.href);
}

stage.addEventListener("click", pick);

function render() {
  renderer.render(scene, camera);
}

new ResizeObserver(() => {
  const { clientWidth, clientHeight } = stage;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
  render();
}).observe(stage);

render();
