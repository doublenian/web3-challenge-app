# 🚀 快速部署指南

## GitHub Pages部署 (推荐)

```bash
# 一键部署到GitHub Pages
npm run deploy:github
```

这个命令会自动：
1. ✅ 清理旧文件
2. ✅ 构建Web版本  
3. ✅ 修复GitHub Pages路径
4. ✅ 扁平化assets目录
5. ✅ 自动部署到gh-pages分支

**访问地址:** https://doublenian.github.io/web3-challenge-app

## EAS构建 自动化pipeline构建android
```
npm run build:android
```