const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log("Running local configuration tests...");

// 1. Load frontend/app.js and inspect the translations mapping
try {
  const appCode = fs.readFileSync(path.join(__dirname, 'frontend', 'app.js'), 'utf8');
  
  // Extract translations block using simple parsing
  const transMatch = appCode.match(/const translations = ({[\s\S]*?});/);
  if (!transMatch) {
    throw new Error("Could not parse translations block from app.js");
  }
  
  // Evaluate the extracted translations dictionary safely
  const translations = new Function(`return ${transMatch[1]}`)();
  
  // Test translation coverage
  const enKeys = Object.keys(translations.en);
  const languages = ['es', 'fr', 'loc'];
  
  languages.forEach(lang => {
    assert.ok(translations[lang], `Language '${lang}' dictionary should exist.`);
    enKeys.forEach(key => {
      assert.ok(translations[lang][key], `Missing translation key '${key}' in language '${lang}'.`);
    });
  });
  
  console.log(`✓ Translation Integrity: All ${enKeys.length} keys validated across languages ES, FR, and LOC.`);
  
} catch (err) {
  console.error("FAIL: Translation config test failed.");
  console.error(err);
  process.exit(1);
}

// 2. Validate HTML file structure and script inclusions in frontend
try {
  const htmlContent = fs.readFileSync(path.join(__dirname, 'frontend', 'index.html'), 'utf8');
  assert.ok(htmlContent.includes('<script src="app.js"></script>'), "index.html must load app.js");
  assert.ok(htmlContent.includes('id="threejs-canvas-wrapper"'), "index.html must have 3D canvas wrapper");
  assert.ok(htmlContent.includes('id="scenario-selector"'), "index.html must have scenario selector");
  assert.ok(htmlContent.includes('id="btn-run-diagnostics"'), "index.html must have diagnostics run button");
  
  console.log("✓ HTML Structure: Essential script links, 3D canvas wrappers, and UI buttons are verified.");
} catch (err) {
  console.error("FAIL: HTML structure verification failed.");
  console.error(err);
  process.exit(1);
}

console.log("\nALL TESTS PASSED SUCCESSFULLY! 🚀");
