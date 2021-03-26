import JSZip from 'jszip';
import { basename } from 'path';
import { promises as fs } from 'fs';
import { exists, getPackagesDir } from './util';
import { join } from 'path';


function installPackage(uri: string): void {
  const fileBasename = basename(uri, '.atom-package');

  const notification = atom.notifications.addInfo(`Do you really want to install \`${fileBasename}\`?`, {
    dismissable: true,
    buttons: [
      {
        text: 'Install',
        onDidClick: async () => {
          const packagesDir = getPackagesDir();
          const fileContents = await fs.readFile(uri);
          const zip = await JSZip.loadAsync(fileContents);
          const meta = JSON.parse(await zip.file('package.json').async('text'));
          const packageDir = join(packagesDir, meta.name);
          const packageExists = await exists(packageDir);

          if (!packageExists) {
            await fs.mkdir(packageDir);
          }

          Object.keys(zip.files).map(async relativePath => {
            const isDir = zip.files[relativePath].dir;
            const subDir = join(packageDir, relativePath);

            if (isDir) {
              const subDirExists = await exists(subDir);

              if (!subDirExists) {
                await fs.mkdir(subDir);
              }
            } else {
              zip.file(relativePath).async('nodebuffer')
                .then(async contents => {
                  await fs.writeFile(subDir, contents);
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
}

export {
  installPackage
};
