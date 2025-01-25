import { MainContainerProps } from "../types";

export default function MainContainer({
  children,
  className = "",
  padding = "p-4",
  maxWidth = "max-w-screen-xl",
  ...props
}: MainContainerProps) {
  return (
    <div className={`mx-auto ${maxWidth} ${padding} ${className}`} {...props}>
      {children}
    </div>
  );
}
