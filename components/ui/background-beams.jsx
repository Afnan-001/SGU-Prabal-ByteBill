"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function BackgroundBeams({ className, ...props }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // Beams
    const beams = [];
    const beamGeometry = new THREE.BoxGeometry(0.1, 0.1, 2);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x5b21b6,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < 20; i++) {
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.x = (Math.random() - 0.5) * 10;
      beam.position.y = (Math.random() - 0.5) * 10;
      beam.position.z = (Math.random() - 0.5) * 10;
      beam.rotation.x = Math.random() * Math.PI;
      beam.rotation.y = Math.random() * Math.PI;
      beams.push(beam);
      scene.add(beam);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      beams.forEach((beam) => {
        beam.rotation.x += 0.005;
        beam.rotation.y += 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none -z-10 ${className}`}
      {...props}
    />
  );
}