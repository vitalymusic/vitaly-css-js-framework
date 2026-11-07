/**
 * VitalyCSS būvēšanas skripts
 * Lietošana:  npm install && npm run build
 * Ko dara: src/ → dist/  (kopija + .min versijas + vitaly.all.css pakete)
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const pkg = require('./package.json');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const banner = `/*! VitalyCSS v${pkg.version} | MIT | ${pkg.homepage} */`;
const lasit = (f) => fs.readFileSync(path.join(SRC, f), 'utf8');
const rakstit = (f, t) => fs.writeFileSync(path.join(DIST, f), t);
const kb = (t) => (Buffer.byteLength(t) / 1024).toFixed(1) + ' KB';

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const css = lasit('vitaly.css');
const cssJs = lasit('vitaly-js.css');
const js = lasit('vitaly.js');

const faili = {
  'vitaly.css': css,
  'vitaly-js.css': cssJs,
  'vitaly.all.css': css + '\n' + cssJs,
  'vitaly.js': js
};

for (const [nos, saturs] of Object.entries(faili)) {
  rakstit(nos, saturs);
  const loader = nos.endsWith('.css') ? 'css' : 'js';
  const min = esbuild.transformSync(saturs, {
    loader, minify: true, charset: 'utf8', legalComments: 'none',
    target: loader === 'js' ? 'es2018' : undefined
  }).code;
  const minNos = nos.replace(/\.(css|js)$/, '.min.$1');
  rakstit(minNos, banner + '\n' + min);
  console.log(nos.padEnd(18), kb(saturs).padStart(9), ' →', minNos.padEnd(20), kb(min).padStart(9));
}
console.log('Gatavs: dist/');
