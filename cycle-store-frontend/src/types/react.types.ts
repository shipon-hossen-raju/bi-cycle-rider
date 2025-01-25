import { HTMLAttributes, ReactNode } from "react";

export interface MainContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
}

export type TNavItems = {
  id?: string;
  name: string;
  path: string;
  element: JSX.Element;
};
