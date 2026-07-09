import React from "react";
import Image from "next/image";
import { LOGO_SRC, LOGO_COLOR_SRC } from "@/lib/asset-path";

// Allow overriding width and height but provide defaults for Next Image
interface LogoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  width?: number;
  height?: number;
}

export function Logo({
  className = "",
  alt = "ETH Lima Logo",
  width = 150,
  height = 40,
  ...props
}: LogoProps) {
  return (
    <>
      <Image
        src={LOGO_COLOR_SRC}
        alt={alt}
        width={width}
        height={height}
        className={`block dark:hidden ${className}`}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      />
      <Image
        src={LOGO_SRC}
        alt={alt}
        width={width}
        height={height}
        className={`hidden dark:block ${className}`}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      />
    </>
  );
}
