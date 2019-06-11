const getConfig = (key?: string) => {
  if (key) {
    return atom.config.get(`portable-packages.${key}`);
  }

  return atom.config.get('portable-packages');
};

const getPackagesDir = (): string => {
  const packageDirs: string[] = atom.packages.getPackageDirPaths();

  return packageDirs.filter( (val: string) => val.includes('.atom/packages'))[0];
};

export {
  getConfig,
  getPackagesDir
};
