// import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json(),
  // nodeResolve({
  //   preferBuiltins: true
  // }),
  (
    process.env.ROLLUP_WATCH
      ? undefined
      : terser()
  ),
  typescript({
    allowSyntheticDefaultImports: true,
    moduleResolution: 'node',
    resolveJsonModule: true
  })
];

export default [
  {
    input: 'src/portable-packages.ts',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: true
    },
    external: [
      // Atom
      'atom',
      'electron',

      // Node
      'assert',
      'buffer',
      'child_process',
      'events',
      'fs',
      'os',
      'path',
      'stream',
      'util'
    ],
    plugins: plugins
  }
];
