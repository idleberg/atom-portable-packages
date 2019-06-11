export default {
  compressionType: {
    title: 'Compression Type',
    description: 'Specify the default compression type',
    type: 'string',
    default: 'DEFLATE',
    enum: [
    'STORE',
    'DEFLATE',
    ],
    order: 1
  },
  compressionLevel: {
    title: 'Compression Level',
    description: 'Specify the default compression level for `DEFLATE`',
    type: 'number',
    default: 6,
    minimum: 1,
    maximum: 9,
    order: 2
  },
  ignoreFile: {
    title: 'Ignore File',
    description: 'Specify which kind of ignore file to consider for packaging. Take not that global `.gitignore` files will not be taken into account.',
    type: 'string',
    default: '.atomignore',
    enum: [
    '.atomignore',
    '.gitignore',
    '.npmignore',
    ],
    order: 3
  },
  revealFile: {
    title: 'Reveal Package',
    description: 'Reveal package after its creation',
    type: 'boolean',
    default: true,
    order: 4
  },
};
