(self.webpackChunkciview2=self.webpackChunkciview2||[]).push([[746],{2806:(t,i,s)=>{"use strict";s.r(i),s.d(i,{acceptTiffCache:()=>d,default:()=>m});var e=s(5579),a=s(4677),n=s(5923),o=s(5451);function l(t){const i=Array.isArray(t)?t[0]:t,{shape:s,labels:e}=i,a=function(t){const{x:i,y:s,z:e}=t?.meta?.physicalSizes??{};if(i?.size&&s?.size&&e?.size){const t=Math.min(e.size,i.size,s.size),a=[i.size/t,s.size/t,e.size/t];return(new o.Z).scale(a)}return(new o.Z).identity()}(i);return[[0,a[0]*s[e.indexOf("x")]],[0,a[5]*s[e.indexOf("y")]],[0,a[10]*s[e.indexOf("z")]]]}var h=s(8569),r=s(8503);const c=new Map;function d(t){console.log("accepting tiff cache"),t.forEach(((t,i)=>{c.set(i,t)}))}const m=class{constructor(t,i,s){console.log("new VivViewer",i),this.canvas=t,this.height=this.canvas.height,this.width=this.canvas.width,this.config=i,this.hasRequestedDefaultChannelStats=!1,this.initClip(),function(t){if(c.has(t))return c.get(t);const i=(0,e.$L)(t);return c.set(t,i),i}(i.url).then((t=>{this.tiff=t,this._setUp(t,s)}))}setSize(t,i,s){this.height=i,this.width=t;const e=this.getViewState(s.x_scale,s.y_scale,s.offset);this.canvas.width=t,this.canvas.height=i,this.canvas.style.width=t,this.canvas.style.height=i,this.deck.setProps({height:i,width:t,viewState:e})}setPanZoom(t,i,s){const e=this.getViewState(i,s,t);this.deck.setProps({viewState:e})}getViewState(t,i,s){if(this.config.use3d)return;const a=Math.log2(i),n=Math.log2(t);let o=1/t*this.native_x/2;o-=s[0];let l=1/i*this.native_y/2;return l+=this.native_y-s[1],{height:this.native_y,width:this.native_x,id:e.ys,target:[o,l,0],zoom:[n,a]}}setChannel(t){const i=this.mainVivLayer.props,s=i.selections.findIndex((i=>i.id===t.id));i.colors[s]=(0,a.$W)(t.color),i.contrastLimits[s]=t.contrastLimits,i.channelsVisible[s]=t.channelsVisible,t.domains&&(i.domains[s]=t.domains),this.layers=[...this.layers],this.deck.setProps({layers:this.layers})}removeChannel(t){const i=this.mainVivLayer.props,s=i.selections.findIndex((i=>i.id===t.id));i.colors.splice(s,1),i.selections.splice(s,1),i.contrastLimits.splice(s,1),i.channelsVisible.splice(s,1),this.createLayers(i),this.deck.setProps({layers:[this.layers]})}addChannel(t){const i=this.mainVivLayer.props;return i.channelsVisible.push(!0),t.color=t.color||"#ff00ff",t.contrastLimits=[0,200],t.domains=[0,200],t.channelsVisible=!0,i.colors.push((0,a.$W)(t.color)),i.contrastLimits.push(t.contrastLimits),i.domains.push(t.domains),t.id=(0,r.zO)(),i.selections.push({z:0,t:0,c:t.index,id:t.id}),this.createLayers(i),this.deck.setProps({layers:[this.layers]}),t.name=this.channels[t.index].Name,t._id=i.selections[i.selections.length-1]._id,t}getAllChannels(){return this.channels}getChannels(){const{props:t}=this.mainVivLayer,i=t.selections.map((t=>this.channels[t.c].Name)),s=t.colors.map(a.fc);return i.map(((i,e)=>({name:i,index:t.selections[e].c,id:t.selections[e].id,color:s[e],contrastLimits:t.contrastLimits[e].slice(0),channelsVisible:t.channelsVisible[e],domains:t.domains[e]})))}recenterCamera(){if(!this.config.use3d)return;console.log("recenter");const{SizeX:t,SizeY:i,SizeZ:s}=this.tiff.metadata.Pixels,e={target:[t/2,i/2,s/2],zoom:1,rotationX:0,rotationOrbit:0+.01*Math.random()};this.volViewState=e,this.deck.setProps({initialViewState:e})}_createLayers3D(){const t=this.tiff,{SizeX:i,SizeY:s,SizeZ:a,Channels:n}=t.metadata.Pixels,o="3d_"+e.ys,l=t.data,r=n.length,c=t.data[0].dtype,{domains:d,contrastLimits:m,selections:p,colors:f,channelsVisible:u}=this.newVivProps??(this.mainVivLayer?this.mainVivLayer.props:function(t){const i=new Array(t).fill([0,1e3]),s=i,e=new Array(t).fill().map(((t,i)=>({c:i,t:0,z:0,_id:i}))),a=function(t){return 1==t?[[255,255,255]]:new Array(t).fill([0,0,0]).map(((i,s)=>{const e=s/t;return[Math.floor(255*e),Math.floor(255*(1-e)),0]}))}(t);return{domains:i,contrastLimits:s,selections:e,colors:a,channelsVisible:new Array(t).fill(!0)}}(r));this.newVivProps=null,this.hasRequestedDefaultChannelStats||(this.hasRequestedDefaultChannelStats=!0,this.defaultDomains=d,this.defaultContrastLimits=m.slice(0),async function(t,i=[{c:0,t:0}]){const s=await Promise.all(i.map((i=>async function(t,i={c:0,t:0}){const s=t[t.length-1],{shape:a,labels:n}=s,o=a[n.indexOf("z")]>>t.length-1,l=await s.getRaster({selection:{...i,z:0}}),h=await s.getRaster({selection:{...i,z:Math.floor(o/2)}}),r=await s.getRaster({selection:{...i,z:Math.max(0,o-1)}}),c=(0,e.mx)(l.data),d=(0,e.mx)(h.data),m=(0,e.mx)(r.data);return{domain:[Math.min(c.domain[0],d.domain[0],m.domain[0]),Math.max(c.domain[1],d.domain[1],m.domain[1])],contrastLimits:[Math.min(c.contrastLimits[0],d.contrastLimits[0],m.contrastLimits[0]),Math.max(c.contrastLimits[1],d.contrastLimits[1],m.contrastLimits[1])]}}(t,i))));return{domains:s.map((t=>t.contrastLimits)),contrastLimits:s.map((t=>t.contrastLimits))}}(l,p).then((t=>{this.defaultDomains=t.domains,this.defaultContrastLimits=t.contrastLimits.slice(0),this.newVivProps={...this.mainVivLayer.props,...t},this._updateProps()})));const y=this.getXSlice(),w=this.getYSlice(),g=this.getZSlice(),v={id:o,loader:l,dtype:c,resolution:l.length-1,channelsVisible:u,contrastLimits:m,domains:d,selections:p,colors:f,xSlice:y,ySlice:w,zSlice:g},L=this.detailView.getLayers({props:v,viewStates:[this.volViewState]});this.layers=L,this.mainVivLayer=L[0],this.config.scatterData&&L.push(new h.Z({data:this.config.scatterData,radiusScale:1,billboard:!0,getFillColor:this.config.getScatterFillColor}))}initClip(){this.clipX=[0,1],this.clipY=[0,1],this.clipZ=[0,1]}setClipX(t,i){this.clipX=[t,i],this._updateProps()}setClipY(t,i){this.clipY=[t,i],this._updateProps()}setClipZ(t,i){this.clipZ=[t,i],this._updateProps()}getXSlice(){const{SizeX:t}=this.tiff.metadata.Pixels,[i,s]=this.clipX,e=l(this.loader)[0][1];return[i*e,s*e]}getYSlice(){const{SizeY:t}=this.tiff.metadata.Pixels,[i,s]=this.clipY,e=l(this.loader)[1][1];return[i*e,s*e]}getZSlice(){const{SizeZ:t}=this.tiff.metadata.Pixels,[i,s]=this.clipZ,e=l(this.loader)[2][1];return[i*e,s*e]}_updateProps(){this.createLayers(),this.deck.setProps({layers:this.layers})}_setUp(t,i){this.native_x=t.metadata.Pixels.SizeX,this.native_y=t.metadata.Pixels.SizeY;const{use3d:s}=this.config;this.extensions=[new e.Gl],this.channels=t.metadata.Pixels.Channels,this.loader=t.data,this.transparentColor=[255,255,255,0];const a=this.getViewState(i.x_scale,i.y_scale,i.offset);if(s){const{SizeX:i,SizeY:s,SizeZ:a}=t.metadata.Pixels,n=[i/2,s/2,a/2];this.volViewState={zoom:1,target:n},this.detailView=new e.Cw({id:e.ys,useFixedAxis:!1,target:n,extensions:[new e.lC.AdditiveBlendExtension]})}else this.detailView=new e.O6({id:e.ys,height:this.native_y,width:this.native_x});const o=this.volViewState,{image_properties:l}=this.config,h=this.detailView.getDeckGlView();if(l?.selections)for(let t of l.selections)t.id=(0,r.zO)();this.createLayers(l),this.deck=new n.Z({canvas:this.canvas,layers:[this.layers],views:[h],viewState:a,width:this.width,height:this.height,useDevicePixels:!1,initialViewState:o,controller:s})}createLayers(t){if(this.config.use3d)return void this._createLayers3D();const i={id:e.ys},s=t.contrastLimits.map((t=>[0,200])),a={loader:this.loader,contrastLimits:t.contrastLimits.slice(0),domains:s,colors:t.colors.slice(0),channelsVisible:t.channelsVisible.slice(0),selections:t.selections.slice(0),extensions:this.extensions,transparentColor:this.transparentColor};this.defaultDomains||(this.defaultDomains=a.contrastLimits),this.defaultContrastLimits||(this.defaultContrastLimits=this.defaultDomains.slice(0)),this.layers=this.detailView.getLayers({viewStates:i,props:a}),this.mainVivLayer=this.layers[0]}}},479:()=>{},2249:()=>{},3752:()=>{},3640:()=>{},2630:()=>{},4351:()=>{}}]);