const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复GitHub Pages路径...');

// 修复 index.html 中的路径
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  console.log('📄 正在修复 index.html...');
  
  // 替换所有绝对路径为相对路径
  content = content.replace(/href="\/([^"]*)"/, 'href="./$1"');
  content = content.replace(/src="\/([^"]*)"/, 'src="./$1"');
  content = content.replace(/href="\/_expo/g, 'href="./_expo');
  content = content.replace(/src="\/_expo/g, 'src="./_expo');
  content = content.replace(/href="\/favicon/g, 'href="./favicon');
  content = content.replace(/src="\/favicon/g, 'src="./favicon');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ index.html 路径修复完成');
} else {
  console.log('❌ 找不到 index.html 文件');
}

console.log('🎉 GitHub Pages路径修复完成！');
console.log('📝 现在资源使用相对路径，应该可以在GitHub Pages上正常工作了。'); 