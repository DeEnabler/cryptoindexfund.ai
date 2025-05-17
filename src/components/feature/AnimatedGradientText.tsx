
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

  const canvasLogicalWidthRef = useRef<number>(0);
  const canvasLogicalHeightRef = useRef<number>(0);


  const setupAndDraw = useCallback(() => {
    const canvas = canvasRef.current;
    const hiddenTextEl = hiddenTextRef.current;
    const container = containerRef.current;

    if (!canvas || !hiddenTextEl || !container) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = hiddenTextEl.getBoundingClientRect();
    
    canvasLogicalWidthRef.current = rect.width;
    canvasLogicalHeightRef.current = rect.height;

    canvas.width = canvasLogicalWidthRef.current * dpr;
    canvas.height = canvasLogicalHeightRef.current * dpr;
    
    ctx.scale(dpr, dpr); 
    
    const computedStyle = window.getComputedStyle(hiddenTextEl);
    const fontStyle = computedStyle.getPropertyValue('font-style');
    const fontVariant = computedStyle.getPropertyValue('font-variant');
    const fontWeight = computedStyle.getPropertyValue('font-weight');
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontFamily = computedStyle.getPropertyValue('font-family');
    const newBaseColor = computedStyle.getPropertyValue('color') || 'rgb(255, 255, 255)';
    
    setBaseColor(newBaseColor);
    setActualHighlightColor(initialHighlightColor);

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
      const gradientVisualLength = Math.max(charWidth, charHeight) * 2.0; // Increased for longer gradient
      const totalTravelDistance = gradientVisualLength * 2; 
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
    setCharsData(newCharsData);

  }, [text, initialHighlightColor]);


  useEffect(() => {
    setupAndDraw();
    
    const containerEl = containerRef.current;
    const hiddenTextEl = hiddenTextRef.current;
    if (!containerEl || !hiddenTextEl) return;

    const resizeObserver = new ResizeObserver(() => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setupAndDraw();
    });

    resizeObserver.observe(hiddenTextEl);
    resizeObserver.observe(containerEl);


    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupAndDraw]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || charsData.length === 0 || canvasLogicalWidthRef.current === 0 || canvasLogicalHeightRef.current === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const physicalCanvasWidth = canvasLogicalWidthRef.current * dpr;
      const physicalCanvasHeight = canvasLogicalHeightRef.current * dpr;

      if (canvas.width !== physicalCanvasWidth || canvas.height !== physicalCanvasHeight) {
        // This case should ideally be handled by the ResizeObserver,
        // but added a log if it occurs during the draw loop.
        // console.warn("Canvas dimensions mismatch in draw loop. ResizeObserver might not be working as expected.");
        // Potentially could call setupAndDraw here, but it might lead to loops if not careful.
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Use physical dimensions for clearing

      const hiddenTextEl = hiddenTextRef.current;
       if (hiddenTextEl) {
           const computedStyle = window.getComputedStyle(hiddenTextEl);
           ctx.font = `${computedStyle.getPropertyValue('font-style')} ${computedStyle.getPropertyValue('font-variant')} ${computedStyle.getPropertyValue('font-weight')} ${computedStyle.getPropertyValue('font-size')} ${computedStyle.getPropertyValue('font-family')}`;
           ctx.textAlign = 'left';
           ctx.textBaseline = 'middle';
        }

      const highlightBandWidthFraction = 0.5; // Increased for wider gradient lines

      charsData.forEach(charData => {
        charData.offset += charData.speed;
        if (charData.offset > charData.gradientVisualLength) {
          charData.offset = -charData.gradientVisualLength; 
          charData.angle = Math.random() * Math.PI * 2;
        }

        const cosA = Math.cos(charData.angle);
        const sinA = Math.sin(charData.angle);
        
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

    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [charsData, baseColor, actualHighlightColor]);

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-text-container ${className || ''}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'bottom', 
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
          visibility: 'hidden', 
          whiteSpace: 'nowrap', 
          display: 'inline-block', 
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
          width: '100%', 
          height: '100%',
        }}
      />
    </div>
  );
};

export default AnimatedGradientText;
