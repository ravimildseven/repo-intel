function buildTree(files){
    var root={name:'root',path:'',children:{},files:[]};
    files.forEach(function(f){
        var parts=f.folder&&f.folder!=='root'?f.folder.split('/'):[];
        var cur=root;
        parts.forEach(function(p,i){
            var path=parts.slice(0,i+1).join('/');
            if(!cur.children[p])cur.children[p]={name:p,path:path,children:{},files:[]};
            cur=cur.children[p];
        });
        cur.files.push(f);
    });
    return root;
}

function countFiles(n){return n.files.length+Object.values(n.children).reduce(function(s,c){return s+countFiles(c);},0);}

function calcBlast(fileId,conns,files){
    // Comprehensive impact analysis for a file
    // Connection format: {source: fileDefiningFn, target: fileCallingFn, fn: fnName, count: callCount}

    // Build adjacency lists for fast lookups
    var exportedTo={};// fileId -> Set of files that import from it
    var importedFrom={};// fileId -> Set of files it imports from
    var exportedFns={};// fileId -> Map of fn -> count of external calls

    conns.forEach(function(c){
        var src=typeof c.source==='object'?c.source.id:c.source;
        var tgt=typeof c.target==='object'?c.target.id:c.target;
        // src exports, tgt imports
        if(!exportedTo[src])exportedTo[src]=new Set();
        exportedTo[src].add(tgt);
        if(!importedFrom[tgt])importedFrom[tgt]=new Set();
        importedFrom[tgt].add(src);
        if(!exportedFns[src])exportedFns[src]=new Map();
        var fnMap=exportedFns[src];
        fnMap.set(c.fn,(fnMap.get(c.fn)||0)+(c.count||1));
    });

    // 1. Direct dependents (files that directly import from this file)
    var directDeps=exportedTo[fileId]?Array.from(exportedTo[fileId]):[];

    // 2. Transitive dependents (BFS with depth tracking)
    var transitive=new Map();// fileId -> depth
    var queue=directDeps.map(function(f){return{file:f,depth:1};});
    var visited=new Set([fileId].concat(directDeps));
    while(queue.length>0){
        var item=queue.shift();
        if(item.depth>3)continue;// Limit depth to 3 for transitive
        transitive.set(item.file,item.depth);
        var nextDeps=exportedTo[item.file]||new Set();
        nextDeps.forEach(function(f){
            if(!visited.has(f)){
                visited.add(f);
                queue.push({file:f,depth:item.depth+1});
            }
        });
    }

    // 3. Functions exported (how many of this file's functions are used)
    var fnUsage=exportedFns[fileId]||new Map();
    var fnsUsed=fnUsage.size;
    var totalCalls=0;
    fnUsage.forEach(function(cnt){totalCalls+=cnt;});

    // 4. Dependencies (files this file imports from - its risk)
    var dependencies=importedFrom[fileId]?Array.from(importedFrom[fileId]):[];

    // 5. Calculate weighted impact score
    // Direct deps count fully, transitive count with decay
    var impactScore=directDeps.length;
    transitive.forEach(function(depth,f){
        if(depth>1)impactScore+=1/depth;// 0.5 for depth 2, 0.33 for depth 3
    });

    // 6. Calculate centrality (how connected is this file)
    var centrality=directDeps.length+dependencies.length+fnsUsed;

    // Determine level based on direct dependents and functions used
    var level='low';
    var connectedFiles=files.filter(function(f){return exportedTo[f.path]||importedFrom[f.path];}).length;
    var relativePct=connectedFiles>0?Math.round(directDeps.length/connectedFiles*100):0;

    if(directDeps.length>=8||fnsUsed>=5)level='critical';
    else if(directDeps.length>=4||fnsUsed>=3)level='high';
    else if(directDeps.length>=2||fnsUsed>=1)level='medium';

    return{
        affected:directDeps,
        transitive:Array.from(transitive.keys()),
        count:directDeps.length,
        transitiveCount:transitive.size,
        percent:relativePct,
        level:level,
        depth:transitive.size>0?Math.max.apply(null,Array.from(transitive.values())):0,
        fnsUsed:fnsUsed,
        totalCalls:totalCalls,
        dependencies:dependencies,
        impactScore:Math.round(impactScore*10)/10,
        centrality:centrality
    };
}

function calcHealth(data){
    if(!data)return{score:0,grade:'F'};
    var score=100;
    var deadPct=data.stats.functions>0?(data.stats.dead/data.stats.functions*100):0;
    score-=Math.min(20,deadPct);
    var circular=data.issues.filter(function(i){return i.title.includes('Circular');}).length;
    score-=Math.min(20,circular*5);
    var god=data.issues.filter(function(i){return i.title.includes('Large');}).length;
    score-=Math.min(15,god*3);
    var avgCoup=data.stats.files>0?(data.stats.connections/data.stats.files):0;
    score-=Math.min(15,Math.max(0,avgCoup-3)*2);
    var sec=data.securityIssues?data.securityIssues.filter(function(i){return i.severity==='high';}).length:0;
    score-=Math.min(20,sec*5);
    score=Math.max(0,Math.round(score));
    var grade='F';
    if(score>=90)grade='A';else if(score>=80)grade='B';else if(score>=70)grade='C';else if(score>=60)grade='D';
    return{score:score,grade:grade};
}

function calcPRRisk(prData, repoData) {
    if (!prData || !repoData) return { score: 0, level: 'low', factors: [] };
    var score = 0;
    var factors = [];
    var changedFiles = prData.files || [];
    var totalBlast = 0;
    var hotspots = [];
    changedFiles.forEach(function(f) {
        var existing = repoData.files.find(function(df) { return df.path === f.filename; });
        if (existing) {
            var blast = calcBlast(f.filename, repoData.connections, repoData.files);
            totalBlast += blast.count;
            if (blast.count > 5) hotspots.push({ file: f.filename, blast: blast.count });
        }
    });
    if (totalBlast > 50) { score += 30; factors.push('High blast radius (' + totalBlast + ' files)'); }
    else if (totalBlast > 20) { score += 15; factors.push('Moderate blast radius'); }
    if (changedFiles.length > 10) { score += 20; factors.push('Many files changed (' + changedFiles.length + ')'); }
    else if (changedFiles.length > 5) { score += 10; factors.push('Several files changed'); }
    var totalChanges = (prData.additions || 0) + (prData.deletions || 0);
    if (totalChanges > 500) { score += 25; factors.push('Large changeset (' + totalChanges + ' lines)'); }
    else if (totalChanges > 200) { score += 12; factors.push('Moderate changeset'); }
    var coreFiles = changedFiles.filter(function(f) { return f.filename.includes('/core/') || f.filename.includes('/utils/') || f.filename.includes('/lib/'); });
    if (coreFiles.length > 0) { score += 15; factors.push('Core files modified (' + coreFiles.length + ')'); }
    var configFiles = changedFiles.filter(function(f) { return f.filename.match(/\.(json|yaml|yml|toml|env)$/); });
    if (configFiles.length > 0) { score += 10; factors.push('Config files changed'); }
    score = Math.min(100, score);
    var level = score >= 70 ? 'critical' : score >= 40 ? 'high' : score >= 20 ? 'medium' : 'low';
    return { score: score, level: level, factors: factors, totalBlast: totalBlast, hotspots: hotspots.sort(function(a,b){ return b.blast - a.blast; }).slice(0, 5) };
}

function findSuggestedReviewers(prData, repoData) {
    if (!prData || !repoData) return [];
    var changedPaths = (prData.files || []).map(function(f) { return f.filename; });
    var authorCounts = {};
    repoData.files.forEach(function(f) {
        if (changedPaths.some(function(p) { return f.folder && p.startsWith(f.folder); })) {
            var layer = f.layer || 'other';
            if (!authorCounts[layer]) authorCounts[layer] = { count: 0, files: [] };
            authorCounts[layer].count++;
            authorCounts[layer].files.push(f.name);
        }
    });
    var reviewers = [];
    Object.entries(authorCounts).sort(function(a,b) { return b[1].count - a[1].count; }).slice(0, 3).forEach(function(entry, i) {
        reviewers.push({ name: entry[0].charAt(0).toUpperCase() + entry[0].slice(1) + ' Expert', reason: 'Knows ' + entry[1].count + ' files in ' + entry[0], avatar: COLORS[i % COLORS.length] });
    });
    return reviewers;
}

function findTestImpact(prData, repoData) {
    if (!prData || !repoData) return [];
    var changedFiles = (prData.files || []).map(function(f) { return f.filename; });
    var testFiles = repoData.files.filter(function(f) { return f.name.match(/\.test\.|\.spec\.|_test\.|test_/i); });
    var impacted = [];
    testFiles.forEach(function(tf) {
        var shouldRun = changedFiles.some(function(cf) {
            var cfBase = cf.replace(/\.[^.]+$/, '').split('/').pop();
            return tf.name.toLowerCase().includes(cfBase.toLowerCase());
        });
        if (shouldRun) impacted.push({ file: tf.name, path: tf.path });
    });
    if (impacted.length === 0 && testFiles.length > 0) {
        impacted = testFiles.slice(0, 3).map(function(tf) { return { file: tf.name, path: tf.path, suggested: true }; });
    }
    return impacted;
}

function findDependencyChains(prData, repoData) {
    if (!prData || !repoData) return [];
    var changedFiles = (prData.files || []).map(function(f) { return f.filename; });
    var chains = [];
    changedFiles.slice(0, 3).forEach(function(file) {
        var chain = [file.split('/').pop()];
        var visited = new Set([file]);
        var queue = [file];
        var depth = 0;
        while (queue.length > 0 && depth < 3) {
            var current = queue.shift();
            repoData.connections.forEach(function(c) {
                var src = typeof c.source === 'object' ? c.source.id : c.source;
                var tgt = typeof c.target === 'object' ? c.target.id : c.target;
                if (tgt === current && !visited.has(src)) {
                    visited.add(src);
                    chain.push(src.split('/').pop());
                    queue.push(src);
                }
            });
            depth++;
        }
        if (chain.length > 1) chains.push(chain.slice(0, 5));
    });
    return chains;
}

// Error boundary to prevent white screen crashes on large codebases
class ErrorBoundary extends React.Component{
    constructor(props){super(props);this.state={hasError:false,error:null};}
    static getDerivedStateFromError(error){return{hasError:true,error:error};}
    componentDidCatch(error,info){console.error('CodeFlow crashed:',error,info);}
    render(){
        if(this.state.hasError){
            var self=this;
            return React.createElement('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'var(--bg0)',color:'var(--t0)',fontFamily:'JetBrains Mono, monospace',padding:40,textAlign:'center'}},
                React.createElement('div',{style:{fontSize:48,marginBottom:16}},'⚡'),
                React.createElement('h2',{style:{marginBottom:12,color:'var(--acc)'}},'CodeFlow ran into an issue'),
                React.createElement('p',{style:{color:'var(--t2)',marginBottom:8,maxWidth:500}},'The codebase may be too large for your browser\'s available memory. Try analyzing a subfolder instead, or close other browser tabs to free memory.'),
                React.createElement('p',{style:{color:'var(--t3)',fontSize:11,marginBottom:20}},String(this.state.error)),
                React.createElement('button',{onClick:function(){self.setState({hasError:false,error:null});},style:{padding:'8px 20px',background:'var(--acc)',color:'var(--bg0)',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'inherit',fontWeight:600}},'Reload')
            );
        }
        return this.props.children;
    }
}

function TreeNode(props){
    var node=props.node,selected=props.selected,onSelect=props.onSelect,expanded=props.expanded,toggle=props.toggle,filterFolder=props.filterFolder,activeFilter=props.activeFilter;
    var isOpen=expanded.has(node.path);
    var isFiltered=activeFilter===node.path;
    var children=Object.values(node.children).sort(function(a,b){return a.name.localeCompare(b.name);});
    return React.createElement('div',null,
        React.createElement('div',{className:'tree-folder'+(isFiltered?' filtered':''),onClick:function(){if(node.path==='')filterFolder(null);else filterFolder(node.path);}},
            React.createElement('span',{className:'tree-toggle'+(isOpen?' open':''),onClick:function(e){e.stopPropagation();toggle(node.path);}},children.length>0||node.files.length>0?'▶':''),
            React.createElement('span',null,isOpen?'📂':'📁'),
            React.createElement('span',{className:'tree-name'},node.name),
            React.createElement('span',{className:'tree-count'},countFiles(node))
        ),
        isOpen&&React.createElement('div',{className:'tree-children'},
            children.map(function(c){return React.createElement(TreeNode,{key:c.path,node:c,selected:selected,onSelect:onSelect,expanded:expanded,toggle:toggle,filterFolder:filterFolder,activeFilter:activeFilter});}),
            node.files.map(function(f){return React.createElement('div',{key:f.path,className:'tree-file'+(selected&&selected.path===f.path?' active':''),onClick:function(){onSelect(f.path);}},React.createElement('span',null,'📄'),React.createElement('span',{className:'tree-name'},f.name));})
        )
    );
}

function HealthRing(props){
    var score=props.score,grade=props.grade;
    var circ=2*Math.PI*18;
    var offset=circ-(score/100)*circ;
    var color=score>=80?'var(--green)':score>=60?'var(--orange)':'var(--red)';
    return React.createElement('div',{className:'health-ring'},
        React.createElement('svg',{width:'48',height:'48'},
            React.createElement('circle',{cx:'24',cy:'24',r:'18',fill:'none',stroke:'var(--bg3)',strokeWidth:'4'}),
            React.createElement('circle',{cx:'24',cy:'24',r:'18',fill:'none',stroke:color,strokeWidth:'4',strokeDasharray:circ,strokeDashoffset:offset,strokeLinecap:'round'})
        ),
        React.createElement('div',{className:'health-ring-value',style:{color:color}},grade)
    );
}