
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
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const setupAndDraw = useCallback(() => {
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

    const dpr = window.devicePixelRatio || 1;
    const rect = hiddenTextEl.getBoundingClientRect();
    
    const newCanvasWidth = rect.width;
    const newCanvasHeight = rect.height;

    if (canvasSize.width !== newCanvasWidth || canvasSize.height !== newCanvasHeight) {
      setCanvasSize({ width: newCanvasWidth, height: newCanvasHeight });
      canvas.width = newCanvasWidth * dpr;
      canvas.height = newCanvasHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    
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
    ctx.textAlign = 'left'; // Changed to left for char-by-char
    ctx.textBaseline = 'middle';

    const numericFontSize = parseFloat(fontSize);
    const newCharsData: CharAnimation[] = [];
    let currentX = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const metrics = ctx.measureText(char);
      const charWidth = metrics.width;
      
      // Use actual ascent/descent if available, otherwise approximate with font size
      const charHeight = (metrics.actualBoundingBoxAscent || numericFontSize * 0.75) + 
                         (metrics.actualBoundingBoxDescent || numericFontSize * 0.25);

      const angle = Math.random() * Math.PI * 2;
      const gradientVisualLength = Math.max(charWidth, charHeight) * 1.5; // Visual extent of gradient
      const totalTravelDistance = gradientVisualLength * 2; // Distance for a full sweep effect
      const cycleDuration = Math.random() * 2 + 3; // 3-5 seconds
      const speed = totalTravelDistance / (cycleDuration * 60); // pixels per frame for 60fps

      newCharsData.push({
        char,
        x: currentX,
        y: newCanvasHeight / 2, // y-pos for drawing text (middle aligned)
        width: charWidth,
        fontHeight: charHeight,
        angle,
        offset: Math.random() * totalTravelDistance - gradientVisualLength, // Start at random point in cycle
        speed,
        gradientVisualLength,
        totalTravelDistance,
      });
      currentX += charWidth;
    }
    setCharsData(newCharsData);

  }, [text, initialHighlightColor, canvasSize.width, canvasSize.height]);


  useEffect(() => {
    setupAndDraw(); // Initial setup
    
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      // Clear previous animation states and re-setup
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setupAndDraw(); 
    });
    resizeObserver.observe(container);
    resizeObserver.observe(hiddenTextRef.current!);


    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [setupAndDraw]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || charsData.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      // Ensure canvas physical size and context scale are up-to-date
      // This might be redundant if ResizeObserver handles it well, but good for safety
      if (canvas.width !== canvasSize.width * dpr || canvas.height !== canvasSize.height * dpr) {
        canvas.width = canvasSize.width * dpr;
        canvas.height = canvasSize.height * dpr;
        ctx.scale(dpr, dpr); // Re-apply scale if canvas resized
        
        // Re-apply font settings as context might reset
        const hiddenTextEl = hiddenTextRef.current;
        if (hiddenTextEl) {
           const computedStyle = window.getComputedStyle(hiddenTextEl);
           ctx.font = `${computedStyle.getPropertyValue('font-style')} ${computedStyle.getPropertyValue('font-variant')} ${computedStyle.getPropertyValue('font-weight')} ${computedStyle.getPropertyValue('font-size')} ${computedStyle.getPropertyValue('font-family')}`;
           ctx.textAlign = 'left';
           ctx.textBaseline = 'middle';
        }
      }
      
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height); // Clear CSS-pixel space

      const highlightBandWidthFraction = 0.2; // Highlight is 20% of gradient length

      charsData.forEach(charData => {
        // Update offset for animation
        charData.offset += charData.speed;
        if (charData.offset > charData.gradientVisualLength) {
          charData.offset = -charData.gradientVisualLength - (Math.random() * charData.gradientVisualLength * 0.5) ; // Reset with some randomness
          charData.angle = Math.random() * Math.PI * 2; // Re-randomize angle for next cycle
          const cycleDuration = Math.random() * 2 + 3; // 3-5 seconds
          charData.speed = charData.totalTravelDistance / (cycleDuration * 60);
        }

        // Calculate gradient start/end points based on char's angle and current offset
        // These points define the line along which the gradient is drawn.
        // The gradient itself contains a highlight band.
        const cosA = Math.cos(charData.angle);
        const sinA = Math.sin(charData.angle);
        
        // Center the gradient's coordinate system around the character's drawing point for simplicity
        // The gradient line is effectively charData.gradientVisualLength long
        // The offset moves this line across the character
        const p1x = -charData.gradientVisualLength / 2 * cosA + charData.offset * cosA;
        const p1y = -charData.gradientVisualLength / 2 * sinA + charData.offset * sinA;
        const p2x =  charData.gradientVisualLength / 2 * cosA + charData.offset * cosA;
        const p2y =  charData.gradientVisualLength / 2 * sinA + charData.offset * sinA;

        const gradient = ctx.createLinearGradient(p1x, p1y, p2x, p2y);

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

    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [charsData, baseColor, actualHighlightColor, canvasSize]);

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
          lineHeight: 'normal', // Ensure line height doesn't add extra space
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
