
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
    setActualHighlightColor(initialHighlightColor);

    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const numericFontSize = parseFloat(fontSize);
    const newCharsData: CharAnimation[] = [];
    let currentX = 0;

    const textChars = Array.from(text);

    const placeholderCharMaxDimForStagger = numericFontSize; // Approximate, good enough for stagger calc
    const placeholderGradientVisualLengthForStagger = placeholderCharMaxDimForStagger * 2.0;
    const placeholderTotalTravelDistanceForStagger = placeholderGradientVisualLengthForStagger * 2;
    
    const staggerDenominator = textChars.length > 1 ? textChars.length : 1;
    const staggerAmount = placeholderTotalTravelDistanceForStagger / staggerDenominator;


    for (let i = 0; i < textChars.length; i++) {
      const char = textChars[i];
      const metrics = ctx.measureText(char);
      const charWidth = metrics.width;
      
      const charHeight = (metrics.actualBoundingBoxAscent !== undefined ? metrics.actualBoundingBoxAscent : numericFontSize * 0.75) + 
                         (metrics.actualBoundingBoxDescent !== undefined ? metrics.actualBoundingBoxDescent : numericFontSize * 0.25);
      
      const charMaxDim = Math.max(charWidth, charHeight);

      const angle = Math.random() * Math.PI * 2;
      const gradientVisualLength = charMaxDim * 2.0; 
      const totalTravelDistance = gradientVisualLength * 2; 
      const cycleDuration = Math.random() * 3 + 5; // 5-8 seconds per cycle
      const speed = totalTravelDistance / (cycleDuration * 60);

      newCharsData.push({
        char,
        x: currentX,
        y: canvasLogicalHeightRef.current / 2,
        width: charWidth,
        fontHeight: numericFontSize,
        angle,
        offset: (i * staggerAmount) % totalTravelDistance,
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

    const computedStyle = hiddenTextRef.current ? window.getComputedStyle(hiddenTextRef.current) : null;
    if (!computedStyle) return;

    const fontStyle = computedStyle.getPropertyValue('font-style');
    const fontVariant = computedStyle.getPropertyValue('font-variant');
    const fontWeight = computedStyle.getPropertyValue('font-weight');
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontFamily = computedStyle.getPropertyValue('font-family');
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const highlightBandWidthFraction = 0.9; // Increased from 0.7 to 0.9

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      charsData.forEach(charData => {
        charData.offset = (charData.offset + charData.speed);
        if (charData.offset >= charData.totalTravelDistance) {
            charData.offset %= charData.totalTravelDistance;
        }
        
        const currentDrawOffset = charData.offset - charData.gradientVisualLength;
        const halfGVL = charData.gradientVisualLength / 2;
        
        const dx = Math.cos(charData.angle);
        const dy = Math.sin(charData.angle);

        const x1 = -halfGVL * dx + currentDrawOffset * dx;
        const y1 = -halfGVL * dy + currentDrawOffset * dy;
        const x2 = halfGVL * dx + currentDrawOffset * dx;
        const y2 = halfGVL * dy + currentDrawOffset * dy;

        const gradient = ctx.createLinearGradient(
          charData.x + charData.width / 2 + x1,
          charData.y + y1,
          charData.x + charData.width / 2 + x2,
          charData.y + y2
        );
        
        const stop1 = 0.5 - highlightBandWidthFraction / 2;
        const stop2 = 0.5;
        const stop3 = 0.5 + highlightBandWidthFraction / 2;

        gradient.addColorStop(Math.max(0, stop1 - 0.05), baseColor); 
        gradient.addColorStop(Math.max(0, stop1), baseColor);
        gradient.addColorStop(stop2, actualHighlightColor);
        gradient.addColorStop(Math.min(1, stop3), baseColor);
        gradient.addColorStop(Math.min(1, stop3 + 0.05), baseColor);

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
    <div ref={containerRef} className={className} style={{ position: 'relative', display: 'inline-block', verticalAlign: 'bottom' /* Helps align with text */ }}>
      <h4 ref={hiddenTextRef} style={{ margin: 0, opacity: 0, visibility: 'hidden', display: 'inline-block' }} aria-hidden="true">
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

    