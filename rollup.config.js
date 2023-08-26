import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

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

import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";
import packageJson from "./package.json" assert { type: "json" };

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

const getPostCss = () => {
  return [
    postcss({
      parser: "postcss-scss",
      // modules: true,

      include: "src/styles/main.css",
      extract: "dist/supamenu.css",
      minimize: isProduction ? true : false,
      sourcemap: isProduction ? false : true,
      plugins: [...getPostCssPlugins()],
    }),
    postcss({
      parser: "postcss-scss",
      // modules: true,

      include: "src/styles/skins/unstyled/unstyled.css",

      extract: "dist/supamenu-unstyled.css",
      minimize: isProduction ? true : false,
      sourcemap: isProduction ? false : true,
      plugins: [...getPostCssPlugins()],
    }),
  ];
};

export default {
  input: ["./src/index.ts"],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
    // {
    //   file: "dist/supamenu.min.js",
    //   format: "esm",
    //   plugins: [terser()],
    // },
  ],
  plugins: [
    commonjs(),
    resolve(),

    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),

    isProduction && terser(),
    // visualizer({
    //   filename: "bundle-analysis.html",
    //   open: true,
    // }),

    ...getPostCss(),
  ].filter(Boolean),
  // external: [],
};
