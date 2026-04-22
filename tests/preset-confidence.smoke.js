const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(repoRoot, 'app.main.modular.js'), 'utf8');

assert(source.includes("React.createElement('option',{value:'production'},'Production Only')"), 'Expected Production preset option');
assert(source.includes("React.createElement('option',{value:'api'},'API Surface Only')"), 'Expected API preset option');
assert(source.includes("React.createElement('option',{value:'recent'},'Recently Changed')"), 'Expected Recently Changed preset option');
assert(source.includes("className:'preset-hint'"), 'Expected preset help hint UI');
assert(source.includes('getPresetHelpText('), 'Expected preset help text helper');
assert(source.includes('buildPresetNoMatchMessage('), 'Expected no-match preset message helper');
assert(source.includes('presetMeta'), 'Expected preset metadata wiring in analysis payload');
assert(source.includes("rightTab==='findings'"), 'Expected consolidated Findings tab rendering');
assert(source.includes("setRightTab('findings')"), 'Expected Findings tab navigation wiring');

['issue', 'pattern', 'security', 'suggestion'].forEach((kind) => {
  assert(source.includes("getFindingSignal('" + kind + "'"), `Expected finding signal usage for ${kind}`);
});

assert(source.includes('Strong Signal'), 'Expected Strong Signal confidence label');
assert(source.includes('Static Estimate'), 'Expected Static Estimate confidence label');
assert(source.includes("'aria-label':'Finding search'"), 'Expected finding search control');
assert(source.includes("'aria-label':'Finding priority filter'"), 'Expected finding priority filter control');
assert(source.includes("'aria-label':'Finding confidence filter'"), 'Expected finding confidence filter control');
assert(source.includes('filterFindingList('), 'Expected reusable finding filter helper');
assert(source.includes('discoveryIssues'), 'Expected findings snapshot filtering state');

// Zero-cost enrichment wiring checks
assert(source.includes('Parser.detectTechDebt(analyzed)'), 'Expected tech debt detection call');
assert(source.includes('Parser.detectChurnHotspots(analyzed)'), 'Expected churn hotspot detection call');
assert(source.includes('Parser.detectDependencyRisks(analyzed)'), 'Expected dependency risk detection call');
assert(source.includes('techDebt:techDebt'), 'Expected techDebt in data object');
assert(source.includes('churnHotspots:churnHotspots'), 'Expected churnHotspots in data object');
assert(source.includes('depRisks:depRisks'), 'Expected depRisks in data object');
assert(source.includes('commitMessages:commitMsgs'), 'Expected commit messages stored on analyzed files');

// Parser module checks
const parserSource = fs.readFileSync(path.join(repoRoot, 'app.parser.modular.js'), 'utf8');
assert(parserSource.includes('detectTechDebt:function'), 'Expected detectTechDebt function in parser');
assert(parserSource.includes('detectChurnHotspots:function'), 'Expected detectChurnHotspots function in parser');
assert(parserSource.includes('detectDependencyRisks:function'), 'Expected detectDependencyRisks function in parser');
assert(parserSource.includes('SSRF Risk'), 'Expected SSRF security pattern');
assert(parserSource.includes('Path Traversal Risk'), 'Expected path traversal security pattern');
assert(parserSource.includes('Open Redirect Risk'), 'Expected open redirect security pattern');
assert(parserSource.includes('Permissive CORS'), 'Expected CORS misconfiguration pattern');
assert(parserSource.includes('Insecure Deserialization'), 'Expected insecure deserialization pattern');
assert(parserSource.includes('Environment File in Repo'), 'Expected .env file detection pattern');
assert(parserSource.includes('knownVulnerable'), 'Expected known vulnerable package list');
assert(parserSource.includes("'Stabilize Churn Hotspots'"), 'Expected churn hotspot suggestion');
assert(parserSource.includes("'Fix Dependency Vulnerabilities'"), 'Expected dependency risk suggestion');

// P5+P6: Community profile and contributor/bus factor checks
const ghSource = fs.readFileSync(path.join(repoRoot, 'app.github.modular.js'), 'utf8');
assert(ghSource.includes('getCommunityProfile:function'), 'Expected getCommunityProfile API method');
assert(ghSource.includes('getContributors:function'), 'Expected getContributors API method');
assert(ghSource.includes('getLanguages:function'), 'Expected getLanguages API method');
assert(ghSource.includes('/community/profile'), 'Expected community profile endpoint');
assert(ghSource.includes('/contributors'), 'Expected contributors endpoint');
assert(ghSource.includes('/languages'), 'Expected languages endpoint');
assert(parserSource.includes('analyzeRepoHealth:function'), 'Expected analyzeRepoHealth function in parser');
assert(parserSource.includes('analyzeBusFactor:function'), 'Expected analyzeBusFactor function in parser');
assert(parserSource.includes("'Bus Factor = 1'"), 'Expected bus factor critical issue');
assert(parserSource.includes('Missing Community Files'), 'Expected missing community files issue');
assert(parserSource.includes("'Improve Repository Health'"), 'Expected repo health suggestion');
assert(parserSource.includes("'Reduce Knowledge Concentration'"), 'Expected bus factor suggestion');
assert(source.includes('communityPromise'), 'Expected community API call fired in parallel');
assert(source.includes('contributorsPromise'), 'Expected contributors API call fired in parallel');
assert(source.includes('repoHealth:repoHealth'), 'Expected repoHealth in data object');
assert(source.includes('busFactor:busFactor'), 'Expected busFactor in data object');
assert(source.includes('ghLanguages:ghLanguages'), 'Expected ghLanguages in data object');

// P2: GitHub Languages preference over extension inference
assert(source.includes("source:'github'"), 'Expected GitHub language source marker');
assert(source.includes('ghLangKeys'), 'Expected ghLanguages preference logic');

// P8: GitHub security alert APIs and parsing
assert(ghSource.includes('getCodeScanningAlerts:function'), 'Expected getCodeScanningAlerts API method');
assert(ghSource.includes('getDependabotAlerts:function'), 'Expected getDependabotAlerts API method');
assert(ghSource.includes('getSecretScanningAlerts:function'), 'Expected getSecretScanningAlerts API method');
assert(ghSource.includes('/code-scanning/alerts'), 'Expected code scanning endpoint');
assert(ghSource.includes('/dependabot/alerts'), 'Expected dependabot endpoint');
assert(ghSource.includes('/secret-scanning/alerts'), 'Expected secret scanning endpoint');
assert(ghSource.includes("reason:'No auth token'"), 'Expected graceful fallback when no token');
assert(parserSource.includes('parseSecurityAlerts:function'), 'Expected parseSecurityAlerts function in parser');
assert(parserSource.includes("source:'github-code-scanning'"), 'Expected CodeQL source tag');
assert(parserSource.includes("source:'github-dependabot'"), 'Expected Dependabot source tag');
assert(parserSource.includes("source:'github-secret-scanning'"), 'Expected secret scanning source tag');
assert(parserSource.includes("'Resolve GitHub Security Alerts'"), 'Expected GitHub alerts suggestion');
assert(source.includes('codeScanPromise'), 'Expected code scan API call fired in parallel');
assert(source.includes('dependabotPromise'), 'Expected dependabot API call fired in parallel');
assert(source.includes('secretScanPromise'), 'Expected secret scan API call fired in parallel');
assert(source.includes('ghAlerts:ghAlerts'), 'Expected ghAlerts in data object');
assert(source.includes('ghAlertCount'), 'Expected ghAlertCount in stats');

console.log('Preset filtering + confidence label smoke checks passed');
console.log('Zero-cost enrichment smoke checks passed');
console.log('P5+P6 repo health + bus factor smoke checks passed');
console.log('P2 GitHub languages + P8 security alerts smoke checks passed');

// Feature 2: Features modal
assert(source.includes('showFeatures'), 'Expected showFeatures state');
assert(source.includes('features-modal'), 'Expected features-modal CSS class');
assert(source.includes("setShowFeatures(true)"), 'Expected logo click opens features modal');
assert(source.includes('Architecture Analysis'), 'Expected architecture analysis feature card');
assert(source.includes('7 Visualizations'), 'Expected visualizations feature card');
assert(source.includes('Security Scanning'), 'Expected security scanning feature card');
assert(source.includes('Team Health'), 'Expected team health feature card');
assert(source.includes('Rich Export'), 'Expected rich export feature card');
assert(source.includes('feature-badge'), 'Expected feature technology badges');

// Feature 1+4: PDF export with graph capture
var exportSource = fs.readFileSync(path.join(repoRoot, 'app.main.export.modular.js'), 'utf8');
assert(exportSource.includes('captureSVGasPNG'), 'Expected SVG-to-PNG capture function');
assert(exportSource.includes('exportPDFHelper'), 'Expected PDF export helper function');
assert(exportSource.includes('canvas.toDataURL'), 'Expected canvas rasterization for graph capture');
assert(exportSource.includes('w2.document.write'), 'Expected HTML write for print-to-PDF');
assert(exportSource.includes('w2.print()'), 'Expected auto print trigger for PDF');
assert(exportSource.includes('chart-img'), 'Expected chart image embed in PDF HTML');
assert(exportSource.includes('page-break'), 'Expected page-break styling for multi-page PDF');
assert(exportSource.includes('function esc('), 'Expected HTML escape helper for XSS prevention');
assert(source.includes('exportPDF'), 'Expected exportPDF function in main');
assert(source.includes('getActiveVizRef'), 'Expected active viz ref getter for graph capture');
assert(source.includes('PDF Report'), 'Expected PDF option in export modal');

console.log('Feature 2 (features modal) + Feature 1+4 (PDF with graphs) smoke checks passed');

// UX improvements: branches, analysis source, PR tooltip, labels
assert(ghSource.includes('listBranches:function'), 'Expected listBranches API method');
assert(ghSource.includes('/branches?per_page=100'), 'Expected branches API endpoint');
assert(source.includes('fetchBranches'), 'Expected fetchBranches helper in main');
assert(source.includes('branches.map'), 'Expected branch dropdown rendering');
assert(source.includes('branch-select'), 'Expected branch-select CSS class');
assert(source.includes("'default branch'"), 'Expected default branch option text');
assert(source.includes('analysis-source-badge'), 'Expected analysis source badge');
assert(source.includes('local-badge'), 'Expected local folder badge');
assert(source.includes('PR Impact Analyzer'), 'Expected PR tooltip text');
assert(source.includes('suggested reviewers'), 'Expected PR tooltip describes reviewers');
assert(source.includes("placeholder:'owner/repo"), 'Expected improved repo input placeholder');

console.log('UX improvements (branches, source indicator, PR tooltip) smoke checks passed');
