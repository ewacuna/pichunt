import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pichunt.app',
  appName: 'PicHunt',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
