import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'CleverBiz',
    executableName: 'cleverbiz',
    asar: {
      // Don't unpack these — they're native Node modules
      unpackDir: 'node_modules/better-sqlite3',
    },
    icon: './assets/icon',
    appBundleId: 'com.cleverlabs.cleverbiz',
    win32metadata: {
      CompanyName: 'Clever Labs',
      FileDescription: 'CleverBiz — Smart POS & Business Operations Platform',
      OriginalFilename: 'CleverBiz.exe',
    },
    osxSign: {},
    osxNotarize: {},
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: 'cleverbiz',
      setupIcon: './assets/icon.ico',
      noMsi: true,
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({
      options: {
        icon: './assets/icon.png',
      },
    }),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    new AutoUnpackNativesPlugin(),
  ],
};

export default config;
