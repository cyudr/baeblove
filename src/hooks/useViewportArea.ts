import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'ultrawide';

export interface ViewportArea {
  width: number;
  height: number;
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isCompact: boolean;
  aspectRatio: number;
  orientation: 'portrait' | 'landscape';
  scaleFactor: number;
}

/**
 * Detects the current viewing area, screen dimensions, and orientation.
 * Dynamically computes a responsive scale factor and sets CSS variables
 * for fluid scaling and scroll boundary calculations.
 */
export function useViewportArea(): ViewportArea {
  const [viewport, setViewport] = useState<ViewportArea>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1200,
        height: 800,
        device: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isCompact: false,
        aspectRatio: 1.5,
        orientation: 'landscape',
        scaleFactor: 1,
      };
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const isTablet = w >= 768 && w < 1024;
    const isDesktop = w >= 1024;
    const isCompact = w < 640 || h < 680;
    const device: DeviceType =
      w < 640
        ? 'mobile'
        : w < 1024
        ? 'tablet'
        : w < 1440
        ? 'laptop'
        : w < 1920
        ? 'desktop'
        : 'ultrawide';

    // Calculate scale factor: normal is 1, scales smoothly down to 0.88 for very small screens
    const scaleFactor = Math.min(1.05, Math.max(0.88, w / 1280));

    return {
      width: w,
      height: h,
      device,
      isMobile,
      isTablet,
      isDesktop,
      isCompact,
      aspectRatio: w / Math.max(h, 1),
      orientation: w >= h ? 'landscape' : 'portrait',
      scaleFactor,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number;

    const updateDimensions = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const isMobile = w < 768;
        const isTablet = w >= 768 && w < 1024;
        const isDesktop = w >= 1024;
        const isCompact = w < 640 || h < 680;
        const device: DeviceType =
          w < 640
            ? 'mobile'
            : w < 1024
            ? 'tablet'
            : w < 1440
            ? 'laptop'
            : w < 1920
            ? 'desktop'
            : 'ultrawide';

        const scaleFactor = Math.min(1.05, Math.max(0.88, w / 1280));

        // Inject dynamic CSS variables on document root
        document.documentElement.style.setProperty('--viewport-w', `${w}px`);
        document.documentElement.style.setProperty('--viewport-h', `${h}px`);
        document.documentElement.style.setProperty('--scale-factor', `${scaleFactor}`);

        setViewport({
          width: w,
          height: h,
          device,
          isMobile,
          isTablet,
          isDesktop,
          isCompact,
          aspectRatio: w / Math.max(h, 1),
          orientation: w >= h ? 'landscape' : 'portrait',
          scaleFactor,
        });
      });
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions, { passive: true });
    window.addEventListener('orientationchange', updateDimensions, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateDimensions);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateDimensions);
      }
    };
  }, []);

  return viewport;
}
