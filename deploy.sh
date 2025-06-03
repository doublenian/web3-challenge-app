#!/bin/bash

echo "🚀 Web3 Challenge App - EAS部署脚本"
echo "=================================="

# 检查是否已登录
if ! npx eas whoami > /dev/null 2>&1; then
    echo "📱 请先登录Expo账户..."
    npx eas login
fi

# 检查项目是否已初始化
if grep -q "your-project-id-will-be-here" app.json; then
    echo "🔧 初始化EAS项目..."
    npx eas init
fi

echo ""
echo "选择构建类型:"
echo "1. 开发版本 (Development)"
echo "2. 预览版本 (Preview) - 推荐用于测试"
echo "3. 生产版本 (Production)"
echo "4. Android预览版本"
echo "5. iOS预览版本"
echo ""

read -p "请选择 (1-5): " choice

case $choice in
    1)
        echo "🔨 构建开发版本..."
        npx eas build --profile development
        ;;
    2)
        echo "🔨 构建预览版本 (所有平台)..."
        npx eas build --profile preview --platform all
        ;;
    3)
        echo "🔨 构建生产版本..."
        npx eas build --profile production --platform all
        ;;
    4)
        echo "🔨 构建Android预览版本..."
        npx eas build --profile preview --platform android
        ;;
    5)
        echo "🔨 构建iOS预览版本..."
        npx eas build --profile preview --platform ios
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "✅ 构建已启动！"
echo "📊 查看构建状态: https://expo.dev"
echo "📱 构建完成后您将收到邮件通知" 