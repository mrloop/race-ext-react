#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const cpy = require('cpy');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'race-ext-react-'));
const buildPath = path.join('build', 'static');

const assetManifest = JSON.parse(fs.readFileSync('build/asset-manifest.json'));
const extManifest = JSON.parse(fs.readFileSync('extension/manifest.json'));

contentByExtention = (ext) => {
  return assetManifest.entrypoints.filter((filepath) => path.extname(filepath) === ext);
}

extManifest.content_scripts[0].js = contentByExtention('.js');
extManifest.content_scripts[0].css = contentByExtention('.css');

fs.writeFileSync(path.join(tmp, 'manifest.json'), JSON.stringify(extManifest));

cpy('.', path.join(tmp, 'static'), { parents: true, cwd: buildPath });

// doesnt work with symbolic links
// fs.symlinkSync(path.resolve(buildPath), path.join(tmp, 'static'));

process.stdout.write(tmp);
