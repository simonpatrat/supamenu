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

import path from "path";

import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";
import packageJson from "./package.json" assert { type: "json" };

const isProduction = process.env.NODE_ENV === "production";

const absolute = path.resolve("dist/css");

const getPostCssPlugins = () => [
  atImport(),
  postcssEach(),
  postcssMixins(),
  rfs(),
  postcssNested(),

  postcssPresetEnv({
    browsers: ["> 0.2% and not dead"],
  }),
  postCssSorting(),
  postcssDiscardComments(),
  postcssDiscardDuplicates(),
];

const skinNames = ["unstyled", "modal", "classic", "off-canvas", "full-screen"];

const generateSkins = () =>
  skinNames.map((skinName) => {
    return postcss({
      parser: "postcss-scss",
      // modules: true,

      include: `src/styles/skins/${skinName}/index.css`,

      extract: absolute + `/supamenu-${skinName}.css`,
      minimize: isProduction ? true : false,
      sourcemap: isProduction ? false : true,
      plugins: [...getPostCssPlugins()],
    });
  });

const getPostCss = () => {
  return [
    postcss({
      parser: "postcss-scss",
      // modules: true,

      include: "src/styles/main.css",
      extract: absolute + "/supamenu.css",
      minimize: isProduction ? true : false,
      sourcemap: isProduction ? false : true,
      plugins: [...getPostCssPlugins()],
    }),
    ...generateSkins(),
  ];
};

export default {
  input: ["./src/index.ts"],
  output: [
    {
      dir: "dist",
      entryFileNames: "cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: "dist",
      entryFileNames: "esm/index.js",
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
      declarationDir: "dist/types",
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
