import JSZip from 'jszip';
import { basename } from 'path';
import { existsSync, mkdirSync, readFile, writeFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

const installPackage = (uri: string) => {
  const fileBasename = basename(uri, '.atom-package');

  const notification = atom.notifications.addInfo(`Do you really want to install \`${fileBasename}\`?`, {
    dismissable: true,
    buttons: [
      {
        text: 'Install',
        onDidClick: async () => {
          const packagesDir = atom.packages.getPackageDirPaths()[0];

          let fileContents;

          try {
            fileContents = await readFileAsync(uri);
          } catch (err) {
            throw err;
          }

          const zip = await JSZip.loadAsync(fileContents);
          const meta = JSON.parse(await zip.file('package.json').async('text'));
          const packageDir = join(packagesDir, meta.name);
          const packageExists = existsSync(packageDir);

          if (!packageExists) {
            mkdirSync(packageDir);
          }

          Object.keys(zip.files).forEach( relativePath => {
            const isDir = zip.files[relativePath].dir;
            const subDir = join(packageDir, relativePath);

            if (isDir) {
              const subDirExists = existsSync(subDir);

              if (!subDirExists) {
                mkdirSync(subDir);
              }
            } else {
              zip.file(relativePath).async('nodebuffer')
              .then( contents => {
                writeFileSync(subDir, contents);
              });
            }
          });

          atom.packages.enablePackage(meta.name);
          notification.dismiss();
        }
      },
      {
        text: 'Cancel',
        onDidClick: () => {
          notification.dismiss();
        }
      }
    ]
  });
};

export {
  installPackage
};
