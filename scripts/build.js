const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);
for(const name of ['index.html','assets','landing-1-saas-moderno','landing-2-ecommerce'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
console.log('Built two design demos and commercial homepage; archive excluded.');
