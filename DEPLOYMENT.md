# Web3 Challenge App - EAS部署指南

## 先决条件

1. **Expo账户**: 创建或登录Expo账户
2. **EAS CLI**: 已经安装在项目中 (`npm install eas-cli --save-dev`)

## 部署步骤

### 1. 登录Expo账户

```bash
npx eas login
```

### 2. 初始化EAS项目

```bash
npx eas init
```

这将:
- 创建EAS项目
- 在`app.json`中设置项目ID
- 链接到您的Expo账户

### 3. 配置构建

项目已经配置了三个构建配置文件：

- **development**: 开发版本，包含开发工具
- **preview**: 预览版本，用于内部测试
- **production**: 生产版本，用于应用商店发布

### 4. 构建应用

#### 构建Android APK (预览版)
```bash
npm run build:preview -- --platform android
```

#### 构建iOS应用 (预览版)
```bash
npm run build:preview -- --platform ios
```

#### 构建生产版本
```bash
npm run build:production
```

#### 构建所有平台
```bash
npm run build:all
```

### 5. 下载构建结果

构建完成后，您可以：
1. 在EAS Dashboard查看构建状态: https://expo.dev
2. 下载APK/IPA文件
3. 获取安装链接分享给测试者

### 6. 发布到应用商店

#### Android (Google Play Store)
```bash
npm run submit:android
```

#### iOS (App Store)
```bash
npm run submit:ios
```

## 配置说明

### EAS配置 (`eas.json`)
- **development**: 用于开发和调试
- **preview**: 用于内部测试，生成可安装的APK/IPA
- **production**: 用于应用商店发布

### 应用标识符
- **Android包名**: `com.web3challenge.app`
- **iOS Bundle ID**: `com.web3challenge.app`

## 常用命令

| 命令 | 说明 |
|------|------|
| `npx eas build --platform android` | 构建Android应用 |
| `npx eas build --platform ios` | 构建iOS应用 |
| `npx eas build --profile development` | 构建开发版本 |
| `npx eas build --profile preview` | 构建预览版本 |
| `npx eas build --profile production` | 构建生产版本 |
| `npx eas submit` | 提交到应用商店 |
| `npx eas build:list` | 查看构建历史 |

## 应用功能

### 主要特性
- **加密签名**: SHA-256哈希 + Ed25519数字签名
- **签名验证**: 验证消息的SHA-256哈希
- **Profile Modal**: 银行储蓄产品展示界面
- **复制粘贴**: 支持哈希值和签名的复制粘贴
- **双Tab导航**: Sign和Verify两个主要功能

### 技术栈
- **React Native + Expo**
- **TypeScript**
- **Gluestack UI + NativeWind**
- **TweetNaCl**: Ed25519加密
- **CryptoJS**: SHA-256哈希
- **React Navigation**: 底部Tab导航

## 注意事项

1. **首次构建**: 可能需要较长时间
2. **iOS构建**: 需要Apple开发者账户
3. **Android密钥**: EAS会自动生成签名密钥
4. **版本管理**: 生产构建会自动递增版本号
5. **分发**: Preview构建可生成直接安装链接

## 故障排除

### 常见问题
- **登录失败**: 检查网络连接和账户凭据
- **构建失败**: 检查依赖版本兼容性
- **iOS构建**: 确保有有效的Apple开发者账户

### 获取帮助
- Expo文档: https://docs.expo.dev
- EAS文档: https://docs.expo.dev/eas/
- 社区论坛: https://forums.expo.dev 