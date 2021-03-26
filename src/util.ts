import { constants, promises as fs } from 'fs';

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, constants.F_OK);
  } catch (error) {
    return false;
  }

  return true;
}

function getConfig(key?: string): unknown {
  if (key) {
    return atom.config.get(`portable-packages.${key}`);
  }

  return atom.config.get('portable-packages');
}

function getPackagesDir(): string {
  const packageDirs: string[] = atom.packages.getPackageDirPaths();

  return packageDirs.filter((val: string) => (!val.includes('/dev/packages') && !val.includes('app.asar')))[0];
}

export {
  exists,
  getConfig,
  getPackagesDir
};
