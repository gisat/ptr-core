import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";


const env = process.env.NODE_ENV;
const pkg = require("./package.json");
import sass from 'rollup-plugin-sass';
const lodashExternal = [
  'lodash/isEmpty',
]

export default {
  input: "src/index.js",
  external: [
    'react',
    'prop-types',
    'classnames',
    ...lodashExternal
  ],
  output: {
    file: {
      es: pkg.module,
      cjs: pkg.main
    }[env],
    format: env,
    globals: {
      // 'lodash/random': '_.random'
    },
    exports: 'named', /** Disable warning for default imports */
    sourcemap: true,
  },
  plugins: [
    babel({
      plugins: ["lodash"],
    }),
    commonjs({
        include: 'node_modules/**',
    }),
    sass({
      output: true,
    }),
    filesize(),
  ]
};