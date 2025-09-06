import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "src");

// Regex للتعليقات
const regex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm;

// دالة تمسح التعليقات من نص
function stripComments(content) {
  return content.replace(regex, "");
}

// دالة تمشي على الملفات جوه src
function processDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDir(fullPath); // Recursive
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let newContent = stripComments(content);
      fs.writeFileSync(fullPath, newContent, "utf-8");
      console.log(`✅ stripped: ${fullPath}`);
    }
  }
}

processDir(srcDir);