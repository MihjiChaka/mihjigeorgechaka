import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X, Activity } from "lucide-react";

interface NodeData {
  index: number;
  name: string;
  latency: string;
  throughput: string;
  status: "Active" | "Healthy" | "Syncing" | "Optimized" | "Idle";
  protocol: string;
  load: string;
}

const getNodeMetadata = (idx: number): NodeData => {
  const names = [
    "GNA Sync Gateway",
    "Agro-Agent DB Node",
    "Bulk SMS Router",
    "Field Office Bridge",
    "API Gateway Handler",
    "Redis Cache Mesh",
    "Docker Container Engine",
    "Secure SSHv2 Daemon",
    "JSON-RPC Broker",
    "Data Validator Stack",
    "PostgreSQL Sync Cluster",
    "Low-Latency Tunnel",
  ];
  
  const protocols = ["gRPC", "HTTPS", "WS", "TCP/IP", "WebOS", "GraphQL"];
  const statuses: ("Active" | "Healthy" | "Syncing" | "Optimized" | "Idle")[] = [
    "Active", "Healthy", "Syncing", "Optimized", "Idle"
  ];
  
  // Deterministic values based on coordinate index
  const name = names[idx % names.length] + ` #${200 + (idx * 3) % 799}`;
  const protocol = protocols[(idx * 7) % protocols.length];
  const status = statuses[(idx * 13) % statuses.length];
  const latency = `${12 + (idx * 19) % 35}ms`;
  const throughput = `${500 + (idx * 150) % 2500} req/s`;
  const load = `${(idx * 7) % 65 + 10}%`;
  
  return {
    index: idx,
    name,
    protocol,
    status,
    latency,
    throughput,
    load
  };
};

export function DataStreamFlow({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHolderRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedNodeIndex, _setSelectedNodeIndex] = useState<number | null>(null);
  const selectedNodeIndexRef = useRef<number | null>(null);

  const setSelectedNodeIndex = (index: number | null) => {
    _setSelectedNodeIndex(index);
    selectedNodeIndexRef.current = index;
  };

  useEffect(() => {
    if (!containerRef.current || !canvasHolderRef.current) return;

    const container = containerRef.current;
    const canvasHolder = canvasHolderRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - wide angle lens to capture more particles on margins
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // 3. Renderer with transparent background to let existing styling show through
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    canvasHolder.appendChild(renderer.domElement);

    // 4. Generate random coordinate particles (data nodes)
    const isMobileDevice = window.innerWidth < 768;
    const particlesCount = isMobileDevice ? 45 : 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const initialPositions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    const frequencies = new Float32Array(particlesCount);
    
    // Dynamically adjust coloring based on theme
    const isLight = theme === "light";
    const defaultColor = new THREE.Color(isLight ? 0x059669 : 0x10b981);
    const hoverColor = new THREE.Color(isLight ? 0x1d4ed8 : 0x3b82f6);
    const hyperColor = new THREE.Color(isLight ? 0x0369a1 : 0x06b6d4);
    
    for (let i = 0; i < particlesCount; i++) {
      const idx = i * 3;
      // Scatter points within a wide 3D grid bounds
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 35;
      
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      initialPositions[idx] = x;
      initialPositions[idx + 1] = y;
      initialPositions[idx + 2] = z;

      // Color starts as standard emerald
      colors[idx] = defaultColor.r;
      colors[idx + 1] = defaultColor.g;
      colors[idx + 2] = defaultColor.b;

      speeds[i] = 0.2 + Math.random() * 0.8;
      frequencies[i] = 0.5 + Math.random() * 1.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Round Particle map helper to bypass default square points
    const createCircleTexture = () => {
      const matCanvas = document.createElement("canvas");
      matCanvas.width = 16;
      matCanvas.height = 16;
      const ctx = matCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const texture = new THREE.Texture(matCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    // 5. Points Material using Vertex Colors
    const material = new THREE.PointsMaterial({
      size: isLight ? 0.35 : 0.28, // slightly larger targets for easier clicking and visual presence
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.55 : 0.5,
      sizeAttenuation: true,
      map: createCircleTexture(),
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starParticles = new THREE.Points(geometry, material);
    scene.add(starParticles);

    // 5.5 High-Tech Collision Ripple Pool Helper
    const createRippleTexture = () => {
      const matCanvas = document.createElement("canvas");
      matCanvas.width = 64;
      matCanvas.height = 64;
      const ctx = matCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 64, 64);
        
        // Outer glowing ring
        ctx.beginPath();
        ctx.arc(32, 32, 24, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glowing concentric circle
        ctx.beginPath();
        ctx.arc(32, 32, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
      const texture = new THREE.Texture(matCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    const ripplePoolSize = 15;
    const rippleIndexRef = { current: 0 };
    const ripples: {
      mesh: THREE.Mesh;
      material: THREE.MeshBasicMaterial;
      active: boolean;
      progress: number;
    }[] = [];

    const rippleGeo = new THREE.PlaneGeometry(1.8, 1.8);
    const rippleTexture = createRippleTexture();

    for (let r = 0; r < ripplePoolSize; r++) {
      const rippleMat = new THREE.MeshBasicMaterial({
        map: rippleTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
        color: isLight ? 0x059669 : 0x10b981,
        side: THREE.DoubleSide
      });
      const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
      rippleMesh.visible = false;
      scene.add(rippleMesh);
      ripples.push({
        mesh: rippleMesh,
        material: rippleMat,
        active: false,
        progress: 0
      });
    }

    const triggerRipple = (x: number, y: number, z: number) => {
      const rip = ripples.find(r => !r.active) || ripples[rippleIndexRef.current];
      if (rip) {
        rip.mesh.position.set(x, y, z);
        rip.mesh.scale.set(0.1, 0.1, 0.1);
        rip.mesh.quaternion.copy(camera.quaternion);
        rip.mesh.visible = true;
        rip.material.opacity = 0.8;
        rip.progress = 0;
        rip.active = true;
        rippleIndexRef.current = (rippleIndexRef.current + 1) % ripplePoolSize;
      }
    };

    const activeCollisions = new Map<string, number>();

    // 6. Dynamic Linking Grid: Create connections dynamically if they are close
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      vertexColors: false, // will update color uniformly or dynamically below
      transparent: true,
      opacity: isLight ? 0.12 : 0.05,
    });

    const maxConnections = isMobileDevice ? 30 : 140;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constellationLines);

    // 7. Cursor interaction & Smooth Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Tracks dynamic mouse interactions in 3D
    let raycaster = new THREE.Raycaster();
    let mouse3D = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized tracking coordinates
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;

      // Map to -1 to 1 for Raycasting
      mouse3D.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse3D.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Click handler to Raycast and select individual particles
    const clickRaycaster = new THREE.Raycaster();
    const handleMouseClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      clickRaycaster.setFromCamera(new THREE.Vector2(xNorm, yNorm), camera);
      // Comfortable point-intersection threshold
      clickRaycaster.params.Points.threshold = 0.8; 
      
      const intersects = clickRaycaster.intersectObject(starParticles);
      if (intersects.length > 0) {
        const firstIntersect = intersects[0];
        const idx = firstIntersect.index;
        if (idx !== undefined) {
          e.stopPropagation();
          setSelectedNodeIndex(idx);
        }
      } else {
        // Clear selection if clicking empty canvas space
        setSelectedNodeIndex(null);
      }
    };

    container.addEventListener("click", handleMouseClick);

    // 8. Responsive Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // 9. Frame ticking Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Subtle rotations
      starParticles.rotation.y = elapsedTime * 0.006;
      starParticles.rotation.x = elapsedTime * 0.002;

      // Project mouse into 3D world plane at z=0 to find interactive center
      raycaster.setFromCamera(mouse3D, camera);
      const tempTarget = new THREE.Vector3();
      raycaster.ray.at(25, tempTarget); // distance corresponding to camera.position.z

      const positionsArr = geometry.attributes.position.array as Float32Array;
      const colorsArr = geometry.attributes.color.array as Float32Array;
      const positionsLength = positionsArr.length;
      
      // Dynamic Target color based on isHovered element state
      const currentHoverState = container.dataset.hovered === "true";
      const selectedIndex = selectedNodeIndexRef.current;

      // Slowly float coordinates & apply active hover push/pull & color transitions
      for (let i = 0; i < positionsLength; i += 3) {
        const particleIdx = i / 3;
        
        // Base sine wave float
        const originalX = initialPositions[i];
        const originalY = initialPositions[i + 1];
        const originalZ = initialPositions[i + 2];

        // Drift
        positionsArr[i] += Math.sin(elapsedTime * 0.4 * frequencies[particleIdx] + particleIdx) * 0.002;
        positionsArr[i + 1] += Math.cos(elapsedTime * 0.3 * frequencies[particleIdx] + particleIdx) * 0.002;

        // Current particle position in space
        const partX = positionsArr[i];
        const partY = positionsArr[i + 1];
        const partZ = positionsArr[i + 2];

        // Core proximity logic to user cursor
        const dx = partX - tempTarget.x;
        const dy = partY - tempTarget.y;
        const dz = partZ - tempTarget.z;
        const distToCursor = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const isClose = distToCursor < 8.0;

        // Transition individual particle colors
        let targetColor = defaultColor;
        
        if (selectedIndex !== null && particleIdx === selectedIndex) {
          // Pulse the selected node's color beautifully (blinking orange-gold to bright amber)
          const blink = Math.sin(elapsedTime * 10) * 0.5 + 0.5;
          targetColor = new THREE.Color().lerpColors(
            new THREE.Color(0xd97706), // Deep Amber-600
            new THREE.Color(0xfef08a), // White gold / Yellow-200
            blink
          );
        } else if (isClose) {
          targetColor = hyperColor; // Bright cyan near mouse
          // Push particles slightly away from cursor when extremely close for a dynamic bubble touch effect
          if (distToCursor < 4.0 && currentHoverState) {
            const pushForce = (4.0 - distToCursor) * 0.02;
            positionsArr[i] += (dx / distToCursor) * pushForce;
            positionsArr[i + 1] += (dy / distToCursor) * pushForce;
          }
        } else if (currentHoverState) {
          targetColor = hoverColor; // Transition everything to Electric Blue when hovering the background
        }

        // Smoothly double-lerp current color to target color
        colorsArr[i] += (targetColor.r - colorsArr[i]) * 0.08;
        colorsArr[i + 1] += (targetColor.g - colorsArr[i + 1]) * 0.08;
        colorsArr[i + 2] += (targetColor.b - colorsArr[i + 2]) * 0.08;
      }
      
      // 1. Update and animate active high-tech ripples
      ripples.forEach(rip => {
        if (rip.active) {
          rip.progress += 0.035; // Expand speed
          if (rip.progress >= 1.0) {
            rip.active = false;
            rip.mesh.visible = false;
          } else {
            const currentScale = 0.1 + rip.progress * 4.2;
            rip.mesh.scale.set(currentScale, currentScale, currentScale);
            rip.material.opacity = (1.0 - rip.progress) * 0.75;
            rip.mesh.quaternion.copy(camera.quaternion);
          }
        }
      });

      // 2. Collision & proximity detection between packet nodes
      const nowTime = elapsedTime;
      for (const [key, timestamp] of activeCollisions.entries()) {
        if (nowTime - timestamp > 4.5) {
          activeCollisions.delete(key);
        }
      }

      for (let i = 0; i < positionsLength; i += 3) {
        const idx1 = i / 3;
        const x1 = positionsArr[i];
        const y1 = positionsArr[i + 1];
        const z1 = positionsArr[i + 2];

        // Search in a performant lookup window (25 nodes checks)
        const checkLimit = Math.min(positionsLength, i + 3 * 25);
        for (let j = i + 3; j < checkLimit; j += 3) {
          const idx2 = j / 3;
          const x2 = positionsArr[j];
          const y2 = positionsArr[j + 1];
          const z2 = positionsArr[j + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          // Inside a close 2.0 unit sphere
          if (distSq < 4.0) {
            const key = idx1 < idx2 ? `${idx1}-${idx2}` : `${idx2}-${idx1}`;
            if (!activeCollisions.has(key)) {
              activeCollisions.set(key, nowTime);

              // Spawn the expanding concentric ripple at their spatial midpoint coordinates
              const mx = (x1 + x2) * 0.5;
              const my = (y1 + y2) * 0.5;
              const mz = (z1 + z2) * 0.5;
              triggerRipple(mx, my, mz);

              // Inject energy into the nodes by flashing their color buffer indices (gold-cyan highlight sparkle)
              const flashColor = isLight ? new THREE.Color(0x0284c7) : new THREE.Color(0x38bdf8);
              colorsArr[i] = flashColor.r * 1.5;
              colorsArr[i + 1] = flashColor.g * 1.5;
              colorsArr[i + 2] = flashColor.b * 1.5;

              colorsArr[j] = flashColor.r * 1.5;
              colorsArr[j + 1] = flashColor.g * 1.5;
              colorsArr[j + 2] = flashColor.b * 1.5;
            }
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Update line links based on dynamic colors too
      if (currentHoverState) {
        lineMaterial.color.setHex(isLight ? 0x0369a1 : 0x06b6d4);
        lineMaterial.opacity = isLight ? 0.22 : 0.08;
      } else {
        lineMaterial.color.setHex(isLight ? 0x059669 : 0x10b981);
        lineMaterial.opacity = isLight ? 0.12 : 0.04;
      }

      // Recalculate spatial constellation line links
      let lineIndex = 0;
      const posArray = lineGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positionsLength; i += 3) {
        const x1 = positionsArr[i];
        const y1 = positionsArr[i + 1];
        const z1 = positionsArr[i + 2];

        for (let j = i + 3; j < positionsLength; j += 3) {
          const x2 = positionsArr[j];
          const y2 = positionsArr[j + 1];
          const z2 = positionsArr[j + 2];

          const distSq = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
          const rangeLimit = currentHoverState ? 140 : 100;

          if (distSq < rangeLimit && lineIndex < maxConnections) {
            const idxOffset = lineIndex * 6;
            
            posArray[idxOffset] = x1;
            posArray[idxOffset + 1] = y1;
            posArray[idxOffset + 2] = z1;

            posArray[idxOffset + 3] = x2;
            posArray[idxOffset + 4] = y2;
            posArray[idxOffset + 5] = z2;

            lineIndex++;
          }
        }
      }
      
      for (let k = lineIndex * 6; k < maxConnections * 6; k++) {
        posArray[k] = 9999;
      }
      lineGeometry.attributes.position.needsUpdate = true;

      // Apply mouse smooth interpolation parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.6;
      camera.position.y = -targetY * 0.6;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);

      // Direct-manipulation tracking for the selected point's 3D coordinate project screen position
      if (selectedIndex !== null) {
        const x = positionsArr[selectedIndex * 3];
        const y = positionsArr[selectedIndex * 3 + 1];
        const z = positionsArr[selectedIndex * 3 + 2];
        
        const tempV = new THREE.Vector3(x, y, z);
        tempV.applyMatrix4(starParticles.matrixWorld);
        tempV.project(camera);
        
        const widthVal = renderer.domElement.clientWidth;
        const heightVal = renderer.domElement.clientHeight;
        const x2d = (tempV.x * 0.5 + 0.5) * widthVal;
        const y2d = (-tempV.y * 0.5 + 0.5) * heightVal;
        
        if (tooltipRef.current) {
          tooltipRef.current.style.left = `${x2d}px`;
          tooltipRef.current.style.top = `${y2d - 14}px`;
          tooltipRef.current.style.transform = "translate(-50%, -100%) scale(1)";
          tooltipRef.current.style.opacity = "1";
        }
      }
    };

    animate();

    // 10. Clean lifecycle disposition
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleMouseClick);
      resizeObserver.disconnect();

      scene.clear();
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      lineGeometry.dispose();
      rippleGeo.dispose();
      rippleTexture.dispose();
      ripples.forEach(rip => {
        rip.material.dispose();
      });
      renderer.dispose();
      if (canvasHolder.contains(renderer.domElement)) {
        canvasHolder.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  const isLight = theme === "light";
  const selectedNode = selectedNodeIndex !== null ? getNodeMetadata(selectedNodeIndex) : null;

  return (
    <div 
      ref={containerRef} 
      data-hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full absolute inset-0 z-0 pointer-events-auto overflow-hidden select-none"
    >
      {/* Canvas wrapper with targeted opacity to let background theme colors blend */}
      <div 
        ref={canvasHolderRef}
        className="w-full h-full opacity-45 hover:opacity-60 transition-opacity duration-500 absolute inset-0 pointer-events-none"
      />
      
      {/* Elegant, futuristic interactive node tooltip overlay */}
      {selectedNode && (
        <div 
          ref={tooltipRef}
          onClick={(e) => e.stopPropagation()} // Guard from parent click-away dismissals
          className={`absolute pointer-events-auto z-50 rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-300 w-64 ${
            isLight 
              ? "bg-white/95 border-emerald-500/20 text-zinc-900 shadow-zinc-950/10" 
              : "bg-[#0b0b0e]/95 border-emerald-500/30 text-white shadow-black/80"
          }`}
          style={{ transitionProperty: "transform, opacity", transitionDuration: "200ms" }}
        >
          {/* Node Header */}
          <div className="flex items-center justify-between border-b pb-2 mb-2 border-zinc-200/50 dark:border-white/10">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${
                selectedNode.status === "Active" || selectedNode.status === "Healthy"
                  ? "bg-emerald-400"
                  : selectedNode.status === "Syncing"
                    ? "bg-amber-400"
                    : "bg-blue-400"
              }`} />
              <h4 className="font-mono text-[10px] font-bold tracking-tight uppercase truncate">
                {selectedNode.name}
              </h4>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNodeIndex(null);
              }}
              className={`p-1 rounded-md transition-all duration-150 cursor-pointer ${
                isLight 
                  ? "hover:bg-black/5 text-zinc-400 hover:text-zinc-700" 
                  : "hover:bg-white/10 text-white/40 hover:text-white"
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Core Technical Metric Stats Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-mono leading-tight">
            <div>
              <span className={isLight ? "text-zinc-500 text-[9px]" : "text-white/40 text-[9px]"}>STATUS</span>
              <p className={`font-semibold ${
                selectedNode.status === "Active" || selectedNode.status === "Healthy"
                  ? "text-emerald-500"
                  : selectedNode.status === "Syncing"
                    ? "text-amber-500"
                    : "text-blue-400"
              }`}>{selectedNode.status}</p>
            </div>
            
            <div>
              <span className={isLight ? "text-zinc-500 text-[9px]" : "text-white/40 text-[9px]"}>LATENCY</span>
              <p className={isLight ? "text-zinc-800 font-bold" : "text-white/80 font-bold"}>
                {selectedNode.latency}
              </p>
            </div>
            
            <div>
              <span className={isLight ? "text-zinc-500 text-[9px]" : "text-white/40 text-[9px]"}>THROUGHPUT</span>
              <p className={isLight ? "text-zinc-800 font-bold" : "text-white/80 font-bold"}>
                {selectedNode.throughput}
              </p>
            </div>
            
            <div>
              <span className={isLight ? "text-zinc-500 text-[9px]" : "text-white/40 text-[9px]"}>SYSTEM LOAD</span>
              <p className={isLight ? "text-zinc-800 font-bold" : "text-white/80 font-bold"}>
                {selectedNode.load}
              </p>
            </div>

            <div className="col-span-2 pt-2 mt-1 border-t border-dashed border-zinc-200/50 dark:border-white/10 flex items-center justify-between text-[8px] tracking-wider">
              <span className="uppercase text-emerald-500 font-extrabold">{selectedNode.protocol} CONNECTION</span>
              <span className={isLight ? "text-zinc-500" : "text-white/35"}>ID {1000 + selectedNode.index}</span>
            </div>
          </div>

          {/* Accent pointer triangle element */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent ${
            isLight 
              ? "border-t-white/95" 
              : "border-t-[#0b0b0e]/95"
          }`} />
        </div>
      )}
    </div>
  );
}
