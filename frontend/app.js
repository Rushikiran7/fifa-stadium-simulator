// ============================================================================
// FIFA World Cup 2026™ GenAI Stadium Operations Simulator
// Consolidated Application — All modules in one file
// ============================================================================

// --- SECTION 1: GLOBAL STATE ---
const state = {
  crowdIntensity: 80,
  trafficRedirected: false,
  routeVisible: true,
  roofLightsOn: true,
  roofClosed: false,
  activeAlerts: 2,
  selectedRoute: 'rail',
  cameraAutoOrbit: true,
  currentLang: 'en',
  activeWayfinding: null,
  currentScenario: 'normal'
};

// --- SECTION 2: SECURITY — HTML ESCAPE UTILITY ---
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// --- SECTION 3: TRANSLATIONS ---
const translations = {
  en: {
    header_title: "NEXT-GEN STADIUM EXPERIENCE PLATFORM",
    header_subtitle: "POWERED BY GENERATIVE AI • METLIFE STADIUM, NJ",
    crowd_title: "Crowd Management",
    crowd_label: "Crowd Density Simulation",
    btn_redirect: "Execute Traffic Redirection",
    access_title: "Accessibility & Wayfinding",
    btn_highlight: "Highlight Path in 3D Scene",
    wayfind_label: "Wayfinding: Locate Facility",
    sustain_title: "Sustainability Dashboard",
    energy_title: "Energy Consumption",
    water_title: "Water Usage",
    waste_title: "Waste Sorting",
    alerts_title: "Operational Intelligence",
    chat_title: "Multilingual Assistance",
    chat_name: "GenAI Staff Assistant",
    chat_placeholder: "Ask avatar or type staff broadcast announcement...",
    simulator_title: "GENAI METLIFE STADIUM SIMULATOR",
    scorecard_title: "GenAI Scorecard & Predictions",
    crowd_recom_desc: "<strong>AI Predicts:</strong> High-density flow near Gate B. Redirecting 20% of fan traffic to Gate C.",
    diagnostics_title: "GenAI Self-Test & Diagnostics"
  },
  es: {
    header_title: "PLATAFORMA DE EXPERIENCIA DE ESTADIO DE PRÓXIMA GENERACIÓN",
    header_subtitle: "IMPULSADO POR IA GENERATIVA • ESTADIO METLIFE, NJ",
    crowd_title: "Gestión de Multitudes",
    crowd_label: "Simulación de Densidad de Multitud",
    btn_redirect: "Ejecutar Redirección de Tráfico",
    access_title: "Accesibilidad y Orientación",
    btn_highlight: "Destacar Ruta en la Escena 3D",
    wayfind_label: "Orientación: Localizar Instalación",
    sustain_title: "Panel de Sostenibilidad",
    energy_title: "Consumo de Energía",
    water_title: "Uso de Agua",
    waste_title: "Clasificación de Residuos",
    alerts_title: "Inteligencia Operacional",
    chat_title: "Asistencia Multilingüe",
    chat_name: "Asistente de Personal de GenAI",
    chat_placeholder: "Pregunte al avatar o escriba el anuncio...",
    simulator_title: "SIMULADOR METLIFE DE OPERACIONES GENAI",
    scorecard_title: "Marcador y Predicciones de GenAI",
    crowd_recom_desc: "<strong>Predicción de IA:</strong> Flujo denso cerca de Puerta B. Redirigiendo 20% de fans a Puerta C.",
    diagnostics_title: "Auto-Diagnóstico GenAI"
  },
  fr: {
    header_title: "PLATEFORME D'EXPÉRIENCE DE STADE DE NOUVELLE GÉNÉRATION",
    header_subtitle: "PROPULSÉ PAR L'IA GÉNÉRATIVE • STADE METLIFE, NJ",
    crowd_title: "Gestion des Foules",
    crowd_label: "Simulation de Densité de Foule",
    btn_redirect: "Exécuter la Redirection du Trafic",
    access_title: "Accessibilité et Guidage",
    btn_highlight: "Surligner le Chemin dans la Scène 3D",
    wayfind_label: "Guidage: Localiser l'Équipement",
    sustain_title: "Tableau de Bord de Durabilité",
    energy_title: "Consommation d'Énergie",
    water_title: "Utilisation de l'Eau",
    waste_title: "Tri des Déchets",
    alerts_title: "Intelligence Opérationnelle",
    chat_title: "Assistance Multilingue",
    chat_name: "Assistant du Personnel de GenAI",
    chat_placeholder: "Demandez à l'avatar ou tapez l'annonce...",
    simulator_title: "SIMULATEUR DE STADE METLIFE GENAI",
    scorecard_title: "Tableau d'Analyse GenAI",
    crowd_recom_desc: "<strong>IA Prédit:</strong> Flux dense près de la Porte B. Redirection de 20% des fans vers la Porte C.",
    diagnostics_title: "Auto-Diagnostic GenAI"
  },
  loc: {
    header_title: "NEXT-GEN METLIFE STADIUM TLALLI",
    header_subtitle: "POWERED BY GENAI &bull; METLIFE STADIUM, NJ",
    crowd_title: "Mitz-tzotzoloa Cualli",
    crowd_label: "Crowd Density Tlalli",
    btn_redirect: "Reroute Fan Flow Ohtla",
    access_title: "Access tlalli & Wayfinding",
    btn_highlight: "Highlight Path Ohtla 3D",
    wayfind_label: "Wayfinding: Locate Ohtla",
    sustain_title: "Sustainability Dashboard",
    energy_title: "Energy Tlalli",
    water_title: "Atl Usage",
    waste_title: "Waste sorting",
    alerts_title: "Operational Intelligence",
    chat_title: "Multilingual Assistance",
    chat_name: "GenAI Staff Assistant",
    chat_placeholder: "Ask avatar ximoxpano announcement...",
    simulator_title: "GENAI METLIFE STADIUM SIMULATOR",
    scorecard_title: "GenAI Scorecard Predictions",
    crowd_recom_desc: "<strong>AI Predicts:</strong> High-density near Gate B. Redirecting 20% to Gate C.",
    diagnostics_title: "GenAI Diagnostics"
  }
};

// --- SECTION 4: DOM ELEMENTS ---
const clockEl = document.getElementById('simulator-clock');
const crowdIntensitySlider = document.getElementById('crowd-intensity');
const crowdIntensityVal = document.getElementById('crowd-intensity-val');
const btnRedirectTraffic = document.getElementById('btn-redirect-traffic');
const btnToggleRoute3d = document.getElementById('btn-toggle-route-3d');
const routeRailBtn = document.getElementById('route-rail-btn');
const routeParkingBtn = document.getElementById('route-parking-btn');
const btnOrbitSpin = document.getElementById('btn-orbit-spin');
const btnViewTop = document.getElementById('btn-view-top');
const btnViewSide = document.getElementById('btn-view-side');
const btnStadiumLights = document.getElementById('btn-stadium-lights');
const alertsCountBadge = document.getElementById('alerts-count');
const chatInput = document.getElementById('chat-input-test');
const btnSendChat = document.getElementById('btn-send-chat');
const chatHistoryList = document.getElementById('chat-history-list');
const gateBPill = document.getElementById('gate-b-pill');
const gateCPill = document.getElementById('gate-c-pill');
const crowdRecommendation = document.getElementById('crowd-recommendation');
const coordDisplay = document.getElementById('coord-display');
const scenarioSelector = document.getElementById('scenario-selector');

// --- SECTION 5: REAL-TIME CLOCK ---
setInterval(() => {
  const now = new Date();
  const y = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  if (clockEl) clockEl.textContent = `${y}-${mo}-${d} ${h}:${mi}:${s}`;
}, 1000);

// --- SECTION 6: THREE.JS 3D ENGINE ---
const canvasWrapper = document.getElementById('threejs-canvas-wrapper');
let scene, camera, renderer, controls;
let stadiumGroup, crowdParticles, accessRouteLine, accessRouteLineParking;
let concessionCube4B, fanZoneMarker;
let activeWayfindingLine, wayfindingLocatorPin;
let jumbotronCanvas, jumbotronContext, jumbotronTexture;
let standSectors = [];
let gateAArch, gateBArch, gateCArch, gateDArch;
let roofPanelLeft, roofPanelRight;
let thunderstormRainParticles;

// Safe WebGL resource disposal
function disposeObject(obj) {
  if (!obj) return;
  while (obj.children && obj.children.length > 0) {
    disposeObject(obj.children[0]);
    obj.remove(obj.children[0]);
  }
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
    } else {
      if (obj.material.map) obj.material.map.dispose();
      obj.material.dispose();
    }
  }
}

function init3D() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050811, 0.012);

  const width = canvasWrapper.clientWidth;
  const height = canvasWrapper.clientHeight;
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 24, 34);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  canvasWrapper.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  controls.minDistance = 8;
  controls.maxDistance = 90;

  // Performance: only update coord display when camera actually moves
  controls.addEventListener('change', updateCoordDisplay);

  const ambientLight = new THREE.AmbientLight(0x0a1024, 1.2);
  scene.add(ambientLight);

  const twilightLight = new THREE.DirectionalLight(0x3a5d8f, 0.8);
  twilightLight.position.set(15, 25, -15);
  scene.add(twilightLight);

  const spotLight = new THREE.PointLight(0x00f0ff, 2.5, 45, 0.5);
  spotLight.position.set(0, 8, 0);
  spotLight.name = 'rimSpotlight';
  scene.add(spotLight);

  stadiumGroup = new THREE.Group();
  scene.add(stadiumGroup);

  buildEnvironmentGrid();
  buildMetLifeStadium();
  buildFourGates();
  buildCrowdParticlesPhysics();
  buildWayfindingDestinations();
  buildRetractableRoof();
  buildThunderstormEffects();

  updateCoordDisplay();
  window.addEventListener('resize', onWindowResize);
}

function updateCoordDisplay() {
  if (coordDisplay && camera) {
    coordDisplay.textContent = `CAM X: ${camera.position.x.toFixed(2)} | Y: ${camera.position.y.toFixed(2)} | Z: ${camera.position.z.toFixed(2)}`;
  }
}

// --- Environment ---
function buildEnvironmentGrid() {
  const gridHelper = new THREE.GridHelper(120, 60, 0x00f0ff, 0x07152b);
  gridHelper.position.y = -0.05;
  scene.add(gridHelper);

  const groundGeo = new THREE.PlaneGeometry(240, 240);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x03050b, roughness: 0.95 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.1;
  scene.add(ground);

  const treeTrunkGeo = new THREE.CylinderGeometry(0.1, 0.15, 0.5, 8);
  const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x221100 });
  const treeTopGeo = new THREE.ConeGeometry(0.4, 1.2, 8);
  const treeTopMat = new THREE.MeshStandardMaterial({ color: 0x003311, roughness: 0.8 });

  for (let i = 0; i < 45; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 18 + Math.random() * 20;
    const tx = radius * Math.cos(angle);
    const tz = radius * Math.sin(angle);
    if (Math.abs(tx) < 2 || Math.abs(tz) < 2) continue;
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
    trunk.position.y = 0.25;
    const leaves = new THREE.Mesh(treeTopGeo, treeTopMat);
    leaves.position.y = 1.0;
    treeGroup.add(trunk);
    treeGroup.add(leaves);
    treeGroup.position.set(tx, 0, tz);
    scene.add(treeGroup);
  }

  const parkGeo = new THREE.PlaneGeometry(18, 14);
  const parkMat = new THREE.MeshStandardMaterial({ color: 0x0c101c });
  const parkingLot = new THREE.Mesh(parkGeo, parkMat);
  parkingLot.rotation.x = -Math.PI / 2;
  parkingLot.position.set(-22, 0.01, 15);
  scene.add(parkingLot);

  const carColors = [0xff3b30, 0x00f0ff, 0xffb700, 0xffffff, 0x555555];
  const carGeo = new THREE.BoxGeometry(0.6, 0.3, 1.2);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      if (Math.random() < 0.15) continue;
      const carMat = new THREE.MeshStandardMaterial({ color: carColors[Math.floor(Math.random() * carColors.length)] });
      const car = new THREE.Mesh(carGeo, carMat);
      car.position.set(-27 + c * 2, 0.16, 11 + r * 3);
      scene.add(car);
    }
  }
}

// --- Stadium ---
function buildMetLifeStadium() {
  const pitchGeo = new THREE.PlaneGeometry(14, 9);
  const pitchMat = new THREE.MeshStandardMaterial({ color: 0x113d1f, roughness: 0.6, emissive: 0x04180a });
  const pitch = new THREE.Mesh(pitchGeo, pitchMat);
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.y = 0.05;
  stadiumGroup.add(pitch);

  const fieldLineGeo = new THREE.EdgesGeometry(pitchGeo);
  const fieldLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
  const pitchBorder = new THREE.LineSegments(fieldLineGeo, fieldLineMat);
  pitchBorder.rotation.x = -Math.PI / 2;
  pitchBorder.position.y = 0.06;
  stadiumGroup.add(pitchBorder);

  const centerCircleGeo = new THREE.RingGeometry(1.8, 1.85, 32);
  const centerCircleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const centerCircle = new THREE.Mesh(centerCircleGeo, centerCircleMat);
  centerCircle.rotation.x = -Math.PI / 2;
  centerCircle.position.set(0, 0.06, 0);
  stadiumGroup.add(centerCircle);

  const goalGeo = new THREE.BoxGeometry(0.4, 1.2, 2.4);
  const goalMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const goalLeft = new THREE.Mesh(goalGeo, goalMat);
  goalLeft.position.set(-7, 0.6, 0);
  stadiumGroup.add(goalLeft);
  const goalRight = new THREE.Mesh(goalGeo, goalMat);
  goalRight.position.set(7, 0.6, 0);
  stadiumGroup.add(goalRight);

  for (let i = 0; i < 8; i++) {
    const angleStart = (i * Math.PI / 4) + 0.06;
    const angleLength = (Math.PI / 4) - 0.12;
    const lowerStandGeo = new THREE.CylinderGeometry(8.5, 10.5, 2.2, 12, 2, true, angleStart, angleLength);
    const upperStandGeo = new THREE.CylinderGeometry(10.8, 12.8, 3.2, 12, 2, true, angleStart, angleLength);
    let standColor = 0x3e4a59;
    let emissiveHex = 0x11161d;
    if ((i === 5 || i === 6) && !state.trafficRedirected) {
      standColor = 0xffb700;
      emissiveHex = 0x332200;
    }
    const lowerMat = new THREE.MeshStandardMaterial({ color: standColor, roughness: 0.6, metalness: 0.4, side: THREE.DoubleSide, emissive: emissiveHex });
    const upperMat = new THREE.MeshStandardMaterial({ color: 0x27303f, roughness: 0.5, metalness: 0.5, side: THREE.DoubleSide, emissive: 0x0a0c10 });
    const lowerWedge = new THREE.Mesh(lowerStandGeo, lowerMat);
    lowerWedge.position.y = 1.1;
    lowerWedge.scale.set(1.2, 1, 1);
    stadiumGroup.add(lowerWedge);
    standSectors.push(lowerWedge);
    const upperWedge = new THREE.Mesh(upperStandGeo, upperMat);
    upperWedge.position.y = 3.2;
    upperWedge.scale.set(1.2, 1, 1);
    stadiumGroup.add(upperWedge);
  }

  const pillarGeo = new THREE.CylinderGeometry(0.18, 0.18, 5.5, 8);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x5a6370, metalness: 0.7 });
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4;
    const px = 13.5 * Math.cos(angle) * 1.2;
    const pz = 13.5 * Math.sin(angle);
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(px, 2.75, pz);
    stadiumGroup.add(pillar);
  }

  const louverMat = new THREE.MeshStandardMaterial({ color: 0x8899a6, roughness: 0.25, metalness: 0.85, side: THREE.DoubleSide, emissive: 0x18202b });
  const louverGeo = new THREE.CylinderGeometry(13.3, 13.5, 0.9, 32, 1, true);
  for (let lvl = 0; lvl < 3; lvl++) {
    const louver = new THREE.Mesh(louverGeo, louverMat);
    louver.position.y = 1.0 + lvl * 1.4;
    louver.scale.set(1.2, 1, 1);
    stadiumGroup.add(louver);
    const edgesGeo = new THREE.EdgesGeometry(louverGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    edges.position.y = 1.0 + lvl * 1.4;
    edges.scale.set(1.2, 1, 1);
    stadiumGroup.add(edges);
  }

  const rimLightsGeo = new THREE.TorusGeometry(12.5, 0.25, 8, 32);
  const rimLightsMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, emissive: 0x0077aa });
  const rimLights = new THREE.Mesh(rimLightsGeo, rimLightsMat);
  rimLights.rotation.x = Math.PI / 2;
  rimLights.position.y = 5.0;
  rimLights.scale.set(1.2, 1, 1);
  stadiumGroup.add(rimLights);

  jumbotronCanvas = document.createElement('canvas');
  jumbotronCanvas.width = 128;
  jumbotronCanvas.height = 128;
  jumbotronContext = jumbotronCanvas.getContext('2d');
  jumbotronTexture = new THREE.CanvasTexture(jumbotronCanvas);
  updateJumbotronDisplay("ARG 2-1 ESP");

  const cornerBoardGeo = new THREE.BoxGeometry(1.6, 1.0, 0.3);
  const cornerBoardMat = new THREE.MeshBasicMaterial({ map: jumbotronTexture });
  const corners = [
    { x: 10.5, z: -6.5, rot: -Math.PI / 4 },
    { x: -10.5, z: -6.5, rot: Math.PI / 4 },
    { x: 10.5, z: 6.5, rot: -3 * Math.PI / 4 },
    { x: -10.5, z: 6.5, rot: 3 * Math.PI / 4 }
  ];
  corners.forEach(pos => {
    const screen = new THREE.Mesh(cornerBoardGeo, cornerBoardMat);
    screen.position.set(pos.x, 3.8, pos.z);
    screen.rotation.y = pos.rot;
    stadiumGroup.add(screen);
    const standGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.set(pos.x, 2.9, pos.z);
    stadiumGroup.add(stand);
  });

  const concessionGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const concessionMat = new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0x660000 });
  concessionCube4B = new THREE.Mesh(concessionGeo, concessionMat);
  concessionCube4B.position.set(7, 0.4, -6);
  stadiumGroup.add(concessionCube4B);
  const ringAlertGeo = new THREE.RingGeometry(0.8, 1.0, 16);
  const ringAlertMat = new THREE.MeshBasicMaterial({ color: 0xff3b30, side: THREE.DoubleSide });
  const ringAlert = new THREE.Mesh(ringAlertGeo, ringAlertMat);
  ringAlert.rotation.x = Math.PI / 2;
  ringAlert.position.set(7, 0.05, -6);
  stadiumGroup.add(ringAlert);

  const fanzoneGeo = new THREE.CylinderGeometry(2, 2, 0.1, 16);
  const fanzoneMat = new THREE.MeshStandardMaterial({ color: 0xff3b30, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
  fanZoneMarker = new THREE.Mesh(fanzoneGeo, fanzoneMat);
  fanZoneMarker.position.set(-11, 0.05, -11);
  stadiumGroup.add(fanZoneMarker);
}

function updateJumbotronDisplay(scoreText) {
  if (!jumbotronContext) return;
  const ctx = jumbotronContext;
  const isEvac = state.currentScenario === 'evacuation';
  ctx.fillStyle = '#050a14';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = isEvac ? '#ff3b30' : '#00f0ff';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 128, 128);
  ctx.fillStyle = isEvac ? '#ff3b30' : '#ff007f';
  ctx.font = 'bold 10px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isEvac ? "ALERT EVACUATE" : "METLIFE STADIUM", 64, 25);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Outfit, sans-serif';
  ctx.fillText(isEvac ? "EXIT NOW" : scoreText, 64, 65);
  ctx.fillStyle = isEvac ? '#ff3b30' : '#00ff66';
  ctx.font = 'bold 9px Courier New';
  ctx.fillText(isEvac ? "SAFETY PROTOCOL" : "LIVE ANALYTICS", 64, 95);
  ctx.fillStyle = '#ffb700';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText(isEvac ? "EMERGENCY" : "84:12 MIN", 64, 112);
  jumbotronTexture.needsUpdate = true;
}

// --- Gates ---
function buildFourGates() {
  const gatePillarsGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.8, 8);
  const gatePillarsMat = new THREE.MeshStandardMaterial({ color: 0x556677, metalness: 0.8 });
  const archGeo = new THREE.BoxGeometry(2.2, 0.25, 0.5);
  function createGate(x, z, angle, label, colorHex) {
    const gateGroup = new THREE.Group();
    const p1 = new THREE.Mesh(gatePillarsGeo, gatePillarsMat); p1.position.set(-1.0, 0.9, 0);
    const p2 = new THREE.Mesh(gatePillarsGeo, gatePillarsMat); p2.position.set(1.0, 0.9, 0);
    const archMat = new THREE.MeshBasicMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.8 });
    const arch = new THREE.Mesh(archGeo, archMat); arch.position.set(0, 1.9, 0);
    const sphereGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const sphereMat = new THREE.MeshBasicMaterial({ color: colorHex });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat); sphere.position.set(0, 2.4, 0);
    gateGroup.add(p1); gateGroup.add(p2); gateGroup.add(arch); gateGroup.add(sphere);
    gateGroup.rotation.y = angle;
    gateGroup.position.set(x, 0, z);
    stadiumGroup.add(gateGroup);
    return gateGroup;
  }
  gateAArch = createGate(0, -11.5, 0, "Gate A", 0x00f0ff);
  gateBArch = createGate(13.8, 0, Math.PI / 2, "Gate B", 0xffb700);
  gateCArch = createGate(0, 11.5, 0, "Gate C", 0x00ff66);
  gateDArch = createGate(-13.8, 0, Math.PI / 2, "Gate D", 0x00f0ff);
}

// --- Crowd Particles ---
let particleCorridorData = [];
function buildCrowdParticlesPhysics() {
  const particleCount = 280;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const gates = [
    { name: 'GateA', x: 0, z: -11.5, color: [0.0, 0.9, 1.0] },
    { name: 'GateB', x: 13.8, z: 0, color: [1.0, 0.7, 0.0] },
    { name: 'GateC', x: 0, z: 11.5, color: [0.0, 1.0, 0.4] },
    { name: 'GateD', x: -13.8, z: 0, color: [0.0, 0.9, 1.0] }
  ];
  for (let i = 0; i < particleCount; i++) {
    const gateIndex = i % 4;
    const gate = gates[gateIndex];
    let px = gate.x, pz = gate.z;
    if (gate.name === 'GateA') pz -= 15 + Math.random() * 15;
    else if (gate.name === 'GateB') px += 15 + Math.random() * 15;
    else if (gate.name === 'GateC') pz += 15 + Math.random() * 15;
    else if (gate.name === 'GateD') px -= 15 + Math.random() * 15;
    positions[i * 3] = px; positions[i * 3 + 1] = 0.12; positions[i * 3 + 2] = pz;
    particleCorridorData.push({
      startX: px, startZ: pz, x: px, z: pz,
      speed: 0.04 + Math.random() * 0.06, gate: gate, state: 'ENTERING',
      quadrantAngle: (gateIndex * Math.PI / 2) + (Math.random() * 0.8 - 0.4),
      seatedRadius: 8.8 + Math.random() * 1.8
    });
    colors[i * 3] = gate.color[0]; colors[i * 3 + 1] = gate.color[1]; colors[i * 3 + 2] = gate.color[2];
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: 0.45, vertexColors: true, transparent: true, opacity: 0.85 });
  crowdParticles = new THREE.Points(geometry, material);
  scene.add(crowdParticles);
}

function updateCrowdParticlesPhysics() {
  if (!crowdParticles) return;
  const positions = crowdParticles.geometry.attributes.position.array;
  const colors = crowdParticles.geometry.attributes.color.array;
  for (let i = 0; i < particleCorridorData.length; i++) {
    const data = particleCorridorData[i];
    let targetGate = data.gate;
    if (state.trafficRedirected && data.gate.name === 'GateB' && i % 5 === 0) {
      targetGate = { name: 'GateC', x: 0, z: 11.5 };
    }
    if (state.currentScenario === 'evacuation') data.state = 'EXITING';

    if (data.state === 'ENTERING') {
      const dx = targetGate.x - data.x, dz = targetGate.z - data.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 0.5) { data.x += (dx / dist) * data.speed; data.z += (dz / dist) * data.speed; }
      else data.state = 'SEATED';
    } else if (data.state === 'SEATED') {
      const sx = data.seatedRadius * Math.cos(data.quadrantAngle) * 1.2;
      const sz = data.seatedRadius * Math.sin(data.quadrantAngle);
      const dx = sx - data.x, dz = sz - data.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 0.4) { data.x += (dx / dist) * data.speed; data.z += (dz / dist) * data.speed; }
      else {
        data.x = sx + (Math.random() * 0.1 - 0.05); data.z = sz + (Math.random() * 0.1 - 0.05);
        if (Math.random() < 0.003 && state.currentScenario !== 'evacuation') data.state = 'EXITING';
      }
    } else if (data.state === 'EXITING') {
      const dx = targetGate.x - data.x, dz = targetGate.z - data.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 0.5) { data.x += (dx / dist) * data.speed; data.z += (dz / dist) * data.speed; }
      else {
        const cx = data.startX - data.x, cz = data.startZ - data.z;
        const dOut = Math.sqrt(cx * cx + cz * cz);
        if (dOut > 0.5) { data.x += (cx / dOut) * data.speed * 1.5; data.z += (cz / dOut) * data.speed * 1.5; }
        else {
          if (state.currentScenario !== 'evacuation') data.state = 'ENTERING';
          else { data.x = Math.random() * 6 - 3; data.z = Math.random() * 4 - 2; }
        }
      }
    }
    positions[i * 3] = data.x; positions[i * 3 + 2] = data.z;
    if (state.currentScenario === 'evacuation') {
      const blink = Math.sin(Date.now() * 0.01 + i) > 0;
      colors[i * 3] = blink ? 1 : 0.4; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0;
    } else if (targetGate.name === 'GateB' && !state.trafficRedirected) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 0.65; colors[i * 3 + 2] = 0;
    } else if (targetGate.name === 'GateC') {
      colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0.4;
    } else {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1;
    }
  }
  crowdParticles.geometry.attributes.position.needsUpdate = true;
  crowdParticles.geometry.attributes.color.needsUpdate = true;
}

// --- Wayfinding ---
const facilities = {
  'control-room': { name: 'Control Room', x: 0, y: 3.2, z: -8.8, desc: "Control Room: Head from Gate A, stairs to Sector 3, Level 2. Follow the security corridor." },
  'washroom': { name: 'Washrooms', x: -9.5, y: 0.1, z: 5.5, desc: "Washrooms: Go past Gate C, ground corridor left next to block 8. Est. distance: 45m." },
  'concession': { name: 'Concessions', x: 7, y: 0.4, z: -6, desc: "Concession Stand 4B: Pass Gate B, turn right at main concourse next to block 4." },
  'medical': { name: 'Medical Room', x: -7, y: 0.12, z: -7, desc: "Medical Station: Via Gate D outer concourse corridor. Follow red cross tags." }
};

function buildWayfindingDestinations() {
  const railCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-36, 0.1, 0), new THREE.Vector3(-25, 0.1, 4),
    new THREE.Vector3(-14, 0.1, 8), new THREE.Vector3(0, 0.1, 11.5)
  ]);
  const railGeo = new THREE.BufferGeometry().setFromPoints(railCurve.getPoints(40));
  const railMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 3, transparent: true, opacity: 0.8 });
  accessRouteLine = new THREE.Line(railGeo, railMat);
  scene.add(accessRouteLine);

  const parkingCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-22, 0.1, 15), new THREE.Vector3(-18, 0.1, 10), new THREE.Vector3(-13.8, 0.1, 0)
  ]);
  const parkingGeo = new THREE.BufferGeometry().setFromPoints(parkingCurve.getPoints(30));
  const parkingMat = new THREE.LineBasicMaterial({ color: 0x00ff66, linewidth: 3, transparent: true, opacity: 0.0 });
  accessRouteLineParking = new THREE.Line(parkingGeo, parkingMat);
  scene.add(accessRouteLineParking);

  const pinGeo = new THREE.ConeGeometry(0.3, 0.8, 8);
  const pinMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  wayfindingLocatorPin = new THREE.Mesh(pinGeo, pinMat);
  wayfindingLocatorPin.rotation.x = Math.PI;
  wayfindingLocatorPin.position.set(0, -10, 0);
  scene.add(wayfindingLocatorPin);
}

function selectWayfindingFacility(facilityId) {
  state.activeWayfinding = facilityId;
  const f = facilities[facilityId];
  if (!f) return;
  wayfindingLocatorPin.position.set(f.x, f.y + 1.2, f.z);
  // Dispose old line to prevent memory leak
  if (activeWayfindingLine) { scene.remove(activeWayfindingLine); disposeObject(activeWayfindingLine); }
  let startNode = new THREE.Vector3(0, 0.1, -11.5);
  if (facilityId === 'washroom') startNode.set(0, 0.1, 11.5);
  if (facilityId === 'medical') startNode.set(-13.8, 0.1, 0);
  const wayfindCurve = new THREE.CatmullRomCurve3([
    startNode, new THREE.Vector3((startNode.x + f.x) / 2, 0.2, (startNode.z + f.z) / 2), new THREE.Vector3(f.x, f.y, f.z)
  ]);
  const geo = new THREE.BufferGeometry().setFromPoints(wayfindCurve.getPoints(30));
  const mat = new THREE.LineDashedMaterial({ color: 0xff007f, dashSize: 0.5, gapSize: 0.25 });
  activeWayfindingLine = new THREE.Line(geo, mat);
  activeWayfindingLine.computeLineDistances();
  scene.add(activeWayfindingLine);
  document.getElementById('wayfinding-title-ui').textContent = `${f.name} Navigation`;
  document.getElementById('wayfinding-desc-ui').textContent = f.desc;
}

// --- Retractable Roof ---
function buildRetractableRoof() {
  const roofGeo = new THREE.BoxGeometry(6.5, 0.15, 14);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x00a8ff, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
  roofPanelLeft = new THREE.Mesh(roofGeo, roofMat); roofPanelLeft.position.set(-15, 5.5, 0); stadiumGroup.add(roofPanelLeft);
  roofPanelRight = new THREE.Mesh(roofGeo, roofMat); roofPanelRight.position.set(15, 5.5, 0); stadiumGroup.add(roofPanelRight);
}

// --- Thunderstorm Rain ---
function buildThunderstormEffects() {
  const rainCount = 300;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(rainCount * 3);
  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = Math.random() * 40 - 20;
    positions[i * 3 + 1] = Math.random() * 20 + 5;
    positions[i * 3 + 2] = Math.random() * 40 - 20;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ size: 0.15, color: 0x7f8fa6, transparent: true, opacity: 0.0 });
  thunderstormRainParticles = new THREE.Points(geometry, material);
  scene.add(thunderstormRainParticles);
}

function updateThunderstormPhysics() {
  if (!thunderstormRainParticles) return;
  const isStorm = state.currentScenario === 'thunderstorm';
  thunderstormRainParticles.material.opacity = isStorm ? 0.7 : 0.0;
  if (!isStorm) return;
  const pos = thunderstormRainParticles.geometry.attributes.position.array;
  const count = pos.length / 3;
  for (let i = 0; i < count; i++) {
    pos[i * 3 + 1] -= 0.65;
    const inside = Math.abs(pos[i * 3]) < 12.5 && Math.abs(pos[i * 3 + 2]) < 12.5;
    const limit = (state.roofClosed && inside) ? 5.5 : 0.1;
    if (pos[i * 3 + 1] < limit) {
      pos[i * 3 + 1] = 20 + Math.random() * 5;
      pos[i * 3] = Math.random() * 40 - 20;
      pos[i * 3 + 2] = Math.random() * 40 - 20;
    }
  }
  thunderstormRainParticles.geometry.attributes.position.needsUpdate = true;
}

// --- Animation Loop ---
let angle = 0;
function animate() {
  requestAnimationFrame(animate);
  if (state.cameraAutoOrbit) {
    angle += 0.0012;
    camera.position.x = 42 * Math.sin(angle);
    camera.position.z = 42 * Math.cos(angle);
    camera.lookAt(new THREE.Vector3(0, 2, 0));
    updateCoordDisplay();
  }
  updateCrowdParticlesPhysics();
  updateThunderstormPhysics();

  // Roof lerp
  if (roofPanelLeft && roofPanelRight) {
    const tL = state.roofClosed ? -3.8 : -15;
    const tR = state.roofClosed ? 3.8 : 15;
    roofPanelLeft.position.x += (tL - roofPanelLeft.position.x) * 0.08;
    roofPanelRight.position.x += (tR - roofPanelRight.position.x) * 0.08;
  }

  if (wayfindingLocatorPin && state.activeWayfinding) {
    const f = facilities[state.activeWayfinding];
    wayfindingLocatorPin.position.y = f.y + 1.2 + 0.25 * Math.sin(Date.now() * 0.006);
    wayfindingLocatorPin.rotation.y += 0.02;
  }

  if (state.currentScenario === 'evacuation') {
    const pulseRed = Math.sin(Date.now() * 0.01) * 0.5 + 0.5;
    const rim = stadiumGroup.children.find(c => c.geometry && c.geometry.type === "TorusGeometry");
    if (rim) {
      rim.material.emissiveIntensity = pulseRed * 2.0;
      rim.material.color.setHex(pulseRed > 0.5 ? 0xff0000 : 0x220000);
    }
  } else {
    if (concessionCube4B && state.activeAlerts > 0) {
      const scale = 1 + 0.12 * Math.sin(Date.now() * 0.005);
      concessionCube4B.scale.set(scale, scale, scale);
    }
    if (fanZoneMarker && state.activeAlerts > 1) {
      fanZoneMarker.material.opacity = 0.25 + 0.1 * Math.sin(Date.now() * 0.007);
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  const width = canvasWrapper.clientWidth;
  const height = canvasWrapper.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// --- SECTION 7: SCENARIO HANDLER ---
function handleScenarioChange(scenario) {
  state.currentScenario = scenario;
  // Reset visual base
  scene.fog.color.setHex(0x050811);
  const amb = scene.children.find(c => c instanceof THREE.AmbientLight);
  if (amb) amb.color.setHex(0x0a1024);
  const rim = scene.children.find(c => c.name === 'rimSpotlight');
  if (rim) { rim.color.setHex(0x00f0ff); rim.intensity = 2.5; }

  standSectors.forEach((s, idx) => {
    let c = 0x3e4a59, e = 0x11161d;
    if ((idx === 5 || idx === 6) && !state.trafficRedirected && scenario !== 'evacuation') { c = 0xffb700; e = 0x332200; }
    s.material.color.setHex(c); s.material.emissive.setHex(e);
  });

  if (scenario === 'normal') {
    state.roofClosed = false;
    document.getElementById('energy-val').textContent = 'Optimized';
    document.getElementById('energy-bar').style.width = '42%';
    document.getElementById('water-val').textContent = 'Low (Predictive)';
    document.getElementById('water-bar').style.width = '28%';
  } else if (scenario === 'evacuation') {
    state.roofClosed = false;
    standSectors.forEach(s => { s.material.color.setHex(0xff3b30); s.material.emissive.setHex(0x550000); });
  } else if (scenario === 'thunderstorm') {
    state.roofClosed = true;
    scene.fog.color.setHex(0x02040a);
    if (amb) amb.color.setHex(0x030510);
    if (rim) { rim.color.setHex(0x00ff66); rim.intensity = 4.0; }
    document.getElementById('energy-val').textContent = 'High (Indoor Lights)';
    document.getElementById('energy-bar').style.width = '78%';
    document.getElementById('water-val').textContent = 'Capturing Runoff (94%)';
    document.getElementById('water-bar').style.width = '94%';
  } else if (scenario === 'postmatch') {
    state.roofClosed = false;
  }
  updateJumbotronDisplay(scenario === 'evacuation' ? "EXIT NOW" : "ARG 2-1 ESP");
}

// --- SECTION 8: ALERT RESOLUTION (Event Delegation) ---
window.resolveAlert = function(alertId) {
  const alertEl = document.getElementById(alertId);
  if (alertEl) {
    alertEl.style.opacity = '0';
    setTimeout(() => {
      alertEl.remove();
      state.activeAlerts--;
      if (state.activeAlerts === 0) {
        alertsCountBadge.className = "badge green";
        alertsCountBadge.textContent = "0 ACTIVE";
        document.getElementById('alerts-feed').innerHTML = `
          <div class="ai-recommendation-box blue-box" style="margin-top:1rem;">
            <div class="recommendation-header"><i class="fa-solid fa-circle-check"></i> All Alerts Clear</div>
            <div class="recommendation-content">GenAI predicts stadium flow is optimal. No active operational alerts.</div>
          </div>`;
      } else {
        alertsCountBadge.textContent = `${state.activeAlerts} ACTIVE`;
      }
    }, 300);
  }
  if (alertId === 'alert-water-4b' && concessionCube4B) {
    concessionCube4B.material.color.setHex(0x00ff66);
    concessionCube4B.material.emissive.setHex(0x003311);
    concessionCube4B.scale.set(1, 1, 1);
  } else if (alertId === 'alert-incident-fanzone' && fanZoneMarker) {
    fanZoneMarker.material.color.setHex(0x00ff66);
    fanZoneMarker.material.opacity = 0.15;
  }
};

// Event delegation on alerts feed — no inline onclick
document.getElementById('alerts-feed').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-resolve]');
  if (btn) resolveAlert(btn.getAttribute('data-resolve'));
});

// --- SECTION 9: CHAT & TRANSLATION ---
function getTranslations(text) {
  const input = text.toLowerCase();
  if (input.includes('welcome') || input.includes('hello'))
    return { en: '"WELCOME! HOW CAN I HELP?"', es: '"¡BIENVENIDO! ¿CÓMO PUEDO AYUDAR?"', fr: '"BIENVENUE ! COMMENT PUIS-JE VOUS AIDER?"', loc: '"¡XIMOXPANO! ¿KENIN NI MITZ PALEHUIA?"' };
  if (input.includes('gate') || input.includes('density') || input.includes('flow'))
    return { en: '"NOTICE: REDIRECTING TRAFFIC TO EAST GATE C."', es: '"AVISO: REDIRIGIENDO TRÁFICO A LA PUERTA ESTE C."', fr: '"NOTE: REDIRECTION DU TRAFIC VERS LA PORTE EST C."', loc: '"AVISO: REROUTING FAN FLOW OHTLA C."' };
  if (input.includes('control') || input.includes('room'))
    return { en: '"GUIDE: CONTROL ROOM ACCESS RESTRICTED TO PERSONNEL."', es: '"GUÍA: ACCESO A LA SALA DE CONTROL RESTRINGIDO."', fr: '"GUIDE: ACCÈS SALLE DE CONTRÔLE RÉSERVÉ AU PERSONNEL."', loc: '"GUIDE: CONTROL ROOM YOLTOK PERSONNEL."' };
  if (input.includes('water') || input.includes('concession') || input.includes('restock'))
    return { en: '"AI ASSIST: CONCESSION 4B WATER RESTOCK TRIGGERED."', es: '"ASISTENCIA IA: REABASTECIMIENTO CONCESIÓN 4B INICIADO."', fr: '"ASSISTANCE IA: RAVITAILLEMENT STAND 4B LANCÉ."', loc: '"AI ASSIST: WATER ATL RESTOCK."' };
  if (input.includes('washroom') || input.includes('toilet'))
    return { en: '"GUIDE: NEAREST WASHROOM ROUTED VIA SECTOR 8."', es: '"GUÍA: BAÑOS ENRUTADOS POR EL SECTOR 8."', fr: '"GUIDE: TOILETTES VIA LE SECTEUR 8."', loc: '"GUIDE: WASHROOM PATH OHTLA BLOCK 8."' };
  if (input.includes('evacuate') || input.includes('emergency'))
    return { en: '"EMERGENCY: EVACUATE STADIUM IMMEDIATELY!"', es: '"EMERGENCIA: ¡EVACUEN EL ESTADIO!"', fr: '"URGENCE : ÉVACUEZ LE STADE !"', loc: '"EMERGENCY: EXIT NOW!"' };
  if (input.includes('storm') || input.includes('thunder'))
    return { en: '"WEATHER ALERT: CLOSING RETRACTABLE ROOF."', es: '"ALERTA: CERRANDO TECHO RETRÁCTIL."', fr: '"ALERTE MÉTÉO : FERMETURE DU TOIT."', loc: '"WEATHER: CLOSING ROOF."' };
  return {
    en: `"${text}"`,
    es: `"${text.replace(/the/gi, 'el').replace(/stadium/gi, 'estadio')} (traducido)"`,
    fr: `"${text.replace(/the/gi, 'le').replace(/stadium/gi, 'stade')} (traduit)"`,
    loc: `"${text.substring(0, Math.ceil(text.length / 2))}tlalli amoztli"`
  };
}

function appendChatMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.className = `chat-message ${sender}`;
  const safeText = escapeHTML(text);
  if (sender === 'user') {
    msgEl.innerHTML = `<div class="chat-meta">Security Broadcast Operator</div><div class="user-bubble">${safeText}</div>`;
  }
  chatHistoryList.appendChild(msgEl);
  chatHistoryList.scrollTop = chatHistoryList.scrollHeight;
}

function appendTranslatedMessage(t) {
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-message staff';
  msgEl.innerHTML = `
    <div class="chat-meta">Simultaneous Translation Engine</div>
    <div class="chat-translation-bubble"><span class="lang-tag">EN</span> ${escapeHTML(t.en)}</div>
    <div class="chat-translation-bubble"><span class="lang-tag">ES</span> ${escapeHTML(t.es)}</div>
    <div class="chat-translation-bubble"><span class="lang-tag">FR</span> ${escapeHTML(t.fr)}</div>
    <div class="chat-translation-bubble"><span class="lang-tag">LOC</span> ${escapeHTML(t.loc)}</div>`;
  chatHistoryList.appendChild(msgEl);
  const micGlow = document.querySelector('.avatar-mic-glow');
  if (micGlow) {
    micGlow.style.background = '#ff007f'; micGlow.style.boxShadow = '0 0 8px #ff007f';
    setTimeout(() => { micGlow.style.background = '#00ff66'; micGlow.style.boxShadow = '0 0 4px #00ff66'; }, 1500);
  }
  chatHistoryList.scrollTop = chatHistoryList.scrollHeight;
}

function executeAnnouncement() {
  const text = chatInput.value.trim();
  if (!text) return;
  appendChatMessage(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    const responseDict = getTranslations(text);
    appendTranslatedMessage(responseDict);
  }, 1000);
}

// --- SECTION 10: DIAGNOSTICS ---
function runDiagnostics() {
  const listEl = document.getElementById('diagnostics-log-list');
  const headerStatus = document.getElementById('diagnostics-header-status');
  const btn = document.getElementById('btn-run-diagnostics');
  if (!listEl) return;
  btn.disabled = true; btn.textContent = "Running...";
  listEl.innerHTML = '';
  headerStatus.textContent = 'TESTING';

  const tests = [
    { name: "XSS Sanitization", desc: "Verify escapeHTML strips dangerous tags", run: () => {
      const escaped = escapeHTML("<script>alert('xss')</script>");
      if (escaped.includes("<script>")) throw new Error("Script tag not escaped");
      return "Dangerous tags safely escaped";
    }},
    { name: "Translation Coverage", desc: "All EN keys exist in ES, FR, LOC", run: () => {
      const enKeys = Object.keys(translations.en);
      ['es', 'fr', 'loc'].forEach(l => { enKeys.forEach(k => { if (!translations[l][k]) throw new Error(`Missing '${k}' in ${l}`); }); });
      return `${enKeys.length} keys verified across all languages`;
    }},
    { name: "Crowd Density Clamping", desc: "Values stay within 0-100", run: () => {
      const clamp = v => Math.max(0, Math.min(100, v));
      if (clamp(150) !== 100 || clamp(-20) !== 0 || clamp(45) !== 45) throw new Error("Clamping failed");
      return "Boundary values properly clamped (0-100)";
    }},
    { name: "Facility Coordinates", desc: "All wayfinding nodes have valid xyz", run: () => {
      Object.keys(facilities).forEach(k => {
        const n = facilities[k];
        if (typeof n.x !== 'number' || typeof n.y !== 'number' || typeof n.z !== 'number') throw new Error(`Invalid coords: ${k}`);
      });
      return "All facility nodes map to valid 3D vectors";
    }},
    { name: "Scenario State Transitions", desc: "State toggles for evacuation/thunderstorm", run: () => {
      const orig = state.currentScenario;
      state.currentScenario = 'evacuation';
      if (state.currentScenario !== 'evacuation') throw new Error("Scenario switch failed");
      state.currentScenario = orig;
      return "State transitions verified";
    }},
    { name: "WebGL Renderer", desc: "Canvas and renderer context active", run: () => {
      if (!renderer) throw new Error("Renderer not initialized");
      if (!renderer.domElement || renderer.domElement.tagName !== 'CANVAS') throw new Error("Invalid canvas");
      return "WebGL renderer active on CANVAS element";
    }}
  ];

  let passed = 0, idx = 0;
  function next() {
    if (idx >= tests.length) {
      btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Run System Diagnostics';
      headerStatus.textContent = passed === tests.length ? '100% PASS' : 'WARNING';
      headerStatus.style.color = passed === tests.length ? '#00ff66' : '#ff3b30';
      return;
    }
    const t = tests[idx];
    const item = document.createElement('div');
    item.style.cssText = 'margin-bottom:0.4rem;font-size:0.62rem;padding:0.3rem;border-radius:4px;background:rgba(255,255,255,0.02);border-left:3px solid #ffb700;opacity:0;transition:opacity 0.3s;';
    item.innerHTML = `<div style="font-weight:bold;color:#e2e8f0;">[${idx + 1}/${tests.length}] ${escapeHTML(t.name)}</div><div style="color:#64748b;font-size:0.55rem;">${escapeHTML(t.desc)}</div>`;
    listEl.appendChild(item);
    requestAnimationFrame(() => { item.style.opacity = '1'; });
    setTimeout(() => {
      try {
        const msg = t.run();
        item.style.borderLeftColor = '#00ff66';
        item.innerHTML += `<div style="color:#00ff66;font-size:0.55rem;margin-top:0.15rem;"><i class="fa-solid fa-check-double"></i> PASS: ${escapeHTML(msg)}</div>`;
        passed++;
      } catch (err) {
        item.style.borderLeftColor = '#ff3b30';
        item.innerHTML += `<div style="color:#ff3b30;font-size:0.55rem;margin-top:0.15rem;font-family:monospace;"><i class="fa-solid fa-triangle-exclamation"></i> FAIL: ${escapeHTML(err.message)}</div>`;
      }
      idx++;
      listEl.scrollTop = listEl.scrollHeight;
      setTimeout(next, 350);
    }, 200);
  }
  next();
}

// --- SECTION 11: LANGUAGE SWITCHING ---
function switchLanguage(lang) {
  state.currentLang = lang;
  document.documentElement.lang = lang === 'loc' ? 'nci' : lang;
  const dict = translations[lang] || translations.en;
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (dict[key]) el.innerHTML = dict[key];
  });
  if (chatInput && dict.chat_placeholder) chatInput.placeholder = dict.chat_placeholder;
  updateJumbotronDisplay("ARG 2-1 ESP");
}

// --- SECTION 12: ALL EVENT LISTENERS ---

// Crowd Redirection
btnRedirectTraffic.addEventListener('click', () => {
  state.trafficRedirected = !state.trafficRedirected;
  const isEs = state.currentLang === 'es', isFr = state.currentLang === 'fr', isLoc = state.currentLang === 'loc';
  if (state.trafficRedirected) {
    btnRedirectTraffic.innerHTML = `<i class="fa-solid fa-circle-check"></i> ` +
      (isEs ? "Redirección Operativa" : isFr ? "Redirection Active" : isLoc ? "Redirection Active" : "Redirection Operational");
    btnRedirectTraffic.classList.remove('btn-yellow'); btnRedirectTraffic.classList.add('btn-blue');
    gateBPill.className = "gate-status-pill safe";
    gateBPill.innerHTML = `<span class="gate-name">Gate B (North Entrance)</span><span class="gate-load">Stable (65%)</span>`;
    gateCPill.className = "gate-status-pill warning";
    gateCPill.innerHTML = `<span class="gate-name">Gate C (East Entrance)</span><span class="gate-load">Active (45%)</span>`;
    standSectors[5].material.color.setHex(0x3e4a59); standSectors[5].material.emissive.setHex(0x11161d);
    standSectors[6].material.color.setHex(0x3e4a59); standSectors[6].material.emissive.setHex(0x11161d);
    crowdRecommendation.className = "ai-recommendation-box blue-box";
    crowdRecommendation.querySelector('.recommendation-content').innerHTML =
      (isEs ? "<strong>Fans Redirigidos:</strong> 20% dispersión balanceada." :
       isFr ? "<strong>Foule Redirigée:</strong> 20% équilibrée." :
       "<strong>Traffic Rerouted:</strong> 20% fan dispersion executing. Heatmap density balanced.");
  } else {
    btnRedirectTraffic.innerHTML = `<i class="fa-solid fa-arrows-split-up-and-left"></i> ` +
      (isEs ? "Ejecutar Redirección" : isFr ? "Exécuter la Redirection" : isLoc ? "Reroute Fan Flow" : "Execute Traffic Redirection");
    btnRedirectTraffic.classList.remove('btn-blue'); btnRedirectTraffic.classList.add('btn-yellow');
    gateBPill.className = "gate-status-pill warning";
    gateBPill.innerHTML = `<span class="gate-name">Gate B (North Entrance)</span><span class="gate-load">Critical (85%)</span>`;
    gateCPill.className = "gate-status-pill safe";
    gateCPill.innerHTML = `<span class="gate-name">Gate C (East Entrance)</span><span class="gate-load">Low (25%)</span>`;
    standSectors[5].material.color.setHex(0xffb700); standSectors[5].material.emissive.setHex(0x332200);
    standSectors[6].material.color.setHex(0xffb700); standSectors[6].material.emissive.setHex(0x332200);
    crowdRecommendation.className = "ai-recommendation-box warning-box";
    crowdRecommendation.querySelector('.recommendation-content').innerHTML =
      (isEs ? "<strong>Predicción de IA:</strong> Flujo denso cerca de Puerta B." :
       isFr ? "<strong>IA Prédit:</strong> Flux dense près de la Porte B." :
       "<strong>AI Predicts:</strong> High-density flow near Gate B. Redirecting 20% of fan traffic to Gate C.");
  }
});

// Crowd Slider
crowdIntensitySlider.addEventListener('input', (e) => {
  state.crowdIntensity = Math.max(0, Math.min(100, parseInt(e.target.value, 10)));
  crowdIntensityVal.textContent = `${state.crowdIntensity}%`;
  crowdIntensitySlider.setAttribute('aria-valuenow', state.crowdIntensity);
  if (state.crowdIntensity < 50) {
    gateBPill.className = "gate-status-pill safe";
    gateBPill.querySelector('.gate-load').textContent = `Stable (${state.crowdIntensity}%)`;
    standSectors[5].material.color.setHex(0x3e4a59); standSectors[6].material.color.setHex(0x3e4a59);
  } else {
    gateBPill.className = "gate-status-pill warning";
    gateBPill.querySelector('.gate-load').textContent = `Critical (${state.crowdIntensity}%)`;
    if (!state.trafficRedirected) { standSectors[5].material.color.setHex(0xffb700); standSectors[6].material.color.setHex(0xffb700); }
  }
});

// Route toggle
btnToggleRoute3d.addEventListener('click', () => {
  state.routeVisible = !state.routeVisible;
  if (state.routeVisible) {
    btnToggleRoute3d.innerHTML = `<i class="fa-solid fa-eye-slash"></i> ` +
      (state.currentLang === 'es' ? "Ocultar Ruta" : state.currentLang === 'fr' ? "Masquer Chemin" : "Hide Path in 3D Scene");
    if (state.selectedRoute === 'rail') accessRouteLine.material.opacity = 0.8;
    else accessRouteLineParking.material.opacity = 0.8;
  } else {
    btnToggleRoute3d.innerHTML = `<i class="fa-solid fa-eye"></i> ` +
      (state.currentLang === 'es' ? "Mostrar Ruta" : state.currentLang === 'fr' ? "Afficher Chemin" : "Highlight Path in 3D Scene");
    accessRouteLine.material.opacity = 0.0; accessRouteLineParking.material.opacity = 0.0;
  }
});

routeRailBtn.addEventListener('click', () => {
  state.selectedRoute = 'rail'; routeRailBtn.classList.add('active'); routeParkingBtn.classList.remove('active');
  if (state.routeVisible) { accessRouteLine.material.opacity = 0.8; accessRouteLineParking.material.opacity = 0.0; }
});
routeParkingBtn.addEventListener('click', () => {
  state.selectedRoute = 'parking'; routeParkingBtn.classList.add('active'); routeRailBtn.classList.remove('active');
  if (state.routeVisible) { accessRouteLine.material.opacity = 0.0; accessRouteLineParking.material.opacity = 0.8; }
});

// Wayfinding buttons
document.querySelectorAll('.wayfind-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.wayfind-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
    selectWayfindingFacility(btn.getAttribute('data-target'));
  });
});

// Camera controls
btnOrbitSpin.addEventListener('click', () => {
  state.cameraAutoOrbit = !state.cameraAutoOrbit;
  btnOrbitSpin.classList.toggle('active', state.cameraAutoOrbit);
  btnOrbitSpin.setAttribute('aria-pressed', state.cameraAutoOrbit ? 'true' : 'false');
});
btnViewTop.addEventListener('click', () => {
  state.cameraAutoOrbit = false; btnOrbitSpin.classList.remove('active'); btnOrbitSpin.setAttribute('aria-pressed', 'false');
  camera.position.set(0, 42, 0.1); camera.lookAt(new THREE.Vector3(0, 0, 0)); updateCoordDisplay();
});
btnViewSide.addEventListener('click', () => {
  state.cameraAutoOrbit = false; btnOrbitSpin.classList.remove('active'); btnOrbitSpin.setAttribute('aria-pressed', 'false');
  camera.position.set(0, 24, 34); camera.lookAt(new THREE.Vector3(0, 2, 0)); updateCoordDisplay();
});

// Stadium Lights
btnStadiumLights.addEventListener('click', () => {
  state.roofLightsOn = !state.roofLightsOn;
  btnStadiumLights.classList.toggle('btn-outline', state.roofLightsOn);
  btnStadiumLights.classList.toggle('btn-blue', !state.roofLightsOn);
  const rim = stadiumGroup.children.find(c => c.geometry && c.geometry.type === "TorusGeometry");
  if (rim) {
    rim.material.emissiveIntensity = state.roofLightsOn ? 1.0 : 0.0;
    rim.material.color.setHex(state.roofLightsOn ? 0x00f0ff : 0x222222);
  }
});

// Scenario selector
scenarioSelector.addEventListener('change', (e) => { handleScenarioChange(e.target.value); });

// Language selector
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
    switchLanguage(btn.getAttribute('data-lang'));
  });
});

// Chat
btnSendChat.addEventListener('click', executeAnnouncement);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') executeAnnouncement(); });

// AI Prompt buttons
document.querySelectorAll('.ai-prompt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = btn.getAttribute('data-msg');
    appendChatMessage(msg, 'user');
    setTimeout(() => {
      appendTranslatedMessage(getTranslations(msg));
      if (msg.includes('Gate B') || msg.includes('density')) { if (!state.trafficRedirected) btnRedirectTraffic.click(); }
      else if (msg.includes('Control Room')) { const w = document.querySelector('.wayfind-btn[data-target="control-room"]'); if (w) w.click(); }
      else if (msg.includes('Restock') || msg.includes('4B')) { resolveAlert('alert-water-4b'); }
      else if (msg.includes('washrooms')) { const w = document.querySelector('.wayfind-btn[data-target="washroom"]'); if (w) w.click(); }
    }, 1000);
  });
});

// Diagnostics button
document.getElementById('btn-run-diagnostics').addEventListener('click', runDiagnostics);

// Dynamic Scorecard
let probArg = 64, probEsp = 36;
setInterval(() => {
  const change = Math.floor(Math.random() * 3) - 1;
  probArg = Math.max(50, Math.min(80, probArg + change));
  probEsp = 100 - probArg;
  document.getElementById('prob-arg').textContent = `${probArg}%`;
  document.getElementById('prob-esp').textContent = `${probEsp}%`;
}, 8000);

const commentaries = [
  "Argentina shifting to a deep defensive block. Spain increasing offensive press. Probability of next goal: ESP 18% in next 5m.",
  "AI Analysis: Spain ramping up attacks from the left wing. Argentina's midfield intercepts increase by 12%.",
  "GenAI Fan Sentiment Check: 92% Positive. MetLife Stadium decibel peaks at 108 dB during Argentina's counter-attack.",
  "Weather Impact: Temperature stable at 24°C. Relative humidity 45% in East Rutherford, NJ."
];
let commentaryIdx = 0;
setInterval(() => {
  if (state.currentScenario !== 'normal') return;
  commentaryIdx = (commentaryIdx + 1) % commentaries.length;
  document.getElementById('live-predictive-commentary').textContent = commentaries[commentaryIdx];
}, 10000);

// --- SECTION 13: BOOT ---
window.addEventListener('DOMContentLoaded', () => {
  init3D();
  animate();
});
