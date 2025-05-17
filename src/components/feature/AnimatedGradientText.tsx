
"use client";

import React, { useEffect, useRef } from 'react';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className,
  highlightColor = '#4d99f2', // Default highlight color
}) => {
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

    let baseColor = 'rgb(255, 255, 255)'; // Default base color (white)

    const resizeCanvasAndDraw = () => {
      if (!ctx || !canvas || !container || !hiddenTextEl) return;

      // Set canvas dimensions based on the container (which is sized by the hidden h4)
      // Use devicePixelRatio for sharper rendering on high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr); // Scale context to match CSS pixels

      // Get font properties from the hidden h4
      const computedStyle = window.getComputedStyle(hiddenTextEl);
      const fontStyle = computedStyle.getPropertyValue('font-style');
      const fontVariant = computedStyle.getPropertyValue('font-variant');
      const fontWeight = computedStyle.getPropertyValue('font-weight');
      const fontSize = computedStyle.getPropertyValue('font-size');
      const fontFamily = computedStyle.getPropertyValue('font-family');
      
      baseColor = computedStyle.getPropertyValue('color'); // Get base text color

      ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      draw(); // Redraw with new dimensions/font
    };
    
    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio||1) , canvas.height/ (window.devicePixelRatio||1));


      // Create gradient relative to canvas's unscaled width for CSS pixels
      const canvasCssWidth = canvas.width / (window.devicePixelRatio || 1);
      const gradientXStart = -canvasCssWidth + offset;
      const gradientXEnd = canvasCssWidth + offset;
      
      const gradient = ctx.createLinearGradient(gradientXStart, 0, gradientXEnd, 0);
      
      // Text is always visible in baseColor, highlightColor sweeps across
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.4, baseColor);       // Start of highlight area
      gradient.addColorStop(0.5, highlightColor);  // Peak of highlight
      gradient.addColorStop(0.6, baseColor);       // End of highlight area
      gradient.addColorStop(1, baseColor);

      // Apply gradient and draw text
      ctx.fillStyle = gradient;
      
      const yPos = (canvas.height / (window.devicePixelRatio || 1)) / 2;
      const xPos = (canvas.width / (window.devicePixelRatio || 1)) / 2;
      ctx.fillText(text, xPos, yPos);

      // Animate offset
      offset += speed;
      if (offset >= canvasCssWidth * 2) { 
        offset = 0;
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Initial setup
    resizeCanvasAndDraw(); 

    // Handle resize using ResizeObserver for better accuracy
    const observer = new ResizeObserver(resizeCanvasAndDraw);
    observer.observe(container);
    
    // Fallback for window resize if ResizeObserver is not fully supported or for font loading changes
    window.addEventListener('resize', resizeCanvasAndDraw);
    // Also consider font loading, but it's complex. For now, resize handles most cases.

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvasAndDraw);
      observer.unobserve(container);
      observer.disconnect();
    };
  }, [text, highlightColor, className]); // Rerun effect if text, highlightColor or className changes

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-text-container ${className || ''}`}
      style={{ position: 'relative', display: 'inline-block' /* Ensures container fits text */ }}
    >
      <h4
        ref={hiddenTextRef}
        aria-hidden="true"
        style={{
          margin: 0,
          padding: 0,
          border: 'none',
          opacity: 0,
          visibility: 'hidden',
          whiteSpace: 'nowrap', // Prevent wrapping that might affect measurement
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
