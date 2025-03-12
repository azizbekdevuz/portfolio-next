"use client";

import { useRef, useState, useEffect } from "react";

type Line = {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
};

export const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); //eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      setDimensions({ width: canvas.width, height: canvas.height });
    };

    const lines: Line[] = [];
    const createLine = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 50 + 20,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.1,
    });

    for (let i = 0; i < 50; i++) {
      lines.push(createLine());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 16, 31, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.strokeStyle = "rgba(20, 157, 221, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length,
        );
        ctx.stroke();

        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (
          line.x < -line.length ||
          line.x > canvas.width + line.length ||
          line.y < -line.length ||
          line.y > canvas.height + line.length
        ) {
          Object.assign(line, createLine());
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.2 }}
    />
  );
};
