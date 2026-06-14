import React from 'react';
import { LOGO_SRC, LOGO_COLOR_SRC } from "@/lib/asset-path";

export function Logo({ className = "", alt = "ETH Lima Logo", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <>
      <img 
        src={LOGO_COLOR_SRC} 
        alt={alt} 
        className={`block dark:hidden ${className}`} 
        {...props} 
      />
      <img 
        src={LOGO_SRC} 
        alt={alt} 
        className={`hidden dark:block ${className}`} 
        {...props} 
      />
    </>
  );
}
