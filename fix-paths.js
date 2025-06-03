const fs = require('fs');
const path = require('path');

// 修复 index.html 中的路径
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 将绝对路径改为相对路径
  content = content.replace(/href="\/([^"]*)"/, 'href="./$1"');
  content = content.replace(/src="\/([^"]*)"/, 'src="./$1"');
  content = content.replace(/href="\/_expo/g, 'href="./_expo');
  content = content.replace(/src="\/_expo/g, 'src="./_expo');
  content = content.replace(/href="\/favicon/g, 'href="./favicon');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ 已修复 index.html 中的路径');
} else {
  console.log('❌ 找不到 index.html 文件');
}

console.log('🎉 路径修复完成！'); 