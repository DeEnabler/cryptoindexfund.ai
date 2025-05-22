
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const calculateTimeLeft = () => {
  const now = new Date();
  let targetYear = now.getFullYear();
  // JavaScript months are 0-indexed, so 6 is July
  let targetDate = new Date(targetYear, 6, 1, 12, 0, 0); 

  if (targetDate.getTime() < now.getTime()) {
    // If July 1st 12PM of current year has passed, target next year
    targetYear += 1;
    targetDate = new Date(targetYear, 6, 1, 12, 0, 0);
  }

  const difference = targetDate.getTime() - now.getTime();
  
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTimeUp: true,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isTimeUp: false,
    };
  }
  return timeLeft;
};

export function StickyCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initial calculation on mount
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    // Avoid rendering on server or before hydration to prevent mismatches
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <Link href="/airdrop" passHref legacyBehavior>
      <a className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-3 text-center text-base md:text-lg z-50 shadow-lg hover:bg-primary/90 transition-colors cursor-pointer block">
        {timeLeft.isTimeUp ? (
          <span className="font-semibold">$CIF Airdrop is LIVE! Claim Yours Now!</span>
        ) : (
          <>
            <span className="font-semibold mr-2">$CIF Airdrop Countdown:</span>
            <span className="tabular-nums">
              <span className="mx-1">{formatNumber(timeLeft.days)}<span className="text-xs">d</span></span>
              <span className="mx-0.5">:</span>
              <span className="mx-1">{formatNumber(timeLeft.hours)}<span className="text-xs">h</span></span>
              <span className="mx-0.5">:</span>
              <span className="mx-1">{formatNumber(timeLeft.minutes)}<span className="text-xs">m</span></span>
              <span className="mx-0.5">:</span>
              <span className="mx-1">{formatNumber(timeLeft.seconds)}<span className="text-xs">s</span></span>
            </span>
          </>
        )}
      </a>
    </Link>
  );
}
