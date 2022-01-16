import JSZip from 'jszip';
import globby from 'globby';
import ignore from 'ignore';
import { getConfig, getPackagesDir } from './util';
import { join, relative, resolve } from 'path';
import { readManifest } from 'atom-read-manifest';
import { promises as fs } from 'fs';
import { shell } from 'electron';


async function createPackage(selectedPackage: string): Promise<void> {
  atom.notifications.addInfo(`Creating Package&hellip;`);

  const packagesDir = getPackagesDir();
  const packageDir = resolve(packagesDir, selectedPackage);
  const ignoreFile = getConfig('ignoreFile');
  let ignoreFileContents = '';

  try {
    ignoreFileContents = (await fs.readFile(`${packageDir}/${ignoreFile}`)).toString();
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

  await Promise.all(includedPaths.map(async (includedPath) => {
    const contents = await fs.readFile(join(packageDir, includedPath));
    zip.file(includedPath, contents);
  }));

  const pkgConfig = getConfig('compressionType');
  const meta: unknown = await readManifest('portable-packages');

  const options: JSZip.JSZipGeneratorOptions = {
    type: 'nodebuffer',
    comment: `${meta['name']} v${meta['version']} | ${meta['homepage']}`,
    compression: pkgConfig['compressionType'],
    compressionOptions: {
      level: pkgConfig['compressionLevel']
    }
  };

  const manifest: unknown = await readManifest(selectedPackage);
  const outName = `${manifest['name']}-v${manifest['version']}`;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blob: any = await zip.generateAsync(options);
    await fs.writeFile(`${packagesDir}/${outName}.atom-package`, blob);
  } catch (err) {
    console.error(err);
  }

  if (getConfig('revealFile')) {
    shell.showItemInFolder(`${packagesDir}/${outName}.atom-package`);
  }
}

export {
  createPackage
};
