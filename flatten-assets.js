const fs = require('fs');
const path = require('path');

console.log('📁 开始扁平化assets目录...');

const distPath = path.join(__dirname, 'dist');
const assetsPath = path.join(distPath, 'assets');
const staticPath = path.join(distPath, 'static');

// 存储原始路径到新路径的映射
const pathMappings = new Map();

function flattenAssets() {
  if (!fs.existsSync(assetsPath)) {
    console.log('❌ assets目录不存在');
    return;
  }

  // 1. 收集所有需要移动的文件
  const filesToMove = [];
  
  function collectFiles(dir, basePath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);
      
      if (item.isDirectory()) {
        collectFiles(fullPath, relativePath);
      } else if (item.name.endsWith('.ttf') || item.name.endsWith('.png')) {
        filesToMove.push({
          originalPath: fullPath,
          relativePath: relativePath,
          fileName: item.name
        });
      }
    });
  }
  
  collectFiles(assetsPath);
  console.log(`📊 找到 ${filesToMove.length} 个资源文件需要扁平化`);
  
  // 2. 移动文件到assets根目录
  filesToMove.forEach(file => {
    const newPath = path.join(assetsPath, file.fileName);
    
    // 检查是否有文件名冲突
    if (fs.existsSync(newPath) && newPath !== file.originalPath) {
      console.log(`⚠️  文件名冲突，跳过: ${file.fileName}`);
      return;
    }
    
    try {
      // 如果不是同一个文件，则移动
      if (newPath !== file.originalPath) {
        fs.copyFileSync(file.originalPath, newPath);
        console.log(`✅ 移动: ${file.fileName}`);
      }
      
      // 记录路径映射
      const oldRelativePath = './assets/' + file.relativePath;
      const newRelativePath = './assets/' + file.fileName;
      pathMappings.set(oldRelativePath, newRelativePath);
      
    } catch (err) {
      console.log(`❌ 移动文件失败 ${file.fileName}: ${err.message}`);
    }
  });
  
  // 3. 清理空的node_modules目录结构
  try {
    const nodeModulesPath = path.join(assetsPath, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      console.log('✅ 已清理node_modules目录结构');
    }
  } catch (err) {
    console.log(`⚠️  清理目录时出现问题: ${err.message}`);
  }
}

// 4. 更新JS和CSS文件中的路径引用
function updatePathReferences() {
  if (!fs.existsSync(staticPath)) {
    console.log('❌ static目录不存在');
    return;
  }
  
  console.log('📝 更新JS和CSS文件中的路径引用...');
  
  function updateFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        updateFiles(fullPath);
      } else if (file.name.endsWith('.js') || file.name.endsWith('.css')) {
        try {
          let content = fs.readFileSync(fullPath, 'utf8');
          const originalContent = content;
          
          // 更新路径引用
          pathMappings.forEach((newPath, oldPath) => {
            // 处理各种引用模式
            const escapedOldPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // 替换完整的路径引用
            content = content.replace(new RegExp(escapedOldPath, 'g'), newPath);
            
            // 处理可能的长路径引用
            const longPath = oldPath.replace('./assets/', './assets/node_modules/');
            const escapedLongPath = longPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            content = content.replace(new RegExp(escapedLongPath, 'g'), newPath);
          });
          
          // 通用的node_modules路径清理
          content = content.replace(/\.\/assets\/node_modules\/@expo\/vector-icons\/build\/vendor\/react-native-vector-icons\/Fonts\//g, './assets/');
          content = content.replace(/\.\/assets\/node_modules\/@react-navigation\/elements\/lib\/module\/assets\//g, './assets/');
          
          if (content !== originalContent) {
            fs.writeFileSync(fullPath, content);
            console.log(`✅ 更新了文件: ${path.relative(distPath, fullPath)}`);
          }
        } catch (err) {
          console.log(`❌ 更新文件失败 ${fullPath}: ${err.message}`);
        }
      }
    });
  }
  
  updateFiles(staticPath);
}

// 执行扁平化
flattenAssets();
updatePathReferences();

console.log('🎉 assets目录扁平化完成！');
console.log(`📋 路径映射数量: ${pathMappings.size}`);
console.log('📝 所有字体和图片文件现在都在assets根目录下。'); 