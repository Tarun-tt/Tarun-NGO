import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

/**
 * AnimatedCounter: Smoothly animates numbers from 0 to target using IntersectionObserver
 * Supports Indian number formatting (e.g. 50,000+ or ₹1,000)
 */
export default function AnimatedCounter({
  target,
  duration = 1800,
  prefix = '',
  suffix = '',
  formatIndian = true,
  variant = 'h4',
  component = 'span',
  sx = {},
  className = '',
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract clean number from string if formatted (e.g. "50,000+" -> 50000, "₹2,500" -> 2500)
  let numericTarget = 0;
  let autoPrefix = prefix;
  let autoSuffix = suffix;

  if (typeof target === 'number') {
    numericTarget = target;
  } else if (typeof target === 'string') {
    if (target.includes('₹') && !autoPrefix) autoPrefix = '₹';
    if (target.includes('+') && !autoSuffix) autoSuffix = '+';
    if (target.includes('%') && !autoSuffix) autoSuffix = '%';
    const cleanStr = target.replace(/[^0-9.]/g, '');
    numericTarget = parseFloat(cleanStr) || 0;
  }

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            // Reset so it animates again when scrolling back into view
            setCount(0);
            setHasAnimated(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [numericTarget, duration]);

  const startAnimation = () => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease Out Quartic: fast start, soft deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(easeOut * numericTarget);

      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
        setHasAnimated(true);
      }
    };

    window.requestAnimationFrame(step);
  };

  const formatNumber = (num) => {
    if (!formatIndian) return num.toLocaleString();
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Typography
      ref={ref}
      variant={variant}
      component={component}
      className={className}
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontVariantNumeric: 'tabular-nums',
        ...sx,
      }}
    >
      {autoPrefix && <span>{autoPrefix}</span>}
      <span>{formatNumber(count)}</span>
      {autoSuffix && <span>{autoSuffix}</span>}
    </Typography>
  );
}
