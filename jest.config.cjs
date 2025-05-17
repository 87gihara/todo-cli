/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'], // *.js を ESM 扱い
  transform: {},                   // 余計な Babel 変換をしない
};
