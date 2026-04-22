function captureSVGasPNG(svgEl,callback){
    if(!svgEl){callback(null);return;}
    try{
        var svgClone=svgEl.cloneNode(true);
        svgClone.setAttribute('xmlns','http://www.w3.org/2000/svg');
        var w=svgEl.clientWidth||svgEl.getBoundingClientRect().width||800;
        var h=svgEl.clientHeight||svgEl.getBoundingClientRect().height||600;
        svgClone.setAttribute('width',w);
        svgClone.setAttribute('height',h);
        // Inline computed styles for correct rasterization
        var cs=getComputedStyle(document.documentElement);
        var bg=cs.getPropertyValue('--bg1')||'#1a1a2e';
        var t1=cs.getPropertyValue('--t1')||'#e0e0e0';
        var acc=cs.getPropertyValue('--acc')||'#6c63ff';
        var styleEl=document.createElementNS('http://www.w3.org/2000/svg','style');
        styleEl.textContent='svg{background:'+bg+'}text{font-family:JetBrains Mono,monospace;fill:'+t1+';pointer-events:none}line,path{stroke-linecap:round}circle{stroke:'+bg+'}';
        svgClone.insertBefore(styleEl,svgClone.firstChild);
        var xml=new XMLSerializer().serializeToString(svgClone);
        var blob=new Blob([xml],{type:'image/svg+xml;charset=utf-8'});
        var url=URL.createObjectURL(blob);
        var img=new Image();
        img.onload=function(){
            var scale=2;
            var canvas=document.createElement('canvas');
            canvas.width=w*scale;
            canvas.height=h*scale;
            var ctx=canvas.getContext('2d');
            ctx.scale(scale,scale);
            ctx.fillStyle=bg;
            ctx.fillRect(0,0,w,h);
            ctx.drawImage(img,0,0,w,h);
            URL.revokeObjectURL(url);
            callback(canvas.toDataURL('image/png'));
        };
        img.onerror=function(){URL.revokeObjectURL(url);callback(null);};
        img.src=url;
    }catch(e){callback(null);}
}

function exportPDFHelper(chartPngDataUrl,data,repo,h,notify){
    // Build a self-contained HTML document for print-to-PDF
    var ts=new Date().toLocaleString();
    var grade=h.grade||'?';
    var score=h.score||0;
    var stats=data.stats||{};
    var langs=(stats.languages||[]).slice(0,8);
    var langBar=langs.map(function(l){return'<span style="display:inline-block;padding:2px 8px;background:'+
        (l.color||'#555')+';color:#fff;font-size:10px;border-radius:3px;margin:2px">'+l.name+' ('+l.pct+'%)</span>';}).join(' ');
    var html='<!DOCTYPE html><html><head><meta charset="utf-8"><title>Repo-Intel Report — '+repo+'</title>';
    html+='<style>';
    html+='*{margin:0;padding:0;box-sizing:border-box}';
    html+='body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,monospace;color:#1a1a2e;padding:40px 50px;font-size:12px;line-height:1.5}';
    html+='h1{font-size:22px;margin-bottom:4px}h2{font-size:15px;margin:24px 0 10px;border-bottom:2px solid #6c63ff;padding-bottom:4px}h3{font-size:12px;margin:12px 0 4px}';
    html+='.subtitle{color:#666;font-size:11px;margin-bottom:24px}';
    html+='.grade-ring{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;border:4px solid '+(score>=80?'#22c55e':score>=60?'#eab308':score>=40?'#f97316':'#ef4444')+';font-size:24px;font-weight:700;color:'+(score>=80?'#22c55e':score>=60?'#eab308':score>=40?'#f97316':'#ef4444')+';margin-right:16px}';
    html+='.summary-row{display:flex;align-items:center;margin-bottom:16px}';
    html+='.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}';
    html+='.stat-box{background:#f5f5ff;border:1px solid #e0e0e8;border-radius:6px;padding:10px;text-align:center}';
    html+='.stat-val{font-size:18px;font-weight:700;color:#6c63ff}.stat-lbl{font-size:9px;color:#666;text-transform:uppercase}';
    html+='.chart-img{max-width:100%;border:1px solid #e0e0e8;border-radius:6px;margin:12px 0}';
    html+='table{width:100%;border-collapse:collapse;font-size:10px;margin:8px 0}th,td{border:1px solid #ddd;padding:4px 8px;text-align:left}th{background:#f5f5ff;font-weight:600}';
    html+='.sev-high{color:#ef4444;font-weight:700}.sev-medium{color:#f97316}.sev-low{color:#22c55e}';
    html+='.suggestion{padding:8px 10px;background:#f5f5ff;border-left:3px solid #6c63ff;border-radius:4px;margin:6px 0;font-size:10px}';
    html+='.suggestion-critical{border-left-color:#ef4444}.suggestion-high{border-left-color:#f97316}';
    html+='.page-break{page-break-before:always}';
    html+='@media print{body{padding:20px 30px}h2{page-break-after:avoid}.chart-img{max-height:400px;object-fit:contain}}';
    html+='</style></head><body>';

    // Header
    html+='<h1>\u26a1 Repo-Intel Analysis Report</h1>';
    html+='<div class="subtitle">'+repo+' &mdash; '+ts+'</div>';

    // Health score + stats
    html+='<div class="summary-row"><div class="grade-ring">'+grade+'</div><div><div style="font-size:14px;font-weight:600">Health Score: '+score+'/100</div><div style="font-size:10px;color:#666">'+stats.files+' files \u00b7 '+stats.functions+' functions \u00b7 '+(stats.loc||0).toLocaleString()+' LOC</div></div></div>';
    html+='<div class="stats-grid">';
    html+='<div class="stat-box"><div class="stat-val">'+stats.connections+'</div><div class="stat-lbl">Dependencies</div></div>';
    html+='<div class="stat-box"><div class="stat-val">'+stats.dead+'</div><div class="stat-lbl">Unused Fns</div></div>';
    html+='<div class="stat-box"><div class="stat-val">'+(data.securityIssues?data.securityIssues.length:0)+'</div><div class="stat-lbl">Security</div></div>';
    html+='<div class="stat-box"><div class="stat-val">'+(stats.patterns||0)+'</div><div class="stat-lbl">Patterns</div></div>';
    html+='</div>';
    if(langBar)html+='<div style="margin:8px 0">'+langBar+'</div>';

    // Chart image (Feature 4)
    if(chartPngDataUrl){
        html+='<h2>\ud83d\udcca Architecture Visualization</h2>';
        html+='<img class="chart-img" src="'+chartPngDataUrl+'" alt="Architecture graph"/>';
    }

    // Security Issues
    if(data.securityIssues&&data.securityIssues.length>0){
        html+='<h2 class="page-break">\ud83d\udee1\ufe0f Security Issues ('+data.securityIssues.length+')</h2>';
        html+='<table><tr><th>Severity</th><th>Title</th><th>File</th><th>Description</th></tr>';
        data.securityIssues.slice(0,50).forEach(function(s){
            html+='<tr><td class="sev-'+s.severity+'">'+s.severity.toUpperCase()+'</td><td>'+esc(s.title)+'</td><td>'+esc(s.path||s.file||'')+(s.line?' :'+s.line:'')+'</td><td>'+esc(s.desc).slice(0,120)+'</td></tr>';
        });
        html+='</table>';
        if(data.securityIssues.length>50)html+='<p style="font-size:10px;color:#666">\u2026 and '+(data.securityIssues.length-50)+' more</p>';
    }

    // Architecture Issues
    if(data.issues&&data.issues.length>0){
        html+='<h2>\ud83c\udfd7\ufe0f Architecture Issues ('+data.issues.length+')</h2>';
        data.issues.slice(0,20).forEach(function(i){
            html+='<h3>['+(i.type||'info').toUpperCase()+'] '+esc(i.title)+'</h3>';
            html+='<p style="font-size:10px;color:#444">'+esc(i.desc)+'</p>';
            if(i.items&&i.items.length>0)html+='<p style="font-size:9px;color:#888">Affected: '+i.items.slice(0,8).map(function(x){return esc(x.name||x.file||'');}).join(', ')+(i.items.length>8?' (+'+i.items.length-8+' more)':'')+'</p>';
        });
    }

    // Suggestions
    if(data.suggestions&&data.suggestions.length>0){
        html+='<h2 class="page-break">\ud83d\udca1 Suggestions ('+data.suggestions.length+')</h2>';
        data.suggestions.slice(0,15).forEach(function(s){
            html+='<div class="suggestion suggestion-'+(s.priority||'low')+'"><strong>'+esc(s.icon||'')+' '+esc(s.title)+'</strong><br/>'+esc(s.desc)+'</div>';
        });
    }

    // Patterns
    if(data.patterns&&data.patterns.length>0){
        html+='<h2>\ud83d\udd0d Patterns ('+data.patterns.length+')</h2>';
        html+='<table><tr><th>Pattern</th><th>Type</th><th>Files</th><th>Description</th></tr>';
        data.patterns.forEach(function(p){
            html+='<tr><td>'+esc(p.icon||'')+' '+esc(p.name)+'</td><td>'+(p.isAnti?'Anti-Pattern':'Pattern')+'</td><td>'+p.files.length+'</td><td>'+esc(p.desc).slice(0,100)+'</td></tr>';
        });
        html+='</table>';
    }

    // Dead Functions summary
    if(data.deadFunctions&&data.deadFunctions.length>0){
        html+='<h2 class="page-break">\ud83e\uddf9 Unused Functions ('+data.deadFunctions.length+')</h2>';
        html+='<table><tr><th>Function</th><th>File</th><th>Line</th><th>Lines</th></tr>';
        data.deadFunctions.slice(0,60).forEach(function(fn){
            html+='<tr><td>'+esc(fn.name)+'()</td><td>'+esc(fn.file)+'</td><td>'+fn.line+'</td><td>'+fn.codeLines+'</td></tr>';
        });
        html+='</table>';
        if(data.deadFunctions.length>60)html+='<p style="font-size:10px;color:#666">\u2026 and '+(data.deadFunctions.length-60)+' more</p>';
    }

    // File List
    html+='<h2 class="page-break">\ud83d\udcc1 Files ('+stats.files+')</h2>';
    html+='<table><tr><th>Path</th><th>Layer</th><th>Lines</th><th>Functions</th></tr>';
    (data.files||[]).slice(0,100).forEach(function(f){
        html+='<tr><td>'+esc(f.path)+'</td><td>'+esc(f.layer)+'</td><td>'+f.lines+'</td><td>'+f.functions.length+'</td></tr>';
    });
    html+='</table>';
    if((data.files||[]).length>100)html+='<p style="font-size:10px;color:#666">\u2026 and '+(data.files.length-100)+' more files</p>';

    html+='<div style="margin-top:32px;padding-top:12px;border-top:1px solid #ddd;font-size:9px;color:#999;text-align:center">';
    html+='Generated by Repo-Intel \u00b7 '+ts+' \u00b7 100% client-side analysis</div>';
    html+='</body></html>';

    // Open in new tab — user clicks Ctrl+P / Print to save as PDF
    var w2=window.open('','_blank');
    if(w2){
        w2.document.write(html);
        w2.document.close();
        setTimeout(function(){w2.print();},500);
    }else{
        // Fallback: download as HTML
        var blob=new Blob([html],{type:'text/html'});
        var url=URL.createObjectURL(blob);
        var a=document.createElement('a');
        a.href=url;a.download='repo-intel-report.html';a.click();
        URL.revokeObjectURL(url);
    }
    if(typeof notify==='function')notify('PDF report ready \u2014 use Print dialog to save','success');
}

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function exportSVGHelper(svgElement){
    if(!svgElement)return;
    var svgClone=svgElement.cloneNode(true);
    svgClone.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svgClone.setAttribute('width',svgElement.clientWidth);
    svgClone.setAttribute('height',svgElement.clientHeight);
    var style=document.createElementNS('http://www.w3.org/2000/svg','style');
    style.textContent='text{font-family:JetBrains Mono,monospace;pointer-events:none}';
    svgClone.insertBefore(style,svgClone.firstChild);
    var blob=new Blob([new XMLSerializer().serializeToString(svgClone)],{type:'image/svg+xml'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download='repo-intel-'+Date.now()+'.svg';
    a.click();
    URL.revokeObjectURL(url);
}

function exportJSONHelper(data){
    if(!data)return;
    var blob=new Blob([JSON.stringify({
        stats:data.stats,
        files:data.files.map(function(f){return{path:f.path,fns:f.functions.length,layer:f.layer,lines:f.lines,dependencies:f.dependencies||[]};}),
        connections:data.connections,
        issues:data.issues,
        patterns:data.patterns,
        security:data.securityIssues
    },null,2)],{type:'application/json'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download='repo-intel-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
}

function generateReportHelper(format,data,repo,h,notify){
    var report={
        repository:repo,
        analyzedAt:new Date().toISOString(),
        repoIntelVersion:'1.0',
        summary:{
            healthScore:h.score,
            healthGrade:h.grade,
            totalFiles:data.stats.files,
            totalFunctions:data.stats.functions,
            totalConnections:data.stats.connections,
            linesOfCode:data.stats.loc,
            unusedFunctions:data.stats.dead,
            securityIssues:data.securityIssues.length,
            patterns:data.patterns.length,
            duplicates:data.stats.duplicates||0,
            layerViolations:data.stats.violations||0,
            highSecurityIssues:data.stats.security||0
        },
        files:data.files.map(function(f){
            var fns=f.functions.map(function(fn){
                var st=data.fnStats[fn.name];
                return{
                    name:fn.name,
                    line:fn.line,
                    internalCalls:st?st.internal:0,
                    externalCalls:st?st.external:0,
                    totalCalls:st?(st.internal+st.external):0,
                    isUnused:st?(st.internal+st.external===0):true,
                    isExported:st?st.isExported:false,
                    isClassMethod:st?st.isClassMethod:false,
                    isTopLevel:st?st.isTopLevel:true,
                    type:st?st.type:'function',
                    callers:st&&st.callers?st.callers.map(function(c){return{file:c.file,name:c.name,count:c.count};}):[],
                    code:fn.code
                };
            });
            return{
                path:f.path,
                name:f.name,
                folder:f.folder,
                layer:f.layer,
                lines:f.lines,
                churn:f.churn||0,
                isCode:f.isCode!==false,
                functions:fns,
                functionCount:f.functions.length
            };
        }),
        unusedFunctions:data.deadFunctions.map(function(fn){return{name:fn.name,file:fn.file,folder:fn.folder,line:fn.line,codeLines:fn.codeLines,code:fn.code,extension:fn.ext};}),
        dependencies:data.connections.map(function(c){
            var src=typeof c.source==='object'?c.source.id:c.source;
            var tgt=typeof c.target==='object'?c.target.id:c.target;
            return{from:src,to:tgt,function:c.fn,callCount:c.count};
        }),
        architectureIssues:data.issues.map(function(i){return{type:i.type,title:i.title,description:i.desc,affectedFiles:i.items?i.items.map(function(x){return x.file||x.name;}):[],affectedItems:i.items||[]};}),
        patterns:data.patterns.map(function(p){return{name:p.name,description:p.desc,isAntiPattern:p.isAnti||false,severity:p.severity||'info',icon:p.icon||'',files:p.files.map(function(f){return f.path||f.name;}),fileDetails:p.files||[],metrics:p.metrics||{}};}),
        securityIssues:data.securityIssues.map(function(s){return{severity:s.severity,title:s.title,description:s.desc,file:s.file,path:s.path,line:s.line,code:s.code};}),
        duplicates:data.duplicates||[],
        layerViolations:data.layerViolations||[],
        suggestions:data.suggestions||[],
        languageBreakdown:data.stats.languages||[],
        folderStructure:data.folders,
        functionStatistics:Object.keys(data.fnStats||{}).map(function(fnName){
            var st=data.fnStats[fnName];
            return{
                name:fnName,
                file:st.file,
                folder:st.folder,
                line:st.line,
                internalCalls:st.internal,
                externalCalls:st.external,
                totalCalls:st.count||(st.internal+st.external),
                isExported:st.isExported,
                isClassMethod:st.isClassMethod,
                isTopLevel:st.isTopLevel,
                type:st.type,
                callers:st.callers?st.callers.map(function(c){return{file:c.file,name:c.name,count:c.count};}):[],
                code:st.code
            };
        })
    };
    if(format==='json'){
        var jsonBlob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'});
        var jsonUrl=URL.createObjectURL(jsonBlob);
        var jsonA=document.createElement('a');
        jsonA.href=jsonUrl;
        jsonA.download='repo-intel-report.json';
        jsonA.click();
        URL.revokeObjectURL(jsonUrl);
    }else if(format==='md'){
        var md='# Repo-Intel Analysis Report\n\n';
        md+='**Repository:** '+repo+'\n';
        md+='**Analyzed:** '+new Date().toLocaleString()+'\n\n';
        md+='## Summary\n\n';
        md+='| Metric | Value |\n|--------|-------|\n';
        md+='| Health Score | '+h.score+'/100 ('+h.grade+') |\n';
        md+='| Files | '+data.stats.files+' |\n';
        md+='| Functions | '+data.stats.functions+' |\n';
        md+='| Lines of Code | '+data.stats.loc.toLocaleString()+' |\n';
        md+='| Dependencies | '+data.stats.connections+' |\n';
        md+='| Unused Functions | '+data.stats.dead+' |\n';
        md+='| Security Issues | '+data.securityIssues.length+' |\n\n';
        if(data.securityIssues.length>0){
            md+='## Security Issues\n\n';
            data.securityIssues.forEach(function(s){
                md+='### '+s.severity.toUpperCase()+': '+s.title+'\n';
                md+='- **File:** `'+s.path+'`'+(s.line?' (line '+s.line+')':'')+'\n';
                md+='- **Description:** '+s.desc+'\n';
                if(s.code)md+='- **Code:** `'+s.code+'`\n';
                md+='\n';
            });
        }
        if(data.deadFunctions.length>0){
            md+='## Unused Functions ('+data.deadFunctions.length+')\n\n';
            md+='These functions have zero calls (internal or external) and may be dead code:\n\n';
            data.deadFunctions.slice(0,50).forEach(function(fn){
                md+='### `'+fn.name+'()`\n';
                md+='- **File:** `'+fn.file+'`\n';
                md+='- **Line:** '+fn.line+'\n';
                md+='- **Lines of code:** '+fn.codeLines+'\n';
                if(fn.code)md+='```\n'+fn.code+'\n```\n';
                md+='\n';
            });
            if(data.deadFunctions.length>50)md+='\n*...and '+(data.deadFunctions.length-50)+' more unused functions*\n\n';
        }
        if(data.patterns.length>0){
            md+='## Design Patterns\n\n';
            data.patterns.filter(function(p){return!p.isAnti;}).forEach(function(p){
                md+='### '+p.icon+' '+p.name+'\n';
                md+=p.desc+'\n\n';
                md+='**Files:** '+p.files.slice(0,5).map(function(f){return'`'+f.name+'`';}).join(', ')+(p.files.length>5?' (+'+p.files.length-5+' more)':'')+'\n\n';
            });
            var antiPatterns=data.patterns.filter(function(p){return p.isAnti;});
            if(antiPatterns.length>0){
                md+='## Anti-Patterns\n\n';
                antiPatterns.forEach(function(p){
                    md+='### '+p.icon+' '+p.name+'\n';
                    md+=p.desc+'\n\n';
                    md+='**Affected files:** '+p.files.slice(0,5).map(function(f){return'`'+f.name+'`';}).join(', ')+'\n\n';
                });
            }
        }
        if(data.issues.length>0){
            md+='## Architecture Issues\n\n';
            data.issues.forEach(function(i){
                md+='### '+i.title+'\n';
                md+=i.desc+'\n\n';
                if(i.items)md+='**Affected:** '+i.items.slice(0,5).map(function(x){return'`'+(x.name||x.file)+'`';}).join(', ')+'\n\n';
            });
        }
        md+='## File Details\n\n';
        md+='| File | Folder | Layer | Lines | Functions |\n';
        md+='|------|--------|-------|-------|----------|\n';
        data.files.slice(0,100).forEach(function(f){
            md+='| `'+f.name+'` | '+f.folder+' | '+f.layer+' | '+f.lines+' | '+f.functions.length+' |\n';
        });
        if(data.files.length>100)md+='\n*...and '+(data.files.length-100)+' more files*\n';
        var mdBlob=new Blob([md],{type:'text/markdown'});
        var mdUrl=URL.createObjectURL(mdBlob);
        var mdA=document.createElement('a');
        mdA.href=mdUrl;
        mdA.download='repo-intel-report.md';
        mdA.click();
        URL.revokeObjectURL(mdUrl);
    }else if(format==='txt'){
        var txt='REPO-INTEL ANALYSIS REPORT\n';
        txt+='========================\n\n';
        txt+='Repository: '+repo+'\n';
        txt+='Analyzed: '+new Date().toLocaleString()+'\n\n';
        txt+='SUMMARY\n-------\n';
        txt+='Health Score: '+h.score+'/100 (Grade: '+h.grade+')\n';
        txt+='Files: '+data.stats.files+'\n';
        txt+='Functions: '+data.stats.functions+'\n';
        txt+='Lines of Code: '+data.stats.loc.toLocaleString()+'\n';
        txt+='Dependencies: '+data.stats.connections+'\n';
        txt+='Unused Functions: '+data.stats.dead+'\n';
        txt+='Security Issues: '+data.securityIssues.length+'\n\n';
        if(data.securityIssues.length>0){
            txt+='SECURITY ISSUES\n---------------\n';
            data.securityIssues.forEach(function(s,i){
                txt+=(i+1)+'. ['+s.severity.toUpperCase()+'] '+s.title+'\n';
                txt+='   File: '+s.path+(s.line?' (line '+s.line+')':'')+'\n';
                txt+='   '+s.desc+'\n';
                if(s.code)txt+='   Code: '+s.code+'\n';
                txt+='\n';
            });
        }
        if(data.deadFunctions.length>0){
            txt+='UNUSED FUNCTIONS ('+data.deadFunctions.length+')\n'+'-'.repeat(20)+'\n';
            txt+='These functions are never called and may be dead code:\n\n';
            data.deadFunctions.forEach(function(fn,i){
                txt+=(i+1)+'. '+fn.name+'()\n';
                txt+='   File: '+fn.file+' (line '+fn.line+')\n';
                txt+='   Lines: '+fn.codeLines+'\n';
                if(fn.code){
                    txt+='   Code:\n';
                    fn.code.split('\n').forEach(function(line){txt+='      '+line+'\n';});
                }
                txt+='\n';
            });
        }
        if(data.patterns.length>0){
            txt+='PATTERNS DETECTED\n-----------------\n';
            data.patterns.forEach(function(p){
                txt+=(p.isAnti?'[ANTI-PATTERN] ':'')+p.name+'\n';
                txt+='  '+p.desc+'\n';
                txt+='  Files: '+p.files.map(function(f){return f.name;}).join(', ')+'\n\n';
            });
        }
        if(data.issues.length>0){
            txt+='ARCHITECTURE ISSUES\n-------------------\n';
            data.issues.forEach(function(i){
                txt+='['+i.type.toUpperCase()+'] '+i.title+'\n';
                txt+='  '+i.desc+'\n';
                if(i.items)txt+='  Affected: '+i.items.map(function(x){return x.name||x.file;}).join(', ')+'\n';
                txt+='\n';
            });
        }
        txt+='FILE LIST\n---------\n';
        data.files.forEach(function(f){
            txt+=f.path+' ('+f.lines+' lines, '+f.functions.length+' functions, '+f.layer+')\n';
        });
        txt+='\nDEPENDENCIES\n------------\n';
        data.connections.slice(0,100).forEach(function(c){
            var src=typeof c.source==='object'?c.source.id:c.source;
            var tgt=typeof c.target==='object'?c.target.id:c.target;
            txt+=src.split('/').pop()+' -> '+tgt.split('/').pop()+' ('+c.fn+': '+c.count+' calls)\n';
        });
        if(data.connections.length>100)txt+='\n...and '+(data.connections.length-100)+' more dependencies\n';
        var txtBlob=new Blob([txt],{type:'text/plain'});
        var txtUrl=URL.createObjectURL(txtBlob);
        var txtA=document.createElement('a');
        txtA.href=txtUrl;
        txtA.download='repo-intel-report.txt';
        txtA.click();
        URL.revokeObjectURL(txtUrl);
    }
    if(typeof notify==='function')notify('Report exported as '+format.toUpperCase(),'success');
}
