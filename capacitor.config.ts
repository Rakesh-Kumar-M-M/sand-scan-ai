import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8eb92ecb59d444cd8c9468df5f981e4d',
  appName: 'sand-scan-ai',
  webDir: 'dist',
  server: {
    url: 'https://8eb92ecb-59d4-44cd-8c94-68df5f981e4d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;