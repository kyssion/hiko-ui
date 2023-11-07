// @ts-check
import path from 'node:path'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default [{
    input: 'main.ts',
    output: {
        file: 'bundle.csj.js',
        format: 'cjs',
        exports: 'named',
        esModule: true,
        sourcemap: false,
        externalLiveBindings: false
    },
    plugins:[
        json({
            namedExports: false
        }),
        esbuild({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            minify: false,
            target:  'es2019',
        }),
    ]
}]