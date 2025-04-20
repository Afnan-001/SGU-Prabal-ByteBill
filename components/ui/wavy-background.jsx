"use client";

import React, { useEffect, useRef } from "react";

export const WavyBackground = ({
  colors = ["#6366F1", "#8B5CF6", "#EC4899"],
  waveOpacity = 0.5,
  speed=5,
  className = "",
  ...props
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;
    let waves = [];
    let waveCount = 3;

    // Initialize waves with slower, smoother parameters
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: height * 0.5,
        length: Math.random() * 1000 + 1000, // Longer waves
        amplitude: Math.random() * 80 + 40, // Smaller amplitude
        frequency: Math.random() * 0.002 + 0.001, // Slower frequency
        phase: Math.random() * Math.PI * 2,
        color: colors[i % colors.length]
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      waves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x < width; x++) {
          const y = wave.y + 
                   Math.sin(x * wave.frequency + time * 0.05 + wave.phase) * // Slower time multiplier
                   wave.amplitude * 
                   Math.sin(time * 0.0005); // Slower undulation
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = waveOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      time += 1;
      requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [colors, waveOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      {...props}
    />
  );
};