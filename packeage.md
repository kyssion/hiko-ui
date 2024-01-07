
```json
{
  "name": "hiko-ui",
  "version": "1.0.0",
  "description": "hiko ui engine",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 0",
    "start": "node script/start.js",
    "build": ""
  },
  "type": "module",
  "author": "kyssion",
  "license": "ISC",
  "repository": "git@github.com:kyssion/hiko-ui.git",
  "devDependencies": {
    "@babel/parser": "^7.23.0", // 语法树支持
    "@rollup/plugin-commonjs": "^25.0.7", // rollup commonjs 打包支持
    "@rollup/plugin-json": "^6.0.1", // rollup json支持
    "@rollup/plugin-node-resolve": "^15.2.3", // rollup 支持nodejs的包能力
    "@rollup/plugin-replace": "^5.0.5", // 打包过程中动态替换常量
    "@rollup/plugin-terser": "^0.4.4", // 体积压缩
    "execa": "^8.0.1",
    "rollup-plugin-esbuild": "^6.1.0", // 编译支持
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  }
}

```