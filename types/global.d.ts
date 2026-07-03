// types/global.d.ts
export {};

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
    bootstrap: typeof import('bootstrap');
  }
}
