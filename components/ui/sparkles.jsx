"use client";

import React, { useEffect, useRef } from "react";

export const SparklesCore = ({
  id,
  className = "",
  particleColor = "#FFFFFF",
  background = "transparent",
  minSize = 1,
  maxSize = 2.5,
  particleDensity = 80,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId;
    const particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      const numberOfParticles = (canvas.width * canvas.height) / (10000 / particleDensity);
      particles.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: minSize + Math.random() * (maxSize - minSize),
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random(),
        });
      }
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = particleColor;
        context.globalAlpha = p.opacity;
        context.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [background, particleColor, minSize, maxSize, particleDensity]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};
