(()=>{function t(t,e){let n=t.length-1;n=0===n?1:n;let r=t.reduce(((t,n)=>t+Math.pow(n-e,2)),0);return Math.sqrt(r/n)}onmessage=function(e){const n=e.data[3],r=new("multitext"==n.datatype?Uint16Array:Uint8Array)(e.data[2]),a=new Uint8Array(e.data[0]),o=new Uint8Array(e.data[1]);let l=null;l="sankey"===n.method?function(t,e,n,r,a){const o=a.values.length,l=a.values2.length,s=n.length,i=new Array(o),u=a.values.map(((t,e)=>"A"+e)),c=a.values2.map(((t,e)=>"B"+e));for(let t=0;t<o;t++)i[t]=new Array(l).fill(0);const f=[];let h=0;for(let a=0;a<s;a++)0!==e[a]&&e[a]!==t[a]||(i[n[a]][r[a]]++,h++);const d=new Set,m=new Set,g=Math.round(h/300);for(let t=0;t<o;t++)for(let e=0;e<l;e++){const n=i[t][e];0!==n&&(d.add(u[t]),m.add(c[e]),f.push({source:u[t],target:c[e],value:n<g?g:n,trueValue:n}))}const p=Math.min(d.size,m.size),y=Array.from(d).map((t=>({id:t,ind:t.substring(1),param:0}))),v=Array.from(m).map((t=>({id:t,ind:t.substring(1),param:1})));return{links:f,nodes:y.concat(v),minNodes:p}}(a,o,r,new Uint8Array(e.data[4]),n):"venn"===n.method?function(t,e,n,r){const a=performance.now(),o=n.length/r.stringLength,l=new Map,s=r.stringLength;for(let r=0;r<o;r++){if(0!==e[r]&&e[r]!==t[r])continue;const a=r*s;let o=n.slice(a,a+s).toString();const i=l.get(o);i?l.set(o,i+1):l.set(o,1)}const i=[];for(const[t,e]of l.entries(l)){const n=t.split(",").map((t=>r.values[t])).filter((t=>void 0!==t));i.push({sets:n,size:e})}return console.log("calc ven : "+(performance.now()-a)),i}(a,o,r,n):"proportion"===n.method?function(e,n,r,a,o){const l=o.values.length,s=o.values2.length,i=o.cats?new Uint8Array(o.cats):null,u=r.length,c=new Array(l),f=o.diviser?o.diviser:new Array(l);for(let t=0;t<l;t++)c[t]=new Array(s).fill(0),f[t]=new Array(s).fill(0);const h=o.category;for(let t=0;t<u;t++)if(f[r[t]][a[t]]++,0===n[t]){if(i&&i[t]!==h)continue;c[r[t]][a[t]]++}let d=0,m=1e7;for(let e=0;e<f.length;e++){const n=f[e],r=c[e],a=[],l=[];let s=0,i=0,u=1e7;for(let t=0;t<n.length;t++){if(0===n[t])continue;const c=o.denominators?r[t]/o.denominators[t]:r[t]/n[t]*100;a.push([c,e,t,Math.floor(6*Math.random())]),l.push(c),s+=c,i=Math.max(i,c),u=Math.min(u,c)}a.av=s/a.length,a.std=t(l,a.av),a.max=i,a.min=u,c[e]=a,d=Math.max(d,i),m=Math.min(m,u)}return c.max=d,c.min=m,c}(0,o,r,new Uint8Array(e.data[4]),n):"stacked"===n.method?function(t,e,n,r,a){const o=n.length,l=Array.from(a.values,((t,e)=>({id:e,values:Array.from(a.values2,((t,e)=>({id:e,count:0}))),total:0})));for(let a=0;a<o;a++)0!==e[a]&&e[a]!==t[a]||(l[n[a]].values[r[a]].count++,l[n[a]].total++);for(let t of l){let e=0,n=0;for(let r of t.values){const a=0===t.total?0:r.count/t.total;r.pos=e,r.per=a,r.perpos=n,e+=r.count,n+=a}}return l}(a,o,r,new Uint8Array(e.data[4]),n):function(t,e,n,r){const a="multitext"===r.datatype?n.length/r.stringLength:n.length,o=new Array(r.values.length).fill(0);if("multitext"===r.datatype){const l=r.stringLength;for(let r=0;r<a;r++){if(0!==e[r]&&e[r]!==t[r])continue;const a=r*l;for(let t=a;t<a+l&&65535!==n[t];t++)o[n[t]]++}}else for(let r=0;r<a;r++)0!==e[r]&&e[r]!==t[r]||o[n[r]]++;return o}(a,o,r,n),postMessage(l)}})();