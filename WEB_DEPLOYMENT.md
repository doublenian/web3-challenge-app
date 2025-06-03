# Web3 Challenge App - Web部署指南

## 🌐 Web部署方式

### 方法1: Expo托管 (最简单)

Expo提供免费的Web托管服务，自动提供HTTPS和CDN。

```bash
# 构建并发布到Expo托管
npx expo export:web
npx expo publish:web
```

**优点:**
- 免费且简单
- 自动HTTPS和CDN
- 与Expo生态系统集成
- 自动更新

**访问地址:** `https://web3-challenge-app.doublenian.xie.expo.dev`

### 方法2: 静态网站托管

#### 2.1 Netlify部署

```bash
# 1. 构建静态文件
npm run web:build

# 2. 在Netlify中：
# - 拖拽 dist 文件夹到 netlify.com
# - 或者连接GitHub仓库自动部署
```

**Netlify配置文件 (netlify.toml):**

```toml
[build]
  command = "npm run web:build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2.2 Vercel部署

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 部署
npx vercel --prod
```

**Vercel配置文件 (vercel.json):**

```json
{
  "buildCommand": "npm run web:build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 2.3 GitHub Pages部署

```bash
# 1. 构建
npm run web:build

# 2. 部署到gh-pages分支
npx gh-pages -d dist
```

### 方法3: 自托管服务器

```bash
# 1. 构建静态文件
npm run web:build

# 2. 上传dist文件夹内容到服务器
# 3. 配置Web服务器（Nginx/Apache）

# Nginx配置示例:
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🚀 快速部署命令

### Expo托管 (推荐)
```bash
# 一键部署
npm run deploy:web
```

### 本地预览
```bash
# 构建并本地预览
npm run web:build
npm run web:serve
# 访问 http://localhost:3000
```

### 构建优化
```bash
# 仅构建，不部署
npm run web:export
```

## 📦 部署配置

### 环境变量
如果需要环境变量，创建 `.env` 文件：

```env
EXPO_PUBLIC_API_URL=https://api.yourservice.com
EXPO_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### 自定义域名
对于Expo托管，可以在Expo Dashboard配置自定义域名。

### SEO优化
Web版本自动支持：
- Meta标签
- Open Graph
- 响应式设计
- PWA功能

## 🔧 Web特定配置

### PWA功能
应用已配置为PWA，支持：
- 离线缓存
- 安装到桌面
- 推送通知

### 浏览器兼容性
支持现代浏览器：
- Chrome 70+
- Firefox 70+
- Safari 12+
- Edge 79+

### 移动端优化
- 响应式设计
- 触摸友好界面
- 移动端性能优化

## 🎯 部署检查清单

- [ ] 测试所有功能在浏览器中正常工作
- [ ] 检查移动端响应式布局
- [ ] 验证加密功能在Web环境中正常
- [ ] 测试复制粘贴功能
- [ ] 检查PWA安装功能
- [ ] 验证所有导航正常工作

## 📊 性能监控

### 分析工具
- Expo Analytics (内置)
- Google Analytics
- Web Vitals

### 性能优化
- 代码分割已启用
- 图片懒加载
- 自动缓存策略

## 🛠️ 故障排除

### 常见问题

**1. 加密功能不工作**
- 确保在HTTPS环境下运行
- 检查Web Crypto API支持

**2. 复制粘贴失败**
- 需要HTTPS或localhost
- 检查Clipboard API权限

**3. 响应式问题**
- 测试不同屏幕尺寸
- 检查CSS媒体查询

**4. 路由问题**
- 配置服务器重定向规则
- 确保SPA路由正常

## 📱 Web版本特色

### 桌面端优化
- 键盘快捷键支持
- 拖拽功能
- 右键菜单

### 移动端优化
- 触摸手势
- 移动端UI适配
- 性能优化

### 跨平台功能
- 统一的UI/UX
- 相同的加密功能
- 数据同步支持 