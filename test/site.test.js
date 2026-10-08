const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
test('complete static pages have valid local links and no simulated actions',()=>{
 const root=path.resolve('dist');assert.equal(fs.existsSync('dist/archive'),false);
 for(const name of ['index.html','landing-1-saas-moderno/index.html','landing-2-ecommerce/index.html']){
 const file=path.join(root,name),html=fs.readFileSync(file,'utf8');assert.match(html,/<\/body><\/html>|<\/body>\s*<\/html>/);assert.doesNotMatch(html,/<script|\sonclick=|localhost:|127\.0\.0\.1/);assert.equal((html.match(/<h1\b/g)||[]).length,1);
 if(name!=='index.html'){assert.match(html,/noindex/);assert.match(html,/DEMO VISUAL/);for(const button of html.matchAll(/<button\b[^>]*>/g))assert.match(button[0],/disabled/);}
 for(const [,href]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 if(/^(https?:|mailto:)/.test(href))continue;
 if(href.startsWith('#')){assert.ok(html.includes(`id="${href.slice(1)}"`),href);continue;}
 const target=path.resolve(path.dirname(file),href);assert.ok(target===root||target.startsWith(root+path.sep));assert.ok(fs.existsSync(target),`${name}: ${href}`);
 }
 }
});
