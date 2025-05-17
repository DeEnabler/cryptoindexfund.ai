
"use client";

import React, { useEffect, useRef } from 'react';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenTextRef = useRef<HTMLHeadingElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const hiddenTextEl = hiddenTextRef.current;

    if (!canvas || !container || !hiddenTextEl) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let offset = 0;
    const speed = 1; // Adjust for speed of gradient movement

    const resizeCanvas = () => {
      // Set canvas dimensions based on the container (which is sized by the hidden h4)
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    const draw = () => {
      if (!ctx || !canvas) return;

      // Get font properties from the hidden h4
      const computedStyle = window.getComputedStyle(hiddenTextEl);
      const fontStyle = computedStyle.getPropertyValue('font-style');
      const fontVariant = computedStyle.getPropertyValue('font-variant');
      const fontWeight = computedStyle.getPropertyValue('font-weight');
      const fontSize = computedStyle.getPropertyValue('font-size');
      const fontFamily = computedStyle.getPropertyValue('font-family');
      const lineHeight = computedStyle.getPropertyValue('line-height');

      ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradientXStart = -canvas.width + offset;
      const gradientXEnd = canvas.width + offset;
      
      const gradient = ctx.createLinearGradient(gradientXStart, 0, gradientXEnd, 0);
      gradient.addColorStop(0, 'rgba(0,0,0,0)'); // Transparent
      gradient.addColorStop(0.45, 'rgba(0,0,0,0)'); // Transparent leading up to color
      gradient.addColorStop(0.5, '#4d99f2'); // Highlight color
      gradient.addColorStop(0.55, 'rgba(0,0,0,0)'); // Transparent after color
      gradient.addColorStop(1, 'rgba(0,0,0,0)'); // Transparent

      // Apply gradient and draw text
      ctx.fillStyle = gradient;
      
      // Calculate Y position to better center text vertically considering line height
      // Using canvas.height / 2 might not be perfect for all fonts/line-heights
      // For 'middle' baseline, h/2 is a good start.
      const yPos = canvas.height / 2;

      ctx.fillText(text, canvas.width / 2, yPos);

      // Animate offset
      offset += speed;
      if (offset >= canvas.width * 2) { // Loop the gradient movement
        offset = 0;
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    resizeCanvas(); // Initial resize
    draw(); // Start animation

    // Handle resize
    const observer = new ResizeObserver(resizeCanvas);
    if (container) {
      observer.observe(container);
    }
    
    window.addEventListener('resize', resizeCanvas);


    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-text-container ${className || ''}`}
      style={{ position: 'relative', color: '#4d99f2' /* Hint color, canvas will render actual */ }}
    >
      <h4
        ref={hiddenTextRef}
        aria-hidden="true"
        style={{
          margin: 0,
          padding: 0, // Ensure no extra padding affects measurement
          border: 'none', // Ensure no border affects measurement
          opacity: 0,
          visibility: 'hidden', // Better for layout measurement than just opacity: 0
          // Inherit font styles from the container's className
        }}
      >
        {text}
      </h4>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 1,
        }}
      />
    </div>
  );
};

export default AnimatedGradientText;
