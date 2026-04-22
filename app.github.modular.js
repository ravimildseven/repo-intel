var GitHub={
    token:null,
    appId:null,
    privateKey:null,
    installationToken:null,
    installationTokenExpiry:null,
    rateLimit:{remaining:60,limit:60,reset:0},
    
    // Generate JWT for GitHub App authentication
    generateJWT:function(){
        if(!this.appId||!this.privateKey)return null;
        try{
            var now=Math.floor(Date.now()/1000);
            var payload={
                iat:now-60,// Issued at (60 seconds in past to account for clock drift)
                exp:now+600,// Expires in 10 minutes (max allowed)
                iss:this.appId
            };
            var header={alg:'RS256',typ:'JWT'};
            var sHeader=JSON.stringify(header);
            var sPayload=JSON.stringify(payload);
            var jwt=KJUR.jws.JWS.sign('RS256',sHeader,sPayload,this.privateKey);
            return jwt;
        }catch(e){
            console.error('JWT generation failed:',e);
            return null;
        }
    },
    
    // Get installations for the GitHub App
    getInstallations:function(){
        var jwt=this.generateJWT();
        if(!jwt)return Promise.reject(new Error('Failed to generate JWT'));
        return fetch('https://api.github.com/app/installations',{
            headers:{
                'Accept':'application/vnd.github.v3+json',
                'Authorization':'Bearer '+jwt
            }
        }).then(function(r){
            if(!r.ok)throw new Error(r.status===401?'Invalid App credentials':'Error '+r.status);
            return r.json();
        });
    },
    
    // Get installation access token
    getInstallationToken:function(installationId){
        var self=this;
        var jwt=this.generateJWT();
        if(!jwt)return Promise.reject(new Error('Failed to generate JWT'));
        return fetch('https://api.github.com/app/installations/'+installationId+'/access_tokens',{
            method:'POST',
            headers:{
                'Accept':'application/vnd.github.v3+json',
                'Authorization':'Bearer '+jwt
            }
        }).then(function(r){
            if(!r.ok)throw new Error(r.status===401?'Invalid App credentials':r.status===404?'Installation not found':'Error '+r.status);
            return r.json();
        }).then(function(data){
            self.installationToken=data.token;
            self.installationTokenExpiry=new Date(data.expires_at).getTime();
            self.token=data.token;// Use installation token for API calls
            return data.token;
        });
    },
    
    // Authenticate with GitHub App for a specific repo
    authenticateApp:function(owner,repo){
        var self=this;
        // Check if we have a valid installation token
        if(this.installationToken&&this.installationTokenExpiry&&Date.now()<this.installationTokenExpiry-60000){
            this.token=this.installationToken;
            return Promise.resolve(this.installationToken);
        }
        // Get installations and find the one for this repo
        return this.getInstallations().then(function(installations){
            if(!installations||!installations.length){
                throw new Error('No installations found for this GitHub App');
            }
            // Try to find installation that has access to this repo
            // For simplicity, we'll use the first installation
            // In production, you'd want to match by account/owner
            var installation=installations.find(function(i){
                return i.account&&i.account.login&&i.account.login.toLowerCase()===owner.toLowerCase();
            })||installations[0];
            return self.getInstallationToken(installation.id);
        });
    },
    
    fetch:function(url){
        var self=this;
        var h={'Accept':'application/vnd.github.v3+json'};
        if(this.token)h['Authorization']='Bearer '+this.token;
        return fetch(url,{headers:h}).then(function(r){
            // Track rate limit from headers
            var rem=r.headers.get('x-ratelimit-remaining');
            var lim=r.headers.get('x-ratelimit-limit');
            var rst=r.headers.get('x-ratelimit-reset');
            if(rem!==null)self.rateLimit.remaining=parseInt(rem,10);
            if(lim!==null)self.rateLimit.limit=parseInt(lim,10);
            if(rst!==null)self.rateLimit.reset=parseInt(rst,10);
            if(!r.ok)throw new Error(r.status===401?'Invalid token':r.status===403?'Rate limited - add a GitHub token for 5000 req/hour':r.status===404?'Repository not found':r.status===429?'Rate limited (429) - add a GitHub token':'Error '+r.status);
            return r.json();
        });
    },
    getRateLimit:function(){
        var self=this;
        var h={'Accept':'application/vnd.github.v3+json'};
        if(this.token)h['Authorization']='Bearer '+this.token;
        return fetch('https://api.github.com/rate_limit',{headers:h}).then(function(r){return r.json();}).then(function(d){
            if(d.resources&&d.resources.core){
                self.rateLimit.remaining=d.resources.core.remaining;
                self.rateLimit.limit=d.resources.core.limit;
                self.rateLimit.reset=d.resources.core.reset;
            }
            return self.rateLimit;
        }).catch(function(){return self.rateLimit;});
    },
    getFile:function(o,r,p,ref){
        var url='https://api.github.com/repos/'+o+'/'+r+'/contents/'+p;
        if(ref)url+='?ref='+encodeURIComponent(ref);
        return this.fetch(url).then(function(d){return d.content?atob(d.content):null;}).catch(function(){return null;});
    },
    getCommits:function(o,r,path,limit,ref){
        if(this.rateLimit.remaining<20&&!this.token)return Promise.resolve([]);// Skip when rate limited
        var url='https://api.github.com/repos/'+o+'/'+r+'/commits?per_page='+(limit||30)+(path?'&path='+path:'')+(ref?'&sha='+encodeURIComponent(ref):'');
        return this.fetch(url).catch(function(){return[];});
    },
    getBlame:function(o,r,path,ref){
        return this.getCommits(o,r,path,50,ref).then(function(commits){
            var authors={};
            commits.forEach(function(c){var name=c.commit.author.name;authors[name]=(authors[name]||0)+1;});
            return Object.entries(authors).map(function(e){return{name:e[0],commits:e[1],percent:Math.round(e[1]/commits.length*100)};}).sort(function(a,b){return b.commits-a.commits;});
        }).catch(function(){return[];});
    },
    getPR:function(o,r,prNum){
        var self=this;
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/pulls/'+prNum).then(function(pr){
            return self.fetch('https://api.github.com/repos/'+o+'/'+r+'/pulls/'+prNum+'/files').then(function(files){
                pr.files=files;return pr;
            });
        }).catch(function(){return null;});
    },
    listBranches:function(o,r){
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/branches?per_page=100').then(function(b){
            return Array.isArray(b)?b.map(function(x){return x.name;}):[]; 
        }).catch(function(){return[];});
    },
    getCommunityProfile:function(o,r){
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/community/profile').catch(function(){return null;});
    },
    getContributors:function(o,r){
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/contributors?per_page=100').catch(function(){return[];});
    },
    getLanguages:function(o,r){
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/languages').catch(function(){return{};});
    },
    // P8: Security alert APIs — graceful fallback if PAT lacks required scopes
    getCodeScanningAlerts:function(o,r){
        if(!this.token)return Promise.resolve({alerts:[],available:false,reason:'No auth token'});
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/code-scanning/alerts?per_page=100&state=open').then(function(alerts){
            return{alerts:Array.isArray(alerts)?alerts:[],available:true};
        }).catch(function(e){
            return{alerts:[],available:false,reason:e&&e.message?e.message:'Requires security_events scope'};
        });
    },
    getDependabotAlerts:function(o,r){
        if(!this.token)return Promise.resolve({alerts:[],available:false,reason:'No auth token'});
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/dependabot/alerts?per_page=100&state=open').then(function(alerts){
            return{alerts:Array.isArray(alerts)?alerts:[],available:true};
        }).catch(function(e){
            return{alerts:[],available:false,reason:e&&e.message?e.message:'Requires security_events scope'};
        });
    },
    getSecretScanningAlerts:function(o,r){
        if(!this.token)return Promise.resolve({alerts:[],available:false,reason:'No auth token'});
        return this.fetch('https://api.github.com/repos/'+o+'/'+r+'/secret-scanning/alerts?per_page=100&state=open').then(function(alerts){
            return{alerts:Array.isArray(alerts)?alerts:[],available:true};
        }).catch(function(e){
            return{alerts:[],available:false,reason:e&&e.message?e.message:'Requires secret_scanning_alerts scope'};
        });
    },
    // Fast scan using Git Trees API (single request for all files!)
    scanTree:function(o,r,cb,compiledPatterns,ref){
        var self=this;
        if(cb)cb('Fetching repository tree...');
        var desiredBranch=(ref||'').trim();
        var repoPromise=desiredBranch?Promise.resolve({default_branch:desiredBranch}):this.fetch('https://api.github.com/repos/'+o+'/'+r);
        // First get repo info to find default branch unless a branch was selected.
        return repoPromise.then(function(repo){
            var branch=repo.default_branch||'main';
            if(cb)cb('Loading file tree ('+branch+')...');
            // Get full tree in one request with recursive flag
            return self.fetch('https://api.github.com/repos/'+o+'/'+r+'/git/trees/'+encodeURIComponent(branch)+'?recursive=1');
        }).then(function(tree){
            if(!tree.tree)throw new Error('Invalid tree response');
            var f=[];
            tree.tree.forEach(function(i){
                if(i.type!=='blob')return;
                var name=i.path.includes('/')?i.path.substring(i.path.lastIndexOf('/')+1):i.path;
                if(shouldExcludeFile(i.path,name,compiledPatterns))return;
                var pathParts=i.path.split('/');
                var ignored=pathParts.slice(0,-1).some(function(part,idx){
                    var dirPath=pathParts.slice(0,idx+1).join('/');
                    return shouldIgnoreDirectory(dirPath,part,compiledPatterns);
                });
                if(ignored)return;
                var folder=i.path.includes('/')?i.path.substring(0,i.path.lastIndexOf('/')):'root';
                f.push({path:i.path,name:name,folder:folder,size:i.size||0,isCode:Parser.isCode(name)});
            });
            if(cb)cb('Found '+f.length+' files');
            return f;
        });
    },
    // Fallback: recursive scan using Contents API (many requests)
    scanRecursive:function(o,r,cb,p,d,compiledPatterns,ref){
        var self=this;p=p||'';d=d||0;
        if(d>10)return Promise.resolve([]);
        var url='https://api.github.com/repos/'+o+'/'+r+'/contents/'+p+(ref?'?ref='+encodeURIComponent(ref):'');
        return this.fetch(url).then(function(c){
            var f=[];
            var promises=[];
            c.forEach(function(i){
                if(i.type==='file'&&!shouldExcludeFile(i.path,i.name,compiledPatterns)){
                    f.push({path:i.path,name:i.name,folder:i.path.includes('/')?i.path.substring(0,i.path.lastIndexOf('/')):'root',size:i.size,isCode:Parser.isCode(i.name)});
                }else if(i.type==='dir'&&!shouldIgnoreDirectory(i.path,i.name,compiledPatterns)){
                    if(cb)cb('/'+i.path);
                    promises.push(self.scanRecursive(o,r,cb,i.path,d+1,compiledPatterns,ref).catch(function(){return[];}));
                }
            });
            return Promise.all(promises).then(function(results){
                results.forEach(function(res){f=f.concat(res);});
                return f;
            });
        }).catch(function(e){if(d===0)throw e;return[];});
    },
    // Smart scan: try tree API first (1 request), fallback to recursive
    scan:function(o,r,cb,compiledPatterns,ref){
        var self=this;
        return this.scanTree(o,r,cb,compiledPatterns,ref).catch(function(e){
            if(cb)cb('Tree API failed, using fallback...');
            return self.scanRecursive(o,r,cb,'',0,compiledPatterns,ref);
        });
    }
};