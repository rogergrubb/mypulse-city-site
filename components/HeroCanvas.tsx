"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated pulse beams hero canvas. Ported from the static HTML
 * landing template into a self-contained React component.
 *
 * Cleans up event listeners, animation frame, and THREE resources on unmount.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060d, 0.00008);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.5,
      60000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    // Stars
    {
      const g = new THREE.BufferGeometry();
      const p = new Float32Array(2500 * 3);
      for (let i = 0; i < 2500; i++) {
        const r = 25000;
        const t = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        p[i * 3] = r * Math.sin(ph) * Math.cos(t);
        p[i * 3 + 1] = Math.abs(r * Math.cos(ph));
        p[i * 3 + 2] = r * Math.sin(ph) * Math.sin(t);
      }
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      scene.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({
            color: 0xffffff,
            size: 10,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: false,
          })
        )
      );
    }

    // City silhouette
    {
      const group = new THREE.Group();
      for (let i = 0; i < 500; i++) {
        const d = 600 + Math.random() * 30000;
        const a = Math.random() * Math.PI * 2;
        const h =
          20 + Math.random() * 150 + Math.max(0, (d - 4000) / 120);
        const w = 25 + Math.random() * 40;
        const m = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, w),
          new THREE.MeshBasicMaterial({ color: 0x08111e })
        );
        m.position.set(Math.cos(a) * d, h / 2, Math.sin(a) * d);
        group.add(m);
      }
      scene.add(group);
    }

    // Ground grid
    const grid = new THREE.GridHelper(80000, 200, 0x132040, 0x0a1428);
    scene.add(grid);

    // Pulses
    const PALETTE = [
      0xff3d7f, 0xff6b35, 0xfcd34d, 0x10b981, 0x06b6d4, 0xa855f7,
    ];
    type PulseObj = {
      glow: THREE.Mesh;
      core: THREE.Mesh;
      idx: number;
      miles: number;
    };
    const pulses: PulseObj[] = [];
    for (let i = 0; i < 18; i++) {
      const distM = (3 + Math.random() * 60) * 1609;
      const ang = Math.random() * Math.PI * 2;
      const x = Math.cos(ang) * distM;
      const z = Math.sin(ang) * distM;
      const color = PALETTE[i % PALETTE.length];

      const glow = new THREE.Mesh(
        new THREE.CylinderGeometry(60, 250, 5500, 20, 1, true),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.25,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      glow.position.set(x, 2750, z);

      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 7, 5500, 10, 1, true),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      core.position.set(x, 2750, z);

      scene.add(glow);
      scene.add(core);
      pulses.push({ glow, core, idx: i, miles: distM / 1609 });
    }

    let rafId = 0;
    let t0 = 0;
    const tick = (t: number) => {
      rafId = requestAnimationFrame(tick);
      t0 = t * 0.0001;
      const camR = 350;
      camera.position.set(
        Math.sin(t0 * 0.5) * camR,
        120 + Math.sin(t0) * 30,
        Math.cos(t0 * 0.5) * camR
      );
      camera.lookAt(0, 200, 0);

      const heartbeat = 0.6 + 0.4 * Math.sin(t * 0.002);
      pulses.forEach((p) => {
        const indiv =
          0.7 + 0.3 * Math.sin(t * 0.001 * (1 + p.idx * 0.07) + p.idx);
        const I = heartbeat * indiv;
        (p.glow.material as THREE.MeshBasicMaterial).opacity = 0.35 * I;
        (p.core.material as THREE.MeshBasicMaterial).opacity = 0.75 * I;
      });

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      // Dispose THREE resources
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          const mat = mesh.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => m.dispose());
          } else if (mat) {
            mat.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
