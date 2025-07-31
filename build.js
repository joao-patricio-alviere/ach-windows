const { build } = require('electron-builder');
const path = require('path');

const buildOptions = {
  config: {
    appId: 'com.achtracker.app',
    productName: 'ACH Window Tracker',
    directories: {
      output: 'dist'
    },
    files: [
      'main.js',
      'index.html',
      'style.css',
      'app.js',
      'package.json'
    ],
    mac: {
      category: 'public.app-category.finance',
      target: [
        {
          target: 'dmg',
          arch: ['x64', 'arm64']
        }
      ]
    },
    win: {
      target: [
        {
          target: 'nsis',
          arch: ['x64']
        }
      ]
    },
    linux: {
      target: [
        {
          target: 'AppImage',
          arch: ['x64']
        }
      ]
    }
  }
};

console.log('Building ACH Window Tracker for current platform...');

build(buildOptions)
  .then(() => {
    console.log('Build completed successfully!');
    console.log('Check the dist/ directory for your application.');
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });