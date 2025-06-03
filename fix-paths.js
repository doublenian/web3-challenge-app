const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复GitHub Pages路径...');

// 修复 index.html 中的路径
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  console.log('📄 正在修复 index.html...');
  
  // 将绝对路径改为GitHub Pages子路径
  content = content.replace(/href="\/([^"]*)"/, 'href="/web3-challenge-app/$1"');
  content = content.replace(/src="\/([^"]*)"/, 'src="/web3-challenge-app/$1"');
  content = content.replace(/href="\/_expo/g, 'href="/web3-challenge-app/_expo');
  content = content.replace(/src="\/_expo/g, 'src="/web3-challenge-app/_expo');
  content = content.replace(/href="\/favicon/g, 'href="/web3-challenge-app/favicon');
  content = content.replace(/src="\/favicon/g, 'src="/web3-challenge-app/favicon');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ index.html 路径修复完成');
} else {
  console.log('❌ 找不到 index.html 文件');
}

console.log('🎉 GitHub Pages路径修复完成！');
console.log('📝 现在资源使用GitHub Pages子路径，应该可以正常工作了。'); 