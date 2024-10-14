/// <reference types="vite/client" />

declare module "*.svg";

declare module "*.module.css" {
  export const classes: { [key: string]: string };
}
