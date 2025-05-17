
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
  highlightColor: initialHighlightColor = 'hsl(285, 75%, 70%)', // Updated default highlight
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenTextRef = useRef<HTMLHeadingElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [charsData, setCharsData] = useState<CharAnimation[]>([]);
  const [baseColor, setBaseColor] = useState<string>('rgb(255, 255, 255)');
  const [actualHighlightColor, setActualHighlightColor] = useState<string>(initialHighlightColor);

  // Refs to store canvas logical dimensions to avoid state-driven re-renders for setup
  const canvasLogicalWidthRef = useRef<number>(0);
  const canvasLogicalHeightRef = useRef<number>(0);


  const setupAndDraw = useCallback(() => {
    const canvas = canvasRef.current;
    const hiddenTextEl = hiddenTextRef.current;
    const container = containerRef.current;

    if (!canvas || !hiddenTextEl || !container) {
      console.warn("Canvas, hiddenTextEl, or container not ready for setup.");
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D context from canvas.");
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = hiddenTextEl.getBoundingClientRect();
    
    canvasLogicalWidthRef.current = rect.width;
    canvasLogicalHeightRef.current = rect.height;

    // Set physical canvas size
    canvas.width = canvasLogicalWidthRef.current * dpr;
    canvas.height = canvasLogicalHeightRef.current * dpr;
    
    // Scale context for logical pixel operations
    ctx.scale(dpr, dpr); 
    
    const computedStyle = window.getComputedStyle(hiddenTextEl);
    const fontStyle = computedStyle.getPropertyValue('font-style');
    const fontVariant = computedStyle.getPropertyValue('font-variant');
    const fontWeight = computedStyle.getPropertyValue('font-weight');
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontFamily = computedStyle.getPropertyValue('font-family');
    const newBaseColor = computedStyle.getPropertyValue('color') || 'rgb(255, 255, 255)';
    
    setBaseColor(newBaseColor);
    setActualHighlightColor(initialHighlightColor); // Use prop or updated default

    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle'; // Align text to the middle of its line height

    const numericFontSize = parseFloat(fontSize);
    const newCharsData: CharAnimation[] = [];
    let currentX = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const metrics = ctx.measureText(char);
      const charWidth = metrics.width;
      
      // Estimate character height based on font metrics or font size
      const charHeight = (metrics.actualBoundingBoxAscent !== undefined ? metrics.actualBoundingBoxAscent : numericFontSize * 0.75) + 
                         (metrics.actualBoundingBoxDescent !== undefined ? metrics.actualBoundingBoxDescent : numericFontSize * 0.25);

      const angle = Math.random() * Math.PI * 2; // Random angle for gradient direction
      const gradientVisualLength = Math.max(charWidth, charHeight) * 2.0; // Length of the gradient strip
      const totalTravelDistance = gradientVisualLength * 2; // Full travel for a cycle (out and back in perception)
      
      const cycleDuration = Math.random() * 3 + 5; // Slower: 5-8 seconds per cycle
      const speed = totalTravelDistance / (cycleDuration * 60); // 60 FPS assumption

      newCharsData.push({
        char,
        x: currentX,
        y: canvasLogicalHeightRef.current / 2, // Center vertically
        width: charWidth,
        fontHeight: charHeight,
        angle,
        offset: Math.random() * totalTravelDistance - gradientVisualLength, // Start at a random point in cycle
        speed,
        gradientVisualLength,
        totalTravelDistance,
      });
      currentX += charWidth;
    }
    setCharsData(newCharsData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, initialHighlightColor]); // Dependencies that trigger re-setup


  useEffect(() => {
    setupAndDraw(); // Initial setup
    
    const containerEl = containerRef.current;
    const hiddenTextEl = hiddenTextRef.current;
    if (!containerEl || !hiddenTextEl) return;

    // Observe resizes of the hidden text element to re-calculate layout
    const resizeObserver = new ResizeObserver(() => {
      // console.log("ResizeObserver triggered setupAndDraw");
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setupAndDraw();
    });

    resizeObserver.observe(hiddenTextEl);
    resizeObserver.observe(containerEl); // Also observe container in case its size affects hiddenTextEl

    // Fallback for window resize (less precise but good for overall page changes)
    const handleResize = () => {
      // console.log("Window resize triggered setupAndDraw");
       if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setupAndDraw();
    };
    window.addEventListener('resize', handleResize);


    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // Only re-run setup if text or highlightColor prop changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupAndDraw]); // setupAndDraw is memoized by useCallback


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || charsData.length === 0 || canvasLogicalWidthRef.current === 0 || canvasLogicalHeightRef.current === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      // Ensure canvas physical dimensions match logical dimensions * DPR
      // This check is important if ResizeObserver is somehow delayed or doesn't fire
      const expectedPhysicalWidth = canvasLogicalWidthRef.current * dpr;
      const expectedPhysicalHeight = canvasLogicalHeightRef.current * dpr;

      if (canvas.width !== expectedPhysicalWidth || canvas.height !== expectedPhysicalHeight) {
         // console.warn("Canvas dimensions mismatch in draw loop. Forcing resize.");
         // This could happen if parent resizes without triggering observer in time
         // Forcing a resize here can be risky if it leads to loops, but can fix visual glitches.
         // A better approach is to ensure ResizeObserver reliably updates logicalWidth/Height refs.
         // For now, we proceed with current dimensions, ResizeObserver should eventually correct.
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Use physical dimensions for clearing

      // Re-apply font style in case it was lost (though usually persistent)
       const hiddenTextEl = hiddenTextRef.current;
       if (hiddenTextEl) {
           const computedStyle = window.getComputedStyle(hiddenTextEl);
           ctx.font = `${computedStyle.getPropertyValue('font-style')} ${computedStyle.getPropertyValue('font-variant')} ${computedStyle.getPropertyValue('font-weight')} ${computedStyle.getPropertyValue('font-size')} ${computedStyle.getPropertyValue('font-family')}`;
           ctx.textAlign = 'left';
           ctx.textBaseline = 'middle';
        }

      const highlightBandWidthFraction = 0.7; // Wider highlight band (70% of gradientVisualLength)

      charsData.forEach(charData => {
        // Update offset for animation
        charData.offset += charData.speed;
        // Loop the animation
        if (charData.offset > charData.gradientVisualLength) {
          charData.offset = -charData.gradientVisualLength; // Reset to start from the other side
          // Optionally re-randomize angle for more variety on loop, but can be jarring
          // charData.angle = Math.random() * Math.PI * 2; 
        }

        const cosA = Math.cos(charData.angle);
        const sinA = Math.sin(charData.angle);
        
        // Calculate gradient start/end points based on character position, angle, and offset
        const gradX0 = charData.x + (charData.offset - charData.gradientVisualLength / 2) * cosA;
        const gradY0 = charData.y + (charData.offset - charData.gradientVisualLength / 2) * sinA;
        const gradX1 = charData.x + (charData.offset + charData.gradientVisualLength / 2) * cosA;
        const gradY1 = charData.y + (charData.offset + charData.gradientVisualLength / 2) * sinA;
        
        const gradient = ctx.createLinearGradient(gradX0, gradY0, gradX1, gradY1);

        // Define color stops for the gradient (base -> highlight -> base)
        // The highlight band is in the middle of the gradientVisualLength
        gradient.addColorStop(0, baseColor); // Start with base color
        gradient.addColorStop(Math.max(0, 0.5 - highlightBandWidthFraction / 2), baseColor); // Edge of highlight
        gradient.addColorStop(0.5, actualHighlightColor); // Center of highlight
        gradient.addColorStop(Math.min(1, 0.5 + highlightBandWidthFraction / 2), baseColor); // Other edge of highlight
        gradient.addColorStop(1, baseColor); // End with base color

        ctx.fillStyle = gradient;
        ctx.fillText(charData.char, charData.x, charData.y);
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Cancel previous animation frame before starting a new one
    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [charsData, baseColor, actualHighlightColor]); // Redraw if these change

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-text-container ${className || ''}`}
      style={{
        position: 'relative', // For canvas positioning
        display: 'inline-block', // Or 'block' if it should take full width
        verticalAlign: 'bottom', // Helps align with adjacent text
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
          opacity: 0, // Visually hidden but present for layout
          visibility: 'hidden', // Further ensures it's not interactable if opacity fails
          whiteSpace: 'nowrap', // Prevent text wrapping
          display: 'inline-block', // Match display of container
          lineHeight: 'normal', // Avoid unusual line height issues
        }}
      >
        {text}
      </h4>
      {/* Canvas for visual rendering */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', // Stretch to fill container
          height: '100%',
          // opacity: 1, // Default, not strictly needed unless overriding
        }}
      />
    </div>
  );
};

export default AnimatedGradientText;

