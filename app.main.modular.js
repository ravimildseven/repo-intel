function App(){
    var _a=useState(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'),theme=_a[0],setTheme=_a[1];
    var _b=useState(''),repoUrl=_b[0],setRepoUrl=_b[1];
    var _c=useState(''),token=_c[0],setToken=_c[1];
    var _authMethod=useState('none'),authMethod=_authMethod[0],setAuthMethod=_authMethod[1];// 'none', 'pat', 'github_app'
    var _appId=useState(''),appId=_appId[0],setAppId=_appId[1];
    var _privateKey=useState(''),privateKey=_privateKey[0],setPrivateKey=_privateKey[1];
    var _showKeyModal=useState(false),showKeyModal=_showKeyModal[0],setShowKeyModal=_showKeyModal[1];
    var _d=useState(false),loading=_d[0],setLoading=_d[1];
    var _e=useState(''),progress=_e[0],setProgress=_e[1];
    var _f=useState(null),error=_f[0],setError=_f[1];
    var _g=useState(null),data=_g[0],setData=_g[1];
    var _h=useState(null),repoInfo=_h[0],setRepoInfo=_h[1];
    var _i=useState('folder'),colorMode=_i[0],setColorMode=_i[1];
    var _j=useState(null),selected=_j[0],setSelected=_j[1];
    var _k=useState(new Set([''])),expandedPaths=_k[0],setExpandedPaths=_k[1];
    var _l=useState(new Set(['blast','fns'])),expandedCards=_l[0],setExpandedCards=_l[1];
    var _m=useState('details'),rightTab=_m[0],setRightTab=_m[1];
    var _m2=useState(null),drillDown=_m2[0],setDrillDown=_m2[1];// {type:'issue'|'pattern'|'security'|'suggestion'|'duplicate', data:...}
    var _n=useState(null),blastRadius=_n[0],setBlastRadius=_n[1];
    var _o=useState(null),ownership=_o[0],setOwnership=_o[1];
    var _p=useState(''),prUrl=_p[0],setPrUrl=_p[1];
    var _q=useState(null),prData=_q[0],setPrData=_q[1];
    var _r=useState(false),showExport=_r[0],setShowExport=_r[1];
    var _s=useState(false),showPR=_s[0],setShowPR=_s[1];
    var _t=useState(false),showPrivacy=_t[0],setShowPrivacy=_t[1];
    var _feat=useState(false),showFeatures=_feat[0],setShowFeatures=_feat[1];
    var _u=useState(null),tooltip=_u[0],setTooltip=_u[1];
    var _v=useState(null),toast=_v[0],setToast=_v[1];
    var _w=useState(false),ownerLoading=_w[0],setOwnerLoading=_w[1];
    var _x=useState(null),folderFilter=_x[0],setFolderFilter=_x[1];
    var _y=useState(new Set()),expandedFns=_y[0],setExpandedFns=_y[1];
    var _z=useState(false),showUnused=_z[0],setShowUnused=_z[1];
    var _aa=useState({spacing:200,linkDist:70,viewMode:'force',vizType:'graph',showLabels:true,curvedLinks:true,depLevel:'file'}),graphConfig=_aa[0],setGraphConfig=_aa[1];
    var _ab=useState(false),showGraphConfig=_ab[0],setShowGraphConfig=_ab[1];
    var _ac=useState(260),sidebarWidth=_ac[0],setSidebarWidth=_ac[1];
    var _ad=useState(360),rightPanelWidth=_ad[0],setRightPanelWidth=_ad[1];
    var _ae=useState(true),legendCollapsed=_ae[0],setLegendCollapsed=_ae[1];
    var _af=useState(null),filePreview=_af[0],setFilePreview=_af[1];// {path, content, line, filename, loading, error}
    var _ag=useState(null),localDirHandle=_ag[0],setLocalDirHandle=_ag[1];
    var _ah=useState(false),showExcludeModal=_ah[0],setShowExcludeModal=_ah[1];
    var _ai=useState(''),excludePatternInput=_ai[0],setExcludePatternInput=_ai[1];
    var _aj=useState(''),excludePatternDraft=_aj[0],setExcludePatternDraft=_aj[1];
    var _ak=useState(false),launchFolderAfterExcludeSave=_ak[0],setLaunchFolderAfterExcludeSave=_ak[1];
    var _al=useState(''),branchInput=_al[0],setBranchInput=_al[1];
    var _am=useState('all'),analysisPreset=_am[0],setAnalysisPreset=_am[1];
    var _an=useState(30),recentDays=_an[0],setRecentDays=_an[1];
    var _ao=useState(''),findingQuery=_ao[0],setFindingQuery=_ao[1];
    var _ap=useState('all'),findingTypeFilter=_ap[0],setFindingTypeFilter=_ap[1];
    var _aq=useState('all'),findingPriorityFilter=_aq[0],setFindingPriorityFilter=_aq[1];
    var _ar=useState('all'),findingSignalFilter=_ar[0],setFindingSignalFilter=_ar[1];
    var _br=useState([]),branches=_br[0],setBranches=_br[1];
    var _brLoading=useState(false),branchesLoading=_brLoading[0],setBranchesLoading=_brLoading[1];
    var svgRef=useRef(null);
    var filePreviewRef=useRef(null);
    var treemapRef=useRef(null);
    var matrixRef=useRef(null);
    var dendroRef=useRef(null);
    var sankeyRef=useRef(null);
    var disjointRef=useRef(null);
    var bundleRef=useRef(null);
    var zoomRef=useRef(null);
    var simRef=useRef(null);
    var nodesRef=useRef(null);
    var linksRef=useRef(null);
    var selectFileRef=useRef(null);
    var autoModeAppliedRef=useRef('');
    var activeExcludePatterns=useMemo(function(){return compileExcludePatterns(excludePatternInput);},[excludePatternInput]);
    var customExcludeCount=activeExcludePatterns.length;

    useEffect(function(){document.body.className=theme==='light'?'light':'';},[theme]);

    useEffect(function(){
        var params=new URLSearchParams(window.location.search);
        var repo=params.get('repo');
        var branch=params.get('branch');
        if(repo&&repo.length<200&&!repo.includes('{')&&/^[a-zA-Z0-9_.\/-]+$/.test(repo)){
            setRepoUrl(repo);
            if(branch&&branch.length<120)setBranchInput(branch);
            fetchBranches(repo);
            setTimeout(function(){var btn=document.getElementById('analyze-btn');if(btn)btn.click();},500);
        }
    },[]);

    function appendExcludePattern(pattern){
        var merged=parseExcludePatterns((excludePatternInput?excludePatternInput+'\n':'')+pattern).join('\n');
        setExcludePatternDraft(merged);
        setLaunchFolderAfterExcludeSave(false);
        setShowExcludeModal(true);
    }

    function resetAnalysisState(){
        setError(null);
        setData(null);
        setSelected(null);
        setBlastRadius(null);
        setOwnership(null);
        setFolderFilter(null);
        setPrData(null);
        setFilePreview(null);
    }

    function openExcludeModal(continueToFolder){
        setExcludePatternDraft(excludePatternInput);
        setLaunchFolderAfterExcludeSave(!!continueToFolder);
        setShowExcludeModal(true);
    }

    function closeExcludeModal(){
        setShowExcludeModal(false);
        setLaunchFolderAfterExcludeSave(false);
    }

    function saveExcludePatterns(){
        var nextInput=excludePatternDraft;
        var nextPatterns=compileExcludePatterns(nextInput);
        var shouldLaunchFolder=launchFolderAfterExcludeSave;
        setExcludePatternInput(nextInput);
        setShowExcludeModal(false);
        setLaunchFolderAfterExcludeSave(false);
        if(shouldLaunchFolder){
            launchLocalFolderPicker(nextPatterns);
        }
    }

    function isProductionFile(path,name,isCode){
        var full=(path||name||'').toLowerCase();
        if(!isCode)return false;
        if(/(^|\/)(test|tests|__tests__|spec|specs|docs?|examples?|demo|demos|fixtures?|__fixtures__|mocks?|__mocks__|stories|storybook|bench|benchmarks)(\/|$)/.test(full))return false;
        if(/\.(md|rst|txt|snap)$/i.test(name||''))return false;
        if(/\.(spec|test)\.[jt]sx?$/.test(full))return false;
        return true;
    }

    function isApiSurfaceFile(path,name){
        var full=(path||name||'').toLowerCase();
        var nm=(name||'').toLowerCase();
        if(/(^|\/)(api|routes?|controllers?|handlers?|endpoints?|resolvers?|graphql|openapi|swagger|gateway)(\/|$)/.test(full))return true;
        if(/(route|router|controller|handler|endpoint|resolver|service|contract|interface|dto|schema|openapi|swagger)/.test(nm))return true;
        if(/(^|\/)(index\.[jt]sx?|public\.[jt]sx?)$/.test(full))return true;
        return false;
    }

    function getPresetLabel(preset,days){
        if(preset==='production')return'Production';
        if(preset==='api')return'API Surface';
        if(preset==='recent')return'Recent '+Math.max(1,days||1)+'d';
        return'All Files';
    }

    function getPresetHelpText(preset,days){
        if(preset==='production')return'Production Only: excludes tests, docs, fixtures, mock files, and common non-runtime paths.';
        if(preset==='api')return'API Surface Only: keeps likely routes/controllers/handlers/service contracts and public entrypoints.';
        if(preset==='recent')return'Recently Changed: keeps files changed in the last '+Math.max(1,days||1)+' day(s) using latest commit date (GitHub) or last-modified timestamp (local).';
        return'All Files: analyzes every discovered file after exclude patterns are applied.';
    }

    function buildPresetNoMatchMessage(meta){
        var label=getPresetLabel(analysisPreset,recentDays);
        if(analysisPreset==='recent'){
            var scanned=meta&&meta.scanned?meta.scanned:0;
            var checked=Math.max(0,scanned-(meta&&meta.errors?meta.errors:0));
            return'No files matched '+label+'. Checked '+checked+'/'+scanned+' files. Try increasing the day window or switching preset.';
        }
        return'No files matched '+label+'. Try All Files or adjust exclude patterns.';
    }

    async function applyGitHubPresetFilter(files,owner,repo,branch){
        if(!files||!files.length)return{files:files||[],meta:{mode:analysisPreset,source:'github',scanned:0,matched:0,errors:0,fallback:false}};
        if(analysisPreset==='all')return{files:files,meta:{mode:'all',source:'github',scanned:files.length,matched:files.length,errors:0,fallback:false}};
        if(analysisPreset==='production'){
            var prodFiles=files.filter(function(file){return isProductionFile(file.path,file.name,file.isCode!==false);});
            return{files:prodFiles,meta:{mode:'production',source:'github',scanned:files.length,matched:prodFiles.length,errors:0,fallback:false}};
        }
        if(analysisPreset==='api'){
            var apiFiles=files.filter(function(file){return isApiSurfaceFile(file.path,file.name);});
            return{files:apiFiles,meta:{mode:'api',source:'github',scanned:files.length,matched:apiFiles.length,errors:0,fallback:false}};
        }
        if(analysisPreset!=='recent')return{files:files,meta:{mode:analysisPreset,source:'github',scanned:files.length,matched:files.length,errors:0,fallback:false}};

        var cutoff=Date.now()-Math.max(1,recentDays)*24*60*60*1000;
        var selected=[];
        var errors=0;
        var BATCH=8;
        for(var i=0;i<files.length;i+=BATCH){
            var end=Math.min(i+BATCH,files.length);
            setProgress('Filtering by recent changes... '+end+'/'+files.length);
            var batch=files.slice(i,end);
            var results=await Promise.all(batch.map(function(file){
                return GitHub.getCommits(owner,repo,file.path,1,branch||null).then(function(commits){
                    var commit=Array.isArray(commits)&&commits.length?commits[0]:null;
                    var dateStr=commit&&commit.commit&&commit.commit.author?commit.commit.author.date:null;
                    var ts=dateStr?Date.parse(dateStr):0;
                    return ts>=cutoff?file:null;
                }).catch(function(){errors++;return null;});
            }));
            results.forEach(function(file){if(file)selected.push(file);});
            await new Promise(function(resolve){setTimeout(resolve,0);});
        }
        var fallback=selected.length===0&&errors===files.length;
        return{files:fallback?files:selected,meta:{mode:'recent',source:'github',scanned:files.length,matched:fallback?files.length:selected.length,errors:errors,fallback:fallback,warning:fallback?'Recent filter fallback: commit history unavailable for this repo/branch, using scanned file set.':(errors>0?'Recent filter partial coverage: '+errors+' file(s) could not load commit metadata.':null)}};
    }

    async function getLocalFileLastModified(dirHandle,path){
        try{
            var parts=path.split('/');
            var current=dirHandle;
            for(var i=0;i<parts.length-1;i++)current=await current.getDirectoryHandle(parts[i]);
            var fileHandle=await current.getFileHandle(parts[parts.length-1]);
            var file=await fileHandle.getFile();
            return file.lastModified||0;
        }catch(e){
            return 0;
        }
    }

    async function applyLocalPresetFilter(files,dirHandle){
        if(!files||!files.length)return{files:files||[],meta:{mode:analysisPreset,source:'local',scanned:0,matched:0,errors:0,fallback:false}};
        if(analysisPreset==='all')return{files:files,meta:{mode:'all',source:'local',scanned:files.length,matched:files.length,errors:0,fallback:false}};
        if(analysisPreset==='production'){
            var prodFiles=files.filter(function(file){return isProductionFile(file.path,file.name,file.isCode!==false);});
            return{files:prodFiles,meta:{mode:'production',source:'local',scanned:files.length,matched:prodFiles.length,errors:0,fallback:false}};
        }
        if(analysisPreset==='api'){
            var apiFiles=files.filter(function(file){return isApiSurfaceFile(file.path,file.name);});
            return{files:apiFiles,meta:{mode:'api',source:'local',scanned:files.length,matched:apiFiles.length,errors:0,fallback:false}};
        }
        if(analysisPreset!=='recent')return{files:files,meta:{mode:analysisPreset,source:'local',scanned:files.length,matched:files.length,errors:0,fallback:false}};

        var cutoff=Date.now()-Math.max(1,recentDays)*24*60*60*1000;
        var selected=[];
        var errors=0;
        var BATCH=10;
        for(var i=0;i<files.length;i+=BATCH){
            var end=Math.min(i+BATCH,files.length);
            setProgress('Filtering by recent changes... '+end+'/'+files.length);
            var batch=files.slice(i,end);
            var results=await Promise.all(batch.map(function(file){return getLocalFileLastModified(dirHandle,file.path).then(function(ts){if(!ts){errors++;return null;}return ts>=cutoff?file:null;});}));
            results.forEach(function(file){if(file)selected.push(file);});
            await new Promise(function(resolve){setTimeout(resolve,0);});
        }
        var fallback=selected.length===0&&errors===files.length;
        return{files:fallback?files:selected,meta:{mode:'recent',source:'local',scanned:files.length,matched:fallback?files.length:selected.length,errors:errors,fallback:fallback,warning:fallback?'Recent filter fallback: file modification metadata unavailable, using scanned file set.':(errors>0?'Recent filter partial coverage: '+errors+' file(s) missing last-modified metadata.':null)}};
    }

    function analyze(){
        var p=parseUrl(repoUrl);
        if(!p){setError('Invalid URL. Use format: owner/repo');return;}
        var currentExcludePatterns=activeExcludePatterns;
        var selectedBranch=(branchInput||'').trim();
        
        // Validate authentication inputs
        if(authMethod==='pat'&&!token){
            setError('Please enter a Personal Access Token');return;
        }
        if(authMethod==='github_app'){
            if(!appId){setError('Please enter the GitHub App ID');return;}
            if(!privateKey){setError('Please set the GitHub App private key');return;}
        }
        
        resetAnalysisState();
        setLocalDirHandle(null);
        setLoading(true);
        setProgress('Initializing...');
        
        // Configure GitHub authentication based on method
        GitHub.token=null;
        GitHub.appId=null;
        GitHub.privateKey=null;
        GitHub.installationToken=null;
        
        if(authMethod==='pat'){
            GitHub.token=token;
        }else if(authMethod==='github_app'){
            GitHub.appId=appId;
            GitHub.privateKey=privateKey;
        }
        
        setRepoInfo(Object.assign({},p,{branch:selectedBranch||null}));

        // Authentication promise - resolve immediately for no auth/PAT, authenticate for GitHub App
        var authPromise;
        if(authMethod==='github_app'){
            setProgress('Authenticating with GitHub App...');
            authPromise=GitHub.authenticateApp(p.owner,p.repo).catch(function(err){
                throw new Error('GitHub App authentication failed: '+err.message);
            });
        }else{
            authPromise=Promise.resolve();
        }
        
        authPromise.then(function(){
            setProgress('Checking rate limit...');
            return GitHub.getRateLimit();
        }).then(function(rl){
            var hasAuth=!!GitHub.token||authMethod==='github_app';
            var estimatedRequests=50;// Conservative estimate for a small-medium repo

            // Warn if rate limit is very low and no authentication
            if(!hasAuth&&rl.remaining<estimatedRequests){
                var resetTime=new Date(rl.reset*1000).toLocaleTimeString();
                var proceed=window.confirm(
                    '⚠️ GitHub API Rate Limit Low\n\n'+
                    'Remaining requests: '+rl.remaining+'/'+rl.limit+'\n'+
                    'Resets at: '+resetTime+'\n\n'+
                    'Without authentication, you only get 60 requests/hour.\n'+
                    'Adding a token or GitHub App gives you 5000 requests/hour.\n\n'+
                    'Authentication options:\n'+
                    '• Token (PAT): GitHub Settings → Developer Settings → Personal access tokens\n'+
                    '• GitHub App: Use App ID + Private Key for organization access\n\n'+
                    'Continue anyway with '+rl.remaining+' requests?'
                );
                if(!proceed){setLoading(false);return Promise.reject('cancelled');}
            }

            setProgress('Scanning repository...');
            return GitHub.scan(p.owner,p.repo,setProgress,currentExcludePatterns,selectedBranch||null);
        }).then(function(files){
            if(!files)return;// Cancelled
            if(!files.length)throw new Error(currentExcludePatterns.length?'No code files found after applying exclude patterns':'No code files found');
            return applyGitHubPresetFilter(files,p.owner,p.repo,selectedBranch||null).then(function(presetFiltered){
                return{files:presetFiltered.files,presetMeta:presetFiltered.meta,excludeRecommendations:buildExcludeRecommendations(files,currentExcludePatterns)};
            });
        }).then(function(filtered){
            if(!filtered)return;
            var files=filtered.files||[];
            var presetMeta=filtered.presetMeta||null;
            var excludeRecommendations=filtered.excludeRecommendations||[];
            if(presetMeta&&presetMeta.warning)showNotification(presetMeta.warning,'warning');
            if(!files.length)throw new Error(buildPresetNoMatchMessage(presetMeta));
            var SOFT_LIMIT=300,HARD_LIMIT=750;
            if(files.length>SOFT_LIMIT&&files.length<=HARD_LIMIT){
                var proceed=window.confirm('This repository has '+files.length+' files.\n\nAnalyzing large repos may be slow and could hit GitHub API rate limits.\n\nTip: Add a GitHub token for higher rate limits (5000/hour vs 60/hour).\n\nProceed with all '+files.length+' files?');
                if(!proceed){setLoading(false);return;}
            }else if(files.length>HARD_LIMIT){
                showNotification('Found '+files.length+' files. Limiting to '+HARD_LIMIT+' for performance.','warning');
            }
            var max=Math.min(files.length,HARD_LIMIT);
            var analyzed=[];
            var allFns=[];
            // Fire repo-level API calls in parallel (P5+P6: 3 calls total, run alongside file processing)
            var communityPromise=GitHub.getCommunityProfile(p.owner,p.repo);
            var contributorsPromise=GitHub.getContributors(p.owner,p.repo);
            var languagesPromise=GitHub.getLanguages(p.owner,p.repo);
            // P8: Security alert APIs — fire in parallel, graceful fallback if PAT lacks scope
            var codeScanPromise=GitHub.getCodeScanningAlerts(p.owner,p.repo);
            var dependabotPromise=GitHub.getDependabotAlerts(p.owner,p.repo);
            var secretScanPromise=GitHub.getSecretScanningAlerts(p.owner,p.repo);

            function processFile(i){
                if(i>=max){finishAnalysis();return;}
                var f=files[i];
                setProgress('Analyzing '+(i+1)+'/'+max+': '+f.name);
                var isCodeFile=f.isCode!==false&&Parser.isCode(f.name);
                if(isCodeFile){
                    Promise.all([
                        GitHub.getFile(p.owner,p.repo,f.path,selectedBranch||null),
                        GitHub.getCommits(p.owner,p.repo,f.path,10,selectedBranch||null).catch(function(){return[];})
                    ]).then(function(results){
                        var content=results[0];
                        var commits=results[1];
                        if(content){
                            var layer=Parser.detectLayer(f.path);
                            var actualIsCode=!Parser.isScriptContainer(f.path)||Parser.hasEmbeddedCode(content,f.path);
                            var fns=actualIsCode?Parser.extract(content,f.path):[];
                            var commitMsgs=Array.isArray(commits)?commits.map(function(c){return c.commit&&c.commit.message?c.commit.message:'';}):[];
                            analyzed.push({path:f.path,name:f.name,folder:f.folder,content:content,functions:fns,lines:content.split('\n').length,layer:layer,churn:Array.isArray(commits)?commits.length:0,commitMessages:commitMsgs,isCode:actualIsCode});
                            if(actualIsCode){
                                fns.forEach(function(fn){allFns.push(Object.assign({},fn,{folder:f.folder,layer:layer}));});
                            }
                        }
                        processFile(i+1);
                    }).catch(function(){processFile(i+1);});
                }else{
                    GitHub.getFile(p.owner,p.repo,f.path,selectedBranch||null).then(function(content){
                        var layer=Parser.detectLayer(f.path);
                        var lines=content?content.split('\n').length:0;
                        analyzed.push({path:f.path,name:f.name,folder:f.folder,content:content||'',functions:[],lines:lines,layer:layer,churn:0,isCode:false});
                        processFile(i+1);
                    }).catch(function(){
                        analyzed.push({path:f.path,name:f.name,folder:f.folder,content:'',functions:[],lines:0,layer:Parser.detectLayer(f.path),churn:0,isCode:false});
                        processFile(i+1);
                    });
                }
            }

            async function finishAnalysis(){
                try{
                // Initialize tree-sitter Python parser (async WASM load, runs in parallel)
                Parser.initTreeSitter();
                // Collect repo-level API results (fired in parallel during file processing)
                var repoLevelResults=await Promise.all([communityPromise,contributorsPromise,languagesPromise]);
                var communityProfile=repoLevelResults[0];
                var contributors=Array.isArray(repoLevelResults[1])?repoLevelResults[1]:[];
                var ghLanguages=repoLevelResults[2]||{};
                // P8: Collect security alert results (graceful — returns {alerts,available,reason})
                var secAlertResults=await Promise.all([codeScanPromise,dependabotPromise,secretScanPromise]);
                var codeScanResult=secAlertResults[0]||{alerts:[],available:false};
                var dependabotResult=secAlertResults[1]||{alerts:[],available:false};
                var secretScanResult=secAlertResults[2]||{alerts:[],available:false};
                // Phase 1: Build function stats index
                setProgress('Building dependency graph (1/5)...');
                await new Promise(function(r){setTimeout(r,0);});
                var fnNames=[...new Set(allFns.map(function(f){return f.name;}))];
                var conns=[];
                var fnStats={};
                // Initialize fnStats with additional metadata for accurate unused detection
                allFns.forEach(function(fn){
                    if(!fnStats[fn.name]){
                        fnStats[fn.name]={
                            internal:0,
                            external:0,
                            callers:new Map(),
                            file:fn.file,
                            folder:fn.folder,
                            line:fn.line,
                            code:fn.code,
                            isTopLevel:fn.isTopLevel!==false,  // Default to true for backward compat
                            isExported:fn.isExported||false,
                            isClassMethod:fn.isClassMethod||false,
                            type:fn.type||'function',
                            decorators:fn.decorators||null,
                            className:fn.className||null
                        };
                    }
                });

                // Wait for tree-sitter to finish loading (started in parallel during Phase 1)
                await Parser.initTreeSitter();
                // Phase 2: Find calls in batches with yielding to prevent UI freeze
                var CALL_BATCH=30;
                for(var bi=0;bi<analyzed.length;bi+=CALL_BATCH){
                    var batchEnd=Math.min(bi+CALL_BATCH,analyzed.length);
                    setProgress('Analyzing dependencies (2/5)... '+batchEnd+'/'+analyzed.length+' files');
                    for(var fi=bi;fi<batchEnd;fi++){
                        var file=analyzed[fi];
                        if(!file.content)continue;
                        // Pass file path and all function defs for accurate call detection
                        var calls=Parser.findCalls(file.content,fnNames,file.path,allFns);
                        Object.entries(calls).forEach(function(entry){
                            var fn=entry[0],cnt=entry[1];
                            // Only process if there are actual calls (cnt > 0)
                            if(cnt<=0)return;
                            var def=fnStats[fn]?fnStats[fn].file:null;
                            if(def){
                                if(def===file.path){
                                    fnStats[fn].internal+=cnt;
                                }else{
                                    conns.push({source:def,target:file.path,fn:fn,count:cnt});
                                    var ex=fnStats[fn].callers.get(file.path);
                                    if(ex)ex.count+=cnt;else fnStats[fn].callers.set(file.path,{file:file.path,name:file.name,count:cnt});
                                    fnStats[fn].external+=cnt;
                                }
                            }
                        });
                    }
                    // Yield to browser between batches
                    await new Promise(function(r){setTimeout(r,0);});
                }
                Object.values(fnStats).forEach(function(s){s.callers=Array.from(s.callers.values());s.count=s.internal+s.external;});
                // Phase 2.5: Resolve markdown/wiki links into graph edges
                setProgress('Resolving markdown links...');
                await new Promise(function(r){setTimeout(r,0);});
                var mdAllPaths=analyzed.map(function(f){return f.path;});
                analyzed.forEach(function(file){
                    if(!Parser.isMarkdown(file.name))return;
                    file.layer='note';
                    if(!file.content)return;
                    var links=Parser.extractMarkdownLinks(file.content);
                    var deps=[];
                    links.forEach(function(link){
                        var resolved=Parser.resolveMarkdownLink(link.target,file.path,mdAllPaths,link.kind);
                        deps.push({kind:link.kind,raw:link.raw,target:link.target,resolved:resolved});
                        if(resolved&&resolved!==file.path){
                            conns.push({source:file.path,target:resolved,fn:link.raw,count:1,kind:link.kind});
                        }
                    });
                    file.dependencies=deps;
                });
                analyzed.forEach(function(f){if(!f.dependencies)f.dependencies=[];});
                var issues=[];
                // Only flag truly unused functions with language-aware filtering
                // Understands Python decorators, framework conventions, magic methods, etc.
                var deadFns=Object.entries(fnStats).filter(function(x){
                    var name=x[0],stats=x[1];
                    // Skip if has any calls (internal or external)
                    if(stats.internal>0||stats.external>0)return false;
                    // Skip class methods - they're called via instance
                    if(stats.isClassMethod)return false;
                    // Skip nested functions - they're private to their scope
                    if(!stats.isTopLevel)return false;
                    // Python-aware: skip decorated functions (framework-registered: routes, signals, etc.)
                    if(stats.decorators&&stats.decorators.length>0)return false;
                    // Python-aware: skip classes (instantiated dynamically, registered by frameworks)
                    if(stats.type==='class'||stats.type==='dataclass'||stats.type==='abstract_class')return false;
                    // Python-aware: skip dunder/magic methods (__init__, __str__, __enter__, etc.)
                    var baseName=name.includes('.')?name.split('.').pop():name;
                    if(baseName.startsWith('__')&&baseName.endsWith('__'))return false;
                    // Python-aware: skip test functions (discovered by pytest/unittest)
                    if(baseName.startsWith('test_')||baseName==='setUp'||baseName==='tearDown'||baseName==='setUpClass'||baseName==='tearDownClass')return false;
                    if(stats.file&&(stats.file.includes('test_')||stats.file.includes('_test.')||stats.file.includes('/tests/')))return false;
                    // Python-aware: skip migration functions (Alembic upgrade/downgrade)
                    if((baseName==='upgrade'||baseName==='downgrade')&&stats.file&&(stats.file.includes('migration')||stats.file.includes('alembic')||stats.file.includes('versions')))return false;
                    // Python-aware: skip common framework entry points and hooks
                    if(['main','create_app','make_app','get_app','setup','configure','register','on_startup','on_shutdown','lifespan'].indexOf(baseName)>=0)return false;
                    // JS/TS: skip explicitly exported functions (module exports are meant for external consumption)
                    // The export keyword is an explicit declaration of public API - if call detection
                    // can't find usage, it's a detection gap, not genuinely dead code
                    if(stats.isExported&&stats.file&&/\.[jt]sx?$/.test(stats.file))return false;
                    // Skip functions in test/spec files (broader pattern)
                    if(stats.file&&(/\.(?:spec|test)\.[jt]sx?$/.test(stats.file)||stats.file.includes('__tests__')))return false;
                    // This is a top-level function with zero calls and no framework registration
                    return true;
                });
                if(deadFns.length)issues.push({type:'warning',title:deadFns.length+' Unused Functions',desc:'Functions not called from other files',items:deadFns.map(function(x){return{name:x[0],file:x[1].file,line:x[1].line,code:x[1].code};})});
                var godFiles=analyzed.filter(function(f){return f.functions.length>15;});
                if(godFiles.length)issues.push({type:'critical',title:godFiles.length+' Large Files',desc:'Files with 15+ functions',items:godFiles.map(function(f){return{name:f.name+' ('+f.functions.length+' fns)',file:f.path,fns:f.functions.length,lines:f.lines};})});
                var coupling={};
                conns.forEach(function(c){coupling[c.target]=(coupling[c.target]||0)+1;});
                var highCoup=Object.entries(coupling).filter(function(x){return x[1]>8;}).sort(function(a,b){return b[1]-a[1];});
                if(highCoup.length)issues.push({type:'warning',title:highCoup.length+' Highly Coupled',desc:'Files imported by 8+ others',items:highCoup.map(function(x){return{name:x[0].split('/').pop()+' ('+x[1]+' imports)',file:x[0],imports:x[1]};})});
                var connSet=new Set(conns.map(function(c){return c.source+'|'+c.target;}));
                var circular=[];
                conns.forEach(function(c){if(connSet.has(c.target+'|'+c.source)){var key=[c.source,c.target].sort().join('|');if(!circular.includes(key))circular.push(key);}});
                if(circular.length)issues.push({type:'critical',title:circular.length+' Circular Dependencies',desc:'Files that import each other',items:circular.map(function(p){var parts=p.split('|');return{name:parts.map(function(x){return x.split('/').pop();}).join(' ↔ '),files:parts};})});

                // Phase 3: Pattern and security detection with yielding
                setProgress('Detecting patterns (3/5)...');
                await new Promise(function(r){setTimeout(r,0);});
                var patterns=Parser.detectPatterns(analyzed);
                var securityIssues=Parser.detectSecurity(analyzed);

                // Phase 4: Duplicate detection and complexity
                setProgress('Analyzing code quality (4/5)...');
                await new Promise(function(r){setTimeout(r,0);});
                var duplicates=Parser.detectDuplicates(analyzed,allFns);
                var layerViolations=Parser.detectLayerViolations(analyzed,conns);

                // Phase 4b: Zero-cost enrichments (tech debt, churn, deps, extra security)
                var techDebt=Parser.detectTechDebt(analyzed);
                var churnHotspots=Parser.detectChurnHotspots(analyzed);
                var depRisks=Parser.detectDependencyRisks(analyzed);
                // Add complexity to each file in batches
                for(var ci=0;ci<analyzed.length;ci+=CALL_BATCH){
                    var cEnd=Math.min(ci+CALL_BATCH,analyzed.length);
                    for(var cj=ci;cj<cEnd;cj++){
                        analyzed[cj].complexity=Parser.calcComplexity(analyzed[cj].content,analyzed[cj].path);
                    }
                    if(ci+CALL_BATCH<analyzed.length)await new Promise(function(r){setTimeout(r,0);});
                }

                // Phase 5: Free file content from memory (can be re-fetched for preview)
                setProgress('Finalizing (5/5)...');
                await new Promise(function(r){setTimeout(r,0);});
                analyzed.forEach(function(f){f.content=null;});

                var folders=[...new Set(analyzed.map(function(f){return f.folder;}))].sort();
                var tree=buildTree(analyzed);
                var totalLoc=analyzed.reduce(function(s,f){return s+f.lines;},0);
                var langStats={};
                analyzed.forEach(function(f){var ext=f.name.split('.').pop().toLowerCase();langStats[ext]=(langStats[ext]||0)+f.lines;});
                var langArray=Object.entries(langStats).sort(function(a,b){return b[1]-a[1];}).map(function(e){return{ext:e[0],lines:e[1],pct:Math.round(e[1]/totalLoc*100)};});
                // P2: Prefer GitHub Languages API when available (byte-accurate)
                var ghLangKeys=Object.keys(ghLanguages||{});
                if(ghLangKeys.length>0){
                    var ghTotal=ghLangKeys.reduce(function(s,k){return s+ghLanguages[k];},0);
                    if(ghTotal>0)langArray=ghLangKeys.sort(function(a,b){return ghLanguages[b]-ghLanguages[a];}).map(function(k){return{ext:k,lines:ghLanguages[k],pct:Math.round(ghLanguages[k]/ghTotal*100),source:'github'};});
                }
                // Add duplicate issues - include ALL items
                if(duplicates.length>0){
                    var nameDups=duplicates.filter(function(d){return d.type==='name';});
                    var codeDups=duplicates.filter(function(d){return d.type==='code';});
                    if(nameDups.length)issues.push({type:'warning',title:nameDups.length+' Duplicate Function Names',desc:'Same function name in multiple files',items:nameDups.map(function(d){return{name:d.name+' ('+d.count+' files)',suggestion:d.suggestion,files:d.files,count:d.count};})});
                    if(codeDups.length)issues.push({type:'warning',title:codeDups.length+' Similar Code Blocks',desc:'Copy-paste code detected',items:codeDups.map(function(d){return{name:d.name,suggestion:d.suggestion,files:d.files};})});
                }
                if(layerViolations.length>0){
                    issues.push({type:'critical',title:layerViolations.length+' Architecture Violations',desc:'Lower layers importing from higher layers',items:layerViolations.map(function(v){return{name:v.fromLayer+' → '+v.toLayer,file:v.from,toFile:v.to,fn:v.fn,suggestion:v.suggestion};})});
                }
                var highComplexity=analyzed.filter(function(f){return f.complexity&&f.complexity.level==='critical';}).sort(function(a,b){return b.complexity.score-a.complexity.score;});
                if(highComplexity.length)issues.push({type:'warning',title:highComplexity.length+' High Complexity Files',desc:'Files with complexity score >30',items:highComplexity.map(function(f){return{name:f.name+' ('+f.complexity.score+')',file:f.path,score:f.complexity.score,lines:f.lines};})});
                // Wire tech debt signals into issues
                if(techDebt.totalMarkers>0)issues.push({type:'warning',title:techDebt.totalMarkers+' Tech Debt Markers',desc:'TODO/FIXME/HACK/XXX found in commit messages — signals unfinished or fragile code',items:techDebt.files.map(function(td){return{name:td.name+' ('+td.markers+' markers)',file:td.path,markers:td.markers,details:td.details};})});
                if(techDebt.reverts>0)issues.push({type:'critical',title:techDebt.reverts+' Reverted Commits',desc:'Revert commits indicate instability — these files had changes rolled back',items:techDebt.revertFiles.map(function(rf){return{name:rf.name+' ('+rf.count+' reverts)',file:rf.path};})});
                // Wire churn hotspots into issues
                if(churnHotspots.length>0)issues.push({type:'warning',title:churnHotspots.length+' Churn Hotspots',desc:'Files changed most frequently are risk areas — high churn correlates with bugs',items:churnHotspots.map(function(ch){return{name:ch.name+' ('+ch.churn+' commits)',file:ch.path,churn:ch.churn,complexity:ch.complexity};})});
                // Wire dependency manifest risks into issues and security
                if(depRisks.issues.length>0)depRisks.issues.forEach(function(di){issues.push(di);});
                if(depRisks.security.length>0)securityIssues=securityIssues.concat(depRisks.security);
                // Wire P5+P6: community profile and contributor analysis
                var repoHealth=Parser.analyzeRepoHealth(communityProfile);
                var busFactor=Parser.analyzeBusFactor(contributors);
                if(repoHealth.issues.length>0)repoHealth.issues.forEach(function(ri){issues.push(ri);});
                if(busFactor.issues.length>0)busFactor.issues.forEach(function(bi){issues.push(bi);});
                // Wire P8: GitHub security alerts (optional — graceful if PAT lacks scope)
                var ghAlerts=Parser.parseSecurityAlerts(codeScanResult,dependabotResult,secretScanResult);
                if(ghAlerts.security.length>0)securityIssues=securityIssues.concat(ghAlerts.security);
                if(ghAlerts.issues.length>0)ghAlerts.issues.forEach(function(ai){issues.push(ai);});
                var dataObj={files:analyzed,functions:allFns,connections:conns,fnStats:fnStats,folders:folders,tree:tree,issues:issues,patterns:patterns,securityIssues:securityIssues,duplicates:duplicates,layerViolations:layerViolations,techDebt:techDebt,churnHotspots:churnHotspots,depRisks:depRisks,repoHealth:repoHealth,busFactor:busFactor,ghLanguages:ghLanguages,ghAlerts:ghAlerts,deadFunctions:deadFns.map(function(x){var codeLines=x[1].code?x[1].code.split('\n').length:0;return{name:x[0],file:x[1].file,folder:x[1].folder,line:x[1].line,code:x[1].code,codeLines:codeLines,ext:x[1].file.split('.').pop()};}),excludePatterns:currentExcludePatterns.map(function(x){return x.raw;}),excludeRecommendations:excludeRecommendations,branch:selectedBranch||null,preset:analysisPreset,recentDays:recentDays,presetMeta:presetMeta,stats:{files:analyzed.length,functions:allFns.length,connections:conns.length,dead:deadFns.length,patterns:patterns.length,security:securityIssues.filter(function(i){return i.severity==='high';}).length,duplicates:duplicates.length,violations:layerViolations.length,techDebtMarkers:techDebt.totalMarkers,churnHotspots:churnHotspots.length,depRisks:depRisks.issues.length+depRisks.security.length,repoHealthScore:repoHealth.score,busFactorScore:busFactor.score,ghAlertCount:ghAlerts.security.length,loc:totalLoc,languages:langArray}};
                dataObj.suggestions=Parser.generateSuggestions(dataObj);
                setData(dataObj);
                setExpandedPaths(new Set(['']));
                var params=new URLSearchParams();
                params.set('repo',p.owner+'/'+p.repo);
                if(selectedBranch)params.set('branch',selectedBranch);
                var newUrl=window.location.pathname+'?'+params.toString();
                window.history.replaceState({},'',newUrl);
                setLoading(false);
                }catch(err){
                    setError('Analysis failed: '+(err.message||err)+'. Try a smaller repository.');
                    setLoading(false);
                }
            }

            processFile(0);
        }).catch(function(e){if(e!=='cancelled'){setError(e.message||e);setLoading(false);}});
    }

    function launchLocalFolderPicker(compiledPatterns){
        if(!window.showDirectoryPicker){
            setError('Your browser does not support folder selection. Please use Chrome, Edge, or a Chromium-based browser.');
            return;
        }
        window.showDirectoryPicker().then(function(dirHandle){
            setLocalDirHandle(dirHandle);
            resetAnalysisState();
            setLoading(true);
            setProgress('Reading local folder...');
            readLocalFolder(dirHandle,compiledPatterns||activeExcludePatterns);
        }).catch(function(e){
            if(e.name!=='AbortError'){
                setError('Failed to open folder: '+(e.message||e));
            }
        });
    }

    function openLocalFolder(){
        openExcludeModal(true);
    }

    function refreshAnalysis(){
        if(localDirHandle){
            resetAnalysisState();
            setLoading(true);
            setProgress('Reading local folder...');
            readLocalFolder(localDirHandle,activeExcludePatterns);
            return;
        }
        analyze();
    }

    async function readLocalFolder(dirHandle, compiledPatterns, path=''){
        var files=[];
        var SOFT_LIMIT=500,HARD_LIMIT=2000;
        var fileCount=0;

        async function readDirectory(handle, currentPath){
            for await (const entry of handle.values()){
                if(fileCount>=HARD_LIMIT)break;
                var entryPath=currentPath?currentPath+'/'+entry.name:entry.name;
                if(entry.kind==='directory'){
                    if(!shouldIgnoreDirectory(entryPath,entry.name,compiledPatterns)){
                        await readDirectory(entry,entryPath);
                    }
                }else if(entry.kind==='file'){
                    var name=entry.name;
                    if(shouldExcludeFile(entryPath,name,compiledPatterns))continue;
                    var folder=currentPath||'root';
                    files.push({path:entryPath,name:name,folder:folder,size:0,isCode:Parser.isCode(name)});
                    fileCount++;
                    if(fileCount%50===0)setProgress('Scanning files... '+fileCount+' found');
                }
            }
        }

        await readDirectory(dirHandle,'');
        var unfilteredFiles=files.slice();
        var presetFiltered=await applyLocalPresetFilter(files,dirHandle);
        files=presetFiltered.files;
        var presetMeta=presetFiltered.meta;
        var excludeRecommendations=buildExcludeRecommendations(unfilteredFiles,compiledPatterns||[]);
        if(presetMeta&&presetMeta.warning)showNotification(presetMeta.warning,'warning');
        
        if(files.length>SOFT_LIMIT&&files.length<=HARD_LIMIT){
            var proceed=window.confirm('This folder has '+files.length+' files.\n\nAnalyzing large folders may be slow.\n\nProceed with all '+files.length+' files?');
            if(!proceed){setLoading(false);return;}
        }else if(files.length>HARD_LIMIT){
            showNotification('Found '+files.length+' files. Limiting to '+HARD_LIMIT+' for performance.','warning');
        }
        var max=Math.min(files.length,HARD_LIMIT);
        var analyzed=[];
        var allFns=[];

        async function processFile(i){
            if(i>=max){await finishAnalysis();return;}
            var f=files[i];
            // Yield to browser every 50 files to keep UI responsive
            if(i>0&&i%50===0)await new Promise(function(r){setTimeout(r,0);});
            setProgress('Analyzing '+(i+1)+'/'+max+': '+f.name);
            var isCodeFile=f.isCode!==false&&Parser.isCode(f.name);
            
            // Get file handle from path
            var parts=f.path.split('/');
            var currentHandle=dirHandle;
            for(var j=0;j<parts.length-1;j++){
                if(currentHandle.values){
                    var found=false;
                    for await (const entry of currentHandle.values()){
                        if(entry.name===parts[j]&&entry.kind==='directory'){
                            currentHandle=entry;
                            found=true;
                            break;
                        }
                    }
                    if(!found)break;
                }
            }
            
            try{
                if(isCodeFile){
                    var fileHandle=await currentHandle.getFileHandle(parts[parts.length-1]);
                    var fileObj=await fileHandle.getFile();
                    var content=await fileObj.text();
                    var layer=Parser.detectLayer(f.path);
                    var actualIsCode=!Parser.isScriptContainer(f.path)||Parser.hasEmbeddedCode(content,f.path);
                    var fns=actualIsCode?Parser.extract(content,f.path):[];
                    analyzed.push({path:f.path,name:f.name,folder:f.folder,content:content,functions:fns,lines:content.split('\n').length,layer:layer,churn:0,isCode:actualIsCode});
                    if(actualIsCode){
                        fns.forEach(function(fn){allFns.push(Object.assign({},fn,{folder:f.folder,layer:layer}));});
                    }
                    processFile(i+1);
                }else{
                    var fileHandle=await currentHandle.getFileHandle(parts[parts.length-1]);
                    var fileObj=await fileHandle.getFile();
                    var content=await fileObj.text();
                    var layer=Parser.detectLayer(f.path);
                    var lines=content?content.split('\n').length:0;
                    analyzed.push({path:f.path,name:f.name,folder:f.folder,content:content||'',functions:[],lines:lines,layer:layer,churn:0,isCode:false});
                    processFile(i+1);
                }
            }catch(e){
                analyzed.push({path:f.path,name:f.name,folder:f.folder,content:'',functions:[],lines:0,layer:Parser.detectLayer(f.path),churn:0,isCode:false});
                processFile(i+1);
            }
        }

        async function finishAnalysis(){
            try{
            // Initialize tree-sitter Python parser (async WASM load, runs in parallel)
            Parser.initTreeSitter();
            // Phase 1: Build function stats index
            setProgress('Building dependency graph (1/5)...');
            await new Promise(function(r){setTimeout(r,0);});
            var fnNames=[...new Set(allFns.map(function(f){return f.name;}))];
            var conns=[];
            var fnStats={};
            allFns.forEach(function(fn){
                if(!fnStats[fn.name]){
                    fnStats[fn.name]={
                        internal:0,
                        external:0,
                        callers:new Map(),
                        file:fn.file,
                        folder:fn.folder,
                        line:fn.line,
                        code:fn.code,
                        isTopLevel:fn.isTopLevel!==false,
                        isExported:fn.isExported||false,
                        isClassMethod:fn.isClassMethod||false,
                        type:fn.type||'function',
                        decorators:fn.decorators||null,
                        className:fn.className||null
                    };
                }
            });

            // Wait for tree-sitter to finish loading (started in parallel during Phase 1)
            await Parser.initTreeSitter();
            // Phase 2: Find calls in batches with yielding to prevent UI freeze
            var CALL_BATCH=30;
            for(var bi=0;bi<analyzed.length;bi+=CALL_BATCH){
                var batchEnd=Math.min(bi+CALL_BATCH,analyzed.length);
                setProgress('Analyzing dependencies (2/5)... '+batchEnd+'/'+analyzed.length+' files');
                for(var fi=bi;fi<batchEnd;fi++){
                    var file=analyzed[fi];
                    if(!file.content)continue;
                    var calls=Parser.findCalls(file.content,fnNames,file.path,allFns);
                    Object.entries(calls).forEach(function(entry){
                        var fn=entry[0],cnt=entry[1];
                        if(cnt<=0)return;
                        var def=fnStats[fn]?fnStats[fn].file:null;
                        if(def){
                            if(def===file.path){
                                fnStats[fn].internal+=cnt;
                            }else{
                                conns.push({source:def,target:file.path,fn:fn,count:cnt});
                                var ex=fnStats[fn].callers.get(file.path);
                                if(ex)ex.count+=cnt;else fnStats[fn].callers.set(file.path,{file:file.path,name:file.name,count:cnt});
                                fnStats[fn].external+=cnt;
                            }
                        }
                    });
                }
                // Yield to browser between batches
                await new Promise(function(r){setTimeout(r,0);});
            }
            Object.values(fnStats).forEach(function(s){s.callers=Array.from(s.callers.values());s.count=s.internal+s.external;});
            // Phase 2.5: Resolve markdown/wiki links into graph edges
            setProgress('Resolving markdown links...');
            await new Promise(function(r){setTimeout(r,0);});
            var mdAllPaths=analyzed.map(function(f){return f.path;});
            analyzed.forEach(function(file){
                if(!Parser.isMarkdown(file.name))return;
                file.layer='note';
                if(!file.content)return;
                var links=Parser.extractMarkdownLinks(file.content);
                var deps=[];
                links.forEach(function(link){
                    var resolved=Parser.resolveMarkdownLink(link.target,file.path,mdAllPaths,link.kind);
                    deps.push({kind:link.kind,raw:link.raw,target:link.target,resolved:resolved});
                    if(resolved&&resolved!==file.path){
                        conns.push({source:file.path,target:resolved,fn:link.raw,count:1,kind:link.kind});
                    }
                });
                file.dependencies=deps;
            });
            analyzed.forEach(function(f){if(!f.dependencies)f.dependencies=[];});
            var issues=[];
            var deadFns=Object.entries(fnStats).filter(function(x){
                var name=x[0],stats=x[1];
                if(stats.internal>0||stats.external>0)return false;
                if(stats.isClassMethod)return false;
                if(!stats.isTopLevel)return false;
                // Python-aware: skip decorated functions (framework-registered: routes, signals, etc.)
                if(stats.decorators&&stats.decorators.length>0)return false;
                // Python-aware: skip classes
                if(stats.type==='class'||stats.type==='dataclass'||stats.type==='abstract_class')return false;
                // Python-aware: skip dunder/magic methods
                var baseName=name.includes('.')?name.split('.').pop():name;
                if(baseName.startsWith('__')&&baseName.endsWith('__'))return false;
                // Python-aware: skip test functions
                if(baseName.startsWith('test_')||baseName==='setUp'||baseName==='tearDown'||baseName==='setUpClass'||baseName==='tearDownClass')return false;
                if(stats.file&&(stats.file.includes('test_')||stats.file.includes('_test.')||stats.file.includes('/tests/')))return false;
                // Python-aware: skip migration functions (Alembic)
                if((baseName==='upgrade'||baseName==='downgrade')&&stats.file&&(stats.file.includes('migration')||stats.file.includes('alembic')||stats.file.includes('versions')))return false;
                // Python-aware: skip common framework entry points
                if(['main','create_app','make_app','get_app','setup','configure','register','on_startup','on_shutdown','lifespan'].indexOf(baseName)>=0)return false;
                // JS/TS: skip explicitly exported functions (module exports are meant for external consumption)
                if(stats.isExported&&stats.file&&/\.[jt]sx?$/.test(stats.file))return false;
                // Skip functions in test/spec files (broader pattern)
                if(stats.file&&(/\.(?:spec|test)\.[jt]sx?$/.test(stats.file)||stats.file.includes('__tests__')))return false;
                return true;
            });
            if(deadFns.length)issues.push({type:'warning',title:deadFns.length+' Unused Functions',desc:'Functions not called from other files',items:deadFns.map(function(x){return{name:x[0],file:x[1].file,line:x[1].line,code:x[1].code};})});
            var godFiles=analyzed.filter(function(f){return f.functions.length>15;});
            if(godFiles.length)issues.push({type:'critical',title:godFiles.length+' Large Files',desc:'Files with 15+ functions',items:godFiles.map(function(f){return{name:f.name+' ('+f.functions.length+' fns)',file:f.path,fns:f.functions.length,lines:f.lines};})});
            var coupling={};
            conns.forEach(function(c){coupling[c.target]=(coupling[c.target]||0)+1;});
            var highCoup=Object.entries(coupling).filter(function(x){return x[1]>8;}).sort(function(a,b){return b[1]-a[1];});
            if(highCoup.length)issues.push({type:'warning',title:highCoup.length+' Highly Coupled',desc:'Files imported by 8+ others',items:highCoup.map(function(x){return{name:x[0].split('/').pop()+' ('+x[1]+' imports)',file:x[0],imports:x[1]};})});
            var connSet=new Set(conns.map(function(c){return c.source+'|'+c.target;}));
            var circular=[];
            conns.forEach(function(c){if(connSet.has(c.target+'|'+c.source)){var key=[c.source,c.target].sort().join('|');if(!circular.includes(key))circular.push(key);}});
            if(circular.length)issues.push({type:'critical',title:circular.length+' Circular Dependencies',desc:'Files that import each other',items:circular.map(function(p){var parts=p.split('|');return{name:parts.map(function(x){return x.split('/').pop();}).join(' ↔ '),files:parts};})});

            // Phase 3: Pattern and security detection with yielding
            setProgress('Detecting patterns (3/5)...');
            await new Promise(function(r){setTimeout(r,0);});
            var patterns=Parser.detectPatterns(analyzed);
            var securityIssues=Parser.detectSecurity(analyzed);

            // Phase 4: Duplicate detection and complexity (most expensive)
            setProgress('Analyzing code quality (4/5)...');
            await new Promise(function(r){setTimeout(r,0);});
            var duplicates=Parser.detectDuplicates(analyzed,allFns);
            var layerViolations=Parser.detectLayerViolations(analyzed,conns);

            // Phase 4b: Zero-cost enrichments (tech debt, churn, deps, extra security)
            var techDebt=Parser.detectTechDebt(analyzed);
            var churnHotspots=Parser.detectChurnHotspots(analyzed);
            var depRisks=Parser.detectDependencyRisks(analyzed);

            // Calculate complexity in batches
            for(var ci=0;ci<analyzed.length;ci+=CALL_BATCH){
                var cEnd=Math.min(ci+CALL_BATCH,analyzed.length);
                for(var cj=ci;cj<cEnd;cj++){
                    analyzed[cj].complexity=Parser.calcComplexity(analyzed[cj].content,analyzed[cj].path);
                }
                if(ci+CALL_BATCH<analyzed.length)await new Promise(function(r){setTimeout(r,0);});
            }

            // Phase 5: Free file content from memory (can be lazy-loaded for preview)
            setProgress('Finalizing (5/5)...');
            await new Promise(function(r){setTimeout(r,0);});
            analyzed.forEach(function(f){f.content=null;});

            var folders=[...new Set(analyzed.map(function(f){return f.folder;}))].sort();
            var tree=buildTree(analyzed);
            var totalLoc=analyzed.reduce(function(s,f){return s+f.lines;},0);
            var langStats={};
            analyzed.forEach(function(f){var ext=f.name.split('.').pop().toLowerCase();langStats[ext]=(langStats[ext]||0)+f.lines;});
            var langArray=Object.entries(langStats).sort(function(a,b){return b[1]-a[1];}).map(function(e){return{ext:e[0],lines:e[1],pct:Math.round(e[1]/totalLoc*100)};});
            if(duplicates.length>0){
                var nameDups=duplicates.filter(function(d){return d.type==='name';});
                var codeDups=duplicates.filter(function(d){return d.type==='code';});
                if(nameDups.length)issues.push({type:'warning',title:nameDups.length+' Duplicate Function Names',desc:'Same function name in multiple files',items:nameDups.map(function(d){return{name:d.name+' ('+d.count+' files)',suggestion:d.suggestion,files:d.files,count:d.count};})});
                if(codeDups.length)issues.push({type:'warning',title:codeDups.length+' Similar Code Blocks',desc:'Copy-paste code detected',items:codeDups.map(function(d){return{name:d.name,suggestion:d.suggestion,files:d.files};})});
            }
            if(layerViolations.length>0){
                issues.push({type:'critical',title:layerViolations.length+' Architecture Violations',desc:'Lower layers importing from higher layers',items:layerViolations.map(function(v){return{name:v.fromLayer+' → '+v.toLayer,file:v.from,toFile:v.to,fn:v.fn,suggestion:v.suggestion};})});
            }
            var highComplexity=analyzed.filter(function(f){return f.complexity&&f.complexity.level==='critical';}).sort(function(a,b){return b.complexity.score-a.complexity.score;});
            if(highComplexity.length)issues.push({type:'warning',title:highComplexity.length+' High Complexity Files',desc:'Files with complexity score >30',items:highComplexity.map(function(f){return{name:f.name+' ('+f.complexity.score+')',file:f.path,score:f.complexity.score,lines:f.lines};})});
            // Wire tech debt signals into issues (local)
            if(techDebt.totalMarkers>0)issues.push({type:'warning',title:techDebt.totalMarkers+' Tech Debt Markers',desc:'TODO/FIXME/HACK/XXX found in commit messages — signals unfinished or fragile code',items:techDebt.files.map(function(td){return{name:td.name+' ('+td.markers+' markers)',file:td.path,markers:td.markers,details:td.details};})});
            if(techDebt.reverts>0)issues.push({type:'critical',title:techDebt.reverts+' Reverted Commits',desc:'Revert commits indicate instability — these files had changes rolled back',items:techDebt.revertFiles.map(function(rf){return{name:rf.name+' ('+rf.count+' reverts)',file:rf.path};})});
            if(churnHotspots.length>0)issues.push({type:'warning',title:churnHotspots.length+' Churn Hotspots',desc:'Files changed most frequently are risk areas — high churn correlates with bugs',items:churnHotspots.map(function(ch){return{name:ch.name+' ('+ch.churn+' commits)',file:ch.path,churn:ch.churn,complexity:ch.complexity};})});
            if(depRisks.issues.length>0)depRisks.issues.forEach(function(di){issues.push(di);});
            if(depRisks.security.length>0)securityIssues=securityIssues.concat(depRisks.security);
            var dataObj={files:analyzed,functions:allFns,connections:conns,fnStats:fnStats,folders:folders,tree:tree,issues:issues,patterns:patterns,securityIssues:securityIssues,duplicates:duplicates,layerViolations:layerViolations,techDebt:techDebt,churnHotspots:churnHotspots,depRisks:depRisks,deadFunctions:deadFns.map(function(x){var codeLines=x[1].code?x[1].code.split('\n').length:0;return{name:x[0],file:x[1].file,folder:x[1].folder,line:x[1].line,code:x[1].code,codeLines:codeLines,ext:x[1].file.split('.').pop()};}),excludePatterns:(compiledPatterns||[]).map(function(x){return x.raw;}),excludeRecommendations:excludeRecommendations,branch:null,preset:analysisPreset,recentDays:recentDays,presetMeta:presetMeta,stats:{files:analyzed.length,functions:allFns.length,connections:conns.length,dead:deadFns.length,patterns:patterns.length,security:securityIssues.filter(function(i){return i.severity==='high';}).length,duplicates:duplicates.length,violations:layerViolations.length,techDebtMarkers:techDebt.totalMarkers,churnHotspots:churnHotspots.length,depRisks:depRisks.issues.length+depRisks.security.length,loc:totalLoc,languages:langArray}};
            dataObj.suggestions=Parser.generateSuggestions(dataObj);
            setData(dataObj);
            setExpandedPaths(new Set(['']));
            setRepoInfo({owner:'local',repo:'folder',name:'Local Folder'});
            setLoading(false);
            }catch(err){
                setError('Analysis failed: '+(err.message||err)+'. Try a smaller folder or subfolder.');
                setLoading(false);
            }
        }

        if(files.length===0){
            setError(buildPresetNoMatchMessage(presetMeta));
            setLoading(false);
            return;
        }

        processFile(0);
    }

    var selectFile=useCallback(function(path){
        if(!data)return;
        var file=data.files.find(function(f){return f.path===path;});
        if(file){
            setSelected(file);
            setRightTab('details');
            var blast=calcBlast(path,data.connections,data.files);
            setBlastRadius(blast);
            setOwnership(null);
            setExpandedFns(new Set());
            if(repoInfo&&!localDirHandle){
                setOwnerLoading(true);
                GitHub.getBlame(repoInfo.owner,repoInfo.repo,path,repoInfo&&repoInfo.branch?repoInfo.branch:null).then(function(owners){setOwnership(owners);setOwnerLoading(false);}).catch(function(){setOwnerLoading(false);});
            }else if(localDirHandle){
                setOwnerLoading(false);
                setOwnership([]);
            }
            updateGraphHighlight(path,blast);
        }
    },[data,repoInfo,localDirHandle]);
    selectFileRef.current=selectFile;

    function updateGraphHighlight(path,blast){
        if(!nodesRef.current||!linksRef.current)return;
        var affectedSet=new Set(blast?blast.affected:[]);
        nodesRef.current.selectAll('.nc').transition().duration(200)
            .attr('opacity',function(n){if(n.id===path)return 1;if(affectedSet.has(n.id))return 1;return path?0.2:1;})
            .attr('fill',function(n){if(n.id===path)return'#ff5f5f';if(affectedSet.has(n.id))return'#ff9f43';return getNodeColor(n);});
        linksRef.current.transition().duration(200)
            .attr('stroke-opacity',function(l){var src=l.source.id||l.source;var tgt=l.target.id||l.target;if(src===path||tgt===path)return 0.8;return path?0.05:0.4;})
            .attr('stroke',function(l){var src=l.source.id||l.source;var tgt=l.target.id||l.target;if(src===path||tgt===path)return'var(--acc)';return theme==='light'?'#ccc':'#333';});
    }

    function getNodeColor(d){
        if(colorMode==='folder')return colorMap[d.folder]||COLORS[0];
        if(colorMode==='layer')return LAYER_COLORS[d.layer]||LAYER_COLORS['utils'];
        if(colorMode==='churn')return colorMap[d.id]||'#22c55e';
        return COLORS[0];
    }

    var togglePath=useCallback(function(p){setExpandedPaths(function(prev){var n=new Set(prev);if(n.has(p))n.delete(p);else n.add(p);return n;});},[]);
    var toggleCard=useCallback(function(id){setExpandedCards(function(prev){var n=new Set(prev);if(n.has(id))n.delete(id);else n.add(id);return n;});},[]);
    var toggleFn=useCallback(function(name){setExpandedFns(function(prev){var n=new Set(prev);if(n.has(name))n.delete(name);else n.add(name);return n;});},[]);

    // Open file preview
    function openFilePreview(path,line){
        if(!repoInfo)return;
        var filename=path.split('/').pop();
        setFilePreview({path:path,filename:filename,content:null,line:line||null,loading:true,error:null});
        // Check if we already have the content in data
        if(data){
            var existingFile=data.files.find(function(f){return f.path===path;});
            if(existingFile&&existingFile.content){
                setFilePreview({path:path,filename:filename,content:existingFile.content,line:line||null,loading:false,error:null});
                return;
            }
        }
        // Fetch from GitHub or local directory
        if(localDirHandle){
            // Read from local directory using async traversal
            (async function(){
                try{
                    var parts=path.split('/');
                    var currentHandle=localDirHandle;
                    for(var i=0;i<parts.length-1;i++){
                        currentHandle=await currentHandle.getDirectoryHandle(parts[i]);
                    }
                    var fileHandle=await currentHandle.getFileHandle(parts[parts.length-1]);
                    var fileObj=await fileHandle.getFile();
                    var content=await fileObj.text();
                    setFilePreview({path:path,filename:filename,content:content,line:line||null,loading:false,error:null});
                }catch(e){
                    setFilePreview({path:path,filename:filename,content:null,line:line||null,loading:false,error:e.message||'Failed to load file'});
                }
            })();
        }else{
            // Fetch from GitHub
            GitHub.getFile(repoInfo.owner,repoInfo.repo,path,repoInfo&&repoInfo.branch?repoInfo.branch:null).then(function(content){
                if(content){
                    setFilePreview({path:path,filename:filename,content:content,line:line||null,loading:false,error:null});
                }else{
                    setFilePreview({path:path,filename:filename,content:null,line:line||null,loading:false,error:'Could not load file content'});
                }
            }).catch(function(e){
                setFilePreview({path:path,filename:filename,content:null,line:line||null,loading:false,error:e.message||'Failed to load file'});
            });
        }
    }

    // Scroll to highlighted line after file preview loads
    useEffect(function(){
        if(filePreview&&filePreview.content&&filePreview.line&&filePreviewRef.current){
            setTimeout(function(){
                var el=filePreviewRef.current.querySelector('.file-preview-line.highlighted');
                if(el)el.scrollIntoView({behavior:'smooth',block:'center'});
            },100);
        }
    },[filePreview]);

    var colorMap=useMemo(function(){
        if(!data)return{};
        var m={};
        if(colorMode==='folder'){data.folders.forEach(function(f,i){m[f]=COLORS[i%COLORS.length];});m['root']=COLORS[0];}
        else if(colorMode==='layer')data.files.forEach(function(f){m[f.path]=LAYER_COLORS[f.layer]||COLORS[0];});
        else if(colorMode==='churn'){
            var maxC=Math.max.apply(null,data.files.map(function(f){return f.churn||0;}))||1;
            data.files.forEach(function(f){var r=(f.churn||0)/maxC;m[f.path]=r>0.7?'#ff5f5f':r>0.4?'#ff9f43':'#22c55e';});
        }
        return m;
    },[data,colorMode]);

    function buildDependencyLevelData(filteredFiles,maxFunctionNodes){
        var safeMaxFunctions=maxFunctionNodes||140;
        var fileByPath={};
        filteredFiles.forEach(function(file){fileByPath[file.path]=file;});
        var fileIds=new Set(Object.keys(fileByPath));
        var level=graphConfig.depLevel||'file';

        if(level==='folder'){
            var folderNodes={};
            filteredFiles.forEach(function(file){
                var folder=file.folder||'root';
                if(!folderNodes[folder])folderNodes[folder]={id:'folder:'+folder,name:folder.split('/').pop()||'root',path:folder,folder:folder,fnCount:0,layer:'folder',churn:0,nodeType:'folder'};
                folderNodes[folder].fnCount+=(file.functions?file.functions.length:0);
                folderNodes[folder].churn+=(file.churn||0);
            });
            var folderLinksMap=new Map();
            data.connections.forEach(function(connection){
                var sourcePath=typeof connection.source==='object'?connection.source.id:connection.source;
                var targetPath=typeof connection.target==='object'?connection.target.id:connection.target;
                if(!fileIds.has(sourcePath)||!fileIds.has(targetPath)||sourcePath===targetPath)return;
                var sourceFolder=(fileByPath[sourcePath].folder||'root');
                var targetFolder=(fileByPath[targetPath].folder||'root');
                if(sourceFolder===targetFolder)return;
                var key=sourceFolder+'|'+targetFolder;
                if(!folderLinksMap.has(key))folderLinksMap.set(key,{source:'folder:'+sourceFolder,target:'folder:'+targetFolder,count:0});
                folderLinksMap.get(key).count+=(connection.count||1);
            });
            return{nodes:Object.values(folderNodes),links:Array.from(folderLinksMap.values())};
        }

        if(level==='function'){
            var functionNodesMap={};
            var callerNodesMap={};
            var functionLinksRaw=[];
            data.connections.forEach(function(connection){
                var sourcePath=typeof connection.source==='object'?connection.source.id:connection.source;
                var targetPath=typeof connection.target==='object'?connection.target.id:connection.target;
                var functionName=(connection.fn||'').trim();
                if(!fileIds.has(sourcePath)||!fileIds.has(targetPath)||!functionName)return;
                var functionKey=sourcePath+'::'+functionName;
                if(!functionNodesMap[functionKey]){
                    var sourceFile=fileByPath[sourcePath];
                    functionNodesMap[functionKey]={
                        id:'fn:'+functionKey,
                        name:functionName,
                        path:sourcePath,
                        folder:sourceFile.folder||'root',
                        fnCount:1,
                        layer:sourceFile.layer||'util',
                        churn:sourceFile.churn||0,
                        nodeType:'function',
                        totalCalls:0
                    };
                }
                functionNodesMap[functionKey].totalCalls+=(connection.count||1);
                if(!callerNodesMap[targetPath]){
                    var targetFile=fileByPath[targetPath];
                    callerNodesMap[targetPath]={id:'file:'+targetPath,name:targetFile.name,path:targetPath,folder:targetFile.folder||'root',fnCount:targetFile.functions?targetFile.functions.length:0,layer:targetFile.layer||'util',churn:targetFile.churn||0,nodeType:'file'};
                }
                functionLinksRaw.push({functionKey:functionKey,targetPath:targetPath,count:(connection.count||1)});
            });

            var topFunctionKeys=Object.values(functionNodesMap).sort(function(a,b){return b.totalCalls-a.totalCalls;}).slice(0,safeMaxFunctions).map(function(node){return node.id.slice(3);});
            var selectedFunctionSet=new Set(topFunctionKeys);
            var linkMap=new Map();
            functionLinksRaw.forEach(function(link){
                if(!selectedFunctionSet.has(link.functionKey))return;
                var key='fn:'+link.functionKey+'|file:'+link.targetPath;
                if(!linkMap.has(key))linkMap.set(key,{source:'fn:'+link.functionKey,target:'file:'+link.targetPath,count:0});
                linkMap.get(key).count+=link.count;
            });

            var usedCallerPaths=new Set();
            Array.from(linkMap.values()).forEach(function(link){usedCallerPaths.add(link.target.slice(5));});
            var fnNodes=topFunctionKeys.map(function(key){return functionNodesMap[key];}).filter(Boolean);
            var callerNodes=Array.from(usedCallerPaths).map(function(path){return callerNodesMap[path];}).filter(Boolean);
            return{nodes:fnNodes.concat(callerNodes),links:Array.from(linkMap.values())};
        }

        var fileNodes=filteredFiles.map(function(file){return{id:file.path,name:file.name,path:file.path,folder:file.folder,fnCount:file.functions.length,layer:file.layer,churn:file.churn||0,nodeType:'file'};});
        var fileLinkMap=new Map();
        data.connections.forEach(function(connection){
            var sourcePath=typeof connection.source==='object'?connection.source.id:connection.source;
            var targetPath=typeof connection.target==='object'?connection.target.id:connection.target;
            if(!fileIds.has(sourcePath)||!fileIds.has(targetPath)||sourcePath===targetPath)return;
            var key=sourcePath+'|'+targetPath;
            if(!fileLinkMap.has(key))fileLinkMap.set(key,{source:sourcePath,target:targetPath,count:0});
            fileLinkMap.get(key).count+=(connection.count||1);
        });
        return{nodes:fileNodes,links:Array.from(fileLinkMap.values())};
    }

    useEffect(function(){
        if(!data||!svgRef.current)return;
        var svg=d3.select(svgRef.current);
        svg.selectAll('*').remove();
        try{
        var w=svgRef.current.clientWidth;
        var h=svgRef.current.clientHeight;
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        var levelGraph=buildDependencyLevelData(filteredFiles,140);
        var nodes=levelGraph.nodes;
        var links=levelGraph.links;
        if(!nodes.length){
            svg.append('text').attr('x',20).attr('y',30).attr('fill','var(--t3)').text('No nodes available for this dependency level.');
            return;
        }
        function getR(d){return Math.max(8,Math.min(24,5+d.fnCount*0.8));}
        function getC(d){
            if(colorMode==='folder')return colorMap[d.folder]||COLORS[0];
            if(colorMode==='layer')return LAYER_COLORS[d.layer]||LAYER_COLORS['utils'];
            if(colorMode==='churn')return colorMap[d.id]||'#22c55e';
            return COLORS[0];
        }
        var folders=[...new Set(nodes.map(function(n){return n.folder;}))];
        var cols=Math.max(2,Math.ceil(Math.sqrt(folders.length)));
        var cw=w/(cols+1);
        var ch=h/(Math.ceil(folders.length/cols)+1);
        var centers={};
        folders.forEach(function(f,i){centers[f]={x:(i%cols+1)*cw,y:(Math.floor(i/cols)+1)*ch};});
        var zoom=d3.zoom().scaleExtent([0.2,5]).on('zoom',function(e){container.attr('transform',e.transform);});
        svg.call(zoom);
        zoomRef.current=zoom;
        var container=svg.append('g');
        var defs=svg.append('defs');
        defs.append('marker').attr('id','arr').attr('viewBox','0 -5 10 10').attr('refX',14).attr('markerWidth',4).attr('markerHeight',4).attr('orient','auto').append('path').attr('d','M0,-4L10,0L0,4').attr('fill',theme==='light'?'#aaa':'#444');
        var hullLayer=container.append('g');
        var linkLayer=container.append('g');
        var nodeLayer=container.append('g');
        var sim=d3.forceSimulation(nodes);
        if(graphConfig.viewMode==='force'){
            sim.force('link',d3.forceLink(links).id(function(d){return d.id;}).distance(graphConfig.linkDist).strength(0.3))
               .force('charge',d3.forceManyBody().strength(-graphConfig.spacing).distanceMax(400))
               .force('collision',d3.forceCollide().radius(function(d){return getR(d)+12;}))
               .force('x',d3.forceX(function(d){return centers[d.folder]?centers[d.folder].x:w/2;}).strength(0.15))
               .force('y',d3.forceY(function(d){return centers[d.folder]?centers[d.folder].y:h/2;}).strength(0.15));
        }else if(graphConfig.viewMode==='radial'){
            var r=Math.min(w,h)*0.35;
            nodes.forEach(function(n,i){n.angle=i/nodes.length*2*Math.PI;n.targetX=w/2+Math.cos(n.angle)*r;n.targetY=h/2+Math.sin(n.angle)*r;});
            sim.force('link',d3.forceLink(links).id(function(d){return d.id;}).distance(graphConfig.linkDist*0.5).strength(0.05))
               .force('charge',d3.forceManyBody().strength(-graphConfig.spacing*0.3))
               .force('collision',d3.forceCollide().radius(function(d){return getR(d)+8;}))
               .force('x',d3.forceX(function(d){return d.targetX;}).strength(0.8))
               .force('y',d3.forceY(function(d){return d.targetY;}).strength(0.8));
        }else if(graphConfig.viewMode==='hierarchical'){
            var layerOrder={util:0,model:1,service:2,controller:3,view:4,test:5,config:6,modules:7,forms:8,classes:9};
            var layerGroups={};
            nodes.forEach(function(n){var l=n.layer||'util';if(!layerGroups[l])layerGroups[l]=[];layerGroups[l].push(n);});
            var sortedLayers=Object.keys(layerGroups).sort(function(a,b){return(layerOrder[a]||99)-(layerOrder[b]||99);});
            sortedLayers.forEach(function(l,li){var g=layerGroups[l];var colW=w/(sortedLayers.length+1);g.forEach(function(n,ni){n.targetX=(li+1)*colW;n.targetY=(ni+1)*h/(g.length+1);});});
            sim.force('link',d3.forceLink(links).id(function(d){return d.id;}).distance(graphConfig.linkDist).strength(0.1))
               .force('charge',d3.forceManyBody().strength(-graphConfig.spacing*0.5).distanceMax(200))
               .force('collision',d3.forceCollide().radius(function(d){return getR(d)+10;}))
               .force('x',d3.forceX(function(d){return d.targetX||w/2;}).strength(0.9))
               .force('y',d3.forceY(function(d){return d.targetY||h/2;}).strength(0.3));
        }else if(graphConfig.viewMode==='grid'){
            var gridCols=Math.ceil(Math.sqrt(nodes.length));
            var cellW=w/(gridCols+1);
            var cellH=h/(Math.ceil(nodes.length/gridCols)+1);
            nodes.forEach(function(n,i){n.targetX=(i%gridCols+1)*cellW;n.targetY=(Math.floor(i/gridCols)+1)*cellH;});
            sim.force('link',d3.forceLink(links).id(function(d){return d.id;}).distance(graphConfig.linkDist*1.5).strength(0.02))
               .force('collision',d3.forceCollide().radius(function(d){return getR(d)+15;}))
               .force('x',d3.forceX(function(d){return d.targetX;}).strength(1))
               .force('y',d3.forceY(function(d){return d.targetY;}).strength(1));
        }else if(graphConfig.viewMode==='metro'){
            var metro={lines:[],stations:{}};
            var roots=nodes.filter(function(n){return!links.some(function(l){return(l.target.id||l.target)===n.id;});});
            if(!roots.length)roots=[nodes[0]];
            var lineY=80,lineSpacing=Math.min(120,(h-160)/Math.max(1,roots.length));
            roots.forEach(function(root,li){
                var visited=new Set(),queue=[root.id],line=[],x=80;
                while(queue.length){
                    var id=queue.shift();if(visited.has(id))continue;visited.add(id);
                    var node=nodes.find(function(n){return n.id===id;});
                    if(node){node.targetX=x;node.targetY=lineY+li*lineSpacing;node.metroLine=li;line.push(node);x+=graphConfig.spacing*0.8;}
                    links.forEach(function(l){var s=l.source.id||l.source,t=l.target.id||l.target;if(s===id&&!visited.has(t))queue.push(t);});
                }
                metro.lines.push(line);
            });
            nodes.filter(function(n){return!n.targetX;}).forEach(function(n,i){n.targetX=80+i*50;n.targetY=h-80;n.metroLine=roots.length;});
            sim.force('link',d3.forceLink(links).id(function(d){return d.id;}).distance(graphConfig.linkDist).strength(0.05))
               .force('collision',d3.forceCollide().radius(function(d){return getR(d)+12;}))
               .force('x',d3.forceX(function(d){return d.targetX||w/2;}).strength(0.95))
               .force('y',d3.forceY(function(d){return d.targetY||h/2;}).strength(0.95));
        }
        // Adaptive simulation parameters based on graph size
        var isLargeGraph=nodes.length>300;
        var alphaDecay=isLargeGraph?0.08:0.05;
        var velDecay=isLargeGraph?0.7:0.6;
        sim.velocityDecay(velDecay).alphaDecay(alphaDecay);
        simRef.current=sim;
        var link=linkLayer.selectAll('path').data(links).join('path').attr('fill','none').attr('stroke',theme==='light'?'#ccc':'#333').attr('stroke-width',function(d){return Math.max(1,Math.min(2,Math.sqrt(d.count)*0.3));}).attr('stroke-opacity',0.4).attr('marker-end','url(#arr)');
        linksRef.current=link;
        var node=nodeLayer.selectAll('g').data(nodes).join('g').style('cursor','pointer');
        nodesRef.current=node;
        node.call(d3.drag().on('start',function(e,d){if(!e.active)sim.alphaTarget(0.1).restart();d.fx=d.x;d.fy=d.y;}).on('drag',function(e,d){d.fx=e.x;d.fy=e.y;}).on('end',function(e,d){if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;}));
        node.on('click',function(e,d){
            e.stopPropagation();
            if(d.nodeType==='folder'){filterByFolder(d.folder);return;}
            if(d.nodeType==='function'){if(selectFileRef.current&&d.path)selectFileRef.current(d.path);return;}
            var filePath=d.path||d.id;
            if(selectFileRef.current&&filePath)selectFileRef.current(filePath);
        });
        node.on('mouseenter',function(e,d){
            var r=svgRef.current.getBoundingClientRect();
            var nodeLabel=d.nodeType==='folder'?'folder':d.nodeType==='function'?'function':'file';
            setTooltip({x:e.clientX-r.left+10,y:e.clientY-r.top,title:d.name,content:nodeLabel+'\n'+d.fnCount+' functions\n'+d.layer+' layer\n'+d.churn+' recent commits'});
        }).on('mouseleave',function(){setTooltip(null);});
        svg.on('click',function(e){if(e.target===svgRef.current){setSelected(null);setBlastRadius(null);link.attr('stroke',theme==='light'?'#ccc':'#333').attr('stroke-opacity',0.4);node.selectAll('.nc').attr('opacity',1).attr('fill',getC);}});
        node.append('circle').attr('class','nc').attr('r',getR).attr('fill',getC).attr('stroke',function(d){var c=d3.color(getC(d));return c?c.brighter(0.3):'#fff';}).attr('stroke-width',1.5);
        // Hide labels for large graphs to reduce DOM overhead
        if(!isLargeGraph||graphConfig.showLabels){
            node.append('text').attr('text-anchor','middle').attr('dy',0).attr('fill',theme==='light'?'#333':'#eee').attr('font-size',function(d){return Math.max(6,Math.min(10,getR(d)*0.6))+'px';}).attr('font-family','JetBrains Mono').attr('font-weight','500').attr('pointer-events','none').text(function(d){var n=d.name.replace(/\.[^.]+$/,'');var maxLen=Math.max(4,Math.floor(getR(d)/2));return n.length>maxLen+1?n.slice(0,maxLen)+'…':n;});
        }
        // Pre-index nodes by folder for faster hull computation
        var nodesByFolder={};
        folders.forEach(function(f){nodesByFolder[f]=nodes.filter(function(n){return n.folder===f;});});
        function updateHulls(){
            hullLayer.selectAll('*').remove();
            folders.forEach(function(f){
                var fn=nodesByFolder[f];
                if(!fn||fn.length<1)return;
                var pad=30,pts=[];
                fn.forEach(function(n){if(n.x&&n.y)pts.push([n.x-pad,n.y-pad],[n.x+pad,n.y-pad],[n.x-pad,n.y+pad],[n.x+pad,n.y+pad]);});
                if(pts.length<3)return;
                var hull=d3.polygonHull(pts);
                if(hull){
                    var color=colorMap[f]||COLORS[folders.indexOf(f)%COLORS.length];
                    hullLayer.append('path').attr('d','M'+hull.join('L')+'Z').attr('fill',color).attr('fill-opacity',0.04).attr('stroke',color).attr('stroke-width',2).attr('stroke-opacity',0.25).attr('rx',8);
                    var cx=d3.mean(fn,function(n){return n.x;}),cy=d3.min(fn,function(n){return n.y;})-pad-8;
                    hullLayer.append('text').attr('x',cx).attr('y',cy).attr('text-anchor','middle').attr('fill',color).attr('font-size','10px').attr('font-family','JetBrains Mono').attr('font-weight','600').attr('opacity',0.7).text(f||'root');
                }
            });
        }
        // Throttle hull updates for large graphs (every N ticks instead of every tick)
        var hullInterval=isLargeGraph?5:1;
        var tickCount=0;
        sim.on('tick',function(){
            if(graphConfig.curvedLinks){
                link.attr('d',function(d){var dx=d.target.x-d.source.x,dy=d.target.y-d.source.y,dr=Math.sqrt(dx*dx+dy*dy);return'M'+d.source.x+','+d.source.y+'A'+dr+','+dr+' 0 0,1 '+d.target.x+','+d.target.y;});
            }else{
                link.attr('d',function(d){return'M'+d.source.x+','+d.source.y+'L'+d.target.x+','+d.target.y;});
            }
            node.attr('transform',function(d){return'translate('+d.x+','+d.y+')';});
            tickCount++;
            if(tickCount%hullInterval===0)updateHulls();
        });
        node.selectAll('text').attr('opacity',graphConfig.showLabels?1:0);
        }catch(e){console.error('Force graph error:',e);svg.selectAll('*').remove();svg.append('text').attr('x',20).attr('y',30).attr('fill','var(--t3)').text('Graph rendering error: '+e.message);}
        return function(){if(simRef.current)simRef.current.stop();};
    },[data,colorMap,colorMode,theme,folderFilter,graphConfig]);

    // Treemap visualization - Interactive with zoom, pan, selection, blast radius
    useEffect(function(){
        if(!data||!treemapRef.current||graphConfig.vizType!=='treemap')return;
        var container=d3.select(treemapRef.current);
        container.selectAll('*').remove();
        var w=treemapRef.current.clientWidth||800,h=treemapRef.current.clientHeight||600;
        var svg=container.append('svg').attr('width',w).attr('height',h).style('cursor','grab');
        var g=svg.append('g');
        var zoom=d3.zoom().scaleExtent([0.3,4]).on('zoom',function(e){g.attr('transform',e.transform);svg.style('cursor',e.transform.k>1?'grab':'default');});
        svg.call(zoom);
        var hier={name:'root',children:[]};
        var folderMap={};
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        filteredFiles.forEach(function(f){
            var folder=f.folder||'root';
            if(!folderMap[folder])folderMap[folder]={name:folder,children:[]};
            folderMap[folder].children.push({name:f.name,value:f.lines||1,path:f.path,layer:f.layer,fns:f.functions.length,folder:folder});
        });
        hier.children=Object.values(folderMap);
        var root=d3.hierarchy(hier).sum(function(d){return d.value||0;}).sort(function(a,b){return b.value-a.value;});
        d3.treemap().size([w-20,h-20]).padding(3).round(true)(root);
        var pathToLeaf={};
        root.leaves().forEach(function(leaf){if(leaf.data.path)pathToLeaf[leaf.data.path]=leaf;});
        var cells=g.selectAll('g.treemap-cell-g').data(root.leaves()).join('g').attr('class','treemap-cell-g')
            .attr('transform',function(d){return'translate('+d.x0+','+d.y0+')';});
        cells.append('rect').attr('class','treemap-rect').attr('width',function(d){return Math.max(0,d.x1-d.x0);}).attr('height',function(d){return Math.max(0,d.y1-d.y0);})
            .attr('fill',function(d){return colorMap[d.parent.data.name]||COLORS[hier.children.indexOf(d.parent.data)%COLORS.length];})
            .attr('opacity',0.85).attr('rx',3).attr('stroke','var(--bg0)').attr('stroke-width',1).style('cursor','pointer');
        cells.filter(function(d){return d.x1-d.x0>45&&d.y1-d.y0>22;}).append('text').attr('class','treemap-text')
            .attr('x',4).attr('y',14).attr('fill','white').attr('font-size','10px').attr('font-weight','500').style('text-shadow','0 1px 2px rgba(0,0,0,0.5)').style('pointer-events','none')
            .text(function(d){var n=d.data.name.replace(/\.[^.]+$/,'');var maxLen=Math.floor((d.x1-d.x0-8)/6);return n.length>maxLen?n.slice(0,maxLen-1)+'…':n;});
        cells.filter(function(d){return d.x1-d.x0>60&&d.y1-d.y0>35;}).append('text').attr('class','treemap-subtext')
            .attr('x',4).attr('y',26).attr('fill','rgba(255,255,255,0.7)').attr('font-size','8px').style('pointer-events','none')
            .text(function(d){return d.data.value+' lines';});
        var tooltip=container.append('div').attr('class','treemap-tooltip').style('display','none').style('position','absolute');
        cells.on('mouseenter',function(e,d){
            tooltip.html('<div class="treemap-tooltip-title">'+d.data.name+'</div><div class="treemap-tooltip-stat"><span>Lines:</span><span>'+d.data.value+'</span></div><div class="treemap-tooltip-stat"><span>Functions:</span><span>'+(d.data.fns||0)+'</span></div><div class="treemap-tooltip-stat"><span>Layer:</span><span>'+(d.data.layer||'—')+'</span></div><div class="treemap-tooltip-stat"><span>Folder:</span><span>'+(d.data.folder||'root')+'</span></div>')
                .style('display','block').style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');
            d3.select(this).select('rect').transition().duration(150).attr('opacity',1).attr('stroke','var(--acc)').attr('stroke-width',2);
        }).on('mousemove',function(e){tooltip.style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');})
        .on('mouseleave',function(e,d){
            tooltip.style('display','none');
            var sel=selected?selected.path:null;
            var isSelected=d.data.path===sel;
            var isAffected=blastRadius&&blastRadius.affected.includes(d.data.path);
            d3.select(this).select('rect').transition().duration(150).attr('opacity',isSelected?1:isAffected?0.95:0.85).attr('stroke',isSelected?'#ff5f5f':isAffected?'var(--orange)':'var(--bg0)').attr('stroke-width',isSelected||isAffected?2:1);
        }).on('click',function(e,d){
            e.stopPropagation();
            if(d.data.path&&selectFileRef.current){
                selectFileRef.current(d.data.path);
                setTimeout(function(){
                    var blast=blastRadius;
                    cells.select('rect').transition().duration(300)
                        .attr('opacity',function(n){return n.data.path===d.data.path?1:(blast&&blast.affected.includes(n.data.path))?0.95:0.4;})
                        .attr('fill',function(n){return n.data.path===d.data.path?'#ff5f5f':(blast&&blast.affected.includes(n.data.path))?'#ff9f43':colorMap[n.parent.data.name]||COLORS[0];})
                        .attr('stroke',function(n){return n.data.path===d.data.path?'#ff5f5f':(blast&&blast.affected.includes(n.data.path))?'var(--orange)':'var(--bg0)';})
                        .attr('stroke-width',function(n){return n.data.path===d.data.path||blast&&blast.affected.includes(n.data.path)?2:1;});
                },100);
            }
        });
        svg.on('click',function(){
            setSelected(null);setBlastRadius(null);
            cells.select('rect').transition().duration(300).attr('opacity',0.85).attr('fill',function(d){return colorMap[d.parent.data.name]||COLORS[0];}).attr('stroke','var(--bg0)').attr('stroke-width',1);
        });
        svg.on('dblclick.zoom',function(e){e.preventDefault();svg.transition().duration(300).call(zoom.scaleTo,1);});
    },[data,graphConfig.vizType,colorMap,folderFilter,selected,blastRadius]);

    // Dependency Matrix visualization - Interactive with zoom, highlighting, selection
    useEffect(function(){
        if(!data||!matrixRef.current||graphConfig.vizType!=='matrix')return;
        var container=d3.select(matrixRef.current);
        container.selectAll('*').remove();
        var w=matrixRef.current.clientWidth||800,h=matrixRef.current.clientHeight||600;
        var svg=container.append('svg').attr('width',w).attr('height',h);
        var g=svg.append('g').attr('transform','translate(100,80)');
        var zoom=d3.zoom().scaleExtent([0.5,3]).on('zoom',function(e){g.attr('transform','translate('+(100+e.transform.x)+','+(80+e.transform.y)+') scale('+e.transform.k+')');});
        svg.call(zoom);
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        var levelGraph=buildDependencyLevelData(filteredFiles,40);
        var files=levelGraph.nodes.slice(0,40);
        if(!files.length)return;
        var n=files.length;
        var cellSize=Math.min(18,Math.max(10,(Math.min(w-120,h-100))/n));
        var matrix=[];var fileIdx={};
        files.forEach(function(f,i){fileIdx[f.id]=i;matrix[i]=[];for(var j=0;j<n;j++)matrix[i][j]=0;});
        levelGraph.links.forEach(function(c){
            var src=typeof c.source==='object'?c.source.id:c.source;
            var tgt=typeof c.target==='object'?c.target.id:c.target;
            if(fileIdx[src]!==undefined&&fileIdx[tgt]!==undefined)matrix[fileIdx[src]][fileIdx[tgt]]+=c.count||1;
        });
        var maxVal=1;matrix.forEach(function(row){row.forEach(function(v){if(v>maxVal)maxVal=v;});});
        var colLabels=g.selectAll('text.col-label').data(files).join('text').attr('class','col-label')
            .attr('x',function(d,i){return i*cellSize+cellSize/2;}).attr('y',-8).attr('text-anchor','start').attr('transform',function(d,i){return'rotate(-45,'+(i*cellSize+cellSize/2)+','+-8+')';})
            .attr('fill','var(--t2)').attr('font-size','9px').text(function(d){var n=d.name.replace(/\.[^.]+$/,'');return n.length>10?n.slice(0,8)+'…':n;}).style('cursor','pointer')
            .on('click',function(e,d){
                if(d.nodeType==='folder'){filterByFolder(d.folder);return;}
                if(selectFileRef.current&&d.path)selectFileRef.current(d.path);
            });
        var rowLabels=g.selectAll('text.row-label').data(files).join('text').attr('class','row-label')
            .attr('x',-8).attr('y',function(d,i){return i*cellSize+cellSize/2+3;}).attr('text-anchor','end')
            .attr('fill','var(--t2)').attr('font-size','9px').text(function(d){var n=d.name.replace(/\.[^.]+$/,'');return n.length>10?n.slice(0,8)+'…':n;}).style('cursor','pointer')
            .on('click',function(e,d){
                if(d.nodeType==='folder'){filterByFolder(d.folder);return;}
                if(selectFileRef.current&&d.path)selectFileRef.current(d.path);
            });
        var cellData=[];
        files.forEach(function(f,i){files.forEach(function(g,j){cellData.push({row:i,col:j,value:matrix[i][j],source:f,target:g});});});
        var tooltip=container.append('div').attr('class','treemap-tooltip').style('display','none').style('position','absolute');
        var cells=g.selectAll('rect.matrix-cell-rect').data(cellData).join('rect').attr('class','matrix-cell-rect')
            .attr('x',function(d){return d.col*cellSize;}).attr('y',function(d){return d.row*cellSize;})
            .attr('width',cellSize-1).attr('height',cellSize-1).attr('rx',2)
            .attr('fill',function(d){return d.value>0?'rgba(0,255,157,'+Math.max(0.15,d.value/maxVal)+')':'var(--bg2)';})
            .attr('stroke','var(--bg0)').attr('stroke-width',0.5).style('cursor','pointer');
        cells.on('mouseenter',function(e,d){
            tooltip.html('<div class="treemap-tooltip-title">'+d.source.name+' → '+d.target.name+'</div><div class="treemap-tooltip-stat"><span>Connections:</span><span>'+d.value+'</span></div>')
                .style('display','block').style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');
            g.selectAll('rect.matrix-cell-rect').attr('opacity',function(c){return c.row===d.row||c.col===d.col?1:0.3;});
            colLabels.attr('fill',function(f,i){return i===d.col?'var(--acc)':'var(--t2)';}).attr('font-weight',function(f,i){return i===d.col?'600':'400';});
            rowLabels.attr('fill',function(f,i){return i===d.row?'var(--acc)':'var(--t2)';}).attr('font-weight',function(f,i){return i===d.row?'600':'400';});
            d3.select(this).attr('stroke','var(--acc)').attr('stroke-width',2);
        }).on('mousemove',function(e){tooltip.style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');})
        .on('mouseleave',function(){
            tooltip.style('display','none');
            cells.attr('opacity',1);
            colLabels.attr('fill','var(--t2)').attr('font-weight','400');
            rowLabels.attr('fill','var(--t2)').attr('font-weight','400');
            d3.select(this).attr('stroke','var(--bg0)').attr('stroke-width',0.5);
        }).on('click',function(e,d){
            e.stopPropagation();
            if(d.source.nodeType==='folder'){filterByFolder(d.source.folder);return;}
            if(selectFileRef.current&&d.source.path)selectFileRef.current(d.source.path);
        });
        var legend=container.append('div').attr('class','heatmap-legend').style('position','absolute').style('bottom','60px').style('right','20px');
        legend.html('<div style="font-size:9px;color:var(--t2)">Connection Strength</div><div class="heatmap-gradient"></div><div style="display:flex;justify-content:space-between;font-size:8px;color:var(--t3)"><span>0</span><span>'+maxVal+'</span></div>');
    },[data,graphConfig.vizType,graphConfig.depLevel,folderFilter]);

    // Cluster Dendrogram - Hierarchical tree visualization
    useEffect(function(){
        if(!data||!dendroRef.current||graphConfig.vizType!=='dendro')return;
        var container=d3.select(dendroRef.current);
        container.selectAll('*').remove();
        var w=dendroRef.current.clientWidth||800,h=dendroRef.current.clientHeight||600;
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        var slicedFiles=filteredFiles.slice(0,120);
        var hier={name:'root',children:[]};
        var folderMap={};
        slicedFiles.forEach(function(f){
            var folder=f.folder||'root';
            if(!folderMap[folder])folderMap[folder]={name:folder.split('/').pop()||'root',fullPath:folder,children:[]};
            folderMap[folder].children.push({name:f.name,path:f.path,fns:f.functions.length,lines:f.lines,folder:folder,layer:f.layer});
        });
        hier.children=Object.values(folderMap);
        var root=d3.hierarchy(hier);
        var leafCount=root.leaves().length;
        var virtualH=Math.max(h-40, leafCount*24);
        var svg=container.append('svg').attr('width',w).attr('height',virtualH+40);
        var g=svg.append('g').attr('transform','translate(120,20)');
        var zoom=d3.zoom().scaleExtent([0.2,3]).on('zoom',function(e){g.attr('transform','translate('+(120+e.transform.x)+','+(20+e.transform.y)+') scale('+e.transform.k+')');});
        svg.call(zoom);
        var treeLayout=d3.tree().nodeSize([22,1]).size([virtualH, w-220]);
        treeLayout(root);
        var tooltip=container.append('div').attr('class','treemap-tooltip').style('display','none').style('position','absolute');
        g.selectAll('path.dendro-link').data(root.links()).join('path').attr('class','dendro-link')
            .attr('d',function(d){return'M'+d.source.y+','+d.source.x+'C'+(d.source.y+d.target.y)/2+','+d.source.x+' '+(d.source.y+d.target.y)/2+','+d.target.x+' '+d.target.y+','+d.target.x;})
            .attr('fill','none').attr('stroke','var(--border)').attr('stroke-width',1.5).attr('stroke-opacity',0.6);
        var node=g.selectAll('g.dendro-node').data(root.descendants()).join('g').attr('class','dendro-node')
            .attr('transform',function(d){return'translate('+d.y+','+d.x+')';}).style('cursor','pointer');
        node.append('circle').attr('r',function(d){return d.children?6:8;})
            .attr('fill',function(d){return d.children?'var(--bg3)':colorMap[d.data.folder]||COLORS[0];})
            .attr('stroke',function(d){return d.children?'var(--t3)':'var(--bg0)';}).attr('stroke-width',2);
        node.filter(function(d){return!d.children;}).append('text').attr('x',10).attr('dy','0.35em')
            .attr('fill','var(--t1)').attr('font-size','9px').text(function(d){var n=d.data.name.replace(/\.[^.]+$/,'');return n.length>22?n.slice(0,20)+'…':n;});
        node.filter(function(d){return d.children&&d.depth>0;}).append('text').attr('x',-10).attr('dy','0.35em').attr('text-anchor','end')
            .attr('fill','var(--t2)').attr('font-size','9px').attr('font-weight','600').text(function(d){var n=d.data.name||'';return n.length>14?n.slice(0,12)+'…':n;});
        node.on('mouseenter',function(e,d){
            if(!d.data.path)return;
            tooltip.html('<div class="treemap-tooltip-title">'+d.data.name+'</div><div class="treemap-tooltip-stat"><span>Lines:</span><span>'+(d.data.lines||0)+'</span></div><div class="treemap-tooltip-stat"><span>Functions:</span><span>'+(d.data.fns||0)+'</span></div><div class="treemap-tooltip-stat"><span>Layer:</span><span>'+(d.data.layer||'—')+'</span></div>')
                .style('display','block').style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');
            d3.select(this).select('circle').transition().duration(150).attr('r',12).attr('stroke','var(--acc)').attr('stroke-width',3);
        }).on('mousemove',function(e){tooltip.style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');})
        .on('mouseleave',function(e,d){
            tooltip.style('display','none');
            d3.select(this).select('circle').transition().duration(150).attr('r',d.children?6:8).attr('stroke',d.children?'var(--t3)':'var(--bg0)').attr('stroke-width',2);
        }).on('click',function(e,d){
            e.stopPropagation();
            if(d.data.path&&selectFileRef.current)selectFileRef.current(d.data.path);
            else if(d.data.fullPath)filterByFolder(d.data.fullPath);
        });
    },[data,graphConfig.vizType,colorMap,folderFilter]);

    // Sankey Diagram - Flow visualization showing dependencies between folders
    useEffect(function(){
        if(!data||!sankeyRef.current||graphConfig.vizType!=='sankey')return;
        var container=d3.select(sankeyRef.current);
        container.selectAll('*').remove();
        var w=sankeyRef.current.clientWidth||800,h=sankeyRef.current.clientHeight||600;
        var svg=container.append('svg').attr('width',w).attr('height',h);
        var g=svg.append('g').attr('transform','translate(20,20)');
        var zoom=d3.zoom().scaleExtent([0.5,2]).on('zoom',function(e){g.attr('transform','translate('+(20+e.transform.x)+','+(20+e.transform.y)+') scale('+e.transform.k+')');});
        svg.call(zoom);
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        var folders=[...new Set(filteredFiles.map(function(f){return f.folder||'root';}))].slice(0,15);
        var folderIdx={};folders.forEach(function(f,i){folderIdx[f]=i;});
        var filteredPaths=new Set(filteredFiles.map(function(f){return f.path;}));
        var flowMap={};
        data.connections.forEach(function(c){
            var src=typeof c.source==='object'?c.source.id:c.source;
            var tgt=typeof c.target==='object'?c.target.id:c.target;
            if(!filteredPaths.has(src)&&!filteredPaths.has(tgt))return;
            var srcFile=data.files.find(function(f){return f.path===src;});
            var tgtFile=data.files.find(function(f){return f.path===tgt;});
            if(srcFile&&tgtFile&&srcFile.folder!==tgtFile.folder){
                var key=srcFile.folder+'|'+tgtFile.folder;
                flowMap[key]=(flowMap[key]||0)+(c.count||1);
            }
        });
        var nodes=folders.map(function(f,i){return{id:i,name:f.split('/').pop()||'root',fullPath:f,fileCount:filteredFiles.filter(function(x){return x.folder===f;}).length};});
        // Merge bidirectional flows to avoid circular link errors
        var linkMap={};
        Object.entries(flowMap).forEach(function(e){
            var parts=e[0].split('|'),val=e[1];
            var si=folderIdx[parts[0]],ti=folderIdx[parts[1]];
            if(si!==undefined&&ti!==undefined&&si!==ti){
                var key=Math.min(si,ti)+'|'+Math.max(si,ti);
                if(!linkMap[key])linkMap[key]={a:Math.min(si,ti),b:Math.max(si,ti),ab:0,ba:0};
                if(si<ti)linkMap[key].ab+=val;else linkMap[key].ba+=val;
            }
        });
        var links=[];
        Object.values(linkMap).forEach(function(l){
            var net=l.ab-l.ba;
            if(net>0)links.push({source:l.a,target:l.b,value:net});
            else if(net<0)links.push({source:l.b,target:l.a,value:-net});
            else if(l.ab>0)links.push({source:l.a,target:l.b,value:l.ab});
        });
        if(links.length===0){
            g.append('text').attr('x',w/2-20).attr('y',h/2).attr('fill','var(--t3)').attr('font-size','12px').text('No cross-folder dependencies to visualize');
            return;
        }
        var sankey=d3.sankey().nodeId(function(d){return d.id;}).nodeWidth(20).nodePadding(15).extent([[0,0],[w-60,h-60]]);
        var graph;
        try{
            graph=sankey({nodes:nodes.map(function(d){return Object.assign({},d);}),links:links.map(function(d){return Object.assign({},d);})});
        }catch(e){
            g.append('text').attr('x',w/2-20).attr('y',h/2).attr('fill','var(--t3)').attr('font-size','12px').attr('text-anchor','middle').text('Sankey diagram unavailable: dependency graph has circular references. Try the Force Graph view.');
            return;
        }
        var tooltip=container.append('div').attr('class','treemap-tooltip').style('display','none').style('position','absolute');
        g.selectAll('path.sankey-link').data(graph.links).join('path').attr('class','sankey-link')
            .attr('d',d3.sankeyLinkHorizontal()).attr('fill','none')
            .attr('stroke',function(d){return colorMap[d.source.fullPath]||COLORS[d.source.id%COLORS.length];})
            .attr('stroke-width',function(d){return Math.max(2,d.width);}).attr('stroke-opacity',0.4)
            .on('mouseenter',function(e,d){
                d3.select(this).attr('stroke-opacity',0.8);
                tooltip.html('<div class="treemap-tooltip-title">'+d.source.name+' → '+d.target.name+'</div><div class="treemap-tooltip-stat"><span>Connections:</span><span>'+d.value+'</span></div>')
                    .style('display','block').style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');
            }).on('mouseleave',function(){d3.select(this).attr('stroke-opacity',0.4);tooltip.style('display','none');});
        var node=g.selectAll('g.sankey-node').data(graph.nodes).join('g').attr('class','sankey-node').style('cursor','pointer');
        node.append('rect').attr('x',function(d){return d.x0;}).attr('y',function(d){return d.y0;})
            .attr('width',function(d){return d.x1-d.x0;}).attr('height',function(d){return Math.max(4,d.y1-d.y0);})
            .attr('fill',function(d){return colorMap[d.fullPath]||COLORS[d.id%COLORS.length];}).attr('rx',3);
        node.append('text').attr('x',function(d){return d.x0<w/2?d.x1+8:d.x0-8;}).attr('y',function(d){return(d.y0+d.y1)/2;})
            .attr('dy','0.35em').attr('text-anchor',function(d){return d.x0<w/2?'start':'end';})
            .attr('fill','var(--t1)').attr('font-size','10px').attr('font-weight','500').text(function(d){return d.name+' ('+d.fileCount+')';});
        node.on('mouseenter',function(e,d){
            tooltip.html('<div class="treemap-tooltip-title">'+d.fullPath+'</div><div class="treemap-tooltip-stat"><span>Files:</span><span>'+d.fileCount+'</span></div>')
                .style('display','block').style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');
            g.selectAll('path.sankey-link').attr('stroke-opacity',function(l){return l.source.id===d.id||l.target.id===d.id?0.8:0.1;});
        }).on('mouseleave',function(){tooltip.style('display','none');g.selectAll('path.sankey-link').attr('stroke-opacity',0.4);})
        .on('click',function(e,d){e.stopPropagation();filterByFolder(d.fullPath);});
    },[data,graphConfig.vizType,colorMap,folderFilter]);

    // Disjoint Force-Directed - Separate clusters per folder
    useEffect(function(){
        if(!data||!disjointRef.current||graphConfig.vizType!=='disjoint')return;
        var container=d3.select(disjointRef.current);
        container.selectAll('*').remove();
        var w=disjointRef.current.clientWidth||800,h=disjointRef.current.clientHeight||600;
        var svg=container.append('svg').attr('width',w).attr('height',h);
        var g=svg.append('g');
        var zoom=d3.zoom().scaleExtent([0.2,4]).on('zoom',function(e){g.attr('transform',e.transform);});
        svg.call(zoom);
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        var files=filteredFiles.slice(0,100);
        var fileIdx={};files.forEach(function(f,i){fileIdx[f.path]=i;});
        var folders=[...new Set(files.map(function(f){return f.folder||'root';}))];
        var cols=Math.ceil(Math.sqrt(folders.length));
        var cellW=w/cols,cellH=h/Math.ceil(folders.length/cols);
        var centers={};
        folders.forEach(function(f,i){centers[f]={x:(i%cols+0.5)*cellW,y:(Math.floor(i/cols)+0.5)*cellH};});
        var nodes=files.map(function(f){return{id:f.path,name:f.name,folder:f.folder||'root',fns:f.functions.length,lines:f.lines,layer:f.layer,cx:centers[f.folder||'root'].x,cy:centers[f.folder||'root'].y};});
        var links=[];
        data.connections.forEach(function(c){
            var src=typeof c.source==='object'?c.source.id:c.source;
            var tgt=typeof c.target==='object'?c.target.id:c.target;
            if(fileIdx[src]!==undefined&&fileIdx[tgt]!==undefined&&src!==tgt)links.push({source:src,target:tgt,count:c.count||1});
        });
        var sim=d3.forceSimulation(nodes)
            .force('link',d3.forceLink(links).id(function(d){return d.id;}).distance(40).strength(0.3))
            .force('charge',d3.forceManyBody().strength(-80))
            .force('x',d3.forceX(function(d){return d.cx;}).strength(0.15))
            .force('y',d3.forceY(function(d){return d.cy;}).strength(0.15))
            .force('collide',d3.forceCollide(15));
        g.selectAll('rect.cluster-bg').data(folders).join('rect').attr('class','cluster-bg')
            .attr('x',function(d,i){return(i%cols)*cellW+10;}).attr('y',function(d,i){return Math.floor(i/cols)*cellH+10;})
            .attr('width',cellW-20).attr('height',cellH-20).attr('rx',12)
            .attr('fill',function(d){return colorMap[d]||COLORS[folders.indexOf(d)%COLORS.length];}).attr('opacity',0.08)
            .attr('stroke',function(d){return colorMap[d]||COLORS[folders.indexOf(d)%COLORS.length];}).attr('stroke-width',1).attr('stroke-opacity',0.3);
        g.selectAll('text.cluster-label').data(folders).join('text').attr('class','cluster-label')
            .attr('x',function(d,i){return(i%cols)*cellW+20;}).attr('y',function(d,i){return Math.floor(i/cols)*cellH+28;})
            .attr('fill','var(--t2)').attr('font-size','11px').attr('font-weight','600').text(function(d){return d.split('/').pop()||'root';});
        var link=g.selectAll('line.disjoint-link').data(links).join('line').attr('class','disjoint-link')
            .attr('stroke','var(--border)').attr('stroke-width',1).attr('stroke-opacity',0.3);
        var tooltip=container.append('div').attr('class','treemap-tooltip').style('display','none').style('position','absolute');
        var node=g.selectAll('g.disjoint-node').data(nodes).join('g').attr('class','disjoint-node').style('cursor','pointer')
            .call(d3.drag().on('start',function(e,d){if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y;})
                .on('drag',function(e,d){d.fx=e.x;d.fy=e.y;}).on('end',function(e,d){if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;}));
        node.append('circle').attr('class','disjoint-circle').attr('r',function(d){return Math.max(6,Math.min(14,4+d.fns));})
            .attr('fill',function(d){return colorMap[d.folder]||COLORS[0];}).attr('stroke','var(--bg0)').attr('stroke-width',1.5);
        node.on('mouseenter',function(e,d){
            tooltip.html('<div class="treemap-tooltip-title">'+d.name+'</div><div class="treemap-tooltip-stat"><span>Lines:</span><span>'+(d.lines||0)+'</span></div><div class="treemap-tooltip-stat"><span>Functions:</span><span>'+(d.fns||0)+'</span></div><div class="treemap-tooltip-stat"><span>Folder:</span><span>'+d.folder+'</span></div>')
                .style('display','block').style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');
            link.attr('stroke-opacity',function(l){return l.source.id===d.id||l.target.id===d.id?0.8:0.05;}).attr('stroke',function(l){return l.source.id===d.id||l.target.id===d.id?'var(--acc)':'var(--border)';});
            d3.select(this).select('circle').transition().duration(150).attr('r',14).attr('stroke','var(--acc)').attr('stroke-width',2);
        }).on('mousemove',function(e){tooltip.style('left',(e.offsetX+15)+'px').style('top',(e.offsetY+15)+'px');})
        .on('mouseleave',function(e,d){
            tooltip.style('display','none');
            link.attr('stroke-opacity',0.3).attr('stroke','var(--border)');
            d3.select(this).select('circle').transition().duration(150).attr('r',Math.max(6,Math.min(14,4+d.fns))).attr('stroke','var(--bg0)').attr('stroke-width',1.5);
        }).on('click',function(e,d){e.stopPropagation();if(selectFileRef.current)selectFileRef.current(d.id);});
        sim.on('tick',function(){
            link.attr('x1',function(d){return d.source.x;}).attr('y1',function(d){return d.source.y;}).attr('x2',function(d){return d.target.x;}).attr('y2',function(d){return d.target.y;});
            node.attr('transform',function(d){return'translate('+d.x+','+d.y+')';});
        });
        svg.on('click',function(){setSelected(null);setBlastRadius(null);});
        return function(){sim.stop();};
    },[data,graphConfig.vizType,colorMap,folderFilter]);

    // Circular Bundle visualization - Interactive with zoom, selection, blast radius
    useEffect(function(){
        if(!data||!bundleRef.current||graphConfig.vizType!=='bundle')return;
        var container=d3.select(bundleRef.current);
        container.selectAll('*').remove();
        var w=bundleRef.current.clientWidth||800,h=bundleRef.current.clientHeight||600;
        var svg=container.append('svg').attr('width',w).attr('height',h);
        var mainG=svg.append('g').attr('transform','translate('+w/2+','+h/2+')');
        var zoom=d3.zoom().scaleExtent([0.4,3]).on('zoom',function(e){mainG.attr('transform','translate('+(w/2+e.transform.x)+','+(h/2+e.transform.y)+') scale('+e.transform.k+')');});
        svg.call(zoom);
        var radius=Math.min(w,h)/2-100;
        var filteredFiles=folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}):data.files;
        var files=filteredFiles.slice(0,70);
        var fileIdx={};files.forEach(function(f,i){fileIdx[f.path]=i;});
        var folderGroups={};files.forEach(function(f){var folder=f.folder||'root';if(!folderGroups[folder])folderGroups[folder]=[];folderGroups[folder].push(f);});
        var nodes=[],angle=0;
        var sortedFolders=Object.entries(folderGroups).sort(function(a,b){return b[1].length-a[1].length;});
        sortedFolders.forEach(function(entry){
            var folder=entry[0],fls=entry[1];
            var step=2*Math.PI*fls.length/files.length;
            fls.forEach(function(f){
                nodes.push({id:f.path,name:f.name,folder:folder,angle:angle,x:Math.cos(angle-Math.PI/2)*radius,y:Math.sin(angle-Math.PI/2)*radius,layer:f.layer,fns:f.functions.length,lines:f.lines});
                angle+=step/fls.length;
            });
        });
        var nodeMap={};nodes.forEach(function(n){nodeMap[n.id]=n;});
        var links=[];
        data.connections.forEach(function(c){
            var src=typeof c.source==='object'?c.source.id:c.source;
            var tgt=typeof c.target==='object'?c.target.id:c.target;
            if(nodeMap[src]&&nodeMap[tgt]&&src!==tgt)links.push({source:nodeMap[src],target:nodeMap[tgt],count:c.count||1});
        });
        function isBundleLinkMatch(nodeId,linkDatum){
            return linkDatum.source.id===nodeId||linkDatum.target.id===nodeId;
        }
        function getBundleLinkColor(linkDatum){
            return colorMap[linkDatum.source.folder]||'var(--acc)';
        }
        function getBundleDirectConnections(nodeId){
            var connected=new Set([nodeId]);
            links.forEach(function(linkDatum){
                if(isBundleLinkMatch(nodeId,linkDatum)){
                    connected.add(linkDatum.source.id);
                    connected.add(linkDatum.target.id);
                }
            });
            return connected;
        }
        var link=mainG.selectAll('path.bundle-link').data(links).join('path').attr('class','bundle-link')
            .attr('d',function(d){
                var a1=d.source.angle,a2=d.target.angle;
                var x1=Math.cos(a1-Math.PI/2)*(radius-15),y1=Math.sin(a1-Math.PI/2)*(radius-15);
                var x2=Math.cos(a2-Math.PI/2)*(radius-15),y2=Math.sin(a2-Math.PI/2)*(radius-15);
                var midAngle=(a1+a2)/2;
                var tension=0.3*radius;
                var cx=Math.cos(midAngle-Math.PI/2)*tension,cy=Math.sin(midAngle-Math.PI/2)*tension;
                return'M'+x1+','+y1+'Q'+cx+','+cy+' '+x2+','+y2;
            })
            .attr('fill','none').attr('stroke',getBundleLinkColor)
            .attr('stroke-width',1.8).attr('stroke-opacity',0.35);
        var tooltip=container.append('div').attr('class','treemap-tooltip').style('display','none').style('position','absolute');
        var node=mainG.selectAll('g.bundle-node').data(nodes).join('g').attr('class','bundle-node').style('cursor','pointer')
            .attr('transform',function(d){return'rotate('+(d.angle*180/Math.PI-90)+') translate('+radius+',0)'+(d.angle>Math.PI?' rotate(180)':'');});
        node.append('circle').attr('class','bundle-circle').attr('r',6).attr('fill',function(d){return colorMap[d.folder]||COLORS[0];}).attr('stroke','var(--bg0)').attr('stroke-width',1.5)
            .attr('transform',function(d){return d.angle>Math.PI?'translate(-6,0)':'translate(6,0)';});
        node.append('text').attr('dy','0.31em').attr('x',function(d){return d.angle>Math.PI?-14:14;}).attr('text-anchor',function(d){return d.angle>Math.PI?'end':'start';})
            .attr('fill','var(--t2)').attr('font-size','9px').text(function(d){var n=d.name.replace(/\.[^.]+$/,'');return n.length>16?n.slice(0,13)+'…':n;});
        function applyBundleDefaultState(){
            link.transition().duration(200)
                .attr('stroke-opacity',0.35)
                .attr('stroke-width',1.8)
                .attr('stroke',getBundleLinkColor);
            node.selectAll('.bundle-circle').transition().duration(200)
                .attr('fill',function(d){return colorMap[d.folder]||COLORS[0];})
                .attr('opacity',1)
                .attr('r',6)
                .attr('stroke','var(--bg0)')
                .attr('stroke-width',1.5);
        }
        function applyBundleHoverState(nodeId){
            var directConnections=getBundleDirectConnections(nodeId);
            link.transition().duration(200)
                .attr('stroke-opacity',function(linkDatum){return isBundleLinkMatch(nodeId,linkDatum)?0.88:0.04;})
                .attr('stroke-width',function(linkDatum){return isBundleLinkMatch(nodeId,linkDatum)?3.1:1;})
                .attr('stroke',function(linkDatum){return isBundleLinkMatch(nodeId,linkDatum)?'var(--acc)':getBundleLinkColor(linkDatum);});
            node.selectAll('.bundle-circle').transition().duration(200)
                .attr('opacity',function(nodeDatum){return directConnections.has(nodeDatum.id)?1:0.22;})
                .attr('r',function(nodeDatum){return nodeDatum.id===nodeId?9:6;})
                .attr('stroke',function(nodeDatum){return nodeDatum.id===nodeId?'var(--acc)':'var(--bg0)';})
                .attr('stroke-width',function(nodeDatum){return nodeDatum.id===nodeId?2:1.5;});
        }
        function applyBundleSelectionState(nodeId,blast){
            var directConnections=getBundleDirectConnections(nodeId);
            var affectedSet=new Set(blast&&blast.affected?blast.affected:[]);
            link.transition().duration(300)
                .attr('stroke-opacity',function(linkDatum){return isBundleLinkMatch(nodeId,linkDatum)?0.96:0.08;})
                .attr('stroke-width',function(linkDatum){return isBundleLinkMatch(nodeId,linkDatum)?3.6:1.15;})
                .attr('stroke',function(linkDatum){return isBundleLinkMatch(nodeId,linkDatum)?'#ff9f43':getBundleLinkColor(linkDatum);});
            node.selectAll('.bundle-circle').transition().duration(300)
                .attr('fill',function(nodeDatum){return nodeDatum.id===nodeId?'#ff5f5f':affectedSet.has(nodeDatum.id)?'#ff9f43':colorMap[nodeDatum.folder]||COLORS[0];})
                .attr('opacity',function(nodeDatum){return directConnections.has(nodeDatum.id)||affectedSet.has(nodeDatum.id)?1:0.22;})
                .attr('r',function(nodeDatum){return nodeDatum.id===nodeId?9:6;})
                .attr('stroke',function(nodeDatum){return nodeDatum.id===nodeId?'var(--acc)':'var(--bg0)';})
                .attr('stroke-width',function(nodeDatum){return nodeDatum.id===nodeId?2:1.5;});
        }
        node.on('mouseenter',function(e,d){
            var rect=bundleRef.current.getBoundingClientRect();
            tooltip.html('<div class="treemap-tooltip-title">'+d.name+'</div><div class="treemap-tooltip-stat"><span>Lines:</span><span>'+(d.lines||0)+'</span></div><div class="treemap-tooltip-stat"><span>Functions:</span><span>'+(d.fns||0)+'</span></div><div class="treemap-tooltip-stat"><span>Folder:</span><span>'+(d.folder||'root')+'</span></div>')
                .style('display','block').style('left',(e.clientX-rect.left+15)+'px').style('top',(e.clientY-rect.top+15)+'px');
            applyBundleHoverState(d.id);
        }).on('mousemove',function(e){var rect=bundleRef.current.getBoundingClientRect();tooltip.style('left',(e.clientX-rect.left+15)+'px').style('top',(e.clientY-rect.top+15)+'px');})
        .on('mouseleave',function(){
            tooltip.style('display','none');
            if(selected&&nodeMap[selected.path]){
                applyBundleSelectionState(selected.path,blastRadius);
            }else{
                applyBundleDefaultState();
            }
        }).on('click',function(e,d){
            e.stopPropagation();
            if(selectFileRef.current){
                selectFileRef.current(d.id);
            }
        });
        var arcGen=d3.arc().innerRadius(radius+20).outerRadius(radius+30);
        var folderAngleStart=0;
        sortedFolders.forEach(function(entry,i){
            var folder=entry[0],count=entry[1].length;
            var span=2*Math.PI*count/files.length;
            mainG.append('path').attr('d',arcGen({startAngle:folderAngleStart,endAngle:folderAngleStart+span}))
                .attr('fill',colorMap[folder]||COLORS[i%COLORS.length]).attr('opacity',0.5).style('cursor','pointer')
                .on('click',function(){filterByFolder(folder);});
            if(span>0.15){
                var midAngle=folderAngleStart+span/2-Math.PI/2;
                mainG.append('text').attr('x',Math.cos(midAngle)*(radius+40)).attr('y',Math.sin(midAngle)*(radius+40))
                    .attr('text-anchor','middle').attr('fill','var(--t2)').attr('font-size','8px')
                    .attr('transform','rotate('+(midAngle*180/Math.PI+90)+','+Math.cos(midAngle)*(radius+40)+','+Math.sin(midAngle)*(radius+40)+')')
                    .text(folder.split('/').pop()||'root');
            }
            folderAngleStart+=span;
        });
        svg.on('click',function(){
            setSelected(null);setBlastRadius(null);
            applyBundleDefaultState();
        });
        if(selected&&nodeMap[selected.path]){
            applyBundleSelectionState(selected.path,blastRadius);
        }else{
            applyBundleDefaultState();
        }
    },[data,graphConfig.vizType,colorMap,folderFilter,selected,blastRadius]);

    function zoomIn(){if(zoomRef.current&&svgRef.current)d3.select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy,1.4);}
    function zoomOut(){if(zoomRef.current&&svgRef.current)d3.select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy,0.7);}
    function resetZoom(){if(zoomRef.current&&svgRef.current)d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.transform,d3.zoomIdentity);}
    function fitView(){
        if(!zoomRef.current||!svgRef.current||!simRef.current)return;
        var nodes=simRef.current.nodes();
        if(!nodes.length)return;
        var xs=nodes.map(function(n){return n.x;}),ys=nodes.map(function(n){return n.y;});
        var minX=Math.min.apply(null,xs),maxX=Math.max.apply(null,xs),minY=Math.min.apply(null,ys),maxY=Math.max.apply(null,ys);
        var w=svgRef.current.clientWidth,h=svgRef.current.clientHeight;
        var scale=0.8/Math.max((maxX-minX+100)/w,(maxY-minY+100)/h);
        d3.select(svgRef.current).transition().duration(400).call(zoomRef.current.transform,d3.zoomIdentity.translate(w/2-scale*(minX+maxX)/2,h/2-scale*(minY+maxY)/2).scale(Math.min(scale,2)));
    }
    function exportSVG(){
        exportSVGHelper(svgRef.current);
    }
    function exportJSON(){
        exportJSONHelper(data);
    }
    function generateReport(format){
        if(!data)return;
        var repo=repoInfo?(localDirHandle?'Local Folder':repoInfo.owner+'/'+repoInfo.repo):'Unknown Repository';
        var h=calcHealth(data);
        generateReportHelper(format,data,repo,h,showNotification);
    }
    function getActiveVizRef(){
        var vt=graphConfig.vizType;
        if(vt==='graph')return svgRef;
        if(vt==='treemap')return treemapRef;
        if(vt==='matrix')return matrixRef;
        if(vt==='dendro')return dendroRef;
        if(vt==='sankey')return sankeyRef;
        if(vt==='disjoint')return disjointRef;
        if(vt==='bundle')return bundleRef;
        return svgRef;
    }
    function exportPDF(){
        if(!data){showNotification('Run analysis first','warning');return;}
        showNotification('Generating PDF…','success');
        var vizRef=getActiveVizRef();
        var svgEl=vizRef.current?vizRef.current.querySelector('svg')||vizRef.current:null;
        if(!svgEl||svgEl.tagName!=='svg'){
            exportPDFHelper(null,data,repoInfo?(localDirHandle?'Local Folder':repoInfo.owner+'/'+repoInfo.repo):'Unknown',calcHealth(data),showNotification);
            return;
        }
        captureSVGasPNG(svgEl,function(pngDataUrl){
            exportPDFHelper(pngDataUrl,data,repoInfo?(localDirHandle?'Local Folder':repoInfo.owner+'/'+repoInfo.repo):'Unknown',calcHealth(data),showNotification);
        });
    }
    function showNotification(msg,type){setToast({msg:msg,type:type||'success'});setTimeout(function(){setToast(null);},3000);}
    function copyLink(){
        if(localDirHandle){
            showNotification('Share links are not available for local folders','warning');
            return;
        }
        navigator.clipboard.writeText(window.location.href).then(function(){showNotification('Link copied to clipboard!');}).catch(function(){showNotification('Failed to copy link','error');});
    }
    function analyzePR(){if(!prUrl||!repoInfo)return;var m=prUrl.match(/\/pull\/(\d+)/);if(!m){showNotification('Invalid PR URL','error');return;}GitHub.getPR(repoInfo.owner,repoInfo.repo,m[1]).then(function(pr){if(pr)setPrData(pr);else showNotification('Could not load PR','error');});}
    function resetAnalysis(){setData(null);setSelected(null);setBlastRadius(null);setOwnership(null);setRepoInfo(null);setRepoUrl('');setPrData(null);setFolderFilter(null);setLocalDirHandle(null);setBranches([]);setBranchInput('');window.history.replaceState({},'',window.location.pathname);}
    function fetchBranches(urlStr){
        var p=parseUrl(urlStr);
        if(!p){setBranches([]);return;}
        setBranchesLoading(true);
        GitHub.listBranches(p.owner,p.repo).then(function(list){setBranches(list);setBranchesLoading(false);}).catch(function(){setBranches([]);setBranchesLoading(false);});
    }
    function filterByFolder(path){setFolderFilter(function(prev){return prev===path?null:path;});}
    function applyArchitectureView(view){
        if(view==='tech'){
            setColorMode('layer');
            setGraphConfig(Object.assign({},graphConfig,{vizType:'treemap',viewMode:'hierarchical'}));
        }else if(view==='folder'){
            setColorMode('folder');
            setGraphConfig(Object.assign({},graphConfig,{vizType:'disjoint'}));
        }else{
            setGraphConfig(Object.assign({},graphConfig,{vizType:'graph',viewMode:data&&data.files.length>250?'hierarchical':'force'}));
        }
    }
    function isArchitectureViewActive(view){
        if(view==='tech')return graphConfig.vizType==='treemap'&&colorMode==='layer';
        if(view==='folder')return graphConfig.vizType==='disjoint'&&colorMode==='folder';
        return graphConfig.vizType==='graph';
    }
    var health=useMemo(function(){return calcHealth(data);},[data]);
    var isDenseArchitecture=useMemo(function(){return!!(data&&(data.files.length>250||data.connections.length>500));},[data]);
    var autoModeTarget=useMemo(function(){
        if(!data)return null;
        if(data.files.length>700)return'matrix';
        if(data.files.length>260)return'disjoint';
        return null;
    },[data]);
    var autoModeTargetLabel=autoModeTarget==='matrix'?'Matrix':autoModeTarget==='disjoint'?'Folder Structure':'Dependency Graph';
    var architectureSummary=useMemo(function(){
        if(!data)return null;
        function confidenceFromScore(score,high,medium){
            if(score>=high)return'high';
            if(score>=medium)return'medium';
            return'low';
        }
        var folderByPath={};
        var fileStats={};
        data.files.forEach(function(file){
            folderByPath[file.path]=file.folder||'root';
            fileStats[file.path]={
                path:file.path,
                name:file.name||file.path.split('/').pop(),
                folder:file.folder||'root',
                churn:file.churn||0,
                connections:0
            };
        });

        var pairCounts={};
        data.connections.forEach(function(connection){
            var sourcePath=typeof connection.source==='object'?connection.source.id:connection.source;
            var targetPath=typeof connection.target==='object'?connection.target.id:connection.target;
            if(fileStats[sourcePath])fileStats[sourcePath].connections+=(connection.count||1);
            if(fileStats[targetPath])fileStats[targetPath].connections+=(connection.count||1);

            var sourceFolder=folderByPath[sourcePath]||'root';
            var targetFolder=folderByPath[targetPath]||'root';
            if(sourceFolder===targetFolder)return;
            var left=sourceFolder<targetFolder?sourceFolder:targetFolder;
            var right=sourceFolder<targetFolder?targetFolder:sourceFolder;
            var pairKey=left+'|'+right;
            pairCounts[pairKey]=(pairCounts[pairKey]||0)+(connection.count||1);
        });

        var topPairs=Object.entries(pairCounts).map(function(entry){
            var parts=entry[0].split('|');
            var weight=entry[1];
            var confidence=confidenceFromScore(weight,60,25);
            return{folderA:parts[0],folderB:parts[1],weight:weight,confidence:confidence,confidenceReason:'Cross-folder links weight = '+weight};
        }).sort(function(a,b){return b.weight-a.weight;}).slice(0,5);

        var hotspots=Object.values(fileStats).map(function(file){
            var score=file.connections*2+Math.min(file.churn,20);
            var confidence=confidenceFromScore(score,45,20);
            return Object.assign({},file,{score:score,confidence:confidence,confidenceReason:'Score = ('+file.connections+' connections x2) + churn '+Math.min(file.churn,20)});
        }).sort(function(a,b){return b.score-a.score;}).filter(function(file){return file.score>0;}).slice(0,5);

        var quickActions=[];
        if(data.layerViolations&&data.layerViolations.length>0){
            var violationsConfidence=confidenceFromScore(data.layerViolations.length,8,3);
            quickActions.push({id:'violations',label:'Layer violations',count:data.layerViolations.length,priority:'high',confidence:violationsConfidence,confidenceReason:data.layerViolations.length+' violation(s) detected'});
        }
        if(data.stats&&data.stats.security>0){
            var securityConfidence=confidenceFromScore(data.stats.security,4,2);
            quickActions.push({id:'security',label:'High security issues',count:data.stats.security,priority:'high',confidence:securityConfidence,confidenceReason:data.stats.security+' high-severity issue(s) detected'});
        }
        if(data.stats&&data.stats.dead>0){
            var deadConfidence=confidenceFromScore(data.stats.dead,40,15);
            quickActions.push({id:'dead',label:'Unused functions',count:data.stats.dead,priority:'medium',confidence:deadConfidence,confidenceReason:data.stats.dead+' potentially unused function(s)'});
        }
        if(data.suggestions&&data.suggestions.length>0){
            quickActions.push({id:'suggestions',label:'Actionable suggestions',count:data.suggestions.length,priority:'medium',confidence:'medium',confidenceReason:data.suggestions.length+' suggestion(s) generated by heuristics'});
        }

        return{topPairs:topPairs,hotspots:hotspots,quickActions:quickActions};
    },[data]);

    function runArchitectureAction(actionId){
        if(actionId==='violations'){
            setRightTab('details');
            setSelected(null);
            return;
        }
        if(actionId==='security'){
            setRightTab('security');
            return;
        }
        if(actionId==='dead'){
            setShowUnused(true);
            return;
        }
        if(actionId==='suggestions'){
            setRightTab('suggestions');
        }
    }

    function getFindingSignal(kind,item){
        if(kind==='security'){
            if(item&&item.severity&&(item.severity==='high'||item.severity==='medium'))return{label:'Strong Signal',className:'badge-success',title:'Direct security signature match in source'};
            return{label:'Static Estimate',className:'badge-warning',title:'Heuristic security signal from static code patterns'};
        }
        if(kind==='issue'){
            var title=((item&&item.title)||'').toLowerCase();
            if(title.includes('architecture violations')||title.includes('circular dependencies')||title.includes('high complexity'))return{label:'Strong Signal',className:'badge-success',title:'Computed from direct structural relationships'};
            return{label:'Static Estimate',className:'badge-warning',title:'Heuristic or static analysis estimate; verify with runtime context'};
        }
        if(kind==='pattern')return{label:'Static Estimate',className:'badge-warning',title:'Pattern detection is heuristic and may need manual validation'};
        if(kind==='suggestion')return{label:'Static Estimate',className:'badge-warning',title:'Suggestions are generated from weighted heuristics'};
        return{label:'Static Estimate',className:'badge-default',title:'Derived from static analysis'};
    }

    function getFindingPriority(kind,item){
        if(kind==='security')return(item&&item.severity)||'medium';
        if(kind==='suggestion')return(item&&item.priority)||'medium';
        if(kind==='issue')return item&&item.type==='critical'?'critical':'medium';
        if(kind==='pattern')return item&&item.isAnti?'high':'medium';
        return'medium';
    }

    function getFindingSearchText(kind,item){
        if(!item)return'';
        if(kind==='issue')return[(item.title||''),(item.desc||'')].join(' ').toLowerCase();
        if(kind==='pattern')return[(item.name||''),(item.desc||''),(item.files||[]).map(function(f){return f.name||'';}).join(' ')].join(' ').toLowerCase();
        if(kind==='security')return[(item.title||''),(item.desc||''),(item.path||''),(item.code||'')].join(' ').toLowerCase();
        if(kind==='suggestion')return[(item.title||''),(item.desc||''),(item.action||''),(item.impact||'')].join(' ').toLowerCase();
        return JSON.stringify(item).toLowerCase();
    }

    function filterFindingList(kind,list,applyTypeFilter){
        var query=(findingQuery||'').trim().toLowerCase();
        return(list||[]).filter(function(item){
            if(applyTypeFilter&&findingTypeFilter!=='all'){
                var mappedType=kind==='suggestion'?'action':kind;
                if(mappedType!==findingTypeFilter)return false;
            }
            if(findingPriorityFilter!=='all'&&getFindingPriority(kind,item)!==findingPriorityFilter)return false;
            if(findingSignalFilter!=='all'){
                var signalLabel=getFindingSignal(kind,item).label||'';
                if(findingSignalFilter==='strong'&&signalLabel!=='Strong Signal')return false;
                if(findingSignalFilter==='estimate'&&signalLabel!=='Static Estimate')return false;
            }
            if(query&&getFindingSearchText(kind,item).indexOf(query)===-1)return false;
            return true;
        });
    }

    var filteredIssues=useMemo(function(){return data?filterFindingList('issue',data.issues||[],false):[];},[data,findingQuery,findingPriorityFilter,findingSignalFilter]);
    var filteredPatterns=useMemo(function(){return data?filterFindingList('pattern',data.patterns||[],false):[];},[data,findingQuery,findingPriorityFilter,findingSignalFilter]);
    var filteredSecurity=useMemo(function(){return data?filterFindingList('security',data.securityIssues||[],false):[];},[data,findingQuery,findingPriorityFilter,findingSignalFilter]);
    var filteredSuggestions=useMemo(function(){return data?filterFindingList('suggestion',data.suggestions||[],false):[];},[data,findingQuery,findingPriorityFilter,findingSignalFilter]);

    var discoveryIssues=useMemo(function(){return data?filterFindingList('issue',data.issues||[],true):[];},[data,findingQuery,findingTypeFilter,findingPriorityFilter,findingSignalFilter]);
    var discoveryPatterns=useMemo(function(){return data?filterFindingList('pattern',data.patterns||[],true):[];},[data,findingQuery,findingTypeFilter,findingPriorityFilter,findingSignalFilter]);
    var discoverySecurity=useMemo(function(){return data?filterFindingList('security',data.securityIssues||[],true):[];},[data,findingQuery,findingTypeFilter,findingPriorityFilter,findingSignalFilter]);
    var discoverySuggestions=useMemo(function(){return data?filterFindingList('suggestion',data.suggestions||[],true):[];},[data,findingQuery,findingTypeFilter,findingPriorityFilter,findingSignalFilter]);

    useEffect(function(){
        if(!data)return;
        var repoKey=(repoInfo&&repoInfo.owner&&repoInfo.repo?repoInfo.owner+'/'+repoInfo.repo:'local')+':'+(data.branch||'default');
        var analysisKey=repoKey+'#'+data.files.length+'#'+data.connections.length;
        if(autoModeAppliedRef.current===analysisKey)return;
        autoModeAppliedRef.current=analysisKey;
        if(!autoModeTarget)return;
        setGraphConfig(function(prev){
            if(prev.vizType!=='graph')return prev;
            return Object.assign({},prev,{vizType:autoModeTarget});
        });
        if(autoModeTarget==='disjoint')setColorMode('folder');
    },[data,repoInfo,autoModeTarget]);

    return React.createElement('div',{className:'app'},
        React.createElement('div',{className:'topbar'},
            React.createElement('div',{className:'logo',onClick:function(){setShowFeatures(true);}},
                React.createElement('div',{className:'logo-mark'},'⚡'),
                React.createElement('span',{className:'logo-text'},'REPO-INTEL')
            ),
            React.createElement('div',{className:'repo-input-group'},
                localDirHandle&&React.createElement('div',{className:'analysis-source-badge local-badge',title:'Analyzing a local folder — GitHub features disabled'},'📁 Local Folder'),
                !localDirHandle&&React.createElement('input',{className:'repo-input','aria-label':'GitHub Repository (owner/repo)',placeholder:'owner/repo  (e.g. facebook/react)',value:repoUrl,onChange:function(e){setRepoUrl(e.target.value);},onBlur:function(){fetchBranches(repoUrl);},onKeyDown:function(e){if(e.key==='Enter'&&!loading)analyze();},disabled:!!localDirHandle}),
                !localDirHandle&&(branches.length>0?React.createElement('select',{className:'auth-select branch-select','aria-label':'Branch',value:branchInput,onChange:function(e){setBranchInput(e.target.value);},style:{maxWidth:170}},React.createElement('option',{value:''},'default branch'),branches.map(function(b){return React.createElement('option',{key:b,value:b},b);})):React.createElement('input',{className:'repo-input','aria-label':'Branch',placeholder:branchesLoading?'loading…':'branch (optional)',value:branchInput,onChange:function(e){setBranchInput(e.target.value);},onKeyDown:function(e){if(e.key==='Enter'&&!loading)analyze();},style:{maxWidth:160},disabled:!!localDirHandle})),
                React.createElement('select',{className:'auth-select','aria-label':'Filtering Preset',value:analysisPreset,onChange:function(e){setAnalysisPreset(e.target.value);},title:'Filtering preset for analysis scope'},
                    React.createElement('option',{value:'all'},'All Files'),
                    React.createElement('option',{value:'production'},'Production Only'),
                    React.createElement('option',{value:'api'},'API Surface Only'),
                    React.createElement('option',{value:'recent'},'Recently Changed')
                ),
                React.createElement('span',{className:'preset-hint',title:getPresetHelpText(analysisPreset,recentDays),'aria-label':'Preset details'},'ⓘ'),
                analysisPreset==='recent'&&React.createElement('input',{className:'repo-input','aria-label':'Recent days filter',type:'number',min:1,max:365,value:recentDays,onChange:function(e){setRecentDays(Math.max(1,Math.min(365,parseInt(e.target.value||'30',10)||30)));},style:{maxWidth:86},title:'Files changed in last N days'}),
                React.createElement('select',{className:'auth-select','aria-label':'Authentication Method',value:authMethod,onChange:function(e){setAuthMethod(e.target.value);}},
                    React.createElement('option',{value:'none'},'No Auth'),
                    React.createElement('option',{value:'pat'},'Token (PAT)'),
                    React.createElement('option',{value:'github_app'},'GitHub App')
                ),
                React.createElement('div',{className:'auth-inputs'},
                    authMethod==='pat'&&React.createElement('input',{className:'repo-input',type:'password','aria-label':'GitHub Token',placeholder:'Personal Access Token',value:token,onChange:function(e){setToken(e.target.value);},onKeyDown:function(e){if(e.key==='Enter'&&!loading)analyze();},style:{minWidth:140}}),
                    authMethod==='github_app'&&React.createElement(React.Fragment,null,
                        React.createElement('input',{className:'repo-input','aria-label':'App ID',placeholder:'App ID',value:appId,onChange:function(e){setAppId(e.target.value);},onKeyDown:function(e){if(e.key==='Enter'&&!loading)analyze();},style:{width:80}}),
                        React.createElement('button',{className:'private-key-btn'+(privateKey?' has-key':''),'aria-label':'Set Private Key',onClick:function(){setShowKeyModal(true);},type:'button'},privateKey?'🔑 Key Set':'🔐 Private Key')
                    )
                ),
                React.createElement('button',{className:'top-btn','aria-label':'Edit exclude patterns',onClick:function(){openExcludeModal(false);},disabled:loading,style:customExcludeCount?{borderColor:'var(--acc)',color:'var(--acc)'}:null},'🚫 Excludes',customExcludeCount>0?' ('+customExcludeCount+')':''),
                React.createElement('button',{id:'analyze-btn',className:'top-btn primary','aria-label':'Analyze repository',onClick:analyze,disabled:loading||(!repoUrl&&!localDirHandle)},loading?'⏳':'🔍',' Analyze'),
                React.createElement('button',{className:'top-btn'+(localDirHandle?' active-source':''),'aria-label':'Open local folder',onClick:function(){openLocalFolder();},disabled:loading||(!localDirHandle&&!!data),title:'Analyze a local folder using the File System Access API'},'📁 Open Folder'),
                data&&React.createElement('button',{className:'refresh-btn','aria-label':'Refresh analysis',onClick:refreshAnalysis,disabled:loading,title:'Refresh Analysis'},'↻ Refresh'),
                data&&React.createElement('button',{className:'reset-btn','aria-label':'Reset analysis',onClick:resetAnalysis,title:'Clear & Reset'},'✕ Reset')
            ),
            React.createElement('div',{className:'topbar-actions'},
                React.createElement('button',{className:'top-btn','aria-label':'Analyze Pull Request',onClick:function(){setShowPR(true);},disabled:!data||localDirHandle,title:'PR Impact Analyzer — paste a Pull Request URL to see risk score, blast radius, suggested reviewers, and dependency chains'},'📊 PR'),
                React.createElement('button',{className:'top-btn','aria-label':'Export analysis',onClick:function(){setShowExport(true);},disabled:!data},'📤'),
                React.createElement('button',{className:'top-btn','aria-label':'Copy share link',onClick:copyLink,disabled:!data||localDirHandle},'🔗'),
                React.createElement('button',{className:'top-btn','aria-label':'Toggle theme',onClick:function(){setTheme(function(t){return t==='dark'?'light':'dark';});}},theme==='dark'?'☀️':'🌙')
            )
        ),
        React.createElement('div',{className:'main'},
            React.createElement('div',{className:'sidebar',style:{width:sidebarWidth}},
                React.createElement('div',{className:'resize-handle',onMouseDown:function(e){
                    e.preventDefault();
                    var startX=e.clientX,startW=sidebarWidth;
                    function onMove(e){setSidebarWidth(Math.max(180,Math.min(400,startW+e.clientX-startX)));}
                    function onUp(){document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);}
                    document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
                }}),
                data?React.createElement(React.Fragment,null,
                    React.createElement('div',{className:'sidebar-section'},
                        React.createElement('div',{className:'health-score'},
                            React.createElement(HealthRing,{score:health.score,grade:health.grade}),
                            React.createElement('div',{className:'health-info'},
                                React.createElement('div',{className:'health-grade',style:{color:health.score>=80?'var(--green)':health.score>=60?'var(--orange)':'var(--red)'}},health.score,'/100'),
                                React.createElement('div',{className:'health-label'},'Health Score')
                            )
                        )
                    ),
                    React.createElement('div',{className:'sidebar-section'},
                        React.createElement('div',{className:'sidebar-title'},'Color By'),
                        React.createElement('div',{className:'view-modes'},
                            React.createElement('div',{className:'view-mode'+(colorMode==='folder'?' active':''),onClick:function(){setColorMode('folder');}},React.createElement('span',{className:'view-mode-icon'},'📁'),'Folder'),
                            React.createElement('div',{className:'view-mode'+(colorMode==='layer'?' active':''),onClick:function(){setColorMode('layer');}},React.createElement('span',{className:'view-mode-icon'},'🏗️'),'Layer'),
                            React.createElement('div',{className:'view-mode'+(colorMode==='churn'?' active':''),onClick:function(){setColorMode('churn');}},React.createElement('span',{className:'view-mode-icon'},'🔥'),'Churn')
                        )
                    ),
                    React.createElement('div',{className:'sidebar-section'},
                        React.createElement('div',{className:'stats-grid'},
                            React.createElement('div',{className:'stat-card'},React.createElement('div',{className:'stat-value'},data.stats.files),React.createElement('div',{className:'stat-label'},'Files')),
                            React.createElement('div',{className:'stat-card'},React.createElement('div',{className:'stat-value'},data.stats.functions),React.createElement('div',{className:'stat-label'},'Functions')),
                            React.createElement('div',{className:'stat-card'},React.createElement('div',{className:'stat-value'},data.stats.connections),React.createElement('div',{className:'stat-label'},'Links')),
                            React.createElement('div',{className:'stat-card'+(data.stats.dead>10?' warn':''),style:{cursor:data.stats.dead>0?'pointer':'default'},onClick:function(){if(data.stats.dead>0)setShowUnused(true);}},React.createElement('div',{className:'stat-value'},data.stats.dead),React.createElement('div',{className:'stat-label'},'Unused'))
                        ),
                        React.createElement('div',{className:'loc-stat'},
                            React.createElement('div',{className:'loc-value'},data.stats.loc?data.stats.loc.toLocaleString():'0'),
                            React.createElement('div',{className:'loc-label'},'Lines of Code')
                        ),
                        data.stats.languages&&data.stats.languages.length>0&&React.createElement(React.Fragment,null,
                            React.createElement('div',{className:'lang-bar'},
                                data.stats.languages.slice(0,6).map(function(l,i){return React.createElement('div',{key:l.ext,className:'lang-bar-segment',style:{width:l.pct+'%',background:COLORS[i%COLORS.length]}});})
                            ),
                            React.createElement('div',{className:'lang-legend'},
                                data.stats.languages.slice(0,6).map(function(l,i){return React.createElement('div',{key:l.ext,className:'lang-item'},
                                    React.createElement('div',{className:'lang-dot',style:{background:COLORS[i%COLORS.length]}}),
                                    React.createElement('span',null,l.ext,' ',l.pct,'%')
                                );})
                            )
                        )
                    ),
                    React.createElement('div',{className:'sidebar-section',style:{paddingBottom:8}},
                        React.createElement('div',{className:'sidebar-title'},'Explorer'),
                        folderFilter&&React.createElement('button',{className:'top-btn',style:{width:'100%',marginTop:8},onClick:function(){setFolderFilter(null);}},'✕ Clear Filter: ',folderFilter)
                    ),
                    React.createElement('div',{className:'sidebar-scroll'},React.createElement(TreeNode,{node:data.tree,selected:selected,onSelect:selectFile,expanded:expandedPaths,toggle:togglePath,filterFolder:filterByFolder,activeFilter:folderFilter}))
                ):React.createElement('div',{className:'empty-state'},React.createElement('div',{className:'empty-icon'},'🔍'),React.createElement('div',{className:'empty-title'},'No Repository'),React.createElement('div',{className:'empty-desc'},'Enter a GitHub URL or click "Open Folder" to analyze a local directory'))
            ),
            React.createElement('div',{className:'canvas-area'},
                loading?React.createElement('div',{className:'loading'},React.createElement('div',{className:'spinner'}),React.createElement('div',{className:'loading-text'},'Analyzing...'),React.createElement('div',{className:'loading-progress'},progress)):
                !data?React.createElement('div',{className:'empty-state'},React.createElement('div',{className:'empty-icon'},'⚡'),React.createElement('div',{className:'empty-title'},'Repo-Intel'),React.createElement('div',{className:'empty-desc'},'Visualize architecture, blast radius, ownership, patterns & security\n\nEnter a GitHub URL or click "Open Folder" to analyze a local directory')):
                React.createElement(React.Fragment,null,
                    React.createElement('div',{className:'viz-selector'},
                        React.createElement('button',{className:'viz-selector-btn'+(isArchitectureViewActive('tech')?' active':''),onClick:function(){applyArchitectureView('tech');}},'🧠 Tech Stack'),
                        React.createElement('button',{className:'viz-selector-btn'+(isArchitectureViewActive('folder')?' active':''),onClick:function(){applyArchitectureView('folder');}},'🗂️ Folder Structure'),
                        React.createElement('button',{className:'viz-selector-btn'+(isArchitectureViewActive('dependency')?' active':''),onClick:function(){applyArchitectureView('dependency');}},'🕸️ Dependency Graph'),
                        React.createElement('div',{className:'viz-divider'}),
                        React.createElement('button',{className:'viz-selector-btn'+(graphConfig.vizType==='matrix'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{vizType:'matrix'}));}},'📊 Matrix'),
                        React.createElement('button',{className:'viz-selector-btn'+(graphConfig.vizType==='dendro'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{vizType:'dendro'}));}},'🌳 Tree'),
                        React.createElement('button',{className:'viz-selector-btn'+(graphConfig.vizType==='sankey'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{vizType:'sankey'}));}},'🌊 Flow'),
                        React.createElement('button',{className:'viz-selector-btn'+(graphConfig.vizType==='bundle'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{vizType:'bundle'}));}},'🎯 Bundle'),
                        React.createElement('div',{className:'viz-divider'}),
                        React.createElement('button',{className:'viz-selector-btn dep-level-btn'+((graphConfig.depLevel||'file')==='folder'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{depLevel:'folder'}));}},'L1 Folder'),
                        React.createElement('button',{className:'viz-selector-btn dep-level-btn'+((graphConfig.depLevel||'file')==='file'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{depLevel:'file'}));}},'L2 File'),
                        React.createElement('button',{className:'viz-selector-btn dep-level-btn'+((graphConfig.depLevel||'file')==='function'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{depLevel:'function'}));}},'L3 Function*')
                    ),
                    autoModeTarget&&React.createElement('div',{className:'auto-mode-banner'},
                        React.createElement('div',{className:'auto-mode-text'},'Auto mode: large repo detected (',data.files.length,' files). Defaulted to ',React.createElement('strong',null,autoModeTargetLabel),'.'),
                        React.createElement('button',{className:'top-btn',onClick:function(){setGraphConfig(Object.assign({},graphConfig,{vizType:'graph',viewMode:data&&data.files.length>250?'hierarchical':'force'}));}},'Switch to Dependency Graph')
                    ),
                    architectureSummary&&React.createElement('div',{className:'architecture-summary'},
                        React.createElement('div',{className:'architecture-summary-title'},'Architecture Summary'),
                        React.createElement('div',{className:'architecture-summary-grid'},
                            React.createElement('div',{className:'architecture-card'},
                                React.createElement('div',{className:'architecture-card-title'},'Top Folder Coupling'),
                                architectureSummary.topPairs.length===0?
                                    React.createElement('div',{className:'architecture-empty'},'No cross-folder links detected'):
                                    architectureSummary.topPairs.map(function(pair){return React.createElement('div',{key:pair.folderA+'|'+pair.folderB,className:'architecture-row',onClick:function(){filterByFolder(pair.folderA);}},
                                        React.createElement('div',{className:'architecture-row-text'},pair.folderA,' ↔ ',pair.folderB,' ',React.createElement('span',{className:'confidence-badge confidence-'+pair.confidence,title:pair.confidenceReason},pair.confidence.toUpperCase())),
                                        React.createElement('div',{className:'architecture-row-value'},pair.weight)
                                    );})
                            ),
                            React.createElement('div',{className:'architecture-card'},
                                React.createElement('div',{className:'architecture-card-title'},'Hotspot Files'),
                                architectureSummary.hotspots.length===0?
                                    React.createElement('div',{className:'architecture-empty'},'No hotspot files found yet'):
                                    architectureSummary.hotspots.map(function(file){return React.createElement('div',{key:file.path,className:'architecture-row',onClick:function(){selectFile(file.path);}},
                                        React.createElement('div',{className:'architecture-row-text'},file.name,' ',React.createElement('span',{className:'confidence-badge confidence-'+file.confidence,title:file.confidenceReason},file.confidence.toUpperCase())),
                                        React.createElement('div',{className:'architecture-row-value'},file.score)
                                    );})
                            ),
                            React.createElement('div',{className:'architecture-card'},
                                React.createElement('div',{className:'architecture-card-title'},'Do This First'),
                                architectureSummary.quickActions.length===0?
                                    React.createElement('div',{className:'architecture-empty'},'No immediate actions. Repo looks healthy.'):
                                    architectureSummary.quickActions.map(function(action){return React.createElement('div',{key:action.id,className:'architecture-row architecture-row-action',onClick:function(){runArchitectureAction(action.id);}},
                                        React.createElement('div',{className:'architecture-row-text'},action.label,' ',React.createElement('span',{className:'confidence-badge confidence-'+action.confidence,title:action.confidenceReason},action.confidence.toUpperCase())),
                                        React.createElement('div',{className:'architecture-row-value architecture-row-priority-'+action.priority},action.count)
                                    );})
                            )
                        )
                    ),
                    React.createElement('div',{className:'canvas-viz'},
                    graphConfig.vizType==='graph'&&React.createElement('svg',{ref:svgRef}),
                    graphConfig.vizType==='treemap'&&React.createElement('div',{ref:treemapRef,className:'treemap-container'}),
                    graphConfig.vizType==='matrix'&&React.createElement('div',{ref:matrixRef,className:'matrix-container',style:{width:'100%',height:'100%',overflow:'auto',display:'flex',alignItems:'center',justifyContent:'center'}}),
                    graphConfig.vizType==='dendro'&&React.createElement('div',{ref:dendroRef,className:'dendro-container',style:{width:'100%',height:'100%',position:'relative',overflow:'auto'}}),

                    graphConfig.vizType==='sankey'&&React.createElement('div',{ref:sankeyRef,className:'sankey-container',style:{width:'100%',height:'100%',position:'relative'}}),
                    graphConfig.vizType==='disjoint'&&React.createElement('div',{ref:disjointRef,className:'disjoint-container',style:{width:'100%',height:'100%',position:'relative'}}),
                    graphConfig.vizType==='bundle'&&React.createElement('div',{ref:bundleRef,className:'bundle-container'}),
                    graphConfig.vizType==='graph'&&React.createElement('div',{className:'canvas-toolbar'},
                        React.createElement('button',{className:'tool-btn',onClick:zoomIn,'aria-label':'Zoom in'},'+'),
                        React.createElement('button',{className:'tool-btn',onClick:zoomOut,'aria-label':'Zoom out'},'−'),
                        React.createElement('button',{className:'tool-btn',onClick:resetZoom,'aria-label':'Reset zoom'},'⟲'),
                        React.createElement('button',{className:'tool-btn',onClick:fitView,'aria-label':'Fit view'},'⊡'),
                        React.createElement('button',{className:'tool-btn'+(showGraphConfig?' active':''),onClick:function(){setShowGraphConfig(!showGraphConfig);},'aria-label':'Graph settings',style:showGraphConfig?{background:'var(--accbg)',borderColor:'var(--acc)'}:{}},'⚙')
                    ),
                    graphConfig.vizType==='graph'&&showGraphConfig&&React.createElement('div',{className:'graph-config'},
                        React.createElement('div',{className:'graph-config-title'},'Layout'),
                        React.createElement('div',{className:'view-toggle',style:{flexWrap:'wrap'}},
                            React.createElement('button',{className:'view-btn'+(graphConfig.viewMode==='force'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{viewMode:'force'}));}},'Force'),
                            React.createElement('button',{className:'view-btn'+(graphConfig.viewMode==='radial'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{viewMode:'radial'}));}},'Radial'),
                            React.createElement('button',{className:'view-btn'+(graphConfig.viewMode==='hierarchical'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{viewMode:'hierarchical'}));}},'Layers'),
                            React.createElement('button',{className:'view-btn'+(graphConfig.viewMode==='grid'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{viewMode:'grid'}));}},'Grid'),
                            React.createElement('button',{className:'view-btn'+(graphConfig.viewMode==='metro'?' active':''),onClick:function(){setGraphConfig(Object.assign({},graphConfig,{viewMode:'metro'}));}},'Metro')
                        ),
                        React.createElement('div',{className:'graph-config-title',style:{marginTop:8}},'Spacing'),
                        React.createElement('div',{className:'config-row'},
                            React.createElement('span',{className:'config-label'},'Spread'),
                            React.createElement('input',{type:'range',className:'config-slider',min:'50',max:'500',value:graphConfig.spacing,onChange:function(e){setGraphConfig(Object.assign({},graphConfig,{spacing:parseInt(e.target.value)}));}}),
                            React.createElement('span',{className:'config-value'},graphConfig.spacing)
                        ),
                        React.createElement('div',{className:'config-row'},
                            React.createElement('span',{className:'config-label'},'Links'),
                            React.createElement('input',{type:'range',className:'config-slider',min:'30',max:'200',value:graphConfig.linkDist,onChange:function(e){setGraphConfig(Object.assign({},graphConfig,{linkDist:parseInt(e.target.value)}));}}),
                            React.createElement('span',{className:'config-value'},graphConfig.linkDist)
                        ),
                        React.createElement('div',{className:'graph-config-title',style:{marginTop:8}},'Display'),
                        React.createElement('label',{className:'config-check'},
                            React.createElement('input',{type:'checkbox',checked:graphConfig.showLabels,onChange:function(e){setGraphConfig(Object.assign({},graphConfig,{showLabels:e.target.checked}));}}),
                            'Show labels'
                        ),
                        React.createElement('label',{className:'config-check',style:{marginTop:6}},
                            React.createElement('input',{type:'checkbox',checked:graphConfig.curvedLinks,onChange:function(e){setGraphConfig(Object.assign({},graphConfig,{curvedLinks:e.target.checked}));}}),
                            'Curved links'
                        )
                    ),
                    React.createElement('div',{className:'canvas-info'},
                        React.createElement('div',{className:'info-chip'},React.createElement('strong',null,folderFilter?data.files.filter(function(f){return f.folder===folderFilter||f.folder.startsWith(folderFilter+'/');}).length:data.files.length),' files'),
                        React.createElement('div',{className:'info-chip'},React.createElement('strong',null,data.connections.length),' links'),
                        data.preset&&data.preset!=='all'&&React.createElement('div',{className:'info-chip'},'🧪 ',React.createElement('strong',null,getPresetLabel(data.preset,data.recentDays||recentDays))),
                        data.presetMeta&&data.presetMeta.mode==='recent'&&React.createElement('div',{className:'info-chip'+(data.presetMeta.errors>0?' info-chip-warning':'')},'⏱ ',React.createElement('strong',null,data.presetMeta.matched+'/'+data.presetMeta.scanned),data.presetMeta.fallback?' fallback':' recent'),
                        (graphConfig.vizType==='graph'||graphConfig.vizType==='matrix')&&React.createElement('div',{className:'info-chip'},'🔎 ',React.createElement('strong',null,(graphConfig.depLevel||'file').toUpperCase()),' level'),
                        isDenseArchitecture&&React.createElement('div',{className:'info-chip info-chip-warning'},'🧭 Try Folder Structure or Tech Stack for large repos'),
                        data.branch&&React.createElement('div',{className:'info-chip'},'🌿 ',React.createElement('strong',null,data.branch)),
                        data.excludePatterns&&data.excludePatterns.length>0&&React.createElement('div',{className:'info-chip'},'🚫 ',React.createElement('strong',null,data.excludePatterns.length),' custom excludes'),
                        selected&&blastRadius&&React.createElement('div',{className:'info-chip'},'💥 ',React.createElement('strong',null,blastRadius.count),' dependents',blastRadius.fnsUsed>0?' • '+blastRadius.fnsUsed+' fns used':'')
                    ),
                    React.createElement('div',{className:'legend'+(legendCollapsed?' collapsed':'')},
                        React.createElement('div',{className:'legend-header',onClick:function(){setLegendCollapsed(!legendCollapsed);}},
                            React.createElement('div',{className:'legend-title',style:{margin:0}},colorMode==='folder'?'Folders':colorMode==='layer'?'Layers':'Churn'),
                            React.createElement('span',{className:'legend-toggle'},'▼')
                        ),
                        React.createElement('div',{className:'legend-content'},
                            colorMode==='folder'&&data.folders.slice(0,12).map(function(f,i){return React.createElement('div',{key:f,className:'legend-item'+(folderFilter===f?' active':''),onClick:function(e){e.stopPropagation();filterByFolder(f);}},React.createElement('div',{className:'legend-color',style:{background:colorMap[f]||COLORS[i%COLORS.length]}}),f||'root');}),
                            colorMode==='folder'&&data.folders.length>12&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',marginTop:4}},'+',data.folders.length-12,' more'),
                            colorMode==='layer'&&Object.entries(LAYER_COLORS).map(function(e){return React.createElement('div',{key:e[0],className:'legend-item'},React.createElement('div',{className:'legend-color',style:{background:e[1]}}),e[0]=== 'modules' ? 'Modules' : e[0]=== 'forms' ? 'UserForms' : e[0]=== 'classes' ? 'Classes' : e[0]);}),
                            colorMode==='churn'&&React.createElement(React.Fragment,null,React.createElement('div',{className:'legend-item'},React.createElement('div',{className:'legend-color',style:{background:'#ff5f5f'}}),'High (7+ commits)'),React.createElement('div',{className:'legend-item'},React.createElement('div',{className:'legend-color',style:{background:'#ff9f43'}}),'Medium (4-6)'),React.createElement('div',{className:'legend-item'},React.createElement('div',{className:'legend-color',style:{background:'#22c55e'}}),'Low (0-3)'))
                        )
                    ),
                    tooltip&&React.createElement('div',{className:'tooltip',style:{left:tooltip.x,top:tooltip.y}},React.createElement('div',{className:'tooltip-title'},tooltip.title),React.createElement('div',{className:'tooltip-content'},tooltip.content))
                    )
                )
            ),
            React.createElement('div',{className:'right-panel',style:{width:rightPanelWidth}},
                React.createElement('div',{className:'resize-handle',onMouseDown:function(e){
                    e.preventDefault();
                    var startX=e.clientX,startW=rightPanelWidth;
                    function onMove(e){setRightPanelWidth(Math.max(280,Math.min(500,startW-(e.clientX-startX))));}
                    function onUp(){document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);}
                    document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
                }}),
                data?React.createElement(React.Fragment,null,
                    React.createElement('div',{className:'panel-tabs'},
                        React.createElement('button',{className:'panel-tab'+(rightTab==='findings'?' active':''),onClick:function(){setRightTab('findings');setDrillDown(null);}},'📌 FINDINGS'),
                        React.createElement('button',{className:'panel-tab'+(rightTab==='details'?' active':''),onClick:function(){setRightTab('details');setDrillDown(null);}},selected?'📄 FILE':'🔍 ISSUES'),
                        React.createElement('button',{className:'panel-tab'+(rightTab==='patterns'?' active':''),onClick:function(){setRightTab('patterns');setDrillDown(null);}},'🧩 PATTERNS ',React.createElement('span',{className:'badge badge-default'},data.patterns.length)),
                        React.createElement('button',{className:'panel-tab'+(rightTab==='security'?' active':''),onClick:function(){setRightTab('security');setDrillDown(null);}},'🔐 SECURITY',data.stats.security>0&&React.createElement('span',{className:'view-mode-badge',style:{marginLeft:4}},data.stats.security)),
                        React.createElement('button',{className:'panel-tab'+(rightTab==='suggestions'?' active':''),onClick:function(){setRightTab('suggestions');setDrillDown(null);}},'💡 ACTIONS',data.suggestions&&data.suggestions.length>0&&React.createElement('span',{className:'view-mode-badge',style:{marginLeft:4}},data.suggestions.length))
                    ),
                    React.createElement('div',{className:'panel-content'},
                        React.createElement('div',{className:'finding-toolbar'},
                            React.createElement('input',{className:'repo-input finding-search','aria-label':'Finding search',placeholder:'Find by title, description, path, or action...',value:findingQuery,onChange:function(e){setFindingQuery(e.target.value);}}),
                            rightTab==='findings'&&React.createElement('select',{className:'auth-select','aria-label':'Finding type filter',value:findingTypeFilter,onChange:function(e){setFindingTypeFilter(e.target.value);}},
                                React.createElement('option',{value:'all'},'All Types'),
                                React.createElement('option',{value:'issue'},'Issues'),
                                React.createElement('option',{value:'pattern'},'Patterns'),
                                React.createElement('option',{value:'security'},'Security'),
                                React.createElement('option',{value:'action'},'Actions')
                            ),
                            React.createElement('select',{className:'auth-select','aria-label':'Finding priority filter',value:findingPriorityFilter,onChange:function(e){setFindingPriorityFilter(e.target.value);}},
                                React.createElement('option',{value:'all'},'All Priority'),
                                React.createElement('option',{value:'critical'},'Critical'),
                                React.createElement('option',{value:'high'},'High'),
                                React.createElement('option',{value:'medium'},'Medium'),
                                React.createElement('option',{value:'low'},'Low')
                            ),
                            React.createElement('select',{className:'auth-select','aria-label':'Finding confidence filter',value:findingSignalFilter,onChange:function(e){setFindingSignalFilter(e.target.value);}},
                                React.createElement('option',{value:'all'},'All Confidence'),
                                React.createElement('option',{value:'strong'},'Strong Signal'),
                                React.createElement('option',{value:'estimate'},'Static Estimate')
                            ),
                            React.createElement('button',{className:'view-file-btn',onClick:function(){setFindingQuery('');setFindingTypeFilter('all');setFindingPriorityFilter('all');setFindingSignalFilter('all');}},'Clear')
                        ),
                        rightTab==='findings'&&React.createElement(React.Fragment,null,
                            React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'📌 Findings Snapshot'),
                            React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8,marginBottom:12}},
                                React.createElement('div',{className:'card',style:{marginBottom:0}},
                                    React.createElement('div',{className:'card-body',style:{padding:10,cursor:'pointer'},onClick:function(){setRightTab('details');setDrillDown(null);}},
                                        React.createElement('div',{style:{fontSize:9,color:'var(--t3)',textTransform:'uppercase'}},'Issues'),
                                        React.createElement('div',{style:{fontSize:18,fontWeight:700,color:'var(--red)',marginTop:4}},discoveryIssues.length)
                                    )
                                ),
                                React.createElement('div',{className:'card',style:{marginBottom:0}},
                                    React.createElement('div',{className:'card-body',style:{padding:10,cursor:'pointer'},onClick:function(){setRightTab('patterns');setDrillDown(null);}},
                                        React.createElement('div',{style:{fontSize:9,color:'var(--t3)',textTransform:'uppercase'}},'Patterns'),
                                        React.createElement('div',{style:{fontSize:18,fontWeight:700,color:'var(--acc)',marginTop:4}},discoveryPatterns.length)
                                    )
                                ),
                                React.createElement('div',{className:'card',style:{marginBottom:0}},
                                    React.createElement('div',{className:'card-body',style:{padding:10,cursor:'pointer'},onClick:function(){setRightTab('security');setDrillDown(null);}},
                                        React.createElement('div',{style:{fontSize:9,color:'var(--t3)',textTransform:'uppercase'}},'Security'),
                                        React.createElement('div',{style:{fontSize:18,fontWeight:700,color:'var(--orange)',marginTop:4}},discoverySecurity.length)
                                    )
                                ),
                                React.createElement('div',{className:'card',style:{marginBottom:0}},
                                    React.createElement('div',{className:'card-body',style:{padding:10,cursor:'pointer'},onClick:function(){setRightTab('suggestions');setDrillDown(null);}},
                                        React.createElement('div',{style:{fontSize:9,color:'var(--t3)',textTransform:'uppercase'}},'Actions'),
                                        React.createElement('div',{style:{fontSize:18,fontWeight:700,color:'var(--blue)',marginTop:4}},discoverySuggestions.length)
                                    )
                                )
                            ),
                            React.createElement('div',{className:'card',style:{marginBottom:12}},
                                React.createElement('div',{className:'card-header'},
                                    React.createElement('div',{className:'card-title'},'🔍 Top Issues'),
                                    React.createElement('button',{className:'view-file-btn',onClick:function(){setRightTab('details');setDrillDown(null);}},'View all')
                                ),
                                React.createElement('div',{className:'card-body'},
                                    discoveryIssues.length===0?React.createElement('div',{style:{fontSize:10,color:'var(--t3)'}},'No issues matched your filters.'):
                                    discoveryIssues.slice(0,3).map(function(issue,i){return React.createElement('div',{key:'fi-'+i,style:{fontSize:10,color:'var(--t1)',padding:'6px 0',borderBottom:i<Math.min(3,discoveryIssues.length)-1?'1px solid var(--border2)':'none'}},issue.title);})
                                )
                            ),
                            React.createElement('div',{className:'card',style:{marginBottom:12}},
                                React.createElement('div',{className:'card-header'},
                                    React.createElement('div',{className:'card-title'},'🧩 Top Patterns'),
                                    React.createElement('button',{className:'view-file-btn',onClick:function(){setRightTab('patterns');setDrillDown(null);}},'View all')
                                ),
                                React.createElement('div',{className:'card-body'},
                                    discoveryPatterns.length===0?React.createElement('div',{style:{fontSize:10,color:'var(--t3)'}},'No patterns matched your filters.'):
                                    discoveryPatterns.slice(0,3).map(function(p,i){return React.createElement('div',{key:'fp-'+i,style:{fontSize:10,color:'var(--t1)',padding:'6px 0',borderBottom:i<Math.min(3,discoveryPatterns.length)-1?'1px solid var(--border2)':'none'}},p.icon,' ',p.name);})
                                )
                            ),
                            React.createElement('div',{className:'card',style:{marginBottom:12}},
                                React.createElement('div',{className:'card-header'},
                                    React.createElement('div',{className:'card-title'},'🔐 Top Security'),
                                    React.createElement('button',{className:'view-file-btn',onClick:function(){setRightTab('security');setDrillDown(null);}},'View all')
                                ),
                                React.createElement('div',{className:'card-body'},
                                    discoverySecurity.length===0?React.createElement('div',{style:{fontSize:10,color:'var(--t3)'}},'No security findings matched your filters.'):
                                    discoverySecurity.slice(0,3).map(function(issue,i){return React.createElement('div',{key:'fs-'+i,style:{fontSize:10,color:'var(--t1)',padding:'6px 0',borderBottom:i<Math.min(3,discoverySecurity.length)-1?'1px solid var(--border2)':'none'}},issue.title,' (',issue.severity,')');})
                                )
                            ),
                            React.createElement('div',{className:'card'},
                                React.createElement('div',{className:'card-header'},
                                    React.createElement('div',{className:'card-title'},'💡 Top Actions'),
                                    React.createElement('button',{className:'view-file-btn',onClick:function(){setRightTab('suggestions');setDrillDown(null);}},'View all')
                                ),
                                React.createElement('div',{className:'card-body'},
                                    discoverySuggestions.length===0?React.createElement('div',{style:{fontSize:10,color:'var(--t3)'}},'No actions matched your filters.'):
                                    discoverySuggestions.slice(0,3).map(function(s,i){return React.createElement('div',{key:'fa-'+i,style:{fontSize:10,color:'var(--t1)',padding:'6px 0',borderBottom:i<Math.min(3,discoverySuggestions.length)-1?'1px solid var(--border2)':'none'}},s.title);})
                                )
                            )
                        ),
                        rightTab==='details'&&(selected?React.createElement(React.Fragment,null,
                            React.createElement('button',{className:'top-btn',style:{width:'100%',marginBottom:12},onClick:function(){setSelected(null);setBlastRadius(null);if(nodesRef.current){nodesRef.current.selectAll('.nc').transition().duration(200).attr('opacity',1).attr('fill',getNodeColor);}if(linksRef.current){linksRef.current.transition().duration(200).attr('stroke-opacity',0.4).attr('stroke',theme==='light'?'#ccc':'#333');}}},'← Back to Issues'),
                            React.createElement('div',{className:'panel-header',style:{margin:'0 -12px 12px',padding:12}},
                                React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}},
                                    React.createElement('div',null,
                                        React.createElement('div',{className:'panel-title'},'📄 ',selected.name),
                                        React.createElement('div',{className:'panel-subtitle'},selected.folder||'root',' • ',selected.layer,' • ',selected.lines,' lines',selected.complexity&&selected.complexity.score>0?' • Complexity: '+selected.complexity.score:'')
                                    ),
                                    React.createElement('button',{className:'view-file-btn',onClick:function(){openFilePreview(selected.path);}},'👁️ View Source')
                                )
                            ),
                            blastRadius&&React.createElement('div',{className:'card',style:{marginBottom:12}},
                                React.createElement('div',{className:'card-header',onClick:function(){toggleCard('blast');}},React.createElement('div',{className:'card-title'},React.createElement('span',{className:'card-toggle'+(expandedCards.has('blast')?' open':'')},'▶'),'💥 Impact Analysis'),React.createElement('span',{className:'badge badge-'+(blastRadius.level==='low'?'success':blastRadius.level==='medium'?'warning':'danger')},blastRadius.level.toUpperCase())),
                                expandedCards.has('blast')&&React.createElement('div',{className:'card-body'},
                                    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}},
                                        React.createElement('div',{style:{background:'var(--bg0)',padding:8,borderRadius:6,textAlign:'center'}},
                                            React.createElement('div',{style:{fontSize:16,fontWeight:600,color:'var(--acc)'}},blastRadius.count),
                                            React.createElement('div',{style:{fontSize:9,color:'var(--t3)'}},'Direct Dependents')
                                        ),
                                        React.createElement('div',{style:{background:'var(--bg0)',padding:8,borderRadius:6,textAlign:'center'}},
                                            React.createElement('div',{style:{fontSize:16,fontWeight:600,color:'var(--purple)'}},blastRadius.transitiveCount||0),
                                            React.createElement('div',{style:{fontSize:9,color:'var(--t3)'}},'Transitive')
                                        ),
                                        React.createElement('div',{style:{background:'var(--bg0)',padding:8,borderRadius:6,textAlign:'center'}},
                                            React.createElement('div',{style:{fontSize:16,fontWeight:600,color:'var(--green)'}},blastRadius.fnsUsed||0),
                                            React.createElement('div',{style:{fontSize:9,color:'var(--t3)'}},'Fns Exported')
                                        ),
                                        React.createElement('div',{style:{background:'var(--bg0)',padding:8,borderRadius:6,textAlign:'center'}},
                                            React.createElement('div',{style:{fontSize:16,fontWeight:600,color:'var(--orange)'}},(blastRadius.dependencies||[]).length),
                                            React.createElement('div',{style:{fontSize:9,color:'var(--t3)'}},'Dependencies')
                                        )
                                    ),
                                    (blastRadius.count>0||blastRadius.fnsUsed>0)&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',marginBottom:8,padding:'6px 8px',background:'var(--bg0)',borderRadius:4}},
                                        blastRadius.count>0?'⚡ '+blastRadius.count+' file'+(blastRadius.count>1?'s':'')+' directly depend on this file':'',
                                        blastRadius.count>0&&blastRadius.fnsUsed>0?' • ':'',
                                        blastRadius.fnsUsed>0?blastRadius.fnsUsed+' function'+(blastRadius.fnsUsed>1?'s':'')+' used '+blastRadius.totalCalls+' times':''
                                    ),
                                    blastRadius.affected.length>0&&React.createElement('div',{className:'blast-detail'},
                                        React.createElement('div',{style:{fontSize:9,fontWeight:600,marginBottom:6}},'Files that import from this:'),
                                        blastRadius.affected.slice(0,8).map(function(path){return React.createElement('div',{key:path,className:'blast-file',onClick:function(){selectFile(path);}},'📄 ',path.split('/').pop());}),
                                        blastRadius.affected.length>8&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',marginTop:4}},'+',blastRadius.affected.length-8,' more')
                                    ),
                                    (blastRadius.dependencies||[]).length>0&&React.createElement('div',{className:'blast-detail',style:{marginTop:8}},
                                        React.createElement('div',{style:{fontSize:9,fontWeight:600,marginBottom:6,color:'var(--orange)'}},'Dependencies (risk if these change):'),
                                        blastRadius.dependencies.slice(0,5).map(function(path){return React.createElement('div',{key:path,className:'blast-file',onClick:function(){selectFile(path);}},'📄 ',path.split('/').pop());}),
                                        blastRadius.dependencies.length>5&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',marginTop:4}},'+',blastRadius.dependencies.length-5,' more')
                                    )
                                )
                            ),
                            (function(){
                                var outgoing=[],incoming=[];
                                var connByFile={out:{},in:{}};
                                data.connections.forEach(function(c){
                                    var src=typeof c.source==='object'?c.source.id:c.source;
                                    var tgt=typeof c.target==='object'?c.target.id:c.target;
                                    if(src===selected.path){
                                        if(!connByFile.out[tgt])connByFile.out[tgt]={file:tgt,fns:[]};
                                        connByFile.out[tgt].fns.push({name:c.fn,count:c.count});
                                    }
                                    if(tgt===selected.path){
                                        if(!connByFile.in[src])connByFile.in[src]={file:src,fns:[]};
                                        connByFile.in[src].fns.push({name:c.fn,count:c.count});
                                    }
                                });
                                outgoing=Object.values(connByFile.out).sort(function(a,b){return b.fns.length-a.fns.length;});
                                incoming=Object.values(connByFile.in).sort(function(a,b){return b.fns.length-a.fns.length;});
                                var totalConns=outgoing.length+incoming.length;
                                return totalConns>0&&React.createElement('div',{className:'card',style:{marginBottom:12}},
                                    React.createElement('div',{className:'card-header',onClick:function(){toggleCard('conns');}},React.createElement('div',{className:'card-title'},React.createElement('span',{className:'card-toggle'+(expandedCards.has('conns')?' open':'')},'▶'),'🔗 Connections'),React.createElement('span',{className:'badge badge-default'},totalConns)),
                                    expandedCards.has('conns')&&React.createElement('div',{className:'card-body',style:{padding:0}},
                                        outgoing.length>0&&React.createElement(React.Fragment,null,
                                            React.createElement('div',{style:{fontSize:9,fontWeight:600,color:'var(--t3)',padding:'8px 12px',background:'var(--bg2)',borderBottom:'1px solid var(--border)'}},'⬆️ Uses (',outgoing.length,' files)'),
                                            outgoing.slice(0,15).map(function(conn){
                                                var isOpen=expandedCards.has('conn-out-'+conn.file);
                                                return React.createElement('div',{key:conn.file,className:'conn-item'},
                                                    React.createElement('div',{className:'conn-header',onClick:function(e){e.stopPropagation();toggleCard('conn-out-'+conn.file);}},
                                                        React.createElement('span',{className:'card-toggle'+(isOpen?' open':''),style:{fontSize:8,marginRight:6}},'▶'),
                                                        React.createElement('span',{className:'conn-file-icon'},'📄'),
                                                        React.createElement('span',{className:'conn-file-name'},conn.file.split('/').pop()),
                                                        React.createElement('span',{className:'badge badge-default',style:{marginLeft:'auto'}},conn.fns.length,' fn',conn.fns.length!==1?'s':'')
                                                    ),
                                                    isOpen&&React.createElement('div',{className:'conn-fns'},
                                                        conn.fns.map(function(fn,i){return React.createElement('div',{key:i,className:'conn-fn'},
                                                            React.createElement('span',{className:'conn-fn-name'},fn.name,'()'),
                                                            React.createElement('span',{className:'conn-fn-count'},fn.count,'×')
                                                        );}),
                                                        React.createElement('div',{className:'conn-goto',onClick:function(){selectFile(conn.file);}},'→ View ',conn.file.split('/').pop())
                                                    )
                                                );
                                            }),
                                            outgoing.length>15&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',padding:8,textAlign:'center'}},'+',outgoing.length-15,' more files')
                                        ),
                                        incoming.length>0&&React.createElement(React.Fragment,null,
                                            React.createElement('div',{style:{fontSize:9,fontWeight:600,color:'var(--t3)',padding:'8px 12px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',borderTop:outgoing.length>0?'1px solid var(--border)':'none'}},'⬇️ Used by (',incoming.length,' files)'),
                                            incoming.slice(0,15).map(function(conn){
                                                var isOpen=expandedCards.has('conn-in-'+conn.file);
                                                return React.createElement('div',{key:conn.file,className:'conn-item'},
                                                    React.createElement('div',{className:'conn-header',onClick:function(e){e.stopPropagation();toggleCard('conn-in-'+conn.file);}},
                                                        React.createElement('span',{className:'card-toggle'+(isOpen?' open':''),style:{fontSize:8,marginRight:6}},'▶'),
                                                        React.createElement('span',{className:'conn-file-icon'},'📄'),
                                                        React.createElement('span',{className:'conn-file-name'},conn.file.split('/').pop()),
                                                        React.createElement('span',{className:'badge badge-default',style:{marginLeft:'auto'}},conn.fns.length,' fn',conn.fns.length!==1?'s':'')
                                                    ),
                                                    isOpen&&React.createElement('div',{className:'conn-fns'},
                                                        conn.fns.map(function(fn,i){return React.createElement('div',{key:i,className:'conn-fn'},
                                                            React.createElement('span',{className:'conn-fn-name'},fn.name,'()'),
                                                            React.createElement('span',{className:'conn-fn-count'},fn.count,'×')
                                                        );}),
                                                        React.createElement('div',{className:'conn-goto',onClick:function(){selectFile(conn.file);}},'→ View ',conn.file.split('/').pop())
                                                    )
                                                );
                                            }),
                                            incoming.length>15&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',padding:8,textAlign:'center'}},'+',incoming.length-15,' more files')
                                        )
                                    )
                                );
                            })(),
                            React.createElement('div',{className:'card',style:{marginBottom:12}},
                                React.createElement('div',{className:'card-header',onClick:function(){toggleCard('own');}},React.createElement('div',{className:'card-title'},React.createElement('span',{className:'card-toggle'+(expandedCards.has('own')?' open':'')},'▶'),'👥 Ownership')),
                                expandedCards.has('own')&&React.createElement('div',{className:'card-body'},
                                    ownerLoading?React.createElement('div',{className:'loading-owner'},'Loading ownership data...'):
                                    ownership&&ownership.length>0?React.createElement(React.Fragment,null,
                                        React.createElement('div',{className:'owner-bar'},ownership.slice(0,5).map(function(o,i){return React.createElement('div',{key:i,className:'owner-segment',style:{width:o.percent+'%',background:COLORS[i%COLORS.length]}});})),
                                        React.createElement('div',{className:'owner-list'},ownership.slice(0,5).map(function(o,i){return React.createElement('div',{key:i,className:'owner-item'},React.createElement('div',{className:'owner-avatar',style:{background:COLORS[i%COLORS.length]}},o.name[0].toUpperCase()),React.createElement('span',{className:'owner-name'},o.name),React.createElement('span',{className:'owner-percent'},o.percent,'%'));}))
                                    ):React.createElement('div',{style:{fontSize:10,color:'var(--t3)',padding:8}},'No ownership data available')
                                )
                            ),
                            React.createElement('div',{className:'card'},
                                React.createElement('div',{className:'card-header',onClick:function(){toggleCard('fns');}},React.createElement('div',{className:'card-title'},React.createElement('span',{className:'card-toggle'+(expandedCards.has('fns')?' open':'')},'▶'),'⚡ Functions (',selected.functions.length,')')),
                                expandedCards.has('fns')&&React.createElement('div',{className:'card-body',style:{padding:8}},
                                    selected.functions.length===0?React.createElement('div',{style:{fontSize:10,color:'var(--t3)',padding:8,textAlign:'center'}},'No functions detected'):
                                    selected.functions.map(function(fn){
                                        var st=data.fnStats[fn.name];
                                        var isExpanded=expandedFns.has(fn.name);
                                        var intCalls=st?st.internal:0,extCalls=st?st.external:0;
                                        return React.createElement('div',{key:fn.name,className:'fn-item'},
                                            React.createElement('div',{className:'fn-header',onClick:function(){toggleFn(fn.name);}},
                                                React.createElement('span',{className:'fn-name'},fn.name,'()'),
                                                React.createElement('span',{style:{display:'flex',alignItems:'center',gap:4}},
                                                    React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(selected.path,fn.line);},title:'View source'},'👁️'),
                                                    React.createElement('span',{className:'fn-line'},'L',fn.line),
                                                    React.createElement('span',{className:'badge badge-default',title:'Internal calls (same file)'},intCalls,' int'),
                                                    React.createElement('span',{className:'badge '+(extCalls>10?'badge-danger':extCalls>0?'badge-warning':'badge-default'),title:'External calls (other files)'},extCalls,' ext')
                                                )
                                            ),
                                            isExpanded&&React.createElement(React.Fragment,null,
                                                fn.code&&React.createElement('div',{className:'fn-code'},fn.code),
                                                st&&st.callers&&st.callers.length>0&&React.createElement('div',{className:'fn-callers'},
                                                    React.createElement('div',{className:'fn-callers-title'},'External callers:'),
                                                    st.callers.slice(0,8).map(function(c,i){return React.createElement('div',{key:i,className:'fn-caller',onClick:function(){selectFile(c.file);}},
                                                        React.createElement('span',null,'📄'),
                                                        React.createElement('span',null,c.name),
                                                        React.createElement('span',{style:{marginLeft:'auto',color:'var(--t3)'}},c.count,'×')
                                                    );}),
                                                    st.callers.length>8&&React.createElement('div',{style:{fontSize:9,color:'var(--t3)',padding:'4px 6px'}},'+',st.callers.length-8,' more')
                                                ),
                                                intCalls===0&&extCalls===0&&React.createElement('div',{style:{fontSize:9,color:'var(--orange)',padding:8,textAlign:'center',background:'rgba(255,159,67,0.1)',borderRadius:4}},'⚠️ This function is never called')
                                            )
                                        );
                                    })
                                )
                            )
                        ):React.createElement(React.Fragment,null,
                            React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'🔍 Architecture Issues (',filteredIssues.length,'/',data.issues.length,')'),
                            filteredIssues.length===0?React.createElement('div',{style:{textAlign:'center',padding:20}},React.createElement('div',{style:{fontSize:32,marginBottom:8}},'🔎'),React.createElement('div',{style:{color:'var(--t2)'}},'No issues matched your finder filters')):
                            filteredIssues.map(function(issue,i){var signal=getFindingSignal('issue',issue);return React.createElement('div',{key:i,className:'security-item '+(issue.type==='critical'?'high':'medium'),style:{cursor:'pointer'},onClick:function(){setDrillDown({type:'issue',data:issue});}},
                                React.createElement('div',{className:'security-header',style:{alignItems:'center'}},
                                    React.createElement('span',null,issue.type==='critical'?'🔴':'🟡'),
                                    React.createElement('span',{className:'security-title'},issue.title),
                                    React.createElement('span',{className:'badge '+signal.className,style:{marginLeft:'auto'},title:signal.title},signal.label)
                                ),
                                React.createElement('div',{className:'security-desc'},issue.desc),
                                React.createElement('div',{style:{fontSize:9,color:'var(--acc)',marginTop:6}},'Click for details (',issue.items?issue.items.length:0,' items) →')
                            );})
                        )),
                        rightTab==='patterns'&&React.createElement(React.Fragment,null,
                            React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'🧩 Design Patterns & Anti-Patterns (',filteredPatterns.length,'/',data.patterns.length,')'),
                            filteredPatterns.length===0?React.createElement('div',{style:{textAlign:'center',padding:20,color:'var(--t3)'}},React.createElement('div',{style:{fontSize:32,marginBottom:8}},'🔎'),React.createElement('div',null,'No patterns matched your finder filters')):
                            filteredPatterns.map(function(p,i){var signal=getFindingSignal('pattern',p);return React.createElement('div',{key:i,className:'pattern-item'+(p.isAnti?' anti':''),style:{cursor:'pointer'},onClick:function(){setDrillDown({type:'pattern',data:p});}},
                                React.createElement('div',{className:'pattern-header'},
                                    React.createElement('span',{className:'pattern-icon'},p.icon),
                                    React.createElement('span',{className:'pattern-name'},p.name),
                                    p.isAnti&&React.createElement('span',{className:'badge badge-danger',style:{marginLeft:8}},'Anti-pattern'),
                                    React.createElement('span',{className:'badge '+signal.className,style:{marginLeft:'auto'},title:signal.title},signal.label)
                                ),
                                React.createElement('div',{className:'pattern-desc'},p.desc),
                                React.createElement('div',{style:{fontSize:9,color:'var(--acc)',marginTop:6}},'Click for details (',p.files.length,' files) →')
                            );})
                        ),
                        rightTab==='security'&&React.createElement(React.Fragment,null,
                            React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'🔐 Security Analysis (',filteredSecurity.length,'/',data.securityIssues.length,')'),
                            filteredSecurity.length===0?React.createElement('div',{style:{textAlign:'center',padding:20}},React.createElement('div',{style:{fontSize:32,marginBottom:8}},'🔎'),React.createElement('div',{style:{color:'var(--t2)',fontWeight:600}},'No security findings matched your finder filters')):
                            React.createElement(React.Fragment,null,
                                React.createElement('div',{style:{display:'flex',gap:8,marginBottom:12}},
                                    React.createElement('div',{className:'badge badge-danger'},filteredSecurity.filter(function(i){return i.severity==='high';}).length,' High'),
                                    React.createElement('div',{className:'badge badge-warning'},filteredSecurity.filter(function(i){return i.severity==='medium';}).length,' Medium'),
                                    React.createElement('div',{className:'badge badge-info'},filteredSecurity.filter(function(i){return i.severity==='low';}).length,' Low')
                                ),
                                filteredSecurity.map(function(issue,i){var signal=getFindingSignal('security',issue);return React.createElement('div',{key:i,className:'security-item '+issue.severity,style:{cursor:'pointer'},onClick:function(){setDrillDown({type:'security',data:issue});}},
                                    React.createElement('div',{className:'security-header'},
                                        React.createElement('span',null,issue.severity==='high'?'🔴':issue.severity==='medium'?'🟡':'🔵'),
                                        React.createElement('span',{className:'security-title'},issue.title),
                                        React.createElement('span',{className:'badge '+signal.className,style:{marginLeft:'auto'},title:signal.title},signal.label)
                                    ),
                                    React.createElement('div',{className:'security-desc'},issue.desc),
                                    React.createElement('div',{style:{fontSize:9,color:'var(--acc)',marginTop:6}},'Click for details →'),
                                    issue.code&&React.createElement('div',{className:'security-code'},issue.code)
                                );})
                            )
                        ),
                        rightTab==='suggestions'&&React.createElement(React.Fragment,null,
                            React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'💡 Actionable Suggestions (',filteredSuggestions.length,'/',(data.suggestions||[]).length,')'),
                            React.createElement('div',{style:{background:'var(--bg0)',borderRadius:8,padding:10,marginBottom:12,border:'1px solid var(--border)'}},
                                React.createElement('div',{style:{fontSize:10,fontWeight:600,marginBottom:6}},'Do This First'),
                                React.createElement('div',{style:{fontSize:9,color:'var(--t2)'}},
                                    data.stats.security>0?'1) Fix '+data.stats.security+' high-severity security issue'+(data.stats.security>1?'s':'')+'. ':'' ,
                                    data.layerViolations&&data.layerViolations.length>0?'2) Resolve '+data.layerViolations.length+' architecture violation'+(data.layerViolations.length>1?'s':'')+'. ':'' ,
                                    data.stats.dead>0?'3) Remove or validate '+data.stats.dead+' unused function'+(data.stats.dead>1?'s':'')+'.':''
                                )
                            ),
                            data.excludeRecommendations&&data.excludeRecommendations.length>0&&React.createElement('div',{style:{background:'var(--bg0)',borderRadius:8,padding:10,marginBottom:12,border:'1px solid var(--border)'}},
                                React.createElement('div',{style:{fontSize:10,fontWeight:600,marginBottom:8}},'Recommended Excludes'),
                                data.excludeRecommendations.map(function(rec,i){return React.createElement('div',{key:i,style:{padding:'8px 0',borderBottom:i<data.excludeRecommendations.length-1?'1px solid var(--border2)':'none'}},
                                    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
                                        React.createElement('code',{style:{fontSize:9,color:'var(--acc)',background:'var(--bg2)',padding:'2px 6px',borderRadius:4}},rec.pattern),
                                        React.createElement('span',{className:'badge badge-'+(rec.priority==='high'?'warning':'info'),style:{marginLeft:'auto'}},(rec.count||0)+' files')
                                    ),
                                    React.createElement('div',{style:{fontSize:9,color:'var(--t2)',marginTop:4}},rec.reason),
                                    React.createElement('button',{className:'view-file-btn',style:{marginTop:6},onClick:function(){appendExcludePattern(rec.pattern);}},'Add to Excludes')
                                );})
                            ),
                            filteredSuggestions.length===0?React.createElement('div',{style:{textAlign:'center',padding:20}},React.createElement('div',{style:{fontSize:32,marginBottom:8}},'🔎'),React.createElement('div',{style:{color:'var(--t2)',fontWeight:600}},'No actions matched your finder filters')):
                            React.createElement(React.Fragment,null,
                                React.createElement('div',{style:{fontSize:9,color:'var(--t3)',marginBottom:12}},'Prioritized recommendations based on your codebase analysis'),
                                filteredSuggestions.map(function(s,i){var signal=getFindingSignal('suggestion',s);return React.createElement('div',{key:i,className:'suggestion-card',style:{background:'var(--bg0)',borderRadius:8,padding:12,marginBottom:10,borderLeft:'3px solid '+(s.priority==='critical'?'var(--red)':s.priority==='high'?'var(--orange)':'var(--acc)')}},
                                    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:6}},
                                        React.createElement('span',{style:{fontSize:18}},s.icon),
                                        React.createElement('span',{style:{fontWeight:600,fontSize:11}},s.title),
                                        React.createElement('span',{className:'badge '+signal.className,title:signal.title},signal.label),
                                        React.createElement('span',{className:'badge badge-'+(s.priority==='critical'?'danger':s.priority==='high'?'warning':'info'),style:{marginLeft:'auto',fontSize:8}},s.priority.toUpperCase())
                                    ),
                                    React.createElement('div',{style:{fontSize:10,color:'var(--t2)',marginBottom:8}},s.desc),
                                    React.createElement('div',{style:{fontSize:9,background:'var(--bg2)',padding:'6px 8px',borderRadius:4,marginBottom:6}},
                                        React.createElement('span',{style:{color:'var(--t3)'}},'Action: '),
                                        React.createElement('span',{style:{color:'var(--t1)'}},s.action)
                                    ),
                                    React.createElement('div',{style:{fontSize:9,color:'var(--green)'}},'✓ ',s.impact)
                                );}),
                                data.duplicates&&data.duplicates.length>0&&React.createElement('div',{style:{marginTop:16}},
                                    React.createElement('div',{style:{fontSize:11,fontWeight:600,marginBottom:8}},'📋 Duplicate Functions (',data.duplicates.length,')'),
                                    data.duplicates.slice(0,10).map(function(d,i){return React.createElement('div',{key:i,style:{background:'var(--bg0)',borderRadius:6,padding:8,marginBottom:6,fontSize:10,cursor:'pointer'},onClick:function(){setDrillDown({type:'duplicate',data:d});}},
                                        React.createElement('div',{style:{fontWeight:600,color:d.type==='code'?'var(--purple)':'var(--orange)'}},d.type==='code'?'Similar Code':'Same Name',': ',d.name),
                                        React.createElement('div',{style:{fontSize:9,color:'var(--acc)',marginTop:4}},'Click for details (',d.files.length,' locations) →')
                                    );})
                                )
                            )
                        )
                    )
                ):React.createElement('div',{className:'empty-state'},React.createElement('div',{className:'empty-icon'},'📊'),React.createElement('div',{className:'empty-title'},'Analysis'),React.createElement('div',{className:'empty-desc'},'Analyze a GitHub repo or local folder to see insights'))
            )
        ),
        showExport&&React.createElement('div',{className:'modal-overlay',onClick:function(){setShowExport(false);}},
            React.createElement('div',{className:'modal',onClick:function(e){e.stopPropagation();},style:{maxWidth:480}},
                React.createElement('div',{className:'modal-header'},React.createElement('div',{className:'modal-title'},'📤 Export'),React.createElement('button',{className:'modal-close',onClick:function(){setShowExport(false);}},'×')),
                React.createElement('div',{className:'modal-body'},
                    React.createElement('div',{style:{fontSize:10,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',marginBottom:8}},'Visualization'),
                    React.createElement('div',{className:'export-options'},
                        React.createElement('div',{className:'export-option',onClick:function(){exportPDF();setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'📑'),React.createElement('div',{className:'export-option-label'},'PDF Report'),React.createElement('div',{className:'export-option-desc'},'Report + graph')),
                        React.createElement('div',{className:'export-option',onClick:function(){exportSVG();setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'🖼️'),React.createElement('div',{className:'export-option-label'},'SVG Image')),
                        React.createElement('div',{className:'export-option',onClick:function(){copyLink();setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'🔗'),React.createElement('div',{className:'export-option-label'},'Share Link'))
                    ),
                    React.createElement('div',{style:{fontSize:10,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',marginBottom:8,marginTop:16}},'Analysis Report'),
                    React.createElement('div',{style:{fontSize:9,color:'var(--t2)',marginBottom:10}},'Complete analysis with files, functions, patterns, security issues, and dependencies'),
                    React.createElement('div',{className:'export-options'},
                        React.createElement('div',{className:'export-option',onClick:function(){generateReport('json');setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'📋'),React.createElement('div',{className:'export-option-label'},'JSON Report')),
                        React.createElement('div',{className:'export-option',onClick:function(){generateReport('md');setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'📝'),React.createElement('div',{className:'export-option-label'},'Markdown')),
                        React.createElement('div',{className:'export-option',onClick:function(){generateReport('txt');setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'📄'),React.createElement('div',{className:'export-option-label'},'Plain Text'))
                    ),
                    React.createElement('div',{style:{fontSize:10,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',marginBottom:8,marginTop:16}},'Raw Data'),
                    React.createElement('div',{className:'export-options'},
                        React.createElement('div',{className:'export-option',onClick:function(){exportJSON();setShowExport(false);}},React.createElement('div',{className:'export-option-icon'},'⚙️'),React.createElement('div',{className:'export-option-label'},'Raw JSON'))
                    )
                )
            )
        ),
        showExcludeModal&&React.createElement('div',{className:'modal-overlay',onClick:closeExcludeModal},
            React.createElement('div',{className:'modal',onClick:function(e){e.stopPropagation();},style:{maxWidth:540}},
                React.createElement('div',{className:'modal-header'},
                    React.createElement('div',{className:'modal-title'},'🚫 Exclude Patterns'),
                    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:12}},
                        React.createElement('div',{className:'exclude-count'},parseExcludePatterns(excludePatternDraft).length,' custom'),
                        React.createElement('button',{className:'modal-close',onClick:closeExcludeModal},'×')
                    )
                ),
                React.createElement('div',{className:'modal-body'},
                    React.createElement('div',{className:'exclude-note'},
                        'Common build and cache folders are already excluded by default. Add project-specific patterns here before scanning a repo or opening a local folder.'
                    ),
                    React.createElement('div',{className:'exclude-note'},
                        'Supports exact names like ',React.createElement('code',null,'.git'),' or ',React.createElement('code',null,'attachments'),
                        ', file globs like ',React.createElement('code',null,'*.png'),
                        ', and path globs like ',React.createElement('code',null,'uploads/**'),' or ',React.createElement('code',null,'**/cache/**'),'.'
                    ),
                    React.createElement('div',{className:'form-group'},
                        React.createElement('label',{className:'form-label'},'Always Excluded'),
                        React.createElement('div',{className:'exclude-chip-list'},
                            DEFAULT_EXCLUDE_CHIPS.map(function(pattern){return React.createElement('div',{key:pattern,className:'exclude-chip'},pattern);})
                        )
                    ),
                    React.createElement('div',{className:'form-group'},
                        React.createElement('label',{className:'form-label'},'Custom Patterns'),
                        React.createElement('textarea',{className:'form-input exclude-textarea','aria-label':'Custom exclude patterns',placeholder:'attachments\nuploads/**\n**/cache/**\n*.png\n*.log',value:excludePatternDraft,onChange:function(e){setExcludePatternDraft(e.target.value);},rows:8}),
                        React.createElement('div',{className:'exclude-help'},'Use one pattern per line, or separate patterns with commas. Changes apply to the next analysis or refresh.')
                    ),
                    data&&data.excludeRecommendations&&data.excludeRecommendations.length>0&&React.createElement('div',{className:'form-group'},
                        React.createElement('label',{className:'form-label'},'Recommendations Based on Current Scan'),
                        React.createElement('div',{className:'exclude-chip-list'},
                            data.excludeRecommendations.map(function(rec){return React.createElement('button',{key:rec.pattern,className:'exclude-chip',style:{cursor:'pointer',border:'1px solid var(--border)'},onClick:function(){setExcludePatternDraft(parseExcludePatterns((excludePatternDraft?excludePatternDraft+'\n':'')+rec.pattern).join('\n'));}},rec.pattern,' (',rec.count,')');})
                        )
                    )
                ),
                React.createElement('div',{className:'modal-footer'},
                    excludePatternDraft&&React.createElement('button',{className:'top-btn',onClick:function(){setExcludePatternDraft('');},style:{marginRight:'auto'}},'Clear Custom'),
                    React.createElement('button',{className:'top-btn',onClick:closeExcludeModal},'Cancel'),
                    React.createElement('button',{className:'top-btn primary',onClick:saveExcludePatterns},launchFolderAfterExcludeSave?'Save & Continue':'Save')
                )
            )
        ),
        showPR&&React.createElement('div',{className:'modal-overlay',onClick:function(){setShowPR(false);}},
            React.createElement('div',{className:'modal pr-modal',onClick:function(e){e.stopPropagation();}},
                React.createElement('div',{className:'modal-header'},React.createElement('div',{className:'modal-title'},'📊 PR Impact Analyzer'),React.createElement('button',{className:'modal-close',onClick:function(){setShowPR(false);}},'×')),
                React.createElement('div',{className:'modal-body',style:{maxHeight:'75vh',overflowY:'auto'}},
                    React.createElement('div',{className:'form-group'},React.createElement('label',{className:'form-label'},'Pull Request URL'),React.createElement('input',{className:'form-input','aria-label':'Pull Request URL',placeholder:'https://github.com/owner/repo/pull/123',value:prUrl,onChange:function(e){setPrUrl(e.target.value);},onKeyDown:function(e){if(e.key==='Enter')analyzePR();}})),
                    React.createElement('button',{className:'top-btn primary','aria-label':'Analyze Pull Request',onClick:analyzePR,style:{marginBottom:16,width:'100%'}},'🔍 Analyze PR Impact'),
                    prData&&(function(){
                        var risk = calcPRRisk(prData, data);
                        var reviewers = findSuggestedReviewers(prData, data);
                        var testImpact = findTestImpact(prData, data);
                        var chains = findDependencyChains(prData, data);
                        var riskColor = risk.level === 'critical' ? 'var(--red)' : risk.level === 'high' ? 'var(--orange)' : risk.level === 'medium' ? 'var(--blue)' : 'var(--green)';
                        return React.createElement(React.Fragment, null,
                            React.createElement('div',{className:'pr-header',style:{marginBottom:16}},
                                React.createElement('div',{className:'pr-title',style:{fontSize:14}},prData.title),
                                React.createElement('div',{className:'pr-stats',style:{marginTop:8}},
                                    React.createElement('span',{className:'pr-add'},'+',prData.additions||0),
                                    React.createElement('span',{className:'pr-del'},'-',prData.deletions||0),
                                    React.createElement('span',{style:{color:'var(--t3)',marginLeft:8}},prData.files?prData.files.length:0,' files')
                                )
                            ),
                            React.createElement('div',{className:'pr-impact-grid'},
                                React.createElement('div',{className:'pr-impact-card'},
                                    React.createElement('div',{className:'pr-risk-meter'},
                                        React.createElement('div',{className:'pr-risk-circle',style:{borderColor:riskColor,background:'rgba('+[risk.level==='critical'?'255,95,95':risk.level==='high'?'255,159,67':risk.level==='medium'?'77,159,255':'34,197,94'].join(',')+',0.1)'}},
                                            React.createElement('div',{className:'pr-risk-value',style:{color:riskColor}},risk.score),
                                            React.createElement('div',{className:'pr-risk-text',style:{color:riskColor}},risk.level)
                                        ),
                                        React.createElement('div',{style:{marginTop:12,fontSize:10,color:'var(--t2)',textAlign:'center'}},'Risk Score')
                                    ),
                                    risk.factors.length > 0 && React.createElement('div',{style:{marginTop:12}},
                                        risk.factors.map(function(f,i) { return React.createElement('div',{key:i,style:{fontSize:9,color:'var(--t2)',padding:'4px 0',borderTop:i>0?'1px solid var(--border2)':'none'}},'• ',f); })
                                    )
                                ),
                                React.createElement('div',{className:'pr-impact-card'},
                                    React.createElement('div',{className:'pr-impact-card-title'},'📈 Impact Metrics'),
                                    React.createElement('div',{className:'pr-metric-row'},React.createElement('span',{className:'pr-metric-label'},'Total Blast Radius'),React.createElement('span',{className:'pr-metric-value'},risk.totalBlast,' files')),
                                    React.createElement('div',{className:'pr-metric-row'},React.createElement('span',{className:'pr-metric-label'},'Files Changed'),React.createElement('span',{className:'pr-metric-value'},prData.files?prData.files.length:0)),
                                    React.createElement('div',{className:'pr-metric-row'},React.createElement('span',{className:'pr-metric-label'},'Lines Modified'),React.createElement('span',{className:'pr-metric-value'},(prData.additions||0)+(prData.deletions||0))),
                                    React.createElement('div',{className:'pr-metric-row'},React.createElement('span',{className:'pr-metric-label'},'Net Change'),React.createElement('span',{className:'pr-metric-value',style:{color:(prData.additions||0)-(prData.deletions||0)>=0?'var(--green)':'var(--red)'}},(prData.additions||0)-(prData.deletions||0)>0?'+':'',(prData.additions||0)-(prData.deletions||0)))
                                ),
                                reviewers.length > 0 && React.createElement('div',{className:'pr-impact-card'},
                                    React.createElement('div',{className:'pr-impact-card-title'},'👥 Suggested Reviewers'),
                                    reviewers.map(function(r,i) { return React.createElement('div',{key:i,className:'pr-reviewer-card'},
                                        React.createElement('div',{className:'pr-reviewer-avatar',style:{background:r.avatar}},r.name[0]),
                                        React.createElement('div',{className:'pr-reviewer-info'},
                                            React.createElement('div',{className:'pr-reviewer-name'},r.name),
                                            React.createElement('div',{className:'pr-reviewer-reason'},r.reason)
                                        )
                                    ); })
                                ),
                                testImpact.length > 0 && React.createElement('div',{className:'pr-impact-card'},
                                    React.createElement('div',{className:'pr-impact-card-title'},'🧪 Test Impact'),
                                    React.createElement('div',{className:'pr-test-impact'},
                                        testImpact.slice(0,5).map(function(t,i) { return React.createElement('div',{key:i,className:'pr-test-file'},
                                            React.createElement('span',{className:'pr-test-icon'},t.suggested?'💡':'✅'),
                                            React.createElement('span',{style:{flex:1}},t.file),
                                            t.suggested && React.createElement('span',{className:'badge badge-info'},'suggested')
                                        ); })
                                    )
                                )
                            ),
                            chains.length > 0 && React.createElement('div',{className:'pr-impact-card',style:{marginTop:16}},
                                React.createElement('div',{className:'pr-impact-card-title'},'🔗 Dependency Chains'),
                                React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginBottom:12}},'Files that import modified files (downstream impact)'),
                                chains.map(function(chain,i) { return React.createElement('div',{key:i,className:'pr-dependency-chain',style:{marginBottom:8}},
                                    chain.map(function(node,j) { return React.createElement(React.Fragment,{key:j},
                                        React.createElement('span',{className:'pr-chain-node'+(j===0?' changed':'')},node),
                                        j < chain.length - 1 && React.createElement('span',{className:'pr-chain-arrow'},'→')
                                    ); })
                                ); })
                            ),
                            risk.hotspots.length > 0 && React.createElement('div',{className:'pr-impact-card',style:{marginTop:16}},
                                React.createElement('div',{className:'pr-impact-card-title'},'🔥 Hotspots'),
                                React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginBottom:12}},'Files with highest blast radius'),
                                risk.hotspots.map(function(h,i) {
                                    var maxBlast = Math.max.apply(null, risk.hotspots.map(function(x){return x.blast;})) || 1;
                                    return React.createElement('div',{key:i,className:'pr-hotspot'},
                                        React.createElement('span',{style:{fontSize:10,color:'var(--t1)',minWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},h.file.split('/').pop()),
                                        React.createElement('div',{className:'pr-hotspot-bar'},
                                            React.createElement('div',{className:'pr-hotspot-fill',style:{width:(h.blast/maxBlast*100)+'%',background:'linear-gradient(90deg, var(--orange), var(--red))'}})
                                        ),
                                        React.createElement('span',{style:{fontSize:9,color:'var(--t3)',minWidth:50,textAlign:'right'}},h.blast,' files')
                                    );
                                })
                            ),
                            React.createElement('div',{className:'pr-impact-card',style:{marginTop:16}},
                                React.createElement('div',{className:'pr-impact-card-title'},'📁 Changed Files'),
                                React.createElement('div',{className:'pr-files-list'},
                                    prData.files&&prData.files.slice(0,20).map(function(f,i){
                                        var existing=data&&data.files.find(function(df){return df.path===f.filename;});
                                        var blast=existing?calcBlast(f.filename,data.connections,data.files):null;
                                        var statusColor = f.status === 'added' ? 'var(--green)' : f.status === 'removed' ? 'var(--red)' : 'var(--blue)';
                                        return React.createElement('div',{key:i,className:'pr-file-row'},
                                            React.createElement('div',{className:'pr-file-status',style:{background:statusColor}}),
                                            React.createElement('div',{className:'pr-file-info'},
                                                React.createElement('div',{className:'pr-file-path'},f.filename.split('/').pop()),
                                                React.createElement('div',{className:'pr-file-folder'},f.filename.includes('/')?f.filename.substring(0,f.filename.lastIndexOf('/')):'root')
                                            ),
                                            React.createElement('div',{className:'pr-file-badges'},
                                                f.additions>0&&React.createElement('span',{className:'pr-mini-badge',style:{background:'rgba(34,197,94,0.2)',color:'var(--green)'}},'+',f.additions),
                                                f.deletions>0&&React.createElement('span',{className:'pr-mini-badge',style:{background:'rgba(255,95,95,0.2)',color:'var(--red)'}},'-',f.deletions),
                                                blast&&React.createElement('span',{className:'pr-mini-badge',style:{background:blast.level==='low'?'rgba(34,197,94,0.2)':blast.level==='medium'?'rgba(255,159,67,0.2)':'rgba(255,95,95,0.2)',color:blast.level==='low'?'var(--green)':blast.level==='medium'?'var(--orange)':'var(--red)'}},blast.count,' ⚡')
                                            )
                                        );
                                    }),
                                    prData.files&&prData.files.length>20&&React.createElement('div',{style:{textAlign:'center',padding:8,fontSize:10,color:'var(--t3)'}},'+',prData.files.length-20,' more files')
                                )
                            )
                        );
                    })()
                )
            )
        ),
        drillDown&&React.createElement('div',{className:'modal-overlay',onClick:function(){setDrillDown(null);}},
            React.createElement('div',{className:'modal',onClick:function(e){e.stopPropagation();},style:{maxWidth:600,maxHeight:'85vh',display:'flex',flexDirection:'column'}},
                React.createElement('div',{className:'modal-header'},
                    React.createElement('div',{className:'modal-title'},
                        drillDown.type==='issue'?(drillDown.data.type==='critical'?'🔴 ':'🟡 ')+drillDown.data.title:
                        drillDown.type==='pattern'?drillDown.data.icon+' '+drillDown.data.name:
                        drillDown.type==='security'?(drillDown.data.severity==='high'?'🔴':drillDown.data.severity==='medium'?'🟡':'🔵')+' '+drillDown.data.title:
                        drillDown.type==='duplicate'?(drillDown.data.type==='code'?'📋 Similar Code':'📛 Duplicate Name')+': '+drillDown.data.name:
                        'Details'
                    ),
                    React.createElement('button',{className:'modal-close',onClick:function(){setDrillDown(null);}},'×')
                ),
                React.createElement('div',{className:'modal-body',style:{overflowY:'auto',flex:1}},
                    // Issue drill-down
                    drillDown.type==='issue'&&React.createElement(React.Fragment,null,
                        React.createElement('div',{style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:16}},
                            React.createElement('div',{style:{fontSize:11,color:'var(--t2)'}},drillDown.data.desc)
                        ),
                        React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'All Affected Items (',drillDown.data.items?drillDown.data.items.length:0,')'),
                        drillDown.data.items&&drillDown.data.items.map(function(item,j){return React.createElement('div',{key:j,style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:8,borderLeft:'3px solid var(--acc)'}},
                            React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
                                React.createElement('div',{style:{fontWeight:600,fontSize:11}},item.name),
                                item.file&&React.createElement('div',{style:{display:'flex',gap:6}},
                                    React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(item.file,item.line);}},'👁️ View'),
                                    React.createElement('button',{style:{fontSize:9,padding:'4px 8px',background:'var(--acc)',color:'var(--bg0)',border:'none',borderRadius:4,cursor:'pointer'},onClick:function(e){e.stopPropagation();selectFile(item.file);setDrillDown(null);}},'Go to file →')
                                )
                            ),
                            item.file&&React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginTop:4,fontFamily:'monospace'}},item.file,item.line?' : '+item.line:''),
                            (item.lines||item.fns||item.imports||item.score)&&React.createElement('div',{style:{display:'flex',gap:12,marginTop:8}},
                                item.lines&&React.createElement('span',{style:{fontSize:9,color:'var(--purple)'}},item.lines,' lines'),
                                item.fns&&React.createElement('span',{style:{fontSize:9,color:'var(--orange)'}},item.fns,' functions'),
                                item.imports&&React.createElement('span',{style:{fontSize:9,color:'var(--blue)'}},item.imports,' imports'),
                                item.score&&React.createElement('span',{style:{fontSize:9,color:'var(--red)'}},'Complexity: ',item.score)
                            ),
                            item.code&&React.createElement('pre',{style:{fontSize:9,background:'var(--bg2)',padding:8,borderRadius:4,marginTop:8,overflow:'auto',maxHeight:100,fontFamily:'monospace'}},item.code),
                            item.suggestion&&React.createElement('div',{style:{fontSize:10,color:'var(--acc)',marginTop:8,padding:'6px 8px',background:'var(--bg2)',borderRadius:4}},'💡 ',item.suggestion),
                            // For items with nested files (like duplicates)
                            item.files&&React.createElement('div',{style:{marginTop:8}},
                                React.createElement('div',{style:{fontSize:9,color:'var(--t3)',marginBottom:4}},'Locations:'),
                                item.files.map(function(f,k){return React.createElement('div',{key:k,style:{fontSize:9,color:'var(--t2)',padding:'4px 8px',background:'var(--bg2)',borderRadius:4,marginBottom:4,display:'flex',justifyContent:'space-between',alignItems:'center'}},
                                    React.createElement('span',{style:{fontFamily:'monospace',cursor:'pointer',flex:1},onClick:function(){selectFile(f.file||f);setDrillDown(null);}},typeof f==='string'?f.split('/').pop():(f.file||'').split('/').pop(),f.line?' :'+f.line:''),
                                    React.createElement('div',{style:{display:'flex',gap:4}},
                                        React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(f.file||f,f.line);}},'👁️'),
                                        React.createElement('span',{style:{color:'var(--acc)',cursor:'pointer'},onClick:function(){selectFile(f.file||f);setDrillDown(null);}},'→')
                                    )
                                );})
                            )
                        );})
                    ),
                    // Pattern drill-down
                    drillDown.type==='pattern'&&React.createElement(React.Fragment,null,
                        React.createElement('div',{style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:16}},
                            React.createElement('div',{style:{fontSize:11,color:'var(--t2)'}},drillDown.data.desc),
                            drillDown.data.isAnti&&React.createElement('div',{style:{marginTop:8}},React.createElement('span',{className:'badge badge-danger'},'Anti-pattern'))
                        ),
                        drillDown.data.metrics&&React.createElement('div',{style:{display:'flex',gap:12,marginBottom:16}},
                            Object.entries(drillDown.data.metrics).map(function(e){return React.createElement('div',{key:e[0],style:{background:'var(--bg0)',padding:12,borderRadius:8,textAlign:'center',flex:1}},
                                React.createElement('div',{style:{fontSize:20,fontWeight:600,color:'var(--acc)'}},e[1]),
                                React.createElement('div',{style:{fontSize:9,color:'var(--t3)',textTransform:'capitalize'}},e[0])
                            );})
                        ),
                        React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'All Files (',drillDown.data.files.length,')'),
                        drillDown.data.files.map(function(f,j){return React.createElement('div',{key:j,style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:8,borderLeft:'3px solid var(--acc)'}},
                            React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
                                React.createElement('div',{style:{fontWeight:600,fontSize:11,cursor:'pointer'},onClick:function(){selectFile(f.path);setDrillDown(null);}},f.name),
                                React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(f.path);}},'👁️ View')
                            ),
                            React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginTop:4,fontFamily:'monospace',cursor:'pointer'},onClick:function(){selectFile(f.path);setDrillDown(null);}},f.path),
                            f.fns&&React.createElement('div',{style:{fontSize:10,color:'var(--orange)',marginTop:4}},f.fns,' functions'),
                            f.lines&&React.createElement('div',{style:{fontSize:10,color:'var(--purple)',marginTop:4}},f.lines,' lines')
                        );})
                    ),
                    // Security drill-down
                    drillDown.type==='security'&&React.createElement(React.Fragment,null,
                        React.createElement('div',{style:{background:drillDown.data.severity==='high'?'rgba(255,100,100,0.1)':drillDown.data.severity==='medium'?'rgba(255,180,100,0.1)':'rgba(100,180,255,0.1)',padding:12,borderRadius:8,marginBottom:16,borderLeft:'3px solid '+(drillDown.data.severity==='high'?'var(--red)':drillDown.data.severity==='medium'?'var(--orange)':'var(--blue)')}},
                            React.createElement('div',{style:{fontSize:11,fontWeight:600,marginBottom:4}},drillDown.data.severity.toUpperCase()+' Severity'),
                            React.createElement('div',{style:{fontSize:11,color:'var(--t2)'}},drillDown.data.desc)
                        ),
                        React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'Location'),
                        React.createElement('div',{style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:16}},
                            React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
                                React.createElement('div',{style:{fontWeight:600,fontSize:11,cursor:'pointer'},onClick:function(){selectFile(drillDown.data.path);setDrillDown(null);}},drillDown.data.file),
                                React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(drillDown.data.path,drillDown.data.line);}},'👁️ View')
                            ),
                            React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginTop:4,fontFamily:'monospace',cursor:'pointer'},onClick:function(){selectFile(drillDown.data.path);setDrillDown(null);}},drillDown.data.path),
                            drillDown.data.line&&React.createElement('div',{style:{fontSize:10,color:'var(--orange)',marginTop:4}},'Line ',drillDown.data.line)
                        ),
                        drillDown.data.code&&React.createElement(React.Fragment,null,
                            React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'Code'),
                            React.createElement('pre',{style:{background:'var(--bg0)',padding:12,borderRadius:8,fontSize:10,fontFamily:'monospace',overflow:'auto',whiteSpace:'pre-wrap',wordBreak:'break-all'}},drillDown.data.code)
                        ),
                        React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12,marginTop:16}},'How to Fix'),
                        React.createElement('div',{style:{background:'var(--bg0)',padding:12,borderRadius:8,fontSize:10}},
                            drillDown.data.title==='Hardcoded Secret'?'Move credentials to environment variables (process.env) or a secrets manager like AWS Secrets Manager, HashiCorp Vault, or .env files (not committed to git).':
                            drillDown.data.title==='SQL Injection Risk'?'Use parameterized queries or prepared statements. Never concatenate user input directly into SQL strings.':
                            drillDown.data.title==='XSS Vulnerability'?'Sanitize user input before rendering. Use textContent instead of innerHTML, or use a sanitization library like DOMPurify.':
                            drillDown.data.title==='Dynamic Code Execution'?'Avoid eval() entirely. Use JSON.parse() for JSON, or Function constructor only with trusted input.':
                            'Review the flagged code and apply security best practices.'
                        )
                    ),
                    // Duplicate drill-down
                    drillDown.type==='duplicate'&&React.createElement(React.Fragment,null,
                        React.createElement('div',{style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:16}},
                            React.createElement('div',{style:{fontSize:11,color:'var(--t2)'}},drillDown.data.suggestion)
                        ),
                        React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12}},'All Locations (',drillDown.data.files.length,')'),
                        drillDown.data.files.map(function(f,j){return React.createElement('div',{key:j,style:{background:'var(--bg0)',padding:12,borderRadius:8,marginBottom:8,borderLeft:'3px solid '+(drillDown.data.type==='code'?'var(--purple)':'var(--orange)')}},
                            React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
                                React.createElement('div',{style:{fontWeight:600,fontSize:11,cursor:'pointer'},onClick:function(){selectFile(f.file);setDrillDown(null);}},f.name||drillDown.data.name),
                                React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(f.file,f.line);}},'👁️ View')
                            ),
                            React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginTop:4,fontFamily:'monospace',cursor:'pointer'},onClick:function(){selectFile(f.file);setDrillDown(null);}},f.file),
                            f.line&&React.createElement('div',{style:{fontSize:10,color:'var(--orange)',marginTop:4}},'Line ',f.line)
                        );}),
                        React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:12,marginTop:16}},'Suggested Action'),
                        React.createElement('div',{style:{background:'var(--bg0)',padding:12,borderRadius:8,fontSize:10}},
                            drillDown.data.type==='code'?'Extract the similar code into a shared utility function. This reduces maintenance burden and ensures consistent behavior.':
                            'Consider renaming these functions to be more specific, or consolidate them into a single shared function if they serve the same purpose.'
                        )
                    )
                )
            )
        ),
        showFeatures&&React.createElement('div',{className:'modal-overlay',onClick:function(){setShowFeatures(false);}},
            React.createElement('div',{className:'modal features-modal',onClick:function(e){e.stopPropagation();},style:{maxWidth:560}},
                React.createElement('div',{className:'modal-header'},React.createElement('div',{className:'modal-title'},'⚡ Repo-Intel'),React.createElement('button',{className:'modal-close',onClick:function(){setShowFeatures(false);}},'×')),
                React.createElement('div',{className:'modal-body'},
                    React.createElement('p',{style:{fontSize:11,color:'var(--t1)',marginBottom:14,lineHeight:1.5}},'Open-source architecture intelligence — analyze any GitHub repo or local folder directly in the browser. Zero backend, zero data collection.'),
                    React.createElement('div',{className:'features-grid'},
                        React.createElement('div',{className:'feature-card'},React.createElement('div',{className:'feature-icon'},'🏗️'),React.createElement('div',{className:'feature-title'},'Architecture Analysis'),React.createElement('div',{className:'feature-desc'},'Dependency graphs, call chains, layer detection, circular dependency finding, blast-radius calculation')),
                        React.createElement('div',{className:'feature-card'},React.createElement('div',{className:'feature-icon'},'🛡️'),React.createElement('div',{className:'feature-title'},'Security Scanning'),React.createElement('div',{className:'feature-desc'},'12+ vulnerability patterns, GitHub CodeQL / Dependabot / secret scanning alerts integration')),
                        React.createElement('div',{className:'feature-card'},React.createElement('div',{className:'feature-icon'},'📊'),React.createElement('div',{className:'feature-title'},'7 Visualizations'),React.createElement('div',{className:'feature-desc'},'Force graph, treemap, adjacency matrix, dendrogram, Sankey flow, disjoint clusters, edge bundling')),
                        React.createElement('div',{className:'feature-card'},React.createElement('div',{className:'feature-icon'},'🔍'),React.createElement('div',{className:'feature-title'},'Pattern Detection'),React.createElement('div',{className:'feature-desc'},'Design patterns & anti-patterns, code duplication, dead code, tech debt markers')),
                        React.createElement('div',{className:'feature-card'},React.createElement('div',{className:'feature-icon'},'👥'),React.createElement('div',{className:'feature-title'},'Team Health'),React.createElement('div',{className:'feature-desc'},'Bus factor analysis, churn hotspots, contributor concentration, community profile scoring')),
                        React.createElement('div',{className:'feature-card'},React.createElement('div',{className:'feature-icon'},'📤'),React.createElement('div',{className:'feature-title'},'Rich Export'),React.createElement('div',{className:'feature-desc'},'PDF with embedded graphs, SVG, JSON, Markdown, plain text — all generated client-side'))
                    ),
                    React.createElement('div',{style:{display:'flex',gap:8,marginTop:16,flexWrap:'wrap'}},
                        React.createElement('span',{className:'feature-badge'},'React + D3'),
                        React.createElement('span',{className:'feature-badge'},'GitHub API v3'),
                        React.createElement('span',{className:'feature-badge'},'Tree-sitter WASM'),
                        React.createElement('span',{className:'feature-badge'},'Zero Dependencies'),
                        React.createElement('span',{className:'feature-badge'},'100% Client-Side')
                    )
                ),
                React.createElement('div',{className:'modal-footer',style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
                    React.createElement('button',{className:'top-btn',onClick:function(){setShowFeatures(false);setShowPrivacy(true);},style:{fontSize:10}},'🔒 Privacy'),
                    React.createElement('button',{className:'top-btn primary',onClick:function(){setShowFeatures(false);}},'Got it!')
                )
            )
        ),
        showPrivacy&&React.createElement('div',{className:'modal-overlay',onClick:function(){setShowPrivacy(false);}},
            React.createElement('div',{className:'modal privacy-modal',onClick:function(e){e.stopPropagation();}},
                React.createElement('div',{className:'modal-header'},React.createElement('div',{className:'modal-title'},'🔒 Privacy & Security'),React.createElement('button',{className:'modal-close',onClick:function(){setShowPrivacy(false);}},'×')),
                React.createElement('div',{className:'modal-body'},
                    React.createElement('div',{className:'privacy-item'},
                        React.createElement('div',{className:'privacy-icon'},'🌐'),
                        React.createElement('div',null,React.createElement('div',{className:'privacy-title'},'100% Browser-Based'),React.createElement('div',{className:'privacy-text'},'CodeFlow runs entirely in your browser. No backend servers, no data collection.'))
                    ),
                    React.createElement('div',{className:'privacy-item'},
                        React.createElement('div',{className:'privacy-icon'},'🔑'),
                        React.createElement('div',null,React.createElement('div',{className:'privacy-title'},'Your Token Stays Local'),React.createElement('div',{className:'privacy-text'},'Your GitHub token is stored only in your browser\'s memory. It\'s never saved, logged, or transmitted anywhere except directly to GitHub\'s API.'))
                    ),
                    React.createElement('div',{className:'privacy-item'},
                        React.createElement('div',{className:'privacy-icon'},'📡'),
                        React.createElement('div',null,React.createElement('div',{className:'privacy-title'},'Direct API Calls'),React.createElement('div',{className:'privacy-text'},'All GitHub API calls go directly from your browser to api.github.com. We have no proxy, no middleware, no way to intercept your data.'))
                    ),
                    React.createElement('div',{className:'privacy-item'},
                        React.createElement('div',{className:'privacy-icon'},'🗑️'),
                        React.createElement('div',null,React.createElement('div',{className:'privacy-title'},'Nothing Persisted'),React.createElement('div',{className:'privacy-text'},'Close the tab and everything is gone. No cookies, no local storage, no tracking. Check the source code - it\'s all in one HTML file!'))
                    ),
                    React.createElement('div',{style:{marginTop:16,padding:12,background:'var(--accbg)',borderRadius:8,fontSize:10,color:'var(--t1)'}},
                        '💡 Tip: Create a ',React.createElement('a',{href:'https://github.com/settings/tokens',target:'_blank',rel:'noopener',style:{color:'var(--acc)'}},'Personal Access Token'),' with only "public_repo" scope for extra peace of mind when analyzing public repositories.'
                    )
                ),
                React.createElement('div',{className:'modal-footer'},
                    React.createElement('button',{className:'top-btn primary',onClick:function(){setShowPrivacy(false);}},'Got it!')
                )
            )
        ),
        showKeyModal&&React.createElement('div',{className:'modal-overlay',onClick:function(){setShowKeyModal(false);}},
            React.createElement('div',{className:'modal key-modal',onClick:function(e){e.stopPropagation();}},
                React.createElement('div',{className:'modal-header'},React.createElement('div',{className:'modal-title'},'🔐 GitHub App Private Key'),React.createElement('button',{className:'modal-close',onClick:function(){setShowKeyModal(false);}},'×')),
                React.createElement('div',{className:'modal-body'},
                    React.createElement('div',{className:'key-info'},
                        'Paste the private key from your GitHub App. This key is stored only in memory and never leaves your browser.',
                        React.createElement('br'),React.createElement('br'),
                        'To get a private key:',React.createElement('br'),
                        '1. Go to GitHub → Settings → Developer settings → GitHub Apps',React.createElement('br'),
                        '2. Select your app → Generate a private key',React.createElement('br'),
                        '3. Open the downloaded ',React.createElement('code',null,'.pem'),' file and paste its contents below'
                    ),
                    React.createElement('div',{className:'form-group'},
                        React.createElement('label',{className:'form-label'},'Private Key (PEM format)'),
                        React.createElement('textarea',{className:'form-input',placeholder:'-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----',value:privateKey,onChange:function(e){setPrivateKey(e.target.value);},rows:10})
                    )
                ),
                React.createElement('div',{className:'modal-footer'},
                    privateKey&&React.createElement('button',{className:'top-btn',onClick:function(){setPrivateKey('');},style:{marginRight:'auto'}},'Clear Key'),
                    React.createElement('button',{className:'top-btn',onClick:function(){setShowKeyModal(false);}},'Cancel'),
                    React.createElement('button',{className:'top-btn primary',onClick:function(){setShowKeyModal(false);}},'Save')
                )
            )
        ),
        showUnused&&data&&data.deadFunctions&&React.createElement('div',{className:'modal-overlay',onClick:function(){setShowUnused(false);}},
            React.createElement('div',{className:'modal',style:{maxWidth:650,maxHeight:'85vh'},onClick:function(e){e.stopPropagation();}},
                React.createElement('div',{className:'modal-header'},React.createElement('div',{className:'modal-title'},'⚠️ Unused Functions'),React.createElement('button',{className:'modal-close',onClick:function(){setShowUnused(false);}},'×')),
                React.createElement('div',{className:'modal-body',style:{maxHeight:'70vh',overflowY:'auto'}},
                    React.createElement('div',{className:'unused-summary'},
                        React.createElement('div',{className:'unused-summary-item'},
                            React.createElement('div',{className:'unused-summary-value'},data.deadFunctions.length),
                            React.createElement('div',{className:'unused-summary-label'},'Dead Functions')
                        ),
                        React.createElement('div',{className:'unused-summary-item'},
                            React.createElement('div',{className:'unused-summary-value'},data.deadFunctions.reduce(function(s,f){return s+f.codeLines;},0)),
                            React.createElement('div',{className:'unused-summary-label'},'Dead Lines')
                        ),
                        React.createElement('div',{className:'unused-summary-item'},
                            React.createElement('div',{className:'unused-summary-value'},[...new Set(data.deadFunctions.map(function(f){return f.file;}))].length),
                            React.createElement('div',{className:'unused-summary-label'},'Files Affected')
                        )
                    ),
                    React.createElement('div',{style:{fontSize:10,color:'var(--t3)',marginBottom:12,padding:'8px 12px',background:'var(--bg0)',borderRadius:6,borderLeft:'3px solid var(--orange)'}},'These functions have zero calls — neither from other files nor internally within their own file. They are likely dead code that can be safely removed.'),
                    data.deadFunctions.map(function(fn,i){
                        var isExpanded=expandedFns.has('dead-'+fn.name);
                        return React.createElement('div',{key:i,className:'unused-fn'},
                            React.createElement('div',{className:'unused-fn-header',onClick:function(){toggleFn('dead-'+fn.name);}},
                                React.createElement('div',null,
                                    React.createElement('span',{className:'unused-fn-name'},fn.name,'()'),
                                    React.createElement('div',{className:'unused-fn-path'},
                                        React.createElement('span',null,'📁 ',fn.folder||'root'),
                                        React.createElement('span',null,'→'),
                                        React.createElement('span',{className:'unused-fn-file',onClick:function(e){e.stopPropagation();selectFile(fn.file);setShowUnused(false);}},fn.file.split('/').pop())
                                    )
                                ),
                                React.createElement('div',{className:'unused-fn-meta'},
                                    React.createElement('button',{className:'view-file-btn',onClick:function(e){e.stopPropagation();openFilePreview(fn.file,fn.line);},title:'View source'},'👁️'),
                                    React.createElement('span',{className:'unused-fn-lines'},fn.codeLines,' lines'),
                                    fn.line&&React.createElement('span',{className:'unused-fn-loc'},'L',fn.line),
                                    React.createElement('span',{style:{fontSize:10,color:'var(--t3)'}},isExpanded?'▼':'▶')
                                )
                            ),
                            isExpanded&&fn.code&&React.createElement('div',{className:'unused-fn-preview'},
                                React.createElement('div',{className:'unused-fn-code'},fn.code)
                            )
                        );
                    })
                ),
                React.createElement('div',{className:'modal-footer',style:{display:'flex',gap:8}},
                    React.createElement('button',{className:'top-btn',onClick:function(){data.deadFunctions.forEach(function(fn){expandedFns.add('dead-'+fn.name);});setExpandedFns(new Set(expandedFns));}},'Expand All'),
                    React.createElement('button',{className:'top-btn',onClick:function(){setExpandedFns(new Set());}},'Collapse All'),
                    React.createElement('button',{className:'top-btn primary',onClick:function(){setShowUnused(false);}},'Close')
                )
            )
        ),
        toast&&React.createElement('div',{className:'toast '+(toast.type||'success'),'role':'alert'},toast.msg),
        filePreview&&React.createElement('div',{className:'file-preview-overlay',onClick:function(){setFilePreview(null);}},
            React.createElement('div',{className:'file-preview-modal',onClick:function(e){e.stopPropagation();}},
                React.createElement('div',{className:'file-preview-header'},
                    React.createElement('div',{className:'file-preview-title'},
                        React.createElement('span',{className:'file-preview-icon'},Parser.isCode(filePreview.filename)?(Parser.isVBA(filePreview.filename)?'📊':Parser.isHTML(filePreview.filename)?'🌐':Parser.isCSS(filePreview.filename)?'🎨':Parser.isJSON(filePreview.filename)?'📋':'📝'):null),
                        React.createElement('span',{className:'file-preview-name'},filePreview.filename),
                        React.createElement('span',{className:'file-preview-path'},filePreview.path)
                    ),
                    React.createElement('div',{className:'file-preview-actions'},
                        filePreview.line&&React.createElement('span',{className:'file-preview-line-badge'},'Line ',filePreview.line),
                        React.createElement('button',{className:'file-preview-close',onClick:function(){setFilePreview(null);}},'×')
                    )
                ),
                React.createElement('div',{className:'file-preview-content',ref:filePreviewRef},
                    filePreview.loading?React.createElement('div',{className:'file-preview-loading'},
                        React.createElement('div',{className:'spinner'}),
                        React.createElement('div',{className:'file-preview-loading-text'},'Loading file...')
                    ):filePreview.error?React.createElement('div',{className:'file-preview-error'},
                        React.createElement('div',{className:'file-preview-error-icon'},'⚠️'),
                        React.createElement('div',null,filePreview.error)
                    ):filePreview.content?React.createElement('pre',{className:'file-preview-code'},
                        highlightSyntax(filePreview.content,filePreview.filename).map(function(lineHtml,i){
                            var lineNum=i+1;
                            var isHighlighted=filePreview.line&&lineNum===filePreview.line;
                            return React.createElement('div',{key:i,className:'file-preview-line'+(isHighlighted?' highlighted':'')},
                                React.createElement('span',{className:'file-preview-linenum'},lineNum),
                                React.createElement('span',{className:'file-preview-text',dangerouslySetInnerHTML:{__html:lineHtml||' '}})
                            );
                        })
                    ):null
                )
            )
        ),
        error&&React.createElement('div',{style:{position:'fixed',bottom:20,right:20,background:'var(--red)',color:'white',padding:'12px 20px',borderRadius:8,zIndex:1000,maxWidth:350},'role':'alert'},[error,React.createElement('button',{'aria-label':'Dismiss error','onClick':function(){setError(null);},style:{marginLeft:12,background:'none',border:'none',color:'white',cursor:'pointer',fontSize:16}},'×')])
    );
}