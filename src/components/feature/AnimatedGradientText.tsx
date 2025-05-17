
"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
}

interface CharAnimation {
  char: string;
  x: number;
  y: number; 
  width: number;
  fontHeight: number;
  angle: number;
  offset: number;
  speed: number;
  gradientVisualLength: number; 
  totalTravelDistance: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className,
  highlightColor: initialHighlightColor = 'hsl(285, 75%, 70%)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenTextRef = useRef<HTMLHeadingElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [charsData, setCharsData] = useState<CharAnimation[]>([]);
  const [baseColor, setBaseColor] = useState<string>('rgb(255, 255, 255)');
  const [actualHighlightColor, setActualHighlightColor] = useState<string>(initialHighlightColor);

  // Refs to store canvas dimensions to avoid state-driven re-renders for drawing
  const canvasLogicalWidthRef = useRef<number>(0);
  const canvasLogicalHeightRef = useRef<number>(0);


  const setupAndDraw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current; // Keep for potential future use
    const hiddenTextEl = hiddenTextRef.current;

    if (!canvas || !hiddenTextEl || !container) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = hiddenTextEl.getBoundingClientRect();
    
    // Update logical dimensions directly
    canvasLogicalWidthRef.current = rect.width;
    canvasLogicalHeightRef.current = rect.height;

    // Set physical canvas size
    canvas.width = canvasLogicalWidthRef.current * dpr;
    canvas.height = canvasLogicalHeightRef.current * dpr;
    
    ctx.scale(dpr, dpr); // Scale context for high DPI
    
    const computedStyle = window.getComputedStyle(hiddenTextEl);
    const fontStyle = computedStyle.getPropertyValue('font-style');
    const fontVariant = computedStyle.getPropertyValue('font-variant');
    const fontWeight = computedStyle.getPropertyValue('font-weight');
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontFamily = computedStyle.getPropertyValue('font-family');
    const newBaseColor = computedStyle.getPropertyValue('color') || 'rgb(255, 255, 255)';
    
    setBaseColor(newBaseColor); // State update for base color
    setActualHighlightColor(initialHighlightColor); // State update for highlight color

    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const numericFontSize = parseFloat(fontSize);
    const newCharsData: CharAnimation[] = [];
    let currentX = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const metrics = ctx.measureText(char);
      const charWidth = metrics.width;
      
      const charHeight = (metrics.actualBoundingBoxAscent !== undefined ? metrics.actualBoundingBoxAscent : numericFontSize * 0.75) + 
                         (metrics.actualBoundingBoxDescent !== undefined ? metrics.actualBoundingBoxDescent : numericFontSize * 0.25);

      const angle = Math.random() * Math.PI * 2;
      // Adjust gradientVisualLength and totalTravelDistance for better highlight visibility
      const gradientVisualLength = Math.max(charWidth, charHeight) * 1.2; // Make gradient strip shorter
      const totalTravelDistance = gradientVisualLength * 2; // Offset will travel from -L to L
      const cycleDuration = Math.random() * 2 + 3; // 3-5 seconds
      const speed = totalTravelDistance / (cycleDuration * 60);

      newCharsData.push({
        char,
        x: currentX,
        y: canvasLogicalHeightRef.current / 2,
        width: charWidth,
        fontHeight: charHeight,
        angle,
        offset: Math.random() * totalTravelDistance - gradientVisualLength,
        speed,
        gradientVisualLength,
        totalTravelDistance,
      });
      currentX += charWidth;
    }
    setCharsData(newCharsData); // This state update will trigger the drawing useEffect

  }, [text, initialHighlightColor]); // Dependencies of setupAndDraw


  useEffect(() => {
    // Initial setup call
    setupAndDraw();
    
    const containerEl = containerRef.current;
    const hiddenTextEl = hiddenTextRef.current;
    if (!containerEl || !hiddenTextEl) return;

    // Observe container for resizes that might affect hiddenTextEl's layout
    const resizeObserver = new ResizeObserver(() => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current); // Cancel old animation frame
      }
      setupAndDraw(); // Re-initialize character data and canvas size
    });

    // Observe the hidden text element itself for changes, as its size dictates canvas size
    resizeObserver.observe(hiddenTextEl);
    // Also observe the main container in case its size changes (e.g. due to parent flex/grid)
    resizeObserver.observe(containerEl);


    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupAndDraw]); // Re-run setup if the setup function itself changes (due to text/highlightColor props)


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || charsData.length === 0 || canvasLogicalWidthRef.current === 0 || canvasLogicalHeightRef.current === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Font settings might need to be re-applied if context was reset (e.g. canvas resized)
    // This is handled by setupAndDraw re-running on resize.

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      // Physical canvas dimensions
      const physicalCanvasWidth = canvasLogicalWidthRef.current * dpr;
      const physicalCanvasHeight = canvasLogicalHeightRef.current * dpr;

      // Ensure canvas physical size is up-to-date
      if (canvas.width !== physicalCanvasWidth || canvas.height !== physicalCanvasHeight) {
        // This should ideally be caught by ResizeObserver calling setupAndDraw,
        // but as a fallback, if draw detects mismatch, it might indicate a problem.
        // For now, we assume setupAndDraw handles canvas resizing.
        console.warn("Canvas dimensions mismatch in draw loop. ResizeObserver might not be working as expected.");
      }
      
      // Clear using physical dimensions
      ctx.clearRect(0, 0, physicalCanvasWidth, physicalCanvasHeight); 

      // The context is already scaled by DPR from setupAndDraw, so drawing operations use logical pixels
      // Re-apply font if it was lost during a potential canvas internal reset (though less likely with current setup)
      const hiddenTextEl = hiddenTextRef.current;
       if (hiddenTextEl) {
           const computedStyle = window.getComputedStyle(hiddenTextEl);
           ctx.font = `${computedStyle.getPropertyValue('font-style')} ${computedStyle.getPropertyValue('font-variant')} ${computedStyle.getPropertyValue('font-weight')} ${computedStyle.getPropertyValue('font-size')} ${computedStyle.getPropertyValue('font-family')}`;
           ctx.textAlign = 'left';
           ctx.textBaseline = 'middle';
        }


      const highlightBandWidthFraction = 0.35; // Make highlight band wider

      charsData.forEach(charData => {
        charData.offset += charData.speed;
        // Simpler reset for smoother looping
        if (charData.offset > charData.gradientVisualLength) {
          charData.offset = -charData.gradientVisualLength; 
          charData.angle = Math.random() * Math.PI * 2; // Re-randomize angle for next cycle
          // Speed remains same for consistent cycle duration
        }

        const cosA = Math.cos(charData.angle);
        const sinA = Math.sin(charData.angle);
        
        // Gradient points are relative to the character's drawing position (charData.x, charData.y)
        // The gradient is applied in the canvas's current coordinate space.
        // So, if text is at (charData.x, charData.y), the gradient should be defined around that.
        const gradX0 = charData.x + (charData.offset - charData.gradientVisualLength / 2) * cosA;
        const gradY0 = charData.y + (charData.offset - charData.gradientVisualLength / 2) * sinA;
        const gradX1 = charData.x + (charData.offset + charData.gradientVisualLength / 2) * cosA;
        const gradY1 = charData.y + (charData.offset + charData.gradientVisualLength / 2) * sinA;
        
        const gradient = ctx.createLinearGradient(gradX0, gradY0, gradX1, gradY1);

        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(Math.max(0, 0.5 - highlightBandWidthFraction / 2), baseColor);
        gradient.addColorStop(0.5, actualHighlightColor);
        gradient.addColorStop(Math.min(1, 0.5 + highlightBandWidthFraction / 2), baseColor);
        gradient.addColorStop(1, baseColor);

        ctx.fillStyle = gradient;
        ctx.fillText(charData.char, charData.x, charData.y);
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Start animation
    // Cancel any existing animation frame before starting a new one
    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [charsData, baseColor, actualHighlightColor]); // Re-run animation loop if these change

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-text-container ${className || ''}`}
      style={{
        position: 'relative',
        display: 'inline-block', // Ensures container fits text
        verticalAlign: 'bottom', // Or 'baseline', 'middle' depending on desired alignment with surrounding text
      }}
    >
      {/* Hidden h4 for accessibility and layout measurement */}
      <h4
        ref={hiddenTextRef}
        aria-hidden="true"
        style={{
          margin: 0,
          padding: 0,
          border: 'none',
          opacity: 0, // Hidden visually but present for layout and screen readers
          visibility: 'hidden', // Further ensures it doesn't interfere visually, but getBoundingClientRect works
          whiteSpace: 'nowrap', // Keep text on one line for accurate width measurement
          display: 'inline-block', // So its bounds are tight around the text
          lineHeight: 'normal',
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
          width: '100%', // CSS width/height for responsive scaling of canvas drawing surface
          height: '100%',
          // opacity: 1, // Default, not needed unless changing
        }}
      />
    </div>
  );
};

export default AnimatedGradientText;

