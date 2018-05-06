var fs = require('fs');
const version = Date.now();
var deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive('.fusebox');

const {
  FuseBox,
  Sparky,
  SassPlugin,
  WebIndexPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin,
  VueComponentPlugin,
  Spark,
  CopyPlugin
} = require("fuse-box");

Sparky.task("clean", () => Sparky.src("./.fusebox").clean(".fusebox/"));
let isProduction = false;
let fuse;
Sparky.task("set-prod", () => {
  isProduction = true;
});
Sparky.task("clean", () => Sparky.src("./dist").clean("dist/"));
Sparky.task("watch-assets", () => Sparky.watch("./assets", {
  base: "./code"
}).dest("./dist"));
Sparky.task("copy-assets", () => Sparky.src("./assets", {
  base: "./code"
}).dest("./dist"));

Sparky.task("config", () => {
  fuse = FuseBox.init({
    homeDir: "code",
    output: "dist/$name.js",
    debug: !isProduction,
    useTypescriptCompiler: true,
    plugins: [
      CopyPlugin({
        files: ["jsstore.worker.js"],
        // dest: 'worker',
        useDefault: false
      }),
      VueComponentPlugin({
        style: [
          SassPlugin({
            importer: true
          }),
          CSSResourcePlugin(),
          CSSPlugin({
            group: 'components.css',
            inject: 'components.css'
          })
        ]
      }),
      CSSPlugin({
        group: isProduction ? "bundle.css?" + version : "bundle.css",
        minify: isProduction
      }),
      WebIndexPlugin({
        template: "code/index.html",
      }),
      isProduction && QuantumPlugin({
        bakeApiIntoBundle: "app",
        uglify: true,
        css: {
          clean: true
        },
        extendServerImport: true
      })
    ]
  });
  if (!isProduction) {
    fuse.dev({
      open: true,
      port: 4000
    })
  }
  const vendor = fuse
    .bundle(isProduction ? "vendor?" + version : "vendor")
    .instructions("~ index.ts");

  const app = fuse
    .bundle(isProduction ? "bundle?" + version : "bundle")
    .instructions("> [index.ts]");

  if (!isProduction) {
    app
      .watch()
      .hmr();
  }
});

Sparky.task("default", [
  "clean", "watch-assets", "config"
], () => {
  return fuse.run();
});

Sparky.task("dist", [
  "clean", "copy-assets", "set-prod", "config"
], () => {
  return fuse.run();
});