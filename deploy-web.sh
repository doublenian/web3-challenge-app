#!/bin/bash

echo "🌐 Web3 Challenge App - Web部署脚本"
echo "=================================="

echo ""
echo "选择Web部署方式:"
echo "1. 本地预览 (localhost:3000)"
echo "2. 构建静态文件 (用于手动部署)"
echo "3. Netlify部署 (需要先配置)"
echo "4. Vercel部署 (需要先配置)"
echo "5. 显示部署指南"
echo ""

read -p "请选择 (1-5): " choice

case $choice in
    1)
        echo "🔨 构建Web应用..."
        npm run web:build
        if [ $? -eq 0 ]; then
            echo "🚀 启动本地服务器..."
            echo "📱 访问地址: http://localhost:3000"
            npx serve dist --listen 3000
        else
            echo "❌ 构建失败"
        fi
        ;;
    2)
        echo "🔨 构建静态文件..."
        npm run web:build
        if [ $? -eq 0 ]; then
            echo "✅ 构建成功！"
            echo "📂 静态文件位置: ./dist/"
            echo "🚀 您可以将dist文件夹内容上传到任何静态网站托管服务"
            echo ""
            echo "支持的托管平台:"
            echo "- Netlify: 拖拽dist文件夹到netlify.com"
            echo "- Vercel: 使用vercel命令部署"
            echo "- GitHub Pages: 上传到gh-pages分支"
            echo "- Firebase Hosting: firebase deploy"
            echo "- 自己的服务器: 上传到Web根目录"
        else
            echo "❌ 构建失败"
        fi
        ;;
    3)
        echo "🔨 准备Netlify部署..."
        npm run web:build
        if [ $? -eq 0 ]; then
            echo "✅ 构建成功！"
            echo "📋 Netlify部署步骤:"
            echo "1. 访问 https://netlify.com"
            echo "2. 拖拽 ./dist 文件夹到部署区域"
            echo "3. 或者使用Netlify CLI: netlify deploy --prod --dir=dist"
            echo ""
            echo "⚙️  配置文件已准备: netlify.toml"
        else
            echo "❌ 构建失败"
        fi
        ;;
    4)
        echo "🔨 准备Vercel部署..."
        npm run web:build
        if [ $? -eq 0 ]; then
            echo "✅ 构建成功！"
            echo "📋 Vercel部署步骤:"
            echo "1. 安装Vercel CLI: npm install -g vercel"
            echo "2. 运行: vercel --prod"
            echo "3. 或者访问 https://vercel.com 连接GitHub仓库"
            echo ""
            echo "⚙️  配置文件已准备: vercel.json"
        else
            echo "❌ 构建失败"
        fi
        ;;
    5)
        echo "📖 打开详细部署指南..."
        if command -v open &> /dev/null; then
            open WEB_DEPLOYMENT.md 2>/dev/null || echo "请查看 WEB_DEPLOYMENT.md 文件"
        else
            echo "请查看 WEB_DEPLOYMENT.md 文件获取详细部署指南"
        fi
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac 