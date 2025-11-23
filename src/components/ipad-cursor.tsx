
"use client";

import React, { useEffect, useRef } from 'react';
import './ipad-cursor.css';
import { useIsMobile } from '@/hooks/use-mobile';

const IpadCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isCursorLocked = useRef(false);
  const defaultCursorSize = useRef('1em');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set a default size from CSS, but update it once loaded
    defaultCursorSize.current = getComputedStyle(cursor).getPropertyValue("--height");

    const handleMouseDown = () => {
      if (!isCursorLocked.current) {
        cursor.style.setProperty("--scale", '0.9');
      }
    };

    const handleMouseUp = () => {
      if (!isCursorLocked.current) {
        cursor.style.setProperty("--scale", '1');
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isCursorLocked.current) {
        window.requestAnimationFrame(() => {
            cursor.style.setProperty("--top", `${event.clientY}px`);
            cursor.style.setProperty("--left", `${event.clientX}px`);
        });
      }
    };

    // Attach to window for global tracking
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    const setupInteractiveElement = (element: HTMLElement) => {
      let rect: DOMRect | null = null;

      const onMouseEnter = (event: MouseEvent) => {
        isCursorLocked.current = true;
        const target = event.currentTarget as HTMLElement;
        rect = target.getBoundingClientRect();

        window.requestAnimationFrame(() => {
            cursor.classList.add("is-locked");
            cursor.style.setProperty("--top", `${rect!.top + rect!.height / 2}px`);
            cursor.style.setProperty("--left", `${rect!.left + rect!.width / 2}px`);
            cursor.style.setProperty("--width", `${rect!.width}px`);
            cursor.style.setProperty("--height", `${rect!.height}px`);
        });

        target.style.setProperty("--scale", '1.05');
      };

      const onMouseMove = (event: MouseEvent) => {
        if (rect) {
          const target = event.currentTarget as HTMLElement;
          const halfHeight = rect.height / 2;
          const topOffset = (event.clientY - rect.top - halfHeight) / halfHeight;
          const halfWidth = rect.width / 2;
          const leftOffset = (event.clientX - rect.left - halfWidth) / halfWidth;

           window.requestAnimationFrame(() => {
                cursor.style.setProperty("--translateX", `${leftOffset * 3}px`);
                cursor.style.setProperty("--translateY", `${topOffset * 3}px`);
                target.style.setProperty("--translateX", `${leftOffset * 6}px`);
                target.style.setProperty("--translateY", `${topOffset * 4}px`);
           });
        }
      };

      const onMouseLeave = (event: MouseEvent) => {
        const target = event.currentTarget as HTMLElement;
        isCursorLocked.current = false;

        window.requestAnimationFrame(() => {
            cursor.style.setProperty("--width", defaultCursorSize.current);
            cursor.style.setProperty("--height", defaultCursorSize.current);
            cursor.style.setProperty("--translateX", '0');
            cursor.style.setProperty("--translateY", '0');
        });

        target.style.setProperty("--translateX", '0');
        target.style.setProperty("--translateY", '0');
        target.style.setProperty("--scale", '1');

        setTimeout(() => {
          if (!isCursorLocked.current) {
            cursor.classList.remove("is-locked");
          }
        }, 100);
      };

      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("mouseleave", onMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("mouseleave", onMouseLeave);
      };
    };

    const setupTextElement = (element: HTMLElement) => {
      const onMouseOver = () => {
        if (!isCursorLocked.current) {
            window.requestAnimationFrame(() => {
                cursor.style.setProperty("--width", "0.2em");
                cursor.style.setProperty("--height", "1.5em");
            });
        }
      };
      const onMouseOut = () => {
        if (!isCursorLocked.current) {
            window.requestAnimationFrame(() => {
                cursor.style.setProperty("--width", defaultCursorSize.current);
                cursor.style.setProperty("--height", defaultCursorSize.current);
            });
        }
      };
      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);

      return () => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      };
    };

    let cleanups = new Set<() => void>();

    const applyEffectsToNode = (node: Node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const element = node as HTMLElement;

        const interactiveElements = element.matches('a, button') ? [element] : Array.from(element.querySelectorAll('a, button'));
        interactiveElements.forEach(el => cleanups.add(setupInteractiveElement(el as HTMLElement)));

        const textElements = element.matches('p, h1, h2, h3, h4, h5, h6, span, li, strong, em, b, i') ? [element] : Array.from(element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, strong, em, b, i'));
        textElements.forEach(el => cleanups.add(setupTextElement(el as HTMLElement)));
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(applyEffectsToNode);
            }
        }
    });

    // Start observing the document body for added nodes
    applyEffectsToNode(document.body);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      cleanups.forEach(cleanup => cleanup());
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef} id="cursor" className="cursor">
      <div className="cursor__content"></div>
    </div>
  );
};

export default IpadCursor;
