// https://webpack.js.org/guides/typescript/

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.css" {
  const content: any;
  export default content;
}
