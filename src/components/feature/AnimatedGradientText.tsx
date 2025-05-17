
"use client";

import React, { useEffect, useRef } from 'react';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  highlightColor?: string; // Make this optional
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className,
  highlightColor = '#4d99f2', // Default highlight color if not provided
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
    let baseColor = 'rgb(255, 255, 255)'; // Default base color

    const resizeCanvasAndDraw = () => {
      if (!ctx || !canvas || !container || !hiddenTextEl) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr); // Scale context to match CSS pixels

      const computedStyle = window.getComputedStyle(hiddenTextEl);
      const fontStyle = computedStyle.getPropertyValue('font-style');
      const fontVariant = computedStyle.getPropertyValue('font-variant');
      const fontWeight = computedStyle.getPropertyValue('font-weight');
      const fontSize = computedStyle.getPropertyValue('font-size');
      const fontFamily = computedStyle.getPropertyValue('font-family');
      
      // Determine baseColor from the computed style of the hidden text element
      baseColor = computedStyle.getPropertyValue('color') || 'rgb(255, 255, 255)';


      ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      draw();
    };
    
    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear the canvas using its actual width and height (physical pixels)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasCssWidth = canvas.width / (window.devicePixelRatio || 1);
      
      // Adjust gradient calculation if needed, ensure it covers the text area
      const gradientXStart = -canvasCssWidth + offset; // Start further left
      const gradientXEnd = canvasCssWidth + offset;   // End further right
      
      const gradient = ctx.createLinearGradient(gradientXStart, 0, gradientXEnd, 0);
      
      // Gradient: baseColor -> highlightColor -> baseColor
      // This ensures text is always visible in its base color.
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.45, baseColor); // Start of highlight area
      gradient.addColorStop(0.5, highlightColor);  // Peak of highlight
      gradient.addColorStop(0.55, baseColor); // End of highlight area
      gradient.addColorStop(1, baseColor);

      ctx.fillStyle = gradient;
      
      // Draw text centered on the canvas (using CSS pixel dimensions for positioning)
      const xPos = canvasCssWidth / 2;
      const yPos = canvas.height / (window.devicePixelRatio || 1) / 2;
      ctx.fillText(text, xPos, yPos);

      offset += speed;
      // Ensure offset reset condition handles the extended gradient width
      if (offset >= canvasCssWidth * 2) { 
        offset = 0;
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    resizeCanvasAndDraw(); 

    const observer = new ResizeObserver(resizeCanvasAndDraw);
    if (container) {
      observer.observe(container);
    }
    
    window.addEventListener('resize', resizeCanvasAndDraw);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvasAndDraw);
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, [text, highlightColor, className]);

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-text-container ${className || ''}`}
      style={{ 
        position: 'relative', 
        display: 'inline-block', // Or 'block' depending on desired layout behavior
        verticalAlign: 'bottom', // Helps align with surrounding text if inline-block
      }}
    >
      <h4
        ref={hiddenTextRef}
        aria-hidden="true"
        style={{
          margin: 0,
          padding: 0,
          border: 'none',
          opacity: 0,
          visibility: 'hidden', // Ensures it doesn't render but takes up space
          whiteSpace: 'nowrap', 
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
          opacity: 1, // Canvas itself is fully opaque, its content has transparency
        }}
      />
    </div>
  );
};

export default AnimatedGradientText;
