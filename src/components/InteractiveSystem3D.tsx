import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SatelliteNode {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  speed: number;
  angle: number;
  pos: THREE.Vector3;
}

const NODES_EXPLANATION = [
  {
    name: "Frontend",
    label: "Frontend UI Developer",
    short: "What you see & interact with",
    color: "#10b981",    // Emerald
    bgColor: "bg-emerald-950/45 border-emerald-500/25",
    lightBgColor: "bg-emerald-50/90 border-emerald-200/50",
    textBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    lightTextBg: "bg-emerald-500/10 text-emerald-700 border-emerald-200/40",
    dotColor: "bg-emerald-500",
    glowColor: "shadow-emerald-500/20",
    emoji: "🎨",
    layman: "The interactive storefront of any app. It is built to create fast loading times, eye-safe typography, beautiful layouts, and responsive animations.",
    example: "The sleek buttons, navigation tabs, revolving circular orbits, and theme switch you are interacting with right now!",
    tech: ["React.js", "Tailwind CSS", "TypeScript", "Three.js", "Framer Motion"]
  },
  {
    name: "Backend",
    label: "Backend & Server Core",
    short: "The secure hidden database brain",
    color: "#8b5cf6",    // Purple
    bgColor: "bg-purple-950/45 border-purple-500/25",
    lightBgColor: "bg-purple-50/90 border-purple-200/50",
    textBg: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    lightTextBg: "bg-purple-500/10 text-purple-700 border-purple-200/40",
    dotColor: "bg-purple-500",
    glowColor: "shadow-purple-500/20",
    emoji: "🧠",
    layman: "The secure engine operating in the dark. It stores private customer profiles, runs business calculations, checks login passwords, and hosts robust APIs.",
    example: "When you purchase an item on Amazon, the backend handles the secure payment request and logs your inventory receipts.",
    tech: ["Node.js / Express", "PostgreSQL", "REST & GraphQL", "JWT Auth", "Sequelize"]
  },
  {
    name: "Networks",
    label: "CCNP Network Operations",
    short: "Secure communication channels",
    color: "#3b82f6",    // Blue
    bgColor: "bg-blue-950/45 border-blue-500/25",
    lightBgColor: "bg-blue-50/90 border-blue-200/50",
    textBg: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    lightTextBg: "bg-blue-500/10 text-blue-700 border-blue-200/40",
    dotColor: "bg-blue-500",
    glowColor: "shadow-blue-500/20",
    emoji: "⚡",
    layman: "The secure high-speed highways of the internet. It governs how separate computers and servers exchange packages of data without a single delay or leak.",
    example: "Streaming online webinars smoothly and securely without stuttering or video lag relies on optimal router configuration patterns.",
    tech: ["TCP/IP Protocols", "BGP Routing", "WebSockets", "Secure SSH", "DNS Configuration"]
  },
  {
    name: "Cloud/Ops",
    label: "Cloud Hosting & Deploy",
    short: "Keeping apps online 24/7",
    color: "#06b6d4",    // Cyan
    bgColor: "bg-cyan-950/45 border-cyan-500/25",
    lightBgColor: "bg-cyan-50/90 border-cyan-200/50",
    textBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    lightTextBg: "bg-cyan-500/10 text-cyan-700 border-cyan-200/40",
    dotColor: "bg-cyan-500",
    glowColor: "shadow-cyan-500/20",
    emoji: "☁️",
    layman: "Virtual cloud environments where our code lives. It packages systems into virtual containers and deploys them to global cloud hubs for instant scale.",
    example: "Packaging this entire website inside a virtual container and running it automatically across regional servers like Google Cloud.",
    tech: ["Docker Containers", "Google Cloud DB", "CI/CD Actions", "Linux Server Admin", "Nginx Proxying"]
  },
  {
    name: "Automation",
    label: "Automation & Scripting",
    short: "Robots processing tiring work",
    color: "#f59e0b",    // Amber
    bgColor: "bg-amber-950/45 border-amber-500/25",
    lightBgColor: "bg-amber-50/90 border-amber-200/50",
    textBg: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    lightTextBg: "bg-amber-500/10 text-amber-700 border-amber-200/40",
    dotColor: "bg-amber-500",
    glowColor: "shadow-amber-500/20",
    emoji: "🤖",
    layman: "Intelligent background software robots. They automatically run exhausting, repetitive tasks like daily spreadsheets processing and system backups.",
    example: "An automated assistant script that reads fresh spreadsheet sheets, cleans data typos, and emails the results to your managers automatically.",
    tech: ["Node Schedulers", "Cron Daemons", "Bash Shell Admin", "Web Scraping", "API Connectors"]
  },
  {
    name: "Data Analysis",
    label: "Data Analysis & ETL Pipelines",
    short: "Unlocking database insights",
    color: "#ec4899",    // Pink/Rose
    bgColor: "bg-rose-950/45 border-rose-500/25",
    lightBgColor: "bg-rose-50/90 border-rose-200/50",
    textBg: "bg-rose-500/15 text-rose-400 border-rose-500/25",
    lightTextBg: "bg-rose-500/10 text-rose-700 border-rose-200/40",
    dotColor: "bg-rose-500",
    glowColor: "shadow-rose-500/20",
    emoji: "📊",
    layman: "Intelligent algorithms and script-based pipelines that query complex tables, clean discrepancies, and output patterns to guide critical company statistics.",
    example: "Sieving through millions of farm rows to isolate high-yield crops and generate compliant records for corporate stakeholders.",
    tech: ["MySQL & Postgres", "DB Engine Admin", "Pandas/Python", "CSV Multi-ETL", "D3 Charts"]
  }
];

interface InteractiveSystem3DProps {
  theme?: "dark" | "light";
}

export function InteractiveSystem3D({ theme = "dark" }: InteractiveSystem3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreLabelRef = useRef<HTMLDivElement>(null);
  const satelliteLabelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const selectedIndexRef = useRef(0);

  const isLight = theme === "light";

  // Allow clicking buttons to immediately change active state and highlight node
  const selectNode = (idx: number) => {
    setSelectedNodeIndex(idx);
    selectedIndexRef.current = idx;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 11.5;

    // 3. Renderer Setup (with Alpha for nice glass overlay)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 0.8 : 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, isLight ? 1.5 : 2.5, 30);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, isLight ? 1.5 : 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 5. Main Root Group (holds coordinates to let drag rotate easily)
    const rootGroup = new THREE.Group();
    const isMobileInitial = width < 500;
    let isMobileLocal = isMobileInitial;
    rootGroup.position.y = isMobileInitial ? 0.45 : 1.35; // Moved down on mobile (was 1.30, then -0.25) to give plenty of space and prevent overlaps with options
    const initialScale = isMobileInitial ? 0.53 : 0.85; // Slightly reduced scale on mobile to give ample border margin
    rootGroup.scale.set(initialScale, initialScale, initialScale);
    scene.add(rootGroup);

    // 6. Central Hub Core Mesh (representing George Chaka Full-Stack system core)
    const coreGroup = new THREE.Group();
    
    // Wireframe Icosahedron
    const coreWireGeometry = new THREE.IcosahedronGeometry(0.9, 2);
    const coreWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.35 : 0.15,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeometry, coreWireMaterial);
    coreGroup.add(coreWireMesh);

    // Inner glowing sphere core
    const coreGeo = new THREE.SphereGeometry(0.45, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: isLight ? 0.6 : 1.0,
      roughness: 0.15,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    rootGroup.add(coreGroup);

    // 7. Satellite System Definition (representing developer stacks + data analysis)
    const satellitesData: Omit<SatelliteNode, "pos">[] = [
      { name: "Frontend", color: "#10b981", size: 0.28, orbitRadius: 2.1, speed: 0.6, angle: 0 },
      { name: "Backend", color: "#8b5cf6", size: 0.28, orbitRadius: 1.6, speed: -0.4, angle: Math.PI * 0.35 },
      { name: "Networks", color: "#3b82f6", size: 0.25, orbitRadius: 2.6, speed: 0.5, angle: Math.PI * 0.7 },
      { name: "Cloud/Ops", color: "#06b6d4", size: 0.25, orbitRadius: 3.1, speed: -0.6, angle: Math.PI * 1.05 },
      { name: "Automation", color: "#f59e0b", size: 0.24, orbitRadius: 3.6, speed: 0.35, angle: Math.PI * 1.4 },
      { name: "Data Analysis", color: "#ec4899", size: 0.24, orbitRadius: 4.1, speed: -0.3, angle: Math.PI * 1.75 },
    ];

    const satellites: SatelliteNode[] = [];
    const satelliteMeshes: THREE.Mesh[] = [];
    const connectionLines: THREE.Line[] = [];
    const orbitRings: THREE.Line[] = [];

    satellitesData.forEach((data, idx) => {
      const satGroup = new THREE.Group();

      // Satellite outer shell (wireframe)
      const satWireGeo = new THREE.SphereGeometry(data.size * 1.3, 8, 8);
      const satWireMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        wireframe: true,
        transparent: true,
        opacity: isLight ? 0.45 : 0.25,
      });
      const satWireMesh = new THREE.Mesh(satWireGeo, satWireMat);
      satGroup.add(satWireMesh);

      // Satellite inner core
      const satGeo = new THREE.SphereGeometry(data.size, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(data.color),
        emissive: new THREE.Color(data.color).multiplyScalar(0.2),
        roughness: 0.2,
        metalness: 0.6,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satGroup.add(satMesh);

      rootGroup.add(satGroup);

      // Build positions
      const pos = new THREE.Vector3(
        Math.cos(data.angle) * data.orbitRadius,
        Math.sin(data.angle) * data.orbitRadius * 0.6, 
        (Math.sin(data.angle + Math.PI / 4) * data.orbitRadius) * 0.5
      );
      satGroup.position.copy(pos);

      satellites.push({
        ...data,
        pos,
      });
      satelliteMeshes.push(satGroup as unknown as THREE.Mesh);

      // Create visual orbital trajectory ring
      const orbitPoints: THREE.Vector3[] = [];
      const segments = 64;
      const tiltYRing = isMobileInitial ? 0.32 : 0.65; // Much flatter orbital disks on mobile prevents lower satellites colliding with bottom card
      const tiltZRing = isMobileInitial ? 0.25 : 0.45;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        const ox = Math.cos(theta) * data.orbitRadius;
        const oy = Math.sin(theta) * data.orbitRadius * tiltYRing;
        const oz = Math.sin(theta + idx * Math.PI / 4) * data.orbitRadius * tiltZRing;
        orbitPoints.push(new THREE.Vector3(ox, oy, oz));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(data.color),
        transparent: true,
        opacity: isLight ? 0.25 : 0.15,
      });
      const orbitRing = new THREE.LineLoop(orbitGeo, orbitMat);
      rootGroup.add(orbitRing);
      orbitRings.push(orbitRing as unknown as THREE.Line);

      // Create laser connection link: core to satellite
      const points = [new THREE.Vector3(0, 0, 0), pos.clone()];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(data.color),
        transparent: true,
        opacity: isLight ? 0.3 : 0.15,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);
      connectionLines.push(line);
    });

    // 8. Dynamic Data Packet Flow Simulation
    const packetsCount = 14;
    const packetMeshGroup = new THREE.Group();
    rootGroup.add(packetMeshGroup);

    interface Packet {
      mesh: THREE.Mesh;
      satIndex: number;
      progress: number;
      speed: number;
      isGoingToCore: boolean;
    }

    const packets: Packet[] = [];
    const packetGeo = new THREE.SphereGeometry(0.065, 8, 8);

    for (let i = 0; i < packetsCount; i++) {
      const satIndex = i % satellites.length;
      const col = new THREE.Color(satellites[satIndex].color);
      
      const packetMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.85,
      });

      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      packetMeshGroup.add(packetMesh);

      packets.push({
        mesh: packetMesh,
        satIndex,
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.012,
        isGoingToCore: Math.random() > 0.35,
      });
    }

    // 9. Nebula Ambient Microparticle Starfield
    const starsCount = 65;
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starsPos[i] = (Math.random() - 0.5) * 14;     
      starsPos[i + 1] = (Math.random() - 0.5) * 14; 
      starsPos[i + 2] = (Math.random() - 0.5) * 14; 
    }

    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: isLight ? 0x059669 : 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: isLight ? 0.38 : 0.35,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    rootGroup.add(starField);

    // 10. Mouse & Touch Drag Controls & Hover / Clicking
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.15;
    let targetRotationY = -0.15;
    let currentRotationX = 0.15;
    let currentRotationY = -0.15;

    let velocityX = 0;
    let velocityY = 0;
    const dragFriction = 0.94;
    
    let cursorX = 0;
    let cursorY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        // Bypass touch drag rotations entirely on mobile to prioritize default pages scrolling of the portfolio!
        return;
      }
      isDragging = true;
      const clientX = (e as MouseEvent).clientX;
      const clientY = (e as MouseEvent).clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    // Raycast state definition
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        return; // Prioritize default pages scrolling on mobile, ignore drag hover
      }
      const clientX = (e as MouseEvent).clientX;
      const clientY = (e as MouseEvent).clientY;

      const rect = container.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      cursorX = (localX / rect.width) * 2 - 1;
      cursorY = -(localY / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        velocityX = deltaX * 0.005;
        velocityY = deltaY * 0.005;

        targetRotationY += velocityX;
        targetRotationX += velocityY;
        targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

        previousMousePosition = { x: clientX, y: clientY };
      } else {
        // Handle hovering node cursor pointers
        mouse.set(cursorX, cursorY);
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(satelliteMeshes, true);
        if (intersects.length > 0) {
          container.style.cursor = "pointer";
        } else {
          container.style.cursor = "grab";
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // Core interactive click Raycaster! (satisfies clicked orbits selection change)
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouse.set(clickX, clickY);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes, true);

      if (intersects.length > 0) {
        const hitObject = intersects[0].object;
        let current: THREE.Object3D | null = hitObject;
        while (current && current !== scene) {
          const idx = satelliteMeshes.indexOf(current as THREE.Mesh);
          if (idx !== -1) {
            selectNode(idx);
            break;
          }
          current = current.parent;
        }
      }
    };

    container.addEventListener("mousedown", handlePointerDown);
    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleCanvasClick);
    window.addEventListener("mouseup", handlePointerUp);

    container.addEventListener("touchstart", handlePointerDown, { passive: true });
    container.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // 11. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Support dynamic client-side adjustments during container width resizing
      isMobileLocal = w < 500;
      const currentScale = isMobileLocal ? 0.53 : 0.85;
      rootGroup.scale.set(currentScale, currentScale, currentScale);
    });
    resizeObserver.observe(container);

    // 12. Animation Tick loop
    let clock = new THREE.Clock();
    let animationFrameId: number;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Main core spinning
      coreMesh.rotation.y = elapsedTime * 0.15;
      coreWireMesh.rotation.y = -elapsedTime * 0.05;
      coreWireMesh.rotation.z = elapsedTime * 0.03;

      // Heartbeat pulse to central core
      const breathe = Math.sin(elapsedTime * 1.5) * 0.06 + 1.0;
      coreMesh.scale.set(breathe, breathe, breathe);
      pointLight.intensity = (isLight ? 1.5 : 2.5) + Math.sin(elapsedTime * 3.0) * 0.5;

      // 13. Map Floating HTML Text Labels (Tracks 3D positions over canvas easily!)
      // Core Label Positioning
      tempV.set(0, 0, 0);
      tempV.applyMatrix4(coreMesh.matrixWorld);
      tempV.project(camera);
      const coreX = (tempV.x * 0.5 + 0.5) * width;
      const coreY = (tempV.y * -0.5 + 0.5) * height;
      if (coreLabelRef.current) {
        coreLabelRef.current.style.left = `${coreX}px`;
        coreLabelRef.current.style.top = `${coreY - 45}px`; // position label above central sphere
      }

      // Update position of orbital satellites & their labels
      satellites.forEach((sat, idx) => {
        sat.angle += sat.speed * 0.008;
        
        const tiltY = isMobileLocal ? 0.32 : 0.65; // Match custom flatter visual orbit plane on mobile
        const tiltZ = isMobileLocal ? 0.25 : 0.45;

        sat.pos.x = Math.cos(sat.angle) * sat.orbitRadius;
        sat.pos.y = Math.sin(sat.angle) * sat.orbitRadius * tiltY;
        sat.pos.z = Math.sin(sat.angle + idx * Math.PI / 4) * sat.orbitRadius * tiltZ;

        const mesh = satelliteMeshes[idx];
        if (mesh) {
          mesh.position.copy(sat.pos);
          mesh.rotation.x = elapsedTime * (0.2 + idx * 0.1);
          mesh.rotation.y = -elapsedTime * (0.1 + idx * 0.05);

          // Highlight and pulse the active selection in 3D Space
          const isSelected = idx === selectedIndexRef.current;
          if (isSelected) {
            const highPulse = 1.45 + Math.sin(elapsedTime * 8) * 0.2;
            mesh.scale.set(highPulse, highPulse, highPulse);
          } else {
            mesh.scale.set(1.0, 1.0, 1.0);
          }

          // Dynamic orbital ring opacity update
          const orbitRing = orbitRings[idx];
          if (orbitRing) {
            const orbitMat = orbitRing.material as THREE.LineBasicMaterial;
            if (orbitMat) {
              orbitMat.opacity = isSelected ? (isLight ? 0.9 : 0.95) : (isLight ? 0.35 : 0.15);
            }
          }

          // Glow the inner child material
          if (mesh.children[1]) {
            const innerMesh = mesh.children[1] as THREE.Mesh;
            const mat = innerMesh.material as THREE.MeshStandardMaterial;
            if (mat && mat.emissive) {
              mat.emissiveIntensity = isSelected ? (1.5 + Math.sin(elapsedTime * 6) * 0.6) : 0.3;
            }
          }

          // Map the satellite's HTML label
          tempV.set(0, 0, 0);
          tempV.applyMatrix4(mesh.matrixWorld);
          tempV.project(camera);
          const satX = (tempV.x * 0.5 + 0.5) * width;
          const satY = (tempV.y * -0.5 + 0.5) * height;
          
          const labelEl = satelliteLabelRefs.current[idx];
          if (labelEl) {
            labelEl.style.left = `${satX}px`;
            labelEl.style.top = `${satY - 26}px`; // slightly above the satellite sphere
          }
        }

        // Color connection lasers dynamically
        const line = connectionLines[idx];
        if (line) {
          const positionArr = line.geometry.attributes.position.array as Float32Array;
          positionArr[3] = sat.pos.x;
          positionArr[4] = sat.pos.y;
          positionArr[5] = sat.pos.z;
          line.geometry.attributes.position.needsUpdate = true;

          // Make selected line extremely bright, dim down other lines
          const isSelected = idx === selectedIndexRef.current;
          const lineMat = line.material as THREE.LineBasicMaterial;
          if (lineMat) {
            lineMat.opacity = isSelected ? (isLight ? 0.8 : 0.9) : (isLight ? 0.22 : 0.12);
          }
        }
      });

      // Flowing Packets animation loop
      packets.forEach((pkt) => {
        const sat = satellites[pkt.satIndex];
        if (!sat) return;

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1.0) {
          pkt.progress = 0;
          pkt.isGoingToCore = Math.random() > 0.35;
          pkt.satIndex = (pkt.satIndex + 1) % satellites.length;
        }

        const activeSat = satellites[pkt.satIndex];
        const startPoint = pkt.isGoingToCore ? activeSat.pos : new THREE.Vector3(0, 0, 0);
        const endPoint = pkt.isGoingToCore ? new THREE.Vector3(0, 0, 0) : activeSat.pos;

        const currentPos = new THREE.Vector3().lerpVectors(startPoint, endPoint, pkt.progress);
        pkt.mesh.position.copy(currentPos);

        const pulse = 0.5 + Math.sin(elapsedTime * 12 + pkt.progress * 10) * 0.5;
        const mat = pkt.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.45 + pulse * 0.45;
      });

      starField.rotation.y = elapsedTime * 0.02;

      // Handle dragging friction & momentum
      if (!isDragging) {
        velocityX *= dragFriction;
        velocityY *= dragFriction;
        targetRotationY += velocityX;
        targetRotationX += velocityY;
        targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.12;
      currentRotationY += (targetRotationY - currentRotationY) * 0.12;

      rootGroup.rotation.x = currentRotationX;
      rootGroup.rotation.y = currentRotationY;

      if (!isDragging) {
        rootGroup.position.x += (cursorX * 0.4 - rootGroup.position.x) * 0.05;
        const targetY = (isMobileLocal ? 0.45 : 1.35) + cursorY * (isMobileLocal ? 0.15 : 0.3);
        rootGroup.position.y += (targetY - rootGroup.position.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      container.removeEventListener("mousedown", handlePointerDown);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("mouseup", handlePointerUp);

      container.removeEventListener("touchstart", handlePointerDown);
      container.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);

      scene.clear();
      coreWireGeometry.dispose();
      coreWireMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      satellitesData.forEach((_, idx) => {
        const mesh = satelliteMeshes[idx];
        if (mesh) {
          mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }
        const line = connectionLines[idx];
        if (line) {
          line.geometry.dispose();
          if (Array.isArray(line.material)) {
            line.material.forEach((mat) => mat.dispose());
          } else {
            line.material.dispose();
          }
        }
        const orbit = orbitRings[idx];
        if (orbit) {
          orbit.geometry.dispose();
          if (Array.isArray(orbit.material)) {
            orbit.material.forEach((mat) => mat.dispose());
          } else {
            orbit.material.dispose();
          }
        }
      });

      packetGeo.dispose();
      packets.forEach((p) => {
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach((mat) => mat.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });

      starsGeo.dispose();
      starsMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]); // Re-create scene if theme changes to seamlessly rebuild correct background and particles!

  return (
    <div className="w-full h-full relative group">
      {/* Absolute canvas container */}
      <div 
        ref={containerRef} 
        className="w-full h-full absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Absolutely Positioned Floating Labels in 3D */}
      {/* Central George Chaka Core Label */}
      <div 
        ref={coreLabelRef} 
        className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <div className={`px-2.5 py-1 rounded-full border text-[9.5px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-md transition-all duration-300 keep-dark ${
          isLight 
            ? "bg-emerald-950 text-white border-emerald-800" 
            : "bg-emerald-950/90 text-emerald-300 border-emerald-500/30"
        }`}>
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>George Chaka</span>
        </div>
      </div>

      {/* Orbit Satellite Labels */}
      {NODES_EXPLANATION.map((node, i) => {
        const isActive = i === selectedNodeIndex;
        return (
          <div
            key={node.name}
            ref={(el) => (satelliteLabelRefs.current[i] = el)}
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <div className={`px-2 py-0.5 rounded-full border text-[8.5px] font-mono tracking-tight transition-all duration-300 shadow-xs flex items-center gap-1 leading-none ${
              isActive
                ? isLight
                  ? `${node.lightTextBg} font-bold scale-105 shadow-md`
                  : `${node.textBg} font-bold scale-105 shadow-md`
                : isLight
                  ? "bg-white/95 text-zinc-800 border-zinc-200"
                  : "bg-zinc-950/80 text-zinc-400 border-white/5"
            }`}>
              <span>{node.emoji}</span>
              <span>{node.name}</span>
            </div>
          </div>
        );
      })}

      {/* Header telemetry and control guides */}
      <div className="absolute top-3.5 left-4 z-20 font-mono pointer-events-none select-none text-left space-y-0.5">
        <div className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
          isLight ? "text-emerald-700" : "text-emerald-400"
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block animate-pulse" />
          <span>Interactive Skill Globe</span>
        </div>
        <div className={`text-[8px] tracking-wider font-extrabold uppercase hidden sm:block ${
          isLight ? "text-emerald-950/90" : "text-white/45 font-light"
        }`}>
          Click spheres • Drag to spin system
        </div>
      </div>

      <div className={`absolute top-3.5 right-4 z-20 font-mono pointer-events-auto flex items-center gap-1.5 border px-2 py-0.5 rounded text-[7.5px] select-none ${
        isLight 
          ? "border-zinc-250 bg-white/80 text-zinc-650 shadow-xs" 
          : "border-white/5 bg-black/60 text-white/50"
      }`}>
        <span>SWIPE ORBIT</span>
      </div>

      {/* 6-Node Selector Tabs Row */}
      <div className={`absolute top-[46px] left-4 right-4 z-20 grid grid-cols-3 sm:flex sm:flex-nowrap sm:justify-between gap-1.5 pb-2 border-b pointer-events-auto select-none ${
        isLight ? "border-zinc-200" : "border-white/5"
      }`}>
        {NODES_EXPLANATION.map((node, i) => {
          const isActive = i === selectedNodeIndex;
          return (
            <button
              key={node.name}
              onClick={() => selectNode(i)}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-full text-[8.5px] xs:text-[9px] sm:text-[8.5px] font-mono tracking-tight uppercase cursor-pointer transition-all duration-300 border ${
                isActive
                  ? isLight
                    ? `${node.lightTextBg} font-extrabold shadow-sm border-emerald-500/30`
                    : `${node.textBg} font-extrabold shadow-sm border-emerald-400/30`
                  : isLight
                    ? "bg-zinc-150/80 text-zinc-600 border-zinc-200 hover:text-zinc-800 hover:bg-zinc-200"
                    : "bg-black/35 text-white/45 border-white/5 hover:text-white/75 hover:bg-black/55"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${node.dotColor} ${isActive ? "animate-pulse" : ""}`} />
              <span>{node.name}</span>
            </button>
          );
        })}
      </div>

      {/* Layman-friendly Explanation Box Overlay */}
      <div className="absolute bottom-3 left-3 right-3 z-20 select-none pointer-events-auto">
        <div className={`w-full backdrop-blur-md border rounded-xl p-3 transition-all duration-300 shadow-lg ${
          isLight
            ? `${NODES_EXPLANATION[selectedNodeIndex].lightBgColor} shadow-black/[0.04]`
            : `${NODES_EXPLANATION[selectedNodeIndex].bgColor} shadow-black/40`
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between border-b pb-1 mb-1.5 ${
            isLight ? "border-zinc-200/50" : "border-white/5"
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">{NODES_EXPLANATION[selectedNodeIndex].emoji}</span>
              <span className={`font-sans font-extrabold text-[10px] uppercase tracking-wide truncate max-w-[145px] xs:max-w-[190px] sm:max-w-none ${
                isLight ? "text-zinc-850" : "text-white"
              }`}>
                {NODES_EXPLANATION[selectedNodeIndex].label}
              </span>
            </div>
            <span className={`text-[7.5px] font-mono bg-black/10 px-1.5 py-0.5 rounded border uppercase tracking-wider hidden sm:inline-block ${
              isLight 
                ? "text-zinc-600 border-zinc-200 bg-zinc-200/40" 
                : "text-zinc-300 border-white/5 bg-black/35"
            }`}>
              {NODES_EXPLANATION[selectedNodeIndex].short}
            </span>
          </div>

          {/* Simple Explanation Body */}
          <p className={`text-[10px] leading-relaxed mb-1.5 font-sans font-medium text-left ${
            isLight ? "text-zinc-700" : "text-zinc-300"
          }`}>
            {NODES_EXPLANATION[selectedNodeIndex].layman}
          </p>

          {/* Practical layman-friendly realworld metaphor */}
          <div className={`rounded-lg p-2 border text-[9px] leading-relaxed mb-1.5 text-left ${
            isLight 
              ? "bg-zinc-250/20 border-zinc-200/40 text-zinc-600" 
              : "bg-black/35 border-white/5 text-zinc-400"
          }`}>
            <span className={`font-mono font-bold block text-[7.5px] uppercase tracking-wider mb-0.5 ${
              isLight ? "text-emerald-700" : "text-emerald-400"
            }`}>// WHAT DOES THAT MEAN?</span>
            <span>{NODES_EXPLANATION[selectedNodeIndex].example}</span>
          </div>

          {/* Technology bullet chips */}
          <div className="flex flex-wrap gap-1">
            {NODES_EXPLANATION[selectedNodeIndex].tech.map((t) => (
              <span
                key={t}
                className={`font-mono text-[7.5px] px-1.5 py-0.5 rounded-md border ${
                  isLight 
                    ? "bg-zinc-100/80 text-zinc-600 border-zinc-200/60" 
                    : "bg-black/45 text-zinc-400 border-white/5"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
