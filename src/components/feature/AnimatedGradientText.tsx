
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
  offset: number; // Represents progress from 0 to totalTravelDistance
  speed: number;
  gradientVisualLength: number;
  totalTravelDistance: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className,
  highlightColor: initialHighlightColor = 'hsl(285, 75%, 70%)', // Brighter purple
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenTextRef = useRef<HTMLHeadingElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [charsData, setCharsData] = useState<CharAnimation[]>([]);
  const [baseColor, setBaseColor] = useState<string>('rgb(255, 255, 255)');
  const [actualHighlightColor, setActualHighlightColor] = useState<string>(initialHighlightColor);

  const canvasLogicalWidthRef = useRef<number>(0);
  const canvasLogicalHeightRef = useRef<number>(0);

  const setupAndDraw = useCallback(() => {
    const canvas = canvasRef.current;
    const hiddenTextEl = hiddenTextRef.current;
    const container = containerRef.current;

    if (!canvas || !hiddenTextEl || !container) {
      console.warn('Canvas, hidden text, or container not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas context not found');
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = hiddenTextEl.getBoundingClientRect();
    
    canvasLogicalWidthRef.current = rect.width;
    canvasLogicalHeightRef.current = rect.height;

    canvas.width = canvasLogicalWidthRef.current * dpr;
    canvas.height = canvasLogicalHeightRef.current * dpr;
    canvas.style.width = `${canvasLogicalWidthRef.current}px`;
    canvas.style.height = `${canvasLogicalHeightRef.current}px`;
    ctx.scale(dpr, dpr); 
    
    const computedStyle = window.getComputedStyle(hiddenTextEl);
    const fontStyle = computedStyle.getPropertyValue('font-style');
    const fontVariant = computedStyle.getPropertyValue('font-variant');
    const fontWeight = computedStyle.getPropertyValue('font-weight');
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontFamily = computedStyle.getPropertyValue('font-family');
    const newBaseColor = computedStyle.getPropertyValue('color') || 'rgb(255, 255, 255)';
    
    setBaseColor(newBaseColor);
    setActualHighlightColor(initialHighlightColor); // Use the prop or default

    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle'; // Better for vertical centering

    const numericFontSize = parseFloat(fontSize);
    const newCharsData: CharAnimation[] = [];
    let currentX = 0;

    const textChars = Array.from(text); // Handle multi-byte characters correctly for length

    // Calculate stagger amount for continuous ripple
    const placeholderTotalTravelDistanceForStagger = (numericFontSize * 2.0) * 2; // Based on gradientVisualLength * 2
    const staggerAmount = placeholderTotalTravelDistanceForStagger / (textChars.length > 1 ? Math.min(textChars.length, 5) : 1);


    for (let i = 0; i < textChars.length; i++) {
      const char = textChars[i];
      const metrics = ctx.measureText(char);
      const charWidth = metrics.width;
      
      const charHeight = (metrics.actualBoundingBoxAscent !== undefined ? metrics.actualBoundingBoxAscent : numericFontSize * 0.75) + 
                         (metrics.actualBoundingBoxDescent !== undefined ? metrics.actualBoundingBoxDescent : numericFontSize * 0.25);
      
      const charMaxDim = Math.max(charWidth, charHeight);

      const angle = Math.random() * Math.PI * 2;
      const gradientVisualLength = charMaxDim * 2.0; // Wider gradient strip
      const totalTravelDistance = gradientVisualLength * 2; // Full sweep in and out
      const cycleDuration = Math.random() * 3 + 5; // 5-8 seconds per cycle
      const speed = totalTravelDistance / (cycleDuration * 60); // distance per frame (assuming 60fps)

      newCharsData.push({
        char,
        x: currentX,
        y: canvasLogicalHeightRef.current / 2, // Vertically center text
        width: charWidth,
        fontHeight: numericFontSize,
        angle,
        offset: (i * staggerAmount) % totalTravelDistance, // Staggered start
        speed,
        gradientVisualLength,
        totalTravelDistance,
      });
      currentX += charWidth;
    }
    setCharsData(newCharsData);
  }, [text, initialHighlightColor]);


  useEffect(() => {
    setupAndDraw(); // Initial setup

    const containerElement = containerRef.current;
    if (!containerElement) return;

    const resizeObserver = new ResizeObserver(() => {
        setupAndDraw();
    });
    resizeObserver.observe(containerElement);
    window.addEventListener('resize', setupAndDraw);


    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', setupAndDraw);
    };
  }, [setupAndDraw]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !charsData.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const computedStyle = window.getComputedStyle(hiddenTextRef.current!);
    const fontStyle = computedStyle.getPropertyValue('font-style');
    const fontVariant = computedStyle.getPropertyValue('font-variant');
    const fontWeight = computedStyle.getPropertyValue('font-weight');
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontFamily = computedStyle.getPropertyValue('font-family');
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const highlightBandWidthFraction = 0.7; // 70% of the gradient strip is highlight

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear full physical canvas

      charsData.forEach(charData => {
        charData.offset = (charData.offset + charData.speed) % charData.totalTravelDistance;
        
        // currentDrawOffset determines the center of the gradient strip relative to the character
        // It ranges from -gradientVisualLength to +gradientVisualLength
        const currentDrawOffset = charData.offset - charData.gradientVisualLength;

        const halfGVL = charData.gradientVisualLength / 2;
        
        // Calculate gradient start and end points based on angle and currentDrawOffset
        // The gradient is always centered on the character's position for its angle
        // but its color stops are shifted by currentDrawOffset
        const dx = Math.cos(charData.angle);
        const dy = Math.sin(charData.angle);

        const x1 = -halfGVL * dx + currentDrawOffset * dx;
        const y1 = -halfGVL * dy + currentDrawOffset * dy;
        const x2 = halfGVL * dx + currentDrawOffset * dx;
        const y2 = halfGVL * dy + currentDrawOffset * dy;

        const gradient = ctx.createLinearGradient(
          charData.x + charData.width / 2 + x1, // Center gradient on char, then apply angled offset
          charData.y + y1,
          charData.x + charData.width / 2 + x2,
          charData.y + y2
        );
        
        const stop1 = 0.5 - highlightBandWidthFraction / 2;
        const stop2 = 0.5;
        const stop3 = 0.5 + highlightBandWidthFraction / 2;

        gradient.addColorStop(Math.max(0, stop1 - 0.1), baseColor); // Start with base color
        gradient.addColorStop(Math.max(0, stop1), baseColor);
        gradient.addColorStop(stop2, actualHighlightColor);
        gradient.addColorStop(Math.min(1, stop3), baseColor);
        gradient.addColorStop(Math.min(1, stop3 + 0.1), baseColor); // End with base color

        ctx.fillStyle = gradient;
        ctx.fillText(charData.char, charData.x, charData.y);
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [charsData, baseColor, actualHighlightColor]);


  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <h4 ref={hiddenTextRef} style={{ margin: 0, opacity: 0, visibility: 'hidden' }} aria-hidden="true">
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

