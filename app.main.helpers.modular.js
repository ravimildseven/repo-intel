function parseUrl(url){
    if(!url||typeof url!=='string')return null;
    url=url.trim();
    if(url.length>200||url.includes('{')||url.includes('"'))return null;
    var m=url.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if(m)return{owner:m[1],repo:m[2].replace(/\.git$/,'')};
    var simple=url.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
    if(simple)return{owner:simple[1],repo:simple[2]};
    return null;
}

function highlightSyntax(code,filename){
    if(!code)return'';
    var ext=(filename||'').split('.').pop().toLowerCase();
    var isJS=['js','jsx','ts','tsx','mjs','cjs'].includes(ext);
    var isPy=['py','pyw','pyi'].indexOf(ext)>=0;
    var isJava=['java','kt','scala','cs','go'].includes(ext);
    var isHTML=['html','htm','vue','svelte'].includes(ext);
    var isCSS=['css','scss','sass','less'].includes(ext);
    var isRuby=['rb','rake'].includes(ext);
    var isPHP=ext==='php';
    var isVBA=['vba','bas','cls','xlsm','xlam','xlsb','xla','xlw'].includes(ext);
    function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
    // Split into tokens while preserving structure.
    var result=code.split('\n').map(function(line){
        var escaped=esc(line);
        if(isJS||isJava||isPHP||isCSS)escaped=escaped.replace(/(\/\/.*$)/gm,'<span class="syn-com">$1</span>');
        if(isPy||isRuby)escaped=escaped.replace(/(#.*$)/gm,'<span class="syn-com">$1</span>');
        if(isHTML)escaped=escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g,'<span class="syn-com">$1</span>');
        escaped=escaped.replace(/(&quot;[^&]*&quot;|'[^']*'|`[^`]*`)/g,'<span class="syn-str">$1</span>');
        escaped=escaped.replace(/\b(\d+\.?\d*)\b/g,'<span class="syn-num">$1</span>');
        if(isJS)escaped=escaped.replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|this|super|null|undefined|true|false|void|static|get|set)\b/g,'<span class="syn-kw">$1</span>');
        if(isPy){
            escaped=escaped.replace(/\b(async|await|def|class|return|if|elif|else|for|while|try|except|finally|raise|import|from|as|with|pass|break|continue|lambda|yield|global|nonlocal|assert|True|False|None|and|or|not|in|is|del|match|case|type)\b/g,'<span class="syn-kw">$1</span>');
            escaped=escaped.replace(/(@\w+)/g,'<span class="syn-fn">$1</span>');
            escaped=escaped.replace(/\b(self|cls)\b/g,'<span class="syn-kw" style="opacity:0.7">$1</span>');
        }
        if(isJava)escaped=escaped.replace(/\b(public|private|protected|static|final|void|class|interface|extends|implements|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|import|package|this|super|null|true|false)\b/g,'<span class="syn-kw">$1</span>');
        if(isRuby)escaped=escaped.replace(/\b(def|class|module|end|return|if|elsif|else|unless|case|when|for|while|until|do|begin|rescue|ensure|raise|require|include|extend|attr_accessor|attr_reader|attr_writer|true|false|nil|self)\b/g,'<span class="syn-kw">$1</span>');
        if(isPHP)escaped=escaped.replace(/\b(function|class|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|try|catch|finally|throw|new|public|private|protected|static|const|use|namespace|extends|implements|true|false|null)\b/g,'<span class="syn-kw">$1</span>');
        if(isVBA)escaped=escaped.replace(/\b(Public|Private|Friend|Static|Dim|Set|Let|Get|Call|Function|Sub|End Sub|End Function|Exit Sub|Exit Function|If|Then|Else|ElseIf|End If|For|To|Step|Next|Do|Loop|While|Wend|Select|Case|End Select|With|End With|On Error|Resume|GoTo|ByVal|ByRef|Optional|ParamArray|As|Type|Enum|Const|True|False|Nothing|Empty|Null|Me|Application|ThisWorkbook|Worksheets|Cells|Range|MsgBox|InputBox|Debug\.Print)\b/gi,'<span class="syn-kw">$1</span>');
        if(isCSS)escaped=escaped.replace(/(@media|@import|@keyframes|@font-face|!important)/g,'<span class="syn-kw">$1</span>');
        if(isHTML){
            escaped=escaped.replace(/(&lt;\/?)([\w-]+)/g,'$1<span class="syn-tag">$2</span>');
            escaped=escaped.replace(/([\w-]+)(=)/g,'<span class="syn-attr">$1</span>$2');
        }
        escaped=escaped.replace(/\b([a-zA-Z_]\w*)\s*\(/g,'<span class="syn-fn">$1</span>(');
        if(isJS||isJava)escaped=escaped.replace(/:\s*([A-Z]\w*)/g,': <span class="syn-type">$1</span>');
        return escaped;
    });
    return result;
}

function buildExcludeRecommendations(files,compiledPatterns){
    if(!files||!files.length)return[];
    var existing=new Set((compiledPatterns||[]).map(function(p){return(p.raw||'').toLowerCase();}));
    var recs=[];

    function add(pattern,title,reason,count,priority){
        var key=(pattern||'').toLowerCase();
        if(!pattern||existing.has(key))return;
        if(recs.some(function(r){return r.pattern.toLowerCase()===key;}))return;
        recs.push({pattern:pattern,title:title,reason:reason,count:count||0,priority:priority||'medium'});
    }

    var minified=files.filter(function(f){return/\.min\.(js|css)$/i.test(f.name);});
    if(minified.length>=5)add('**/*.min.js','Exclude minified bundles','Precompiled bundles add noise to dependency stats and readability.',minified.length,'high');

    var maps=files.filter(function(f){return/\.map$/i.test(f.name);});
    if(maps.length>=5)add('**/*.map','Exclude sourcemaps','Sourcemaps are useful for debugging but rarely useful for architecture insights.',maps.length,'medium');

    var tests=files.filter(function(f){return/(^test_|_test\.|\.test\.|\.spec\.)/i.test(f.name)||/\/(test|tests|__tests__)\//i.test(f.path);});
    if(tests.length>=25)add('**/tests/**','Optionally exclude tests','For architecture-only views, test files can dominate graph density.',tests.length,'medium');

    var docs=files.filter(function(f){return/\.(md|rst|txt)$/i.test(f.name)||/\/(docs?|documentation)\//i.test(f.path);});
    if(docs.length>=30)add('docs/**','Exclude documentation folders','Docs are valuable, but excluding them can focus analysis on executable code.',docs.length,'low');

    var fixtures=files.filter(function(f){return/\/(fixtures?|__fixtures__|mocks?|__mocks__)\//i.test(f.path);});
    if(fixtures.length>=20)add('**/fixtures/**','Exclude fixtures/mocks','Fixtures and mocks can inflate file counts without changing production behavior.',fixtures.length,'medium');

    var lockfiles=files.filter(function(f){return/(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|poetry\.lock|Cargo\.lock|Gemfile\.lock)$/i.test(f.path);});
    if(lockfiles.length>=3)add('**/*lock*','Exclude lockfiles','Lockfiles rarely contribute to dependency flow analysis.',lockfiles.length,'low');

    var topFolders={};
    files.forEach(function(f){
        var top=f.path.includes('/')?f.path.split('/')[0]:'root';
        if(!topFolders[top])topFolders[top]={count:0,code:0};
        topFolders[top].count++;
        if(f.isCode)topFolders[top].code++;
    });
    Object.entries(topFolders).forEach(function(entry){
        var name=entry[0],stat=entry[1];
        if(name==='root')return;
        var codeRatio=stat.count?stat.code/stat.count:0;
        if(stat.count>=120&&codeRatio<0.25){
            add(name+'/**','Consider excluding '+name+'/','Large non-code-heavy folder detected; excluding it can improve signal-to-noise.',stat.count,'high');
        }
    });

    var weight={high:0,medium:1,low:2};
    return recs.sort(function(a,b){
        if(weight[a.priority]!==weight[b.priority])return weight[a.priority]-weight[b.priority];
        return (b.count||0)-(a.count||0);
    }).slice(0,8);
}
