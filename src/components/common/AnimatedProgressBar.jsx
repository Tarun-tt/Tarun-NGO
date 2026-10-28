import React, { useState, useEffect, useRef } from 'react';
import { LinearProgress } from '@mui/material';

/**
 * AnimatedProgressBar: Smoothly animates LinearProgress from 0 to target value
 * using IntersectionObserver and requestAnimationFrame.
 * Synchronized with AnimatedCounter (1800ms easeOutQuartic).
 */
export default function AnimatedProgressBar({
  value = 0,
  duration = 1800,
  color,
  sx = {},
  height = 8,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const targetValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let animId = null;

    const startAnimation = () => {
      let startTimestamp = null;
      if (animId) cancelAnimationFrame(animId);

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Ease Out Quartic: fast initial rise, soft deceleration
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const val = Number((easeOut * targetValue).toFixed(1));

        setCurrentValue(val);

        if (progress < 1) {
          animId = window.requestAnimationFrame(step);
        } else {
          setCurrentValue(targetValue);
        }
      };

      animId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            if (animId) cancelAnimationFrame(animId);
            setCurrentValue(0);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [targetValue, duration]);

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={currentValue}
        sx={{
          height,
          borderRadius: 4,
          bgcolor: '#E5EFE9',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            transition: 'none', // allows 60fps frame-by-frame animation from requestAnimationFrame
            bgcolor: color || '#087A52',
            ...(sx?.['& .MuiLinearProgress-bar'] || {}),
          },
          ...sx,
        }}
        {...props}
      />
    </div>
  );
}
