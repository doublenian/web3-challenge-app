const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复GitHub Pages路径并重组目录结构...');

const distPath = path.join(__dirname, 'dist');
const expoPath = path.join(distPath, '_expo');
const staticPath = path.join(distPath, 'static');

// 1. 移动 _expo/static 到 static
if (fs.existsSync(expoPath)) {
  const expoStaticPath = path.join(expoPath, 'static');
  
  if (fs.existsSync(expoStaticPath)) {
    console.log('📁 正在移动 _expo/static 到 static...');
    
    // 如果static目录已存在，先删除
    if (fs.existsSync(staticPath)) {
      fs.rmSync(staticPath, { recursive: true, force: true });
    }
    
    // 移动目录
    fs.renameSync(expoStaticPath, staticPath);
    console.log('✅ 目录移动完成');
    
    // 删除空的_expo目录
    try {
      fs.rmSync(expoPath, { recursive: true, force: true });
      console.log('✅ 已删除空的 _expo 目录');
    } catch (err) {
      console.log('⚠️  删除 _expo 目录时出现问题:', err.message);
    }
  }
}

// 2. 修复 index.html 中的路径
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  console.log('📄 正在修复 index.html...');
  
  // 将绝对路径改为相对路径
  content = content.replace(/href="\/([^"]*)"/, 'href="./$1"');
  content = content.replace(/src="\/([^"]*)"/, 'src="./$1"');
  
  // 将 _expo/static 路径改为 static
  content = content.replace(/_expo\/static/g, 'static');
  content = content.replace(/\/_expo\/static/g, '/static');
  
  // 修改为static路径而不是_expo路径
  content = content.replace(/href="\/static/g, 'href="./static');
  content = content.replace(/src="\/static/g, 'src="./static');
  content = content.replace(/href="\/favicon/g, 'href="./favicon');
  content = content.replace(/src="\/favicon/g, 'src="./favicon');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ index.html 路径修复完成');
} else {
  console.log('❌ 找不到 index.html 文件');
}

// 3. 修复 JS 和 CSS 文件中的资源路径
function fixAssetsPathsInFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      fixAssetsPathsInFiles(fullPath);
    } else if (file.name.endsWith('.js') || file.name.endsWith('.css')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;
        
        // 更全面的路径修复
        // 1. 修复基本的绝对路径
        content = content.replace(/(['":])\s*\/assets\//g, '$1./assets/');
        
        // 2. 修复模块引用中的路径
        content = content.replace(/([=])\s*"\/assets\//g, '$1"./assets/');
        content = content.replace(/([=])\s*'\/assets\//g, "$1'./assets/");
        
        // 3. 修复重复的./assets路径
        content = content.replace(/\.\/assets\/.*?\.\/assets\//g, match => {
          // 移除重复的./assets部分
          const parts = match.split('./assets/');
          return './assets/' + parts[parts.length - 1];
        });
        
        // 4. 处理各种引号包围的绝对路径
        content = content.replace(/("|\')\/assets\//g, '$1./assets/');
        
        // 5. 特殊处理uri字段
        content = content.replace(/uri:\s*"\/assets\//g, 'uri:"./assets/');
        content = content.replace(/uri:\s*'\/assets\//g, "uri:'./assets/");
        
        // 如果内容有变化，写回文件
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`✅ 修复了文件: ${path.relative(distPath, fullPath)}`);
        }
      } catch (err) {
        console.log(`❌ 修复文件时出错 ${fullPath}: ${err.message}`);
      }
    }
  });
}

console.log('📁 正在修复JS和CSS文件中的资源路径...');
fixAssetsPathsInFiles(staticPath);

console.log('🎉 GitHub Pages路径修复和目录重组完成！');
console.log('📝 现在资源使用相对路径，并且直接使用static目录而不是_expo目录。'); 