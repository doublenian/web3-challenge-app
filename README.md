# Web3 Challenge App

A React Native Expo application for cryptographic message signing and verification using SHA-256 hashing and Ed25519 digital signatures.

## Features

- **Crypto Signature**: SHA-256 hashing + Ed25519 digital signatures
- **Hash Verification**: Verify message SHA-256 hashes
- **Profile Modal**: Banking savings products showcase interface
- **Copy/Paste Support**: Easy copying and pasting of hashes and signatures
- **Dual Tab Navigation**: Sign and Verify functionality

## Tech Stack

- React Native + Expo SDK 53
- TypeScript
- Gluestack UI + NativeWind (Tailwind CSS)
- TweetNaCl for Ed25519 cryptography
- CryptoJS for SHA-256 hashing
- React Navigation for bottom tab navigation

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Deployment

#### Mobile App (EAS)

```bash
# Run interactive deployment script
./deploy.sh

# Or manual commands
npx eas login
npx eas init
npm run build:preview
```

#### Web Deployment

```bash
# Run interactive web deployment script
./deploy-web.sh

# Or manual commands
npm run web:build          # Build static files
npm run web:serve          # Local preview
npm run deploy:web         # Clean build
```

**Web Deployment Options:**
1. **Local Preview**: `http://localhost:3000`
2. **Netlify**: Drag `dist` folder to netlify.com
3. **Vercel**: Run `vercel --prod`
4. **GitHub Pages**: Upload to gh-pages branch
5. **Firebase**: Use `firebase deploy`

## Project Structure

```
expo-app/
├── App.tsx                    # Main app with navigation
├── screens/
│   ├── InputScreen.tsx        # Message signing screen
│   └── VerifyScreen.tsx       # Hash verification screen
├── components/
│   └── ProfileModal.tsx       # Banking products modal
├── eas.json                   # EAS build configuration
├── app.json                   # Expo configuration
├── deploy.sh                  # Mobile deployment script
├── deploy-web.sh              # Web deployment script
├── netlify.toml               # Netlify configuration
├── vercel.json                # Vercel configuration
├── DEPLOYMENT.md              # Mobile deployment guide
└── WEB_DEPLOYMENT.md          # Web deployment guide
```

## Build Profiles

### Mobile (EAS)
- **development**: Development build with debugging tools
- **preview**: Internal testing build with installable APK/IPA
- **production**: App store ready build

### Web
- **Static Build**: Optimized static files for hosting
- **PWA Support**: Progressive Web App capabilities
- **Responsive**: Mobile and desktop optimized

## App Bundle Identifiers

- **Android**: `com.web3challenge.app`
- **iOS**: `com.web3challenge.app`
- **Web**: Hosted on various platforms

## Deployment Options

### Mobile Platforms
1. **EAS Build**: Cloud builds for iOS and Android
2. **Preview Links**: Direct installation links for testing
3. **App Store**: Production deployment to Google Play and App Store

### Web Platforms
1. **Netlify**: Automatic deployment with git integration
2. **Vercel**: Serverless platform with instant deployment
3. **GitHub Pages**: Free hosting for open source projects
4. **Firebase Hosting**: Google's web hosting service
5. **Self-hosted**: Deploy to your own server

## Documentation

- [Mobile Deployment Guide](./DEPLOYMENT.md) - Detailed EAS deployment instructions
- [Web Deployment Guide](./WEB_DEPLOYMENT.md) - Comprehensive web deployment guide
- [Expo Documentation](https://docs.expo.dev)
- [EAS Documentation](https://docs.expo.dev/eas/)

## Security Features

- Ed25519 digital signatures for message authentication
- SHA-256 cryptographic hashing
- Client-side key generation and signing
- No server-side key storage
- HTTPS-ready for web deployment

## Cross-Platform Compatibility

- **Mobile**: iOS 12+, Android 8+
- **Web**: Chrome 70+, Firefox 70+, Safari 12+, Edge 79+
- **Desktop**: Responsive web design for larger screens

## License

MIT License 