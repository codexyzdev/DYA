import React, { useEffect, useRef } from 'react';
import {
  createCelebrationParticles,
  type CelebrationParticle,
} from '../utils/invitationLogic';

interface CelebrationBurstProps {
  triggerKey: number;
  origin?: { x: number; y: number } | null;
}

export const CelebrationBurst: React.FC<CelebrationBurstProps> = ({
  triggerKey,
  origin,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (triggerKey <= 0) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const originX = origin?.x ?? width / 2;
    const originY = origin?.y ?? height * 0.65;

    const particles: CelebrationParticle[] = createCelebrationParticles(
      56,
      originX,
      originY,
    );

    let rafId = 0;
    let tick = 0;

    const drawHeart = (size: number) => {
      const s = size * 0.55;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.45);
      ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.9, -s * 1.15, 0, -s * 0.45);
      ctx.bezierCurveTo(s * 0.9, -s * 1.15, s, -s * 0.3, 0, s * 0.45);
      ctx.closePath();
      ctx.fill();
    };

    const drawPetal = (size: number) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.65, size * 0.34, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSparkle = (size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.2);
      ctx.quadraticCurveTo(size * 0.25, -size * 0.25, size * 1.2, 0);
      ctx.quadraticCurveTo(size * 0.25, size * 0.25, 0, size * 1.2);
      ctx.quadraticCurveTo(-size * 0.25, size * 0.25, -size * 1.2, 0);
      ctx.quadraticCurveTo(-size * 0.25, -size * 0.25, 0, -size * 1.2);
      ctx.closePath();
      ctx.fill();
    };

    const renderFrame = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;
      for (const p of particles) {
        p.vy += 0.12; // Gentle gravity
        p.vx *= 0.985;
        p.x += p.vx + Math.sin(tick * 0.08 + p.swayPhase) * 0.45;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.opacity -= 0.0085;

        if (p.opacity <= 0.02 || p.y > height + 30) {
          continue;
        }
        aliveCount += 1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.kind === 'heart') {
          drawHeart(p.size);
        } else if (p.kind === 'sparkle') {
          drawSparkle(p.size);
        } else {
          drawPetal(p.size);
        }
        ctx.restore();
      }

      if (aliveCount > 0) {
        rafId = window.requestAnimationFrame(renderFrame);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [triggerKey, origin]);

  if (triggerKey <= 0) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="celebration-burst-canvas"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
};
