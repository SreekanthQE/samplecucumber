// Script to extract all unique Cucumber tags from .feature files and output to cucumber-tags.json
// Usage: node scripts/extract-cucumber-tags.cjs

const fs = require('fs');
const path = require('path');

const FEATURES_DIR = path.join(__dirname, '../src/features');
const OUTPUT_FILE = path.join(__dirname, '../cucumber-tags.json');

function extractTagsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const tagRegex = /@(\w[\w-]*)/g;
  const tags = new Set();
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    tags.add(match[1]);
  }
  return tags;
}

function getAllFeatureFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.feature'))
    .map(f => path.join(dir, f));
}

function main() {
  const files = getAllFeatureFiles(FEATURES_DIR);
  const allTags = new Set();
  files.forEach(file => {
    extractTagsFromFile(file).forEach(tag => allTags.add(tag));
  });
  const tagList = Array.from(allTags).sort();
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ tags: tagList }, null, 2));
  console.log(`Extracted tags: ${tagList.join(', ')}`);
  console.log(`Written to ${OUTPUT_FILE}`);
}

main();
