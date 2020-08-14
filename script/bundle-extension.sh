#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const cpy = require('cpy');
const watch = require('@cnakazawa/watch');
const { execSync } = require('child_process');

class Builder {
  buildPath = path.join('build', 'static');
  assetManifestPath = path.join('build', 'asset-manifest.json');
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'race-ext-react-'));

  contentByExtention(ext) {
    const assetManifest = JSON.parse(fs.readFileSync(this.assetManifestPath));
    return assetManifest.entrypoints.filter((filepath) => path.extname(filepath) === ext);
  }

  buildApp() {
    execSync('yarn run react-scripts build');
  }

  buildExt() {
    if (fs.existsSync(this.assetManifestPath)) {
      const extManifest = JSON.parse(fs.readFileSync('extension/manifest.json'));
      extManifest.content_scripts[0].js = this.contentByExtention('.js');
      extManifest.content_scripts[0].css = this.contentByExtention('.css');
      fs.writeFileSync(path.join(this.tmp, 'manifest.json'), JSON.stringify(extManifest));
      cpy('.', path.join(this.tmp, 'static'), { parents: true, cwd: this.buildPath });
      return this.tmp;
    }
  }

  build() {
    this.buildApp();
    const dir = this.buildExt();
    process.stdout.write(`${dir}\n`);
  }

  watch() {
    this.watchAppSrc();
    this.watchAppBuild();
  }

  watchAppSrc() {
    watch.watchTree('src', () => {
      this.buildApp();
    })
  }

  watchAppBuild() {
    watch.watchTree('build', { filter: (f) => {
      return f === this.assetManifestPath;
    }}, (f) => {
      const sourceDir = this.buildExt();
      process.stdout.write(`${sourceDir}\n`);
    })
  }
}

const builder = new Builder()
fncName = process.argv[2];
builder[fncName]();

