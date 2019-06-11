// @ts-ignore
import JSZip from 'jszip';
import globby from 'globby';
import ignore from 'ignore';
import { getConfig, getPackagesDir } from './util';
import { join, relative, resolve } from 'path';
import { promisify } from 'util';
// @ts-ignore
import { readManifest } from 'atom-read-manifest';
import { readFile, readFileSync, writeFile } from 'fs';
// @ts-ignore
import { shell } from 'electron';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const createPackage = async (selectedPackage: string) => {
  atom.notifications.addInfo('Create Package');

  const packagesDir = getPackagesDir();
  const packageDir = resolve(packagesDir, selectedPackage);
  const ignoreFile = getConfig('ignoreFile');
  let ignoreFileContents: string = '';

  try {
    ignoreFileContents = (await readFileAsync(`${packageDir}/${ignoreFile}`)).toString();
  } catch (error) {
    console.warn(`No ${ignoreFile} found`);
  }

  // Always ignore .git folder
  ignoreFileContents.concat('\n.git/');

  const ig = ignore().add(ignoreFileContents);
  const absolutePaths: string[] = await globby(packageDir);

  const relativePaths: string[] = absolutePaths.map(absolutePath => {
    return relative(packageDir, absolutePath);
  });

  const includedPaths: string[] = ig.filter(relativePaths);

  const zip = new JSZip();

  includedPaths.forEach(async includedPath => {
    const contents = readFileSync(join(packageDir, includedPath));
    zip.file(includedPath, contents);
  });

  const pkgConfig = getConfig('compressionType');
  const meta = await readManifest();

  const options: any = {
    type: 'nodebuffer',
    comment: `${meta.name} v${meta.version} | ${meta.homepage}`,
    compression: pkgConfig.compressionType,
    compressionOptions: {
      level: pkgConfig.compressionLevel
    }
  };

  const manifest = await readManifest(selectedPackage);
  const outName = `${manifest.name}-v${manifest.version}`;

  try {
    let blob = await zip.generateAsync(options);
    await writeFileAsync(`${packagesDir}/${outName}.atom-package`, blob);
  } catch (err) {
    console.error(err);
  }

  if (getConfig('ignoreFile')) {
    shell.showItemInFolder(`${packagesDir}/${outName}.atom-package`);
  }
};

export {
  createPackage
};
