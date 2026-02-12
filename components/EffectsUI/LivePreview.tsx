import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LivePreviewProps {
  html: string;
  css: string;
  js?: string;
}

export function LivePreview({ html, css, js }: LivePreviewProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" }); // Preload a bit before it enters viewport
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // When in view, render. When out of view, unmount to save WebGL contexts.
    // We can add a small timeout to prevent rapid mounting/unmounting during fast scrolls
    let timeout: NodeJS.Timeout;

    if (isInView) {
      setShouldRender(true);
    } else {
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, 1000); // Keep it alive for 1s after leaving viewport to avoid flicker on small scrolls
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  const srcDoc = `
    <html>
      <head>
        <style>
          /* Force the internal content to be at least as large as the scaled-up iframe */
          html, body { 
            margin: 0; 
            padding: 0; 
            width: 100%;
            height: 100%;
            display: flex; 
            justify-content: center; 
            align-items: center; 
            background: transparent; 
            overflow: hidden;
          }
          /* This ensures backgrounds like gradients/grids fill the entire view */
          body > * {
            flex-shrink: 0;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>${js || ""}</script>
      </body>
    </html>
  `;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {shouldRender ? (
        <iframe
          srcDoc={srcDoc}
          className="
                /* 1. We make the iframe exactly 2x the size of the container */
                w-[200%] h-[200%] 
                absolute
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                border-none 
                bg-transparent 
                /* 2. Scale it down by 0.5 to fit perfectly (1/2 = 0.5) */
                scale-[0.5] 
                transition-opacity duration-500
                "
          title="preview"
          sandbox="allow-scripts"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-600 gap-2 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xs uppercase tracking-widest opacity-70">Loading Preview...</span>
        </div>
      )}
    </div>
  );
}