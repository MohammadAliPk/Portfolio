import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type Props = {
  motion: boolean;
  progressRef: MutableRefObject<number>;
};

function css(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

export function SpaceFieldScene({ motion, progressRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let raf = 0;
    let running = true;
    let visible = false;
    let lastFrame = 0;

    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.2, 8.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "field__canvas";
    mount.appendChild(renderer.domElement);

    const teal = new THREE.Color(css("--teal", "#2dd4bf"));
    const sand = new THREE.Color(css("--sand", "#e0a86c"));
    const ink = new THREE.Color(css("--ink", "#e8f0ef"));

    const rootGroup = new THREE.Group();
    rootGroup.scale.setScalar(0.86);
    scene.add(rootGroup);

    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: teal,
      transparent: true,
      opacity: 0.14,
    });
    rootGroup.add(new THREE.Mesh(coreGeo, coreMat));

    const wireMat = new THREE.MeshBasicMaterial({
      color: teal,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    rootGroup.add(new THREE.Mesh(coreGeo.clone(), wireMat));

    const crystalGeo = new THREE.OctahedronGeometry(0.42, 0);
    const crystalMat = new THREE.MeshBasicMaterial({
      color: sand,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    rootGroup.add(crystal);

    const ringMats: THREE.MeshBasicMaterial[] = [];
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.TorusGeometry(1.45 + i * 0.28, 0.012, 8, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: i === 1 ? sand : teal,
        transparent: true,
        opacity: 0.55 - i * 0.1,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = Math.PI / 2.4 + i * 0.35;
      ring.rotation.y = i * 0.7;
      rootGroup.add(ring);
      rings.push(ring);
      ringMats.push(mat);
    }

    const starCount = 160;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 2.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: ink,
      size: 0.028,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const haloGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const haloMat = new THREE.MeshBasicMaterial({
      color: teal,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    rootGroup.add(new THREE.Mesh(haloGeo, haloMat));

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const section = mount.closest(".field") as HTMLElement | null;

    const onMove = (e: PointerEvent) => {
      if (!section) return;
      const r = section.getBoundingClientRect();
      ptr.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ptr.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const syncTheme = () => {
      teal.set(css("--teal", "#2dd4bf"));
      sand.set(css("--sand", "#e0a86c"));
      ink.set(css("--ink", "#e8f0ef"));
      coreMat.color.copy(teal);
      wireMat.color.copy(teal);
      crystalMat.color.copy(sand);
      haloMat.color.copy(teal);
      starMat.color.copy(ink);
      ringMats.forEach((m, i) => m.color.copy(i === 1 ? sand : teal));
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = 0;
      if (!visible) return;

      if (motion && now - lastFrame < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      if (motion) {
        ptr.x += (ptr.tx - ptr.x) * 0.06;
        ptr.y += (ptr.ty - ptr.y) * 0.06;
      }

      const t = now * 0.001;
      const p = progressRef.current;

      rootGroup.rotation.y = t * (motion ? 0.18 : 0) + p * Math.PI * 1.6;
      rootGroup.rotation.x = Math.sin(t * 0.35) * 0.1 + p * 0.55 + ptr.y * 0.16;
      rootGroup.rotation.z = ptr.x * 0.1 + p * 0.2;

      crystal.rotation.y = -t * 0.8;
      crystal.rotation.x = t * 0.45;
      crystal.scale.setScalar(0.9 + Math.sin(t * 1.4) * 0.08 + p * 0.15);

      rings.forEach((ring, i) => {
        ring.rotation.z += motion ? 0.004 + i * 0.0015 : 0;
        ring.rotation.x += motion ? 0.0015 : 0;
      });

      stars.rotation.y = t * 0.04 + p * 0.5;
      stars.rotation.x = ptr.y * 0.08;

      camera.position.x = ptr.x * 0.55 + Math.sin(p * Math.PI) * 0.35;
      camera.position.y = 0.25 + ptr.y * 0.3 + p * 0.15;
      camera.position.z = 8.4 - p * 0.35;
      camera.lookAt(0, 0, 0);

      wireMat.opacity = 0.55 + Math.sin(t * 2) * 0.12 + p * 0.2;
      coreMat.opacity = 0.1 + p * 0.12;

      renderer.render(scene, camera);

      if (motion && visible) raf = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    syncTheme();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );
    io.observe(mount);

    const target = section ?? mount;
    target.addEventListener("pointermove", onMove, { passive: true });
    const onResize = () => {
      resize();
      schedule();
    };
    window.addEventListener("resize", onResize);

    const mo = new MutationObserver(() => {
      syncTheme();
      schedule();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // keep animating while pinned even if only progress changes
    const progressPoll = window.setInterval(() => {
      if (visible && motion && !raf) schedule();
      else if (visible && !motion) schedule();
    }, 200);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearInterval(progressPoll);
      io.disconnect();
      mo.disconnect();
      target.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      coreGeo.dispose();
      crystalGeo.dispose();
      haloGeo.dispose();
      starGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      crystalMat.dispose();
      haloMat.dispose();
      starMat.dispose();
      rings.forEach((r) => r.geometry.dispose());
      ringMats.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [motion, progressRef]);

  return <div className="field__mount" ref={mountRef} />;
}
