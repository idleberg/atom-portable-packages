const getConfig = (key?: string) => {
  if (key) {
    return atom.config.get(`portable-packages.${key}`);
  }

  return atom.config.get('portable-packages');
};

export {
  getConfig
};
