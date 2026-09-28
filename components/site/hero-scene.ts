import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * The Bitropix logo rebuilt in 3D: five glossy cubes on a 3x3 checkerboard,
 * with the four "white" cells drawn as faint wireframes.
 *  - follows the pointer (whole group tilts toward it)
 *  - drag to spin, with inertia (mouse only, so touch scrolling is untouched)
 *  - hovered cube pops forward
 *  - scrolling the hero away makes the cubes drift apart
 * Rendering pauses when the canvas is off-screen or the tab is hidden.
 */
export function createHeroScene(container: HTMLElement, getScroll: () => number, { lite = false } = {}) {
  const width = () => container.clientWidth;
  const height = () => container.clientHeight;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.5 : 1.75));
  renderer.setSize(width(), height());
  // Neutral tone mapping keeps the brand orange-red saturated (ACES washes it towards salmon).
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Reflection environment looks best but is the most expensive step; lite mode (touch devices)
  // swaps it for a cheap hemisphere light.
  const pmrem = lite ? null : new THREE.PMREMGenerator(renderer);
  const envTex = pmrem ? pmrem.fromScene(new RoomEnvironment(), 0.04).texture : null;
  if (envTex) {
    scene.environment = envTex;
    scene.environmentIntensity = 0.55;
  } else {
    scene.add(new THREE.HemisphereLight(0xfff1ea, 0x3a0e06, 2.1));
  }

  const camera = new THREE.PerspectiveCamera(32, width() / height(), 0.1, 100);
  camera.position.set(0, 0, 11);

  const key = new THREE.DirectionalLight(0xfff1ea, 1.6);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff3a1a, 2.4);
  rim.position.set(-6, -2, -4);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const size = 1.2;
  const gap = 1.2; // cells touch, exactly like the logo
  const geo = new RoundedBoxGeometry(size, size, size, 4, 0.06);
  // Left column leans orange, right column leans red: the logo's gradient, in 3D.
  const makeMat = (color: number) =>
    new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.32,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    });
  const matA = makeMat(0xff5a1f);
  const matB = makeMat(0xff3a22);
  const matC = makeMat(0xff2424);

  // Only the five filled squares of the logo are rendered; the empty cells stay empty.
  type Cell = { obj: THREE.Mesh; home: THREE.Vector3; seed: number; pop: number };
  const cells: Cell[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if ((r + c) % 2 !== 0) continue;
      const home = new THREE.Vector3((c - 1) * gap, (1 - r) * gap, 0);
      const obj = new THREE.Mesh(geo, c === 0 ? matA : c === 1 ? matB : matC);
      obj.position.copy(home);
      group.add(obj);
      cells.push({ obj, home, seed: Math.random() * Math.PI * 2, pop: 0 });
    }
  }
  const solids = cells;

  group.rotation.set(-0.25, 0.45, 0);

  // ---- interaction state ----
  const pointer = new THREE.Vector2(0, 0);
  const ndc = new THREE.Vector2(-10, -10);
  const raycaster = new THREE.Raycaster();
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let spinX = 0;
  let spinY = 0;
  let velX = 0;
  let velY = 0.0025; // idle drift

  // Is the pointer over one of the cubes (not just over the canvas box)?
  const hitTest = () => {
    raycaster.setFromCamera(ndc, camera);
    return raycaster.intersectObjects(
      solids.map((s) => s.obj),
      false
    )[0];
  };

  // The custom cursor shows "Drag" only while over a cube or mid-drag.
  let labelShown = false;
  const setLabel = (on: boolean) => {
    if (on === labelShown) return;
    labelShown = on;
    window.dispatchEvent(new CustomEvent('bx-cursor', { detail: on ? 'Drag' : null }));
  };

  const onMove = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    // Only hit-test when the canvas itself is under the pointer (not the navbar, buttons, etc.).
    if (container.contains(e.target as Node)) ndc.copy(pointer);
    else ndc.set(-10, -10);
    if (dragging) {
      velY = (e.clientX - lastX) * 0.004;
      velX = (e.clientY - lastY) * 0.004;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  };
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !hitTest()) return; // drag starts only from a cube
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    container.style.cursor = 'grabbing';
  };
  const onUp = () => {
    dragging = false;
    container.style.cursor = '';
  };
  const onLeave = () => ndc.set(-10, -10);

  window.addEventListener('pointermove', onMove, { passive: true });
  container.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  container.addEventListener('pointerleave', onLeave);

  const onResize = () => {
    const w = width();
    const h = height();
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    // keep the logo framed on narrow screens
    camera.position.z = w / h < 0.9 ? 14 : 11;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(container);
  onResize();

  // ---- render loop (paused off-screen / hidden tab) ----
  let running = true;
  let onScreen = true;
  let raf = 0;
  const clock = new THREE.Clock();

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    schedule();
  });
  io.observe(container);
  const onVis = () => schedule();
  document.addEventListener('visibilitychange', onVis);

  function schedule() {
    const shouldRun = onScreen && document.visibilityState === 'visible';
    if (shouldRun && !running) {
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;
      cancelAnimationFrame(raf);
      setLabel(false); // scrolled away: never leave the label stuck on
    }
  }

  function frame() {
    if (!running) return;
    const t = clock.getElapsedTime();
    const scroll = Math.min(Math.max(getScroll(), 0), 1.5);

    // inertia spin + pointer tilt
    spinY += velY;
    spinX += velX;
    if (!dragging) {
      velY += (0.0025 - velY) * 0.03;
      velX *= 0.94;
      spinX *= 0.985;
    }
    const targetX = -0.25 + pointer.y * -0.35 + spinX;
    const targetY = 0.45 + pointer.x * 0.5 + spinY;
    group.rotation.x += (targetX - group.rotation.x) * 0.08;
    group.rotation.y += (targetY - group.rotation.y) * 0.08;

    // hover pop + "Drag" label only while actually over a cube
    const hit = hitTest();
    setLabel(dragging || !!hit);

    for (const cell of cells) {
      const hovered = hit && hit.object === cell.obj;
      cell.pop += ((hovered ? 1 : 0) - cell.pop) * 0.12;
      const float = Math.sin(t * 1.1 + cell.seed) * 0.08;
      const spread = 1 + scroll * 1.6;
      cell.obj.position.set(
        cell.home.x * spread,
        cell.home.y * spread + float,
        cell.home.z + cell.pop * 0.9 + scroll * Math.sin(cell.seed) * 2.5
      );
      cell.obj.rotation.x = scroll * (cell.seed - Math.PI) * 0.8 + cell.pop * 0.4;
      cell.obj.rotation.y = scroll * cell.seed * 0.6 + cell.pop * 0.6;
      const s = 1 + cell.pop * 0.08;
      cell.obj.scale.setScalar(s);
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    setLabel(false);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    container.removeEventListener('pointerleave', onLeave);
    geo.dispose();
    matA.dispose();
    matB.dispose();
    matC.dispose();
    envTex?.dispose();
    pmrem?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
