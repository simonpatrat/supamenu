import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { babel } from "@rollup/plugin-babel";
// import inject from "@rollup/plugin-inject";

import rfs from "rfs";
import postcss from "rollup-plugin-postcss";

import postcssPresetEnv from "postcss-preset-env";
import postcssNested from "postcss-nested";
import postCssSorting from "postcss-sorting";

import atImport from "postcss-import";
import postcssDiscardComments from "postcss-discard-comments";
import postcssMixins from "postcss-mixins";
import postcssEach from "postcss-each";

import postcssDiscardDuplicates from "postcss-discard-duplicates";

import path from "path";

import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

const getPostCssPlugins = () => [
  atImport(),
  postcssEach(),
  postcssMixins(),
  postcssNested(),
  rfs(),
  postcssPresetEnv({
    browsers: ["> 0.2% and not dead"],
  }),
  postCssSorting(),
  postcssDiscardComments(),
  postcssDiscardDuplicates(),
];

const getPostCss = () => [
  postcss({
    parser: "postcss-scss",
    // modules: true,

    include: "src/styles/main.css",
    extract: path.resolve("dist/supamenu.css"),
    minimize: isProduction ? true : false,
    sourcemap: isProduction ? false : true,
    plugins: [...getPostCssPlugins()],
  }),
  postcss({
    parser: "postcss-scss",
    // modules: true,

    include: "src/styles/skins/unstyled/unstyled.css",

    extract: path.resolve("dist/supamenu-unstyled.css"),
    minimize: isProduction ? true : false,
    sourcemap: isProduction ? false : true,
    plugins: [...getPostCssPlugins()],
  }),
];

const getPlugins = () => [
  // inject({
  //   react: ["react", "React"],
  //   ReactDOM: ["react-dom", "ReactDOM"],
  // }),
  peerDepsExternal({
    includeDependencies: true,
  }),
  commonjs({
    include: /node_modules/,
  }),
  resolve(),

  typescript({
    tsconfig: "./tsconfig.json",
    declaration: true,
    declarationDir: "dist",
    exclude: ["**/*.spec.ts", "**/*.stories.*"],
  }),
  babel({ babelHelpers: "bundled" }),

  isProduction && terser(),
  // visualizer({
  //   filename: "bundle-analysis.html",
  //   open: true,
  // }),
];

export default [
  {
    input: ["./src/index.ts", "./src/supamenu-react/index.ts"],
    output: [
      {
        dir: "dist",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: !isProduction,
        paths: {
          "react/jsx-runtime": "react/jsx-runtime.js",
        },
      },
      // {
      //   file: "dist/supamenu.min.js",
      //   format: "esm",
      //   plugins: [terser()],
      // },
    ],
    plugins: [...getPlugins(), ...getPostCss()].filter(Boolean),
    external: ["react", "react-dom", "react/jsx-runtime"],
    // globals: {
    //   react: "React",
    //   "react-dom": "ReactDOM",
    // },
  },
];
