import React from "react";

interface ImageProps {
  src: string; // The source of the image
  alt?: string; // Alt text for accessibility
  width?: number | string; // Optional width
  height?: number | string; // Optional height
  className?: string; // Optional custom class
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"; // Object-fit style
  objectPosition?: string; // CSS object-position value
  style?: React.CSSProperties; // Optional inline styles
}

const CustomImage: React.FC<ImageProps> = ({
  src,
  alt = "",
  width,
  height,
  className,
  objectFit = "cover",
  objectPosition = "center",
  style
}) => {
  // Convert src to a string if it's not already
  //   const srcString = typeof src === "string" ? src : src?.src;
  const srcString = src;

  // Check if the source is an SVG
  const isSvg = srcString.endsWith(".svg");

  if (isSvg) {
    return (
      <img
        src={srcString}
        alt={alt}
        width={width as number}
        height={height as number}
        className={className}
        style={{
          ...style,
          objectFit,
          objectPosition,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      width={width as number}
      height={height as number}
      alt={alt ? alt : "image"}
      className={className}
    />
  );
};

export default CustomImage;
