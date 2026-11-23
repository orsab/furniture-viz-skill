(()=>{var Fs=["width","height","depth"];function Mi(i,e){return i.map((t,n)=>{if(typeof t=="number")return t;let s=t.indexOf("%");return Number(t.slice(0,s))*e[Fs[n]]/100+Number(t.slice(s+1))})}function fh(i){return{dimensions:Object.fromEntries(Fs.map(e=>[e,i.dimensions[e].value])),finishes:Object.fromEntries(i.slots.map(e=>[e.id,{index:0,tint:null}])),options:Object.fromEntries(i.options.map(e=>[e.id,e.choices[0]])),joints:Object.fromEntries(i.joints.map(e=>[e.id,0])),switches:Object.fromEntries((i.switches??[]).map(e=>[e.id,!!e.defaultOn])),inscription:"",showDimensions:!1,person:{visible:!1,height:1700,build:"regular",pose:"standing",side:"right",yaw:-12,skin:"#b98464",top:"#477065",bottom:"#39454c"}}}function Nd(i,e){let t=l=>{throw new Error(`Invalid configuration: ${l}`)},n=(l,c,h)=>{(!l||typeof l!="object"||Array.isArray(l)||Object.keys(l).length!==c.length||!c.every(u=>Object.hasOwn(l,u)))&&t(h)},s=(l,c,h,u=!1)=>Number.isFinite(l)&&(!u||Number.isInteger(l))&&l>=c&&l<=h,r=l=>typeof l=="string"&&/^#[0-9a-f]{6}$/i.test(l)&&l.length===7,o=i.switches??[];n(e,["dimensions","finishes","options","joints","switches","inscription","showDimensions","person"],"fields"),n(e.dimensions,Fs,"dimensions");for(let l of Fs)s(e.dimensions[l],i.dimensions[l].min,i.dimensions[l].max,!0)||t(l);n(e.finishes,i.slots.map(l=>l.id),"finishes");for(let l of i.slots){let c=e.finishes[l.id];n(c,["index","tint"],l.id),(!s(c.index,0,l.finishes.length-1,!0)||c.tint!==null&&!r(c.tint))&&t(l.label)}n(e.options,i.options.map(l=>l.id),"options");for(let l of i.options)l.choices.includes(e.options[l.id])||t(l.label);n(e.joints,i.joints.map(l=>l.id),"joints");for(let l of i.joints)s(e.joints[l.id],0,1)||t(l.label);n(e.switches,o.map(l=>l.id),"switches");for(let l of o)typeof e.switches[l.id]!="boolean"&&t(l.label);typeof e.showDimensions!="boolean"&&t("dimension overlay"),(typeof e.inscription!="string"||e.inscription.length>32||!i.inscription&&e.inscription)&&t("inscription");let a=e.person;return n(a,["visible","height","build","pose","side","yaw","skin","top","bottom"],"person"),(typeof a.visible!="boolean"||!s(a.height,900,2200,!0)||!s(a.yaw,-180,180,!0)||!["slim","regular","broad"].includes(a.build)||!["standing","seated"].includes(a.pose)||!["left","right"].includes(a.side)||![a.skin,a.top,a.bottom].every(r))&&t("person"),e}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var ws={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},xi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wf=0,Jh=1,Tf=2;var Jo=1,Vl=2,Xr=3,Yn=0,wn=1,ii=2,yn=0,Yr=1,Qh=2,eu=3,tu=4,Wl=5;var si=100,Af=101,Ef=102,Rf=103,Cf=104,js=200,Pf=201,If=202,Lf=203,nu=204,iu=205,Qo=206,Df=207,ea=208,Nf=209,Uf=210,Of=211,Ff=212,Bf=213,kf=214,bl=0,Sl=1,Ml=2,Er=3,wl=4,Tl=5,Al=6,El=7,su=0,zf=1,Hf=2,Ii=0,ta=1,na=2,ia=3,sa=4,ra=5,Js=6,oa=7,kh="attached",Gf="detached",ru=300,Qs=301,qr=302,Xl=303,Yl=304,cn=1e3,Qn=1001,Rr=1002,Wt=1003,ql=1004;var er=1005;var hn=1006,Zr=1007;var ri=1008;var Pn=1009,ou=1010,au=1011,$r=1012,Zl=1013,_i=1014,qn=1015,In=1016,$l=1017,Kl=1018,as=1020,lu=35902,cu=35899,hu=1021,uu=1022,zn=1023,Ji=1026,yi=1027,jl=1028,Jl=1029,Ts=1030,Ql=1031;var ec=1033,aa=33776,la=33777,ca=33778,ha=33779,tc=35840,nc=35841,ic=35842,sc=35843,rc=36196,oc=37492,ac=37496,lc=37488,cc=37489,ua=37490,hc=37491,uc=37808,dc=37809,fc=37810,pc=37811,mc=37812,gc=37813,xc=37814,_c=37815,yc=37816,vc=37817,bc=37818,Sc=37819,Mc=37820,wc=37821,Tc=36492,Ac=36494,Ec=36495,Rc=36283,Cc=36284,da=36285,Pc=36286;var Vs=2300,Ws=2301,yl=2302,zh=2303,Hh=2400,Gh=2401,Vh=2402,Vf=2500;var du=0,fa=1,Kr=2,Wf=3200;var pa=0,Xf=1,On="",Nt="srgb",Un="srgb-linear",To="linear",Pt="srgb";var vl=7680;var Yf=519,qf=512,Zf=513,$f=514,fu=515,Kf=516,jf=517,pu=518,mu=519,gu=35044;var xu="300 es",ei=2e3,Cr=2001;function Dm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Jf(){let i=Pr("canvas");return i.style.display="block",i}var Ud={},Ir=null;function Ao(...i){let e="THREE."+i.shift();Ir?Ir("log",e,...i):console.log(e,...i)}function Qf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function et(...i){i=Qf(i);let e="THREE."+i.shift();if(Ir)Ir("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function lt(...i){i=Qf(i);let e="THREE."+i.shift();if(Ir)Ir("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Gs(...i){let e=i.join(" ");e in Ud||(Ud[e]=!0,et(...i))}function ep(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var tp={[bl]:bl,[Ml]:Al,[wl]:wl,[Er]:Tl,[Sl]:Sl,[Al]:Ml,[El]:El,[Tl]:Er},fi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Od=1234567,Tr=Math.PI/180,Xs=180/Math.PI;function Li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(An[i&255]+An[i>>8&255]+An[i>>16&255]+An[i>>24&255]+"-"+An[e&255]+An[e>>8&255]+"-"+An[e>>16&15|64]+An[e>>24&255]+"-"+An[t&63|128]+An[t>>8&255]+"-"+An[t>>16&255]+An[t>>24&255]+An[n&255]+An[n>>8&255]+An[n>>16&255]+An[n>>24&255]).toLowerCase()}function Mt(i,e,t){return Math.max(e,Math.min(t,i))}function _u(i,e){return(i%e+e)%e}function Um(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Om(i,e,t){return i!==e?(t-i)/(e-i):0}function wo(i,e,t){return(1-t)*i+t*e}function Fm(i,e,t,n){return wo(i,e,1-Math.exp(-t*n))}function Bm(i,e=1){return e-Math.abs(_u(i,e*2)-e)}function km(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function zm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Hm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Gm(i,e){return i+Math.random()*(e-i)}function Vm(i){return i*(.5-Math.random())}function Wm(i){i!==void 0&&(Od=i);let e=Od+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xm(i){return i*Tr}function Ym(i){return i*Xs}function qm(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Zm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $m(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*d,a*h,a*c);break;default:et("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ic(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function vu(i,e){if(e.constructor===Float32Array)return i;let t=Ic(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function bu(i,e){if(e.constructor===Float32Array)return i;let t=Ic(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var vn={DEG2RAD:Tr,RAD2DEG:Xs,generateUUID:Li,clamp:Mt,euclideanModulo:_u,mapLinear:Um,inverseLerp:Om,lerp:wo,damp:Fm,pingpong:Bm,smoothstep:km,smootherstep:zm,randInt:Hm,randFloat:Gm,randFloatSpread:Vm,seededRandom:Wm,degToRad:Xm,radToDeg:Ym,isPowerOfTwo:qm,ceilPowerOfTwo:Zm,floorPowerOfTwo:yu,setQuaternionFromProperEuler:$m,normalize:bu,denormalize:vu},Ke=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Rn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],m=r[o+2],_=r[o+3];if(u!==_||l!==f||c!==d||h!==m){let p=l*f+c*d+h*m+u*_;p<0&&(f=-f,d=-d,m=-m,_=-_,p=-p);let x=1-a;if(p<.9995){let y=Math.acos(p),M=Math.sin(y);x=Math.sin(x*y)/M,a=Math.sin(a*y)/M,l=l*x+f*a,c=c*x+d*a,h=h*x+m*a,u=u*x+_*a}else{l=l*x+f*a,c=c*x+d*a,h=h*x+m*a,u=u*x+_*a;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*d-c*f,e[t+1]=l*m+h*f+c*u-a*d,e[t+2]=c*m+h*d+a*f-l*u,e[t+3]=h*m-a*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:et("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ph.copy(this).projectOnVector(e),this.sub(ph)}reflect(e){return this.sub(ph.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ph=new Y,Fd=new Rn,pt=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],_=s[0],p=s[3],x=s[6],y=s[1],M=s[4],v=s[7],w=s[2],S=s[5],g=s[8];return r[0]=o*_+a*y+l*w,r[3]=o*p+a*M+l*S,r[6]=o*x+a*v+l*g,r[1]=c*_+h*y+u*w,r[4]=c*p+h*M+u*S,r[7]=c*x+h*v+u*g,r[2]=f*_+d*y+m*w,r[5]=f*p+d*M+m*S,r[8]=f*x+d*v+m*g,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,m=t*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Gs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(mh.makeScale(e,t)),this}rotate(e){return Gs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(mh.makeRotation(-e)),this}translate(e,t){return Gs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(mh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},mh=new pt,Bd=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kd=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Km(){let i={enabled:!0,workingColorSpace:Un,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Pt&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Pt&&(s.r=Ar(s.r),s.g=Ar(s.g),s.b=Ar(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===On?To:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Un]:{primaries:e,whitePoint:n,transfer:To,toXYZ:Bd,fromXYZ:kd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:Pt,toXYZ:Bd,fromXYZ:kd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}var _t=Km();function ji(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ur,Rl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ur===void 0&&(ur=Pr("canvas")),ur.width=e.width,ur.height=e.height;let s=ur.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ur}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Pr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ji(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ji(t[n]/255)*255):t[n]=ji(t[n]);return{data:t,width:e.width,height:e.height}}else return et("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},jm=0,Lr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(gh(s[o].image)):r.push(gh(s[o]))}else r=gh(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function gh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(et("Texture: Unable to serialize Texture."),{})}var Jm=0,xh=new Y,un=class i extends fi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Qn,s=Qn,r=hn,o=ri,a=zn,l=Pn,c=i.DEFAULT_ANISOTROPY,h=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=Li(),this.name="",this.source=new Lr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(xh).x}get height(){return this.source.getSize(xh).y}get depth(){return this.source.getSize(xh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){et(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){et(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ru)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cn:e.x=e.x-Math.floor(e.x);break;case Qn:e.x=e.x<0?0:1;break;case Rr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cn:e.y=e.y-Math.floor(e.y);break;case Qn:e.y=e.y<0?0:1;break;case Rr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=ru;un.DEFAULT_ANISOTROPY=1;var Ot=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],_=l[2],p=l[6],x=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+d+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,v=(d+1)/2,w=(x+1)/2,S=(h+f)/4,g=(u+_)/4,b=(m+p)/4;return M>v&&M>w?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=S/n,r=g/n):v>w?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=S/s,r=b/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=g/r,s=b/r),this.set(n,s,r,t),this}let y=Math.sqrt((p-m)*(p-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(p-m)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+x-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this.w=Mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this.w=Mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Cl=class extends fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ot(0,0,e,t),this.scissorTest=!1,this.viewport=new Ot(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new un({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Lr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},_n=class extends Cl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Eo=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Pl=class extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var rt=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,l,c,h,u,f,d,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,f,d,m,_,p)}set(e,t,n,s,r,o,a,l,c,h,u,f,d,m,_,p){let x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=s,x[1]=r,x[5]=o,x[9]=a,x[13]=l,x[2]=c,x[6]=h,x[10]=u,x[14]=f,x[3]=d,x[7]=m,x[11]=_,x[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/dr.setFromMatrixColumn(e,0).length(),r=1/dr.setFromMatrixColumn(e,1).length(),o=1/dr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,m=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+m*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=m+d*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*h,d=l*u,m=c*h,_=c*u;t[0]=f+_*a,t[4]=m*a-d,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-m,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*h,d=l*u,m=c*h,_=c*u;t[0]=f-_*a,t[4]=-o*u,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*h,d=o*u,m=a*h,_=a*u;t[0]=l*h,t[4]=m*c-d,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=d*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,d=o*c,m=a*l,_=a*c;t[0]=l*h,t[4]=_-f*u,t[8]=m*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*u+m,t[10]=f-_*u}else if(e.order==="XZY"){let f=o*l,d=o*c,m=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+_,t[5]=o*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qm,e,eg)}lookAt(e,t,n){let s=this.elements;return Gn.subVectors(e,t),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),ps.crossVectors(n,Gn),ps.lengthSq()===0&&(Math.abs(n.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),ps.crossVectors(n,Gn)),ps.normalize(),Xa.crossVectors(Gn,ps),s[0]=ps.x,s[4]=Xa.x,s[8]=Gn.x,s[1]=ps.y,s[5]=Xa.y,s[9]=Gn.y,s[2]=ps.z,s[6]=Xa.z,s[10]=Gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],_=n[6],p=n[10],x=n[14],y=n[3],M=n[7],v=n[11],w=n[15],S=s[0],g=s[4],b=s[8],L=s[12],I=s[1],P=s[5],T=s[9],D=s[13],A=s[2],N=s[6],z=s[10],O=s[14],$=s[3],B=s[7],V=s[11],J=s[15];return r[0]=o*S+a*I+l*A+c*$,r[4]=o*g+a*P+l*N+c*B,r[8]=o*b+a*T+l*z+c*V,r[12]=o*L+a*D+l*O+c*J,r[1]=h*S+u*I+f*A+d*$,r[5]=h*g+u*P+f*N+d*B,r[9]=h*b+u*T+f*z+d*V,r[13]=h*L+u*D+f*O+d*J,r[2]=m*S+_*I+p*A+x*$,r[6]=m*g+_*P+p*N+x*B,r[10]=m*b+_*T+p*z+x*V,r[14]=m*L+_*D+p*O+x*J,r[3]=y*S+M*I+v*A+w*$,r[7]=y*g+M*P+v*N+w*B,r[11]=y*b+M*T+v*z+w*V,r[15]=y*L+M*D+v*O+w*J,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],_=e[7],p=e[11],x=e[15],y=l*d-c*f,M=a*d-c*u,v=a*f-l*u,w=o*d-c*h,S=o*f-l*h,g=o*u-a*h;return t*(_*y-p*M+x*v)-n*(m*y-p*w+x*S)+s*(m*M-_*w+x*g)-r*(m*v-_*S+p*g)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],_=e[13],p=e[14],x=e[15],y=t*a-n*o,M=t*l-s*o,v=t*c-r*o,w=n*l-s*a,S=n*c-r*a,g=s*c-r*l,b=h*_-u*m,L=h*p-f*m,I=h*x-d*m,P=u*p-f*_,T=u*x-d*_,D=f*x-d*p,A=y*D-M*T+v*P+w*I-S*L+g*b;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/A;return e[0]=(a*D-l*T+c*P)*N,e[1]=(s*T-n*D-r*P)*N,e[2]=(_*g-p*S+x*w)*N,e[3]=(f*S-u*g-d*w)*N,e[4]=(l*I-o*D-c*L)*N,e[5]=(t*D-s*I+r*L)*N,e[6]=(p*v-m*g-x*M)*N,e[7]=(h*g-f*v+d*M)*N,e[8]=(o*T-a*I+c*b)*N,e[9]=(n*I-t*T-r*b)*N,e[10]=(m*S-_*v+x*y)*N,e[11]=(u*v-h*S-d*y)*N,e[12]=(a*L-o*P-l*b)*N,e[13]=(t*P-n*L+s*b)*N,e[14]=(_*M-m*w-p*y)*N,e[15]=(h*w-u*M+f*y)*N,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,m=r*u,_=o*h,p=o*u,x=a*u,y=l*c,M=l*h,v=l*u,w=n.x,S=n.y,g=n.z;return s[0]=(1-(_+x))*w,s[1]=(d+v)*w,s[2]=(m-M)*w,s[3]=0,s[4]=(d-v)*S,s[5]=(1-(f+x))*S,s[6]=(p+y)*S,s[7]=0,s[8]=(m+M)*g,s[9]=(p-y)*g,s[10]=(1-(f+_))*g,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=dr.set(s[0],s[1],s[2]).length(),a=dr.set(s[4],s[5],s[6]).length(),l=dr.set(s[8],s[9],s[10]).length();r<0&&(o=-o),hi.copy(this);let c=1/o,h=1/a,u=1/l;return hi.elements[0]*=c,hi.elements[1]*=c,hi.elements[2]*=c,hi.elements[4]*=h,hi.elements[5]*=h,hi.elements[6]*=h,hi.elements[8]*=u,hi.elements[9]*=u,hi.elements[10]*=u,t.setFromRotationMatrix(hi),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=ei,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),m,_;if(l)m=r/(o-r),_=o*r/(o-r);else if(a===ei)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Cr)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ei,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),m,_;if(l)m=1/(o-r),_=o/(o-r);else if(a===ei)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===Cr)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},dr=new Y,hi=new rt,Qm=new Y(0,0,0),eg=new Y(1,1,1),ps=new Y,Xa=new Y,Gn=new Y,zd=new rt,Hd=new Rn,Qi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:et("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hd.setFromEuler(this),this.setFromQuaternion(Hd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qi.DEFAULT_ORDER="XYZ";var Dr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},tg=0,Gd=new Y,fr=new Rn,Wi=new rt,Ya=new Y,mo=new Y,ng=new Y,ig=new Rn,Vd=new Y(1,0,0),Wd=new Y(0,1,0),Xd=new Y(0,0,1),Yd={type:"added"},sg={type:"removed"},pr={type:"childadded",child:null},_h={type:"childremoved",child:null},Xt=class i extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new Y,t=new Qi,n=new Rn,s=new Y(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new pt}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.multiply(fr),this}rotateOnWorldAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.premultiply(fr),this}rotateX(e){return this.rotateOnAxis(Vd,e)}rotateY(e){return this.rotateOnAxis(Wd,e)}rotateZ(e){return this.rotateOnAxis(Xd,e)}translateOnAxis(e,t){return Gd.copy(e).applyQuaternion(this.quaternion),this.position.add(Gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vd,e)}translateY(e){return this.translateOnAxis(Wd,e)}translateZ(e){return this.translateOnAxis(Xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ya.copy(e):Ya.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(mo,Ya,this.up):Wi.lookAt(Ya,mo,this.up),this.quaternion.setFromRotationMatrix(Wi),s&&(Wi.extractRotation(s.matrixWorld),fr.setFromRotationMatrix(Wi),this.quaternion.premultiply(fr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yd),pr.child=e,this.dispatchEvent(pr),pr.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sg),_h.child=e,this.dispatchEvent(_h),_h.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yd),pr.child=e,this.dispatchEvent(pr),pr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,e,ng),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,ig,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Xt.DEFAULT_UP=new Y(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jt=class extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},rg={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let p=t.getJointPose(_,n),x=this._getHandJoint(c,_);p!==null&&(x.matrix.fromArray(p.transform.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=p.radius),x.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},np={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ms={h:0,s:0,l:0},qa={h:0,s:0,l:0};function yh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Xe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=_t.workingColorSpace){if(e=_u(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=yh(o,r,e+1/3),this.g=yh(o,r,e),this.b=yh(o,r,e-1/3)}return _t.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&et("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:et("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);et("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=np[e.toLowerCase()];return n!==void 0?this.setHex(n,t):et("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}copyLinearToSRGB(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return _t.workingToColorSpace(En.copy(this),e),Math.round(Mt(En.r*255,0,255))*65536+Math.round(Mt(En.g*255,0,255))*256+Math.round(Mt(En.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(En.copy(this),t);let n=En.r,s=En.g,r=En.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=Nt){_t.workingToColorSpace(En.copy(this),e);let t=En.r,n=En.g,s=En.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ms),this.setHSL(ms.h+e,ms.s+t,ms.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ms),e.getHSL(qa);let n=wo(ms.h,qa.h,t),s=wo(ms.s,qa.s,t),r=wo(ms.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},En=new Xe;Xe.NAMES=np;var Ur=class extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ui=new Y,Xi=new Y,vh=new Y,Yi=new Y,mr=new Y,gr=new Y,qd=new Y,bh=new Y,Sh=new Y,Mh=new Y,wh=new Ot,Th=new Ot,Ah=new Ot,Ki=class i{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ui.subVectors(e,t),s.cross(ui);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ui.subVectors(s,t),Xi.subVectors(n,t),vh.subVectors(e,t);let o=ui.dot(ui),a=ui.dot(Xi),l=ui.dot(vh),c=Xi.dot(Xi),h=Xi.dot(vh),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,m=(o*h-a*l)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Yi)===null?!1:Yi.x>=0&&Yi.y>=0&&Yi.x+Yi.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yi.x),l.addScaledVector(o,Yi.y),l.addScaledVector(a,Yi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return wh.setScalar(0),Th.setScalar(0),Ah.setScalar(0),wh.fromBufferAttribute(e,t),Th.fromBufferAttribute(e,n),Ah.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(wh,r.x),o.addScaledVector(Th,r.y),o.addScaledVector(Ah,r.z),o}static isFrontFacing(e,t,n,s){return ui.subVectors(n,t),Xi.subVectors(e,t),ui.cross(Xi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),Xi.subVectors(this.a,this.b),ui.cross(Xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;mr.subVectors(s,n),gr.subVectors(r,n),bh.subVectors(e,n);let l=mr.dot(bh),c=gr.dot(bh);if(l<=0&&c<=0)return t.copy(n);Sh.subVectors(e,s);let h=mr.dot(Sh),u=gr.dot(Sh);if(h>=0&&u<=h)return t.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),t.copy(n).addScaledVector(mr,o);Mh.subVectors(e,r);let d=mr.dot(Mh),m=gr.dot(Mh);if(m>=0&&d<=m)return t.copy(r);let _=d*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(gr,a);let p=h*m-d*u;if(p<=0&&u-h>=0&&d-m>=0)return qd.subVectors(r,s),a=(u-h)/(u-h+(d-m)),t.copy(s).addScaledVector(qd,a);let x=1/(p+_+f);return o=_*x,a=f*x,t.copy(n).addScaledVector(mr,o).addScaledVector(gr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zt=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,di):di.fromBufferAttribute(r,o),di.applyMatrix4(e.matrixWorld),this.expandByPoint(di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Za.copy(n.boundingBox)),Za.applyMatrix4(e.matrixWorld),this.union(Za)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,di),di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(go),$a.subVectors(this.max,go),xr.subVectors(e.a,go),_r.subVectors(e.b,go),yr.subVectors(e.c,go),gs.subVectors(_r,xr),xs.subVectors(yr,_r),Bs.subVectors(xr,yr);let t=[0,-gs.z,gs.y,0,-xs.z,xs.y,0,-Bs.z,Bs.y,gs.z,0,-gs.x,xs.z,0,-xs.x,Bs.z,0,-Bs.x,-gs.y,gs.x,0,-xs.y,xs.x,0,-Bs.y,Bs.x,0];return!Eh(t,xr,_r,yr,$a)||(t=[1,0,0,0,1,0,0,0,1],!Eh(t,xr,_r,yr,$a))?!1:(Ka.crossVectors(gs,xs),t=[Ka.x,Ka.y,Ka.z],Eh(t,xr,_r,yr,$a))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},qi=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],di=new Y,Za=new Zt,xr=new Y,_r=new Y,yr=new Y,gs=new Y,xs=new Y,Bs=new Y,go=new Y,$a=new Y,Ka=new Y,ks=new Y;function Eh(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ks.fromArray(i,r);let a=s.x*Math.abs(ks.x)+s.y*Math.abs(ks.y)+s.z*Math.abs(ks.z),l=e.dot(ks),c=t.dot(ks),h=n.dot(ks);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var sn=new Y,ja=new Ke,og=0,Mn=class extends fi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:og++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gu,this.updateRanges=[],this.gpuType=qn,this.version=0,this._normalizationScale=e!==void 0?Ic(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ja.fromBufferAttribute(this,t),ja.applyMatrix3(e),this.setXY(t,ja.x,ja.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix3(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):vu(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):bu(e,this.array)}};var Ro=class extends Mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Co=class extends Mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var zt=class extends Mn{constructor(e,t,n){super(new Float32Array(e),t,n)}},ag=new Zt,xo=new Y,Rh=new Y,Bn=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ag.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xo.subVectors(e,this.center);let t=xo.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(xo,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xo.copy(e.center).add(Rh)),this.expandByPoint(xo.copy(e.center).sub(Rh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},lg=0,Jn=new rt,Ch=new Xt,vr=new Y,Vn=new Zt,_o=new Zt,xn=new Y,$t=class i extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dm(e)?Co:Ro)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new pt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Jn.makeRotationFromQuaternion(e),this.applyMatrix4(Jn),this}rotateX(e){return Jn.makeRotationX(e),this.applyMatrix4(Jn),this}rotateY(e){return Jn.makeRotationY(e),this.applyMatrix4(Jn),this}rotateZ(e){return Jn.makeRotationZ(e),this.applyMatrix4(Jn),this}translate(e,t,n){return Jn.makeTranslation(e,t,n),this.applyMatrix4(Jn),this}scale(e,t,n){return Jn.makeScale(e,t,n),this.applyMatrix4(Jn),this}lookAt(e){return Ch.lookAt(e),Ch.updateMatrix(),this.applyMatrix4(Ch.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new zt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&et("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Vn.setFromBufferAttribute(r),this.morphTargetsRelative?(xn.addVectors(this.boundingBox.min,Vn.min),this.boundingBox.expandByPoint(xn),xn.addVectors(this.boundingBox.max,Vn.max),this.boundingBox.expandByPoint(xn)):(this.boundingBox.expandByPoint(Vn.min),this.boundingBox.expandByPoint(Vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){let n=this.boundingSphere.center;if(Vn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];_o.setFromBufferAttribute(a),this.morphTargetsRelative?(xn.addVectors(Vn.min,_o.min),Vn.expandByPoint(xn),xn.addVectors(Vn.max,_o.max),Vn.expandByPoint(xn)):(Vn.expandByPoint(_o.min),Vn.expandByPoint(_o.max))}Vn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)xn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(xn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)xn.fromBufferAttribute(a,c),l&&(vr.fromBufferAttribute(e,c),xn.add(vr)),s=Math.max(s,n.distanceToSquared(xn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Mn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)a[L]=new Y,l[L]=new Y;let h=new Y,u=new Y,f=new Y,d=new Ke,m=new Ke,_=new Ke,p=new Y,x=new Y;function y(L,I,P){c[L]=c[I]=c[P]=1,h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,I),f.fromBufferAttribute(n,P),d.fromBufferAttribute(r,L),m.fromBufferAttribute(r,I),_.fromBufferAttribute(r,P),u.sub(h),f.sub(h),m.sub(d),_.sub(d);let T=1/(m.x*_.y-_.x*m.y);isFinite(T)&&(p.copy(u).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(T),x.copy(f).multiplyScalar(m.x).addScaledVector(u,-_.x).multiplyScalar(T),a[L].add(p),a[I].add(p),a[P].add(p),l[L].add(x),l[I].add(x),l[P].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let L=0,I=M.length;L<I;++L){let P=M[L],T=P.start,D=P.count;for(let A=T,N=T+D;A<N;A+=3)y(e.getX(A+0),e.getX(A+1),e.getX(A+2))}let v=new Y,w=new Y,S=new Y,g=new Y;function b(L){S.fromBufferAttribute(s,L),g.copy(S);let I=a[L];v.copy(I),v.sub(S.multiplyScalar(S.dot(I))).normalize(),w.crossVectors(g,I);let T=w.dot(l[L])<0?-1:1;o.setXYZW(L,v.x,v.y,v.z,T)}for(let L=0,I=n.count;L<I;++L)c[L]&&b(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new Y,r=new Y,o=new Y,a=new Y,l=new Y,c=new Y,h=new Y,u=new Y;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xn.fromBufferAttribute(e,t),xn.normalize(),e.setXYZ(t,xn.x,xn.y,xn.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,m=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let x=0;x<h;x++)f[m++]=c[d++]}return new Mn(f,h,u)}if(this.index===null)return et("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Or=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gu,this.updateRanges=[],this.version=0,this.uuid=Li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Zd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Zd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Zd(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Li()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var Nn=new Y,Fr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?Ic(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ao("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Mn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ao("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):vu(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):bu(e,this.data.array)}},Ph=new Y,cg=new Y,hg=new pt,Wn=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ph.subVectors(n,t).cross(cg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Ph),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||hg.getNormalMatrix(e),s=this.coplanarPoint(Ph).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ug=0,Cn=class extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=Yr,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nu,this.blendDst=iu,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vl,this.stencilZFail=vl,this.stencilZPass=vl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){et(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){et(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Wn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ke().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ke().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Zi=new Y,Ih=new Y,Ja=new Y,Qa=new Y,Ai=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Zi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zi.copy(this.origin).addScaledVector(this.direction,t),Zi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ih.copy(e).add(t).multiplyScalar(.5),Ja.copy(t).sub(e).normalize(),Qa.copy(this.origin).sub(Ih);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ja),a=Qa.dot(this.direction),l=-Qa.dot(Ja),c=Qa.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*l-a,f=o*a-l,m=r*h,u>=0)if(f>=-m)if(f<=m){let _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ih).addScaledVector(Ja,f),d}intersectSphere(e,t){if(e.radius<0)return null;Zi.subVectors(e.center,this.origin);let n=Zi.dot(this.direction),s=Zi.dot(Zi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Zi)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,m=t.x-o.x,_=t.y-o.y,p=t.z-o.z,x=n.x-o.x,y=n.y-o.y,M=n.z-o.z,v=Math.abs(l),w=Math.abs(c),S=Math.abs(h),g,b,L,I,P,T,D,A,N,z,O,$;if(v>=w&&v>=S?(L=l,T=u,N=m,$=x,l>=0?(g=c,b=h,I=f,P=d,D=_,A=p,z=y,O=M):(g=h,b=c,I=d,P=f,D=p,A=_,z=M,O=y)):w>=S?(L=c,T=f,N=_,$=y,c>=0?(g=h,b=l,I=d,P=u,D=p,A=m,z=M,O=x):(g=l,b=h,I=u,P=d,D=m,A=p,z=x,O=M)):(L=h,T=d,N=p,$=M,h>=0?(g=l,b=c,I=u,P=f,D=m,A=_,z=x,O=y):(g=c,b=l,I=f,P=u,D=_,A=m,z=y,O=x)),L===0)return null;let B=g/L,V=b/L,J=1/L,ue=I-B*T,xe=P-V*T,te=D-B*N,pe=A-V*N,ge=z-B*$,De=O-V*$,ye=ge*pe-De*te,Ge=ue*De-xe*ge,gt=te*xe-pe*ue;if(s){if(ye<0||Ge<0||gt<0)return null}else if((ye<0||Ge<0||gt<0)&&(ye>0||Ge>0||gt>0))return null;let qe=ye+Ge+gt;if(qe===0)return null;let tt=J*(ye*T+Ge*N+gt*$);return(qe>0?tt<0:tt>0)?null:this.at(tt/qe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xn=class extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=su,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$d=new rt,zs=new Ai,el=new Bn,Kd=new Y,tl=new Y,nl=new Y,il=new Y,Lh=new Y,sl=new Y,jd=new Y,rl=new Y,Ut=class extends Xt{constructor(e=new $t,t=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){sl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Lh.fromBufferAttribute(u,e),o?sl.addScaledVector(Lh,h):sl.addScaledVector(Lh.sub(t),h))}t.add(sl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),el.copy(n.boundingSphere),el.applyMatrix4(r),zs.copy(e.ray).recast(e.near),!(el.containsPoint(zs.origin)===!1&&(zs.intersectSphere(el,Kd)===null||zs.origin.distanceToSquared(Kd)>(e.far-e.near)**2))&&($d.copy(r).invert(),zs.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&zs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){let p=f[m],x=o[p.materialIndex],y=Math.max(p.start,d.start),M=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let v=y,w=M;v<w;v+=3){let S=a.getX(v),g=a.getX(v+1),b=a.getX(v+2);s=ol(this,x,e,n,c,h,u,S,g,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=m,x=_;p<x;p+=3){let y=a.getX(p),M=a.getX(p+1),v=a.getX(p+2);s=ol(this,o,e,n,c,h,u,y,M,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){let p=f[m],x=o[p.materialIndex],y=Math.max(p.start,d.start),M=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let v=y,w=M;v<w;v+=3){let S=v,g=v+1,b=v+2;s=ol(this,x,e,n,c,h,u,S,g,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=m,x=_;p<x;p+=3){let y=p,M=p+1,v=p+2;s=ol(this,o,e,n,c,h,u,y,M,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function dg(i,e,t,n,s,r,o,a){let l;if(e.side===wn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Yn,a),l===null)return null;rl.copy(a),rl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(rl);return c<t.near||c>t.far?null:{distance:c,point:rl.clone(),object:i}}function ol(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,tl),i.getVertexPosition(l,nl),i.getVertexPosition(c,il);let h=dg(i,e,t,n,tl,nl,il,jd);if(h){let u=new Y;Ki.getBarycoord(jd,tl,nl,il,u),s&&(h.uv=Ki.getInterpolatedAttribute(s,a,l,c,u,new Ke)),r&&(h.uv1=Ki.getInterpolatedAttribute(r,a,l,c,u,new Ke)),o&&(h.normal=Ki.getInterpolatedAttribute(o,a,l,c,u,new Y),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new Y,materialIndex:0};Ki.getNormal(tl,nl,il,f.normal),h.face=f,h.barycoord=u}return h}var yo=new Ot,Jd=new Ot,Qd=new Ot,fg=new Ot,ef=new rt,al=new Y,Dh=new Bn,tf=new rt,Nh=new Ai,Po=class extends Ut{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kh,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Zt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,al),this.boundingBox.expandByPoint(al)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,al),this.boundingSphere.expandByPoint(al)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dh.copy(this.boundingSphere),Dh.applyMatrix4(s),e.ray.intersectsSphere(Dh)!==!1&&(tf.copy(s).invert(),Nh.copy(e.ray).applyMatrix4(tf),!(this.boundingBox!==null&&Nh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Nh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ot,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===kh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Gf?this.bindMatrixInverse.copy(this.bindMatrix).invert():et("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Jd.fromBufferAttribute(s.attributes.skinIndex,e),Qd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(yo.copy(t),t.set(0,0,0,0)):(yo.set(t.x,t.y,t.z,1),t.set(0,0,0)),yo.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Qd.getComponent(r);if(o!==0){let a=Jd.getComponent(r);ef.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(fg.copy(yo).applyMatrix4(ef),o)}}return t.isVector4&&(t.w=yo.w),t.applyMatrix4(this.bindMatrixInverse)}},Br=class extends Xt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ei=class extends un{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Wt,h=Wt,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},nf=new rt,pg=new rt,Io=class i{constructor(e=[],t=[]){this.uuid=Li(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){et("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:pg;nf.multiplyMatrices(a,t[r]),nf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ei(t,e,e,zn,qn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(et("Skeleton: No bone found with UUID:",r),o=new Br),this.bones.push(o),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},es=class extends Mn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},br=new rt,sf=new rt,ll=[],rf=new Zt,mg=new rt,vo=new Ut,bo=new Bn,Lo=class extends Ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new es(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,mg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,br),rf.copy(e.boundingBox).applyMatrix4(br),this.boundingBox.union(rf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,br),bo.copy(e.boundingSphere).applyMatrix4(br),this.boundingSphere.union(bo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(vo.geometry=this.geometry,vo.material=this.material,vo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bo.copy(this.boundingSphere),bo.applyMatrix4(n),e.ray.intersectsSphere(bo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,br),sf.multiplyMatrices(n,br),vo.matrixWorld=sf,vo.raycast(e,ll);for(let o=0,a=ll.length;o<a;o++){let l=ll[o];l.instanceId=r,l.object=this,t.push(l)}ll.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new es(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ei(new Float32Array(s*this.count),s,this.count,jl,qn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Hs=new Bn,gg=new Ke(.5,.5),cl=new Y,vs=class{constructor(e=new Wn,t=new Wn,n=new Wn,s=new Wn,r=new Wn,o=new Wn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ei,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],p=r[10],x=r[11],y=r[12],M=r[13],v=r[14],w=r[15];if(s[0].setComponents(c-o,d-h,x-m,w-y).normalize(),s[1].setComponents(c+o,d+h,x+m,w+y).normalize(),s[2].setComponents(c+a,d+u,x+_,w+M).normalize(),s[3].setComponents(c-a,d-u,x-_,w-M).normalize(),n)s[4].setComponents(l,f,p,v).normalize(),s[5].setComponents(c-l,d-f,x-p,w-v).normalize();else if(s[4].setComponents(c-l,d-f,x-p,w-v).normalize(),t===ei)s[5].setComponents(c+l,d+f,x+p,w+v).normalize();else if(t===Cr)s[5].setComponents(l,f,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hs)}intersectsSprite(e){Hs.center.set(0,0,0);let t=gg.distanceTo(e.center);return Hs.radius=.7071067811865476+t,Hs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(cl.x=s.normal.x>0?e.max.x:e.min.x,cl.y=s.normal.y>0?e.max.y:e.min.y,cl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(cl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},of=new rt,Il=class i{constructor(){this.coordinateSystem=ei,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];of.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new vs),n[s].setFromProjectionMatrix(of,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new vs),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var bs=class extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ll=new Y,Dl=new Y,af=new rt,So=new Ai,hl=new Bn,Uh=new Y,lf=new Y,Ys=class extends Xt{constructor(e=new $t,t=new bs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ll.fromBufferAttribute(t,s-1),Dl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ll.distanceTo(Dl);e.setAttribute("lineDistance",new zt(n,1))}else et("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hl.copy(n.boundingSphere),hl.applyMatrix4(s),hl.radius+=r,e.ray.intersectsSphere(hl)===!1)return;af.copy(s).invert(),So.copy(e.ray).applyMatrix4(af);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=d,p=m-1;_<p;_+=c){let x=h.getX(_),y=h.getX(_+1),M=ul(this,e,So,l,x,y,_);M&&t.push(M)}if(this.isLineLoop){let _=h.getX(m-1),p=h.getX(d),x=ul(this,e,So,l,_,p,m-1);x&&t.push(x)}}else{let d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=d,p=m-1;_<p;_+=c){let x=ul(this,e,So,l,_,_+1,_);x&&t.push(x)}if(this.isLineLoop){let _=ul(this,e,So,l,m-1,d,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ul(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Ll.fromBufferAttribute(a,s),Dl.fromBufferAttribute(a,r),t.distanceSqToSegment(Ll,Dl,Uh,lf)>n)return;Uh.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Uh);if(!(c<e.near||c>e.far))return{distance:c,point:lf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var cf=new Y,hf=new Y,qs=class extends Ys{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)cf.fromBufferAttribute(t,s),hf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+cf.distanceTo(hf);e.setAttribute("lineDistance",new zt(n,1))}else et("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Do=class extends Ys{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},kr=class extends Cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},uf=new rt,Wh=new Ai,dl=new Bn,fl=new Y,No=class extends Xt{constructor(e=new $t,t=new kr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dl.copy(n.boundingSphere),dl.applyMatrix4(s),dl.radius+=r,e.ray.intersectsSphere(dl)===!1)return;uf.copy(s).invert(),Wh.copy(e.ray).applyMatrix4(uf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let m=f,_=d;m<_;m++){let p=c.getX(m);fl.fromBufferAttribute(u,p),df(fl,p,l,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,_=d;m<_;m++)fl.fromBufferAttribute(u,m),df(fl,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function df(i,e,t,n,s,r,o){let a=Wh.distanceSqToPoint(i);if(a<t){let l=new Y;Wh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Uo=class extends un{constructor(e=[],t=Qs,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ri=class extends un{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var pi=class extends un{constructor(e,t,n=_i,s,r,o,a=Wt,l=Wt,c,h=Ji,u=1){if(h!==Ji&&h!==yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Oo=class extends pi{constructor(e,t=_i,n=Qs,s,r,o=Wt,a=Wt,l,c=Ji){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Fo=class extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},mi=class i extends $t{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(u,2));function m(_,p,x,y,M,v,w,S,g,b,L){let I=v/g,P=w/b,T=v/2,D=w/2,A=S/2,N=g+1,z=b+1,O=0,$=0,B=new Y;for(let V=0;V<z;V++){let J=V*P-D;for(let ue=0;ue<N;ue++){let xe=ue*I-T;B[_]=xe*y,B[p]=J*M,B[x]=A,c.push(B.x,B.y,B.z),B[_]=0,B[p]=0,B[x]=S>0?1:-1,h.push(B.x,B.y,B.z),u.push(ue/g),u.push(1-V/b),O+=1}}for(let V=0;V<b;V++)for(let J=0;J<g;J++){let ue=f+J+N*V,xe=f+J+N*(V+1),te=f+(J+1)+N*(V+1),pe=f+(J+1)+N*V;l.push(ue,xe,pe),l.push(xe,te,pe),$+=6}a.addGroup(d,$,L),d+=$,f+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Bo=class i extends $t{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,_=[],p=n/2,x=0;y(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new zt(u,3)),this.setAttribute("normal",new zt(f,3)),this.setAttribute("uv",new zt(d,2));function y(){let v=new Y,w=new Y,S=0,g=(t-e)/n;for(let b=0;b<=r;b++){let L=[],I=b/r,P=I*(t-e)+e;for(let T=0;T<=s;T++){let D=T/s,A=D*l+a,N=Math.sin(A),z=Math.cos(A);w.x=P*N,w.y=-I*n+p,w.z=P*z,u.push(w.x,w.y,w.z),v.set(N,g,z).normalize(),f.push(v.x,v.y,v.z),d.push(D,1-I),L.push(m++)}_.push(L)}for(let b=0;b<s;b++)for(let L=0;L<r;L++){let I=_[L][b],P=_[L+1][b],T=_[L+1][b+1],D=_[L][b+1];(e>0||L!==0)&&(h.push(I,P,D),S+=3),(t>0||L!==r-1)&&(h.push(P,T,D),S+=3)}c.addGroup(x,S,0),x+=S}function M(v){let w=m,S=new Ke,g=new Y,b=0,L=v===!0?e:t,I=v===!0?1:-1;for(let T=1;T<=s;T++)u.push(0,p*I,0),f.push(0,I,0),d.push(.5,.5),m++;let P=m;for(let T=0;T<=s;T++){let A=T/s*l+a,N=Math.cos(A),z=Math.sin(A);g.x=L*z,g.y=p*I,g.z=L*N,u.push(g.x,g.y,g.z),f.push(0,I,0),S.x=N*.5+.5,S.y=z*.5*I+.5,d.push(S.x,S.y),m++}for(let T=0;T<s;T++){let D=w+T,A=P+T;v===!0?h.push(A,A+1,D):h.push(A+1,A,D),b+=3}c.addGroup(x,b,v===!0?1:2),x+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var pl=new Y,ml=new Y,Oh=new Y,gl=new Ki,ko=class extends $t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Tr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f=new Map,d=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:_,b:p,c:x}=gl;if(_.fromBufferAttribute(a,c[0]),p.fromBufferAttribute(a,c[1]),x.fromBufferAttribute(a,c[2]),gl.getNormal(Oh),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[2]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){let M=(y+1)%3,v=u[y],w=u[M],S=gl[h[y]],g=gl[h[M]],b=`${v}_${w}`,L=`${w}_${v}`,I=f.get(L);I?(Oh.dot(I.normal)<=r&&(d.push(S.x,S.y,S.z),d.push(g.x,g.y,g.z)),f.set(L,null)):f.has(b)||f.set(b,{index0:c[y],index1:c[M],normal:Oh.clone()})}}for(let m of f.values())if(m){let{index0:_,index1:p}=m;pl.fromBufferAttribute(a,_),ml.fromBufferAttribute(a,p),d.push(pl.x,pl.y,pl.z),d.push(ml.x,ml.y,ml.z)}this.setAttribute("position",new zt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var ti=class i extends $t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,f=t/l,d=[],m=[],_=[],p=[];for(let x=0;x<h;x++){let y=x*f-o;for(let M=0;M<c;M++){let v=M*u-r;m.push(v,-y,0),_.push(0,0,1),p.push(M/a),p.push(1-x/l)}}for(let x=0;x<l;x++)for(let y=0;y<a;y++){let M=y+c*x,v=y+c*(x+1),w=y+1+c*(x+1),S=y+1+c*x;d.push(M,v,S),d.push(v,w,S)}this.setIndex(d),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Zs=class i extends $t{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new Y,f=new Y,d=[],m=[],_=[],p=[];for(let x=0;x<=n;x++){let y=[],M=x/n,v=o+M*a,w=e*Math.cos(v),S=Math.sqrt(e*e-w*w),g=0;x===0&&o===0?g=.5/t:x===n&&l===Math.PI&&(g=-.5/t);for(let b=0;b<=t;b++){let L=b/t,I=s+L*r;u.x=-S*Math.cos(I),u.y=w,u.z=S*Math.sin(I),m.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(L+g,1-M),y.push(c++)}h.push(y)}for(let x=0;x<n;x++)for(let y=0;y<t;y++){let M=h[x][y+1],v=h[x][y],w=h[x+1][y],S=h[x+1][y+1];(x!==0||o>0)&&d.push(M,v,S),(x!==n-1||l<Math.PI)&&d.push(v,w,S)}this.setIndex(d),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(_,3)),this.setAttribute("uv",new zt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var zo=class extends Cn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Xe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function tr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ff(s))s.isRenderTargetTexture?(et("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ff(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Ln(i){let e={};for(let t=0;t<i.length;t++){let n=tr(i[t]);for(let s in n)e[s]=n[s]}return e}function ff(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function xg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Su(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var oi={clone:tr,merge:Ln},_g=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_g,this.fragmentShader=yg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tr(e.uniforms),this.uniformsGroups=xg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"v3":this.uniforms[n].value=new Y().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m3":this.uniforms[n].value=new pt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new rt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},zr=class extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ni=class extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pa,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},nn=class extends ni{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ke(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Gs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Gs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ho=class extends Cn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pa,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};var Nl=class extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ul=class extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ys(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Mo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function vg(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function pf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function bg(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ol=class extends Ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hh,endingEnd:Hh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Gh:r=e,a=2*t-n;break;case Vh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Gh:o=e,l=2*n-t;break;case Vh:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(s-t),_=m*m,p=_*m,x=-f*p+2*f*_-f*m,y=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*m+1,M=(-1-d)*p+(1.5+d)*_+.5*m,v=d*p-d*_;for(let w=0;w!==a;++w)r[w]=x*o[h+w]+y*o[c+w]+M*o[l+w]+v*o[u+w];return r}},Fl=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},Bl=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},kl=class extends Ci{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),_=1-m;for(let p=0;p!==a;++p)r[p]=o[c+p]*_+o[l+p]*m;return r}let f=a*2,d=e-1;for(let m=0;m!==a;++m){let _=o[c+m],p=o[l+m],x=d*f+m*2,y=u[x],M=u[x+1],v=e*f+m*2,w=h[v],S=h[v+1],g=Mg(n,t,y,w,s);r[m]=ip(g,_,M,S,p)}return r}};function ip(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Sg(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Mg(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=ip(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Sg(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var kn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ys(t,this.TimeBufferType),this.values=ys(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ys(e.times,Array),values:ys(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Mo(e.settings)&&(n.settings={inTangents:ys(e.settings.inTangents,Array),outTangents:ys(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new kl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Vs:t=this.InterpolantFactoryMethodDiscrete;break;case Ws:t=this.InterpolantFactoryMethodLinear;break;case yl:t=this.InterpolantFactoryMethodSmooth;break;case zh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return et("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return Ws;case this.InterpolantFactoryMethodSmooth:return yl;case this.InterpolantFactoryMethodBezier:return zh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Mo(this.settings)&&(mf(this.settings.inTangents,e),mf(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Mo(this.settings)&&(gf(this.settings.inTangents,e),gf(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(lt("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(lt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){lt("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){lt("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&Nm(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){lt("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===yl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let _=t[u+m];if(_!==t[f+m]||_!==t[d+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Mo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function mf(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function gf(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}kn.prototype.ValueTypeName="";kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=Ws;var ts=class extends kn{constructor(e,t,n){super(e,t,n)}};ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Vs;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Go=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}};Go.prototype.ValueTypeName="color";var ns=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}};ns.prototype.ValueTypeName="number";var zl=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Rn.slerpFlat(r,0,o,c-a,o,c,l);return r}},is=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new zl(this.times,this.values,this.getValueSize(),e)}};is.prototype.ValueTypeName="quaternion";is.prototype.InterpolantFactoryMethodSmooth=void 0;var ss=class extends kn{constructor(e,t,n){super(e,t,n)}};ss.prototype.ValueTypeName="string";ss.prototype.ValueBufferType=Array;ss.prototype.DefaultInterpolation=Vs;ss.prototype.InterpolantFactoryMethodLinear=void 0;ss.prototype.InterpolantFactoryMethodSmooth=void 0;var Ss=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}};Ss.prototype.ValueTypeName="vector";var Vo=class{constructor(e="",t=-1,n=[],s=Vf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Li(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Tg(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(kn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=vg(l);l=pf(l,1,h),c=pf(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new ns(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function wg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ns;case"vector":case"vector2":case"vector3":case"vector4":return Ss;case"color":return Go;case"quaternion":return is;case"bool":case"boolean":return ts;case"string":return ss}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Tg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=wg(i.type);if(i.times===void 0){let n=[],s=[];bg(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Mo(i.settings)&&(t.settings={inTangents:ys(i.settings.inTangents,Float32Array),outTangents:ys(i.settings.outTangents,Float32Array)}),t}var Ti={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(xf(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!xf(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function xf(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Hr=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},sp=new Hr,Pi=class{constructor(e){this.manager=e!==void 0?e:sp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Pi.DEFAULT_MATERIAL_NAME="__DEFAULT";var $i={},Xh=class extends Error{constructor(e,t){super(e),this.response=t}},Gr=class extends Pi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Ti.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if($i[e]!==void 0){$i[e].push({onLoad:t,onProgress:n,onError:s});return}$i[e]=[],$i[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&et("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=$i[e],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0,_=0,p=new ReadableStream({start(x){y();function y(){u.read().then(({done:M,value:v})=>{if(M)x.close();else{_+=v.byteLength;let w=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:d});for(let S=0,g=h.length;S<g;S++){let b=h[S];b.onProgress&&b.onProgress(w)}x.enqueue(v),y()}},M=>{x.error(M)})}}});return new Response(p)}else throw new Xh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(m=>d.decode(m))}}}).then(c=>{Ti.add(`file:${e}`,c);let h=$i[e];delete $i[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=$i[e];if(h===void 0)throw this.manager.itemError(e),c;delete $i[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Sr=new WeakMap,Hl=class extends Pi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ti.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Sr.get(o);u===void 0&&(u=[],Sr.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=Pr("img");function l(){h(),t&&t(this);let u=Sr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Sr.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),Ti.remove(`image:${e}`);let f=Sr.get(this)||[];for(let d=0;d<f.length;d++){let m=f[d];m.onError&&m.onError(u)}Sr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ti.add(`image:${e}`,a),r.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}};var Wo=class extends Pi{constructor(e){super(e)}load(e,t,n,s){let r=new un,o=new Hl(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},$s=class extends Xt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Xo=class extends $s{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Fh=new rt,_f=new Y,yf=new Y,Vr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vs,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new Ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;_f.setFromMatrixPosition(e.matrixWorld),t.position.copy(_f),yf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Fh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Fh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Cr||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Fh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xl=new Y,_l=new Rn,wi=new Y,Yo=class extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xl,_l,wi),wi.x===1&&wi.y===1&&wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xl,_l,wi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(xl,_l,wi),wi.x===1&&wi.y===1&&wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xl,_l,wi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},_s=new Y,vf=new Ke,bf=new Ke,ln=class extends Yo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xs*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){_s.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_s.x,_s.y).multiplyScalar(-e/_s.z),_s.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_s.x,_s.y).multiplyScalar(-e/_s.z)}getViewSize(e,t){return this.getViewBounds(e,vf,bf),t.subVectors(bf,vf)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Tr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yh=class extends Vr{constructor(){super(new ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Xs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},qo=class extends $s{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Yh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},qh=class extends Vr{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}},Ks=class extends $s{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new qh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},gi=class extends Yo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zh=class extends Vr{constructor(){super(new gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},rs=class extends $s{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new Zh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var os=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Bh=new WeakMap,Zo=class extends Pi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&et("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&et("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ti.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{Bh.has(o)===!0?(s&&s(Bh.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",a.headers=this.requestHeader,a.priority=this.priority,a.cache=this.cache,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ti.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Bh.set(l,c),Ti.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ti.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Mr=-90,wr=1,Wr=class extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ln(Mr,wr,e,t);s.layers=this.layers,this.add(s);let r=new ln(Mr,wr,e,t);r.layers=this.layers,this.add(r);let o=new ln(Mr,wr,e,t);o.layers=this.layers,this.add(o);let a=new ln(Mr,wr,e,t);a.layers=this.layers,this.add(a);let l=new ln(Mr,wr,e,t);l.layers=this.layers,this.add(l);let c=new ln(Mr,wr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ei)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=_,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Gl=class extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},$o=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Ag.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Ag(){this._document.hidden===!1&&this.reset()}var Mu="\\[\\]\\.:\\/",Eg=new RegExp("["+Mu+"]","g"),wu="[^"+Mu+"]",Rg="[^"+Mu.replace("\\.","")+"]",Cg=/((?:WC+[\/:])*)/.source.replace("WC",wu),Pg=/(WCOD+)?/.source.replace("WCOD",Rg),Ig=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wu),Lg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wu),Dg=new RegExp("^"+Cg+Pg+Ig+Lg+"$"),Ng=["material","materials","bones","map"],$h=class{constructor(e,t,n){let s=n||kt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},kt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Eg,"")}static parseTrackName(e){let t=Dg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ng.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){et("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};kt.Composite=$h;kt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};kt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};kt.prototype.GetterByBindingType=[kt.prototype._getValue_direct,kt.prototype._getValue_array,kt.prototype._getValue_arrayElement,kt.prototype._getValue_toArray];kt.prototype.SetterByBindingTypeAndVersioning=[[kt.prototype._setValue_direct,kt.prototype._setValue_direct_setNeedsUpdate,kt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_array,kt.prototype._setValue_array_setNeedsUpdate,kt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_arrayElement,kt.prototype._setValue_arrayElement_setNeedsUpdate,kt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_fromArray,kt.prototype._setValue_fromArray_setNeedsUpdate,kt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ub=new Float32Array(1);var Sf=new rt,Ko=class{constructor(e,t,n=0,s=1/0){this.ray=new Ai(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):lt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Sf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sf),this}intersectObject(e,t=!0,n=[]){return Kh(e,this,n,t),n.sort(Mf),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Kh(e[s],this,n,t);return n.sort(Mf),n}};function Mf(i,e){return i.distance-e.distance}function Kh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Kh(r[o],e,t,!0)}}var Ms=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Mt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Mt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var jh=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var jo=class extends fi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Tu(i,e,t,n){let s=Ug(n);switch(t){case hu:return i*e;case jl:return i*e/s.components*s.byteLength;case Jl:return i*e/s.components*s.byteLength;case Ts:return i*e*2/s.components*s.byteLength;case Ql:return i*e*2/s.components*s.byteLength;case uu:return i*e*3/s.components*s.byteLength;case zn:return i*e*4/s.components*s.byteLength;case ec:return i*e*4/s.components*s.byteLength;case aa:case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ca:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nc:case sc:return Math.max(i,16)*Math.max(e,8)/4;case tc:case ic:return Math.max(i,8)*Math.max(e,8)/2;case rc:case oc:case lc:case cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ac:case ua:case hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case fc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case mc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case xc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case _c:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case bc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Tc:case Ac:case Ec:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Rc:case Cc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case da:case Pc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ug(i){switch(i){case Pn:case ou:return{byteLength:1,components:1};case $r:case au:case In:return{byteLength:2,components:1};case $l:case Kl:return{byteLength:2,components:4};case _i:case Zl:case qn:return{byteLength:4,components:1};case lu:case cu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?et("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ap(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Fg(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],_=u[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let _=u[d];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Bg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,i0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,s0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,r0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,o0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,a0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,l0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,v0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,b0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,E0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,C0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,N0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,O0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,F0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,k0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,H0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,W0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,X0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,q0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,j0=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,J0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ox=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ux=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,fx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,px=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_x=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,vx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ax=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ex=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Px=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ix=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ox=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Fx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,n_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,s_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,r_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,l_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,d_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,f_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,m_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,g_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bt={alphahash_fragment:Bg,alphahash_pars_fragment:kg,alphamap_fragment:zg,alphamap_pars_fragment:Hg,alphatest_fragment:Gg,alphatest_pars_fragment:Vg,aomap_fragment:Wg,aomap_pars_fragment:Xg,batching_pars_vertex:Yg,batching_vertex:qg,begin_vertex:Zg,beginnormal_vertex:$g,bsdfs:Kg,iridescence_fragment:jg,bumpmap_pars_fragment:Jg,clipping_planes_fragment:Qg,clipping_planes_pars_fragment:e0,clipping_planes_pars_vertex:t0,clipping_planes_vertex:n0,color_fragment:i0,color_pars_fragment:s0,color_pars_vertex:r0,color_vertex:o0,common:a0,defaultnormal_vertex:l0,displacementmap_pars_vertex:c0,displacementmap_vertex:h0,emissivemap_fragment:u0,emissivemap_pars_fragment:d0,colorspace_fragment:f0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:x0,envmap_pars_vertex:_0,envmap_physical_pars_fragment:C0,envmap_vertex:y0,fog_vertex:v0,fog_pars_vertex:b0,fog_fragment:S0,fog_pars_fragment:M0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:T0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:E0,lights_pars_begin:R0,lights_toon_fragment:P0,lights_toon_pars_fragment:I0,lights_phong_fragment:L0,lights_phong_pars_fragment:D0,lights_physical_fragment:N0,lights_physical_pars_fragment:U0,lights_fragment_begin:O0,lights_fragment_maps:F0,lights_fragment_end:B0,lightprobes_pars_fragment:k0,logdepthbuf_fragment:z0,logdepthbuf_pars_fragment:H0,logdepthbuf_pars_vertex:G0,logdepthbuf_vertex:V0,map_fragment:W0,map_pars_fragment:X0,map_particle_fragment:Y0,map_particle_pars_fragment:q0,metalnessmap_fragment:Z0,metalnessmap_pars_fragment:$0,morphinstance_vertex:K0,morphcolor_vertex:j0,morphnormal_vertex:J0,morphtarget_pars_vertex:Q0,morphtarget_vertex:ex,normal_fragment_begin:tx,normal_fragment_maps:nx,normal_pars_fragment:ix,normal_pars_vertex:sx,normal_vertex:rx,normalmap_pars_fragment:ox,clearcoat_normal_fragment_begin:ax,clearcoat_normal_fragment_maps:lx,clearcoat_pars_fragment:cx,iridescence_pars_fragment:hx,opaque_fragment:ux,packing:dx,premultiplied_alpha_fragment:fx,project_vertex:px,dithering_fragment:mx,dithering_pars_fragment:gx,roughnessmap_fragment:xx,roughnessmap_pars_fragment:_x,shadowmap_pars_fragment:yx,shadowmap_pars_vertex:vx,shadowmap_vertex:bx,shadowmask_pars_fragment:Sx,skinbase_vertex:Mx,skinning_pars_vertex:wx,skinning_vertex:Tx,skinnormal_vertex:Ax,specularmap_fragment:Ex,specularmap_pars_fragment:Rx,tonemapping_fragment:Cx,tonemapping_pars_fragment:Px,transmission_fragment:Ix,transmission_pars_fragment:Lx,uv_pars_fragment:Dx,uv_pars_vertex:Nx,uv_vertex:Ux,worldpos_vertex:Ox,background_vert:Fx,background_frag:Bx,backgroundCube_vert:kx,backgroundCube_frag:zx,cube_vert:Hx,cube_frag:Gx,depth_vert:Vx,depth_frag:Wx,distance_vert:Xx,distance_frag:Yx,equirect_vert:qx,equirect_frag:Zx,linedashed_vert:$x,linedashed_frag:Kx,meshbasic_vert:jx,meshbasic_frag:Jx,meshlambert_vert:Qx,meshlambert_frag:e_,meshmatcap_vert:t_,meshmatcap_frag:n_,meshnormal_vert:i_,meshnormal_frag:s_,meshphong_vert:r_,meshphong_frag:o_,meshphysical_vert:a_,meshphysical_frag:l_,meshtoon_vert:c_,meshtoon_frag:h_,points_vert:u_,points_frag:d_,shadow_vert:f_,shadow_frag:p_,sprite_vert:m_,sprite_frag:g_},Fe={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},Ni={basic:{uniforms:Ln([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:Ln([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:Ln([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:Ln([Fe.common,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.roughnessmap,Fe.metalnessmap,Fe.fog,Fe.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:Ln([Fe.common,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.gradientmap,Fe.fog,Fe.lights,{emissive:{value:new Xe(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:Ln([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:Ln([Fe.points,Fe.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:Ln([Fe.common,Fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:Ln([Fe.common,Fe.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:Ln([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:Ln([Fe.sprite,Fe.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distance:{uniforms:Ln([Fe.common,Fe.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distance_vert,fragmentShader:bt.distance_frag},shadow:{uniforms:Ln([Fe.lights,Fe.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};Ni.physical={uniforms:Ln([Ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new pt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};var Lc={r:0,b:0,g:0},x_=new rt,Ep=new pt;Ep.set(-1,0,0,0,1,0,0,0,1);function __(i,e,t,n,s,r){let o=new Xe(0),a=s===!0?0:1,l,c,h=null,u=0,f=null;function d(y){let M=y.isScene===!0?y.background:null;if(M&&M.isTexture){let v=y.backgroundBlurriness>0;M=e.get(M,v)}return M}function m(y){let M=!1,v=d(y);v===null?p(o,a):v&&v.isColor&&(p(v,1),M=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(y,M){let v=d(M);v&&v.isCubeTexture?(c===void 0&&(c=new Ut(new mi(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:tr(Ni.backgroundCube.uniforms),vertexShader:Ni.backgroundCube.vertexShader,fragmentShader:Ni.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(x_.makeRotationFromEuler(M.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ep),c.material.toneMapped=_t.getTransfer(v.colorSpace)!==Pt,(h!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ut(new ti(2,2),new dn({name:"BackgroundMaterial",uniforms:tr(Ni.background.uniforms),vertexShader:Ni.background.vertexShader,fragmentShader:Ni.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=_t.getTransfer(v.colorSpace)!==Pt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,M){y.getRGB(Lc,Su(i)),t.buffers.color.setClear(Lc.r,Lc.g,Lc.b,M,r)}function x(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),a=M,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,p(o,a)},render:m,addToRenderList:_,dispose:x}}function y_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(P,T,D,A,N){let z=!1,O=u(P,A,D,T);r!==O&&(r=O,c(r.object)),z=d(P,A,D,N),z&&m(P,A,D,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,v(P,T,D,A),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,T,D,A){let N=A.wireframe===!0,z=n[T.id];z===void 0&&(z={},n[T.id]=z);let O=P.isInstancedMesh===!0?P.id:0,$=z[O];$===void 0&&($={},z[O]=$);let B=$[D.id];B===void 0&&(B={},$[D.id]=B);let V=B[N];return V===void 0&&(V=f(l()),B[N]=V),V}function f(P){let T=[],D=[],A=[];for(let N=0;N<t;N++)T[N]=0,D[N]=0,A[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:D,attributeDivisors:A,object:P,attributes:{},index:null}}function d(P,T,D,A){let N=r.attributes,z=T.attributes,O=0,$=D.getAttributes();for(let B in $)if($[B].location>=0){let J=N[B],ue=z[B];if(ue===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(ue=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(ue=P.instanceColor)),J===void 0||J.attribute!==ue||ue&&J.data!==ue.data)return!0;O++}return r.attributesNum!==O||r.index!==A}function m(P,T,D,A){let N={},z=T.attributes,O=0,$=D.getAttributes();for(let B in $)if($[B].location>=0){let J=z[B];J===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(J=P.instanceColor));let ue={};ue.attribute=J,J&&J.data&&(ue.data=J.data),N[B]=ue,O++}r.attributes=N,r.attributesNum=O,r.index=A}function _(){let P=r.newAttributes;for(let T=0,D=P.length;T<D;T++)P[T]=0}function p(P){x(P,0)}function x(P,T){let D=r.newAttributes,A=r.enabledAttributes,N=r.attributeDivisors;D[P]=1,A[P]===0&&(i.enableVertexAttribArray(P),A[P]=1),N[P]!==T&&(i.vertexAttribDivisor(P,T),N[P]=T)}function y(){let P=r.newAttributes,T=r.enabledAttributes;for(let D=0,A=T.length;D<A;D++)T[D]!==P[D]&&(i.disableVertexAttribArray(D),T[D]=0)}function M(P,T,D,A,N,z,O){O===!0?i.vertexAttribIPointer(P,T,D,N,z):i.vertexAttribPointer(P,T,D,A,N,z)}function v(P,T,D,A){_();let N=A.attributes,z=D.getAttributes(),O=T.defaultAttributeValues;for(let $ in z){let B=z[$];if(B.location>=0){let V=N[$];if(V===void 0&&($==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),$==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){let J=V.normalized,ue=V.itemSize,xe=e.get(V);if(xe===void 0)continue;let te=xe.buffer,pe=xe.type,ge=xe.bytesPerElement,De=pe===i.INT||pe===i.UNSIGNED_INT||V.gpuType===Zl;if(V.isInterleavedBufferAttribute){let ye=V.data,Ge=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,gt=V.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let qe=0;qe<B.locationSize;qe++)x(B.location+qe,ye.meshPerAttribute);P.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let qe=0;qe<B.locationSize;qe++)p(B.location+qe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let qe=0;qe<B.locationSize;qe++)M(B.location+qe,ue/B.locationSize,pe,J,Ge*ge,(gt+ue/B.locationSize*qe)*ge,De)}else{if(V.isInstancedBufferAttribute){for(let ye=0;ye<B.locationSize;ye++)x(B.location+ye,V.meshPerAttribute);P.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ye=0;ye<B.locationSize;ye++)p(B.location+ye);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ye=0;ye<B.locationSize;ye++)M(B.location+ye,ue/B.locationSize,pe,J,ue*ge,ue/B.locationSize*ye*ge,De)}}else if(O!==void 0){let J=O[$];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(B.location,J);break;case 3:i.vertexAttrib3fv(B.location,J);break;case 4:i.vertexAttrib4fv(B.location,J);break;default:i.vertexAttrib1fv(B.location,J)}}}}y()}function w(){L();for(let P in n){let T=n[P];for(let D in T){let A=T[D];for(let N in A){let z=A[N];for(let O in z)h(z[O].object),delete z[O];delete A[N]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let T=n[P.id];for(let D in T){let A=T[D];for(let N in A){let z=A[N];for(let O in z)h(z[O].object),delete z[O];delete A[N]}}delete n[P.id]}function g(P){for(let T in n){let D=n[T];for(let A in D){let N=D[A];if(N[P.id]===void 0)continue;let z=N[P.id];for(let O in z)h(z[O].object),delete z[O];delete N[P.id]}}}function b(P){for(let T in n){let D=n[T],A=P.isInstancedMesh===!0?P.id:0,N=D[A];if(N!==void 0){for(let z in N){let O=N[z];for(let $ in O)h(O[$].object),delete O[$];delete N[z]}delete D[A],Object.keys(D).length===0&&delete n[T]}}}function L(){I(),o=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:g,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function v_(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function b_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let g=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(g){return!(g!==zn&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(g){let b=g===In&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==Pn&&g!==qn&&!b&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(et("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&et("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&et("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:x,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:v,maxSamples:w,samples:S}}function S_(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Wn,a=new pt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,x=i.get(u);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{let y=r?0:n,M=y*4,v=x.clippingState||null;l.value=v,v=h(m,f,M,d);for(let w=0;w!==M;++w)v[w]=t[w];x.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let x=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<x)&&(p=new Float32Array(x));for(let M=0,v=d;M!==_;++M,v+=4)o.copy(u[M]).applyMatrix4(y,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}var xa=class extends _n{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Uo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new mi(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:tr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wn,blending:yn});r.uniforms.tEquirect.value=t;let o=new Ut(s,r),a=t.minFilter;return t.minFilter===ri&&(t.minFilter=hn),new Wr(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},rp=256,M_=3,w_=20,Rp=256,Cp=16,T_=3,A_=new Y,E_=new Xe,Jr=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Wr(1,10,null),this._boxMesh=new Ut(new mi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=A_}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,m=l.autoClearStencil,_=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(e.background=l.getClearColor(E_));let p=new Wr(n,s,h);return p.position.copy(a),p.update(l,e),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=m,e.background=_,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ap(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(rp,yu(e))}_fromTexture(e,t){e.mapping===Qs||e.mapping===qr?this._setSize(e.image.length===0?rp:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=op(e,!1,!1),n=Math.log2(e)-M_;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=op(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Qs||e.mapping===qr?(this._cubemapMaterial===null&&(this._cubemapMaterial=lp()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ap()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=R_(),this._integrationMaterial=C_());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Cp);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-T_)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(Rp*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=P_());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function op(i,e,t){return new xa(i,{minFilter:ri,generateMipmaps:e,type:In,colorSpace:Un,depthBuffer:t})}function _a(i,e,t){return new dn({name:i,uniforms:e,vertexShader:bt.cube_vert,fragmentShader:t,side:wn,blending:yn,depthTest:!1,depthWrite:!1})}function R_(){return _a("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Rp}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function C_(){return _a("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Cp}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function P_(){return _a("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${w_}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ap(){return _a("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function lp(){return _a("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function I_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Xl||d===Yl)if(e.has(f)){let m=e.get(f).texture;return a(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let _=new xa(m.height);return _.fromEquirectangularTexture(i,f),e.set(f,_),f.addEventListener("dispose",c),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,m=d===Xl||d===Yl,_=d===Qs||d===qr;if(m||_){let p=t.get(f),x=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==x)return n===null&&(n=new Jr(i)),p=m?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{let y=f.image;return m&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new Jr(i)),p=m?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function a(f,d){return d===Xl?f.mapping=Qs:d===Yl&&(f.mapping=qr),f}function l(f){let d=0,m=6;for(let _=0;_<m;_++)f[_]!==void 0&&d++;return d===m}function c(f){let d=f.target;d.removeEventListener("dispose",c);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function L_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Gs("WebGLRenderer: "+n+" extension not supported."),s}}}function D_(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(m=>delete s[m]);function a(m){l(m.target)}function l(m){m.index!==null&&e.remove(m.index);for(let p in m.attributes)e.remove(m.attributes[p]);m.removeEventListener("dispose",a),delete s[m.id],o.unregister(m);let _=r.get(m);_&&(e.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function c(m,_){return s[_.id]!==void 0||(_.addEventListener("dispose",a),s[_.id]=new WeakRef(_),o.register(_,_.id,_),t.memory.geometries++),_}function h(m){let _=m.attributes;for(let p in _)e.update(_[p],i.ARRAY_BUFFER)}function u(m){let _=m.index,p=m.attributes.position,x=0;if(p===void 0)return;let y=_!==null?_.array.length:p.array.length/3-1,M=p.count>=65535?Co:Ro,v=new M(Math.ceil(y/3)*6,1),w=v.array;if(_!==null){let g=_.array;x=_.version;for(let b=0,L=0;b<y;b+=3){let I=g[b+0],P=g[b+1],T=g[b+2];w[L++]=I,w[L++]=P,w[L++]=P,w[L++]=T,w[L++]=T,w[L++]=I}}else{x=p.version;for(let g=0,b=0;g<y;g+=3){let L=g+0,I=g+1,P=g+2;w[b++]=L,w[b++]=I,w[b++]=I,w[b++]=P,w[b++]=P,w[b++]=L}}v.version=x;let S=r.get(m);S&&e.remove(S),r.set(m,v)}function f(m){let _=r.get(m);if(_){let p=m.index;p!==null&&_.version<p.version&&u(m)}else u(m);return r.get(m)}function d(){for(let m in s){let _=s[m].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function N_(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let _=0;for(let p=0;p<d;p++)_+=f[p];t.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function U_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:lt("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function O_(i,e,t){let n=new WeakMap,s=new Ot;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let L=function(){g.dispose(),n.delete(a),a.removeEventListener("dispose",L)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],M=0;d===!0&&(M=1),m===!0&&(M=2),_===!0&&(M=3);let v=a.attributes.position.count*M,w=1;v>e.maxTextureSize&&(w=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let S=new Float32Array(v*w*4*u),g=new Eo(S,v,w,u);g.type=qn,g.needsUpdate=!0;let b=M*4;for(let I=0;I<u;I++){let P=p[I],T=x[I],D=y[I],A=v*w*4*I;for(let N=0;N<P.count;N++){let z=N*b;d===!0&&(s.fromBufferAttribute(P,N),S[A+z+0]=s.x,S[A+z+1]=s.y,S[A+z+2]=s.z,S[A+z+3]=0),m===!0&&(s.fromBufferAttribute(T,N),S[A+z+4]=s.x,S[A+z+5]=s.y,S[A+z+6]=s.z,S[A+z+7]=0),_===!0&&(s.fromBufferAttribute(D,N),S[A+z+8]=s.x,S[A+z+9]=s.y,S[A+z+10]=s.z,S[A+z+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:g,size:new Ke(v,w)},n.set(a,f),a.addEventListener("dispose",L)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let m=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function F_(i,e,t,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var B_={[ta]:"LINEAR_TONE_MAPPING",[na]:"REINHARD_TONE_MAPPING",[ia]:"CINEON_TONE_MAPPING",[sa]:"ACES_FILMIC_TONE_MAPPING",[Js]:"AGX_TONE_MAPPING",[oa]:"NEUTRAL_TONE_MAPPING",[ra]:"CUSTOM_TONE_MAPPING"};function k_(i,e,t,n,s,r){let o=new _n(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new $t;h.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new zt([0,2,0,0,2,0],2));let u=new zr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Ut(h,u),d=new gi(-1,1,1,-1,0,1),m=null,_=null,p=!1,x,y=null,M=[],v=!1;this.setSize=function(w,S){o.setSize(w,S),a!==null&&a.setSize(w,S),l!==null&&l.setSize(w,S);for(let g=0;g<M.length;g++){let b=M[g];b.setSize&&b.setSize(w,S)}},this.setEffects=function(w){M=w,v=M.length>0&&M[0].isRenderPass===!0;let S=o.width,g=o.height;M.length>0&&a===null&&(a=new _n(S,g,{type:In,depthBuffer:!1,stencilBuffer:!1}),l=new _n(S,g,{type:In,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&M.some(L=>L.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&c===null&&(c=new pi(S,g),r===!0&&(c.format=yi,c.type=as)),o.dispose(),o.depthTexture=b?c:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let L=0;L<M.length;L++){let I=M[L];I.setSize&&I.setSize(S,g),b&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(c)}},this.begin=function(w,S){if(p||w.toneMapping===Ii&&M.length===0)return!1;if(y=S,S!==null){let g=S.width,b=S.height;(o.width!==g||o.height!==b)&&this.setSize(g,b)}return v===!1&&w.setRenderTarget(o),x=w.toneMapping,w.toneMapping=Ii,!0},this.hasRenderPass=function(){return v},this.end=function(w,S){w.toneMapping=x,p=!0;let g=o,b=a;for(let L=0;L<M.length;L++){let I=M[L];I.enabled!==!1&&(I.render(w,b,g,S),I.needsSwap!==!1&&(g=b,b=b===a?l:a))}if(m!==w.outputColorSpace||_!==w.toneMapping){m=w.outputColorSpace,_=w.toneMapping,u.defines={},_t.getTransfer(m)===Pt&&(u.defines.SRGB_TRANSFER="");let L=B_[_];L&&(u.defines[L]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=g.texture,w.setRenderTarget(y),w.render(f,d),y=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var Pp=new un,Ip=new pi(1,1),Lp=new Oo(1),Dp=new Eo,Np=new Pl,Up=new Uo,cp=[],hp=[],up=new Float32Array(16),dp=new Float32Array(9),fp=new Float32Array(4);function Qr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=cp[s];if(r===void 0&&(r=new Float32Array(s),cp[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function fn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function pn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Uc(i,e){let t=hp[e];t===void 0&&(t=new Int32Array(e),hp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function z_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function H_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;i.uniform2fv(this.addr,e),pn(t,e)}}function G_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(fn(t,e))return;i.uniform3fv(this.addr,e),pn(t,e)}}function V_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;i.uniform4fv(this.addr,e),pn(t,e)}}function W_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pn(t,e)}else{if(fn(t,n))return;fp.set(n),i.uniformMatrix2fv(this.addr,!1,fp),pn(t,n)}}function X_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pn(t,e)}else{if(fn(t,n))return;dp.set(n),i.uniformMatrix3fv(this.addr,!1,dp),pn(t,n)}}function Y_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pn(t,e)}else{if(fn(t,n))return;up.set(n),i.uniformMatrix4fv(this.addr,!1,up),pn(t,n)}}function q_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Z_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;i.uniform2iv(this.addr,e),pn(t,e)}}function $_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;i.uniform3iv(this.addr,e),pn(t,e)}}function K_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;i.uniform4iv(this.addr,e),pn(t,e)}}function j_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function J_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;i.uniform2uiv(this.addr,e),pn(t,e)}}function Q_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;i.uniform3uiv(this.addr,e),pn(t,e)}}function ey(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;i.uniform4uiv(this.addr,e),pn(t,e)}}function Oc(i){return i.version===0&&(i.compareFunction=mu,i.needsUpdate=!0),i}function ty(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Oc(Ip):r=Pp,t.setTexture2D(e||r,s)}function ny(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Np,s)}function iy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Oc(Lp):r=Up,t.setTextureCube(e||r,s)}function sy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Dp,s)}function ry(i){switch(i){case 5126:return z_;case 35664:return H_;case 35665:return G_;case 35666:return V_;case 35674:return W_;case 35675:return X_;case 35676:return Y_;case 5124:case 35670:return q_;case 35667:case 35671:return Z_;case 35668:case 35672:return $_;case 35669:case 35673:return K_;case 5125:return j_;case 36294:return J_;case 36295:return Q_;case 36296:return ey;case 35678:case 36198:case 36298:case 36306:case 35682:return ty;case 35679:case 36299:case 36307:return ny;case 35680:case 36300:case 36308:case 36293:return iy;case 36289:case 36303:case 36311:case 36292:return sy}}function oy(i,e){i.uniform1fv(this.addr,e)}function ay(i,e){let t=Qr(e,this.size,2);i.uniform2fv(this.addr,t)}function ly(i,e){let t=Qr(e,this.size,3);i.uniform3fv(this.addr,t)}function cy(i,e){let t=Qr(e,this.size,4);i.uniform4fv(this.addr,t)}function hy(i,e){let t=Qr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function uy(i,e){let t=Qr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function dy(i,e){let t=Qr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function fy(i,e){i.uniform1iv(this.addr,e)}function py(i,e){i.uniform2iv(this.addr,e)}function my(i,e){i.uniform3iv(this.addr,e)}function gy(i,e){i.uniform4iv(this.addr,e)}function xy(i,e){i.uniform1uiv(this.addr,e)}function _y(i,e){i.uniform2uiv(this.addr,e)}function yy(i,e){i.uniform3uiv(this.addr,e)}function vy(i,e){i.uniform4uiv(this.addr,e)}function by(i,e,t){let n=this.cache,s=e.length,r=Uc(t,s);fn(n,r)||(i.uniform1iv(this.addr,r),pn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Oc(Ip):o=Pp;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Sy(i,e,t){let n=this.cache,s=e.length,r=Uc(t,s);fn(n,r)||(i.uniform1iv(this.addr,r),pn(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Np,r[o])}function My(i,e,t){let n=this.cache,s=e.length,r=Uc(t,s);fn(n,r)||(i.uniform1iv(this.addr,r),pn(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Oc(Lp):o=Up;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function wy(i,e,t){let n=this.cache,s=e.length,r=Uc(t,s);fn(n,r)||(i.uniform1iv(this.addr,r),pn(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Dp,r[o])}function Ty(i){switch(i){case 5126:return oy;case 35664:return ay;case 35665:return ly;case 35666:return cy;case 35674:return hy;case 35675:return uy;case 35676:return dy;case 5124:case 35670:return fy;case 35667:case 35671:return py;case 35668:case 35672:return my;case 35669:case 35673:return gy;case 5125:return xy;case 36294:return _y;case 36295:return yy;case 36296:return vy;case 35678:case 36198:case 36298:case 36306:case 35682:return by;case 35679:case 36299:case 36307:return Sy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return wy}}var Ru=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ry(t.type)}},Cu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ty(t.type)}},Pu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Au=/(\w+)(\])?(\[|\.)?/g;function pp(i,e){i.seq.push(e),i.map[e.id]=e}function Ay(i,e,t){let n=i.name,s=n.length;for(Au.lastIndex=0;;){let r=Au.exec(n),o=Au.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){pp(t,c===void 0?new Ru(a,i,e):new Cu(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Pu(a),pp(t,u)),t=u}}}var jr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Ay(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function mp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Ey=37297,Ry=0;function Cy(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var gp=new pt;function Py(i){_t._getMatrix(gp,_t.workingColorSpace,i);let e=`mat3( ${gp.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(i)){case To:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return et("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function xp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Cy(i.getShaderSource(e),a)}else return r}function Iy(i,e){let t=Py(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Ly={[ta]:"Linear",[na]:"Reinhard",[ia]:"Cineon",[sa]:"ACESFilmic",[Js]:"AgX",[oa]:"Neutral",[ra]:"Custom"};function Dy(i,e){let t=Ly[e];return t===void 0?(et("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Dc=new Y;function Ny(){_t.getLuminanceCoefficients(Dc);let i=Dc.x.toFixed(4),e=Dc.y.toFixed(4),t=Dc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ga).join(`
`)}function Oy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ga(i){return i!==""}function _p(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function yp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var By=/^[ \t]*#include +<([\w\d./]+)>/gm;function Iu(i){return i.replace(By,ky)}function ky(i,e){let t=bt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Iu(t)}var zy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vp(i){return i.replace(zy,Hy)}function Hy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Gy={[Jo]:"SHADOWMAP_TYPE_PCF",[Xr]:"SHADOWMAP_TYPE_VSM"};function Vy(i){return Gy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Wy={[qr]:"ENVMAP_MODE_REFRACTION"};function Xy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Wy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Yy={[su]:"ENVMAP_BLENDING_MULTIPLY",[zf]:"ENVMAP_BLENDING_MIX",[Hf]:"ENVMAP_BLENDING_ADD"};function qy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Yy[i.combine]||"ENVMAP_BLENDING_NONE"}function Zy(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Vy(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Xy(t),u=qy(t),f=Uy(t),d=Oy(r),m=s.createProgram(),_,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(ga).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(ga).join(`
`),p.length>0&&(p+=`
`)):(_=[bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ga).join(`
`),p=[bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ii?"#define TONE_MAPPING":"",t.toneMapping!==Ii?bt.tonemapping_pars_fragment:"",t.toneMapping!==Ii?Dy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,Iy("linearToOutputTexel",t.outputColorSpace),Ny(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ga).join(`
`)),o=Iu(o),o=_p(o,t),o=yp(o,t),a=Iu(a),a=_p(a,t),a=yp(a,t),o=vp(o),a=vp(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,_=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=x+_+o,M=x+p+a,v=mp(s,s.VERTEX_SHADER,y),w=mp(s,s.FRAGMENT_SHADER,M);s.attachShader(m,v),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function S(I){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(m)||"",T=s.getShaderInfoLog(v)||"",D=s.getShaderInfoLog(w)||"",A=P.trim(),N=T.trim(),z=D.trim(),O=!0,$=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,v,w);else{let B=xp(s,v,"vertex"),V=xp(s,w,"fragment");lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+A+`
`+B+`
`+V)}else A!==""?et("WebGLProgram: Program Info Log:",A):(N===""||z==="")&&($=!1);$&&(I.diagnostics={runnable:O,programLog:A,vertexShader:{log:N,prefix:_},fragmentShader:{log:z,prefix:p}})}s.deleteShader(v),s.deleteShader(w),g=new jr(s,m),b=Fy(s,m)}let g;this.getUniforms=function(){return g===void 0&&S(this),g};let b;this.getAttributes=function(){return b===void 0&&S(this),b};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(m,Ey)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ry++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=v,this.fragmentShader=w,this}var $y=0,Lu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Du(e),t.set(e,n)),n}},Du=class{constructor(e){this.id=$y++,this.code=e,this.usedTimes=0}};function Ky(i){return i===Ts||i===ua||i===da}function jy(i,e,t,n,s,r){let o=new Dr,a=new Lu,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(g){return l.add(g),g===0?"uv":`uv${g}`}function m(g,b,L,I,P,T){let D=I.fog,A=P.geometry,N=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?I.environment:null,z=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,O=e.get(g.envMap||N,z),$=f[g.type],B=n.precision;g.precision!==null&&(B=n.getMaxPrecision(g.precision),B!==g.precision&&et("WebGLProgram.getParameters:",g.precision,"not supported, using",B,"instead."));let V=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,J=V!==void 0?V.length:0,ue=0;A.morphAttributes.position!==void 0&&(ue=1),A.morphAttributes.normal!==void 0&&(ue=2),A.morphAttributes.color!==void 0&&(ue=3);let xe,te,pe,ge;if($){let Le=Ni[$];xe=Le.vertexShader,te=Le.fragmentShader}else{xe=g.vertexShader,te=g.fragmentShader;let Le=a.getVertexShaderStage(g),Rt=a.getFragmentShaderStage(g);a.update(g,Le,Rt),pe=Le.id,ge=Rt.id}let De=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),Ge=P.isInstancedMesh===!0,gt=P.isBatchedMesh===!0,qe=!!g.map,tt=!!g.matcap,ct=!!O,je=ct&&O.isPMREMTexture===!0,ke=!!g.aoMap,nt=!!g.lightMap,Et=!!g.bumpMap&&g.wireframe===!1,ht=!!g.normalMap,Ht=!!g.displacementMap,at=!!g.emissiveMap,At=!!g.metalnessMap,Ft=!!g.roughnessMap,Be=g.anisotropy>0,F=g.clearcoat>0,ot=g.diffuseRoughness>0,Ue=g.dispersion>0,Ze=g.retroreflectivity>0,_e=g.iridescence>0,st=g.sheen>0,Ne=g.transmission>0,Ye=Be&&!!g.anisotropyMap,U=F&&!!g.clearcoatMap,E=F&&!!g.clearcoatNormalMap,K=F&&!!g.clearcoatRoughnessMap,fe=ot&&!!g.diffuseRoughnessMap,oe=_e&&!!g.iridescenceMap,Ae=_e&&!!g.iridescenceThicknessMap,Te=st&&!!g.sheenColorMap,re=st&&!!g.sheenRoughnessMap,ae=!!g.specularMap,Me=!!g.specularColorMap,k=!!g.specularIntensityMap,ce=Ne&&!!g.transmissionMap,le=Ne&&!!g.thicknessMap,Ee=!!g.gradientMap,Se=!!g.alphaMap,Re=g.alphaTest>0,Je=!!g.alphaHash,ut=!!g.extensions,be=Ii;g.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(be=i.toneMapping);let Qe=je?O.isCompressedCubeTexture?O.image[0].mipmaps:O.mipmaps:null,dt={shaderID:$,shaderType:g.type,shaderName:g.name,vertexShader:xe,fragmentShader:te,defines:g.defines,customVertexShaderID:pe,customFragmentShaderID:ge,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:B,batching:gt,batchingColor:gt&&P._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&P.instanceColor!==null,instancingMorph:Ge&&P.morphTexture!==null,outputColorSpace:De===null?i.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:qe,matcap:tt,envMap:ct,envMapMode:ct&&O.mapping,envMapPMREM:je,envMapMaxLod:je?Qe.length-1:null,envMapSize:je?Qe[0].width:null,aoMap:ke,lightMap:nt,bumpMap:Et,normalMap:ht,displacementMap:Ht,emissiveMap:at,normalMapObjectSpace:ht&&g.normalMapType===Xf,normalMapTangentSpace:ht&&g.normalMapType===pa,packedNormalMap:ht&&g.normalMapType===pa&&Ky(g.normalMap.format),metalnessMap:At,roughnessMap:Ft,anisotropy:Be,anisotropyMap:Ye,clearcoat:F,clearcoatMap:U,clearcoatNormalMap:E,clearcoatRoughnessMap:K,diffuseRoughness:ot,diffuseRoughnessMap:fe,dispersion:Ue,retroreflection:Ze,iridescence:_e,iridescenceMap:oe,iridescenceThicknessMap:Ae,sheen:st,sheenColorMap:Te,sheenRoughnessMap:re,specularMap:ae,specularColorMap:Me,specularIntensityMap:k,transmission:Ne,transmissionMap:ce,thicknessMap:le,gradientMap:Ee,opaque:g.transparent===!1&&g.blending===Yr&&g.alphaToCoverage===!1,alphaMap:Se,alphaTest:Re,alphaHash:Je,combine:g.combine,mapUv:qe&&d(g.map.channel),aoMapUv:ke&&d(g.aoMap.channel),lightMapUv:nt&&d(g.lightMap.channel),bumpMapUv:Et&&d(g.bumpMap.channel),normalMapUv:ht&&d(g.normalMap.channel),displacementMapUv:Ht&&d(g.displacementMap.channel),emissiveMapUv:at&&d(g.emissiveMap.channel),metalnessMapUv:At&&d(g.metalnessMap.channel),roughnessMapUv:Ft&&d(g.roughnessMap.channel),anisotropyMapUv:Ye&&d(g.anisotropyMap.channel),clearcoatMapUv:U&&d(g.clearcoatMap.channel),clearcoatNormalMapUv:E&&d(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&d(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:fe&&d(g.diffuseRoughnessMap.channel),iridescenceMapUv:oe&&d(g.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&d(g.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&d(g.sheenColorMap.channel),sheenRoughnessMapUv:re&&d(g.sheenRoughnessMap.channel),specularMapUv:ae&&d(g.specularMap.channel),specularColorMapUv:Me&&d(g.specularColorMap.channel),specularIntensityMapUv:k&&d(g.specularIntensityMap.channel),transmissionMapUv:ce&&d(g.transmissionMap.channel),thicknessMapUv:le&&d(g.thicknessMap.channel),alphaMapUv:Se&&d(g.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(ht||Be),vertexNormals:!!A.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!A.attributes.uv&&(qe||Se),fog:!!D,useFog:g.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||A.attributes.normal===void 0&&ht===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ye,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:A.attributes.position!==void 0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ue,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:T.filter(Le=>Le.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:be,decodeVideoTexture:qe&&g.map.isVideoTexture===!0&&_t.getTransfer(g.map.colorSpace)===Pt,decodeVideoTextureEmissive:at&&g.emissiveMap.isVideoTexture===!0&&_t.getTransfer(g.emissiveMap.colorSpace)===Pt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===ii,flipSided:g.side===wn,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ut&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&g.extensions.multiDraw===!0||gt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return dt.vertexUv1s=l.has(1),dt.vertexUv2s=l.has(2),dt.vertexUv3s=l.has(3),l.clear(),dt}function _(g){let b=[];if(g.shaderID?b.push(g.shaderID):(b.push(g.customVertexShaderID),b.push(g.customFragmentShaderID)),g.defines!==void 0)for(let L in g.defines)b.push(L),b.push(g.defines[L]);return g.isRawShaderMaterial===!1&&(p(b,g),x(b,g),b.push(i.outputColorSpace)),b.push(g.customProgramCacheKey),b.join()}function p(g,b){g.push(b.precision),g.push(b.outputColorSpace),g.push(b.envMapMode),g.push(b.envMapPMREM),g.push(b.envMapMaxLod),g.push(b.envMapSize),g.push(b.mapUv),g.push(b.alphaMapUv),g.push(b.lightMapUv),g.push(b.aoMapUv),g.push(b.bumpMapUv),g.push(b.normalMapUv),g.push(b.displacementMapUv),g.push(b.emissiveMapUv),g.push(b.metalnessMapUv),g.push(b.roughnessMapUv),g.push(b.anisotropyMapUv),g.push(b.clearcoatMapUv),g.push(b.clearcoatNormalMapUv),g.push(b.clearcoatRoughnessMapUv),g.push(b.diffuseRoughnessMapUv),g.push(b.iridescenceMapUv),g.push(b.iridescenceThicknessMapUv),g.push(b.sheenColorMapUv),g.push(b.sheenRoughnessMapUv),g.push(b.specularMapUv),g.push(b.specularColorMapUv),g.push(b.specularIntensityMapUv),g.push(b.transmissionMapUv),g.push(b.thicknessMapUv),g.push(b.combine),g.push(b.fogExp2),g.push(b.sizeAttenuation),g.push(b.morphTargetsCount),g.push(b.numSunLights),g.push(b.numDirLights),g.push(b.numPointLights),g.push(b.numSpotLights),g.push(b.numSpotLightMaps),g.push(b.numHemiLights),g.push(b.numRectAreaLights),g.push(b.numSunLightShadows),g.push(b.numDirLightShadows),g.push(b.numPointLightShadows),g.push(b.numSpotLightShadows),g.push(b.numSpotLightShadowsWithMaps),g.push(b.numLightProbes),g.push(b.numLightProbeGrids),g.push(b.shadowMapType),g.push(b.toneMapping),g.push(b.numClippingPlanes),g.push(b.numClipIntersection),g.push(b.depthPacking)}function x(g,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),g.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),g.push(o.mask)}function y(g){let b=f[g.type],L;if(b){let I=Ni[b];L=oi.clone(I.uniforms)}else L=g.uniforms;return L}function M(g,b){let L=h.get(b);return L!==void 0?++L.usedTimes:(L=new Zy(i,b,g,s),c.push(L),h.set(b,L)),L}function v(g){if(--g.usedTimes===0){let b=c.indexOf(g);c[b]=c[c.length-1],c.pop(),h.delete(g.cacheKey),g.destroy()}}function w(g){a.remove(g)}function S(){a.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:y,acquireProgram:M,releaseProgram:v,releaseShaderCache:w,programs:c,dispose:S}}function Jy(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Qy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Sp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Mp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,m,_,p,x){let y=i[e];return y===void 0?(y={id:f.id,object:f,geometry:d,material:m,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:p,group:x},i[e]=y):(y.id=f.id,y.object=f,y.geometry=d,y.material=m,y.materialVariant=o(f),y.groupOrder=_,y.renderOrder=f.renderOrder,y.z=p,y.group=x),e++,y}function l(f,d,m,_,p,x,y){y.reversedDepth===!0&&(p=-p);let M=a(f,d,m,_,p,x);m.transmission>0?n.push(M):m.transparent===!0?s.push(M):t.push(M)}function c(f,d,m,_,p,x){let y=a(f,d,m,_,p,x);m.transmission>0?n.unshift(y):m.transparent===!0?s.unshift(y):t.unshift(y)}function h(f,d){t.length>1&&t.sort(f||Qy),n.length>1&&n.sort(d||Sp),s.length>1&&s.sort(d||Sp)}function u(){for(let f=e,d=i.length;f<d;f++){let m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function ev(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Mp,i.set(n,[o])):s>=r.length?(o=new Mp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function tv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Y,color:new Xe};break;case"SpotLight":t={position:new Y,direction:new Y,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return i[e.id]=t,t}}}function nv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var iv=0;function sv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function rv(i){let e=new tv,t=nv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Y);let s=new Y,r=new rt,o=new rt;function a(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,m=0,_=0,p=0,x=0,y=0,M=0,v=0,w=0,S=0,g=0,b=0,L=0,I=0;c.sort(sv);for(let T=0,D=c.length;T<D;T++){let A=c[T],N=A.color,z=A.intensity,O=A.distance,$=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Ts?$=A.shadow.map.texture:$=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)h+=N.r*z,u+=N.g*z,f+=N.b*z;else if(A.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(A.sh.coefficients[B],z);I++}else if(A.isSunLight){let B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let V=A.shadow,J=t.get(A);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),n.sunShadow[m]=J,n.sunShadowMap[m]=$;let ue=V.getViewportCount();for(let xe=0;xe<ue;xe++)n.sunShadowMatrix[_+xe]=V.getMatrix(xe),n.sunShadowCascade[_+xe]=V._cascadeData[xe];_+=ue,m++}n.sun[d]=B,d++}else if(A.isDirectionalLight){let B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let V=A.shadow,J=t.get(A);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize=V.mapSize,n.directionalShadow[p]=J,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=A.shadow.matrix,w++}n.directional[p]=B,p++}else if(A.isSpotLight){let B=e.get(A);B.position.setFromMatrixPosition(A.matrixWorld),B.color.copy(N).multiplyScalar(z),B.distance=O,B.coneCos=Math.cos(A.angle),B.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),B.decay=A.decay,n.spot[y]=B;let V=A.shadow;if(A.map&&(n.spotLightMap[b]=A.map,b++,V.updateMatrices(A),A.castShadow&&L++),n.spotLightMatrix[y]=V.matrix,A.castShadow){let J=t.get(A);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize=V.mapSize,n.spotShadow[y]=J,n.spotShadowMap[y]=$,g++}y++}else if(A.isRectAreaLight){let B=e.get(A);B.color.copy(N).multiplyScalar(z),B.halfWidth.set(A.width*.5,0,0),B.halfHeight.set(0,A.height*.5,0),n.rectArea[M]=B,M++}else if(A.isPointLight){let B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),B.distance=A.distance,B.decay=A.decay,A.castShadow){let V=A.shadow,J=t.get(A);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize=V.mapSize,J.shadowCameraNear=V.camera.near,J.shadowCameraFar=V.camera.far,n.pointShadow[x]=J,n.pointShadowMap[x]=$,n.pointShadowMatrix[x]=A.shadow.matrix,S++}n.point[x]=B,x++}else if(A.isHemisphereLight){let B=e.get(A);B.skyColor.copy(A.color).multiplyScalar(z),B.groundColor.copy(A.groundColor).multiplyScalar(z),n.hemi[v]=B,v++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Fe.LTC_FLOAT_1,n.rectAreaLTC2=Fe.LTC_FLOAT_2):(n.rectAreaLTC1=Fe.LTC_HALF_1,n.rectAreaLTC2=Fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let P=n.hash;(P.sunLength!==d||P.directionalLength!==p||P.pointLength!==x||P.spotLength!==y||P.rectAreaLength!==M||P.hemiLength!==v||P.numSunShadows!==m||P.numDirectionalShadows!==w||P.numPointShadows!==S||P.numSpotShadows!==g||P.numSpotMaps!==b||P.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=p,n.spot.length=y,n.rectArea.length=M,n.point.length=x,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+b-L,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=I,P.sunLength=d,P.directionalLength=p,P.pointLength=x,P.spotLength=y,P.rectAreaLength=M,P.hemiLength=v,P.numSunShadows=m,P.numDirectionalShadows=w,P.numPointShadows=S,P.numSpotShadows=g,P.numSpotMaps=b,P.numLightProbes=I,n.version=iv++)}function l(c,h){let u=0,f=0,d=0,m=0,_=0,p=0,x=h.matrixWorldInverse;for(let y=0,M=c.length;y<M;y++){let v=c[y];if(v.isSunLight){let w=n.sun[u];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(x),u++}else if(v.isDirectionalLight){let w=n.directional[f];w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(x),f++}else if(v.isSpotLight){let w=n.spot[m];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(x),w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(x),m++}else if(v.isRectAreaLight){let w=n.rectArea[_];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(x),o.identity(),r.copy(v.matrixWorld),r.premultiply(x),o.extractRotation(r),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let w=n.point[d];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(x),d++}else if(v.isHemisphereLight){let w=n.hemi[p];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(x),p++}}}return{setup:a,setupView:l,state:n}}function wp(i){let e=new rv(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function l(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function ov(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new wp(i),e.set(s,[a])):r>=o.length?(a=new wp(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cv=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],hv=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Tp=new rt,ma=new Y,Eu=new Y;function uv(i,e,t){let n=new vs,s=new Ke,r=new Ke,o=new Ot,a=new Nl,l=new Ul,c={},h=t.maxTextureSize,u={[Yn]:wn,[wn]:Yn,[ii]:ii},f=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:av,fragmentShader:lv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new $t;m.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ut(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let x=this.type;this.render=function(S,g,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===Vl&&(et("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Jo);let L=i.getRenderTarget(),I=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),T=i.state;T.setBlending(yn),T.buffers.depth.getReversed()===!0?T.buffers.color.setClear(0,0,0,0):T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);let D=x!==this.type;D&&g.traverse(function(A){A.material&&(Array.isArray(A.material)?A.material.forEach(N=>N.needsUpdate=!0):A.material.needsUpdate=!0)});for(let A=0,N=S.length;A<N;A++){let z=S[A],O=z.shadow;if(O===void 0){et("WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let $=O.getFrameExtents();s.multiply($),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,O.mapSize.y=r.y));let B=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=B,O.map===null||D===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Xr){if(z.isPointLight){et("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new _n(s.x,s.y,{format:Ts,type:In,minFilter:hn,magFilter:hn,generateMipmaps:!1}),O.map.texture.name=z.name+".shadowMap",O.map.depthTexture=new pi(s.x,s.y,qn),O.map.depthTexture.name=z.name+".shadowMapDepth",O.map.depthTexture.format=Ji,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Wt,O.map.depthTexture.magFilter=Wt}else z.isPointLight?(O.map=new xa(s.x),O.map.depthTexture=new Oo(s.x,_i)):(O.map=new _n(s.x,s.y),O.map.depthTexture=new pi(s.x,s.y,_i)),O.map.depthTexture.name=z.name+".shadowMap",O.map.depthTexture.format=Ji,this.type===Jo?(O.map.depthTexture.compareFunction=B?pu:fu,O.map.depthTexture.minFilter=hn,O.map.depthTexture.magFilter=hn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Wt,O.map.depthTexture.magFilter=Wt);O.camera.updateProjectionMatrix()}O.map.isWebGLCubeRenderTarget!==!0&&(O.map.width!==s.x||O.map.height!==s.y)&&O.map.setSize(s.x,s.y);let V=O.map.isWebGLCubeRenderTarget?6:O.getViewportCount();z.isPointLight!==!0&&O.updateMatrices(z,b);let J=(O.camera.layers.mask&4294967294)!==0?O.camera.layers:b.layers;for(let ue=0;ue<V;ue++){let xe=O.getCamera(ue);if(z.isPointLight){let te=O.camera,pe=O.matrix,ge=z.distance||te.far;ge!==te.far&&(te.far=ge,te.updateProjectionMatrix()),ma.setFromMatrixPosition(z.matrixWorld),te.position.copy(ma),Eu.copy(te.position),Eu.add(cv[ue]),te.up.copy(hv[ue]),te.lookAt(Eu),te.updateMatrixWorld(),pe.makeTranslation(-ma.x,-ma.y,-ma.z),Tp.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Tp,te.coordinateSystem,te.reversedDepth)}if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,ue),i.clear();else{ue===0&&(i.setRenderTarget(O.map),i.clear());let te=O.getViewport(ue);o.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),T.viewport(o)}n=O.getFrustum(ue),v(g,b,xe,z,J,this.type)}O.isPointLightShadow!==!0&&this.type===Xr&&y(O,b),O.needsUpdate=!1}x=this.type,p.needsUpdate=!1,i.setRenderTarget(L,I,P)};function y(S,g){let b=e.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new _n(s.x,s.y,{format:Ts,type:In}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(g,null,b,f,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(g,null,b,d,_,null)}function M(S,g,b,L){let I=null,P=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)I=P;else if(I=b.isPointLight===!0?l:a,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){let T=I.uuid,D=g.uuid,A=c[T];A===void 0&&(A={},c[T]=A);let N=A[D];N===void 0&&(N=I.clone(),A[D]=N,g.addEventListener("dispose",w)),I=N}if(I.visible=g.visible,I.wireframe=g.wireframe,L===Xr?I.side=g.shadowSide!==null?g.shadowSide:g.side:I.side=g.shadowSide!==null?g.shadowSide:u[g.side],I.alphaMap=g.alphaMap,I.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,I.map=g.map,I.clipShadows=g.clipShadows,I.clippingPlanes=g.clippingPlanes,I.clipIntersection=g.clipIntersection,I.displacementMap=g.displacementMap,I.displacementScale=g.displacementScale,I.displacementBias=g.displacementBias,I.wireframeLinewidth=g.wireframeLinewidth,I.linewidth=g.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let T=i.properties.get(I);T.light=b}return I}function v(S,g,b,L,I,P){if(S.visible===!1)return;if(S.layers.test(I)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Xr)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);let A=e.update(S),N=S.material;if(Array.isArray(N)){let z=A.groups;for(let O=0,$=z.length;O<$;O++){let B=z[O],V=N[B.materialIndex];if(V&&V.visible){let J=M(S,V,L,P);S.onBeforeShadow(i,S,g,b,A,J,B),i.renderBufferDirect(b,null,A,J,S,B),S.onAfterShadow(i,S,g,b,A,J,B)}}}else if(N.visible){let z=M(S,N,L,P);S.onBeforeShadow(i,S,g,b,A,z,null),i.renderBufferDirect(b,null,A,z,S,null),S.onAfterShadow(i,S,g,b,A,z,null)}}let D=S.children;for(let A=0,N=D.length;A<N;A++)v(D[A],g,b,L,I,P)}function w(S){S.target.removeEventListener("dispose",w);for(let b in c){let L=c[b],I=S.target.uuid;I in L&&(L[I].dispose(),delete L[I])}}}function dv(i,e){function t(){let k=!1,ce=new Ot,le=null,Ee=new Ot(0,0,0,0);return{setMask:function(Se){le!==Se&&!k&&(i.colorMask(Se,Se,Se,Se),le=Se)},setLocked:function(Se){k=Se},setClear:function(Se,Re,Je,ut,be){be===!0&&(Se*=ut,Re*=ut,Je*=ut),ce.set(Se,Re,Je,ut),Ee.equals(ce)===!1&&(i.clearColor(Se,Re,Je,ut),Ee.copy(ce))},reset:function(){k=!1,le=null,Ee.set(-1,0,0,0)}}}function n(){let k=!1,ce=!1,le=null,Ee=null,Se=null;return{setReversed:function(Re){if(ce!==Re){let Je=e.get("EXT_clip_control");Re?Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.ZERO_TO_ONE_EXT):Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.NEGATIVE_ONE_TO_ONE_EXT),ce=Re;let ut=Se;Se=null,this.setClear(ut)}},getReversed:function(){return ce},setTest:function(Re){Re?ye(i.DEPTH_TEST):Ge(i.DEPTH_TEST)},setMask:function(Re){le!==Re&&!k&&(i.depthMask(Re),le=Re)},setFunc:function(Re){if(ce&&(Re=tp[Re]),Ee!==Re){switch(Re){case bl:i.depthFunc(i.NEVER);break;case Sl:i.depthFunc(i.ALWAYS);break;case Ml:i.depthFunc(i.LESS);break;case Er:i.depthFunc(i.LEQUAL);break;case wl:i.depthFunc(i.EQUAL);break;case Tl:i.depthFunc(i.GEQUAL);break;case Al:i.depthFunc(i.GREATER);break;case El:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=Re}},setLocked:function(Re){k=Re},setClear:function(Re){Se!==Re&&(Se=Re,ce&&(Re=1-Re),i.clearDepth(Re))},reset:function(){k=!1,le=null,Ee=null,Se=null,ce=!1}}}function s(){let k=!1,ce=null,le=null,Ee=null,Se=null,Re=null,Je=null,ut=null,be=null;return{setTest:function(Qe){k||(Qe?ye(i.STENCIL_TEST):Ge(i.STENCIL_TEST))},setMask:function(Qe){ce!==Qe&&!k&&(i.stencilMask(Qe),ce=Qe)},setFunc:function(Qe,dt,Le){(le!==Qe||Ee!==dt||Se!==Le)&&(i.stencilFunc(Qe,dt,Le),le=Qe,Ee=dt,Se=Le)},setOp:function(Qe,dt,Le){(Re!==Qe||Je!==dt||ut!==Le)&&(i.stencilOp(Qe,dt,Le),Re=Qe,Je=dt,ut=Le)},setLocked:function(Qe){k=Qe},setClear:function(Qe){be!==Qe&&(i.clearStencil(Qe),be=Qe)},reset:function(){k=!1,ce=null,le=null,Ee=null,Se=null,Re=null,Je=null,ut=null,be=null}}}let r=new t,o=new n,a=new s,l={},c=new WeakMap,h={},u={},f={},d=new WeakMap,m=[],_=null,p=!1,x=null,y=null,M=null,v=null,w=null,S=null,g=null,b=new Xe(0,0,0),L=0,I=!1,P=null,T=null,D=null,A=null,N=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,$=0,B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(B)[1]),O=$>=1):B.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),O=$>=2);let V=null,J={},ue=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),te=new Ot().fromArray(ue),pe=new Ot().fromArray(xe);function ge(k,ce,le,Ee){let Se=new Uint8Array(4),Re=i.createTexture();i.bindTexture(k,Re),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Je=0;Je<le;Je++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(ce+Je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Re}let De={};De[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ye(i.DEPTH_TEST),o.setFunc(Er),Et(!1),ht(Jh),ye(i.CULL_FACE),ke(yn);function ye(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ge(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function gt(k,ce){return f[k]!==ce?(i.bindFramebuffer(k,ce),f[k]=ce,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ce),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function qe(k,ce){let le=m,Ee=!1;if(k){le=d.get(ce),le===void 0&&(le=[],d.set(ce,le));let Se=k.textures;if(le.length!==Se.length||le[0]!==i.COLOR_ATTACHMENT0){for(let Re=0,Je=Se.length;Re<Je;Re++)le[Re]=i.COLOR_ATTACHMENT0+Re;le.length=Se.length,Ee=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(le)}function tt(k){return _!==k?(i.useProgram(k),_=k,!0):!1}let ct={[si]:i.FUNC_ADD,[Af]:i.FUNC_SUBTRACT,[Ef]:i.FUNC_REVERSE_SUBTRACT};ct[Rf]=i.MIN,ct[Cf]=i.MAX;let je={[js]:i.ZERO,[Pf]:i.ONE,[If]:i.SRC_COLOR,[nu]:i.SRC_ALPHA,[Uf]:i.SRC_ALPHA_SATURATE,[ea]:i.DST_COLOR,[Qo]:i.DST_ALPHA,[Lf]:i.ONE_MINUS_SRC_COLOR,[iu]:i.ONE_MINUS_SRC_ALPHA,[Nf]:i.ONE_MINUS_DST_COLOR,[Df]:i.ONE_MINUS_DST_ALPHA,[Of]:i.CONSTANT_COLOR,[Ff]:i.ONE_MINUS_CONSTANT_COLOR,[Bf]:i.CONSTANT_ALPHA,[kf]:i.ONE_MINUS_CONSTANT_ALPHA};function ke(k,ce,le,Ee,Se,Re,Je,ut,be,Qe){if(k===yn){p===!0&&(Ge(i.BLEND),p=!1);return}if(p===!1&&(ye(i.BLEND),p=!0),k!==Wl){if(k!==x||Qe!==I){if((y!==si||w!==si)&&(i.blendEquation(i.FUNC_ADD),y=si,w=si),Qe)switch(k){case Yr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qh:i.blendFunc(i.ONE,i.ONE);break;case eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:lt("WebGLState: Invalid blending: ",k);break}else switch(k){case Yr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case eu:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tu:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",k);break}M=null,v=null,S=null,g=null,b.set(0,0,0),L=0,x=k,I=Qe}return}Se=Se||ce,Re=Re||le,Je=Je||Ee,(ce!==y||Se!==w)&&(i.blendEquationSeparate(ct[ce],ct[Se]),y=ce,w=Se),(le!==M||Ee!==v||Re!==S||Je!==g)&&(i.blendFuncSeparate(je[le],je[Ee],je[Re],je[Je]),M=le,v=Ee,S=Re,g=Je),(ut.equals(b)===!1||be!==L)&&(i.blendColor(ut.r,ut.g,ut.b,be),b.copy(ut),L=be),x=k,I=!1}function nt(k,ce){k.side===ii?Ge(i.CULL_FACE):ye(i.CULL_FACE);let le=k.side===wn;ce&&(le=!le),Et(le),k.blending===Yr&&k.transparent===!1?ke(yn):ke(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);let Ee=k.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),at(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ye(i.SAMPLE_ALPHA_TO_COVERAGE):Ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function Et(k){P!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),P=k)}function ht(k){k!==wf?(ye(i.CULL_FACE),k!==T&&(k===Jh?i.cullFace(i.BACK):k===Tf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ge(i.CULL_FACE),T=k}function Ht(k){k!==D&&(O&&i.lineWidth(k),D=k)}function at(k,ce,le){k?(ye(i.POLYGON_OFFSET_FILL),(A!==ce||N!==le)&&(A=ce,N=le,o.getReversed()&&(ce=-ce,le=-le),i.polygonOffset(ce,le))):Ge(i.POLYGON_OFFSET_FILL)}function At(k){k?ye(i.SCISSOR_TEST):Ge(i.SCISSOR_TEST)}function Ft(k){k===void 0&&(k=i.TEXTURE0+z-1),V!==k&&(i.activeTexture(k),V=k)}function Be(k,ce,le){le===void 0&&(V===null?le=i.TEXTURE0+z-1:le=V);let Ee=J[le];Ee===void 0&&(Ee={type:void 0,texture:void 0},J[le]=Ee),(Ee.type!==k||Ee.texture!==ce)&&(V!==le&&(i.activeTexture(le),V=le),i.bindTexture(k,ce||De[k]),Ee.type=k,Ee.texture=ce)}function F(){let k=J[V];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ot(){try{i.compressedTexImage2D(...arguments)}catch(k){lt("WebGLState:",k)}}function Ue(){try{i.compressedTexImage3D(...arguments)}catch(k){lt("WebGLState:",k)}}function Ze(){try{i.texSubImage2D(...arguments)}catch(k){lt("WebGLState:",k)}}function _e(){try{i.texSubImage3D(...arguments)}catch(k){lt("WebGLState:",k)}}function st(){try{i.compressedTexSubImage2D(...arguments)}catch(k){lt("WebGLState:",k)}}function Ne(){try{i.compressedTexSubImage3D(...arguments)}catch(k){lt("WebGLState:",k)}}function Ye(){try{i.texStorage2D(...arguments)}catch(k){lt("WebGLState:",k)}}function U(){try{i.texStorage3D(...arguments)}catch(k){lt("WebGLState:",k)}}function E(){try{i.texImage2D(...arguments)}catch(k){lt("WebGLState:",k)}}function K(){try{i.texImage3D(...arguments)}catch(k){lt("WebGLState:",k)}}function fe(k){return u[k]!==void 0?u[k]:i.getParameter(k)}function oe(k,ce){u[k]!==ce&&(i.pixelStorei(k,ce),u[k]=ce)}function Ae(k){te.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),te.copy(k))}function Te(k){pe.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),pe.copy(k))}function re(k,ce){let le=c.get(ce);le===void 0&&(le=new WeakMap,c.set(ce,le));let Ee=le.get(k);Ee===void 0&&(Ee=i.getUniformBlockIndex(ce,k.name),i.uniformBlockBinding(ce,Ee,Ee),le.set(k,Ee))}function ae(k,ce,le){let Se=c.get(ce).get(k);l[Se]!==le&&(i.bindBufferBase(i.UNIFORM_BUFFER,Se,le),l[Se]=le)}function Me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},V=null,J={},f={},l={},d=new WeakMap,m=[],_=null,p=!1,x=null,y=null,M=null,v=null,w=null,S=null,g=null,b=new Xe(0,0,0),L=0,I=!1,P=null,T=null,D=null,A=null,N=null,te.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ye,disable:Ge,bindFramebuffer:gt,drawBuffers:qe,useProgram:tt,setBlending:ke,setMaterial:nt,setFlipSided:Et,setCullFace:ht,setLineWidth:Ht,setPolygonOffset:at,setScissorTest:At,activeTexture:Ft,bindTexture:Be,unbindTexture:F,compressedTexImage2D:ot,compressedTexImage3D:Ue,texImage2D:E,texImage3D:K,pixelStorei:oe,getParameter:fe,updateUBOMapping:re,uniformBlockBinding:ae,texStorage2D:Ye,texStorage3D:U,texSubImage2D:Ze,texSubImage3D:_e,compressedTexSubImage2D:st,compressedTexSubImage3D:Ne,scissor:Ae,viewport:Te,reset:Me}}function fv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ke,h=new WeakMap,u=new Set,f,d=new WeakMap,m=new Set,_=new FinalizationRegistry(U=>m.delete(U)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(U,E){return p?new OffscreenCanvas(U,E):Pr("canvas")}function y(U,E,K){let fe=1,oe=Ye(U);if((oe.width>K||oe.height>K)&&(fe=K/Math.max(oe.width,oe.height)),fe<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){let Ae=Math.floor(fe*oe.width),Te=Math.floor(fe*oe.height);f===void 0&&(f=x(Ae,Te));let re=E?x(Ae,Te):f;return re.width=Ae,re.height=Te,re.getContext("2d").drawImage(U,0,0,Ae,Te),et("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+Ae+"x"+Te+")."),re}else return"data"in U&&et("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),U;return U}function M(U){return U.generateMipmaps}function v(U){i.generateMipmap(U)}function w(U){return U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?i.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(U,E,K,fe,oe,Ae=!1){if(U!==null){if(i[U]!==void 0)return i[U];et("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let Te;fe&&(Te=e.get("EXT_texture_norm16"),Te||et("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=E;if(E===i.RED&&(K===i.FLOAT&&(re=i.R32F),K===i.HALF_FLOAT&&(re=i.R16F),K===i.UNSIGNED_BYTE&&(re=i.R8),K===i.UNSIGNED_SHORT&&Te&&(re=Te.R16_EXT),K===i.SHORT&&Te&&(re=Te.R16_SNORM_EXT)),E===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.R8UI),K===i.UNSIGNED_SHORT&&(re=i.R16UI),K===i.UNSIGNED_INT&&(re=i.R32UI),K===i.BYTE&&(re=i.R8I),K===i.SHORT&&(re=i.R16I),K===i.INT&&(re=i.R32I)),E===i.RG&&(K===i.FLOAT&&(re=i.RG32F),K===i.HALF_FLOAT&&(re=i.RG16F),K===i.UNSIGNED_BYTE&&(re=i.RG8),K===i.UNSIGNED_SHORT&&Te&&(re=Te.RG16_EXT),K===i.SHORT&&Te&&(re=Te.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.RG8UI),K===i.UNSIGNED_SHORT&&(re=i.RG16UI),K===i.UNSIGNED_INT&&(re=i.RG32UI),K===i.BYTE&&(re=i.RG8I),K===i.SHORT&&(re=i.RG16I),K===i.INT&&(re=i.RG32I)),E===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.RGB8UI),K===i.UNSIGNED_SHORT&&(re=i.RGB16UI),K===i.UNSIGNED_INT&&(re=i.RGB32UI),K===i.BYTE&&(re=i.RGB8I),K===i.SHORT&&(re=i.RGB16I),K===i.INT&&(re=i.RGB32I)),E===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(re=i.RGBA16UI),K===i.UNSIGNED_INT&&(re=i.RGBA32UI),K===i.BYTE&&(re=i.RGBA8I),K===i.SHORT&&(re=i.RGBA16I),K===i.INT&&(re=i.RGBA32I)),E===i.RGB&&(K===i.UNSIGNED_SHORT&&Te&&(re=Te.RGB16_EXT),K===i.SHORT&&Te&&(re=Te.RGB16_SNORM_EXT),K===i.UNSIGNED_INT_5_9_9_9_REV&&(re=i.RGB9_E5),K===i.UNSIGNED_INT_10F_11F_11F_REV&&(re=i.R11F_G11F_B10F)),E===i.RGBA){let ae=Ae?To:_t.getTransfer(oe);K===i.FLOAT&&(re=i.RGBA32F),K===i.HALF_FLOAT&&(re=i.RGBA16F),K===i.UNSIGNED_BYTE&&(re=ae===Pt?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT&&Te&&(re=Te.RGBA16_EXT),K===i.SHORT&&Te&&(re=Te.RGBA16_SNORM_EXT),K===i.UNSIGNED_SHORT_4_4_4_4&&(re=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(re=i.RGB5_A1)}return(re===i.R16F||re===i.R32F||re===i.RG16F||re===i.RG32F||re===i.RGBA16F||re===i.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function g(U,E){let K;return U?E===null||E===_i||E===as?K=i.DEPTH24_STENCIL8:E===qn?K=i.DEPTH32F_STENCIL8:E===$r&&(K=i.DEPTH24_STENCIL8,et("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===_i||E===as?K=i.DEPTH_COMPONENT24:E===qn?K=i.DEPTH_COMPONENT32F:E===$r&&(K=i.DEPTH_COMPONENT16),K}function b(U,E){return M(U)===!0||U.isFramebufferTexture&&U.minFilter!==Wt&&U.minFilter!==hn?Math.log2(Math.max(E.width,E.height))+1:U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?E.mipmaps.length:1}function L(U){let E=new WeakRef(U);n.get(U).__ref=E,m.add(E),_.register(U,E,E)}function I(U){let E=n.get(U).__ref;E!==void 0&&(m.delete(E),_.unregister(E))}function P(U){D(U.target)}function T(U){A(U.target)}function D(U){U.removeEventListener("dispose",P),I(U),z(U),U.isVideoTexture&&h.delete(U),U.isHTMLTexture&&u.delete(U)}function A(U){U.removeEventListener("dispose",T),I(U),$(U)}function N(){for(let U of m){let E=U.deref();E!==void 0&&(E.isRenderTarget===!0?A(E):D(E))}m.clear(),u.clear()}function z(U){let E=n.get(U);if(E.__webglInit===void 0)return;let K=U.source,fe=d.get(K);if(fe){let oe=fe[E.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&O(U),Object.keys(fe).length===0&&d.delete(K)}n.remove(U)}function O(U){let E=n.get(U);i.deleteTexture(E.__webglTexture);let K=U.source,fe=d.get(K);delete fe[E.__cacheKey],o.memory.textures--}function $(U){let E=n.get(U);E.__depthDisposeCallback&&E.__depthDisposeCallback();let K=U.depthTexture;if(K&&K.renderTarget===U&&D(K),U.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(E.__webglFramebuffer[oe]))for(let Ae=0;Ae<E.__webglFramebuffer[oe].length;Ae++)i.deleteFramebuffer(E.__webglFramebuffer[oe][Ae]);else i.deleteFramebuffer(E.__webglFramebuffer[oe]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[oe])}else{if(Array.isArray(E.__webglFramebuffer))for(let oe=0;oe<E.__webglFramebuffer.length;oe++)i.deleteFramebuffer(E.__webglFramebuffer[oe]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let oe=0;oe<E.__webglColorRenderbuffer.length;oe++)E.__webglColorRenderbuffer[oe]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[oe]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let fe=U.textures;for(let oe=0,Ae=fe.length;oe<Ae;oe++){let Te=n.get(fe[oe]);Te.__webglTexture&&(i.deleteTexture(Te.__webglTexture),o.memory.textures--),n.remove(fe[oe])}n.remove(U)}let B=0;function V(){B=0}function J(){return B}function ue(U){B=U}function xe(){let U=B;return U>=s.maxTextures&&et("WebGLTextures: Trying to use "+(U+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,U}function te(U){let E=[];return E.push(U.wrapS),E.push(U.wrapT),E.push(U.wrapR||0),E.push(U.magFilter),E.push(U.minFilter),E.push(U.anisotropy),E.push(U.internalFormat),E.push(U.format),E.push(U.type),E.push(U.generateMipmaps),E.push(U.mipmapsAutoUpdate),E.push(U.premultiplyAlpha),E.push(U.flipY),E.push(U.unpackAlignment),E.push(U.colorSpace),E.join()}function pe(U,E){let K=n.get(U);if(U.isVideoTexture&&st(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&K.__version!==U.version){let fe=U.image;if(fe===null)et("WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)et("WebGLRenderer: Texture marked for update but image is incomplete");else{nt(K,U,E);return}}else U.isExternalTexture&&(K.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+E)}function ge(U,E){let K=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&K.__version!==U.version){nt(K,U,E);return}else U.isExternalTexture&&(K.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+E)}function De(U,E){let K=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&K.__version!==U.version){nt(K,U,E);return}t.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+E)}function ye(U,E){let K=n.get(U);if(U.version>0&&K.__version!==U.version){Et(K,U,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+E)}let Ge={[cn]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[Rr]:i.MIRRORED_REPEAT},gt={[Wt]:i.NEAREST,[ql]:i.NEAREST_MIPMAP_NEAREST,[er]:i.NEAREST_MIPMAP_LINEAR,[hn]:i.LINEAR,[Zr]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},qe={[qf]:i.NEVER,[mu]:i.ALWAYS,[Zf]:i.LESS,[fu]:i.LEQUAL,[$f]:i.EQUAL,[pu]:i.GEQUAL,[Kf]:i.GREATER,[jf]:i.NOTEQUAL};function tt(U,E){if(E.type===qn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===hn||E.magFilter===Zr||E.magFilter===er||E.magFilter===ri||E.minFilter===hn||E.minFilter===Zr||E.minFilter===er||E.minFilter===ri)&&et("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,Ge[E.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,Ge[E.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,Ge[E.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,gt[E.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,gt[E.minFilter]),E.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,qe[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Wt||E.minFilter!==er&&E.minFilter!==ri||E.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let K=e.get("EXT_texture_filter_anisotropic");i.texParameterf(U,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ct(U,E){let K=!1;U.__webglInit===void 0&&(U.__webglInit=!0,E.addEventListener("dispose",P),L(E));let fe=E.source,oe=d.get(fe);oe===void 0&&(oe={},d.set(fe,oe));let Ae=te(E);if(Ae!==U.__cacheKey){oe[Ae]===void 0&&(oe[Ae]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,K=!0),oe[Ae].usedTimes++;let Te=oe[U.__cacheKey];Te!==void 0&&(oe[U.__cacheKey].usedTimes--,Te.usedTimes===0&&O(E)),U.__cacheKey=Ae,U.__webglTexture=oe[Ae].texture}return K}function je(U,E,K){return Math.floor(Math.floor(U/K)/E)}function ke(U,E,K,fe){let Ae=U.updateRanges;if(Ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,K,fe,E.data);else{Ae.sort((k,ce)=>k.start-ce.start);let Te=0;for(let k=1;k<Ae.length;k++){let ce=Ae[Te],le=Ae[k],Ee=ce.start+ce.count,Se=je(le.start,E.width,4),Re=je(ce.start,E.width,4);le.start<=Ee+1&&Se===Re&&je(le.start+le.count-1,E.width,4)===Se?ce.count=Math.max(ce.count,le.start+le.count-ce.start):(++Te,Ae[Te]=le)}Ae.length=Te+1;let re=t.getParameter(i.UNPACK_ROW_LENGTH),ae=t.getParameter(i.UNPACK_SKIP_PIXELS),Me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let k=0,ce=Ae.length;k<ce;k++){let le=Ae[k],Ee=Math.floor(le.start/4),Se=Math.ceil(le.count/4),Re=Ee%E.width,Je=Math.floor(Ee/E.width),ut=Se,be=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Re),t.pixelStorei(i.UNPACK_SKIP_ROWS,Je),t.texSubImage2D(i.TEXTURE_2D,0,Re,Je,ut,be,K,fe,E.data)}U.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,re),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),t.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function nt(U,E,K){let fe=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(fe=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(fe=i.TEXTURE_3D);let oe=ct(U,E),Ae=E.source;t.bindTexture(fe,U.__webglTexture,i.TEXTURE0+K);let Te=n.get(Ae);if(Ae.version!==Te.__version||oe===!0){if(t.activeTexture(i.TEXTURE0+K),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let be=_t.getPrimaries(_t.workingColorSpace),Qe=E.colorSpace===On?null:_t.getPrimaries(E.colorSpace),dt=E.colorSpace===On||be===Qe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let ae=y(E.image,!1,s.maxTextureSize);ae=Ne(E,ae);let Me=r.convert(E.format,E.colorSpace),k=r.convert(E.type),ce=S(E.internalFormat,Me,k,E.normalized,E.colorSpace,E.isVideoTexture);tt(fe,E);let le,Ee=E.mipmaps,Se=E.isVideoTexture!==!0,Re=Te.__version===void 0||oe===!0,Je=Ae.dataReady,ut=b(E,ae);if(E.isDepthTexture)ce=g(E.format===yi,E.type),Re&&(Se?t.texStorage2D(i.TEXTURE_2D,1,ce,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,ce,ae.width,ae.height,0,Me,k,null));else if(E.isDataTexture)if(Ee.length>0){Se&&Re&&t.texStorage2D(i.TEXTURE_2D,ut,ce,Ee[0].width,Ee[0].height);for(let be=0,Qe=Ee.length;be<Qe;be++)le=Ee[be],Se?Je&&t.texSubImage2D(i.TEXTURE_2D,be,0,0,le.width,le.height,Me,k,le.data):t.texImage2D(i.TEXTURE_2D,be,ce,le.width,le.height,0,Me,k,le.data);E.generateMipmaps=!1}else Se?(Re&&t.texStorage2D(i.TEXTURE_2D,ut,ce,ae.width,ae.height),Je&&ke(E,ae,Me,k)):t.texImage2D(i.TEXTURE_2D,0,ce,ae.width,ae.height,0,Me,k,ae.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Se&&Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ce,Ee[0].width,Ee[0].height,ae.depth);for(let be=0,Qe=Ee.length;be<Qe;be++)if(le=Ee[be],E.format!==zn)if(Me!==null)if(Se){if(Je)if(E.layerUpdates.size>0){let dt=Tu(le.width,le.height,E.format,E.type);for(let Le of E.layerUpdates){let Rt=le.data.subarray(Le*dt/le.data.BYTES_PER_ELEMENT,(Le+1)*dt/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,Le,le.width,le.height,1,Me,Rt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,0,le.width,le.height,ae.depth,Me,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,be,ce,le.width,le.height,ae.depth,0,le.data,0,0);else et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?Je&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,0,le.width,le.height,ae.depth,Me,k,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,be,ce,le.width,le.height,ae.depth,0,Me,k,le.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Se&&Re&&t.texStorage2D(i.TEXTURE_2D,ut,ce,Ee[0].width,Ee[0].height);for(let be=0,Qe=Ee.length;be<Qe;be++)le=Ee[be],E.format!==zn?Me!==null?Se?Je&&t.compressedTexSubImage2D(i.TEXTURE_2D,be,0,0,le.width,le.height,Me,le.data):t.compressedTexImage2D(i.TEXTURE_2D,be,ce,le.width,le.height,0,le.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?Je&&t.texSubImage2D(i.TEXTURE_2D,be,0,0,le.width,le.height,Me,k,le.data):t.texImage2D(i.TEXTURE_2D,be,ce,le.width,le.height,0,Me,k,le.data)}else if(E.isDataArrayTexture)if(Se){if(Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ut,ce,ae.width,ae.height,ae.depth),Je)if(E.layerUpdates.size>0){let be=Tu(ae.width,ae.height,E.format,E.type);for(let Qe of E.layerUpdates){let dt=ae.data.subarray(Qe*be/ae.data.BYTES_PER_ELEMENT,(Qe+1)*be/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Qe,ae.width,ae.height,1,Me,k,dt)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Me,k,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,ae.width,ae.height,ae.depth,0,Me,k,ae.data);else if(E.isData3DTexture)Se?(Re&&t.texStorage3D(i.TEXTURE_3D,ut,ce,ae.width,ae.height,ae.depth),Je&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Me,k,ae.data)):t.texImage3D(i.TEXTURE_3D,0,ce,ae.width,ae.height,ae.depth,0,Me,k,ae.data);else if(E.isFramebufferTexture){if(Re)if(Se)t.texStorage2D(i.TEXTURE_2D,ut,ce,ae.width,ae.height);else{let be=ae.width,Qe=ae.height;for(let dt=0;dt<ut;dt++)t.texImage2D(i.TEXTURE_2D,dt,ce,be,Qe,0,Me,k,null),be>>=1,Qe>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let be=i.canvas;if(be.hasAttribute("layoutsubtree")||be.setAttribute("layoutsubtree","true"),ae.parentNode!==be){be.appendChild(ae),u.add(E),be.onpaint=Qe=>{let dt=Qe.changedElements;for(let Le of u)dt.includes(Le.image)&&(Le.needsUpdate=!0)},be.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ae);else{let dt=i.RGBA,Le=i.RGBA,Rt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,dt,Le,Rt,ae)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Se&&Re){let be=Ye(Ee[0]);t.texStorage2D(i.TEXTURE_2D,ut,ce,be.width,be.height)}for(let be=0,Qe=Ee.length;be<Qe;be++)le=Ee[be],Se?Je&&t.texSubImage2D(i.TEXTURE_2D,be,0,0,Me,k,le):t.texImage2D(i.TEXTURE_2D,be,ce,Me,k,le);E.generateMipmaps=!1}else if(Se){if(Re){let be=Ye(ae);t.texStorage2D(i.TEXTURE_2D,ut,ce,be.width,be.height)}Je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Me,k,ae)}else t.texImage2D(i.TEXTURE_2D,0,ce,Me,k,ae);M(E)&&E.mipmapsAutoUpdate===!0&&v(fe),Te.__version=Ae.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function Et(U,E,K){if(E.image.length!==6)return;let fe=ct(U,E),oe=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+K);let Ae=n.get(oe);if(oe.version!==Ae.__version||fe===!0){t.activeTexture(i.TEXTURE0+K);let Te=_t.getPrimaries(_t.workingColorSpace),re=E.colorSpace===On?null:_t.getPrimaries(E.colorSpace),ae=E.colorSpace===On||Te===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let Me=E.isCompressedTexture||E.image[0].isCompressedTexture,k=E.image[0]&&E.image[0].isDataTexture,ce=[];for(let Le=0;Le<6;Le++)!Me&&!k?ce[Le]=y(E.image[Le],!0,s.maxCubemapSize):ce[Le]=k?E.image[Le].image:E.image[Le],ce[Le]=Ne(E,ce[Le]);let le=ce[0],Ee=r.convert(E.format,E.colorSpace),Se=r.convert(E.type),Re=S(E.internalFormat,Ee,Se,E.normalized,E.colorSpace),Je=E.isVideoTexture!==!0,ut=Ae.__version===void 0||fe===!0,be=oe.dataReady,Qe=b(E,le);tt(i.TEXTURE_CUBE_MAP,E);let dt;if(E.isDepthTexture){if(Re=g(E.format===yi,E.type),ut)if(Je)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Re,le.width,le.height);else for(let Le=0;Le<6;Le++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,le.width,le.height,0,Ee,Se,null)}else if(Me){Je&&ut&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Qe,Re,le.width,le.height);for(let Le=0;Le<6;Le++){dt=ce[Le].mipmaps;for(let Rt=0;Rt<dt.length;Rt++){let Jt=dt[Rt];E.format!==zn?Ee!==null?Je?be&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt,0,0,Jt.width,Jt.height,Ee,Jt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt,Re,Jt.width,Jt.height,0,Jt.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt,0,0,Jt.width,Jt.height,Ee,Se,Jt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt,Re,Jt.width,Jt.height,0,Ee,Se,Jt.data)}}}else{if(dt=E.mipmaps,Je&&ut){dt.length>0&&Qe++;let Le=Ye(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Qe,Re,Le.width,Le.height)}for(let Le=0;Le<6;Le++)if(k){Je?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,ce[Le].width,ce[Le].height,Ee,Se,ce[Le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,ce[Le].width,ce[Le].height,0,Ee,Se,ce[Le].data);for(let Rt=0;Rt<dt.length;Rt++){let jn=dt[Rt].image[Le].image;Je?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt+1,0,0,jn.width,jn.height,Ee,Se,jn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt+1,Re,jn.width,jn.height,0,Ee,Se,jn.data)}}else{Je?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,Ee,Se,ce[Le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,Ee,Se,ce[Le]);for(let Rt=0;Rt<dt.length;Rt++){let Jt=dt[Rt];Je?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt+1,0,0,Ee,Se,Jt.image[Le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Rt+1,Re,Ee,Se,Jt.image[Le])}}}M(E)&&E.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),Ae.__version=oe.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function ht(U,E,K,fe,oe,Ae){let Te=r.convert(K.format,K.colorSpace),re=r.convert(K.type),ae=S(K.internalFormat,Te,re,K.normalized,K.colorSpace),Me=n.get(E),k=n.get(K);if(k.__renderTarget=E,!Me.__hasExternalTextures){let ce=Math.max(1,E.width>>Ae),le=Math.max(1,E.height>>Ae);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,Ae,ae,ce,le,E.depth,0,Te,re,null):t.texImage2D(oe,Ae,ae,ce,le,0,Te,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,U),_e(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,oe,k.__webglTexture,0,Ze(E)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,fe,oe,k.__webglTexture,Ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(U,E,K){if(i.bindRenderbuffer(i.RENDERBUFFER,U),E.depthBuffer){let fe=E.depthTexture,oe=fe&&fe.isDepthTexture?fe.type:null,Ae=g(E.stencilBuffer,oe),Te=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze(E),Ae,E.width,E.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze(E),Ae,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,U)}else{let fe=E.textures;for(let oe=0;oe<fe.length;oe++){let Ae=fe[oe],Te=r.convert(Ae.format,Ae.colorSpace),re=r.convert(Ae.type),ae=S(Ae.internalFormat,Te,re,Ae.normalized,Ae.colorSpace);_e(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze(E),ae,E.width,E.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze(E),ae,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ae,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function at(U,E,K){let fe=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,U),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let oe=n.get(E.depthTexture);oe.__renderTarget=E;let Ae=fe?E.depthTexture.image[0]:E.depthTexture.image;(!oe.__webglTexture||Ae.width!==E.width||Ae.height!==E.height)&&(Ae.width=E.width,Ae.height=E.height,E.depthTexture.needsUpdate=!0),fe?ye(E.depthTexture,0):pe(E.depthTexture,0);let Te=oe.__webglTexture,re=Ze(E),ae=fe?i.TEXTURE_CUBE_MAP_POSITIVE_X+K:i.TEXTURE_2D,Me=E.depthTexture.format===yi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ji)_e(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Me,ae,Te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,Me,ae,Te,0);else if(E.depthTexture.format===yi)_e(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Me,ae,Te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,Me,ae,Te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function At(U){let E=n.get(U),K=U.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==U.depthTexture){let fe=U.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),fe){let oe=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,fe.removeEventListener("dispose",oe)};fe.addEventListener("dispose",oe),E.__depthDisposeCallback=oe}E.__boundDepthTexture=fe}if(U.depthTexture&&!E.__autoAllocateDepthBuffer)if(K)for(let fe=0;fe<6;fe++)at(E.__webglFramebuffer[fe],U,fe);else U.texture.mipmaps.length>0?at(E.__webglFramebuffer[0],U,0):at(E.__webglFramebuffer,U,0);else if(K){E.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[fe]),E.__webglDepthbuffer[fe]===void 0)E.__webglDepthbuffer[fe]=i.createRenderbuffer(),Ht(E.__webglDepthbuffer[fe],U,!1);else{let oe=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=E.__webglDepthbuffer[fe];i.bindRenderbuffer(i.RENDERBUFFER,Ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,Ae)}}else if(U.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Ht(E.__webglDepthbuffer,U,!1);else{let oe=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,Ae)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(U,E,K){let fe=n.get(U);E!==void 0&&ht(fe.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&At(U)}function Be(U){let E=U.texture,K=n.get(U),fe=n.get(E);U.addEventListener("dispose",T),L(U);let oe=U.textures,Ae=U.isWebGLCubeRenderTarget===!0,Te=oe.length>1;if(Te||(fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture()),fe.__version=E.version,o.memory.textures++),Ae){K.__webglFramebuffer=[];for(let re=0;re<6;re++)if(E.mipmaps.length>0){K.__webglFramebuffer[re]=[];for(let ae=0;ae<E.mipmaps.length;ae++)K.__webglFramebuffer[re][ae]=i.createFramebuffer()}else K.__webglFramebuffer[re]=i.createFramebuffer()}else{if(E.mipmaps.length>0){K.__webglFramebuffer=[];for(let re=0;re<E.mipmaps.length;re++)K.__webglFramebuffer[re]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Te)for(let re=0,ae=oe.length;re<ae;re++){let Me=n.get(oe[re]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),o.memory.textures++)}if(U.samples>0&&_e(U)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let re=0;re<oe.length;re++){let ae=oe[re];K.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[re]);let Me=r.convert(ae.format,ae.colorSpace),k=r.convert(ae.type),ce=S(ae.internalFormat,Me,k,ae.normalized,ae.colorSpace,U.isXRRenderTarget===!0),le=Ze(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,le,ce,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,K.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),Ht(K.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Ae){t.bindTexture(i.TEXTURE_CUBE_MAP,fe.__webglTexture),tt(i.TEXTURE_CUBE_MAP,E);for(let re=0;re<6;re++)if(E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ht(K.__webglFramebuffer[re][ae],U,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ae);else ht(K.__webglFramebuffer[re],U,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);M(E)?v(i.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}else if(Te){for(let re=0,ae=oe.length;re<ae;re++){let Me=oe[re],k=n.get(Me),ce=i.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(ce=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,k.__webglTexture),tt(ce,Me),ht(K.__webglFramebuffer,U,Me,i.COLOR_ATTACHMENT0+re,ce,0),M(Me)&&v(ce)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(re=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,fe.__webglTexture),tt(re,E),E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ht(K.__webglFramebuffer[ae],U,E,i.COLOR_ATTACHMENT0,re,ae);else ht(K.__webglFramebuffer,U,E,i.COLOR_ATTACHMENT0,re,0);M(E)?v(re):E.mipmaps.length>0&&i.texParameteri(re,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}U.depthBuffer&&At(U)}function F(U){let E=U.textures;for(let K=0,fe=E.length;K<fe;K++){let oe=E[K];if(M(oe)&&oe.mipmapsAutoUpdate===!0){let Ae=w(U),Te=n.get(oe).__webglTexture;t.bindTexture(Ae,Te),v(Ae),t.unbindTexture()}}}let ot=[];function Ue(U){if(U.samples>0){if(_e(U)===!1){let E=U.textures,K=U.width,fe=U.height,oe=i.COLOR_BUFFER_BIT,Ae=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(U),re=E.length>1;if(re)for(let Me=0;Me<E.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),U.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Me=0;Me<E.length;Me++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Me]);let k=n.get(E[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,k,0)}i.blitFramebuffer(0,0,K,fe,0,0,K,fe,oe,i.NEAREST),l===!0&&(ot.length=0,ot.push(i.COLOR_ATTACHMENT0+Me),U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&ot.push(Ae),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Me=0;Me<E.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Me]);let k=n.get(E[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,k,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&l){let E=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Ze(U){return Math.min(s.maxSamples,U.samples)}function _e(U){let E=n.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function st(U){let E=o.render.frame;h.get(U)!==E&&(h.set(U,E),U.update())}function Ne(U,E){let K=U.colorSpace,fe=U.format,oe=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||K!==Un&&K!==On&&(_t.getTransfer(K)===Pt?(fe!==zn||oe!==Pn)&&et("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",K)),E}function Ye(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=xe,this.resetTextureUnits=V,this.getTextureUnits=J,this.setTextureUnits=ue,this.setTexture2D=pe,this.setTexture2DArray=ge,this.setTexture3D=De,this.setTextureCube=ye,this.rebindTextures=Ft,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=_e,this.dispose=N}function pv(i,e){function t(n,s=On){let r,o=_t.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ou)return i.BYTE;if(n===au)return i.SHORT;if(n===$r)return i.UNSIGNED_SHORT;if(n===Zl)return i.INT;if(n===_i)return i.UNSIGNED_INT;if(n===qn)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===hu)return i.ALPHA;if(n===uu)return i.RGB;if(n===zn)return i.RGBA;if(n===Ji)return i.DEPTH_COMPONENT;if(n===yi)return i.DEPTH_STENCIL;if(n===jl)return i.RED;if(n===Jl)return i.RED_INTEGER;if(n===Ts)return i.RG;if(n===Ql)return i.RG_INTEGER;if(n===ec)return i.RGBA_INTEGER;if(n===aa||n===la||n===ca||n===ha)if(o===Pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tc||n===nc||n===ic||n===sc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ic)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rc||n===oc||n===ac||n===lc||n===cc||n===ua||n===hc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===rc||n===oc)return o===Pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ac)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===lc)return r.COMPRESSED_R11_EAC;if(n===cc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ua)return r.COMPRESSED_RG11_EAC;if(n===hc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc||n===_c||n===yc||n===vc||n===bc||n===Sc||n===Mc||n===wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_c)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Tc||n===Ac||n===Ec)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Tc)return o===Pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ac)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rc||n===Cc||n===da||n===Pc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===as?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var mv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Nu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Fo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:mv,fragmentShader:gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ut(new ti(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Uu=class extends fi{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null,_=typeof XRWebGLBinding<"u",p=new Nu,x={},y=t.getContextAttributes(),M=null,v=null,w=[],S=[],g=new Ke,b=null,L=null,I=new ln;I.viewport=new Ot;let P=new ln;P.viewport=new Ot;let T=[I,P],D=new Gl,A=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let pe=w[te];return pe===void 0&&(pe=new Nr,w[te]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(te){let pe=w[te];return pe===void 0&&(pe=new Nr,w[te]=pe),pe.getGripSpace()},this.getHand=function(te){let pe=w[te];return pe===void 0&&(pe=new Nr,w[te]=pe),pe.getHandSpace()};function z(te){let pe=S.indexOf(te.inputSource);if(pe===-1)return;let ge=w[pe];ge!==void 0&&(ge.update(te.inputSource,te.frame,c||o),ge.dispatchEvent({type:te.type,data:te.inputSource}))}function O(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",$);for(let te=0;te<w.length;te++){let pe=S[te];pe!==null&&(S[te]=null,w[te].disconnect(pe))}A=null,N=null,p.reset();for(let te in x)delete x[te];if(e.setRenderTarget(M),d=null,f=null,u=null,s=null,v=null,xe.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(g.width,g.height,!1),L!==null){let te=L.camera;te.fov=L.fov,te.zoom=L.zoom,te.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&et("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&et("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",O),s.addEventListener("inputsourceschange",$),y.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(g),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,De=null,ye=null;y.depth&&(ye=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=y.stencil?yi:Ji,De=y.stencil?as:_i);let Ge={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new _n(f.textureWidth,f.textureHeight,{format:zn,type:Pn,depthTexture:new pi(f.textureWidth,f.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ge={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new _n(d.framebufferWidth,d.framebufferHeight,{format:zn,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),xe.setContext(s),xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function $(te){for(let pe=0;pe<te.removed.length;pe++){let ge=te.removed[pe],De=S.indexOf(ge);De>=0&&(S[De]=null,w[De].disconnect(ge))}for(let pe=0;pe<te.added.length;pe++){let ge=te.added[pe],De=S.indexOf(ge);if(De===-1){for(let Ge=0;Ge<w.length;Ge++)if(Ge>=S.length){S.push(ge),De=Ge;break}else if(S[Ge]===null){S[Ge]=ge,De=Ge;break}if(De===-1)break}let ye=w[De];ye&&ye.connect(ge)}}function B(te,pe){pe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(pe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let pe=te.near,ge=te.far;p.texture!==null&&(p.depthNear>0&&(pe=p.depthNear),p.depthFar>0&&(ge=p.depthFar)),D.near=P.near=I.near=pe,D.far=P.far=I.far=ge,(A!==D.near||N!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),A=D.near,N=D.far),D.layers.mask=te.layers.mask|6,I.layers.mask=D.layers.mask&-5,P.layers.mask=D.layers.mask&-3;let De=te.parent,ye=D.cameras;B(D,De);for(let Ge=0;Ge<ye.length;Ge++)B(ye[Ge],De);D.projectionMatrix.copy(I.projectionMatrix),D.projectionMatrixInverse.copy(I.projectionMatrixInverse),L===null&&te.isPerspectiveCamera&&(L={camera:te,fov:te.fov,zoom:te.zoom}),V(te,D,De)};function V(te,pe,ge){ge===null?te.matrix.copy(pe.matrixWorld):(te.matrix.copy(ge.matrixWorld),te.matrix.invert(),te.matrix.multiply(pe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(pe.projectionMatrix),te.projectionMatrixInverse.copy(pe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Xs*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(te){l=te,f!==null&&(f.fixedFoveation=te),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=te)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(D)},this.getCameraTexture=function(te){return x[te]};let J=null;function ue(te,pe){if(h=pe.getViewerPose(c||o),m=pe,h!==null){let ge=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let De=!1;ge.length!==D.cameras.length&&(D.cameras.length=0,De=!0);for(let qe=0;qe<ge.length;qe++){let tt=ge[qe],ct=null;if(d!==null)ct=d.getViewport(tt);else{let ke=u.getViewSubImage(f,tt);ct=ke.viewport,qe===0&&(e.setRenderTargetTextures(v,ke.colorTexture,ke.depthStencilTexture),e.setRenderTarget(v))}let je=T[qe];je===void 0&&(je=new ln,je.layers.enable(qe),je.viewport=new Ot,T[qe]=je),je.matrix.fromArray(tt.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(tt.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(ct.x,ct.y,ct.width,ct.height),qe===0&&(D.matrix.copy(je.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),De===!0&&D.cameras.push(je)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let qe=u.getDepthInformation(ge[0]);qe&&qe.isValid&&qe.texture&&p.init(qe,s.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<ge.length;qe++){let tt=ge[qe].camera;if(tt){let ct=x[tt];ct||(ct=new Fo,x[tt]=ct);let je=u.getCameraImage(tt);ct.sourceTexture=je}}}}for(let ge=0;ge<w.length;ge++){let De=S[ge],ye=w[ge];De!==null&&ye!==void 0&&ye.update(De,pe,c||o)}J&&J(te,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),m=null}let xe=new Ap;xe.setAnimationLoop(ue),this.setAnimationLoop=function(te){J=te},this.dispose=function(){}}},xv=new rt,Op=new pt;Op.set(-1,0,0,0,1,0,0,0,1);function _v(i,e){function t(p,x){p.matrixAutoUpdate===!0&&p.updateMatrix(),x.value.copy(p.matrix)}function n(p,x){x.color.getRGB(p.fogColor.value,Su(i)),x.isFog?(p.fogNear.value=x.near,p.fogFar.value=x.far):x.isFogExp2&&(p.fogDensity.value=x.density)}function s(p,x,y,M,v){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?r(p,x):x.isMeshLambertMaterial?(r(p,x),x.envMap&&(p.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(r(p,x),u(p,x)):x.isMeshPhongMaterial?(r(p,x),h(p,x),x.envMap&&(p.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(r(p,x),f(p,x),x.isMeshPhysicalMaterial&&d(p,x,v)):x.isMeshMatcapMaterial?(r(p,x),m(p,x)):x.isMeshDepthMaterial?r(p,x):x.isMeshDistanceMaterial?(r(p,x),_(p,x)):x.isMeshNormalMaterial?r(p,x):x.isLineBasicMaterial?(o(p,x),x.isLineDashedMaterial&&a(p,x)):x.isPointsMaterial?l(p,x,y,M):x.isSpriteMaterial?c(p,x):x.isShadowMaterial?(p.color.value.copy(x.color),p.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function r(p,x){p.opacity.value=x.opacity,x.color&&p.diffuse.value.copy(x.color),x.emissive&&p.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(p.map.value=x.map,t(x.map,p.mapTransform)),x.alphaMap&&(p.alphaMap.value=x.alphaMap,t(x.alphaMap,p.alphaMapTransform)),x.bumpMap&&(p.bumpMap.value=x.bumpMap,t(x.bumpMap,p.bumpMapTransform),p.bumpScale.value=x.bumpScale,x.side===wn&&(p.bumpScale.value*=-1)),x.normalMap&&(p.normalMap.value=x.normalMap,t(x.normalMap,p.normalMapTransform),p.normalScale.value.copy(x.normalScale),x.side===wn&&p.normalScale.value.negate()),x.displacementMap&&(p.displacementMap.value=x.displacementMap,t(x.displacementMap,p.displacementMapTransform),p.displacementScale.value=x.displacementScale,p.displacementBias.value=x.displacementBias),x.emissiveMap&&(p.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,p.emissiveMapTransform)),x.specularMap&&(p.specularMap.value=x.specularMap,t(x.specularMap,p.specularMapTransform)),x.alphaTest>0&&(p.alphaTest.value=x.alphaTest);let y=e.get(x),M=y.envMap,v=y.envMapRotation;M&&(p.envMap.value=M,p.envMapRotation.value.setFromMatrix4(xv.makeRotationFromEuler(v)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Op),p.reflectivity.value=x.reflectivity,p.ior.value=x.ior,p.refractionRatio.value=x.refractionRatio),x.lightMap&&(p.lightMap.value=x.lightMap,p.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,p.lightMapTransform)),x.aoMap&&(p.aoMap.value=x.aoMap,p.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,p.aoMapTransform))}function o(p,x){p.diffuse.value.copy(x.color),p.opacity.value=x.opacity,x.map&&(p.map.value=x.map,t(x.map,p.mapTransform))}function a(p,x){p.dashSize.value=x.dashSize,p.totalSize.value=x.dashSize+x.gapSize,p.scale.value=x.scale}function l(p,x,y,M){p.diffuse.value.copy(x.color),p.opacity.value=x.opacity,p.size.value=x.size*y,p.scale.value=M*.5,x.map&&(p.map.value=x.map,t(x.map,p.uvTransform)),x.alphaMap&&(p.alphaMap.value=x.alphaMap,t(x.alphaMap,p.alphaMapTransform)),x.alphaTest>0&&(p.alphaTest.value=x.alphaTest)}function c(p,x){p.diffuse.value.copy(x.color),p.opacity.value=x.opacity,p.rotation.value=x.rotation,x.map&&(p.map.value=x.map,t(x.map,p.mapTransform)),x.alphaMap&&(p.alphaMap.value=x.alphaMap,t(x.alphaMap,p.alphaMapTransform)),x.alphaTest>0&&(p.alphaTest.value=x.alphaTest)}function h(p,x){p.specular.value.copy(x.specular),p.shininess.value=Math.max(x.shininess,1e-4)}function u(p,x){x.gradientMap&&(p.gradientMap.value=x.gradientMap)}function f(p,x){p.metalness.value=x.metalness,x.metalnessMap&&(p.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,p.metalnessMapTransform)),p.roughness.value=x.roughness,x.roughnessMap&&(p.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,p.roughnessMapTransform)),x.envMap&&(p.envMapIntensity.value=x.envMapIntensity)}function d(p,x,y){p.ior.value=x.ior,x.diffuseRoughness>0&&(p.diffuseRoughness.value=x.diffuseRoughness,x.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=x.diffuseRoughnessMap,t(x.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),x.sheen>0&&(p.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),p.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(p.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,p.sheenColorMapTransform)),x.sheenRoughnessMap&&(p.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,p.sheenRoughnessMapTransform))),x.clearcoat>0&&(p.clearcoat.value=x.clearcoat,p.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(p.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,p.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(p.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===wn&&p.clearcoatNormalScale.value.negate())),x.dispersion>0&&(p.dispersion.value=x.dispersion),x.retroreflectivity>0&&(p.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(p.iridescence.value=x.iridescence,p.iridescenceIOR.value=x.iridescenceIOR,p.iridescenceThicknessMinimum.value=x.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=x.iridescenceThicknessMaximum,x.iridescenceMap&&(p.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,p.iridescenceMapTransform)),x.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),x.transmission>0&&(p.transmission.value=x.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),x.transmissionMap&&(p.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,p.transmissionMapTransform)),p.thickness.value=x.thickness,x.thicknessMap&&(p.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=x.attenuationDistance,p.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(p.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(p.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=x.specularIntensity,p.specularColor.value.copy(x.specularColor),x.specularColorMap&&(p.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,p.specularColorMapTransform)),x.specularIntensityMap&&(p.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,x){x.matcap&&(p.matcap.value=x.matcap)}function _(p,x){let y=e.get(x).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function yv(i,e,t,n){let s={},r={};function o(y,M){let v=M.program;n.uniformBlockBinding(y,v,s[y.id])}function a(y,M){let v=s[y.id];v===void 0&&(m(y),v=l(y),s[y.id]=v,y.addEventListener("dispose",p));let w=M.program;n.updateUBOMapping(y,w);let S=e.render.frame;r[y.id]!==S&&(c(y),r[y.id]=S)}function l(y){let M=i.createBuffer(),v=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,v,w),i.bindBuffer(i.UNIFORM_BUFFER,null),M}function c(y){let M=s[y.id],v=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let S=0,g=v.length;S<g;S++){let b=v[S];if(Array.isArray(b))for(let L=0,I=b.length;L<I;L++)h(b[L],S,L,w);else h(b,S,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(y,M,v,w){if(f(y,M,v,w)===!0){let S=y.__offset,g=y.value;if(Array.isArray(g)){let b=0;for(let L=0;L<g.length;L++){let I=g[L],P=_(I,!0);u(I,y.__data,b),b+=P.storage/Float32Array.BYTES_PER_ELEMENT}}else u(g,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,y.__data)}}function u(y,M,v){typeof y=="number"||typeof y=="boolean"?M[v]=y:y.isMatrix3?(M[v]=y.elements[0],M[v+1]=y.elements[1],M[v+2]=y.elements[2],M[v+3]=0,M[v+4]=y.elements[3],M[v+5]=y.elements[4],M[v+6]=y.elements[5],M[v+7]=0,M[v+8]=y.elements[6],M[v+9]=y.elements[7],M[v+10]=y.elements[8],M[v+11]=0):ArrayBuffer.isView(y)?M.set(y.subarray(0,M.length-v),v):y.toArray(M,v)}function f(y,M,v,w){let S=y.value,g=M+"_"+v;if(Array.isArray(S)){w[g]===void 0&&(w[g]=[]);let b=w[g],L=!1;for(let I=0;I<S.length;I++)d(S[I],b,I)===!0&&(L=!0);return L}return d(S,w,g)}function d(y,M,v){if(M[v]===void 0)return typeof y=="number"||typeof y=="boolean"?M[v]=y:ArrayBuffer.isView(y)?M[v]=y.slice():M[v]=y.clone(),!0;{let w=M[v];if(typeof y=="number"||typeof y=="boolean"){if(w!==y)return M[v]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(w.equals(y)===!1)return w.copy(y),!0}}return!1}function m(y){let M=y.uniforms,v=0,w=16;for(let g=0,b=M.length;g<b;g++){let L=Array.isArray(M[g])?M[g]:[M[g]];for(let I=0,P=L.length;I<P;I++){let T=L[I],D=Array.isArray(T.value)?T.value:[T.value],A=Array.isArray(M[g])||Array.isArray(T.value),N=v;for(let O=0,$=D.length;O<$;O++){let B=D[O],V=_(B,A),J=v%w,ue=J%V.boundary,xe=J+ue;v+=ue,xe!==0&&w-xe<V.storage&&(v+=w-xe),O===0&&(N=v),v+=V.storage}let z=T.type==="int"?Int32Array:T.type==="uint"?Uint32Array:Float32Array;T.__data=new z((v-N)/Float32Array.BYTES_PER_ELEMENT),T.__offset=N}}let S=v%w;return S>0&&(v+=w-S),y.__size=v,y.__cache={},this}function _(y,M){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=16,v.storage=48):y.isMatrix4?(v.boundary=16,v.storage=64):y.isTexture?et("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(v.boundary=16,v.storage=y.byteLength):et("WebGLRenderer: Unsupported uniform value type.",y),M===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function p(y){let M=y.target;M.removeEventListener("dispose",p),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function x(){for(let y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:o,update:a,dispose:x}}var vv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Di=null;function bv(){return Di===null&&(Di=new Ei(vv,16,16,Ts,In),Di.name="DFG_LUT",Di.minFilter=hn,Di.magFilter=hn,Di.wrapS=Qn,Di.wrapT=Qn,Di.generateMipmaps=!1,Di.needsUpdate=!0),Di}var Nc=class{constructor(e={}){let{canvas:t=Jf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Pn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let _=d,p=new Set([ec,Ql,Jl]),x=new Set([Pn,_i,$r,as,$l,Kl]),y=new Uint32Array(4),M=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},w=null,S=null,g=[],b=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,P=!1,T=null,D=null,A=null,N=null;this._outputColorSpace=Nt;let z=0,O=0,$=null,B=-1,V=null,J=new Ot,ue=new Ot,xe=null,te=new Xe(0),pe=0,ge=t.width,De=t.height,ye=1,Ge=null,gt=null,qe=new Ot(0,0,ge,De),tt=new Ot(0,0,ge,De),ct=!1,je=new vs,ke=new Il,nt=!1,Et=!1,ht=new rt,Ht=new Y,at=new Ot,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ft=!1;function Be(){return $===null?ye:1}let F=n;function ot(R,G){return t.getContext(R,G)}let Ue,Ze,_e,st,Ne,Ye,U,E,K,fe,oe,Ae,Te,re,ae,Me,k,ce,le,Ee,Se,Re,Je;try{let R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Qe,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",Le,!1),F===null){let G="webgl2";if(F=ot(G,R),F===null)throw ot(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ut()}catch(R){throw t.removeEventListener("webglcontextlost",Qe,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),lt("WebGLRenderer: "+R.message),R}function ut(){Ue=new L_(F),Ue.init(),Se=new pv(F,Ue),Ze=new b_(F,Ue,e,Se),_e=new dv(F,Ue),Ze.reversedDepthBuffer&&f&&_e.buffers.depth.setReversed(!0),D=F.createFramebuffer(),A=F.createFramebuffer(),N=F.createFramebuffer(),st=new U_(F),Ne=new Jy,Ye=new fv(F,Ue,_e,Ne,Ze,Se,st),U=new I_(I),E=new Fg(F),Re=new y_(F,E),K=new D_(F,E,st,Re),fe=new F_(F,K,E,Re,st),ce=new O_(F,Ze,Ye),ae=new S_(Ne),oe=new jy(I,U,Ue,Ze,Re,ae),Ae=new _v(I,Ne),Te=new ev,re=new ov(Ue),k=new __(I,U,_e,fe,m,l),Me=new uv(I,fe,Ze),Je=new yv(F,st,Ze,_e),le=new v_(F,Ue,st),Ee=new N_(F,Ue,st),st.programs=oe.programs,I.capabilities=Ze,I.extensions=Ue,I.properties=Ne,I.renderLists=Te,I.shadowMap=Me,I.state=_e,I.info=st}_!==Pn&&(L=new k_(_,t.width,t.height,a,s,r));let be=new Uu(I,F);this.xr=be,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let R=Ue.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Ue.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(R){R!==void 0&&(ye=R,this.setSize(ge,De,!1))},this.getSize=function(R){return R.set(ge,De)},this.setSize=function(R,G,se=!0){if(be.isPresenting){et("WebGLRenderer: Can't change size while VR device is presenting.");return}ge=R,De=G,t.width=Math.floor(R*ye),t.height=Math.floor(G*ye),se===!0&&(t.style.width=R+"px",t.style.height=G+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,R,G)},this.getDrawingBufferSize=function(R){return R.set(ge*ye,De*ye).floor()},this.setDrawingBufferSize=function(R,G,se){ge=R,De=G,ye=se,t.width=Math.floor(R*se),t.height=Math.floor(G*se),this.setViewport(0,0,R,G)},this.setEffects=function(R){if(_===Pn){lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let G=0;G<R.length;G++)if(R[G].isOutputPass===!0){et("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(J)},this.getViewport=function(R){return R.copy(qe)},this.setViewport=function(R,G,se,Q){R.isVector4?qe.set(R.x,R.y,R.z,R.w):qe.set(R,G,se,Q),_e.viewport(J.copy(qe).multiplyScalar(Be()).round())},this.getScissor=function(R){return R.copy(tt)},this.setScissor=function(R,G,se,Q){R.isVector4?tt.set(R.x,R.y,R.z,R.w):tt.set(R,G,se,Q),_e.scissor(ue.copy(tt).multiplyScalar(Be()).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(R){_e.setScissorTest(ct=R)},this.setOpaqueSort=function(R){Ge=R},this.setTransparentSort=function(R){gt=R},this.getClearColor=function(R){return R.copy(k.getClearColor())},this.setClearColor=function(){k.setClearColor(...arguments)},this.getClearAlpha=function(){return k.getClearAlpha()},this.setClearAlpha=function(){k.setClearAlpha(...arguments)},this.clear=function(R=!0,G=!0,se=!0){let Q=0;if(R){let ne=!1;if($!==null){let Ie=$.texture.format;ne=p.has(Ie)}if(ne){let Ie=$.texture.type,Ve=x.has(Ie),Pe=k.getClearColor(),Oe=k.getClearAlpha(),$e=Pe.r,ft=Pe.g,xt=Pe.b;Ve?(y[0]=$e,y[1]=ft,y[2]=xt,y[3]=Oe,F.clearBufferuiv(F.COLOR,0,y)):(M[0]=$e,M[1]=ft,M[2]=xt,M[3]=Oe,F.clearBufferiv(F.COLOR,0,M))}else Q|=F.COLOR_BUFFER_BIT}G&&(Q|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),T=R},this.dispose=function(){t.removeEventListener("webglcontextlost",Qe,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),k.dispose(),Te.dispose(),re.dispose(),Ye.dispose(),Ne.dispose(),U.dispose(),fe.dispose(),K.dispose(),Re.dispose(),Je.dispose(),oe.dispose(),be.dispose(),be.removeEventListener("sessionstart",H),be.removeEventListener("sessionend",Ba),bi.stop()};function Qe(R){R.preventDefault(),Ao("WebGLRenderer: Context Lost."),P=!0}function dt(){Ao("WebGLRenderer: Context Restored."),P=!1;let R=st.autoReset,G=Me.enabled,se=Me.autoUpdate,Q=Me.needsUpdate,ne=Me.type;ut(),st.autoReset=R,Me.enabled=G,Me.autoUpdate=se,Me.needsUpdate=Q,Me.type=ne}function Le(R){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Rt(R){let G=R.target;G.removeEventListener("dispose",Rt),Jt(G)}function Jt(R){jn(R),Ne.remove(R)}function jn(R){let G=Ne.get(R).programs;G!==void 0&&(G.forEach(function(se){oe.releaseProgram(se)}),R.isShaderMaterial&&oe.releaseShaderCache(R))}this.renderBufferDirect=function(R,G,se,Q,ne,Ie){G===null&&(G=At);let Ve=ne.isMesh&&ne.matrixWorld.determinantAffine()<0,Pe=or(R,G,se,Q,ne);_e.setMaterial(Q,Ve);let Oe=se.index,$e=1;if(Q.wireframe===!0){if(Oe=K.getWireframeAttribute(se),Oe===void 0)return;$e=2}let ft=se.drawRange,xt=se.attributes.position,We=ft.start*$e,vt=(ft.start+ft.count)*$e;Ie!==null&&(We=Math.max(We,Ie.start*$e),vt=Math.min(vt,(Ie.start+Ie.count)*$e)),Oe!==null?(We=Math.max(We,0),vt=Math.min(vt,Oe.count)):xt!=null&&(We=Math.max(We,0),vt=Math.min(vt,xt.count));let Bt=vt-We;if(Bt<0||Bt===1/0)return;Re.setup(ne,Q,Pe,se,Oe);let St,Dt=le;if(Oe!==null&&(St=E.get(Oe),Dt=Ee,Dt.setIndex(St)),ne.isMesh)Q.wireframe===!0?(_e.setLineWidth(Q.wireframeLinewidth*Be()),Dt.setMode(F.LINES)):Dt.setMode(F.TRIANGLES);else if(ne.isLine){let Qt=Q.linewidth;Qt===void 0&&(Qt=1),_e.setLineWidth(Qt*Be()),ne.isLineSegments?Dt.setMode(F.LINES):ne.isLineLoop?Dt.setMode(F.LINE_LOOP):Dt.setMode(F.LINE_STRIP)}else ne.isPoints?Dt.setMode(F.POINTS):ne.isSprite&&Dt.setMode(F.TRIANGLES);if(ne.isBatchedMesh)if(Ue.get("WEBGL_multi_draw"))Dt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let Qt=ne._multiDrawStarts,ze=ne._multiDrawCounts,Sn=ne._multiDrawCount,Ct=Oe?E.get(Oe).bytesPerElement:1,ki=Ne.get(Q).currentProgram.getUniforms();for(let gn=0;gn<Sn;gn++)ki.setValue(F,"_gl_DrawID",gn),Dt.render(Qt[gn]/Ct,ze[gn])}else if(ne.isInstancedMesh)Dt.renderInstances(We,Bt,ne.count);else if(se.isInstancedBufferGeometry){let Qt=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,ze=Math.min(se.instanceCount,Qt);Dt.renderInstances(We,Bt,ze)}else Dt.render(We,Bt)};function rr(R,G,se,Q){T!==null&&R.isNodeMaterial&&T.setObject(Q,R),nt===!0&&ae.setState(R,se,!1),R.transparent===!0&&R.side===ii&&R.forceSinglePass===!1?(R.side=wn,R.needsUpdate=!0,Us(R,G,Q),R.side=Yn,R.needsUpdate=!0,Us(R,G,Q),R.side=ii):Us(R,G,Q)}this.compile=function(R,G,se=null){se===null&&(se=R),T!==null&&T.renderStart(R,G,se),S=re.get(se),S.init(G),b.push(S),se.traverseVisible(function(ne){ne.isLight&&ne.layers.test(G.layers)&&(S.pushLight(ne),ne.castShadow&&S.pushShadow(ne))}),R!==se&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(G.layers)&&(S.pushLight(ne),ne.castShadow&&S.pushShadow(ne))}),S.setupLights(),T!==null&&T.updateLights(S.state.lightsArray),Et=this.localClippingEnabled,nt=ae.init(this.clippingPlanes,Et),nt===!0&&ae.setGlobalState(this.clippingPlanes,G),T!==null&&Me.render(S.state.shadowsArray,se,G);let Q=new Set;return R.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let Ie=ne.material;if(Ie)if(Array.isArray(Ie))for(let Ve=0;Ve<Ie.length;Ve++){let Pe=Ie[Ve];rr(Pe,se,G,ne),Q.add(Pe)}else rr(Ie,se,G,ne),Q.add(Ie)}),S=b.pop(),T!==null&&T.renderEnd(),Q},this.compileAsync=function(R,G,se=null){let Q=this.compile(R,G,se);return new Promise(ne=>{function Ie(){if(Q.forEach(function(Ve){let Oe=Ne.get(Ve).currentProgram;(Oe===void 0||Oe.isReady())&&Q.delete(Ve)}),Q.size===0){ne(R);return}setTimeout(Ie,10)}Ue.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let cs=null;function co(R){cs&&cs(R)}function H(){bi.stop()}function Ba(){bi.start()}let bi=new Ap;bi.setAnimationLoop(co),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(R){cs=R,be.setAnimationLoop(R),R===null?bi.stop():bi.start()},be.addEventListener("sessionstart",H),be.addEventListener("sessionend",Ba),this.render=function(R,G){if(G!==void 0&&G.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;T!==null&&T.renderStart(R,G);let se=be.enabled===!0&&be.isPresenting===!0,Q=L!==null&&($===null||se)&&L.begin(I,$);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(G),G=be.getCamera()),R.isScene===!0&&R.onBeforeRender(I,R,G,$),S=re.get(R,b.length),S.init(G),S.state.textureUnits=Ye.getTextureUnits(),b.push(S),ht.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?ke.setFromArrayCamera(G):je.setFromProjectionMatrix(ht,ei,G.reversedDepth),Et=this.localClippingEnabled,nt=ae.init(this.clippingPlanes,Et),w=Te.get(R,g.length),w.init(),g.push(w),this.info.render.frame++,be.enabled===!0&&be.isPresenting===!0){let Ve=I.xr.getDepthSensingMesh();Ve!==null&&hs(Ve,G,-1/0,I.sortObjects)}hs(R,G,0,I.sortObjects),w.finish(),T!==null&&T.updateLights(S.state.lightsArray),I.sortObjects===!0&&w.sort(Ge,gt),Ft=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,Ft&&k.addToRenderList(w,R),this.info.autoReset===!0&&this.info.reset(),nt===!0&&ae.beginShadows();let ne=S.state.shadowsArray;if(Me.render(ne,R,G),nt===!0&&ae.endShadows(),(Q&&L.hasRenderPass())===!1){let Ve=w.opaque,Pe=w.transmissive;if(S.setupLights(),G.isArrayCamera){let Oe=G.cameras;if(Pe.length>0)for(let $e=0,ft=Oe.length;$e<ft;$e++){let xt=Oe[$e];ka(Ve,Pe,R,xt)}Ft&&k.render(R);for(let $e=0,ft=Oe.length;$e<ft;$e++){let xt=Oe[$e];ho(w,R,xt,xt.viewport)}}else Pe.length>0&&ka(Ve,Pe,R,G),Ft&&k.render(R),ho(w,R,G)}$!==null&&O===0&&(Ye.updateMultisampleRenderTarget($),Ye.updateRenderTargetMipmap($)),Q&&L.end(I),R.isScene===!0&&R.onAfterRender(I,R,G),Re.resetDefaultState(),B=-1,V=null,b.pop(),b.length>0?(S=b[b.length-1],Ye.setTextureUnits(S.state.textureUnits),nt===!0&&ae.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,g.pop(),g.length>0?w=g[g.length-1]:w=null,T!==null&&T.renderEnd()};function hs(R,G,se,Q){if(R.visible===!1)return;if(R.layers.test(G.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(G);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){let Ve=G.isArrayCamera?ke:je;if(!R.frustumCulled||R.intersectsFrustum(Ve)){Q&&at.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ht);let Pe=fe.update(R),Oe=R.material;Oe.visible&&w.push(R,Pe,Oe,se,at.z,null,G)}}else if(R.isMesh||R.isLine||R.isPoints){let Ve=G.isArrayCamera?ke:je;if(!R.frustumCulled||R.intersectsFrustum(Ve)){let Pe=fe.update(R),Oe=R.material;if(Q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),at.copy(R.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),at.copy(Pe.boundingSphere.center)),at.applyMatrix4(R.matrixWorld).applyMatrix4(ht)),Array.isArray(Oe)){let $e=Pe.groups;for(let ft=0,xt=$e.length;ft<xt;ft++){let We=$e[ft],vt=Oe[We.materialIndex];vt&&vt.visible&&w.push(R,Pe,vt,se,at.z,We,G)}}else Oe.visible&&w.push(R,Pe,Oe,se,at.z,null,G)}}}let Ie=R.children;for(let Ve=0,Pe=Ie.length;Ve<Pe;Ve++)hs(Ie[Ve],G,se,Q)}function ho(R,G,se,Q){let{opaque:ne,transmissive:Ie,transparent:Ve}=R;S.setupLightsView(se),nt===!0&&ae.setGlobalState(I.clippingPlanes,se),Q&&_e.viewport(J.copy(Q)),ne.length>0&&Ns(ne,G,se),Ie.length>0&&Ns(Ie,G,se),Ve.length>0&&Ns(Ve,G,se),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function ka(R,G,se,Q){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Q.id]===void 0){let We=Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Q.id]=new _n(1,1,{generateMipmaps:!0,type:We?In:Pn,minFilter:ri,samples:Math.max(4,Ze.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let Ie=S.state.transmissionRenderTarget[Q.id],Ve=Q.viewport||J;Ie.setSize(Ve.z*I.transmissionResolutionScale,Ve.w*I.transmissionResolutionScale);let Pe=I.getRenderTarget(),Oe=I.getActiveCubeFace(),$e=I.getActiveMipmapLevel();I.setRenderTarget(Ie),I.getClearColor(te),pe=I.getClearAlpha(),pe<1&&I.setClearColor(16777215,.5),I.clear(),Ft&&k.render(se);let ft=I.toneMapping;I.toneMapping=Ii;let xt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),S.setupLightsView(Q),nt===!0&&ae.setGlobalState(I.clippingPlanes,Q),Ns(R,se,Q),Ye.updateMultisampleRenderTarget(Ie),Ye.updateRenderTargetMipmap(Ie),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let vt=0,Bt=G.length;vt<Bt;vt++){let St=G[vt],{object:Dt,geometry:Qt,material:ze,group:Sn}=St;if(ze.side===ii&&Dt.layers.test(Q.layers)){let Ct=ze.side;ze.side=wn,ze.needsUpdate=!0,za(Dt,se,Q,Qt,ze,Sn),ze.side=Ct,ze.needsUpdate=!0,We=!0}}We===!0&&(Ye.updateMultisampleRenderTarget(Ie),Ye.updateRenderTargetMipmap(Ie))}I.setRenderTarget(Pe,Oe,$e),I.setClearColor(te,pe),xt!==void 0&&(Q.viewport=xt),I.toneMapping=ft}function Ns(R,G,se){let Q=G.isScene===!0?G.overrideMaterial:null;for(let ne=0,Ie=R.length;ne<Ie;ne++){let Ve=R[ne],{object:Pe,geometry:Oe,group:$e}=Ve,ft=Ve.material;ft.allowOverride===!0&&Q!==null&&(ft=Q),Pe.layers.test(se.layers)&&za(Pe,G,se,Oe,ft,$e)}}function za(R,G,se,Q,ne,Ie){T!==null&&ne.isNodeMaterial&&T.setObject(R,ne),R.onBeforeRender(I,G,se,Q,ne,Ie),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(I,G,se,Q,R,Ie),ne.transparent===!0&&ne.side===ii&&ne.forceSinglePass===!1?(ne.side=wn,ne.needsUpdate=!0,I.renderBufferDirect(se,G,Q,ne,R,Ie),ne.side=Yn,ne.needsUpdate=!0,I.renderBufferDirect(se,G,Q,ne,R,Ie),ne.side=ii):I.renderBufferDirect(se,G,Q,ne,R,Ie),R.onAfterRender(I,G,se,Q,ne,Ie)}function Ha(R){let G=0;for(let se of R)se.texture!==null&&G++;return G}function Us(R,G,se){G.isScene!==!0&&(G=At);let Q=Ne.get(R),ne=S.state.lights,Ie=S.state.shadowsArray,Ve=ne.state.version,Pe=oe.getParameters(R,ne.state,Ie,G,se,S.state.lightProbeGridArray),Oe=oe.getProgramCacheKey(Pe),$e=Q.programs;Q.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?G.environment:null,Q.fog=G.fog;let ft=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;Q.envMap=U.get(R.envMap||Q.environment,ft),Q.envMapRotation=Q.environment!==null&&R.envMap===null?G.environmentRotation:R.envMapRotation,$e===void 0&&(R.addEventListener("dispose",Rt),$e=new Map,Q.programs=$e,Q.programVariants=new Map);let xt=$e.get(Oe);if(xt!==void 0){if(Q.currentProgram===xt&&Q.lightsStateVersion===Ve)return uo(R,Pe),xt}else Pe.uniforms=oe.getUniforms(R),T!==null&&R.isNodeMaterial&&T.build(R,se,Pe),R.onBeforeCompile(Pe,I),xt=oe.acquireProgram(Pe,Oe),$e.set(Oe,xt),Q.uniforms=Pe.uniforms;let We=Q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(We.clippingPlanes=ae.uniform),uo(R,Pe),Q.needsLights=Ga(R),Q.lightsStateVersion=Ve,Q.needsLights&&(We.ambientLightColor.value=ne.state.ambient,We.lightProbe.value=ne.state.probe,We.sunLights.value=ne.state.sun,We.sunLightShadows.value=ne.state.sunShadow,We.directionalLights.value=ne.state.directional,We.directionalLightShadows.value=ne.state.directionalShadow,We.spotLights.value=ne.state.spot,We.spotLightShadows.value=ne.state.spotShadow,We.rectAreaLights.value=ne.state.rectArea,We.ltc_1.value=ne.state.rectAreaLTC1,We.ltc_2.value=ne.state.rectAreaLTC2,We.pointLights.value=ne.state.point,We.pointLightShadows.value=ne.state.pointShadow,We.hemisphereLights.value=ne.state.hemi,We.sunShadowMatrix.value=ne.state.sunShadowMatrix,We.sunShadowCascade.value=ne.state.sunShadowCascade,We.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,We.spotLightMatrix.value=ne.state.spotLightMatrix,We.spotLightMap.value=ne.state.spotLightMap,We.pointShadowMatrix.value=ne.state.pointShadowMatrix),Q.numLightProbeGrids=Ha(S.state.lightProbeGridArray),Q.currentProgram=xt,Q.uniformsList=null,xt}function an(R,G,se,Q,ne){let Ie=Ne.get(R),Ve=Ie.currentProgram.id+","+Q+","+ne,Pe=Ie.programVariants.get(Ve);return Pe===void 0?(Pe=Us(R,G,se),Ie.programVariants.set(Ve,Pe)):(Ie.currentProgram=Pe,Ie.uniformsList=null,Ie.outputColorSpace=Q,Ie.toneMapping=ne),Pe}function us(R){if(R.uniformsList===null){let G=R.currentProgram.getUniforms();R.uniformsList=jr.seqWithValue(G.seq,R.uniforms)}return R.uniformsList}function uo(R,G){let se=Ne.get(R);se.outputColorSpace=G.outputColorSpace,se.batching=G.batching,se.batchingColor=G.batchingColor,se.instancing=G.instancing,se.instancingColor=G.instancingColor,se.instancingMorph=G.instancingMorph,se.skinning=G.skinning,se.morphTargets=G.morphTargets,se.morphNormals=G.morphNormals,se.morphColors=G.morphColors,se.morphTargetsCount=G.morphTargetsCount,se.numClippingPlanes=G.numClippingPlanes,se.numIntersection=G.numClipIntersection,se.vertexAlphas=G.vertexAlphas,se.vertexTangents=G.vertexTangents,se.toneMapping=G.toneMapping}function or(R,G,se,Q,ne){G.isScene!==!0&&(G=At),Ye.resetTextureUnits();let Ie=G.fog,Ve=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?G.environment:null,Pe=$===null?I.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:_t.workingColorSpace,Oe=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,$e=U.get(Q.envMap||Ve,Oe),ft=Q.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,xt=!!se.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),We=!!se.morphAttributes.position,vt=!!se.morphAttributes.normal,Bt=!!se.morphAttributes.color,St=Ii;Q.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(St=I.toneMapping);let Dt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Qt=Dt!==void 0?Dt.length:0,ze=Ne.get(Q),Sn=S.state.lights;if(nt===!0&&(Et===!0||R!==V)){let he=R===V&&Q.id===B;ae.setState(Q,R,he)}let Ct=!1,ki=!1;Q.version===ze.__version?ze.needsLights&&ze.lightsStateVersion!==Sn.state.version||ne.isBatchedMesh&&ze.batching===!1||!ne.isBatchedMesh&&ze.batching===!0||ne.isBatchedMesh&&ze.batchingColor===!0&&ne._colorsTexture===null||ne.isBatchedMesh&&ze.batchingColor===!1&&ne._colorsTexture!==null||ne.isInstancedMesh&&ze.instancing===!1||!ne.isInstancedMesh&&ze.instancing===!0||ne.isSkinnedMesh&&ze.skinning===!1||!ne.isSkinnedMesh&&ze.skinning===!0||ne.isInstancedMesh&&ze.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&ze.instancingColor===!1&&ne.instanceColor!==null||ne.isInstancedMesh&&ze.instancingMorph===!0&&ne.morphTexture===null||ne.isInstancedMesh&&ze.instancingMorph===!1&&ne.morphTexture!==null||ze.envMap!==$e||Q.fog===!0&&ze.fog!==Ie||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==ae.numPlanes||ze.numIntersection!==ae.numIntersection)||ze.vertexAlphas!==ft||ze.vertexTangents!==xt||ze.morphTargets!==We||ze.morphNormals!==vt||ze.morphColors!==Bt||ze.morphTargetsCount!==Qt||ze.numLightProbeGrids!==Ha(S.state.lightProbeGridArray)?Ct=!0:(ze.outputColorSpace!==Pe||ze.toneMapping!==St)&&(ki=!0):(Ct=!0,ze.__version=Q.version);let gn=ze.currentProgram;(Ct===!0||ki===!0)&&(gn=ki===!0?an(Q,G,ne,Pe,St):Us(Q,G,ne),T&&Q.isNodeMaterial&&T.onUpdateProgram(Q,gn,ze));let C=!1,q=!1,de=!1,Z=gn.getUniforms(),ee=ze.uniforms;if(_e.useProgram(gn.program)&&(C=!0,q=!0,de=!0),Q.id!==B&&(B=Q.id,q=!0),C||V!==R){_e.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Z.setValue(F,"projectionMatrix",R.projectionMatrix),Z.setValue(F,"viewMatrix",R.matrixWorldInverse);let X=Z.map.cameraPosition;X!==void 0&&X.setValue(F,Ht.setFromMatrixPosition(R.matrixWorld)),Ze.logarithmicDepthBuffer&&Z.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Z.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),V!==R&&(V=R,q=!0,de=!0)}if(ze.needsLights&&(Sn.state.sunShadowMap.length>0&&Z.setValue(F,"sunShadowMap",Sn.state.sunShadowMap,Ye),Sn.state.directionalShadowMap.length>0&&Z.setValue(F,"directionalShadowMap",Sn.state.directionalShadowMap,Ye),Sn.state.spotShadowMap.length>0&&Z.setValue(F,"spotShadowMap",Sn.state.spotShadowMap,Ye),Sn.state.pointShadowMap.length>0&&Z.setValue(F,"pointShadowMap",Sn.state.pointShadowMap,Ye)),ne.isSkinnedMesh){Z.setOptional(F,ne,"bindMatrix"),Z.setOptional(F,ne,"bindMatrixInverse");let he=ne.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),Z.setValue(F,"boneTexture",he.boneTexture,Ye))}ne.isBatchedMesh&&(Z.setOptional(F,ne,"batchingTexture"),Z.setValue(F,"batchingTexture",ne._matricesTexture,Ye),Z.setOptional(F,ne,"batchingIdTexture"),Z.setValue(F,"batchingIdTexture",ne._indirectTexture,Ye),Z.setOptional(F,ne,"batchingColorTexture"),ne._colorsTexture!==null&&Z.setValue(F,"batchingColorTexture",ne._colorsTexture,Ye));let j=se.morphAttributes;if((j.position!==void 0||j.normal!==void 0||j.color!==void 0)&&ce.update(ne,se,gn),(q||ze.receiveShadow!==ne.receiveShadow)&&(ze.receiveShadow=ne.receiveShadow,Z.setValue(F,"receiveShadow",ne.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&G.environment!==null&&(ee.envMapIntensity.value=G.environmentIntensity),ee.dfgLUT!==void 0&&(ee.dfgLUT.value=bv()),q){if(Z.setValue(F,"toneMappingExposure",I.toneMappingExposure),ze.needsLights&&uh(ee,de),Ie&&Q.fog===!0&&Ae.refreshFogUniforms(ee,Ie),Ae.refreshMaterialUniforms(ee,Q,ye,De,S.state.transmissionRenderTarget[R.id]),ze.needsLights&&ze.numLightProbeGrids>0){let he=v,X=0;for(let me of S.state.lightProbeGridArray)me.texture!==null&&(he.textures[X]=me.texture,he.min[X]=me.boundingBox.min,he.max[X]=me.boundingBox.max,he.resolution[X]=me.resolution,X++);for(let me in he)he[me].length=X;ee.probesSH.value=he.textures,ee.probesMin.value=he.min,ee.probesMax.value=he.max,ee.probesResolution.value=he.resolution}jr.upload(F,us(ze),ee,Ye)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(jr.upload(F,us(ze),ee,Ye),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Z.setValue(F,"center",ne.center),Z.setValue(F,"modelViewMatrix",ne.modelViewMatrix),Z.setValue(F,"normalMatrix",ne.normalMatrix),Z.setValue(F,"modelMatrix",ne.matrixWorld),Q.uniformsGroups!==void 0){let he=Q.uniformsGroups;for(let X=0,me=he.length;X<me;X++){let Ce=he[X];Je.update(Ce,gn),Je.bind(Ce,gn)}}return gn}function uh(R,G){R.ambientLightColor.needsUpdate=G,R.lightProbe.needsUpdate=G,R.sunLights.needsUpdate=G,R.sunLightShadows.needsUpdate=G,R.directionalLights.needsUpdate=G,R.directionalLightShadows.needsUpdate=G,R.pointLights.needsUpdate=G,R.pointLightShadows.needsUpdate=G,R.spotLights.needsUpdate=G,R.spotLightShadows.needsUpdate=G,R.rectAreaLights.needsUpdate=G,R.hemisphereLights.needsUpdate=G}function Ga(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(R,G,se){let Q=Ne.get(R);Q.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),Ne.get(R.texture).__webglTexture=G,Ne.get(R.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:se,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,G){let se=Ne.get(R);se.__webglFramebuffer=G,se.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(R,G=0,se=0){$=R,z=G,O=se;let Q=null,ne=!1,Ie=!1;if(R){let Pe=Ne.get(R);if(Pe.__useDefaultFramebuffer!==void 0){_e.bindFramebuffer(F.FRAMEBUFFER,Pe.__webglFramebuffer),J.copy(R.viewport),ue.copy(R.scissor),xe=R.scissorTest,_e.viewport(J),_e.scissor(ue),_e.setScissorTest(xe),B=-1;return}else if(Pe.__webglFramebuffer===void 0)Ye.setupRenderTarget(R);else if(Pe.__hasExternalTextures)Ye.rebindTextures(R,Ne.get(R.texture).__webglTexture,Ne.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let ft=R.depthTexture;if(Pe.__boundDepthTexture!==ft){if(ft!==null&&Ne.has(ft)&&(R.width!==ft.image.width||R.height!==ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(R)}}let Oe=R.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Ie=!0);let $e=Ne.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray($e[G])?Q=$e[G][se]:Q=$e[G],ne=!0):R.samples>0&&Ye.useMultisampledRTT(R)===!1?Q=Ne.get(R).__webglMultisampledFramebuffer:Array.isArray($e)?Q=$e[se]:Q=$e,J.copy(R.viewport),ue.copy(R.scissor),xe=R.scissorTest}else J.copy(qe).multiplyScalar(ye).floor(),ue.copy(tt).multiplyScalar(ye).floor(),xe=ct;if(se!==0&&(Q=D),_e.bindFramebuffer(F.FRAMEBUFFER,Q)&&_e.drawBuffers(R,Q),_e.viewport(J),_e.scissor(ue),_e.setScissorTest(xe),ne){let Pe=Ne.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+G,Pe.__webglTexture,se)}else if(Ie){let Pe=G;for(let Oe=0;Oe<R.textures.length;Oe++){let $e=Ne.get(R.textures[Oe]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Oe,$e.__webglTexture,se,Pe)}}else if(R!==null&&se!==0){let Pe=Ne.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Pe.__webglTexture,se)}B=-1};function Va(R){let G=Ne.get(R);return(G.__readFormat!==R.format||G.__readType!==R.type)&&(G.__readFormat=R.format,G.__readType=R.type,G.__formatReadable=Ze.textureFormatReadable(R.format),G.__typeReadable=Ze.textureTypeReadable(R.type)),G}this.readRenderTargetPixels=function(R,G,se,Q,ne,Ie,Ve,Pe=0){if(!(R&&R.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ve!==void 0&&(Oe=Oe[Ve],Array.isArray(Oe)&&(Oe=Oe[0])),Oe){_e.bindFramebuffer(F.FRAMEBUFFER,Oe);try{let $e=R.textures[Pe],ft=$e.format,xt=$e.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Pe);let We=Va($e);if(We.__formatReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(We.__typeReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=R.width-Q&&se>=0&&se<=R.height-ne&&F.readPixels(G,se,Q,ne,Se.convert(ft),Se.convert(xt),Ie)}finally{let $e=$!==null?Ne.get($).__webglFramebuffer:null;_e.bindFramebuffer(F.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(R,G,se,Q,ne,Ie,Ve,Pe=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ve!==void 0&&(Oe=Oe[Ve],Array.isArray(Oe)&&(Oe=Oe[0])),Oe)if(G>=0&&G<=R.width-Q&&se>=0&&se<=R.height-ne){_e.bindFramebuffer(F.FRAMEBUFFER,Oe);let $e=R.textures[Pe],ft=$e.format,xt=$e.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Pe);let We=Va($e);if(We.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(We.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let vt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,vt),F.bufferData(F.PIXEL_PACK_BUFFER,Ie.byteLength,F.STREAM_READ),F.readPixels(G,se,Q,ne,Se.convert(ft),Se.convert(xt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Bt=$!==null?Ne.get($).__webglFramebuffer:null;_e.bindFramebuffer(F.FRAMEBUFFER,Bt);let St=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await ep(F,St,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,vt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Ie),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(vt),F.deleteSync(St),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,G=null,se=0){let Q=Math.pow(2,-se),ne=Math.floor(R.image.width*Q),Ie=Math.floor(R.image.height*Q),Ve=G!==null?G.x:0,Pe=G!==null?G.y:0;Ye.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,se,0,0,Ve,Pe,ne,Ie),_e.unbindTexture()},this.copyTextureToTexture=function(R,G,se=null,Q=null,ne=0,Ie=0){let Ve,Pe,Oe,$e,ft,xt,We,vt,Bt,St=R.isCompressedTexture?R.mipmaps[Ie]:R.image;if(se!==null)Ve=se.max.x-se.min.x,Pe=se.max.y-se.min.y,Oe=se.isBox3?se.max.z-se.min.z:1,$e=se.min.x,ft=se.min.y,xt=se.isBox3?se.min.z:0;else{let Z=Math.pow(2,-ne);Ve=Math.floor(St.width*Z),Pe=Math.floor(St.height*Z),R.isDataArrayTexture?Oe=St.depth:R.isData3DTexture?Oe=Math.floor(St.depth*Z):Oe=1,$e=0,ft=0,xt=0}Q!==null?(We=Q.x,vt=Q.y,Bt=Q.z):(We=0,vt=0,Bt=0);let Dt=Se.convert(G.format),Qt=Se.convert(G.type),ze;G.isData3DTexture?(Ye.setTexture3D(G,0),ze=F.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Ye.setTexture2DArray(G,0),ze=F.TEXTURE_2D_ARRAY):(Ye.setTexture2D(G,0),ze=F.TEXTURE_2D),_e.activeTexture(F.TEXTURE0),_e.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),_e.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),_e.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);let Sn=_e.getParameter(F.UNPACK_ROW_LENGTH),Ct=_e.getParameter(F.UNPACK_IMAGE_HEIGHT),ki=_e.getParameter(F.UNPACK_SKIP_PIXELS),gn=_e.getParameter(F.UNPACK_SKIP_ROWS),C=_e.getParameter(F.UNPACK_SKIP_IMAGES);_e.pixelStorei(F.UNPACK_ROW_LENGTH,St.width),_e.pixelStorei(F.UNPACK_IMAGE_HEIGHT,St.height),_e.pixelStorei(F.UNPACK_SKIP_PIXELS,$e),_e.pixelStorei(F.UNPACK_SKIP_ROWS,ft),_e.pixelStorei(F.UNPACK_SKIP_IMAGES,xt);let q=R.isDataArrayTexture||R.isData3DTexture,de=G.isDataArrayTexture||G.isData3DTexture;if(R.isDepthTexture){let Z=Ne.get(R),ee=Ne.get(G),j=Ne.get(Z.__renderTarget),he=Ne.get(ee.__renderTarget);_e.bindFramebuffer(F.READ_FRAMEBUFFER,j.__webglFramebuffer),_e.bindFramebuffer(F.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let X=0;X<Oe;X++)q&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ne.get(R).__webglTexture,ne,xt+X),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ne.get(G).__webglTexture,Ie,Bt+X)),F.blitFramebuffer($e,ft,$e+Ve,ft+Pe,We,vt,We+Ve,vt+Pe,F.DEPTH_BUFFER_BIT,F.NEAREST);_e.bindFramebuffer(F.READ_FRAMEBUFFER,null),_e.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(ne!==0||R.isRenderTargetTexture||Ne.has(R)){let Z=Ne.get(R),ee=Ne.get(G);_e.bindFramebuffer(F.READ_FRAMEBUFFER,A),_e.bindFramebuffer(F.DRAW_FRAMEBUFFER,N);for(let j=0;j<Oe;j++)q?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Z.__webglTexture,ne,xt+j):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Z.__webglTexture,ne),de?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ee.__webglTexture,Ie,Bt+j):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ee.__webglTexture,Ie),ne!==0?F.blitFramebuffer($e,ft,$e+Ve,ft+Pe,We,vt,We+Ve,vt+Pe,F.COLOR_BUFFER_BIT,F.NEAREST):de?F.copyTexSubImage3D(ze,Ie,We,vt,Bt+j,$e,ft,Ve,Pe):F.copyTexSubImage2D(ze,Ie,We,vt,$e,ft,Ve,Pe);_e.bindFramebuffer(F.READ_FRAMEBUFFER,null),_e.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else de?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(ze,Ie,We,vt,Bt,Ve,Pe,Oe,Dt,Qt,St.data):G.isCompressedArrayTexture?F.compressedTexSubImage3D(ze,Ie,We,vt,Bt,Ve,Pe,Oe,Dt,St.data):F.texSubImage3D(ze,Ie,We,vt,Bt,Ve,Pe,Oe,Dt,Qt,St):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Ie,We,vt,Ve,Pe,Dt,Qt,St.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Ie,We,vt,St.width,St.height,Dt,St.data):F.texSubImage2D(F.TEXTURE_2D,Ie,We,vt,Ve,Pe,Dt,Qt,St);_e.pixelStorei(F.UNPACK_ROW_LENGTH,Sn),_e.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ct),_e.pixelStorei(F.UNPACK_SKIP_PIXELS,ki),_e.pixelStorei(F.UNPACK_SKIP_ROWS,gn),_e.pixelStorei(F.UNPACK_SKIP_IMAGES,C),Ie===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&F.generateMipmap(ze),_e.unbindTexture()},this.initRenderTarget=function(R){Ne.get(R).__webglFramebuffer===void 0&&Ye.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ye.setTextureCube(R,0):R.isData3DTexture?Ye.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ye.setTexture2DArray(R,0):Ye.setTexture2D(R,0),_e.unbindTexture()},this.resetState=function(){z=0,O=0,$=null,_e.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};var Fp={type:"change"},Bu={type:"start"},kp={type:"end"},Fc=new Ai,Bp=new Wn,Sv=Math.cos(70*vn.DEG2RAD),mn=new Y,Hn=2*Math.PI,Lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fu=1e-6,Bc=class extends jo{constructor(e,t=null){super(e,t),this.state=Lt.NONE,this.target=new Y,this.cursor=new Y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ws.ROTATE,MIDDLE:ws.DOLLY,RIGHT:ws.PAN},this.touches={ONE:xi.ROTATE,TWO:xi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Y,this._lastQuaternion=new Rn,this._lastTargetPosition=new Y,this._quat=new Rn().setFromUnitVectors(e.up,new Y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ms,this._sphericalDelta=new Ms,this._scale=1,this._panOffset=new Y,this._rotateStart=new Ke,this._rotateEnd=new Ke,this._rotateDelta=new Ke,this._panStart=new Ke,this._panEnd=new Ke,this._panDelta=new Ke,this._dollyStart=new Ke,this._dollyEnd=new Ke,this._dollyDelta=new Ke,this._dollyDirection=new Y,this._mouse=new Ke,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wv.bind(this),this._onPointerDown=Mv.bind(this),this._onPointerUp=Tv.bind(this),this._onContextMenu=Lv.bind(this),this._onMouseWheel=Rv.bind(this),this._onKeyDown=Cv.bind(this),this._onTouchStart=Pv.bind(this),this._onTouchMove=Iv.bind(this),this._onMouseDown=Av.bind(this),this._onMouseMove=Ev.bind(this),this._interceptControlDown=Dv.bind(this),this._interceptControlUp=Nv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Lt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Fp),this.update(),this.state=Lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;mn.copy(t).sub(this.target),mn.applyQuaternion(this._quat),this._spherical.setFromVector3(mn),this.autoRotate&&this.state===Lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Hn:n>Math.PI&&(n-=Hn),s<-Math.PI?s+=Hn:s>Math.PI&&(s-=Hn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(mn.setFromSpherical(this._spherical),mn.applyQuaternion(this._quatInverse),t.copy(this.target).add(mn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=mn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new Y(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new Y(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=mn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Fc.origin.copy(this.object.position),Fc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fc.direction))<Sv?this.object.lookAt(this.target):(Bp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fc.intersectPlane(Bp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fu||this._lastTargetPosition.distanceToSquared(this.target)>Fu?(this.dispatchEvent(Fp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Hn/60*this.autoRotateSpeed*e:Hn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){mn.setFromMatrixColumn(t,0),mn.multiplyScalar(-e),this._panOffset.add(mn)}_panUp(e,t){this.screenSpacePanning===!0?mn.setFromMatrixColumn(t,1):(mn.setFromMatrixColumn(t,0),mn.crossVectors(this.object.up,mn)),mn.multiplyScalar(e),this._panOffset.add(mn)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;mn.copy(s).sub(this.target);let r=mn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ke,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Mv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function wv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Tv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(kp),this.state=Lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Av(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ws.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Lt.DOLLY;break;case ws.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}break;case ws.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Bu)}function Ev(i){switch(this.state){case Lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Rv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Lt.NONE||(i.preventDefault(),this.dispatchEvent(Bu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(kp))}function Cv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Pv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case xi.ROTATE:if(this.enableRotate===!1){this.state=Lt.NONE;break}this._handleTouchStartRotate(i),this.state=Lt.TOUCH_ROTATE;break;case xi.PAN:if(this.enablePan===!1){this.state=Lt.NONE;break}this._handleTouchStartPan(i),this.state=Lt.TOUCH_PAN;break;default:this.state=Lt.NONE}break;case 2:switch(this.touches.TWO){case xi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Lt.TOUCH_DOLLY_PAN;break;case xi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Lt.TOUCH_DOLLY_ROTATE;break;default:this.state=Lt.NONE}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Bu)}function Iv(i){switch(this._trackPointer(i),this.state){case Lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Lt.NONE}}function Lv(i){this.enabled!==!1&&i.preventDefault()}function Dv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Nv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ku(i,e){if(e===du)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Kr||e===fa){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Kr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function kc(i){let e=new Map,t=new Map,n=i.clone();return zp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function zp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)zp(i.children[n],e.children[n],t)}var zc=class extends Pi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Yu(t)}),this.register(function(t){return new qu(t)}),this.register(function(t){return new Zu(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new Ku(t)}),this.register(function(t){return new ju(t)}),this.register(function(t){return new Ju(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new Xu(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new $u(t)}),this.register(function(t){return new nd(t)}),this.register(function(t){return new td(t)}),this.register(function(t){return new Vu(t)}),this.register(function(t){return new Hc(t,wt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Hc(t,wt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new od(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=os.extractUrlBase(e);o=os.resolveURL(c,this.path)}else o=os.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Gr(this.manager);l.setPriority(this.priority),l.setCache(this.cache),l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Xp){try{o[wt.KHR_BINARY_GLTF]=new ad(e)}catch(u){s&&s(u);return}r=JSON.parse(o[wt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new pd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case wt.KHR_MATERIALS_UNLIT:o[u]=new Wu;break;case wt.KHR_DRACO_MESH_COMPRESSION:o[u]=new ld(r,this.dracoLoader);break;case wt.KHR_TEXTURE_TRANSFORM:o[u]=new cd;break;case wt.KHR_MESH_QUANTIZATION:o[u]=new hd;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Uv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Kt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var wt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Vu=class{constructor(e){this.parser=e,this.name=wt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Xe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Un);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new rs(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ks(h),c.distance=u;break;case"spot":c=new qo(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Ui(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},Wu=class{constructor(){this.name=wt.KHR_MATERIALS_UNLIT}getMaterialType(){return Xn}extendParams(e,t,n){let s=[];e.color=new Xe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Un),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(s)}},Xu=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Yu=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ke(r,r)}return Promise.all(s)}},qu=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},Zu=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},$u=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Ku=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Xe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Un)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Nt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},ju=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Ju=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Xe().setRGB(r[0],r[1],r[2],Un),Promise.all(s)}},Qu=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_IOR}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},ed=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Xe().setRGB(r[0],r[1],r[2],Un),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Nt)),Promise.all(s)}},td=class{constructor(e){this.parser=e,this.name=wt.EXT_MATERIALS_BUMP}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},nd=class{constructor(e){this.parser=e,this.name=wt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},id=class{constructor(e){this.parser=e,this.name=wt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},sd=class{constructor(e){this.parser=e,this.name=wt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},rd=class{constructor(e){this.parser=e,this.name=wt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},Hc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},od=class{constructor(e){this.name=wt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==ai.TRIANGLES&&c.mode!==ai.TRIANGLE_STRIP&&c.mode!==ai.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],f=c[0].count,d=[];for(let m of u){let _=new rt,p=new Y,x=new Rn,y=new Y(1,1,1),M=new Lo(m.geometry,m.material,f);for(let w=0;w<f;w++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,w),l.ROTATION&&x.fromBufferAttribute(l.ROTATION,w),l.SCALE&&y.fromBufferAttribute(l.SCALE,w),M.setMatrixAt(w,_.compose(p,x,y));let v=null;for(let w in l)if(w==="_COLOR_0"){let S=l[w];M.instanceColor=new es(S.array,S.itemSize,S.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(v===null){let g=M.geometry;v=new $t,v.name=g.name;for(let b in g.attributes)v.setAttribute(b,g.attributes[b]);for(let b in g.morphAttributes)v.morphAttributes[b]=g.morphAttributes[b];g.index!==null&&v.setIndex(g.index),v.morphTargetsRelative=g.morphTargetsRelative;for(let b of g.groups)v.addGroup(b.start,b.count,b.materialIndex);g.boundingBox!==null&&(v.boundingBox=g.boundingBox.clone()),g.boundingSphere!==null&&(v.boundingSphere=g.boundingSphere.clone()),v.drawRange.start=g.drawRange.start,v.drawRange.count=g.drawRange.count,v.userData=Object.assign({},g.userData),M.geometry=v}let S=l[w];v.setAttribute(w,new es(S.array,S.itemSize,S.normalized))}Xt.prototype.copy.call(M,m),this.parser.assignFinalMaterial(M),d.push(M)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Xp="glTF",ya=12,Hp={JSON:1313821514,BIN:5130562},ad=class{constructor(e){this.name=wt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ya),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Xp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ya,r=new DataView(e,ya),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===Hp.JSON){let c=new Uint8Array(e,ya+o,a);this.content=n.decode(c)}else if(l===Hp.BIN){let c=ya+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ld=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=wt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=dd[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=dd[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],d=eo[f.componentType];c[u]=d.name,l[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let m in d.attributes){let _=d.attributes[m],p=l[m];p!==void 0&&(_.normalized=p)}u(d)},a,c,Un,f)})})}},cd=class{constructor(){this.name=wt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},hd=class{constructor(){this.name=wt.KHR_MESH_QUANTIZATION}},Gc=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,u=(n-t)/h,f=u*u,d=f*u,m=e*c,_=m-c,p=-2*d+3*f,x=d-f,y=1-p,M=x-f+u;for(let v=0;v!==a;v++){let w=o[_+v+a],S=o[_+v+l]*h,g=o[m+v+a],b=o[m+v]*h;r[v]=y*w+M*S+p*g+x*b}return r}},Ov=new Rn,ud=class extends Gc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Ov.fromArray(r).normalize().toArray(r),r}},ai={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},eo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gp={9728:Wt,9729:hn,9984:ql,9985:Zr,9986:er,9987:ri},Vp={33071:Qn,33648:Rr,10497:cn},zu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},dd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},As={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Fv={CUBICSPLINE:void 0,LINEAR:Ws,STEP:Vs},Hu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Bv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new ni({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yn})),i.DefaultMaterial}function nr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ui(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function kv(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],f=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function zv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Hv(i){let e,t=i.extensions&&i.extensions[wt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gu(t.attributes):e=i.indices+":"+Gu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Gu(i.targets[n]);return e}function Gu(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function fd(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Gv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Vv=new rt,pd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Uv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?(this.textureLoader=new Wo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Zo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Gr(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return nr(r,a,s),Ui(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[wt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(os.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=zu[s.type],a=eo[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Mn(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=zu[s.type],c=eo[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,_,p;if(d&&d!==u){let x=Math.floor(f/d),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+x+":"+s.count,M=t.cache.get(y);M||(_=new c(a,x*d,s.count*d/h),M=new Or(_,d/h),t.cache.add(y,M)),p=new Fr(M,l,f%d/h,m)}else a===null?_=new c(s.count*l):_=new c(a,f,s.count*l),p=new Mn(_,l,m);if(s.sparse!==void 0){let x=zu.SCALAR,y=eo[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,w=new y(o[1],M,s.sparse.count*x),S=new c(o[2],v,s.sparse.count*l);a!==null&&(p=new Mn(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let g=0,b=w.length;g<b;g++){let L=w[g];if(p.setX(L,S[g*l]),l>=2&&p.setY(L,S[g*l+1]),l>=3&&p.setZ(L,S[g*l+2]),l>=4&&p.setW(L,S[g*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=Gp[f.magFilter]||hn,h.minFilter=Gp[f.minFilter]||ri,h.wrapS=Vp[f.wrapS]||cn,h.wrapT=Vp[f.wrapT]||cn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Wt&&h.minFilter!==hn,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1,h;if(t.isKTX2Loader===!0&&o.bufferView!==void 0)h=n.getDependency("bufferView",o.bufferView).then(function(f){return new Promise(function(d,m){t.parse(f,d,m)})});else{if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(f){c=!0;let d=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(l).then(function(f){return new Promise(function(d,m){let _=d;t.isImageBitmapLoader===!0&&(_=function(p){let x=new un(p);x.needsUpdate=!0,d(x)}),t.load(os.resolveURL(f,r.path),_,void 0,m)})})}let u=h.then(function(f){return c===!0&&a.revokeObjectURL(l),Ui(f,o),f.userData.mimeType=o.mimeType||Gv(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[wt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[wt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[wt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new kr,Cn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new bs,Cn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ni}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[wt.KHR_MATERIALS_UNLIT]){let u=s[wt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Xe(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Un),a.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Nt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=ii);let h=r.alphaMode||Hu.OPAQUE;if(h===Hu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Hu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Xn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ke(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Xn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Xn){let u=r.emissiveFactor;a.emissive=new Xe().setRGB(u[0],u[1],u[2],Un)}return r.emissiveTexture!==void 0&&o!==Xn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(c).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Ui(u,r),t.associations.set(u,{materials:e}),r.extensions&&nr(s,u,r),u})}createUniqueName(e){let t=kt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[wt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Wp(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=Hv(c),u=s[h];if(u)o.push(u.promise);else{let f;c.extensions&&c.extensions[wt.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=Wp(new $t,c,t),c.mode===ai.TRIANGLE_STRIP?f=f.then(d=>ku(d,fa)):c.mode===ai.TRIANGLE_FAN&&(f=f.then(d=>ku(d,Kr))),s[h]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?Bv(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let _=h[d],p=o[d],x,y=c[d];if(p.mode===ai.TRIANGLES||p.mode===ai.TRIANGLE_STRIP||p.mode===ai.TRIANGLE_FAN||p.mode===void 0){let M=r.isSkinnedMesh===!0,v=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");M&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),x=M&&v?new Po(_,y):new Ut(_,y),x.isSkinnedMesh===!0&&x.normalizeSkinWeights()}else if(p.mode===ai.LINES)x=new qs(_,y);else if(p.mode===ai.LINE_STRIP)x=new Ys(_,y);else if(p.mode===ai.LINE_LOOP)x=new Do(_,y);else if(p.mode===ai.POINTS)x=new No(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(x.geometry.morphAttributes).length>0&&zv(x,r),x.name=t.createUniqueName(r.name||"mesh_"+e),Ui(x,r),p.extensions&&nr(s,x,p),t.assignFinalMaterial(x),u.push(x)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&nr(s,u[0],r),u[0];let f=new jt;r.extensions&&nr(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,m=u.length;d<m;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ln(vn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new gi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ui(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let f=new rt;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Io(a,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],m=s.samplers[d.sampler],_=d.target,p=_.node,x=s.parameters!==void 0?s.parameters[m.input]:m.input,y=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",x)),l.push(this.getDependency("accessor",y)),c.push(m),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],m=u[2],_=u[3],p=u[4],x=[];for(let M=0,v=f.length;M<v;M++){let w=f[M],S=d[M],g=m[M],b=_[M],L=p[M];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let I=n._createAnimationTracks(w,S,g,b,L);if(I)for(let P=0;P<I.length;P++)x.push(I[P])}let y=new Vo(r,void 0,x);return Ui(y,s),y})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],f=c[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,Vv)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){let d=h.userData.pivot,m=u[0];h.pivot=new Y().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Br:c.length>1?h=new jt:c.length===1?h=c[0]:h=new Xt,h!==c[0])for(let u=0,f=c.length;u<f;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Ui(h,r),r.extensions&&nr(n,h,r),r.matrix!==void 0){let u=new rt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new jt;n.name&&(r.name=s.createUniqueName(n.name)),Ui(r,n),n.extensions&&nr(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++){let f=l[h];f.parent!==null?r.add(kc(f)):r.add(f)}let c=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof Cn||f instanceof un)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];function c(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}As[r.path]===As.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let h;switch(As[r.path]){case As.weights:h=ns;break;case As.rotation:h=is;break;case As.translation:case As.scale:h=Ss;break;default:n.itemSize===1?h=ns:h=Ss;break}let u=s.interpolation!==void 0?Fv[s.interpolation]:Ws,f=this._getArrayFromAccessor(n);for(let d=0,m=l.length;d<m;d++){let _=new h(l[d]+"."+As[r.path],t.array,f,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=fd(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof is?ud:Gc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Wv(i,e,t){let n=e.attributes,s=new Zt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new Y(l[0],l[1],l[2]),new Y(c[0],c[1],c[2])),a.normalized){let h=fd(eo[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new Y,l=new Y;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,m=f.max;if(d!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),f.normalized){let _=fd(eo[f.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Bn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Wp(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=dd[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return _t.workingColorSpace!==Un&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${_t.workingColorSpace}" not supported.`),Ui(i,e),Wv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?kv(i,e.targets,t):i})}var va=new Y;function li(i,e,t,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;va.copy(e),va[n]=0,va.normalize();let c=.5*o/(o+a),h=1-va.angleTo(i)/l;return Math.sign(va[t])===1?h*c:a/(o+a)+c+c*(1-h)}var Vc=class i extends mi{constructor(e=1,t=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new Y,c=new Y,h=new Y(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,m=u.length/6,_=new Y,p=.5/o;for(let x=0,y=0;x<u.length;x+=3,y+=2)switch(l.fromArray(u,x),c.copy(l),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),u[x+0]=h.x*Math.sign(l.x)+c.x*r,u[x+1]=h.y*Math.sign(l.y)+c.y*r,u[x+2]=h.z*Math.sign(l.z)+c.z*r,f[x+0]=c.x,f[x+1]=c.y,f[x+2]=c.z,Math.floor(x/m)){case 0:_.set(1,0,0),d[y+0]=li(_,c,"z","y",r,n),d[y+1]=1-li(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),d[y+0]=1-li(_,c,"z","y",r,n),d[y+1]=1-li(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),d[y+0]=1-li(_,c,"x","z",r,e),d[y+1]=li(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),d[y+0]=1-li(_,c,"x","z",r,e),d[y+1]=1-li(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),d[y+0]=1-li(_,c,"x","y",r,e),d[y+1]=1-li(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),d[y+0]=li(_,c,"x","y",r,e),d[y+1]=1-li(_,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var to={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Zn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Xv=new gi(-1,1,1,-1,0,1),md=class extends $t{constructor(){super(),this.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new zt([0,2,0,0,2,0],2))}},Yv=new md,Es=class{constructor(e){this._mesh=new Ut(Yv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Xv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Wc=class extends Zn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof dn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=oi.clone(e.uniforms),this.material=new dn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Es(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ba=class extends Zn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Xc=class extends Zn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Yc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Ke);this._width=n.width,this._height=n.height,t=new _n(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:In}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Wc(to),this.copyPass.material.blending=yn,this.timer=new $o}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ba!==void 0&&(o instanceof ba?n=!0:o instanceof Xc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Ke);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var qc=class extends Zn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Xe}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};var Sa={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ke},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new rt},cameraProjectionMatrixInverse:{value:new rt},cameraWorldMatrix:{value:new rt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new Y(-1,-1,-1)},sceneBoxMax:{value:new Y(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).r;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).r;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				#if PERSPECTIVE_CAMERA == 1
					vec3 viewDir = normalize(-viewPos.xyz);
				#else
					vec3 viewDir = vec3(0., 0., 1.);
				#endif
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Ma={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Zc={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Yp(i=5){let e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=qv(e),n=t.length,s=new Uint8Array(n*4);for(let o=0;o<n;++o){let a=t[o],l=2*Math.PI*a/n,c=new Y(Math.cos(l),Math.sin(l),0).normalize();s[o*4]=(c.x*.5+.5)*255,s[o*4+1]=(c.y*.5+.5)*255,s[o*4+2]=127,s[o*4+3]=255}let r=new Ei(s,e,e);return r.wrapS=cn,r.wrapT=cn,r.needsUpdate=!0,r}function qv(i){let e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,n=Array(t).fill(0),s=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),n[s*e+r]!==0){r-=2,s++;continue}else n[s*e+r]=o++;r++,s--}return n}var wa={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:gd(16,2,1),NORMAL_VECTOR_TYPE:1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ke},cameraProjectionMatrixInverse:{value:new rt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).r;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).r;
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function gd(i,e,t){let n=Zv(i,e,t),s="vec3[SAMPLES](";for(let r=0;r<i;r++){let o=n[r];s+=`vec3(${o.x}, ${o.y}, ${o.z})${r<i-1?",":")"}`}return s}function Zv(i,e,t){let n=[];for(let s=0;s<i;s++){let r=2*Math.PI*e*s/i,o=Math.pow(s/(i-1),t);n.push(new Y(Math.cos(r),Math.sin(r),o))}return n}var $c=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r,o=.5*(Math.sqrt(3)-1),a=(e+t)*o,l=Math.floor(e+a),c=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(l+c)*h,f=l-u,d=c-u,m=e-f,_=t-d,p,x;m>_?(p=1,x=0):(p=0,x=1);let y=m-p+h,M=_-x+h,v=m-1+2*h,w=_-1+2*h,S=l&255,g=c&255,b=this.perm[S+this.perm[g]]%12,L=this.perm[S+p+this.perm[g+x]]%12,I=this.perm[S+1+this.perm[g+1]]%12,P=.5-m*m-_*_;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[b],m,_));let T=.5-y*y-M*M;T<0?s=0:(T*=T,s=T*T*this._dot(this.grad3[L],y,M));let D=.5-v*v-w*w;return D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[I],v,w)),70*(n+s+r)}noise3d(e,t,n){let s,r,o,a,c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),f=Math.floor(n+c),d=1/6,m=(h+u+f)*d,_=h-m,p=u-m,x=f-m,y=e-_,M=t-p,v=n-x,w,S,g,b,L,I;y>=M?M>=v?(w=1,S=0,g=0,b=1,L=1,I=0):y>=v?(w=1,S=0,g=0,b=1,L=0,I=1):(w=0,S=0,g=1,b=1,L=0,I=1):M<v?(w=0,S=0,g=1,b=0,L=1,I=1):y<v?(w=0,S=1,g=0,b=0,L=1,I=1):(w=0,S=1,g=0,b=1,L=1,I=0);let P=y-w+d,T=M-S+d,D=v-g+d,A=y-b+2*d,N=M-L+2*d,z=v-I+2*d,O=y-1+3*d,$=M-1+3*d,B=v-1+3*d,V=h&255,J=u&255,ue=f&255,xe=this.perm[V+this.perm[J+this.perm[ue]]]%12,te=this.perm[V+w+this.perm[J+S+this.perm[ue+g]]]%12,pe=this.perm[V+b+this.perm[J+L+this.perm[ue+I]]]%12,ge=this.perm[V+1+this.perm[J+1+this.perm[ue+1]]]%12,De=.6-y*y-M*M-v*v;De<0?s=0:(De*=De,s=De*De*this._dot3(this.grad3[xe],y,M,v));let ye=.6-P*P-T*T-D*D;ye<0?r=0:(ye*=ye,r=ye*ye*this._dot3(this.grad3[te],P,T,D));let Ge=.6-A*A-N*N-z*z;Ge<0?o=0:(Ge*=Ge,o=Ge*Ge*this._dot3(this.grad3[pe],A,N,z));let gt=.6-O*O-$*$-B*B;return gt<0?a=0:(gt*=gt,a=gt*gt*this._dot3(this.grad3[ge],O,$,B)),32*(s+r+o+a)}noise4d(e,t,n,s){let r=this.grad4,o=this.simplex,a=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,f,d,m,_=(e+t+n+s)*l,p=Math.floor(e+_),x=Math.floor(t+_),y=Math.floor(n+_),M=Math.floor(s+_),v=(p+x+y+M)*c,w=p-v,S=x-v,g=y-v,b=M-v,L=e-w,I=t-S,P=n-g,T=s-b,D=L>I?32:0,A=L>P?16:0,N=I>P?8:0,z=L>T?4:0,O=I>T?2:0,$=P>T?1:0,B=D+A+N+z+O+$,V=o[B][0]>=3?1:0,J=o[B][1]>=3?1:0,ue=o[B][2]>=3?1:0,xe=o[B][3]>=3?1:0,te=o[B][0]>=2?1:0,pe=o[B][1]>=2?1:0,ge=o[B][2]>=2?1:0,De=o[B][3]>=2?1:0,ye=o[B][0]>=1?1:0,Ge=o[B][1]>=1?1:0,gt=o[B][2]>=1?1:0,qe=o[B][3]>=1?1:0,tt=L-V+c,ct=I-J+c,je=P-ue+c,ke=T-xe+c,nt=L-te+2*c,Et=I-pe+2*c,ht=P-ge+2*c,Ht=T-De+2*c,at=L-ye+3*c,At=I-Ge+3*c,Ft=P-gt+3*c,Be=T-qe+3*c,F=L-1+4*c,ot=I-1+4*c,Ue=P-1+4*c,Ze=T-1+4*c,_e=p&255,st=x&255,Ne=y&255,Ye=M&255,U=a[_e+a[st+a[Ne+a[Ye]]]]%32,E=a[_e+V+a[st+J+a[Ne+ue+a[Ye+xe]]]]%32,K=a[_e+te+a[st+pe+a[Ne+ge+a[Ye+De]]]]%32,fe=a[_e+ye+a[st+Ge+a[Ne+gt+a[Ye+qe]]]]%32,oe=a[_e+1+a[st+1+a[Ne+1+a[Ye+1]]]]%32,Ae=.6-L*L-I*I-P*P-T*T;Ae<0?h=0:(Ae*=Ae,h=Ae*Ae*this._dot4(r[U],L,I,P,T));let Te=.6-tt*tt-ct*ct-je*je-ke*ke;Te<0?u=0:(Te*=Te,u=Te*Te*this._dot4(r[E],tt,ct,je,ke));let re=.6-nt*nt-Et*Et-ht*ht-Ht*Ht;re<0?f=0:(re*=re,f=re*re*this._dot4(r[K],nt,Et,ht,Ht));let ae=.6-at*at-At*At-Ft*Ft-Be*Be;ae<0?d=0:(ae*=ae,d=ae*ae*this._dot4(r[fe],at,At,Ft,Be));let Me=.6-F*F-ot*ot-Ue*Ue-Ze*Ze;return Me<0?m=0:(Me*=Me,m=Me*Me*this._dot4(r[oe],F,ot,Ue,Ze)),27*(h+u+f+d+m)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}};var no=class i extends Zn{constructor(e,t,n=512,s=512,r,o,a){super(),this.width=n,this.height=s,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Yp(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new _n(this.width,this.height,{type:In,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new dn({defines:Object.assign({},Sa.defines),uniforms:oi.clone(Sa.uniforms),vertexShader:Sa.vertexShader,fragmentShader:Sa.fragmentShader,blending:yn,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Ho,this.normalMaterial.blending=yn,this.pdMaterial=new dn({defines:Object.assign({},wa.defines),uniforms:oi.clone(wa.uniforms),vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new dn({defines:Object.assign({},Ma.defines),uniforms:oi.clone(Ma.uniforms),vertexShader:Ma.vertexShader,fragmentShader:Ma.fragmentShader,blending:yn}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new dn({uniforms:oi.clone(to.uniforms),vertexShader:to.vertexShader,fragmentShader:to.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ea,blendDst:js,blendEquation:si,blendSrcAlpha:Qo,blendDstAlpha:js,blendEquationAlpha:si}),this.blendMaterial=new dn({uniforms:oi.clone(Zc.uniforms),vertexShader:Zc.vertexShader,fragmentShader:Zc.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Wl,blendSrc:ea,blendDst:js,blendEquation:si,blendSrcAlpha:Qo,blendDstAlpha:js,blendEquationAlpha:si}),this._fsQuad=new Es(null),this._originalClearColor=new Xe,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget&&this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget&&this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){if(e!==void 0)this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1;else{if(this.normalRenderTarget===void 0){let s=new pi;s.format=yi,s.type=as,this.normalRenderTarget=new _n(this.width,this.height,{minFilter:Wt,magFilter:Wt,type:In,depthTexture:s})}this.depthTexture=this.normalRenderTarget.depthTexture,this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0}let n=this.normalTexture?1:0;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.needsUpdate=!0,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.needsUpdate=!0,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=gd(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case i.OUTPUT.Off:break;case i.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=yn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=yn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=yn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalTexture||null,this.copyMaterial.blending=yn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=yn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new $c,n=e*e*4,s=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){let l=o,c=a;s[(o*e+a)*4]=(t.noise(l,c)*.5+.5)*255,s[(o*e+a)*4+1]=(t.noise(l+e,c)*.5+.5)*255,s[(o*e+a)*4+2]=(t.noise(l,c+e)*.5+.5)*255,s[(o*e+a)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new Ei(s,e,e,zn,Pn);return r.wrapS=cn,r.wrapT=cn,r.needsUpdate=!0,r}};no.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ta={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Kc=class extends Zn{constructor(){super(),this.isOutputPass=!0,this.uniforms=oi.clone(Ta.uniforms),this.material=new zr({name:Ta.name,uniforms:this.uniforms,vertexShader:Ta.vertexShader,fragmentShader:Ta.fragmentShader}),this._fsQuad=new Es(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},_t.getTransfer(this._outputColorSpace)===Pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ta?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===na?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===sa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Js?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===oa?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ra&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Aa=Math.PI/180,$v=1e-6,qp={hinge:{stiffness:74,damping:15.2,maxSpeed:3.4,softCloseZone:.14,softCloseDamp:14,bounce:.14},flap:{stiffness:64,damping:14.5,maxSpeed:3,softCloseZone:.16,softCloseDamp:14,bounce:.1},slide:{stiffness:105,damping:19,maxSpeed:4.2,softCloseZone:.12,softCloseDamp:16,bounce:.12},"slide-x":{stiffness:95,damping:18,maxSpeed:3.8,softCloseZone:.12,softCloseDamp:14,bounce:.12},lift:{stiffness:70,damping:15.5,maxSpeed:3,softCloseZone:.14,softCloseDamp:14,bounce:.08}};function io(i,e,t){return i<e?e:i>t?t:i}function jc(i,e){return i[0]*e[0]+i[1]*e[1]+i[2]*e[2]}function Kv(i,e,t){let n=Math.cos(i),s=Math.sin(i),r=Math.cos(e),o=Math.sin(e),a=Math.cos(t),l=Math.sin(t),c=n*a,h=n*l,u=s*a,f=s*l;return[[r*a,h+u*o,f-c*o],[-r*l,c-f*o,u+h*o],[o,-s*r,n*r]]}function Jc(i,e){let t=Math.cos(e),n=Math.sin(e);return[i[0]*t+i[2]*n,i[1],-i[0]*n+i[2]*t]}function Qc(i,e){let t=Math.cos(e),n=Math.sin(e);return[i[0],i[1]*t-i[2]*n,i[1]*n+i[2]*t]}function eh(i,e,t){let[n,s,r]=i.size,o=Math.min(.5,Math.min(n,s,r)*.15),a=[n*.5-o,s*.5-o,r*.5-o],l=Math.hypot(a[0],a[1],a[2]),c=i.localBasis;if(!e)return{c:i.center,u:c,e:a,r:l};let h=t??0,u=e.travel*h,f=i.pivot,d=i.center[0]-f[0],m=i.center[1]-f[1],_=i.center[2]-f[2],p=c;if(e.type==="hinge"){let x=u*Aa,y=Jc([d,m,_],x);d=y[0],m=y[1],_=y[2],p=[Jc(c[0],x),Jc(c[1],x),Jc(c[2],x)]}else if(e.type==="flap"){let x=u*Aa,y=Qc([d,m,_],x);d=y[0],m=y[1],_=y[2],p=[Qc(c[0],x),Qc(c[1],x),Qc(c[2],x)]}else e.type==="slide"?_+=u:e.type==="slide-x"?d+=u:e.type==="lift"&&(m+=u);return{c:[f[0]+d,f[1]+m,f[2]+_],u:p,e:a,r:l}}function xd(i,e){let t=e.c[0]-i.c[0],n=e.c[1]-i.c[1],s=e.c[2]-i.c[2],r=i.r+e.r;if(t*t+n*n+s*s>r*r)return!1;let o=[t,n,s],a=[jc(o,i.u[0]),jc(o,i.u[1]),jc(o,i.u[2])],l=[[0,0,0],[0,0,0],[0,0,0]],c=[[0,0,0],[0,0,0],[0,0,0]];for(let m=0;m<3;m++)for(let _=0;_<3;_++){let p=jc(i.u[m],e.u[_]);l[m][_]=p,c[m][_]=Math.abs(p)+$v}let h=i.e,u=e.e;for(let m=0;m<3;m++){let _=h[m],p=u[0]*c[m][0]+u[1]*c[m][1]+u[2]*c[m][2];if(Math.abs(a[m])>_+p)return!1}for(let m=0;m<3;m++){let _=h[0]*c[0][m]+h[1]*c[1][m]+h[2]*c[2][m],p=u[m];if(Math.abs(a[0]*l[0][m]+a[1]*l[1][m]+a[2]*l[2][m])>_+p)return!1}let f,d;return f=h[1]*c[2][0]+h[2]*c[1][0],d=u[1]*c[0][2]+u[2]*c[0][1],!(Math.abs(a[2]*l[1][0]-a[1]*l[2][0])>f+d||(f=h[1]*c[2][1]+h[2]*c[1][1],d=u[0]*c[0][2]+u[2]*c[0][0],Math.abs(a[2]*l[1][1]-a[1]*l[2][1])>f+d)||(f=h[1]*c[2][2]+h[2]*c[1][2],d=u[0]*c[0][1]+u[1]*c[0][0],Math.abs(a[2]*l[1][2]-a[1]*l[2][2])>f+d)||(f=h[0]*c[2][0]+h[2]*c[0][0],d=u[1]*c[1][2]+u[2]*c[1][1],Math.abs(a[0]*l[2][0]-a[2]*l[0][0])>f+d)||(f=h[0]*c[2][1]+h[2]*c[0][1],d=u[0]*c[1][2]+u[2]*c[1][0],Math.abs(a[0]*l[2][1]-a[2]*l[0][1])>f+d)||(f=h[0]*c[2][2]+h[2]*c[0][2],d=u[0]*c[1][1]+u[1]*c[1][0],Math.abs(a[0]*l[2][2]-a[2]*l[0][2])>f+d)||(f=h[0]*c[1][0]+h[1]*c[0][0],d=u[1]*c[2][2]+u[2]*c[2][1],Math.abs(a[1]*l[0][0]-a[0]*l[1][0])>f+d)||(f=h[0]*c[1][1]+h[1]*c[0][1],d=u[0]*c[2][2]+u[2]*c[2][0],Math.abs(a[1]*l[0][1]-a[0]*l[1][1])>f+d)||(f=h[0]*c[1][2]+h[1]*c[0][2],d=u[0]*c[2][1]+u[1]*c[2][0],Math.abs(a[1]*l[0][2]-a[0]*l[1][2])>f+d))}function Zp(i){let e=new Map(i.joints.map(f=>[f.id,f])),t=new Map(i.slots.map(f=>[f.id,f])),n=[],s=[],r=new Map,o=new Set;function a(f,d){let m=new Map;for(let _ of i.joints)m.set(_.id,Mi(_.pivot,f));n=[],s=[],r=new Map(i.joints.map(_=>[_.id,[]]));for(let _ of i.parts){if(!_.when.every(g=>d[g.option]===g.choice))continue;let x=Mi(_.size,f),y=Mi(_.center,f),M=Kv(_.rotation[0]*Aa,_.rotation[1]*Aa,_.rotation[2]*Aa),v=_.joint?e.get(_.joint):null,w=_.joint?m.get(_.joint):null,S={def:_,size:x,center:y,localBasis:M,jointDef:v,pivot:w};n.push(S),_.joint?r.get(_.joint).push(S):s.push({entry:S,obb:eh(S,null,0)})}o=new Set;for(let[_,p]of r){let x=e.get(_);for(let y of p){let M=eh(y,x,0);for(let v of s)xd(M,v.obb)&&o.add(`${y.def.id}\0${v.entry.def.id}`)}}}function l(f,d,m){let _=r.get(f);if(!_?.length)return null;let p=e.get(f),x=_.map(y=>({entry:y,obb:eh(y,p,d)}));for(let[y,M]of r){if(y===f||!M.length)continue;let v=e.get(y),w=m[y]??0;for(let S of M){let g=eh(S,v,w);for(let b of x)if(xd(b.obb,g))return{partId:S.def.id,jointId:y,label:v.label}}}for(let y of s){let M=y.entry.def.id;for(let v of x)if(!o.has(`${v.entry.def.id}\0${M}`)&&xd(v.obb,y.obb)){let w=y.entry.def.slot?t.get(y.entry.def.slot)?.label:null;return{partId:M,jointId:null,label:w||"Cabinet structure"}}}return null}function c(f,d,m,_){let p=io(d,0,1),x=io(m,0,1),y=e.get(f);if(!y||!r.get(f)?.length)return{progress:x,blocked:!1,blocker:null};if(Math.abs(x-p)<=1e-7)return{progress:x,blocked:!1,blocker:null};let M=l(f,p,_),w=y.type==="hinge"||y.type==="flap"?2/Math.max(1,Math.abs(y.travel)):6/Math.max(1,Math.abs(y.travel)),S=Math.abs(x-p),g=Math.min(96,Math.max(1,Math.ceil(S/Math.max(.005,w))));if(M){if(x>p)return{progress:p,blocked:!0,blocker:M};let L=!1,I=p;for(let P=1;P<=g;P++){let T=P/g,D=p+(x-p)*T,A=l(f,D,_);if(!A)L=!0,I=D;else if(L){let N=I,z=D;for(let O=0;O<10;O++){let $=(N+z)*.5;l(f,$,_)?z=$:N=$}return{progress:N,blocked:!0,blocker:A}}}return{progress:x,blocked:!1,blocker:null}}let b=p;for(let L=1;L<=g;L++){let I=L/g,P=p+(x-p)*I,T=l(f,P,_);if(T){let D=b,A=P;for(let N=0;N<10;N++){let z=(D+A)*.5;l(f,z,_)?A=z:D=z}return{progress:D,blocked:!0,blocker:T}}b=P}return{progress:x,blocked:!1,blocker:null}}function h(f){let d={...f},m={};for(let _ of i.joints){let p=io(d[_.id]??0,0,1);if(p<=0||!l(_.id,p,d))continue;let x=48,y=0;for(let M=x-1;M>=0;M--){let v=p*(M/x);if(!l(_.id,v,d)){let w=v,S=p*((M+1)/x);for(let g=0;g<10;g++){let b=(w+S)*.5;l(_.id,b,d)?S=b:w=b}y=w;break}}d[_.id]=y,m[_.id]=y}return m}function u(f){let d=e.get(f);return qp[d?.type]||qp.hinge}return{setDimensionsAndOptions:a,checkJointCollision:l,resolveJointMotion:c,resolveAllOverlaps:h,getJointPhysics:u}}function $p(i,e,t){let n=io(t,0,.05);if(n<=0)return{moved:!1,animating:!1,collisions:[]};let s=1/120,r=Math.max(1,Math.ceil(n/s)),o=n/r,a={};for(let f of e.values())a[f.id]=f.current;let l=!1,c=[],h=new Set;for(let f=0;f<r;f++)for(let d of e.values()){let m=d.target-d.current;if(Math.abs(m)<=3e-4&&Math.abs(d.velocity)<=.002){if(d.current!==d.target){let M=i.resolveJointMotion(d.id,d.current,d.target,a);d.current=M.progress,a[d.id]=M.progress,l=!0}d.velocity=0;continue}let _=i.getJointPhysics(d.id),p=_.stiffness*m-_.damping*d.velocity;if(d.velocity<0&&d.target<d.current&&d.current<_.softCloseZone){let M=1-d.current/_.softCloseZone;p-=_.softCloseDamp*M*d.velocity}d.velocity=io(d.velocity+p*o,-_.maxSpeed,_.maxSpeed);let x=d.current+d.velocity*o;x<=0&&d.target<=0?(x=0,d.velocity=0):x>=1&&d.target>=1?(x=1,d.velocity=0):x=io(x,0,1);let y=i.resolveJointMotion(d.id,d.current,x,a);Math.abs(y.progress-d.current)>1e-6&&(l=!0),d.current=y.progress,a[d.id]=y.progress,y.blocked&&(d.target=y.progress,d.velocity=Math.abs(d.velocity)>.08?-d.velocity*_.bounce:0,h.has(d.id)||(h.add(d.id),c.push({id:d.id,label:d.label,blockerLabel:y.blocker.label,blockerJointId:y.blocker.jointId,blockerPartId:y.blocker.partId,progress:y.progress})))}let u=!1;for(let f of e.values())if(Math.abs(f.target-f.current)>3e-4||Math.abs(f.velocity)>.002){u=!0;break}return{moved:l,animating:u,collisions:c}}var Rs={daylight:{label:"Daylight",bgInner:"#f4f0e8",bgOuter:"#ded6c7",hemiSky:16775662,hemiGround:14931652,hemiIntensity:.56,keyColor:16774628,keyIntensity:2.35,fillColor:14477567,fillIntensity:.72,rimColor:16773595,rimIntensity:.55,exposure:1.04,envIntensity:.85,envSoftbox:16776437,envWindow:15397631,envRim:16773334,envFloor:14143166,envWall:12761256,lightBoost:1},gallery:{label:"Warm gallery",bgInner:"#efe7d8",bgOuter:"#d5c7b2",hemiSky:16773596,hemiGround:14337710,hemiIntensity:.52,keyColor:16770751,keyIntensity:2.45,fillColor:15132914,fillIntensity:.6,rimColor:16768174,rimIntensity:.7,exposure:1.02,envIntensity:.88,envSoftbox:16774110,envWindow:16770236,envRim:16766369,envFloor:13285793,envWall:11969676,lightBoost:1.15},crisp:{label:"Crisp neutral",bgInner:"#f5f6f4",bgOuter:"#dee1de",hemiSky:16777215,hemiGround:14475228,hemiIntensity:.58,keyColor:16777215,keyIntensity:2.25,fillColor:15002879,fillIntensity:.8,rimColor:16054271,rimIntensity:.5,exposure:1,envIntensity:.85,envSoftbox:16777215,envWindow:15397375,envRim:16251391,envFloor:14080470,envWall:12633280,lightBoost:1},evening:{label:"Warm evening",bgInner:"#2e2b27",bgOuter:"#171614",hemiSky:4936035,hemiGround:2498844,hemiIntensity:.28,keyColor:16766888,keyIntensity:.68,fillColor:6452114,fillIntensity:.28,rimColor:16759160,rimIntensity:.42,exposure:1.08,envIntensity:.34,envSoftbox:6445648,envWindow:4938872,envRim:8413253,envFloor:2762273,envWall:1973016,lightBoost:2.35}},th={2700:{id:"2700",kelvin:2700,color:"#ffbd75",emissive:"#ffcf91"},3500:{id:"3500",kelvin:3500,color:"#ffd8a8",emissive:"#ffe4bd"},4500:{id:"4500",kelvin:4500,color:"#fff2e2",emissive:"#fff7ec"}},Ea=[{id:"plaster",key:"wallPlaster",hex:"#ece6dc"},{id:"gallery",key:"wallGallery",hex:"#f4f2ee"},{id:"stone",key:"wallStone",hex:"#d4cec4"},{id:"sage",key:"wallSage",hex:"#cad0c5"},{id:"charcoal",key:"wallCharcoal",hex:"#414346"}],Cs=[{id:"oak",key:"floorOak",baseHex:"#b8946e",grainHex:"#9c7853",lineHex:"#7d5f41"},{id:"stone",key:"floorStone",baseHex:"#d9d3c8",grainHex:"#cbc4b7",lineHex:"#b3aba0"},{id:"concrete",key:"floorConcrete",baseHex:"#9d9d9a",grainHex:"#8d8e8b",lineHex:"#737472"}];var Kp=/chair|stool|bench|sofa|couch|seat|cushion|ottoman|armchair|loveseat|banquette|pouf|כיסא|כסא|ספסל|ספה|מושב|הדום/i,Qp=(i,e,t)=>Math.max(e,Math.min(t,i));function so(i,e,t,n,s=0){return i<n-s&&e>t+s}function em(i,e){if(!e?.length)return[];let t=`${i?.name||""} ${i?.description||""}`,n=Kp.test(t),s=e.reduce((l,c)=>Math.max(l,c.maxY),0),r=(i?.joints?.length??0)>0,o=[];for(let l of e){if(l.jointId)continue;let c=l.maxX-l.minX,h=l.maxY-l.minY,u=l.maxZ-l.minZ,f=`${l.id||""} ${l.slotLabel||""}`,d=n||Kp.test(f),m=/stool|בר|כיסא בר/i.test(`${t} ${f}`)?820:620,_=d&&c>=280&&u>=260&&h<=220&&l.maxY>=300&&l.maxY<=m,p=!d&&!r&&s<=1200&&c>=340&&u>=300&&h<=140&&l.maxY>=360&&l.maxY<=520;if(!_&&!p)continue;let x=(l.minX+l.maxX)*.5,y=(l.minZ+l.maxZ)*.5,M=!1;for(let N of e)if(N.id!==l.id&&N.minY>=l.maxY-10&&N.minY<=l.maxY+750&&so(x-60,x+60,N.minX,N.maxX)&&so(y-60,y+60,N.minZ,N.maxZ)){M=!0;break}if(M)continue;let v=[{nx:0,nz:1,edge:"minZ"},{nx:0,nz:-1,edge:"maxZ"},{nx:1,nz:0,edge:"minX"},{nx:-1,nz:0,edge:"maxX"}],w={nx:0,nz:1},S=0;for(let N of e)if(!(N.id===l.id||N.maxY<l.maxY+180))for(let z of v){let O=!1,$=0;if(z.edge==="minZ"&&N.maxZ<=l.minZ+140&&N.minZ>=l.minZ-260&&so(l.minX+30,l.maxX-30,N.minX,N.maxX)||z.edge==="maxZ"&&N.minZ>=l.maxZ-140&&N.maxZ<=l.maxZ+260&&so(l.minX+30,l.maxX-30,N.minX,N.maxX)?(O=!0,$=Math.min(l.maxX,N.maxX)-Math.max(l.minX,N.minX)):(z.edge==="minX"&&N.maxX<=l.minX+140&&N.minX>=l.minX-260&&so(l.minZ+30,l.maxZ-30,N.minZ,N.maxZ)||z.edge==="maxX"&&N.minX>=l.maxX-140&&N.maxX<=l.maxX+260&&so(l.minZ+30,l.maxZ-30,N.minZ,N.maxZ))&&(O=!0,$=Math.min(l.maxZ,N.maxZ)-Math.max(l.minZ,N.minZ)),O){let B=$*(N.maxY-l.maxY);B>S&&(S=B,w={nx:z.nx,nz:z.nz})}}let{nx:g,nz:b}=w,L=Math.abs(g)>.5?c:u,I=x+g*Math.min(45,c*.1),P=y+b*Math.min(45,u*.1),T=x+g*(L*.5+340),D=y+b*(L*.5+340),A=Math.atan2(g,b);o.push({id:l.id,label:l.slotLabel||l.id,seatX:I,seatY:l.maxY,seatZ:P,faceYaw:A,nx:g,nz:b,approachX:T,approachZ:D})}o.sort((l,c)=>c.seatY-l.seatY);let a=[];for(let l of o)a.some(c=>Math.hypot(c.seatX-l.seatX,c.seatZ-l.seatZ)<180)||a.push(l);return a}function jp(i){let e=1/0,t=1/0,n=1/0,s=-1/0,r=-1/0,o=-1/0;for(let a of i)a.minX<e&&(e=a.minX),a.minY<t&&(t=a.minY),a.minZ<n&&(n=a.minZ),a.maxX>s&&(s=a.maxX),a.maxY>r&&(r=a.maxY),a.maxZ>o&&(o=a.maxZ);return{minX:e,minY:t,minZ:n,maxX:s,maxY:r,maxZ:o,cx:(e+s)*.5,cy:(t+r)*.5,cz:(n+o)*.5,sx:s-e,sy:r-t,sz:o-n}}function tm(i,e=240){let t=[];for(let n of i||[]){if(n.minY>2100||n.maxY<20)continue;let s=n.maxX-n.minX,r=n.maxZ-n.minZ;s<40&&r<40&&n.maxY<200||t.push({minX:n.minX-e,maxX:n.maxX+e,minZ:n.minZ-e,maxZ:n.maxZ+e})}return t}function Ra(i,e,t,n=1){for(let s of t)if(i>s.minX+n&&i<s.maxX-n&&e>s.minZ+n&&e<s.maxZ-n)return!0;return!1}function _d({kind:i,id:e,label:t,def:n,targetBoxes:s,staticBoxes:r=[],pivot:o=null}){if(!s?.length)return null;let a=jp(s),l=s.filter(g=>g.slotId==="hardware"||Math.max(g.maxX-g.minX,g.maxY-g.minY,g.maxZ-g.minZ)<=220),c=l.length?jp(l):a,h=c.cx,u=c.cy,f=c.cz,d=(r||[]).filter(g=>g.minY<=2100&&g.maxY>=80),m=g=>{for(let[b,L]of g){let I=h+b*480,P=f+L*480;if(!Ra(I,P,d,-160))return[b,L]}return g[0]},_=0,p=1;if(i==="joint"&&n)if(n.type==="slide")_=0,p=Math.sign(n.travel)||1;else if(n.type==="slide-x")_=Math.sign(n.travel)||1,p=0;else if(n.type==="flap"){let g=a.sz<=a.sx?[[0,1],[0,-1]]:[[1,0],[-1,0]];[_,p]=m(g)}else if(n.type==="hinge"){let g=a.sz<=a.sx?[[0,1],[0,-1]]:[[1,0],[-1,0]];[_,p]=m(g)}else[_,p]=m([[0,1],[1,0],[-1,0],[0,-1]]);else[_,p]=m([[0,1],[1,0],[-1,0],[0,-1]]);let x=i==="switch"?460:n?.type==="slide"||n?.type==="slide-x"?600:560,y=h+_*x,M=f+p*x;if(i==="joint"&&n?.type==="hinge"&&Array.isArray(o))if(Math.abs(p)>.5){let g=Math.sign(h-o[0])||1;y+=g*140}else{let g=Math.sign(f-o[2])||1;M+=g*140}let v=tm(r,220);for(let g=0;g<3&&Ra(y,M,v,4);g++)y+=_*160,M+=p*160;let w=Math.atan2(h-y,f-M),S=Qp(u,450,1650);return{kind:i,id:e,label:t,tx:h,ty:u,tz:f,standX:y,standZ:M,faceYaw:w,nx:_,nz:p,reachY:S}}function jv(i,e,t,n,s){let r=0,o=1,a=t-i,l=n-e,c=[[-a,i-s.minX],[a,s.maxX-i],[-l,e-s.minZ],[l,s.maxZ-e]];for(let[h,u]of c)if(Math.abs(h)<1e-8){if(u<=0)return!1}else{let f=u/h;if(h<0){if(f>o)return!1;f>r&&(r=f)}else{if(f<r)return!1;f<o&&(o=f)}}return r<o-1e-4}function Jp(i,e,t){for(let n of t)if(jv(i[0],i[1],e[0],e[1],n))return!0;return!1}function yd(i,e,t=[],n=240){let s=[i[0],i[1]],r=[e[0],e[1]];if(Math.hypot(r[0]-s[0],r[1]-s[1])<5)return[r];let a=tm(t,n).filter(S=>!Ra(s[0],s[1],[S],0)&&!Ra(r[0],r[1],[S],0));if(!Jp(s,r,a))return[r];let l=[[s[0],r[1]],[r[0],s[1]]],c=40,h=1/0,u=-1/0,f=1/0,d=-1/0;for(let S of a)S.minX<h&&(h=S.minX),S.maxX>u&&(u=S.maxX),S.minZ<f&&(f=S.minZ),S.maxZ>d&&(d=S.maxZ),l.push([S.minX-c,S.minZ-c],[S.maxX+c,S.minZ-c],[S.minX-c,S.maxZ+c],[S.maxX+c,S.maxZ+c]);Number.isFinite(h)&&l.push([h-180,f-180],[u+180,f-180],[h-180,d+180],[u+180,d+180]);let m=[s],_=new Set;for(let S of l){if(Ra(S[0],S[1],a,0))continue;let g=`${Math.round(S[0]/120)}:${Math.round(S[1]/120)}`;if(!_.has(g)&&(_.add(g),m.push(S),m.length>=44))break}m.push(r);let p=m.length,x=p-1,y=new Float64Array(p).fill(1/0),M=new Int32Array(p).fill(-1),v=new Uint8Array(p);y[0]=0;for(let S=0;S<p;S++){let g=-1,b=1/0;for(let L=0;L<p;L++)!v[L]&&y[L]<b&&(b=y[L],g=L);if(g<0||g===x)break;v[g]=1;for(let L=0;L<p;L++){if(v[L]||g===L||Jp(m[g],m[L],a))continue;let I=y[g]+Math.hypot(m[L][0]-m[g][0],m[L][1]-m[g][1]);I<y[L]&&(y[L]=I,M[L]=g)}}if(!Number.isFinite(y[x]))return[r];let w=[];for(let S=x;S>0&&(w.push(m[S]),!(M[S]<0));S=M[S]);return w.reverse(),w.length?w:[r]}function nm({candidates:i=[],lastActionId:e=null,isSeated:t=!1,rng:n=Math.random}={}){if(!i.length)return t?{kind:"stand",id:"__stand__",label:"Reference person"}:null;let s=i.length>1&&e?i.filter(a=>a.id!==e):i,r=s.length?s:i,o=Math.floor(Qp(n(),0,.999999)*r.length);return r[o]}var vd=new Xe(16777215);function vi(i){let t=[],n=[];for(let o=0;o<i.length;o++){let[a,l,c,h=0]=i[o];for(let u=0;u<32;u++){let f=u*2*Math.PI/32;if(t.push(Math.sin(f)*l,a,Math.cos(f)*c+h),o){let d=(o-1)*32+u,m=(o-1)*32+(u+1)%32;n.push(d,m,m+32,d,m+32,d+32)}}}let s=(i.length-1)*32;for(let o=1;o<31;o++)n.push(0,o+1,o,s,s+o,s+o+1);let r=new $t;return r.setAttribute("position",new zt(t,3)),r.setIndex(n),r.computeVertexNormals(),r}function im(){let i=new jt,e=(P,T,D={})=>new nn({color:P,roughness:T,metalness:0,envMapIntensity:.85,...D}),t=e("#ad8265",.68,{clearcoat:.04,clearcoatRoughness:.6}),n=e("#55756e",.92,{sheen:.35,sheenRoughness:.8,envMapIntensity:.8}),s=e("#565755",.92,{sheen:.35,sheenRoughness:.8,envMapIntensity:.8}),r=e("#475e59",.92,{sheen:.35,sheenRoughness:.8,envMapIntensity:.8}),o=e("#57524d",.82),a=e("#ddd7c9",.84),l=new Zs(1,24,16),c=(P,T,D,A)=>{let N=new jt;return N.position.set(T,D,A),P.add(N),N},h=(P,T,D,A=0,N=0,z=0)=>{let O=new Ut(T,D);return O.position.set(A,N,z),O.castShadow=O.receiveShadow=!0,O.userData.interactive={type:"person",label:"Reference person"},P.add(O),O},u=(P,T,D,A,N,z,O,$)=>{let B=h(P,l,T,D,A,N);return B.scale.set(z,O,$),B},f=c(i,0,0,0),d=c(f,0,0,0),m=c(d,0,.335,0);h(d,vi([[-.044,.048,.04],[-.029,.083,.06],[-.003,.094,.066],[.035,.09,.057],[.057,.081,.052]]),s),h(d,vi([[.025,.086,.056],[.031,.09,.058],[.08,.088,.057],[.15,.093,.063],[.212,.109,.069,.005],[.25,.116,.064,.002],[.279,.111,.056,-.002],[.298,.078,.046],[.309,.044,.037]]),n),h(d,vi([[.303,.047,.041],[.311,.044,.037],[.315,.04,.034]]),r),u(d,t,0,.328,.001,.036,.047,.033),h(m,vi([[0,.019,.024,.012],[.007,.033,.036,.012],[.025,.043,.048,.006],[.052,.05,.056],[.076,.052,.058,-.003],[.103,.049,.055,-.005],[.126,.037,.044,-.005],[.139,.019,.024,-.003],[.143,.002,.003,-.003]]),t),u(m,t,0,.054,.052,.011,.015,.012);let _=[],p=vi([[-.257,.028,.03],[-.242,.04,.041],[-.203,.043,.045],[-.12,.047,.053],[-.052,.053,.061],[-.012,.05,.061],[.016,.036,.048]]),x=vi([[-.219,.029,.032],[-.213,.032,.034],[-.14,.034,.038,-.005],[-.092,.039,.044,-.007],[-.035,.035,.039],[.003,.037,.039],[.01,.031,.033]]),y=vi([[-.049,.033,.069,.026],[-.041,.036,.074,.026],[-.025,.034,.07,.024],[-.014,.033,.049,.013],[.013,.029,.032,-.003]]),M=vi([[-.053,.031,.068,.026],[-.051,.036,.074,.026],[-.044,.036,.074,.026]]),v=vi([[-.1,.036,.041],[-.093,.039,.043],[-.052,.042,.048],[-.011,.041,.046],[.015,.034,.039],[.03,.012,.019]]),w=vi([[-.156,.025,.026],[-.146,.031,.031],[-.091,.032,.034],[-.04,.034,.037]]),S=vi([[-.137,.018,.02],[-.116,.02,.022],[-.073,.025,.029],[-.035,.029,.031],[.004,.025,.026]]);for(let P of[-1,1]){u(m,t,P*.049,.06,0,.009,.015,.01);let T=c(f,P*.048,0,0),D=c(T,0,-.242,0),A=c(D,0,-.227,0);h(T,p,s),h(D,x,s),h(A,y,a),h(A,M,o);let N=c(d,P*.108,.271,0),z=c(N,0,-.148,0);h(N,v,n),h(N,w,t),h(z,S,t),u(z,t,0,-.166,.004,.02,.042,.017),u(z,t,-P*.013,-.159,.016,.009,.021,.009).rotation.x=-.28,_.push({s:P,thigh:T,calf:D,foot:A,arm:N,elbow:z})}let g=null;function b(P){let T=P?-1.48:0,D=P?.07:0;f.position.y=.053+.242*Math.cos(T)+.227*Math.cos(D),d.rotation.set(P?-.08:0,0,0),m.rotation.set(0,0,0);for(let{s:A,thigh:N,calf:z,foot:O,arm:$,elbow:B}of _)N.rotation.set(T,A*.055,0,"YXZ"),z.rotation.x=D-T,O.rotation.x=-D,$.rotation.set(P?-.34:.08,0,A*(P?.12:.075)),B.rotation.x=P?-1.05:-.18}function L(P){if(g=P,i.visible=P.visible,!P.visible)return;let T=P.build==="slim"?.84:P.build==="broad"?1.19:1;i.scale.set(P.height*T,P.height,P.height*(.45+.55*T)),i.rotation.y=vn.degToRad(P.yaw),t.color.set(P.skin),n.color.set(P.top),s.color.set(P.bottom),r.color.copy(n.color).multiplyScalar(.78),n.sheenColor.copy(n.color).lerp(vd,.35),s.sheenColor.copy(s.color).lerp(vd,.35),r.sheenColor.copy(r.color).lerp(vd,.35),b(P.pose==="seated")}function I(P){if(!P){b(g?.pose==="seated");return}let T=P.walkPhase??0,D=vn.clamp(P.sitBlend??0,0,1),A=vn.clamp(P.walkBlend??0,0,1)*(1-D),N=vn.clamp(P.reachBlend??0,0,1),z=P.reachSide>=0?1:-1,O=vn.clamp(P.reachHeightNorm??.55,.2,.95),$=P.idleTime??0,B=-1.48*D,V=.07*D,J=.053+.242*Math.cos(B)+.227*Math.cos(V),ue=P.seatHeightNorm?vn.clamp(P.seatHeightNorm+.02,.21,.36):.053+.242*Math.cos(-1.48)+.227*Math.cos(.07),xe=Math.abs(Math.sin(T))*.015*A;f.position.y=J+(ue-J)*D+xe;let te=Math.sin($*1.9)*.014*(1-A),pe=N*Math.max(0,.52-O)*.45;d.rotation.set(-.08*D-pe+te,Math.sin(T)*.055*A,0),m.rotation.set(vn.clamp(P.headPitch??0,-.45,.45)-te*.4,vn.clamp(P.headYaw??0,-.7,.7),0);for(let{s:ge,thigh:De,calf:ye,foot:Ge,arm:gt,elbow:qe}of _){let tt=ge<0?0:Math.PI,ct=Math.sin(T+tt)*.48*A,je=Math.max(0,-Math.sin(T+tt))*.65*A,ke=B+ct,nt=V+je;De.rotation.set(ke,ge*.055,0,"YXZ"),ye.rotation.x=nt-ke,Ge.rotation.x=-nt;let Et=-Math.sin(T+tt)*.42*A,ht=(.08+Math.sin($*1.4+ge)*.025)*(1-D)+-.34*D,Ht=(-.18+Math.sin($*1.4+ge)*.02)*(1-D)+-1.05*D,At=ge===z?N:0,Ft=-.35-(O-.25)*1.35,Be=-.55+(O-.5)*.35;gt.rotation.set((ht+Et)*(1-At)+Ft*At,0,ge*((.075*(1-D)+.12*D)*(1-At)+.06*At)),qe.rotation.x=Ht*(1-At)+Be*At}}return{root:i,update:L,setMotion:I}}var Ps=Math.PI*2,Jv=new Xe(16777215);function Is(i,e,t,{colorSpace:n=Nt,repeatX:s=1,repeatY:r=1,anisotropy:o=1}={}){let a=document.createElement("canvas");a.width=i,a.height=e;let l=a.getContext("2d"),c=l.createImageData(i,e);t(c.data,i,e),l.putImageData(c,0,0);let h=new Ri(a);return h.colorSpace=n,h.wrapS=h.wrapT=cn,h.repeat.set(s,r),h.anisotropy=o,h}function nh(i,e,t,n,s,r,o){return Is(e,t,(a,l,c)=>{let h=(u,f)=>i[(f+c)%c*l+(u+l)%l];for(let u=0,f=0;u<c;u++)for(let d=0;d<l;d++,f+=4){let m=h(d-1,u-1),_=h(d,u-1),p=h(d+1,u-1),x=h(d-1,u),y=h(d+1,u),M=h(d-1,u+1),v=h(d,u+1),w=h(d+1,u+1),S=(p+2*y+w-(m+2*x+M))*n,g=(M+2*v+w-(m+2*_+p))*n,b=-S,L=-g,I=1,P=1/Math.hypot(b,L,I);a[f]=Math.round((b*P*.5+.5)*255),a[f+1]=Math.round((L*P*.5+.5)*255),a[f+2]=Math.round((I*P*.5+.5)*255),a[f+3]=255}},{colorSpace:On,repeatX:s,repeatY:r,anisotropy:o})}function Qv(i,e){let t=Math.min(8,e.capabilities.getMaxAnisotropy());if(i==="wood"){let m=.8064516129032258,_=500/230,p=new Float32Array(1024*512),x=new Uint8Array(1024*512),y=Is(1024,512,(w,S,g)=>{let b=64873;for(let L=0,I=0,P=0;L<g;L++){let T=L/g*Ps;for(let D=0;D<S;D++,I++,P+=4){b=Math.imul(b,1664525)+1013904223>>>0;let A=b/4294967296,N=D/S*Ps,z=T+.095*Math.sin(N+T)+.036*Math.sin(2*N-3*T)+.014*Math.cos(3*N+2*T),O=.5+.5*Math.sin(10*z+1.35*Math.sin(3*z+N)),$=.5+.5*Math.sin(82*z+1.9*Math.sin(2*N+7*T)),B=.5+.5*Math.sin(19*N+41*z),V=B>.91&&A>.42?(B-.91)*9.5:0,J=.5+.5*Math.sin(5*N-2*T),ue=Math.max(192,Math.min(252,Math.round(248-25*O**3.6-12*$**6-18*V-5*J-6*A)));w[P]=w[P+1]=w[P+2]=ue,w[P+3]=255,p[I]=.72*(1-O**3)+.16*(1-$**5)-.58*V-.06*A,x[I]=Math.round(255*Math.min(.62,.38+.14*O**2.6+.12*V+.03*A))}}},{colorSpace:Nt,repeatX:m,repeatY:_,anisotropy:t}),M=Is(1024,512,(w,S,g)=>{for(let b=0,L=0;b<S*g;b++,L+=4)w[L]=w[L+1]=w[L+2]=x[b],w[L+3]=255},{colorSpace:On,repeatX:m,repeatY:_,anisotropy:t}),v=nh(p,1024,512,1.35,m,_,t);return{map:y,normalMap:v,roughnessMap:M,normalScale:.28}}if(i==="fabric"){let m=10.869565217391305,_=500/46,p=new Float32Array(512*512),x=new Uint8Array(512*512),y=Is(512,512,(w,S,g)=>{let b=18397;for(let L=0,I=0,P=0;L<g;L++){let T=Math.floor(L/8),D=L%8/8,A=Math.sin(D*Math.PI);for(let N=0;N<S;N++,I++,P+=4){b=Math.imul(b,1664525)+1013904223>>>0;let z=b/4294967296,O=Math.floor(N/8),$=N%8/8,B=Math.sin($*Math.PI),V=(O+T&3)<2,J=.5+.5*Math.sin((V?L:N)*Ps/4+(V?N:L)*Ps/16),ue=(V?B*.72+A*.28:A*.72+B*.28)*(.82+.18*J),xe=Math.max(202,Math.min(250,Math.round(206+38*ue+6*(z-.5))));w[P]=w[P+1]=w[P+2]=xe,w[P+3]=255,p[I]=ue+.08*(z-.5),x[I]=Math.round(255*Math.min(.98,.84+.13*(1-ue)+.03*z))}}},{colorSpace:Nt,repeatX:m,repeatY:_,anisotropy:t}),M=Is(512,512,(w,S,g)=>{for(let b=0,L=0;b<S*g;b++,L+=4)w[L]=w[L+1]=w[L+2]=x[b],w[L+3]=255},{colorSpace:On,repeatX:m,repeatY:_,anisotropy:t}),v=nh(p,512,512,2.2,m,_,t);return{map:y,normalMap:v,roughnessMap:M,normalScale:.45}}if(i==="metal"){let m=2.7777777777777777,_=500/180,p=new Float32Array(512*512),x=new Uint8Array(512*512),y=new Float32Array(512),M=918273;for(let g=0;g<512;g++)M=Math.imul(M,1664525)+1013904223>>>0,y[g]=M/4294967296;let v=Is(512,512,(g,b,L)=>{let I=44291;for(let P=0,T=0,D=0;P<L;P++){let A=P/L*Ps,N=y[P],z=.5+.5*Math.sin(18*A+2.4*N);for(let O=0;O<b;O++,T++,D+=4){I=Math.imul(I,1664525)+1013904223>>>0;let $=I/4294967296,B=O/b*Ps,V=.5+.5*Math.sin(3*B+47*N+.7*Math.cos(7*B-11*A)),J=Math.max(228,Math.min(255,Math.round(234+13*V+6*z+4*$)));g[D]=g[D+1]=g[D+2]=J,g[D+3]=255,p[T]=.45*V+.35*N+.2*z,x[T]=Math.round(255*(.22+.13*(1-V)+.03*$))}}},{colorSpace:Nt,repeatX:m,repeatY:_,anisotropy:t}),w=Is(512,512,(g,b,L)=>{for(let I=0,P=0;I<b*L;I++,P+=4)g[P]=g[P+1]=g[P+2]=x[I],g[P+3]=255},{colorSpace:On,repeatX:m,repeatY:_,anisotropy:t}),S=nh(p,512,512,.9,m,_,t);return{map:v,normalMap:S,roughnessMap:w,normalScale:.14}}let n=256,s=256,r=500/120,o=500/120,a=new Float32Array(n*s),l=new Uint8Array(n*s),c=314159;for(let f=0,d=0;f<s;f++){let m=f/s*Ps;for(let _=0;_<n;_++,d++){c=Math.imul(c,1664525)+1013904223>>>0;let p=c/4294967296,x=_/n*Ps,y=.5+.5*Math.sin(9*x+7*m)*Math.cos(8*x-11*m);a[d]=.55*y+.45*p,l[d]=Math.round(255*(.38+.05*y+.03*p))}}let h=Is(n,s,(f,d,m)=>{for(let _=0,p=0;_<d*m;_++,p+=4)f[p]=f[p+1]=f[p+2]=l[_],f[p+3]=255},{colorSpace:On,repeatX:r,repeatY:o,anisotropy:t});return{map:null,normalMap:nh(a,n,s,.55,r,o,t),roughnessMap:h,normalScale:.045}}var eb={wood:{roughness:1,metalness:0,clearcoat:.16,clearcoatRoughness:.38,sheen:0,sheenRoughness:1,envMapIntensity:.95},fabric:{roughness:1,metalness:0,clearcoat:0,clearcoatRoughness:0,sheen:.55,sheenRoughness:.72,envMapIntensity:.78},metal:{roughness:1,metalness:.88,clearcoat:.08,clearcoatRoughness:.25,sheen:0,sheenRoughness:1,envMapIntensity:1.35},paint:{roughness:1,metalness:0,clearcoat:.14,clearcoatRoughness:.42,sheen:0,sheenRoughness:1,envMapIntensity:.9}};function sm(i,e){let t=new Map,n=new Map;for(let l of i.slots){let c=new nn;n.set(l.id,{slot:l,base:c,instances:[c],index:-1,tint:null,preset:null})}function s(l){return t.has(l)||t.set(l,Qv(l,e)),t.get(l)}function r(l,c,h){let u=c.surface,f=s(u),d=eb[u],m=!!l.map!=!!f.map||!!l.normalMap!=!!f.normalMap||!!l.roughnessMap!=!!f.roughnessMap;l.map=f.map,l.normalMap=f.normalMap,l.roughnessMap=f.roughnessMap,l.normalScale.set(f.normalScale,f.normalScale),l.roughness=d.roughness,l.metalness=d.metalness,l.clearcoat=d.clearcoat,l.clearcoatRoughness=d.clearcoatRoughness,l.sheen=d.sheen,l.sheenRoughness=d.sheenRoughness,l.envMapIntensity=d.envMapIntensity,l.color.set(h||c.color),u==="fabric"?l.sheenColor.copy(l.color).lerp(Jv,.45):l.sheenColor.set(0),m&&(l.needsUpdate=!0)}function o(l){for(let[c,h]of n){let{index:u,tint:f}=l[c],d=h.slot.finishes[u];if(!(!d||h.index===u&&h.tint===f&&h.preset===d)){h.index=u,h.tint=f,h.preset=d;for(let m of h.instances)r(m,d,f)}}}function a(l){let c=n.get(l);if(!c)return null;let h=new nn;return c.instances.push(h),c.index>=0&&r(h,c.slot.finishes[c.index],c.tint),h}return{get:l=>n.get(l).base,getForPart:a,update:o}}function rm(i,e,t){let n=i.getAttribute("position"),s=i.getAttribute("normal"),r=i.getAttribute("uv");for(let o=0;o<n.count;o++){let a=n.getX(o),l=n.getY(o),c=n.getZ(o),h=Math.abs(s.getX(o)),u=Math.abs(s.getY(o)),f=Math.abs(s.getZ(o)),d,m;h>=u&&h>=f?e[1]>e[2]?(d=l,m=c):(d=c,m=l):u>=f?e[0]>=e[2]?(d=a,m=c):(d=c,m=a):e[1]>e[0]?(d=l,m=a):(d=a,m=l),r.setXY(o,d/500+t,m/500+.618*t)}r.needsUpdate=!0}function om(i,e,t){let n=i.getAttribute("position"),s=i.getAttribute("normal"),r=i.getAttribute("uv"),o=Math.PI*(e[0]+e[2])*.5;for(let a=0;a<n.count;a++)if(Math.abs(s.getY(a))<.9){let c=r.getX(a),h=r.getY(a);r.setXY(a,h*(e[1]/500)+t,c*(o/500)+.618*t)}else r.setXY(a,n.getX(a)*e[0]/500+t,n.getZ(a)*e[2]/500+.618*t);r.needsUpdate=!0}function am(i,e){let t=document.createElement("canvas"),n=i/e;t.width=Math.max(256,Math.min(2048,Math.round(640*n))),t.height=Math.max(96,Math.min(1024,Math.round(t.width/n)));let s=t.getContext("2d"),r=new Ri(t);r.colorSpace=Nt;let o=new nn({map:r,metalness:.62,roughness:.32,clearcoat:.15,clearcoatRoughness:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),a=new Ut(new ti(i,e),o);a.receiveShadow=!0,a.visible=!1;let l;return{mesh:a,setText(c){if(c===l||(l=c,a.visible=!!c.trim(),!a.visible))return;let h=t.width,u=t.height,f=s.createLinearGradient(0,0,h,u);f.addColorStop(0,"#f3e2b8"),f.addColorStop(.5,"#dbc18d"),f.addColorStop(1,"#ead4a7"),s.fillStyle=f,s.fillRect(0,0,h,u),s.fillStyle="rgba(255,250,235,0.08)";for(let _=2;_<u;_+=3)s.fillRect(0,_,h,1);s.strokeStyle="#977f54",s.lineWidth=Math.max(1.5,u*.022),s.strokeRect(h*.024,u*.08,h*.952,u*.84),s.strokeStyle="rgba(255,248,228,0.45)",s.lineWidth=Math.max(1,u*.01),s.strokeRect(h*.032,u*.12,h*.936,u*.76);let d=u*.56;s.font=`600 ${d}px system-ui, sans-serif`;let m=s.measureText(c).width;m>h*.84&&(d*=h*.84/m),s.font=`600 ${d}px system-ui, sans-serif`,s.fillStyle="#2d2920",s.textAlign="center",s.textBaseline="middle",s.fillText(c,h/2,u*.52),r.needsUpdate=!0}}}var $n=vn.degToRad,Yt=vn.clamp,rn=()=>new Y,ih=()=>Array.from({length:8},rn),Kn=(i,e)=>i&e?.5:-.5,Sd=new Y(.85,.56,1.55).normalize();async function tb(i,e){try{if(typeof e!="string")throw new Error("Missing embedded bytes.");let t=atob(e),n=new Uint8Array(t.length);for(let p=0;p<t.length;p++)n[p]=t.charCodeAt(p);let s=new DataView(n.buffer);if(n.length<20||s.getUint32(0,!0)!==1179937895||s.getUint32(4,!0)!==2||s.getUint32(8,!0)!==n.length||s.getUint32(16,!0)!==1313821514)throw new Error("Expected a complete glTF 2.0 binary.");let r=JSON.parse(new TextDecoder().decode(new Uint8Array(n.buffer,20,s.getUint32(12,!0))));for(let p of[...r.buffers||[],...r.images||[]])if(p.uri!==void 0&&!/^data:/i.test(p.uri))throw new Error("External buffer or image URI. Embed the resource in the GLB.");let o=new Hr;o.setURLModifier(p=>{if(!/^(?:blob|data):/i.test(p))throw new Error("External model resource blocked.");return p});let a=!1;o.onError=()=>{a=!0};let l=await new zc(o).parseAsync(n.buffer,"");if(a)throw new Error("An embedded image or buffer could not be decoded.");let c=l.scene,h=[],u=0;c.traverse(p=>{p.isLight&&h.push(p),p.isMesh&&(u++,p.castShadow=p.receiveShadow=!0)});for(let p of h)p.removeFromParent();let f=new Zt().setFromObject(c,!0),d=f.getSize(rn());if(!u||![d.x,d.y,d.z].every(p=>Number.isFinite(p)&&p>0))throw new Error("The default scene must contain mesh geometry with three nonzero extents.");let m=new jt,_=new jt;return f.getCenter(m.position).negate(),m.add(c),_.add(m),_.scale.set(1/d.x,1/d.y,1/d.z),_}catch(t){throw new Error(`Cannot display ${i}: ${t.message}`,{cause:t})}}function nb(i,e){let t=Rs[e]||Rs.daylight,n=new Ur,s=new mi(1,1,1),r=[s],o=(c,h,u,f,d,m=Yn)=>{let _=h?new Xn({color:new Xe(c).multiplyScalar(u),side:m}):new ni({color:c,roughness:.9,metalness:0,side:m});r.push(_);let p=new Ut(s,_);return p.position.set(...f),p.scale.set(...d),n.add(p),p};o(t.envWall,!1,1,[0,8,0],[32,26,32],wn),o(t.envFloor,!1,1,[0,-4.8,0],[31,.2,31]),o(t.envSoftbox,!0,16,[-1.5,19.5,2],[11,.2,9]),o(t.envSoftbox,!0,18,[-15.2,8.5,8],[.2,12,7]),o(t.envWindow,!0,9,[15.2,7,3],[.2,10,9]),o(t.envRim,!0,14,[2.5,11.5,-15],[10,4.5,.2]),o(1316373,!1,1,[-15.1,4,-8],[.25,11,6]),o(1316373,!1,1,[15.1,2.5,-9],[.25,9,5.5]);let a=new Jr(i),l=a.fromScene(n,.035).texture;a.dispose();for(let c of r)c.dispose();return l}function ib(i){let e=Rs[i]||Rs.daylight,t=document.createElement("canvas");t.width=t.height=512;let n=t.getContext("2d"),s=n.createRadialGradient(256,215,24,256,256,360);s.addColorStop(0,e.bgInner),s.addColorStop(1,e.bgOuter),n.fillStyle=s,n.fillRect(0,0,512,512);let r=new Ri(t);return r.colorSpace=Nt,r}function sb(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d"),n=new Ri(e);n.colorSpace=Nt;let s=new Ut(new ti(1,1),new Xn({map:n,transparent:!0,depthWrite:!1,toneMapped:!1}));s.rotation.x=-Math.PI/2,s.position.y=-.025,s.renderOrder=1;let r=new Zt;function o(a,l,c,h,u){if(a.isEmpty()){s.visible=!1;return}s.visible=!0;let f=a.min.x,d=a.max.x,m=a.min.z,_=a.max.z,p=Math.max(200,d-f),x=Math.max(200,_-m),y=p*.28+140,M=x*.28+140,v=p+y*2,w=x+M*2,S=(f+d)*.5,g=(m+_)*.5;s.position.set(S,-.025,g),s.scale.set(v,w,1);let b=D=>(D-(S-v*.5))/v*256,L=D=>(D-(g-w*.5))/w*256,I=D=>D/v*256,P=D=>D/w*256;t.clearRect(0,0,256,256);let T=(D,A,N,z,O)=>{let $=b(D),B=L(A),V=Math.max(3,I(N)),J=Math.max(3,P(z));t.save(),t.translate($,B),t.scale(1,J/V);let ue=t.createRadialGradient(0,0,V*.15,0,0,V);ue.addColorStop(0,`rgba(38, 30, 22, ${O})`),ue.addColorStop(.55,`rgba(38, 30, 22, ${O*.45})`),ue.addColorStop(1,"rgba(38, 30, 22, 0)"),t.fillStyle=ue,t.beginPath(),t.arc(0,0,V,0,Math.PI*2),t.fill(),t.restore()};if(!l.isEmpty()){let D=(l.min.x+l.max.x)*.5,A=(l.min.z+l.max.z)*.5;T(D,A,(l.max.x-l.min.x)*.62,(l.max.z-l.min.z)*.68,.17);for(let N of c){if(!N.anchor.visible)continue;r.makeEmpty();let[z,O,$]=N.size;for(let B=0;B<8;B++){let V=rn().set(Kn(B,1)*z,Kn(B,2)*O,Kn(B,4)*$).applyMatrix4(N.anchor.matrixWorld);r.expandByPoint(V)}if(r.min.y<18){let B=(r.min.x+r.max.x)*.5,V=(r.min.z+r.max.z)*.5,J=Math.max(24,(r.max.x-r.min.x)*.78),ue=Math.max(24,(r.max.z-r.min.z)*.78);T(B,V,J,ue,.26)}}}if(h&&!u.isEmpty()){let D=(u.min.x+u.max.x)*.5,A=(u.min.z+u.max.z)*.5;T(D,A,(u.max.x-u.min.x)*.58,(u.max.z-u.min.z)*.72,.24)}n.needsUpdate=!0}return{mesh:s,update:o}}function rb(i,e){let t=new Map,n=new Map,s=new Xo(16775662,14931652,.56),r=new rs(16774628,2.35);r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.bias=-16e-5,r.shadow.radius=3.2;let o=new rs(14477567,.72);o.position.set(1,.8,-.55);let a=new rs(16773595,.55);a.position.set(-.6,.9,-1.25),e.add(s,r,r.target,o,a);let l=new Ut(new ti(1,1),new zo({opacity:.21}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,l.material.depthWrite=!1;let c=sb();e.add(l,c.mesh);let h="daylight";function u(f){let d=Rs[f]?f:"daylight";h=d;let m=Rs[d];t.has(d)||t.set(d,nb(i,d)),n.has(d)||n.set(d,ib(d)),e.environment=t.get(d),e.environmentIntensity=m.envIntensity,e.background=n.get(d),i.toneMappingExposure=m.exposure,s.color.setHex(m.hemiSky),s.groundColor.setHex(m.hemiGround),s.intensity=m.hemiIntensity,r.color.setHex(m.keyColor),r.intensity=m.keyIntensity,o.color.setHex(m.fillColor),o.intensity=m.fillIntensity,a.color.setHex(m.rimColor),a.intensity=m.rimIntensity}return u("daylight"),{setPreset:u,getPresetName:()=>h,getLightBoost:()=>Rs[h]?.lightBoost??1,getBackdropTexture:()=>n.get(h),setFloorVisible(f){l.visible=!!f,c.mesh.visible=!!f},updateShadowBounds(f,d,m,_,p){let x=Math.max(5,f.min.distanceTo(f.max)*.65),y=f.getCenter(r.target.position);r.position.set(y.x-1.4*x,y.y+2.4*x,y.z+1.7*x),Object.assign(r.shadow.camera,{left:-x,right:x,top:x,bottom:-x,near:x*.4,far:x*5}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=x*4e-4,i.shadowMap.needsUpdate=!0,l.position.set(y.x,-.05,y.z),l.scale.setScalar(x*40),c.update(f,d,m,_,p)}}}function ob(){let i=new jt;i.visible=!1;let e=new Map;function t(v){if(e.has(v))return e.get(v);let w=Cs.find(T=>T.id===v)||Cs[0],S=512,g=document.createElement("canvas");g.width=S,g.height=S;let b=g.getContext("2d");b.fillStyle=w.baseHex,b.fillRect(0,0,S,S);let L=v==="oak"?19:v==="stone"?47:83,I=()=>(L=L*1664525+1013904223>>>0,L/4294967296);if(v==="oak"){let D=S/8;for(let A=0;A<8;A++){let N=A*D,z=A%2*(S*.5);for(let O=0;O<2;O++){let $=(O*S*.5+z)%S;b.fillStyle=w.grainHex,b.globalAlpha=.08+I()*.14,b.fillRect($,N,S*.5,D),b.globalAlpha=.16+I()*.14;for(let B=0;B<14;B++){let V=N+3+I()*(D-6);b.fillRect($,V,S*.5,1.2)}}b.globalAlpha=.36,b.fillStyle=w.lineHex,b.fillRect(0,N,S,1.6),b.fillRect((z+S*.5)%S,N,1.6,D)}b.globalAlpha=1}else if(v==="stone"){let D=S/4;for(let A=0;A<4;A++)for(let N=0;N<4;N++)b.fillStyle=w.grainHex,b.globalAlpha=.06+I()*.12,b.fillRect(N*D,A*D,D,D);for(let A=0;A<650;A++)b.fillStyle=A%2?w.grainHex:w.lineHex,b.globalAlpha=.08,b.fillRect(I()*S,I()*S,2+I()*14,1+I()*2);b.globalAlpha=.28,b.fillStyle=w.lineHex;for(let A=0;A<4;A++)b.fillRect(0,A*D,S,1.5),b.fillRect(A*D,0,1.5,S);b.globalAlpha=1}else{for(let T=0;T<900;T++)b.fillStyle=T%2?w.grainHex:w.lineHex,b.globalAlpha=.05+I()*.06,b.beginPath(),b.arc(I()*S,I()*S,6+I()*28,0,Math.PI*2),b.fill();b.globalAlpha=.18,b.fillStyle=w.lineHex,b.fillRect(0,S*.5,S,1),b.fillRect(S*.5,0,1,S),b.globalAlpha=1}let P=new Ri(g);return P.colorSpace=Nt,P.wrapS=cn,P.wrapT=cn,P.anisotropy=4,e.set(v,P),P}let n=Ea[0].hex,s=Cs[0].id,r=t(s),o=new ni({map:r,roughness:.72,metalness:.03}),a=new ni({color:n,roughness:.94,metalness:0,side:Yn}),l=new ni({color:new Xe(n).multiplyScalar(.92),roughness:.78,metalness:.02}),c=new Ut(new ti(1,1),o);c.rotation.x=-Math.PI/2,c.receiveShadow=!0;let h=new Ut(new ti(1,1),a);h.receiveShadow=!0;let u=new mi(1,1,1),f=new Ut(u,l),d=new Ut(u,l);f.castShadow=f.receiveShadow=!0,d.castShadow=d.receiveShadow=!0,i.add(c,h,f,d);let m=9e3,_=7e3;function p(){r.repeat.set(Math.max(1,m/900),Math.max(1,_/900)),r.needsUpdate=!0}function x(v,w,S){let g=v.isEmpty(),b=g?-600:v.min.x,L=g?600:v.max.x,I=g?-300:v.min.z,P=g?300:v.max.z,T=g?1800:v.max.y,D=b,A=L;S&&!w.isEmpty()&&(D=Math.min(D,w.min.x),A=Math.max(A,w.max.x));let N=(D+A)*.5,z=Math.max(1200,A-D),O=Math.max(800,P-I);m=Math.max(9e3,z*4),_=Math.max(7e3,O*6);let $=Math.max(3600,T*2.1),B=I-4;c.position.set(N,-.3,B+_*.45),c.scale.set(m,_,1),h.position.set(N,$*.5-.5,B),h.scale.set(m,$,1),p();let V=N-m*.5,J=N+m*.5,ue=b-2,xe=L+2,te=80,pe=14,ge=B+pe*.5;if(g)f.visible=!0,d.visible=!1,f.scale.set(m,te,pe),f.position.set(N,te*.5-.3,ge);else{let De=Math.max(0,ue-V),ye=Math.max(0,J-xe);f.visible=De>1,f.visible&&(f.scale.set(De,te,pe),f.position.set(V+De*.5,te*.5-.3,ge)),d.visible=ye>1,d.visible&&(d.scale.set(ye,te,pe),d.position.set(xe+ye*.5,te*.5-.3,ge))}}function y({wallColor:v,floorKind:w}={}){typeof v=="string"&&/^#[\da-f]{6}$/i.test(v)&&(n=v,a.color.set(n),l.color.set(n).multiplyScalar(.92)),w&&Cs.some(S=>S.id===w)&&(s=w,r=t(s),o.map=r,o.needsUpdate=!0,p())}function M(v){i.visible=!!v}return{group:i,fit:x,setStyle:y,setVisible:M}}var Ls={lang:"en",dir:"ltr",axes:["W","H","D"],mmUnit:"mm",term:i=>i,formatCanvasLabel:i=>`Interactive 3D view of ${i}. Click doors, drawers, switches, or parts to interact, or pinch/scroll with two fingers to zoom.`,formatHotspot:(i,e,t)=>i==="joint"?`${e}: ${t>.02?`Open (${Math.round(t*100)}%), click to close`:"Closed, click to open"}`:`${e}: ${t>=.5?"On, click to turn off":"Off, click to turn on"}`};function cm(i,e,t,n,s,r=1,o=Ls,a=null){let l=ih();for(let d=0;d<8;d++){let m=l[d].copy(i[d]).project(e);m.x=(1+m.x)*t/2,m.y=(1-m.y)*n/2}let c=o?.axes??Ls.axes,h=o?.mmUnit??Ls.mmUnit,u=[s.width,s.height,s.depth],f=[];for(let d=0;d<3;d++){let m=`${c[d]}  ${u[d].toLocaleString("en-US")} ${h}`,_=Math.ceil(a?a(m)*.5+8*r:(m.length*4.1+8)*r),p=1<<d,x=l[p].x-l[0].x,y=l[p].y-l[0].y,M=Math.hypot(x,y),v=M<8*r,w=M?x/M:1,S=M?y/M:0,g=-S,b=w,L=d===0?b:d===1?-g:g;(L<0||Math.abs(L)<.001&&b<0)&&(g=-g,b=-b),v&&(g=d===1?-1:1,b=d===0?.65:-.65);let I=-1/0,P=0;for(let ue=0;ue<8;ue++)if(!(ue&p)){let xe=l[ue],te=xe.x*g+xe.y*b;te>I&&(I=te,P=ue)}let T=l[P],D=l[P|p],A=(t<450*r?13:20)*r,N=T.x+g*A,z=T.y+b*A,O=D.x+g*A,$=D.y+b*A,B=(N+O)/2+g*10*r,V=(z+$)/2+b*10*r;B=Yt(B,_+4*r,Math.max(_+4*r,t-_-4*r)),V=Yt(V,14*r,Math.max(14*r,n-14*r));let J=24*r;for(let ue=0;ue<d;ue++){let xe=f[ue];Math.abs(B-xe.lx)<_+xe.half+3*r&&Math.abs(V-xe.ly)<J&&(V=xe.ly+J<n-13*r?xe.ly+J:xe.ly-J)}f.push({letter:c[d],axis:d,str:m,half:_,px:T.x,py:T.y,qx:D.x,qy:D.y,x1:N,y1:z,x2:O,y2:$,nx:g,ny:b,tx:w,ty:S,lx:B,ly:V,endOn:v})}return f}var ab="http://www.w3.org/2000/svg";function ro(i,e,t){let n=document.createElementNS(ab,i);for(let[s,r]of Object.entries(e))n.setAttribute(s,r);return t.appendChild(n),n}function lb(i,e=Ls){let t=ro("svg",{"aria-hidden":"true"},i);t.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:hidden;display:none";let n=ih(),s=["W","H","D"].map(()=>{let m=ro("g",{},t),_=ro("path",{fill:"none",stroke:"#686858","stroke-width":"1.2","stroke-linecap":"round"},m),p=ro("g",{},m),x=ro("rect",{height:21,y:-10.5,rx:3,fill:"#faf7ef",stroke:"#a6a494","stroke-width":".75"},p),y=ro("text",{"text-anchor":"middle","dominant-baseline":"central",fill:"#343a31","font-family":"system-ui,sans-serif","font-size":12,"font-weight":600},p);return{ink:_,badge:p,bg:x,text:y}}),r=!1,o={width:1,height:1,depth:1},a=e,l=null,c=0,h=0;function u(m,_){r=m,o={..._},t.style.display=m?"block":"none";for(let p=0;p<8;p++)n[p].set(Kn(p,1)*_.width,p&2?_.height:0,Kn(p,4)*_.depth)}function f(m,_,p){if(l=m,c=_,h=p,!r||!_||!p||!m)return;let x=cm(n,m,_,p,o,1,a);for(let y=0;y<3;y++){let M=x[y],v=s[y];M.str!==v.text.textContent&&(v.text.textContent=M.str,v.bg.setAttribute("x",-M.half),v.bg.setAttribute("width",M.half*2));let w=M.nx*4+M.tx*2,S=M.ny*4+M.ty*2;v.ink.setAttribute("d",M.endOn?`M${M.px},${M.py}L${M.lx},${M.ly}`:`M${M.px+M.nx*3},${M.py+M.ny*3}L${M.x1},${M.y1}L${M.x2},${M.y2}L${M.qx+M.nx*3},${M.qy+M.ny*3}M${M.x1-w},${M.y1-S}l${2*w},${2*S}M${M.x2-w},${M.y2-S}l${2*w},${2*S}M${(M.x1+M.x2)/2},${(M.y1+M.y2)/2}L${M.lx},${M.ly}`),v.badge.setAttribute("transform",`translate(${M.lx},${M.ly})`)}}function d(m){a=m||Ls,f(l,c,h)}return{set:u,draw:f,setLocale:d,endpoints:n}}function lm(i,e,t,n,s,r,o,a=Ls){i.save(),i.font=`600 ${Math.round(12*o)}px system-ui, -apple-system, sans-serif`;let l=cm(e,t,n,s,r,o,a,c=>i.measureText(c).width);i.textAlign="center",i.textBaseline="middle";for(let c of l){let h=c.nx*4*o+c.tx*2*o,u=c.ny*4*o+c.ty*2*o;i.strokeStyle="#686858",i.lineWidth=1.2*o,i.lineCap="round",i.beginPath(),c.endOn?(i.moveTo(c.px,c.py),i.lineTo(c.lx,c.ly)):(i.moveTo(c.px+c.nx*3*o,c.py+c.ny*3*o),i.lineTo(c.x1,c.y1),i.lineTo(c.x2,c.y2),i.lineTo(c.qx+c.nx*3*o,c.qy+c.ny*3*o),i.moveTo(c.x1-h,c.y1-u),i.lineTo(c.x1+h,c.y1+u),i.moveTo(c.x2-h,c.y2-u),i.lineTo(c.x2+h,c.y2+u),i.moveTo((c.x1+c.x2)/2,(c.y1+c.y2)/2),i.lineTo(c.lx,c.ly)),i.stroke();let f=21*o,d=c.half*2,m=c.lx-c.half,_=c.ly-f/2,p=3*o;i.fillStyle="#faf7ef",i.strokeStyle="#a6a494",i.lineWidth=.75*o,i.beginPath(),i.roundRect(m,_,d,f,p),i.fill(),i.stroke(),i.fillStyle="#343a31",i.fillText(c.str,c.lx,c.ly)}i.restore()}async function hm(i,e,t,n={},s=null){let r=s||Ls,o=new Map;for(let C of e.parts)C.shape==="glb"&&!o.has(C.asset)&&o.set(C.asset,await tb(C.asset,t[C.asset]));let a=new Nc({antialias:!0,alpha:!0,powerPreference:"default"});a.outputColorSpace=Nt,a.toneMapping=Js,a.toneMappingExposure=1.04,a.shadowMap.enabled=!0,a.shadowMap.type=Vl,a.shadowMap.autoUpdate=!1,a.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let l=a.domElement;l.setAttribute("role","img"),l.setAttribute("aria-label",r.formatCanvasLabel(r.term(e.name))),l.style.cssText="display:block;width:100%;height:100%;touch-action:none;cursor:grab",i.appendChild(l);let c=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,h=new Ur,u=rb(a,h),f=ob();h.add(f.group);let d=sm(e,a),m=Zp(e),_=new ln(28,1,10,5e4),p=new gi(-1,1,1,-1,.1,1e4),x="perspective",y=_;y.position.copy(Sd).multiplyScalar(3e3);let M=!0,v=!1,w="3500",S="studio",g=null,b=null,L=null,I=null,P=new Zt;try{g=new Yc(a),g.setPixelRatio(a.getPixelRatio()),b=new qc(h,y),L=new no(h,y,512,512),L.output=no.OUTPUT.Default,L.blendIntensity=.62,L.updateGtaoMaterial({radius:28,distanceExponent:1.5,thickness:.7,scale:1,samples:12}),L.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:4,rings:2,samples:8}),I=new Kc,g.addPass(b),g.addPass(L),g.addPass(I)}catch{g=null}let T=new Bc(y,l);T.enablePan=!1,T.enableZoom=!1,T.enableDamping=!c,T.dampingFactor=.09,T.minPolarAngle=1e-4,T.maxPolarAngle=Math.PI/2,T.minZoom=.3,T.maxZoom=8,T.zoomSpeed=.85,T.touches={ONE:xi.ROTATE,TWO:xi.DOLLY_ROTATE};let D=new jt,A=im();h.add(D,A.root);let N=new Map(e.joints.map(C=>{let q=new jt;return D.add(q),[C.id,{id:C.id,label:C.label,def:C,group:q,pivot:[0,0,0],current:0,target:0,velocity:0,initialized:!1}]})),z=new Zs(.5,40,24),O=new Map(e.slots.map(C=>[C.id,C])),$=new Map(e.options.map(C=>[C.id,C])),B=new Map,V=new Map;for(let C of e.switches??[]){for(let q of C.parts)V.set(q,C);for(let q of C.light?.emissiveParts??[])V.set(q,C)}let J=[],ue=(C,q)=>{C.userData.interactive=q,J.push(C)},xe=e.parts.map((C,q)=>{let de=new jt,Z=N.get(C.joint);(Z?Z.group:D).add(de),de.rotation.set($n(C.rotation[0]),$n(C.rotation[1]),$n(C.rotation[2]));let ee=C.slot===null?null:d.getForPart(C.slot),j;if(C.shape==="glb"){j=new jt;let Ce=kc(o.get(C.asset));ee&&Ce.traverse(it=>{it.isMesh&&(it.material=ee)}),j.add(Ce)}else j=new Ut(C.shape==="ellipsoid"?z:new $t,ee),j.castShadow=j.receiveShadow=!0;de.add(j);let he={def:C,anchor:de,joint:Z,visual:j,size:[0,0,0],closedCenter:[0,0,0],points:ih(),grain:q*.754877666%1,ledColor:null,ledIntensity:0,hovered:!1,contactFlash:0};B.set(C.id,he);let X=null,me=V.get(C.id);if(me)X={type:"switch",id:me.id,label:me.label};else if(Z)X={type:"joint",id:Z.def.id,label:Z.def.label};else if(C.when.length===1){let Ce=$.get(C.when[0].option);X={type:"option",id:Ce.id,label:Ce.label}}else if(C.slot!==null){let Ce=O.get(C.slot);X={type:"slot",id:Ce.id,label:Ce.label}}return X&&j.traverse(Ce=>{Ce.isMesh&&(Ce.userData.part=he,ue(Ce,X))}),he});A.root.traverse(C=>{C.isMesh&&J.push(C)});let te=new Map((e.switches??[]).map(C=>{let q=N.get(C.joint)??null,de=C.parts.map(j=>B.get(j)).filter(Boolean),Z=(C.light?.emissiveParts??[]).map(j=>B.get(j)).filter(Boolean),ee=null;return C.light&&(ee=new Ks(C.light.color,0,C.light.distance,1.5),(q?q.group:D).add(ee)),[C.id,{def:C,joint:q,light:ee,actuatorParts:de,emissiveParts:Z,current:C.defaultOn?1:0,target:C.defaultOn?1:0,from:C.defaultOn?1:0,startTime:0,duration:0,initialized:!1}]})),pe=e.inscription,ge=pe?am(pe.width,pe.height):null,De=pe?N.get(pe.joint):null;ge&&((De?De.group:D).add(ge.mesh),De&&ue(ge.mesh,{type:"joint",id:De.def.id,label:De.def.label}));let ye=ge?Array.from({length:4},rn):[],Ge=document.createElement("div");Ge.className="hotspot-layer",i.appendChild(Ge);let gt=!1,qe=[];for(let C of N.values()){let q=document.createElement("button");q.type="button",q.className="hotspot hotspot-joint",q.innerHTML='<span class="hotspot-dot" aria-hidden="true"></span><span class="hotspot-tag"></span>',q.querySelector(".hotspot-tag").textContent=r.term(C.def.label),q.addEventListener("click",de=>{de.stopPropagation(),n.onInteract?.({type:"joint",id:C.def.id,label:C.def.label})}),Ge.appendChild(q),qe.push({kind:"joint",id:C.def.id,entry:C,btn:q,pos:rn(),ndc:rn()})}for(let C of te.values()){let q=document.createElement("button");q.type="button",q.className="hotspot hotspot-switch",q.innerHTML='<span class="hotspot-dot" aria-hidden="true"></span><span class="hotspot-tag"></span>',q.querySelector(".hotspot-tag").textContent=r.term(C.def.label),q.addEventListener("click",de=>{de.stopPropagation(),n.onInteract?.({type:"switch",id:C.def.id,label:C.def.label})}),Ge.appendChild(q),qe.push({kind:"switch",id:C.def.id,entry:C,btn:q,pos:rn(),ndc:rn()})}let tt=lb(i,r),ct=new Zt,je=new Zt,ke=new Zt,nt=new Zt,Et=new Zt,ht=ih(),Ht=rn(),at=rn(),At=rn(),Ft=rn(),Be=rn(),F=rn(),ot=new Ms,Ue=0,Ze=0,_e=0,st=!1,Ne=!1,Ye=null,U=null,E=null,K=!0,fe=3e3,oe=null,Ae=null,Te=0,re=1;function ae(C,q){C.group.position.fromArray(C.pivot),C.group.rotation.set(0,0,0);let de=C.def.travel*q;C.def.type==="hinge"?C.group.rotation.y=$n(de):C.def.type==="flap"?C.group.rotation.x=$n(de):C.def.type==="slide"?C.group.position.z+=de:C.def.type==="slide-x"?C.group.position.x+=de:C.def.type==="lift"&&(C.group.position.y+=de)}function Me(){let C={};for(let q of N.values())C[q.id]=q.current;return C}function k(C){if(c)return;let q=C.blockerJointId?xe.filter(Z=>Z.joint?.id===C.blockerJointId&&Z.anchor.visible):xe.filter(Z=>Z.def.id===C.blockerPartId&&Z.anchor.visible),de=performance.now()+260;for(let Z of q)Z.contactFlash=de,Qe(Z)}function ce(C,q){let de=C.actuatorParts.some(X=>X.anchor.visible)||C.emissiveParts.some(X=>X.anchor.visible),Z=u.getLightBoost(),ee=th[w]||th[3500];C.light&&(C.light.color.set(ee.color),C.light.intensity=de?C.def.light.intensity*Math.pow(200,1.5)*Z*q:0);let j=C.def.light?new Xe(ee.emissive):null,he=3.2*(1+(Z-1)*.45);for(let X of C.emissiveParts)X.ledColor=j,X.ledIntensity=he*q,Qe(X);for(let X of C.actuatorParts)if(!C.emissiveParts.includes(X))if(C.def.kind==="toggle"){let me=Math.abs(X.def.rotation[2])>=45||X.size[0]>X.size[2]?"z":"x";X.visual.rotation.set(0,0,0),X.visual.rotation[me]=(q-.5)*$n(44)}else if(C.def.kind==="rocker"){let me=X.size[1]>=X.size[0]?"x":"z";X.visual.rotation.set(0,0,0),X.visual.rotation[me]=(q-.5)*$n(24)}else X.visual.position.z=-2*q}function le(){for(let C of te.values())ce(C,C.current)}let Ee=C=>C?.joint?.def.type==="hinge"||C?.joint?.def.type==="flap",Se=xe.some(Ee),Re=new bs({color:3886402,transparent:!0,opacity:.42,depthWrite:!1});function Je(C){C.traverse(q=>{for(let de=q.children.length-1;de>=0;de--){let Z=q.children[de];Z.userData?.isXrayWire&&(q.remove(Z),Z.geometry.dispose())}})}function ut(C){for(let q of xe){let de=C&&Ee(q);Je(q.visual),q.visual.traverse(Z=>{if(!Z.isMesh||!Z.material)return;let ee=Z.material;ee.userData.xrayOrig===void 0&&(ee.userData.xrayOrig={transparent:!!ee.transparent,opacity:ee.opacity??1,depthWrite:ee.depthWrite??!0,castShadow:Z.castShadow,receiveShadow:Z.receiveShadow});let j=ee.userData.xrayOrig;if(de){if(ee.userData.xrayApplied=!0,ee.transparent=!0,ee.opacity=.16,ee.depthWrite=!1,ee.needsUpdate=!0,Z.castShadow=!1,Z.receiveShadow=!1,(q.def.shape==="box"||q.def.shape==="cylinder")&&Z.geometry?.attributes?.position?.count){let he=new ko(Z.geometry,28),X=new qs(he,Re);X.userData.isXrayWire=!0,X.raycast=()=>{},Z.add(X)}}else ee.transparent=j.transparent,ee.opacity=j.opacity,ee.depthWrite=j.depthWrite,ee.needsUpdate=!0,Z.castShadow=j.castShadow,Z.receiveShadow=j.receiveShadow,delete ee.userData.xrayApplied,delete ee.userData.xrayOrig})}}function be(){if(L){if(je.isEmpty()){L.setSceneClipBox(null);return}P.copy(je),A.root.visible&&!ke.isEmpty()&&P.union(ke),P.min.x-=80,P.max.x+=80,P.min.z-=80,P.max.z+=80,P.max.y+=80,P.min.y=S==="room"?-4:.5,L.setSceneClipBox(P)}}function Qe(C,q=performance.now()){let de=C.contactFlash>q;C.visual.traverse(Z=>{!Z.isMesh||!Z.material||!("emissive"in Z.material)||(Z.material.userData.baseEmissive===void 0&&(Z.material.userData.baseEmissive=Z.material.emissive.getHex(),Z.material.userData.baseEmissiveIntensity=Z.material.emissiveIntensity??0),C.ledColor&&C.ledIntensity>.001?(Z.material.emissive.copy(C.ledColor),Z.material.emissiveIntensity=C.ledIntensity+(C.hovered?.25:0)):de?(Z.material.emissive.setHex(15047996),Z.material.emissiveIntensity=.22):C.hovered?(Z.material.emissive.setHex(3897950),Z.material.emissiveIntensity=.22):(Z.material.emissive.setHex(Z.material.userData.baseEmissive),Z.material.emissiveIntensity=Z.material.userData.baseEmissiveIntensity))})}function dt(){D.updateMatrixWorld(!0),je.makeEmpty();for(let C of xe)if(C.anchor.visible){let[q,de,Z]=C.size;for(let ee=0;ee<8;ee++){let j=C.points[ee].set(Kn(ee,1)*q,Kn(ee,2)*de,Kn(ee,4)*Z).applyMatrix4(C.anchor.matrixWorld);je.expandByPoint(j)}}if(ge?.mesh.visible)for(let C=0;C<4;C++){let q=ye[C].set(Kn(C,1)*pe.width,Kn(C,2)*pe.height,0).applyMatrix4(ge.mesh.matrixWorld);je.expandByPoint(q)}if(Et.copy(je),Et.isEmpty()||Ne)for(let C of tt.endpoints)Et.expandByPoint(C);A.root.visible&&!ke.isEmpty()&&Et.union(ke),u.updateShadowBounds(Et,je,xe,A.root.visible,ke),be()}function Le(C){y.updateMatrixWorld(),Ft.setFromMatrixColumn(y.matrixWorld,0),Be.setFromMatrixColumn(y.matrixWorld,1),F.setFromMatrixColumn(y.matrixWorld,2);let q=1,de=1,Z=1,ee=me=>{At.subVectors(me,T.target),q=Math.max(q,Math.abs(At.dot(Ft))),de=Math.max(de,Math.abs(At.dot(Be))),Z=Math.max(Z,Math.abs(At.dot(F)))};if(C==="static")for(let me of[0,1,2,3,4,5,6,7]){let Ce=rn().set(me&1?nt.max.x:nt.min.x,me&2?nt.max.y:nt.min.y,me&4?nt.max.z:nt.min.z);ee(Ce)}else{for(let me of xe)if(me.anchor.visible)for(let Ce of me.points)ee(Ce);if(A.root.visible)for(let me of ht)ee(me);if(ge?.mesh.visible)for(let me of ye)ee(me);if(Ne||je.isEmpty())for(let me of tt.endpoints)ee(me)}let j=Ne?Math.min(Ue*.17,85):Math.min(Ue*.085,65),he=Math.min(Ne?Ze*.16:Ze*.13,62);return{reqHalfH:Math.max(de/(1-2*he/Ze),q*Ze/Math.max(1,Ue-2*j)),hz:Z}}function Rt(){if(!Ue||!Ze)return;let C=Ue/Ze;if(x==="orthographic"){let{reqHalfH:q}=Le("live");p.top=q,p.bottom=-q,p.right=q*C,p.left=-p.right,p.updateProjectionMatrix()}else _.aspect=C,_.updateProjectionMatrix();tt.draw(y,Ue,Ze),Jt(),K=!1}function Jt(){if(Ge.hidden=!gt||!st||!Ue||!Ze,Ge.hidden)return;let C=new Zt;for(let q of qe){let de=!1;if(q.kind==="joint"){let j=q.entry,he=xe.filter(me=>me.joint===j&&me.anchor.visible);if(he.length){de=!0;let me=he.filter(it=>it.def.slot==="hardware"||Math.max(...it.size)<220),Ce=me.length?me:he;C.makeEmpty();for(let it of Ce)for(let He of it.points)C.expandByPoint(He);C.getCenter(q.pos),me.length||(q.pos.z=C.max.z)}let X=Math.round(j.current*100);q.btn.setAttribute("aria-pressed",String(j.current>.02)),q.btn.setAttribute("aria-label",r.formatHotspot("joint",r.term(j.def.label),j.current))}else{let j=q.entry,he=j.actuatorParts.filter(me=>me.anchor.visible);if(he.length){de=!0,C.makeEmpty();for(let me of he)for(let Ce of me.points)C.expandByPoint(Ce);C.getCenter(q.pos)}let X=j.target>=.5;q.btn.setAttribute("aria-pressed",String(X)),q.btn.setAttribute("aria-label",r.formatHotspot("switch",r.term(j.def.label),j.target))}if(q.btn.hidden=!de,!de)continue;if(q.ndc.copy(q.pos).project(y),q.ndc.z<-1||q.ndc.z>1){q.btn.hidden=!0;continue}let Z=Yt((1+q.ndc.x)*Ue*.5,22,Math.max(22,Ue-22)),ee=Yt((1-q.ndc.y)*Ze*.5,22,Math.max(22,Ze-22));q.btn.style.transform=`translate3d(${Z.toFixed(1)}px, ${ee.toFixed(1)}px, 0) translate(-50%, -50%)`}}function jn(C){if(!(!Number.isFinite(C)||C<=0||Math.abs(C-1)<1e-6)){if(x==="orthographic")p.zoom=Yt(p.zoom*C,T.minZoom,T.maxZoom),p.updateProjectionMatrix();else{at.subVectors(_.position,T.target);let q=Yt(at.length()/C,T.minDistance,T.maxDistance);at.normalize(),_.position.copy(T.target).addScaledVector(at,q)}T.update(),K=!0}}function rr(C){if(!(!Number.isFinite(C)||C<=0)){if(oe=null,c||!st){jn(C),an();return}re=Yt(re*C,.25,4),an()}}let cs=C=>Math.atan2(Math.sin(C),Math.cos(C)),co=(C,q,de)=>C+cs(q-C)*de,H={running:!1,hasMoved:!1,phase:"stopped",waitTimer:0,phaseTime:0,path:[],pathIdx:0,currentAction:null,actionFired:!1,lastActionId:null,walkPhase:0,walkBlend:0,sitBlend:0,seatHeightNorm:0,reachBlend:0,reachSide:1,reachHeightNorm:.55,headYaw:0,headPitch:0,idleTime:0,seatedSeat:null,posX:0,posZ:0,yaw:0};function Ba(){let C=[];for(let q of xe){if(!q.anchor.visible)continue;let de=1/0,Z=1/0,ee=1/0,j=-1/0,he=-1/0,X=-1/0;for(let Ce of q.points)Ce.x<de&&(de=Ce.x),Ce.x>j&&(j=Ce.x),Ce.y<Z&&(Z=Ce.y),Ce.y>he&&(he=Ce.y),Ce.z<ee&&(ee=Ce.z),Ce.z>X&&(X=Ce.z);let me=O.get(q.def.slot);C.push({id:q.def.id,slotId:q.def.slot,slotLabel:me?.label||"",jointId:q.joint?.id??null,minX:de,maxX:j,minY:Z,maxY:he,minZ:ee,maxZ:X})}return C}function bi(){let C=Ba(),q=C.filter(X=>!X.jointId),de=new Map;for(let X of C){if(!X.jointId)continue;let me=de.get(X.jointId)||[];me.push(X),de.set(X.jointId,me)}let Z=new Map(C.map(X=>[X.id,X])),ee=Me(),j=[];for(let X of N.values()){let me=de.get(X.id);if(!me?.length)continue;let Ce=X.current>.45?0:1,it=m.resolveJointMotion(X.id,X.current,Ce,ee);if(Math.abs(it.progress-X.current)<=.12)continue;let He=_d({kind:"joint",id:X.id,label:X.label,def:X.def,targetBoxes:me,staticBoxes:q,pivot:X.pivot});He&&j.push({...He,goal:Ce,isOpening:Ce>.5})}for(let X of te.values()){let me=[...X.actuatorParts,...X.emissiveParts].map(He=>Z.get(He.def.id)).filter(Boolean);if(!me.length)continue;let Ce=X.target>=.5?0:1,it=_d({kind:"switch",id:X.def.id,label:X.def.label,def:null,targetBoxes:me,staticBoxes:q});it&&j.push({...it,goal:Ce,isOpening:Ce>.5})}let he=em(e,q);for(let X of he)H.seatedSeat?.id===X.id?j.push({kind:"stand",id:`stand:${X.id}`,label:X.label,seat:X,standX:X.approachX,standZ:X.approachZ,faceYaw:X.faceYaw,tx:X.seatX,ty:X.seatY,tz:X.seatZ,reachY:X.seatY}):j.push({kind:"sit",id:`sit:${X.id}`,label:X.label,seat:X,standX:X.approachX,standZ:X.approachZ,faceYaw:X.faceYaw,tx:X.seatX,ty:X.seatY,tz:X.seatZ,reachY:X.seatY});if(!j.length&&!ct.isEmpty()){let X=ct,me=(X.min.x+X.max.x)*.5,Ce=(X.min.y+X.max.y)*.5,it=(X.min.z+X.max.z)*.5;for(let[He,ve,en]of[["inspect:front",me,X.max.z+620],["inspect:right",X.max.x+620,it],["inspect:left",X.min.x-620,it]])j.push({kind:"inspect",id:He,label:e.name,tx:me,ty:Ce,tz:it,standX:ve,standZ:en,faceYaw:Math.atan2(me-ve,it-en),reachY:Ce})}return{candidates:j,staticBoxes:q}}function hs(){return{walkPhase:H.walkPhase,walkBlend:H.walkBlend,sitBlend:H.sitBlend,seatHeightNorm:H.seatHeightNorm,reachBlend:H.reachBlend,reachSide:H.reachSide,reachHeightNorm:H.reachHeightNorm,headYaw:H.headYaw,headPitch:H.headPitch,idleTime:H.idleTime}}function ho(){if(A.root.visible){A.root.updateMatrixWorld(!0),ke.setFromObject(A.root);for(let C=0;C<8;C++)ht[C].set(C&1?ke.max.x:ke.min.x,C&2?ke.max.y:ke.min.y,C&4?ke.max.z:ke.min.z);Et.copy(je),ke.isEmpty()||Et.union(ke),u.updateShadowBounds(Et,je,xe,A.root.visible,ke),be()}}function ka(C){let q=H.walkBlend>.002||H.reachBlend>.002;if(!H.running&&!q)return!1;if(!A.root.visible)return H.running&&Ns(!1),!1;H.idleTime+=C;let de=Math.max(900,E?.height||1700);if(!H.running)return H.walkBlend=Math.max(0,H.walkBlend-C*6),H.reachBlend=Math.max(0,H.reachBlend-C*6),H.headYaw*=Math.max(0,1-C*6),H.headPitch*=Math.max(0,1-C*6),A.setMotion?.(hs()),ho(),H.walkBlend>.002||H.reachBlend>.002;let Z=()=>{H.phase="idle_wait",H.currentAction=null,H.waitTimer=1e4/1e3,H.phaseTime=0,n.onPersonAutoAction?.({phase:"waiting",nextDelaySec:Math.round(1e4/1e3)})};if(H.phase==="idle_wait"){if(H.walkBlend=Math.max(0,H.walkBlend-C*5),H.reachBlend=Math.max(0,H.reachBlend-C*5),H.headYaw=Math.sin(H.idleTime*.7)*.14,H.headPitch=Math.sin(H.idleTime*.45)*.05,H.waitTimer-=C,H.waitTimer<=0){let{candidates:ee,staticBoxes:j}=bi(),he=nm({candidates:ee,lastActionId:H.lastActionId,isSeated:!!H.seatedSeat});if(!he)H.waitTimer=1e4/1e3;else if(H.currentAction=he,H.actionFired=!1,H.lastActionId=he.id,H.phaseTime=0,H.seatedSeat)H.phase="standing_up";else if(he.kind==="stand")Z();else{H.path=yd([H.posX,H.posZ],[he.standX,he.standZ],j),H.pathIdx=0;let X=Math.hypot(he.standX-H.posX,he.standZ-H.posZ);H.phase=X<24?"turning":"walking"}}}else if(H.phase==="standing_up"){let ee=H.seatedSeat;if(!ee)H.phase="walking";else{H.phaseTime=Math.min(.65,H.phaseTime+C);let he=H.phaseTime/.65,X=he*he*(3-2*he);if(H.sitBlend=1-X,H.posX=ee.seatX+(ee.approachX-ee.seatX)*X,H.posZ=ee.seatZ+(ee.approachZ-ee.seatZ)*X,H.hasMoved=!0,H.phaseTime>=.65)if(H.sitBlend=0,H.seatHeightNorm=0,H.seatedSeat=null,n.onPersonAutoAction?.({phase:"action",actionType:"stand",id:ee.id,label:ee.label}),H.currentAction?.kind==="stand")Z();else{let{staticBoxes:me}=bi();H.path=yd([H.posX,H.posZ],[H.currentAction.standX,H.currentAction.standZ],me),H.pathIdx=0,H.phase="walking",H.phaseTime=0}}}else if(H.phase==="walking"){let ee=H.path[H.pathIdx];if(!ee)H.phase="turning",H.phaseTime=0;else{let j=ee[0]-H.posX,he=ee[1]-H.posZ,X=Math.hypot(j,he);if(X<18)H.pathIdx++,H.pathIdx>=H.path.length&&(H.phase="turning",H.phaseTime=0);else{let me=Math.min(X,760*C);H.posX+=j/X*me,H.posZ+=he/X*me,H.hasMoved=!0;let Ce=Math.atan2(j,he);if(H.yaw=co(H.yaw,Ce,Math.min(1,C*8)),H.walkPhase+=me/(de*.34)*Math.PI,H.walkBlend=Math.min(1,H.walkBlend+C*5),H.currentAction){let it=Math.atan2(H.currentAction.tx-H.posX,H.currentAction.tz-H.posZ);H.headYaw=Yt(cs(it-H.yaw),-.55,.55),H.headPitch=Yt((H.currentAction.ty-de*.85)/1500,-.3,.25)}}}}else if(H.phase==="turning"){H.walkBlend=Math.max(0,H.walkBlend-C*6);let ee=H.currentAction;if(!ee)Z();else if(H.yaw=co(H.yaw,ee.faceYaw,Math.min(1,C*7)),H.headYaw=Yt(cs(ee.faceYaw-H.yaw),-.6,.6),H.headPitch=Yt((ee.ty-de*.85)/1400,-.35,.3),Math.abs(cs(ee.faceYaw-H.yaw))<.04){H.yaw=ee.faceYaw,H.headYaw=0,H.phase="acting",H.phaseTime=0,H.actionFired=!1;let j=(ee.tx-H.posX)*Math.cos(H.yaw)-(ee.tz-H.posZ)*Math.sin(H.yaw);H.reachSide=j>=0?1:-1,H.reachHeightNorm=(ee.reachY??de*.55)/de}}else if(H.phase==="acting"){let ee=H.currentAction;if(!ee)Z();else if(H.walkBlend=Math.max(0,H.walkBlend-C*8),H.phaseTime+=C,ee.kind==="sit"){let j=ee.seat,he=.9,X=Yt(H.phaseTime/he,0,1),me=X*X*(3-2*X);H.posX=j.approachX+(j.seatX-j.approachX)*me,H.posZ=j.approachZ+(j.seatZ-j.approachZ)*me,H.yaw=co(H.yaw,j.faceYaw,Math.min(1,C*8)),H.sitBlend=me,H.seatHeightNorm=j.seatY/de,H.hasMoved=!0,H.phaseTime>=.45&&!H.actionFired&&(H.actionFired=!0,H.seatedSeat=j,n.onPersonAutoAction?.({phase:"action",actionType:"sit",id:j.id,label:ee.label})),H.phaseTime>=he&&Z()}else if(ee.kind==="joint"||ee.kind==="switch"){let he=Yt(H.phaseTime/1,0,1);H.reachBlend=Math.sin(he*Math.PI),H.phaseTime>=.45&&!H.actionFired&&(H.actionFired=!0,n.onPersonAutoAction?.({phase:"action",actionType:ee.kind,id:ee.id,label:ee.label,goal:ee.goal,isOpening:ee.isOpening})),H.phaseTime>=1&&(H.reachBlend=0,Z())}else H.headYaw=Math.sin(H.phaseTime/1.3*Math.PI*2)*.28,H.phaseTime>=.35&&!H.actionFired&&(H.actionFired=!0,n.onPersonAutoAction?.({phase:"action",actionType:"inspect",id:ee.id,label:ee.label})),H.phaseTime>=1.3&&(H.headYaw=0,Z())}return A.root.position.set(H.posX,0,H.posZ),A.root.rotation.y=H.yaw,A.setMotion?.(hs()),ho(),!0}function Ns(C){!!C?(H.posX=A.root.position.x,H.posZ=A.root.position.z,H.yaw=A.root.rotation.y,E?.pose!=="seated"?(H.sitBlend=0,H.seatHeightNorm=0,H.seatedSeat=null):H.sitBlend=1,H.running=!0,H.phase="idle_wait",H.waitTimer=.25,H.phaseTime=0,H.currentAction=null,an()):(H.running=!1,H.phase="stopped",H.currentAction=null,n.onPersonAutoAction?.({phase:"stopped"}),an())}function za(){H.running=!1,H.hasMoved=!1,H.phase="stopped",H.currentAction=null,H.seatedSeat=null,H.walkBlend=0,H.reachBlend=0,H.sitBlend=E?.pose==="seated"?1:0,H.seatHeightNorm=0,A.setMotion?.(null),E&&Ga(E),an()}function Ha(C,q){let de=!1,Z=!1;ka(q)&&(de=!0);let ee=$p(m,N,q);if(ee.moved){for(let j of N.values())ae(j,j.current);Z=!0}if(ee.collisions.length)for(let j of ee.collisions)k(j),n.onJointBlocked?.(j);ee.animating&&(de=!0);for(let j of xe)j.contactFlash>0&&(C>=j.contactFlash?(j.contactFlash=0,Qe(j,C)):de=!0);for(let j of te.values())if(Math.abs(j.current-j.target)>5e-4){let he=C-j.startTime,X=j.duration>0?Yt(he/j.duration,0,1):1,me=1-Math.pow(1-X,3);j.current=X>=1?j.target:j.from+(j.target-j.from)*me,ce(j,j.current),de=!0}else j.current!==j.target&&(j.current=j.target,ce(j,j.current));if(oe){let j=oe.duration>0?Yt((C-oe.startTime)/oe.duration,0,1):1,he=1-Math.pow(1-j,3);at.lerpVectors(oe.fromDir,oe.toDir,he).normalize();let X=oe.fromDist+(oe.toDist-oe.fromDist)*he;y.position.copy(T.target).addScaledVector(at,X),x==="orthographic"&&(p.zoom=oe.fromZoom+(oe.toZoom-oe.fromZoom)*he),T.update(),K=!0,j>=1?oe=null:de=!0}if(Math.abs(re-1)>5e-4){let j=c?1:Math.min(1,q*16),he=Math.pow(re,j);jn(he),re/=he,Math.abs(re-1)<=5e-4?(jn(re),re=1):de=!0}return Z&&(dt(),K=!0),de}function Us(C=performance.now()){if(_e=0,!st||!Ue||!Ze)return;let q=Te?Yt((C-Te)/1e3,.001,.05):1/60;Te=C;let de=Ha(C,q),Z=T.enableDamping?T.update():!1;K&&Rt(),g&&M&&!v?g.render():a.render(h,y),de||Z?an():Te=0}function an(){_e||(_e=requestAnimationFrame(Us))}function us(){K=!0,an()}function uo(){let C=i.clientWidth,q=i.clientHeight;if(Ue===C&&Ze===q)return;let de=fe,Z=y.position.distanceTo(T.target)||fe,ee=de/Z;if(Ue=C,Ze=q,C&&q&&(a.setSize(C,q,!1),g&&(g.setPixelRatio(a.getPixelRatio()),g.setSize(C,q)),x==="perspective"&&st)){let{reqHalfH:j,hz:he}=Le("static");fe=j/Math.tan($n(_.fov*.5))+he*.55,at.subVectors(_.position,T.target).normalize(),_.position.copy(T.target).addScaledVector(at,fe/Yt(ee,T.minZoom,T.maxZoom)),T.minDistance=fe/T.maxZoom,T.maxDistance=fe/T.minZoom,T.update()}us()}T.addEventListener("change",us),T.addEventListener("start",()=>{oe=null,re=1}),new ResizeObserver(uo).observe(i),uo();function or(C,q,de){if(C.position.fromArray(q),de){let Z=de.pivot;C.position.x-=Z[0],C.position.y-=Z[1],C.position.z-=Z[2]}}function uh(){let C=[];for(let de=0;de<xe.length;de++){let Z=xe[de];if(Z.visual.traverse(He=>{!He.isMesh||!He.material||(He.material.polygonOffset=!1,He.material.polygonOffsetFactor=0,He.material.polygonOffsetUnits=0)}),!Z.anchor.visible)continue;let ee=1/0,j=1/0,he=1/0,X=-1/0,me=-1/0,Ce=-1/0;for(let He of Z.points)He.x<ee&&(ee=He.x),He.x>X&&(X=He.x),He.y<j&&(j=He.y),He.y>me&&(me=He.y),He.z<he&&(he=He.z),He.z>Ce&&(Ce=He.z);let it=Math.max(1,(X-ee)*(me-j)*(Ce-he));C.push({idx:de,part:Z,minX:ee,maxX:X,minY:j,maxY:me,minZ:he,maxZ:Ce,vol:it})}let q=new Map;for(let de=0;de<C.length;de++){let Z=C[de];for(let ee=de+1;ee<C.length;ee++){let j=C[ee],he=Math.min(Z.maxX,j.maxX)-Math.max(Z.minX,j.minX),X=Math.min(Z.maxY,j.maxY)-Math.max(Z.minY,j.minY),me=Math.min(Z.maxZ,j.maxZ)-Math.max(Z.minZ,j.minZ);if(he<=.25||X<=.25||me<=.25||!(Math.abs(Z.minX-j.minX)<.5||Math.abs(Z.maxX-j.maxX)<.5||Math.abs(Z.minY-j.minY)<.5||Math.abs(Z.maxY-j.maxY)<.5||Math.abs(Z.minZ-j.minZ)<.5||Math.abs(Z.maxZ-j.maxZ)<.5))continue;let it=Z.vol<=j.vol?Z.part:j.part,He=(q.get(it)??0)+1;q.set(it,He),it.visual.traverse(ve=>{!ve.isMesh||!ve.material||(ve.material.polygonOffset=!0,ve.material.polygonOffsetFactor=-(He*.75),ve.material.polygonOffsetUnits=-(He*1.5))})}}}function Ga(C){let q=[];for(let X of N.values())q.push([X,X.current]),ae(X,0);D.updateMatrixWorld(!0),ct.makeEmpty();for(let X of xe)if(X.anchor.visible){let[me,Ce,it]=X.size;for(let He=0;He<8;He++){let ve=rn().set(Kn(He,1)*me,Kn(He,2)*Ce,Kn(He,4)*it).applyMatrix4(X.anchor.matrixWorld);ct.expandByPoint(ve)}}for(let[X,me]of q)ae(X,me);if(nt.copy(ct),nt.isEmpty()||Ne)for(let X of tt.endpoints)nt.expandByPoint(X);if(ke.makeEmpty(),C.visible){if(!H.running&&!H.hasMoved){A.root.position.set(0,0,0),ke.setFromObject(A.root);let X=C.height*.09,me=C.side==="right"?nt.max.x+X-ke.min.x:nt.min.x-X-ke.max.x;A.root.position.x=me,H.posX=me,H.posZ=0,H.yaw=A.root.rotation.y,ke.min.x+=me,ke.max.x+=me,nt.union(ke)}else A.root.position.set(H.posX,0,H.posZ),A.root.rotation.y=H.yaw,A.root.updateMatrixWorld(!0),ke.setFromObject(A.root);for(let X=0;X<8;X++)ht[X].set(X&1?ke.max.x:ke.min.x,X&2?ke.max.y:ke.min.y,X&4?ke.max.z:ke.min.z)}let de=fe,Z=y.position.distanceTo(T.target)||de,ee=st?Yt(de/Z,T.minZoom,T.maxZoom):1;at.subVectors(y.position,T.target).normalize(),nt.getCenter(Ht),T.target.copy(Ht);let j=Math.max(5,nt.min.distanceTo(nt.max)*.5);if(_.near=Math.max(10,j*.08),_.far=Math.max(1e4,j*24),p.near=j*.08,p.far=j*16,y.position.copy(Ht).addScaledVector(at,Math.max(5,j*4)),y.lookAt(Ht),Ue&&Ze){let{reqHalfH:X,hz:me}=Le("static");fe=X/Math.tan($n(_.fov*.5))+me*.55}else fe=j*4.2;T.minDistance=fe/T.maxZoom,T.maxDistance=fe/T.minZoom;let he=x==="perspective"?fe/ee:j*4;y.position.copy(Ht).addScaledVector(at,he),T.update(),dt(),uh(),f.fit(ct,ke,C.visible),K=!0}function Va(C,{animate:q=!1}={}){let de=performance.now(),Z=C.dimensions,ee=!Ye||Ye.width!==Z.width||Ye.height!==Z.height||Ye.depth!==Z.depth,j=ee||Ne!==C.showDimensions;j&&(Ye={...Z},Ne=C.showDimensions,tt.set(Ne,Z)),v&&ut(!1),d.update(C.finishes);let he=!1;if(!U)he=!0;else for(let ve of Object.keys(C.options))if(U[ve]!==C.options[ve]){he=!0;break}(ee||he)&&(U={...C.options},m.setDimensionsAndOptions(Z,C.options));for(let ve of xe){if(ee){let tn=Mi(ve.def.center,Z);ve.closedCenter=tn,or(ve.anchor,tn,ve.joint??null);let Gt=Mi(ve.def.size,Z),ds=ve.size;if(Gt[0]!==ds[0]||Gt[1]!==ds[1]||Gt[2]!==ds[2])if(ve.size=Gt,ve.def.shape==="box"){let zi=Math.min(1.8,Math.min(...Gt)*.1);ve.visual.geometry.dispose(),ve.visual.geometry=new Vc(...Gt,2,zi),rm(ve.visual.geometry,Gt,ve.grain)}else ve.def.shape==="cylinder"&&(ve.visual.geometry.dispose(),ve.visual.geometry=new Bo(.5,.5,1,48),om(ve.visual.geometry,Gt,ve.grain)),ve.visual.scale.fromArray(Gt)}let en=ve.def.when.every(tn=>C.options[tn.option]===tn.choice);ve.anchor.visible!==en&&(ve.anchor.visible=en,j=!0)}v&&ut(!0);let X=!1;for(let ve of N.values())ee&&(ve.pivot=Mi(ve.def.pivot,Z));for(let ve of xe)ee&&ve.joint&&or(ve.anchor,ve.closedCenter,ve.joint);if((ee||he)&&st){let ve=m.resolveAllOverlaps(Me()),en=Object.keys(ve);if(en.length){for(let tn of en){let Gt=N.get(tn);Gt.current=Gt.target=ve[tn],Gt.velocity=0,ae(Gt,Gt.current),X=!0}n.onJointSync?.(ve)}}let me=Me();for(let ve of N.values()){let en=C.joints[ve.id];if(!ve.initialized||!q||c){if(!ve.initialized)ve.current=ve.target=en,ve.velocity=0,ve.initialized=!0,ae(ve,ve.current),me[ve.id]=ve.current,X=!0;else if(ee||Math.abs(ve.current-en)>1e-6){let tn=m.resolveJointMotion(ve.id,ve.current,en,me);if(ve.current=ve.target=tn.progress,ve.velocity=0,me[ve.id]=tn.progress,ae(ve,ve.current),X=!0,tn.blocked){let Gt={id:ve.id,label:ve.label,blockerLabel:tn.blocker.label,blockerJointId:tn.blocker.jointId,blockerPartId:tn.blocker.partId,progress:tn.progress};k(Gt),n.onJointBlocked?.(Gt)}}}else ve.target=en}for(let ve of te.values()){let en=C.switches?.[ve.def.id]?1:0;ee&&ve.light&&or(ve.light,Mi(ve.def.light.center,Z),ve.joint),!ve.initialized||!q||c?(ve.current=ve.target=ve.from=en,ve.initialized=!0,ce(ve,ve.current)):ve.target!==en&&(ve.from=ve.current,ve.target=en,ve.startTime=de,ve.duration=200)}if(ge){ee&&or(ge.mesh,Mi(pe.center,Z),De);let ve=ge.mesh.visible;ge.setText(C.inscription),ve!==ge.mesh.visible&&(j=!0)}let Ce=C.person,it=E;it&&it.side!==Ce.side&&!H.running&&(H.hasMoved=!1),it&&it.pose!==Ce.pose&&!H.running&&(H.sitBlend=Ce.pose==="seated"?1:0,H.seatHeightNorm=0,H.seatedSeat=null);let He=!H.running&&(it?.pose!==Ce.pose||it?.yaw!==Ce.yaw);!it||it.visible!==Ce.visible||Ce.visible&&(it.height!==Ce.height||it.build!==Ce.build||it.side!==Ce.side||He)?(E={...Ce},j=!0):H.running&&(E={...Ce}),A.update(Ce),(H.running||H.hasMoved)&&(A.root.position.set(H.posX,0,H.posZ),A.root.rotation.y=H.yaw,A.setMotion?.(hs())),j?Ga(Ce):X&&(dt(),K=!0),st=!0,an()}function R(C){let q=rn();if(C==="studio")q.copy(Sd);else if(C==="front")q.set(0,0,1);else if(C==="side")q.set(1,0,0);else if(C==="top")q.set(0,1,1e-4).normalize();else if(C==="back")q.set(0,0,-1);else throw new Error(`Unknown camera view: ${C}`);let de=rn().subVectors(y.position,T.target).normalize(),Z=y.position.distanceTo(T.target),ee=Math.max(5,nt.min.distanceTo(nt.max)*.5),j=ee*2;if(x==="perspective"){if(Ue&&Ze){let he=y.position.clone();y.position.copy(T.target).addScaledVector(q,Math.max(5,ee*4)),y.lookAt(T.target);let{reqHalfH:X,hz:me}=Le("static");fe=X/Math.tan($n(_.fov*.5))+me*.55,T.minDistance=fe/T.maxZoom,T.maxDistance=fe/T.minZoom,y.position.copy(he),y.lookAt(T.target)}j=fe}c||!st?(oe=null,y.position.copy(T.target).addScaledVector(q,j),p.zoom=1,T.update(),us()):(oe={fromDir:de,toDir:q,fromDist:Z,toDist:j,fromZoom:p.zoom,toZoom:1,startTime:performance.now(),duration:380},an())}function G(C){if(!Number.isFinite(C)||C<=0)throw new Error("Zoom factor must be positive.");rr(C)}function se(C,q){oe=null,ot.setFromVector3(At.subVectors(y.position,T.target)),ot.theta+=$n(C),ot.phi=Yt(ot.phi-$n(q),T.minPolarAngle,T.maxPolarAngle),y.position.copy(T.target).add(At.setFromSpherical(ot)),T.update(),us()}function Q(C){if(C!=="perspective"&&C!=="orthographic")throw new Error(`Unknown projection: ${C}`);if(x===C)return;oe=null,re=1;let q=y;at.subVectors(q.position,T.target).normalize();let de=q.position.distanceTo(T.target),Z=Math.max(5,nt.min.distanceTo(nt.max)*.5);if(x=C,C==="orthographic"){let ee=Yt(fe/de,T.minZoom,T.maxZoom);p.position.copy(T.target).addScaledVector(at,Z*4),p.zoom=ee,p.near=Z*.08,p.far=Z*16,y=p}else{let ee=Yt(fe/Yt(p.zoom,T.minZoom,T.maxZoom),T.minDistance,T.maxDistance);_.position.copy(T.target).addScaledVector(at,ee),y=_}if(b&&(b.camera=y),L){L.camera=y;let ee=y.isPerspectiveCamera?1:0;L.gtaoMaterial.defines.PERSPECTIVE_CAMERA!==ee&&(L.gtaoMaterial.defines.PERSPECTIVE_CAMERA=ee,L.gtaoMaterial.needsUpdate=!0)}T.object=y,T.update(),us()}function ne(C){u.setPreset(C),le(),an()}function Ie(C){S=C==="room"?"room":"studio";let q=S==="room";f.setVisible(q),u.setFloorVisible(!q),be(),a.shadowMap.needsUpdate=!0,an()}function Ve(C){f.setStyle(C),an()}function Pe(C){v=!!C,ut(v),an()}function Oe(C){th[C]&&(w=C,le(),an())}function $e(C){M=!!C,an()}function ft(C){gt=!!C,Jt()}i.addEventListener("wheel",C=>{if(!st)return;C.preventDefault(),C.stopPropagation();let q=C.deltaY;if(C.deltaMode===1?q*=16:C.deltaMode===2&&(q*=100),!C.ctrlKey&&Math.abs(C.deltaX)>Math.abs(q)*2&&Math.abs(q)<.5||Math.abs(q)<.01)return;let de=C.ctrlKey?Math.exp(-Yt(q,-120,120)*.012):Math.exp(-Yt(q,-200,200)*.0018);rr(de)},{passive:!1,capture:!0});let xt=1;i.addEventListener("gesturestart",C=>{C.preventDefault(),xt=C.scale||1},{passive:!1}),i.addEventListener("gesturechange",C=>{C.preventDefault();let q=C.scale||1;xt>0&&q>0&&rr(q/xt),xt=q},{passive:!1}),i.addEventListener("gestureend",C=>{C.preventDefault(),xt=1},{passive:!1});let We=new Ko,vt=new Ke,Bt=new Set,St=null;function Dt(C,q){let de=l.getBoundingClientRect();if(!de.width||!de.height)return null;vt.x=(C-de.left)/de.width*2-1,vt.y=-((q-de.top)/de.height)*2+1,We.setFromCamera(vt,y);let Z=We.intersectObjects(J,!1),ee=[];for(let j of Z){let he=!0;for(let X=j.object;X;X=X.parent)if(!X.visible){he=!1;break}he&&j.object.userData.interactive&&ee.push(j.object)}if(!ee.length)return null;if(v){let j=ee.find(he=>!Ee(he.userData.part));if(j)return j}return ee[0]}let Qt=null;function ze(C,q=0,de=0){let Z=C?C.userData.interactive:null,ee=C?.userData.part??null,j=ee?.def.slot??null,he=ee?.def.id??null,X=Z?`${Z.type}:${Z.id??""}:${he??""}`:null;if(X!==Qt){Qt=X;for(let Ce of xe){let it=Z?.type==="switch"&&V.get(Ce.def.id)?.id===Z.id||Z?.type==="joint"&&Ce.joint?.def.id===Z.id||Z?.type==="option"&&Ce.def.when.length===1&&Ce.def.when[0].option===Z.id||Z?.type==="slot"&&Ce.def.slot===Z.id;Ce.hovered!==!!it&&(Ce.hovered=!!it,Qe(Ce))}l.style.cursor=Z?"pointer":"grab",an()}if(!Z){n.onHover?.(null);return}let me=i.getBoundingClientRect();n.onHover?.({action:Z,slotId:j,partId:he,x:q-me.left,y:de-me.top})}l.addEventListener("pointerdown",C=>{if(Bt.add(C.pointerId),Bt.size>1){St=null,ze(null);return}C.button===0&&(St={x:C.clientX,y:C.clientY,id:C.pointerId}),l.style.cursor="grabbing"}),l.addEventListener("pointermove",C=>{if(Bt.size>1)return;if(St&&C.pointerId===St.id){Math.hypot(C.clientX-St.x,C.clientY-St.y)>=6&&ze(null);return}if(C.pointerType!=="mouse")return;let q=Dt(C.clientX,C.clientY);ze(q,C.clientX,C.clientY)}),l.addEventListener("pointerleave",()=>{ze(null)}),l.addEventListener("pointerup",C=>{if(Bt.delete(C.pointerId),!St||C.pointerId!==St.id){Bt.size===0&&(l.style.cursor=Qt?"pointer":"grab");return}let q=Math.hypot(C.clientX-St.x,C.clientY-St.y);if(St=null,q<6){let de=Dt(C.clientX,C.clientY);de&&n.onInteract?.(de.userData.interactive)}l.style.cursor=Qt?"pointer":"grab"}),l.addEventListener("pointercancel",C=>{Bt.delete(C.pointerId),St=null,l.style.cursor="grab"});function Sn(C){return new Promise(q=>{if(typeof C!="string"||!C.startsWith("data:image/")){q(null);return}let de=new Image;de.onload=()=>q(de),de.onerror=()=>q(null),de.src=C})}async function Ct({scale:C=2,transparent:q=!1,includeGuides:de=!1,includeCaption:Z=!1,caption:ee=null}={}){if(!st||!Ue||!Ze)throw new Error("3D view is not ready yet.");let j=Math.min(4096,a.capabilities.maxTextureSize||4096),he=Math.max(1,Math.min(C,j/Math.max(Ue,Ze))),X=Math.max(1,Math.round(Ue*he)),me=Math.max(1,Math.round(Ze*he)),Ce=Z?Math.round(74*he):0,it=document.createElement("canvas");it.width=X,it.height=me+Ce;let He=it.getContext("2d"),ve=a.getPixelRatio(),en=h.background,tn=new Xe;a.getClearColor(tn);let Gt=a.getClearAlpha();try{a.setPixelRatio(1),a.setSize(X,me,!1);let zi=!!(g&&M&&!v&&!q);zi&&(g.setPixelRatio(1),g.setSize(X,me)),q?(h.background=null,a.setClearColor(0,0)):(h.background=u.getBackdropTexture(),a.setClearColor(0,1));let Hi=X/me;if(x==="orthographic"){let{reqHalfH:qt}=Le("live");p.top=qt,p.bottom=-qt,p.right=qt*Hi,p.left=-p.right,p.updateProjectionMatrix()}else _.aspect=Hi,_.updateProjectionMatrix();if(zi?g.render():a.render(h,y),He.drawImage(l,0,0,X,me),de&&lm(He,tt.endpoints,y,X,me,Ye,he,r),Z&&ee){He.fillStyle=q?"rgba(255, 254, 250, 0.96)":"#fffefa",He.fillRect(0,me,X,Ce),He.fillStyle="#d8dacf",He.fillRect(0,me,X,Math.max(1,he));let qt=Math.round(22*he),Fn=me+Ce*.5,ci=!!ee.rtl,Gi=0;if(ee.brand?.logo){let Si=await Sn(ee.brand.logo);if(Si){let ar=Si.naturalWidth||120,lr=Si.naturalHeight||40,po=40*he,cr=120*he,Os=Math.min(cr/ar,po/lr),hr=Math.max(1,Math.round(ar*Os)),Dn=Math.max(1,Math.round(lr*Os)),dh=ci?X-qt-hr:qt,Lm=Math.round(Fn-Dn*.5);He.drawImage(Si,dh,Lm,hr,Dn),Gi=hr+Math.round(14*he)}}let Wa=ci?X-qt-Gi:qt+Gi,Vi=ci?qt:X-qt,fo=Math.max(80*he,X*.54-Gi),fs=Math.max(80*he,X*.58-Gi);He.fillStyle="#222b26",He.font=`600 ${Math.round(17*he)}px Georgia, "Times New Roman", serif`,He.textAlign=ci?"right":"left",He.textBaseline="bottom",He.fillText(ee.name,Wa,Fn-2*he,fo),He.fillStyle="#56635b",He.font=`500 ${Math.round(11*he)}px system-ui, -apple-system, sans-serif`,He.textBaseline="top",He.fillText(ee.finishes,Wa,Fn+4*he,fs),He.textAlign=ci?"left":"right",He.fillStyle="#222b26",He.font=`600 ${Math.round(12.5*he)}px ui-monospace, SFMono-Regular, Consolas, monospace`,He.textBaseline="bottom",He.fillText(ee.dimensions,Vi,Fn-2*he),He.fillStyle="#56635b",He.font=`500 ${Math.round(10*he)}px system-ui, -apple-system, sans-serif`,He.textBaseline="top",He.fillText(ee.disclaimer||"Form Study \xB7 Visual reference only",Vi,Fn+4*he)}}finally{a.setPixelRatio(ve),a.setSize(Ue,Ze,!1),g&&(g.setPixelRatio(ve),g.setSize(Ue,Ze)),h.background=en,a.setClearColor(tn,Gt),Rt(),g&&M&&!v?g.render():a.render(h,y)}return{blob:await new Promise((zi,Hi)=>{it.toBlob(qt=>qt?zi(qt):Hi(new Error("Failed to encode PNG image.")),"image/png")}),width:it.width,height:it.height}}async function ki(){if(!st||!Ue||!Ze)throw new Error("3D view is not ready yet.");let C=1200,q=820,de=C/q,Z=a.getPixelRatio(),ee=x,j=y.position.clone(),he=T.target.clone(),X=p.zoom,me=Ne,Ce=A.root.visible,it=A.root.position.clone(),He=A.root.rotation.y,ve=v,en=gt,tn=h.background,Gt=document.createElement("canvas");Gt.width=C,Gt.height=q;let ds=Gt.getContext("2d"),zi=qt=>{if(b&&(b.camera=qt),L){L.camera=qt;let Fn=qt.isPerspectiveCamera?1:0;L.gtaoMaterial.defines.PERSPECTIVE_CAMERA!==Fn&&(L.gtaoMaterial.defines.PERSPECTIVE_CAMERA=Fn,L.gtaoMaterial.needsUpdate=!0)}},Hi=async(qt,Fn,ci,Gi,Wa)=>{let Vi=rn();qt==="studio"?Vi.copy(Sd):qt==="front"?Vi.set(0,0,1):qt==="side"?Vi.set(1,0,0):Vi.set(0,1,1e-4).normalize(),Ge.hidden=!0,A.root.visible=!!(Wa&&E?.visible),v=!!Gi,ut(v),x=Fn,y=Fn==="orthographic"?p:_,zi(y);let fo=A.root.visible||ct.isEmpty()?nt:ct,fs=fo.getCenter(rn()),Si=Math.max(50,fo.min.distanceTo(fo.max)*.5);y.position.copy(fs).addScaledVector(Vi,Si*4),y.lookAt(fs),y.updateMatrixWorld(!0),Ft.setFromMatrixColumn(y.matrixWorld,0),Be.setFromMatrixColumn(y.matrixWorld,1),F.setFromMatrixColumn(y.matrixWorld,2);let ar=1,lr=1,po=1,cr=Dn=>{At.subVectors(Dn,fs),ar=Math.max(ar,Math.abs(At.dot(Ft))),lr=Math.max(lr,Math.abs(At.dot(Be))),po=Math.max(po,Math.abs(At.dot(F)))};for(let Dn of xe)if(Dn.anchor.visible)for(let dh of Dn.points)cr(dh);if(A.root.visible)for(let Dn of ht)cr(Dn);if(ge?.mesh.visible)for(let Dn of ye)cr(Dn);if(ci)for(let Dn of tt.endpoints)cr(Dn);let Os=Math.max(lr,ar/de)*(ci?1.24:1.15);if(Fn==="orthographic")p.zoom=1,p.near=Si*.08,p.far=Si*16,p.top=Os,p.bottom=-Os,p.right=Os*de,p.left=-p.right,p.updateProjectionMatrix(),p.lookAt(fs);else{let Dn=Os/Math.tan($n(_.fov*.5))+po*.55;_.near=Math.max(10,Si*.08),_.far=Math.max(1e4,Si*24),_.position.copy(fs).addScaledVector(Vi,Dn),_.aspect=de,_.updateProjectionMatrix(),_.lookAt(fs)}a.setPixelRatio(1),a.setSize(C,q,!1);let hr=!!(g&&M&&!v);return hr&&(g.setPixelRatio(1),g.setSize(C,q)),h.background=u.getBackdropTexture(),a.setClearColor(0,1),be(),hr?g.render():a.render(h,y),ds.clearRect(0,0,C,q),ds.drawImage(l,0,0,C,q),ci&&lm(ds,tt.endpoints,y,C,q,Ye,1.35,r),Gt.toDataURL("image/png")};try{let qt=await Hi("studio","perspective",!1,ve,!0),Fn=await Hi("front","orthographic",!0,!1,!1),ci=await Hi("side","orthographic",!0,!1,!1),Gi=await Hi(Se?"studio":"top",Se?"perspective":"orthographic",!Se,Se,!1);return{studio:qt,front:Fn,side:ci,interior:Gi}}finally{v=ve,ut(v),A.root.visible=Ce,A.root.position.copy(it),A.root.rotation.y=He,(H.running||H.hasMoved)&&A.setMotion?.(hs()),Ne=me,tt.set(Ne,Ye),x=ee,y=ee==="orthographic"?p:_,zi(y),T.object=y,T.target.copy(he),y.position.copy(j),p.zoom=X,p.updateProjectionMatrix(),T.update(),gt=en,h.background=tn,a.setPixelRatio(Z),a.setSize(Ue,Ze,!1),g&&(g.setPixelRatio(Z),g.setSize(Ue,Ze)),dt(),Rt(),g&&M&&!v?g.render():a.render(h,y)}}function gn(C){r=C||Ls,l.setAttribute("aria-label",r.formatCanvasLabel(r.term(e.name))),tt.setLocale(r);for(let q of qe)q.btn.querySelector(".hotspot-tag").textContent=r.term(q.entry.def.label);Rt(),an()}return{update:Va,view:R,zoom:G,turn:se,setProjection:Q,setLighting:ne,setBackdrop:Ie,setRoomStyle:Ve,setXray:Pe,setLedTemp:Oe,setAO:$e,setPersonAutoRun:Ns,isPersonAutoRunning:()=>H.running,resetPersonPosition:za,hasXrayTargets:Se,setHotspots:ft,setLocale:gn,exportPng:Ct,captureSpecSheetViews:ki}}var dm=(i,e,t)=>Math.max(e,Math.min(t,i)),cb=new Set(["wood","fabric","metal","paint"]),fm=[{id:"natural-oak",name:"Natural oak",heName:"\u05D0\u05DC\u05D5\u05DF \u05D8\u05D1\u05E2\u05D9",color:"#c29b70",surface:"wood",aliases:["natural oak","oak","whitewash oak","\u05D0\u05DC\u05D5\u05DF \u05D8\u05D1\u05E2\u05D9","\u05D0\u05DC\u05D5\u05DF","\u05E2\u05E5 \u05D0\u05DC\u05D5\u05DF"]},{id:"white-oak",name:"White oak",heName:"\u05D0\u05DC\u05D5\u05DF \u05DE\u05D5\u05DC\u05D1\u05DF",color:"#d4bc98",surface:"wood",aliases:["white oak","light oak","bleach oak","\u05D0\u05DC\u05D5\u05DF \u05DE\u05D5\u05DC\u05D1\u05DF","\u05D0\u05DC\u05D5\u05DF \u05D1\u05D4\u05D9\u05E8"]},{id:"fluted-oak",name:"Fluted oak",heName:"\u05D0\u05DC\u05D5\u05DF \u05DE\u05D7\u05D5\u05E8\u05E5",color:"#bfa078",surface:"wood",aliases:["fluted oak","slatted oak","reeded oak","\u05D0\u05DC\u05D5\u05DF \u05DE\u05D7\u05D5\u05E8\u05E5","\u05D7\u05D9\u05E4\u05D5\u05D9 \u05E1\u05E8\u05D2\u05DC\u05D9\u05DD","\u05E1\u05E8\u05D2\u05DC\u05D9 \u05D0\u05DC\u05D5\u05DF"]},{id:"smoked-walnut",name:"Smoked walnut",heName:"\u05D0\u05D2\u05D5\u05D6 \u05DE\u05E2\u05D5\u05E9\u05DF",color:"#72533d",surface:"wood",aliases:["smoked walnut","dark walnut","walnut","\u05D0\u05D2\u05D5\u05D6 \u05DE\u05E2\u05D5\u05E9\u05DF","\u05D0\u05D2\u05D5\u05D6 \u05DB\u05D4\u05D4","\u05E2\u05E5 \u05D0\u05D2\u05D5\u05D6","\u05D0\u05D2\u05D5\u05D6"]},{id:"american-walnut",name:"American walnut",heName:"\u05D0\u05D2\u05D5\u05D6 \u05D0\u05DE\u05E8\u05D9\u05E7\u05D0\u05D9",color:"#745746",surface:"wood",aliases:["american walnut","oberflex","\u05D0\u05D2\u05D5\u05D6 \u05D0\u05DE\u05E8\u05D9\u05E7\u05D0\u05D9"]},{id:"ash",name:"Ash veneer",heName:"\u05DE\u05D9\u05DC\u05D4 (\u05D0\u05E9)",color:"#ddd2bd",surface:"wood",aliases:["ash","ash wood","ash veneer","\u05DE\u05D9\u05DC\u05D4","\u05E4\u05D5\u05E8\u05E0\u05D9\u05E8 \u05DE\u05D9\u05DC\u05D4","\u05D0\u05E9"]},{id:"beech",name:"Steamed beech",heName:"\u05D1\u05D5\u05E7 \u05D8\u05D1\u05E2\u05D9",color:"#cfa97f",surface:"wood",aliases:["beech","steamed beech","\u05D1\u05D5\u05E7","\u05E2\u05E5 \u05D1\u05D5\u05E7"]},{id:"teak",name:"Teak",heName:"\u05D8\u05D9\u05E7",color:"#9e6b43",surface:"wood",aliases:["teak","burmese teak","\u05D8\u05D9\u05E7","\u05E2\u05E5 \u05D8\u05D9\u05E7"]},{id:"maple",name:"Hard maple",heName:"\u05DE\u05D9\u05D9\u05E4\u05DC \u05D1\u05D4\u05D9\u05E8",color:"#dfd0b4",surface:"wood",aliases:["maple","hard maple","\u05DE\u05D9\u05D9\u05E4\u05DC"]},{id:"birch",name:"Birch plywood",heName:"\u05DC\u05D9\u05D1\u05E0\u05D4 (\u05D1\u05D9\u05E8\u05E5\u05F3)",color:"#e4d7bd",surface:"wood",aliases:["birch","birch ply","plywood","\u05D1\u05D9\u05E8\u05E5","\u05DC\u05D9\u05D1\u05E0\u05D4","\u05DC\u05D1\u05D9\u05D3 \u05DC\u05D9\u05D1\u05E0\u05D4"]},{id:"pine",name:"Natural pine",heName:"\u05D0\u05D5\u05E8\u05DF \u05D8\u05D1\u05E2\u05D9",color:"#dab985",surface:"wood",aliases:["pine","nordic pine","\u05D0\u05D5\u05E8\u05DF","\u05E2\u05E5 \u05D0\u05D5\u05E8\u05DF"]},{id:"wenge",name:"Wenge",heName:"\u05D5\u05D5\u05E0\u05D2\u05D4",color:"#3d2e26",surface:"wood",aliases:["wenge","espresso wood","\u05D5\u05D5\u05E0\u05D2\u05D4","\u05D0\u05E1\u05E4\u05E8\u05E1\u05D5"]},{id:"cashmere",name:"Matte cashmere",heName:"\u05E7\u05E9\u05DE\u05D9\u05E8 \u05DE\u05D8",color:"#c9bdab",surface:"paint",aliases:["cashmere","egger u702","u702","\u05E7\u05E9\u05DE\u05D9\u05E8","\u05E7\u05E9\u05DE\u05D9\u05E8 \u05DE\u05D8","\u05E7\u05E9\u05DE\u05D9\u05E8 \u05D0\u05D2\u05E8"]},{id:"chalk",name:"Chalk matte",heName:"\u05D2\u05D9\u05E8 \u05DE\u05D8",color:"#dedbd0",surface:"paint",aliases:["chalk","chalk white","\u05D2\u05D9\u05E8","\u05DC\u05D1\u05DF \u05D2\u05D9\u05E8"]},{id:"warm-white",name:"Warm white",heName:"\u05DC\u05D1\u05DF \u05D7\u05DE\u05D9\u05DD",color:"#f1ede4",surface:"paint",aliases:["warm white","off white","off-white","ral 9010","\u05DC\u05D1\u05DF \u05D7\u05DE\u05D9\u05DD","\u05DC\u05D1\u05DF \u05E9\u05D1\u05D5\u05E8"]},{id:"ivory",name:"Ivory lacquer",heName:"\u05E9\u05DE\u05E0\u05EA \u05DE\u05D8",color:"#f5f0e6",surface:"paint",aliases:["ivory","cream","lacquer white","\u05E9\u05DE\u05E0\u05EA","\u05DC\u05DB\u05D4 \u05E9\u05DE\u05E0\u05EA","\u05E9\u05E0\u05D4\u05D1"]},{id:"sand",name:"Desert sand",heName:"\u05D7\u05D5\u05DC \u05D1\u05D4\u05D9\u05E8",color:"#d9cdb8",surface:"paint",aliases:["sand","beige","oat","\u05D7\u05D5\u05DC","\u05D1\u05D6","\u05D1\u05D6\u05F3"]},{id:"taupe",name:"Warm taupe",heName:"\u05D8\u05D0\u05D5\u05E4 \u05D7\u05DE\u05D9\u05DD",color:"#9e9386",surface:"paint",aliases:["taupe","warm taupe","\u05D8\u05D0\u05D5\u05E4"]},{id:"greige",name:"Greige matte",heName:"\u05D2\u05E8\u05D9\u05D9\u05D6\u05F3 \u05DE\u05D8",color:"#b8afa3",surface:"paint",aliases:["greige","warm grey","warm gray","\u05D2\u05E8\u05D9\u05D9\u05D6","\u05D2\u05E8\u05D9\u05D9\u05D6\u05F3","\u05D0\u05E4\u05D5\u05E8 \u05D7\u05DE\u05D9\u05DD"]},{id:"sage",name:"Soft sage",heName:"\u05D9\u05E8\u05D5\u05E7 \u05DE\u05E8\u05D5\u05D5\u05D4",color:"#8d9c89",surface:"paint",aliases:["sage","sage green","eucalyptus","\u05DE\u05E8\u05D5\u05D5\u05D4","\u05D9\u05E8\u05D5\u05E7 \u05DE\u05E8\u05D5\u05D5\u05D4"]},{id:"moss",name:"Moss green",heName:"\u05D9\u05E8\u05D5\u05E7 \u05D8\u05D7\u05D1",color:"#6a7666",surface:"paint",aliases:["moss","moss green","forest green","\u05D8\u05D7\u05D1","\u05D9\u05E8\u05D5\u05E7 \u05D8\u05D7\u05D1"]},{id:"olive",name:"Muted olive",heName:"\u05D9\u05E8\u05D5\u05E7 \u05D6\u05D9\u05EA",color:"#6b7054",surface:"paint",aliases:["olive","olive green","\u05D6\u05D9\u05EA","\u05D9\u05E8\u05D5\u05E7 \u05D6\u05D9\u05EA"]},{id:"clay",name:"Baked clay",heName:"\u05D7\u05D9\u05DE\u05E8",color:"#b77c62",surface:"paint",aliases:["clay","\u05D7\u05D9\u05DE\u05E8"]},{id:"terracotta",name:"Terracotta",heName:"\u05D8\u05E8\u05E7\u05D5\u05D8\u05D4",color:"#b86348",surface:"paint",aliases:["terracotta","sienna","\u05D8\u05E8\u05E7\u05D5\u05D8\u05D4"]},{id:"navy",name:"Deep navy",heName:"\u05DB\u05D7\u05D5\u05DC \u05E0\u05D9\u05D9\u05D1\u05D9",color:"#2d3b4e",surface:"paint",aliases:["navy","midnight blue","ink blue","\u05E0\u05D9\u05D9\u05D1\u05D9","\u05DB\u05D7\u05D5\u05DC \u05DB\u05D4\u05D4"]},{id:"slate",name:"Slate blue-grey",heName:"\u05D0\u05E4\u05D5\u05E8 \u05E6\u05E4\u05D7\u05D4",color:"#5a646e",surface:"paint",aliases:["slate","slate grey","slate gray","\u05E6\u05E4\u05D7\u05D4","\u05D0\u05E4\u05D5\u05E8 \u05DB\u05D7\u05D5\u05DC"]},{id:"charcoal",name:"Charcoal matte",heName:"\u05E4\u05D7\u05DD \u05DE\u05D8",color:"#414548",surface:"paint",aliases:["charcoal","anthracite","\u05E4\u05D7\u05DD","\u05D0\u05E0\u05EA\u05E8\u05E6\u05D9\u05D8","\u05D0\u05E4\u05D5\u05E8 \u05DB\u05D4\u05D4"]},{id:"graphite",name:"Graphite",heName:"\u05D2\u05E8\u05E4\u05D9\u05D8",color:"#464642",surface:"paint",aliases:["graphite","\u05D2\u05E8\u05E4\u05D9\u05D8"]},{id:"matte-black",name:"Matte black",heName:"\u05E9\u05D7\u05D5\u05E8 \u05DE\u05D8",color:"#222426",surface:"paint",aliases:["matte black","black","ral 9005","\u05E9\u05D7\u05D5\u05E8 \u05DE\u05D8","\u05E9\u05D7\u05D5\u05E8"]},{id:"marble",name:"Honed marble",heName:"\u05E9\u05D9\u05E9 \u05D1\u05D4\u05D9\u05E8",color:"#eceae4",surface:"paint",aliases:["marble","carrara","calacatta","\u05E9\u05D9\u05E9","\u05E7\u05E8\u05D0\u05E8\u05D4"]},{id:"travertine",name:"Warm travertine",heName:"\u05D8\u05E8\u05D5\u05D5\u05E8\u05D8\u05D9\u05DF",color:"#d6cbb9",surface:"paint",aliases:["travertine","limestone","\u05D8\u05E8\u05D5\u05D5\u05E8\u05D8\u05D9\u05DF","\u05D0\u05D1\u05DF \u05D8\u05E8\u05D5\u05D5\u05E8\u05D8\u05D9\u05DF"]},{id:"dekton",name:"Porcelain / Dekton",heName:"\u05D2\u05E8\u05E0\u05D9\u05D8 \u05E4\u05D5\u05E8\u05E6\u05DC\u05DF / \u05D3\u05E7\u05D8\u05D5\u05DF",color:"#a39478",surface:"paint",aliases:["dekton","porcelain","caesarstone","\u05E7\u05DC\u05D9\u05DC\u05D5","\u05D3\u05E7\u05D8\u05D5\u05DF","\u05D2\u05E8\u05E0\u05D9\u05D8 \u05E4\u05D5\u05E8\u05E6\u05DC\u05DF","\u05D0\u05D1\u05DF \u05E7\u05D9\u05E1\u05E8"]},{id:"concrete",name:"Microcement",heName:"\u05D1\u05D8\u05D5\u05DF \u05DE\u05D5\u05D7\u05DC\u05E7",color:"#9d9d9a",surface:"paint",aliases:["concrete","microcement","\u05DE\u05D9\u05E7\u05E8\u05D5\u05E6\u05DE\u05E0\u05D8","\u05D1\u05D8\u05D5\u05DF \u05DE\u05D5\u05D7\u05DC\u05E7","\u05D1\u05D8\u05D5\u05DF"]},{id:"terrazzo",name:"Light terrazzo",heName:"\u05D8\u05E8\u05D0\u05E6\u05D5 \u05D1\u05D4\u05D9\u05E8",color:"#d5d1c8",surface:"paint",aliases:["terrazzo","\u05D8\u05E8\u05D0\u05E6\u05D5"]},{id:"brushed-brass",name:"Brushed brass",heName:"\u05E4\u05DC\u05D9\u05D6 \u05DE\u05D5\u05D1\u05E8\u05E9",color:"#b49963",surface:"metal",aliases:["brushed brass","brass","gold brass","\u05E4\u05DC\u05D9\u05D6 \u05DE\u05D5\u05D1\u05E8\u05E9","\u05E4\u05DC\u05D9\u05D6","\u05D6\u05D4\u05D1 \u05DE\u05D5\u05D1\u05E8\u05E9"]},{id:"aged-brass",name:"Dark brushed brass",heName:"\u05E4\u05DC\u05D9\u05D6 \u05DB\u05D4\u05D4 / \u05DE\u05D9\u05D5\u05E9\u05DF",color:"#93734a",surface:"metal",aliases:["aged brass","antique brass","dark brass","\u05E4\u05DC\u05D9\u05D6 \u05DE\u05D9\u05D5\u05E9\u05DF","\u05E4\u05DC\u05D9\u05D6 \u05DB\u05D4\u05D4"]},{id:"brushed-bronze",name:"Brushed bronze",heName:"\u05D1\u05E8\u05D5\u05E0\u05D6\u05D4 \u05DE\u05D5\u05D1\u05E8\u05E9\u05EA",color:"#8d724e",surface:"metal",aliases:["brushed bronze","bronze","dark bronze","\u05D1\u05E8\u05D5\u05E0\u05D6\u05D4 \u05DE\u05D5\u05D1\u05E8\u05E9\u05EA","\u05D1\u05E8\u05D5\u05E0\u05D6\u05D4"]},{id:"champagne",name:"Champagne metal",heName:"\u05E9\u05DE\u05E4\u05E0\u05D9\u05D4 \u05DE\u05D5\u05D1\u05E8\u05E9\u05EA",color:"#cbb799",surface:"metal",aliases:["champagne","champagne metal","\u05E9\u05DE\u05E4\u05E0\u05D9\u05D4"]},{id:"satin-nickel",name:"Satin nickel",heName:"\u05E0\u05D9\u05E7\u05DC \u05E1\u05D0\u05D8\u05DF",color:"#b8bdbe",surface:"metal",aliases:["satin nickel","brushed nickel","nickel","\u05E0\u05D9\u05E7\u05DC \u05E1\u05D0\u05D8\u05DF","\u05E0\u05D9\u05E7\u05DC"]},{id:"chrome",name:"Polished chrome",heName:"\u05DB\u05E8\u05D5\u05DD \u05DE\u05D1\u05E8\u05D9\u05E7",color:"#cfd4d6",surface:"metal",aliases:["chrome","polished chrome","\u05DB\u05E8\u05D5\u05DD"]},{id:"stainless",name:"Brushed stainless",heName:"\u05E0\u05D9\u05E8\u05D5\u05E1\u05D8\u05D4 \u05DE\u05D5\u05D1\u05E8\u05E9\u05EA",color:"#b5b9bc",surface:"metal",aliases:["stainless","stainless steel","inox","steel","\u05E0\u05D9\u05E8\u05D5\u05E1\u05D8\u05D4","\u05E4\u05DC\u05D3\u05D4"]},{id:"copper",name:"Brushed copper",heName:"\u05E0\u05D7\u05D5\u05E9\u05EA \u05DE\u05D5\u05D1\u05E8\u05E9\u05EA",color:"#b87352",surface:"metal",aliases:["copper","rose gold","\u05E0\u05D7\u05D5\u05E9\u05EA"]},{id:"black-metal",name:"Matte black steel",heName:"\u05D1\u05E8\u05D6\u05DC \u05E9\u05D7\u05D5\u05E8 \u05DE\u05D8",color:"#282a2c",surface:"metal",aliases:["black steel","black metal","black iron","powder coated black","\u05D1\u05E8\u05D6\u05DC \u05E9\u05D7\u05D5\u05E8","\u05DE\u05EA\u05DB\u05EA \u05E9\u05D7\u05D5\u05E8\u05D4"]},{id:"aluminum",name:"Anodized aluminum",heName:"\u05D0\u05DC\u05D5\u05DE\u05D9\u05E0\u05D9\u05D5\u05DD \u05D8\u05D1\u05E2\u05D9",color:"#a5abb0",surface:"metal",aliases:["aluminum","aluminium","anodized","\u05D0\u05DC\u05D5\u05DE\u05D9\u05E0\u05D9\u05D5\u05DD"]},{id:"mirror",name:"Mirror glass",heName:"\u05DE\u05E8\u05D0\u05D4",color:"#dfe4e5",surface:"metal",aliases:["mirror","mirrored","\u05DE\u05E8\u05D0\u05D4","\u05D6\u05DB\u05D5\u05DB\u05D9\u05EA \u05DE\u05E8\u05D0\u05D4"]},{id:"linen",name:"Woven linen",heName:"\u05E4\u05E9\u05EA\u05DF \u05D8\u05D1\u05E2\u05D9",color:"#c9bfa9",surface:"fabric",aliases:["linen","flax","\u05E4\u05E9\u05EA\u05DF","\u05D0\u05E8\u05D9\u05D2 \u05E4\u05E9\u05EA\u05DF"]},{id:"egger-f416",name:"Fabric effect linen",heName:"\u05D0\u05E4\u05E7\u05D8 \u05D1\u05D3 \u05E4\u05E9\u05EA\u05DF",color:"#b8a992",surface:"fabric",aliases:["f416","egger f416","fabric effect","\u05E4\u05E9\u05EA\u05DF \u05D2\u05D5\u05E3"]},{id:"boucle",name:"Cream boucle",heName:"\u05D1\u05D3 \u05D1\u05D5\u05E7\u05DC\u05D4",color:"#ebe5da",surface:"fabric",aliases:["boucle","boucl\xE9","\u05D1\u05D5\u05E7\u05DC\u05D4","\u05D1\u05D3 \u05D1\u05D5\u05E7\u05DC\u05D4"]},{id:"velvet",name:"Soft velvet",heName:"\u05E7\u05D8\u05D9\u05E4\u05D4",color:"#687370",surface:"fabric",aliases:["velvet","\u05E7\u05D8\u05D9\u05E4\u05D4"]},{id:"cotton",name:"Woven cotton",heName:"\u05DB\u05D5\u05EA\u05E0\u05D4 \u05D0\u05E8\u05D5\u05D2\u05D4",color:"#d8d1c5",surface:"fabric",aliases:["cotton","canvas","upholstery","\u05D1\u05D3","\u05DB\u05D5\u05EA\u05E0\u05D4","\u05E8\u05D9\u05E4\u05D5\u05D3"]},{id:"wool",name:"Wool felt",heName:"\u05DC\u05D1\u05D3 \u05E6\u05DE\u05E8",color:"#8c8982",surface:"fabric",aliases:["wool","felt","\u05E6\u05DE\u05E8","\u05DC\u05D1\u05D3"]},{id:"leather",name:"Espresso leather",heName:"\u05E2\u05D5\u05E8 \u05D7\u05D5\u05DD \u05DB\u05D4\u05D4",color:"#6e4730",surface:"fabric",aliases:["leather","saddle leather","\u05E2\u05D5\u05E8","\u05E2\u05D5\u05E8 \u05D7\u05D5\u05DD"]},{id:"cognac",name:"Cognac leather",heName:"\u05E2\u05D5\u05E8 \u05E7\u05D5\u05E0\u05D9\u05D0\u05E7",color:"#9e5b34",surface:"fabric",aliases:["cognac","tan leather","\u05E7\u05D5\u05E0\u05D9\u05D0\u05E7","\u05E2\u05D5\u05E8 \u05E7\u05D5\u05E0\u05D9\u05D0\u05E7"]},{id:"suede",name:"Soft suede",heName:"\u05D6\u05DE\u05E9",color:"#9e846c",surface:"fabric",aliases:["suede","nubuck","\u05D6\u05DE\u05E9","\u05E0\u05D5\u05D1\u05D5\u05E7"]},{id:"rattan",name:"Woven rattan",heName:"\u05E8\u05D0\u05D8\u05DF \u05E7\u05DC\u05D5\u05E2",color:"#b59264",surface:"fabric",aliases:["rattan","wicker","\u05E8\u05D0\u05D8\u05DF","\u05E7\u05E9 \u05E7\u05DC\u05D5\u05E2"]},{id:"cane",name:"Vienna cane",heName:"\u05E7\u05E9 \u05D5\u05D9\u05E0\u05D0\u05D9",color:"#c8a878",surface:"fabric",aliases:["cane","viennese cane","\u05E7\u05E9 \u05D5\u05D9\u05E0\u05D0\u05D9","\u05E7\u05E9"]}],hb=[{re:/\b(?:white|snow|chalk|alabaster)\b|לבן/i,color:"#f1ede4"},{re:/\b(?:cream|ivory|vanilla|off-white)\b|שמנת/i,color:"#f4efe6"},{re:/\b(?:beige|sand|oat|wheat|linen|tan)\b|בז|חול/i,color:"#d8cbb5"},{re:/\b(?:brown|chocolate|espresso|cocoa|coffee|walnut)\b|חום/i,color:"#6f513d"},{re:/\b(?:grey|gray|silver|ash|pebble)\b|אפור|כסף/i,color:"#8b8f91"},{re:/\b(?:charcoal|graphite|anthracite)\b|פחם|גרפיט/i,color:"#424547"},{re:/\b(?:black|onyx|ebony)\b|שחור/i,color:"#242628"},{re:/\b(?:green|sage|moss|olive|forest)\b|ירוק/i,color:"#6e7e6b"},{re:/\b(?:blue|navy|indigo|teal|petrol)\b|כחול|תכלת|טורקיז/i,color:"#394f68"},{re:/\b(?:red|burgundy|wine|rust|terracotta)\b|אדום|בורדו|חמרה/i,color:"#9c4b3c"},{re:/\b(?:yellow|ochre|mustard|gold)\b|צהוב|חרדל|זהב/i,color:"#c49b4f"}],ub=[{key:"front",pattern:/fronts?|doors?|drawer|חזית|חזיתות|דלת|דלתות|מגיר/i},{key:"case",pattern:/case|body|carcass|frame|shell|גוף|שלד|ארגז|מסגרת/i},{key:"hardware",pattern:/hardware|handles?|pulls?|knobs?|hinges?|rails?|פרזול|ידיות|ידית|צירים|מתלה/i},{key:"top",pattern:/top|counter|countertop|surface|basin|sink|משטח|פלטה|שיש|כיור/i},{key:"base",pattern:/base|plinth|legs?|feet|רגל|רגליים|בסיס|צוקל/i}];function db(i,e){if(!e?.length||!i)return null;let t=i.trim().toLowerCase();if(!t)return null;for(let n of e)if(n.id.toLowerCase()===t||n.label&&n.label.toLowerCase()===t)return n.id;for(let n of e)if(n.label&&n.label.toLowerCase().includes(t)||t.includes(n.id.toLowerCase()))return n.id;for(let n of ub){if(!n.pattern.test(t))continue;let s=e.find(r=>n.pattern.test(`${r.id} ${r.label||""}`));if(s)return s.id}return null}function fb(i){let e=/^#([\da-f])([\da-f])([\da-f])$/i.exec(i.trim());if(e)return`#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`.toLowerCase();let t=/^#([\da-f]{6})$/i.exec(i.trim());return t?`#${t[1].toLowerCase()}`:null}var pb=i=>i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),pm=`(?:^|[\\s,.;:/\\-()"'\u05F3\u05F4])`,mm=`(?=$|[\\s,.;:/\\-()"'\u05F3\u05F4])`;function sh(i,e){return new RegExp(`${pm}(?:${e})${mm}`,"i").test(i)}function mb(i){return sh(i,"wood|veneer|timber|oak|walnut|ash|beech|teak|maple|birch|pine|wenge|[\u05D4\u05DE\u05D1]?(?:\u05E2\u05E5|\u05E4\u05D5\u05E8\u05E0\u05D9\u05E8|\u05D0\u05DC\u05D5\u05DF|\u05D0\u05D2\u05D5\u05D6|\u05DC\u05D9\u05D1\u05E0\u05D4|\u05DE\u05D9\u05D9\u05E4\u05DC|\u05D0\u05D5\u05E8\u05DF|\u05D8\u05D9\u05E7|\u05D5\u05D5\u05E0\u05D2\u05D4)|\u05D1\u05D5\u05E7")?"wood":sh(i,"metal|brass|bronze|steel|chrome|nickel|iron|copper|alumin(?:um|ium)|inox|mirror|[\u05D4\u05DE\u05D1]?(?:\u05DE\u05EA\u05DB\u05EA|\u05E4\u05DC\u05D9\u05D6|\u05D1\u05E8\u05D5\u05E0\u05D6\u05D4|\u05D1\u05E8\u05D6\u05DC|\u05E0\u05D9\u05E8\u05D5\u05E1\u05D8\u05D4|\u05DB\u05E8\u05D5\u05DD|\u05E0\u05D9\u05E7\u05DC|\u05E0\u05D7\u05D5\u05E9\u05EA|\u05D0\u05DC\u05D5\u05DE\u05D9\u05E0\u05D9\u05D5\u05DD|\u05DE\u05E8\u05D0\u05D4)")?"metal":sh(i,"fabric|textile|cloth|boucl[e\xE9]|linen|velvet|leather|suede|cotton|wool|felt|rattan|cane|upholstery|[\u05D4\u05DE\u05D1]?(?:\u05E8\u05D9\u05E4\u05D5\u05D3|\u05D0\u05E8\u05D9\u05D2|\u05E4\u05E9\u05EA\u05DF|\u05D1\u05D5\u05E7\u05DC\u05D4|\u05E7\u05D8\u05D9\u05E4\u05D4|\u05E2\u05D5\u05E8|\u05D6\u05DE\u05E9|\u05E8\u05D0\u05D8\u05DF)|\u05D1\u05D3|\u05E7\u05E9")?"fabric":sh(i,"paint|lacquer|matte|satin|laminate|melamine|formica|stone|marble|travertine|dekton|porcelain|concrete|terrazzo|[\u05D4\u05DE\u05D1]?(?:\u05E6\u05D1\u05E2|\u05DC\u05DB\u05D4|\u05E4\u05D5\u05E8\u05DE\u05D9\u05D9\u05E7\u05D4|\u05DE\u05DC\u05DE\u05D9\u05DF|\u05E9\u05D9\u05E9|\u05D0\u05D1\u05DF|\u05D1\u05D8\u05D5\u05DF)|\u05DC\u05E7|\u05DE\u05D8")?"paint":null}function gb(i){let e=null,t=0;for(let n of fm)for(let s of n.aliases)new RegExp(`${pm}${pb(s)}${mm}`,"i").test(i)&&s.length>t&&(e=n,t=s.length);return e}function gm(i,{existingSlots:e=[]}={}){if(typeof i!="string"||!i.trim())return[];let t=[],n=new Set,s=i.split(/[\r\n;]+/);for(let r of s){let o=r.replace(/^\s*[-*•\d.)]+\s*/,"").trim();if(!o)continue;let a=null,l=o.indexOf(":");if(l>0&&l<48&&!/^https?$/i.test(o.slice(0,l))){let h=o.slice(0,l).trim(),u=db(h,e);u&&(a=u,o=o.slice(l+1).trim())}let c=o.split(/[,،]+/);for(let h of c){let u=h.trim();if(!u)continue;let f=/#(?:[\da-f]{6}|[\da-f]{3})\b/i.exec(u),d=f?fb(f[0]):null,m=mb(u),_=gb(u),p=hb.find(w=>w.re.test(u))?.color??null;if(!_&&!d&&!p&&!m)continue;let x=m||_?.surface||"paint",y=d||_?.color||p||"#b8b2a6",M=u.replace(/#(?:[\da-f]{6}|[\da-f]{3})\b/gi,"").replace(/\s+/g," ").replace(/^[\s\-–·]+|[\s\-–·]+$/g,"").trim();M||(M=_?.name||y.toUpperCase()),M.length>120&&(M=M.slice(0,120).trim());let v=`${a??""}|${M.toLowerCase()}|${y}`;n.has(v)||(n.add(v),t.push({name:M,color:y,surface:x,slotId:a}))}}return t}function xb(i){let e=parseInt(i.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function _b(i,e,t){return`#${[i,e,t].map(n=>dm(Math.round(n),0,255).toString(16).padStart(2,"0")).join("")}`}function um(i,e){let t=(i[0]+e[0])*.5,n=i[0]-e[0],s=i[1]-e[1],r=i[2]-e[2];return Math.sqrt((2+t/256)*n*n+4*s*s+(2+(255-t)/256)*r*r)/1.732}function Md(i,e,t,{maxColors:n=6,surface:s="paint",lang:r="en"}={}){if(!i||!e||!t)return[];let o=dm(Math.round(n),1,12),a=cb.has(s)?s:"paint",l=e*t,c=Math.max(1,Math.floor(Math.sqrt(l/3600))),h=[],u=[];for(let w=0;w<t;w+=c)for(let S=0;S<e;S+=c){let g=(w*e+S)*4;if(i[g+3]<160)continue;let L=i[g],I=i[g+1],P=i[g+2],T=.2126*L+.7152*I+.0722*P,D=Math.max(L,I,P),A=Math.min(L,I,P),N=D?(D-A)/D:0;T>246&&N<.06||(T<26&&N<.08?u.push([L,I,P]):h.push([L,I,P]))}let f=h.length>=Math.max(12,Math.floor(u.length*.35))?h:[...h,...u];if(!f.length)return[];let d=Math.min(o,f.length),m=[f[0].slice()];for(;m.length<d;){let w=f[0],S=-1;for(let g of f){let b=1/0;for(let L of m){let I=g[0]-L[0],P=g[1]-L[1],T=g[2]-L[2],D=I*I+P*P+T*T;D<b&&(b=D)}b>S&&(S=b,w=g)}if(S<1)break;m.push(w.slice())}let _=new Int32Array(f.length),p=m.length;for(let w=0;w<12;w++){let S=new Float64Array(p),g=new Float64Array(p),b=new Float64Array(p),L=new Int32Array(p);for(let I=0;I<f.length;I++){let P=f[I],T=0,D=1/0;for(let A=0;A<p;A++){let N=m[A],z=P[0]-N[0],O=P[1]-N[1],$=P[2]-N[2],B=z*z+O*O+$*$;B<D&&(D=B,T=A)}_[I]=T,S[T]+=P[0],g[T]+=P[1],b[T]+=P[2],L[T]++}for(let I=0;I<p;I++)L[I]>0&&(m[I][0]=S[I]/L[I],m[I][1]=g[I]/L[I],m[I][2]=b[I]/L[I])}let x=new Int32Array(p);for(let w=0;w<f.length;w++)x[_[w]]++;let y=m.map((w,S)=>({rgb:w,count:x[S]})).filter(w=>w.count>0).sort((w,S)=>S.count-w.count),M=[];for(let w of y){let S=M.find(g=>um(g.rgb,w.rgb)<20);S?S.count+=w.count:M.push({rgb:w.rgb.slice(),count:w.count})}let v=new Set;return M.slice(0,o).map((w,S)=>{let g=_b(w.rgb[0],w.rgb[1],w.rgb[2]),b=null,L=42;for(let T of fm){let D=um(w.rgb,xb(T.color));D<L&&(L=D,b=T)}let I=b?r==="he"?b.heName:b.name:r==="he"?`\u05D2\u05D5\u05D5\u05DF \u05E1\u05E7\u05D9\u05E6\u05D4 ${S+1}`:`Sketch swatch ${S+1}`,P=I;return v.has(P.toLowerCase())&&(P=`${I} (${g.toUpperCase()})`),v.add(P.toLowerCase()),{name:P,color:g,surface:a,slotId:null,coverage:Math.round(w.count/f.length*1e3)/1e3}})}var we=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!=null&&(n.textContent=t),n};function Ds(i,e,t,n,s){let r=we("details","section"),o=we("div","section-body");return r.dataset.section=e,r.open=s?s.has(e):n,r.append(we("summary",null,t),o),i.append(r),{details:r,body:o}}function wd(i,e,t,n,s){let r=we("label","field"),o=we("select");for(let[a,l]of t)o.add(new Option(l,a));return o.value=n,o.addEventListener("change",()=>s(o.value)),r.append(we("span","field-title",e),o),i.append(r),o}function xm(i,e,t,n){let s=we("label","check-row"),r=we("input");return r.type="checkbox",r.checked=t,r.addEventListener("change",()=>n(r.checked)),s.append(r,we("span",null,e)),i.append(s),r}function _m(i,e,t,n){let s=we("label","color-field"),r=we("input"),o=we("span","color-code",t.toUpperCase());return r.type="color",r.value=t,r.addEventListener("input",()=>{o.textContent=r.value.toUpperCase(),n(r.value)}),s.append(we("span","field-title",e),o,r),i.append(s),a=>{r.value=a,o.textContent=a.toUpperCase()}}function rh(i,e,t,n,s,r,o,a,l=null){let c=we("div","measure"),h=we("label","measure-entry"),u=we("input"),f=we("span","suffix",t);u.type="number",u.step="1",u.min=String(s),u.max=String(r),u.required=!0,u.value=String(n);let d=we("span","field-title",e);h.append(d,u,f),l&&h.append(l),c.append(h);let m;if(s===r)u.readOnly=!0,c.append(we("small","muted",a.t("fixedByDesign"))),m=_=>{n=_,u.value=String(_)};else{let _=we("input","range");_.type="range",_.min=String(s),_.max=String(r),_.step="1",_.value=String(n),_.setAttribute("aria-label",`${e} (${t})`);let p=we("small","error");p.setAttribute("role","status"),p.hidden=!0;let x=()=>{n=u.valueAsNumber,_.value=String(n),p.hidden=!0,u.removeAttribute("aria-invalid"),o(n)};u.addEventListener("input",()=>{u.validity.valid?x():(u.setAttribute("aria-invalid","true"),p.textContent=a.t("invalidWholeNumber",{min:s,max:r,unit:t}),p.hidden=!1)}),u.addEventListener("blur",()=>{u.validity.valid||(u.value=String(n),u.removeAttribute("aria-invalid"),p.hidden=!0)}),_.addEventListener("input",()=>{u.value=_.value,x()});let y=we("div","range-limits");y.append(we("span",null,`${s} ${t}`),we("span",null,`${r} ${t}`)),c.append(_,y,p),m=M=>{n=M,u.value=String(M),_.value=String(M),u.removeAttribute("aria-invalid"),p.hidden=!0}}return i.append(c),{group:c,setVal:m}}var Td={wood:"surfaceWood",fabric:"surfaceFabric",metal:"surfaceMetal",paint:"surfacePaint"};function ym(i,e,t,n,s,r,o=null,a=null,l=null){i.replaceChildren(),e.replaceChildren();let c=[],h=[],u=o?.openSections??null,f=()=>t.parts.filter(T=>T.when.every(D=>n.options[D.option]===D.choice)),d=(T="immediate")=>{let D=f();for(let A of c)A(D);s(T)},m=null,_=o?.selectedSlot&&t.slots.some(T=>T.id===o.selectedSlot)?o.selectedSlot:t.slots[0]?.id??null;if(t.slots.length){let J=function(Be){A.disabled=!Be.some(F=>F.slot===z.id),N.hidden=!A.disabled,N.textContent=r.t("finishHiddenHint")},ue=function(){let Be=n.finishes[z.id];$.forEach((ot,Ue)=>{ot.checked=Be.index===Ue});let F=Be.tint??z.finishes[Be.index].color;B?.(F),V&&(V.disabled=Be.tint===null)},xe=function(){A.replaceChildren(),$=[];let Be=n.finishes[z.id];A.append(we("legend","field-title",r.t("finishPalette")));let F=we("div","swatches");A.append(F),z.finishes.forEach((ot,Ue)=>{let Ze=we("label","swatch"),_e=we("input"),st=we("span","sample"),Ne=we("span","sample-label");_e.type="radio",_e.name="finish",_e.value=String(Ue),_e.checked=Be.index===Ue,st.style.setProperty("--sample",ot.color),st.dataset.surface=ot.surface,st.setAttribute("aria-hidden","true"),Ne.append(we("strong",null,r.term(ot.name)),we("small",null,r.t(Td[ot.surface]||ot.surface))),_e.addEventListener("change",()=>{_e.checked&&(Be.index=Ue,Be.tint=null,ue(),s("immediate"))}),Ze.append(_e,st,Ne),F.append(Ze),$.push(_e)}),B=_m(A,r.t("customTint"),Be.tint??z.finishes[Be.index].color,ot=>{Be.tint=ot,V.disabled=!1,s("immediate")}),V=we("button","text-button",r.t("usePresetColor")),V.type="button",V.addEventListener("click",()=>{Be.tint=null,ue(),s("immediate")}),A.append(V),ue()},At=function(Be){let F=Be.slotId&&t.slots.find(Ue=>Ue.id===Be.slotId)||z,ot=F.finishes.findIndex(Ue=>Ue.color.toLowerCase()===Be.color.toLowerCase()&&Ue.surface===Be.surface||Ue.name.toLowerCase()===Be.name.toLowerCase());ot<0&&(F.finishes.length>=64&&F.finishes.pop(),F.finishes.push({name:Be.name,color:Be.color,surface:Be.surface}),ot=F.finishes.length-1),F.id!==z.id&&(z=F,_=F.id,O.value=F.id),n.finishes[F.id]={index:ot,tint:null},xe(),J(f()),s("immediate"),ht.textContent=r.t("matAddedToSlot",{name:Be.name}),ht.hidden=!1,a?.onMaterialNotice?.(Be.name,r.term(F.label))},Ft=function(Be){if(Ht.replaceChildren(),!Be.length){Et.hidden=!0,ht.textContent=r.t("matEmptyResult"),ht.hidden=!1;return}Et.hidden=!1,ht.hidden=!0;for(let F of Be){let ot=we("button","mat-chip");ot.type="button";let Ue=we("span","mat-chip-dot");Ue.style.backgroundColor=F.color;let Ze=r.t(Td[F.surface]||F.surface);ot.append(Ue,we("span",null,`${F.name} (${Ze})`)),ot.addEventListener("click",()=>At(F)),Ht.append(ot)}},{details:T,body:D}=Ds(i,"finishes",r.t("finishes"),!0,u),A=we("fieldset","unboxed"),N=we("p","hint"),z=t.slots.find(Be=>Be.id===_)||t.slots[0],O=wd(D,r.t("applyFinishTo"),t.slots.map(Be=>[Be.id,r.term(Be.label)]),z.id,Be=>{z=t.slots.find(F=>F.id===Be),_=z.id,xe(),J(f())});D.append(A,N);let $=[],B=null,V=null;xe(),c.push(J),h.push(ue);let te=we("details","mat-import"),pe=we("summary",null,r.t("matImportTitle")),ge=we("div","mat-import-body");te.append(pe,ge),ge.append(we("p","hint",r.t("matImportHint")));let De=we("label","field");De.append(we("span","field-title",r.t("matTextLabel")));let ye=we("textarea","mat-text-input");ye.rows=2,ye.placeholder=r.t("matTextPlaceholder"),De.append(ye);let Ge=we("label","field");Ge.append(we("span","field-title",r.t("matSurfaceLabel")));let gt=we("select");for(let Be of["paint","wood","metal","fabric"])gt.add(new Option(r.t(Td[Be]),Be));let qe=we("div","mat-import-row"),tt=we("button","chip-button",r.t("matParseBtn"));tt.type="button";let ct=we("button","chip-button",r.t("matSketchBtn"));ct.type="button";let je=we("input");je.type="file",je.accept="image/png,image/jpeg,image/webp",je.hidden=!0,qe.append(tt,ct,je);let ke=we("canvas","mat-import-canvas");ke.hidden=!0;let nt=we("p","hint",r.t("matSketchHint"));nt.hidden=!0;let Et=we("span","field-title",r.t("matDetectedLabel"));Et.hidden=!0;let ht=we("p","hint mat-import-status");ht.hidden=!0;let Ht=we("div","mat-candidates"),at=null;tt.addEventListener("click",()=>{let Be=gm(ye.value,{existingSlots:t.slots});Ft(Be)}),ct.addEventListener("click",()=>je.click()),je.addEventListener("change",Be=>{let F=Be.target.files?.[0];if(je.value="",!F)return;let ot=URL.createObjectURL(F),Ue=new Image;Ue.onload=()=>{try{let _e=Math.min(1,360/Math.max(Ue.naturalWidth||1,Ue.naturalHeight||1)),st=Math.max(1,Math.round(Ue.naturalWidth*_e)),Ne=Math.max(1,Math.round(Ue.naturalHeight*_e));ke.width=st,ke.height=Ne;let Ye=ke.getContext("2d");Ye.drawImage(Ue,0,0,st,Ne);let U=Ye.getImageData(0,0,st,Ne);at={rgba:U.data,width:st,height:Ne},ke.hidden=!1,nt.hidden=!1,Ft(Md(U.data,st,Ne,{maxColors:6,surface:gt.value,lang:r.lang}))}catch{ht.textContent=r.t("matSketchError"),ht.hidden=!1}finally{URL.revokeObjectURL(ot)}},Ue.onerror=()=>{URL.revokeObjectURL(ot),ht.textContent=r.t("matSketchError"),ht.hidden=!1},Ue.src=ot}),gt.addEventListener("change",()=>{at&&Ft(Md(at.rgba,at.width,at.height,{maxColors:6,surface:gt.value,lang:r.lang}))}),ke.addEventListener("click",Be=>{if(!at)return;let F=ke.getBoundingClientRect();if(!F.width||!F.height)return;let ot=Math.min(ke.width-1,Math.max(0,Math.floor((Be.clientX-F.left)/F.width*ke.width))),Ze=(Math.min(ke.height-1,Math.max(0,Math.floor((Be.clientY-F.top)/F.height*ke.height)))*ke.width+ot)*4,_e=`#${[at.rgba[Ze],at.rgba[Ze+1],at.rgba[Ze+2]].map(st=>st.toString(16).padStart(2,"0")).join("")}`;At({name:_e.toUpperCase(),color:_e,surface:gt.value,slotId:null})}),Ge.append(gt),ge.append(De,Ge,qe,ke,nt,Et,ht,Ht),D.append(te),m={focusSlot(Be){let F=t.slots.find(ot=>ot.id===Be);F&&(document.getElementById("furniture-tab")?.click(),T.open=!0,z=F,_=F.id,O.value=Be,xe(),J(f()),O.focus())}}}let{body:p}=Ds(i,"dimensions",r.t("dimensions"),!1,u);p.append(we("p","hint",r.t("dimensionsHint")));let x={width:r.t("axisWidth"),height:r.t("axisHeight"),depth:r.t("axisDepth")};for(let T of Fs){let D=t.dimensions[T],A=rh(p,x[T],r.mmUnit,n.dimensions[T],D.min,D.max,N=>{n.dimensions[T]=N,s("immediate")},r);h.push(()=>A.setVal(n.dimensions[T]))}let y=xm(p,r.t("showGuides"),n.showDimensions,T=>{n.showDimensions=T,s("immediate")});if(h.push(()=>{y.checked=n.showDimensions}),t.options.length){let{body:T}=Ds(i,"construction",r.t("construction"),!1,u);for(let D of t.options){let A=wd(T,r.term(D.label),D.choices.map(N=>[N,r.term(N)]),n.options[D.id],N=>{n.options[D.id]=N,d("immediate")});h.push(()=>{A.value=n.options[D.id]})}}if(t.joints.length){let{body:T}=Ds(i,"joints",r.t("doorsAndMovement"),!0,u);if(t.joints.length>=2){let D=we("div","joint-bulk"),A=we("button","chip-button",r.t("openAll"));A.type="button";let N=we("button","chip-button",r.t("closeAll"));N.type="button",A.addEventListener("click",()=>{for(let z of t.joints)n.joints[z.id]=1;P(),s("animate")}),N.addEventListener("click",()=>{for(let z of t.joints)n.joints[z.id]=0;P(),s("animate")}),D.append(A,N),T.append(D)}for(let D of t.joints){let A=we("fieldset","unboxed"),N=we("small","hint",r.t("notVisibleHint")),z=r.term(D.label);A.append(we("legend","sr-only",z));let O=we("button","joint-toggle");O.type="button";let $=J=>{let ue=J>2;O.textContent=ue?r.t("close"):r.t("open"),O.setAttribute("aria-label",r.t(ue?"closeActionLabel":"openActionLabel",{label:z}))},B=Math.round(n.joints[D.id]*100);$(B);let V=rh(A,z,"%",B,0,100,J=>{n.joints[D.id]=J/100,$(J),s("immediate")},r,O);O.addEventListener("click",()=>{let J=n.joints[D.id]>.02?0:1;n.joints[D.id]=J;let ue=Math.round(J*100);V.setVal(ue),$(ue),s("animate")}),T.append(A,N),c.push(J=>{A.disabled=!J.some(ue=>ue.joint===D.id)&&!(n.inscription&&t.inscription?.joint===D.id),N.hidden=!A.disabled}),h.push(()=>{let J=Math.round(n.joints[D.id]*100);V.setVal(J),$(J)})}}if(t.switches?.length){let{body:T}=Ds(i,"switches",r.t("switchesAndLighting"),!0,u);for(let D of t.switches){let A=we("fieldset","unboxed switch-group"),N=we("small","hint",r.t("notVisibleHint")),z=r.term(D.label);A.append(we("legend","sr-only",z));let O=we("div","switch-row"),$=`sw-lbl-${D.id}`,B=we("span","field-title",z);B.id=$;let V=we("button","switch-btn");V.type="button",V.setAttribute("role","switch"),V.setAttribute("aria-labelledby",$);let J=we("span","switch-track");J.setAttribute("aria-hidden","true");let ue=we("span","switch-state");V.append(J,ue);let xe=()=>{let pe=!!n.switches[D.id];V.setAttribute("aria-checked",String(pe)),ue.textContent=pe?r.t("switchOn"):r.t("switchOff")};xe(),V.addEventListener("click",()=>{n.switches[D.id]=!n.switches[D.id],xe(),s("animate")}),O.append(B,V),A.append(O),T.append(A,N);let te=new Set([...D.parts,...D.light?.emissiveParts??[]]);c.push(pe=>{A.disabled=!pe.some(ge=>te.has(ge.def?.id??ge.id)),N.hidden=!A.disabled}),h.push(xe)}if(a&&t.switches.some(D=>!!D.light)){let D=we("div","kelvin-row");D.append(we("span","field-title",r.t("ledTempLabel")));let A=we("div","kelvin-chips");A.setAttribute("role","group"),A.setAttribute("aria-label",r.t("ledTempLabel"));let z=[["2700",r.t("ledTemp2700")],["3500",r.t("ledTemp3500")],["4500",r.t("ledTemp4500")]].map(([$,B])=>{let V=we("button","chip-button",B);return V.type="button",V.dataset.kelvin=$,V.addEventListener("click",()=>{a.onLedTemp?.($),O()}),A.append(V),V}),O=()=>{let $=String(a.getLedTemp?.()??"3500");for(let B of z)B.setAttribute("aria-pressed",String(B.dataset.kelvin===$))};O(),D.append(A),T.append(D),h.push(O)}}if(t.inscription){let{body:T}=Ds(i,"inscription",r.t("personalization"),!1,u),D=we("label","field"),A=we("input");A.type="text",A.maxLength=32,A.value=n.inscription,A.placeholder=r.t("nameplatePlaceholder"),D.append(we("span","field-title",r.t("nameplateText")),A),T.append(D,we("p","hint",r.t("nameplateHint"))),A.addEventListener("input",()=>{n.inscription=A.value,d("immediate")}),h.push(()=>{A.value=n.inscription})}let M=we("div","figure-intro");e.append(M),M.append(we("h3",null,r.t("humanScale")),we("p","hint",r.t("humanScaleHint")));let v=n.person,w=xm(M,r.t("showPerson"),v.visible,T=>{v.visible=T,!T&&l?.isRunning?.()&&l.onStop?.(),d("immediate")});if(h.push(()=>{w.checked=v.visible}),l){let T=we("div","person-auto-card"),D=we("strong","person-auto-title",r.t("personAutoTitle")),A=we("p","hint",r.t("personAutoHint")),N=we("div","person-auto-actions"),z=we("button","chip-button",r.t("personRun"));z.id="person-panel-run",z.type="button",z.title=r.t("personRunTitle");let O=we("button","chip-button",r.t("personStop"));O.id="person-panel-stop",O.type="button",O.title=r.t("personStopTitle");let $=we("p","person-auto-status");$.setAttribute("aria-live","polite");let B=()=>{let V=!!l.isRunning?.();z.disabled=V,O.disabled=!V,z.setAttribute("aria-pressed",String(V)),$.textContent=l.getStatusText?.()||r.t("personAutoIdle")};z.addEventListener("click",()=>{l.onRun?.(),B()}),O.addEventListener("click",()=>{l.onStop?.(),B()}),N.append(z,O),T.append(D,A,N,$),M.append(T),h.push(B),B()}let S=we("fieldset","unboxed figure-settings");S.append(we("legend","sr-only",r.t("personSettingsLegend"))),e.append(S);let{body:g}=Ds(S,"person-pose",r.t("sizeAndPose"),!0,u),b=rh(g,r.t("standingStature"),r.mmUnit,v.height,900,2200,T=>{v.height=T,s("immediate")},r);h.push(()=>b.setVal(v.height));for(let[T,D,A]of[["build",r.t("build"),[["slim",r.t("buildSlim")],["regular",r.t("buildRegular")],["broad",r.t("buildBroad")]]],["pose",r.t("pose"),[["standing",r.t("poseStanding")],["seated",r.t("poseSeated")]]],["side",r.t("placement"),[["left",r.t("sideLeft")],["right",r.t("sideRight")]]]]){let N=wd(g,D,A,v[T],z=>{v[T]=z,s("immediate")});h.push(()=>{N.value=v[T]})}let L=rh(g,r.t("facingAngle"),"\xB0",v.yaw,-180,180,T=>{v.yaw=T,s("immediate")},r);h.push(()=>L.setVal(v.yaw));let{body:I}=Ds(S,"person-colors",r.t("figureColors"),!1,u);for(let[T,D]of[["skin",r.t("skinTone")],["top",r.t("topColor")],["bottom",r.t("trouserColor")]]){let A=_m(I,D,v[T],N=>{v[T]=N,s("immediate")});h.push(()=>A(v[T]))}c.push(()=>{S.disabled=!v.visible});function P(){let T=f();for(let D of h)D();for(let D of c)D(T)}for(let T of c)T(f());return{sync:P,focusSlot(T){m?.focusSlot(T)},getSelectedSlot:()=>_}}var vm={he:{brandName:"\u05DE\u05D7\u05E7\u05E8 \u05E6\u05D5\u05E8\u05D4",brandSubtitle:"\u05D4\u05D3\u05DE\u05D9\u05D4 \u05D5\u05D4\u05EA\u05D0\u05DE\u05EA \u05E8\u05D4\u05D9\u05D8\u05D9\u05DD",skip:"\u05D3\u05D9\u05DC\u05D5\u05D2 \u05DC\u05D4\u05EA\u05D0\u05DE\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA",langGroupLabel:"\u05E9\u05E4\u05EA \u05DE\u05DE\u05E9\u05E7",exportPng:"\u05D9\u05D9\u05E6\u05D5\u05D0 PNG",loadSetup:"\u05D8\u05E2\u05D9\u05E0\u05EA \u05D4\u05D2\u05D3\u05E8\u05D4",saveSetup:"\u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05D2\u05D3\u05E8\u05D4",objectStudy:"\u05E1\u05E7\u05D9\u05E8\u05EA \u05D3\u05D2\u05DD",offlineEdition:"\u05DE\u05D4\u05D3\u05D5\u05E8\u05D4 \u05DC\u05D0 \u05DE\u05E7\u05D5\u05D5\u05E0\u05EA",modelViewPlate:"FS / \u05EA\u05E6\u05D5\u05D2\u05EA \u05D3\u05D2\u05DD",preparing3d:"\u05DE\u05DB\u05D9\u05DF \u05D0\u05EA \u05EA\u05E6\u05D5\u05D2\u05EA \u05D4\u05EA\u05DC\u05EA\u05BE\u05DE\u05DE\u05D3\u2026",webglUnavailable:"\u05EA\u05E6\u05D5\u05D2\u05EA \u05D4\u05EA\u05DC\u05EA\u05BE\u05DE\u05DE\u05D3 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4. \u05D9\u05E9 \u05DC\u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1\u05D3\u05E4\u05D3\u05E4\u05DF \u05DE\u05D5\u05D3\u05E8\u05E0\u05D9 \u05D4\u05EA\u05D5\u05DE\u05DA \u05D1\u05BEWebGL 2 \u05E2\u05DD \u05D4\u05D0\u05E6\u05EA \u05D7\u05D5\u05DE\u05E8\u05D4. {message}",viewportControls:"\u05D1\u05E7\u05E8\u05D9 \u05EA\u05E6\u05D5\u05D2\u05D4",viewsAndLighting:"\u05D6\u05D5\u05D5\u05D9\u05D5\u05EA \u05D5\u05EA\u05D0\u05D5\u05E8\u05D4",cameraPreset:"\u05D6\u05D5\u05D5\u05D9\u05EA \u05DE\u05E6\u05DC\u05DE\u05D4",cameraViews:"\u05D6\u05D5\u05D5\u05D9\u05D5\u05EA \u05EA\u05E6\u05D5\u05D2\u05D4",viewStudio:"\u05EA\u05E6\u05D5\u05D2\u05EA \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5",viewFront:"\u05D7\u05D6\u05D9\u05EA",viewSide:"\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E6\u05D3",viewTop:"\u05DE\u05D1\u05D8 \u05E2\u05DC",viewBack:"\u05D2\u05D1",studioLighting:"\u05EA\u05D0\u05D5\u05E8\u05EA \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5",lightDaylight:"\u05D0\u05D5\u05E8 \u05D9\u05D5\u05DD",lightGallery:"\u05D2\u05DC\u05E8\u05D9\u05D4 \u05D7\u05DE\u05D4",lightCrisp:"\u05E0\u05D9\u05D8\u05E8\u05DC\u05D9 \u05D7\u05D3",lightEvening:"\u05E2\u05E8\u05D1 \u05D7\u05DE\u05D9\u05DD",backdropMode:"\u05E1\u05D1\u05D9\u05D1\u05EA \u05EA\u05E6\u05D5\u05D2\u05D4",backdropStudio:"\u05E1\u05D8\u05D5\u05D3\u05D9\u05D5",backdropRoom:"\u05D4\u05D3\u05DE\u05D9\u05D9\u05EA \u05D7\u05D3\u05E8",roomSettings:"\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05E7\u05D9\u05E8 \u05D5\u05E8\u05E6\u05E4\u05D4",roomWall:"\u05E6\u05D1\u05E2 \u05E7\u05D9\u05E8",roomWallCustom:"\u05D1\u05D7\u05D9\u05E8\u05EA \u05E6\u05D1\u05E2 \u05E7\u05D9\u05E8 \u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9\u05EA",roomFloor:"\u05E8\u05E6\u05E4\u05D4",wallPlaster:"\u05D8\u05D9\u05D7 \u05D7\u05DE\u05D9\u05DD",wallGallery:"\u05DC\u05D1\u05DF \u05D2\u05DC\u05E8\u05D9\u05D4",wallStone:"\u05D0\u05D1\u05DF \u05D1\u05D4\u05D9\u05E8\u05D4",wallSage:"\u05DE\u05E8\u05D5\u05D5\u05D4 \u05E2\u05D3\u05D9\u05DF",wallCharcoal:"\u05D2\u05E8\u05E4\u05D9\u05D8 \u05DB\u05D4\u05D4",floorOak:"\u05E4\u05E8\u05E7\u05D8 \u05D0\u05DC\u05D5\u05DF",floorStone:"\u05D0\u05D1\u05DF \u05D8\u05E8\u05D5\u05D5\u05E8\u05D8\u05D9\u05DF",floorConcrete:"\u05D1\u05D8\u05D5\u05DF \u05DE\u05D5\u05D7\u05DC\u05E7",xrayToggle:"\u05E8\u05E0\u05D8\u05D2\u05DF",xrayTitle:"\u05DE\u05E6\u05D1 \u05E8\u05E0\u05D8\u05D2\u05DF \u2014 \u05D4\u05E4\u05D9\u05DB\u05EA \u05D7\u05D6\u05D9\u05EA\u05D5\u05EA \u05DC\u05E9\u05E7\u05D5\u05E4\u05D5\u05EA \u05DC\u05D4\u05E6\u05D2\u05EA \u05D4\u05E4\u05E0\u05D9\u05DD",aoToggle:"\u05D4\u05E6\u05DC\u05DC\u05EA \u05E2\u05D5\u05DE\u05E7",aoTitle:"\u05D4\u05D3\u05D2\u05E9\u05EA \u05E2\u05D5\u05DE\u05E7 \u05D5\u05D7\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA (GTAO)",orthographic:"\u05D0\u05D5\u05E8\u05EA\u05D5\u05D2\u05E8\u05E4\u05D9",orthographicTitle:"\u05D4\u05D7\u05DC\u05E4\u05EA \u05D4\u05D9\u05D8\u05DC \u05E4\u05E8\u05E1\u05E4\u05E7\u05D8\u05D9\u05D1\u05D4 / \u05D0\u05D5\u05E8\u05EA\u05D5\u05D2\u05E8\u05E4\u05D9",orbit:"\u05E1\u05D9\u05D1\u05D5\u05D1",orbitLeft:"\u05E1\u05D9\u05D1\u05D5\u05D1 \u05E9\u05DE\u05D0\u05DC\u05D4",orbitRight:"\u05E1\u05D9\u05D1\u05D5\u05D1 \u05D9\u05DE\u05D9\u05E0\u05D4",orbitUp:"\u05E1\u05D9\u05D1\u05D5\u05D1 \u05DE\u05E2\u05DC\u05D4",orbitDown:"\u05E1\u05D9\u05D1\u05D5\u05D1 \u05DE\u05D8\u05D4",zoom:"\u05D6\u05D5\u05DD",zoomOut:"\u05D4\u05E8\u05D7\u05E7\u05D4",zoomIn:"\u05E7\u05D9\u05E8\u05D5\u05D1",pins:"\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA",pinsTitle:"\u05D4\u05E6\u05D2\u05EA \u05D0\u05D5 \u05D4\u05E1\u05EA\u05E8\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D0\u05D9\u05E0\u05D8\u05E8\u05D0\u05E7\u05E6\u05D9\u05D4 \u05E2\u05DC \u05D4\u05D3\u05D2\u05DD",quickPng:"PNG",quickPngTitle:"\u05D9\u05D9\u05E6\u05D5\u05D0 \u05DE\u05D4\u05D9\u05E8 \u05E9\u05DC \u05EA\u05DE\u05D5\u05E0\u05EA \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 (PNG)",enclosureLabel:"\u05DE\u05D9\u05D3\u05D5\u05EA \u05DE\u05E2\u05D8\u05E4\u05EA \xB7 \u05E8 \xD7 \u05E2 \xD7 \u05D2",scaleReference:"\u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4 \u05D0\u05E0\u05D5\u05E9\u05D9",notShown:"\u05DE\u05D5\u05E1\u05EA\u05E8",aboutStudy:"\u05D0\u05D5\u05D3\u05D5\u05EA \u05E1\u05E7\u05D9\u05E8\u05D4 \u05D6\u05D5",aboutBody:"\u05D6\u05D4\u05D5 \u05DE\u05D5\u05D3\u05DC \u05D7\u05D6\u05D5\u05EA\u05D9 \u05DC\u05D4\u05DE\u05D7\u05E9\u05D4 \u05D1\u05DC\u05D1\u05D3, \u05D5\u05D0\u05D9\u05E0\u05D5 \u05DE\u05D4\u05D5\u05D5\u05D4 \u05E9\u05E8\u05D8\u05D5\u05D8 \u05D9\u05D9\u05E6\u05D5\u05E8 \u05D0\u05D5 \u05D1\u05D3\u05D9\u05E7\u05EA \u05D0\u05E8\u05D2\u05D5\u05E0\u05D5\u05DE\u05D9\u05D4. \u05D4\u05D2\u05D5\u05D5\u05E0\u05D9\u05DD \u05EA\u05DC\u05D5\u05D9\u05D9\u05DD \u05D1\u05DE\u05E1\u05DA \u05D5\u05D1\u05EA\u05D0\u05D5\u05E8\u05D4. \u05DC\u05D7\u05E6\u05D5 \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05E2\u05DC \u05D3\u05DC\u05EA\u05D5\u05EA, \u05DE\u05D2\u05D9\u05E8\u05D5\u05EA, \u05DE\u05EA\u05D2\u05D9\u05DD \u05D0\u05D5 \u05D7\u05DC\u05E7\u05D9\u05DD \u05D1\u05D3\u05D2\u05DD \u05D4\u05EA\u05DC\u05EA\u05BE\u05DE\u05DE\u05D3 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05E4\u05E2\u05D9\u05DC \u05D0\u05D5\u05EA\u05DD, \u05D2\u05E8\u05E8\u05D5 \u05DC\u05E1\u05D9\u05D1\u05D5\u05D1, \u05D5\u05E6\u05D1\u05D8\u05D5 \u05D0\u05D5 \u05D2\u05DC\u05DC\u05D5 \u05D1\u05E9\u05EA\u05D9 \u05D0\u05E6\u05D1\u05E2\u05D5\u05EA \u05D1\u05DE\u05E9\u05D8\u05D7 \u05D4\u05DE\u05D2\u05E2 \u05DC\u05D6\u05D5\u05DD.",noEstimates:"\u05DC\u05D0 \u05E1\u05D5\u05DE\u05E0\u05D5 \u05D4\u05E2\u05E8\u05DB\u05D5\u05EA \u05D1\u05E2\u05D9\u05E6\u05D5\u05D1 \u05DE\u05D0\u05D5\u05E9\u05E8 \u05D6\u05D4.",estimatesPrefix:"\u05D4\u05E2\u05E8\u05DB\u05D5\u05EA \u05D1\u05E2\u05D9\u05E6\u05D5\u05D1: {items}.",estimateSingular:"\u05D4\u05E2\u05E8\u05DB\u05D4 \u05D0\u05D7\u05EA",estimatePlural:"{count} \u05D4\u05E2\u05E8\u05DB\u05D5\u05EA",editStudy:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05D4\u05E1\u05E7\u05D9\u05E8\u05D4",configuration:"\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05EA\u05E6\u05D5\u05E8\u05D4",categoryGroup:"\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D9\u05EA \u05D4\u05EA\u05D0\u05DE\u05D4",tabFurniture:"\u05E8\u05D4\u05D9\u05D8",tabPerson:"\u05D3\u05DE\u05D5\u05EA",finishes:"\u05D2\u05D9\u05DE\u05D5\u05E8\u05D9\u05DD \u05D5\u05D7\u05D5\u05DE\u05E8\u05D9\u05DD",applyFinishTo:"\u05D4\u05D7\u05DC\u05EA \u05D2\u05D9\u05DE\u05D5\u05E8 \u05E2\u05DC",finishPalette:"\u05E4\u05DC\u05D8\u05EA \u05D2\u05D9\u05DE\u05D5\u05E8\u05D9\u05DD",customTint:"\u05D2\u05D5\u05D5\u05DF \u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9\u05EA",usePresetColor:"\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E6\u05D1\u05E2 \u05D4\u05DE\u05E7\u05D5\u05E8\u05D9",finishHiddenHint:"\u05E7\u05D1\u05D5\u05E6\u05EA \u05D7\u05D5\u05DE\u05E8 \u05D6\u05D5 \u05D0\u05D9\u05E0\u05D4 \u05DE\u05D5\u05E6\u05D2\u05EA \u05D1\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05D1\u05E0\u05D4 \u05E9\u05E0\u05D1\u05D7\u05E8\u05D5.",surfaceWood:"\u05E2\u05E5",surfaceFabric:"\u05D1\u05D3",surfaceMetal:"\u05DE\u05EA\u05DB\u05EA",surfacePaint:"\u05E6\u05D1\u05E2",dimensions:"\u05DE\u05D9\u05D3\u05D5\u05EA",dimensionsHint:"\u05DE\u05D9\u05D3\u05D5\u05EA \u05D7\u05D9\u05E6\u05D5\u05E0\u05D9\u05D5\u05EA \u05E9\u05DC \u05D4\u05DE\u05E2\u05D8\u05E4\u05EA \u05D1\u05DE\u05F4\u05DE. \u05D9\u05D3\u05D9\u05D5\u05EA \u05D1\u05D5\u05DC\u05D8\u05D5\u05EA \u05D5\u05D7\u05DC\u05E7\u05D9\u05DD \u05E4\u05EA\u05D5\u05D7\u05D9\u05DD \u05E2\u05E9\u05D5\u05D9\u05D9\u05DD \u05DC\u05D7\u05E8\u05D5\u05D2 \u05DE\u05D4\u05DF.",axisWidth:"\u05E8\u05D5\u05D7\u05D1",axisHeight:"\u05D2\u05D5\u05D1\u05D4",axisDepth:"\u05E2\u05D5\u05DE\u05E7",fixedByDesign:"\u05E7\u05D1\u05D5\u05E2 \u05D1\u05DE\u05E4\u05E8\u05D8 \u05D4\u05E2\u05D9\u05E6\u05D5\u05D1",showGuides:"\u05D4\u05E6\u05D2\u05EA \u05E7\u05D5\u05D5\u05D9 \u05DE\u05D9\u05D3\u05D4",invalidWholeNumber:"\u05D9\u05E9 \u05DC\u05D4\u05D6\u05D9\u05DF \u05DE\u05E1\u05E4\u05E8 \u05E9\u05DC\u05DD \u05D1\u05D9\u05DF {min} \u05DC\u05BE{max} {unit}.",construction:"\u05DE\u05D1\u05E0\u05D4 \u05D5\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA",doorsAndMovement:"\u05D3\u05DC\u05EA\u05D5\u05EA \u05D5\u05EA\u05E0\u05D5\u05E2\u05D4",openAll:"\u05E4\u05EA\u05D7 \u05D4\u05DB\u05D5\u05DC",closeAll:"\u05E1\u05D2\u05D5\u05E8 \u05D4\u05DB\u05D5\u05DC",open:"\u05E4\u05EA\u05D7",close:"\u05E1\u05D2\u05D5\u05E8",openActionLabel:"\u05E4\u05EA\u05D9\u05D7\u05D4 \u05E9\u05DC {label}",closeActionLabel:"\u05E1\u05D2\u05D9\u05E8\u05D4 \u05E9\u05DC {label}",notVisibleHint:"\u05D0\u05D9\u05E0\u05D5 \u05D2\u05DC\u05D5\u05D9 \u05D1\u05EA\u05E6\u05D5\u05E8\u05D4 \u05D6\u05D5.",switchesAndLighting:"\u05DE\u05EA\u05D2\u05D9\u05DD \u05D5\u05EA\u05D0\u05D5\u05E8\u05D4",switchOn:"\u05D3\u05DC\u05D5\u05E7",switchOff:"\u05DB\u05D1\u05D5\u05D9",personalization:"\u05D4\u05E7\u05D3\u05E9\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA",nameplateText:"\u05D8\u05E7\u05E1\u05D8 \u05E2\u05DC \u05DC\u05D5\u05D7\u05D9\u05EA \u05D4\u05E9\u05DD",nameplatePlaceholder:"\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 \u05DE\u05E1\u05F3 04",nameplateHint:"\u05E2\u05D3 32 \u05EA\u05D5\u05D5\u05D9\u05DD. \u05D4\u05E9\u05D0\u05D9\u05E8\u05D5 \u05E8\u05D9\u05E7 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05E1\u05D9\u05E8 \u05D0\u05EA \u05D4\u05DC\u05D5\u05D7\u05D9\u05EA.",humanScale:"\u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4 \u05D0\u05E0\u05D5\u05E9\u05D9",humanScaleHint:"\u05D3\u05DE\u05D5\u05EA \u05D4\u05DE\u05D7\u05E9\u05D4 \u05DC\u05E6\u05D3 \u05D4\u05E8\u05D4\u05D9\u05D8. \u05D4\u05D2\u05D5\u05D1\u05D4 \u05D1\u05E2\u05DE\u05D9\u05D3\u05D4 \u05E7\u05D5\u05D1\u05E2 \u05D0\u05EA \u05E7\u05E0\u05D4 \u05D4\u05DE\u05D9\u05D3\u05D4 \u05D1\u05DB\u05DC \u05EA\u05E0\u05D5\u05D7\u05D4; \u05D0\u05D9\u05DF \u05DE\u05D3\u05D5\u05D1\u05E8 \u05D1\u05D1\u05D3\u05D9\u05E7\u05EA \u05D4\u05EA\u05D0\u05DE\u05D4 \u05D0\u05E8\u05D2\u05D5\u05E0\u05D5\u05DE\u05D9\u05EA.",showPerson:"\u05D4\u05E6\u05D2\u05EA \u05D3\u05DE\u05D5\u05EA \u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4",personSettingsLegend:"\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D3\u05DE\u05D5\u05EA \u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4",sizeAndPose:"\u05D2\u05D5\u05D3\u05DC \u05D5\u05EA\u05E0\u05D5\u05D7\u05D4",standingStature:"\u05D2\u05D5\u05D1\u05D4 \u05D1\u05E2\u05DE\u05D9\u05D3\u05D4",build:"\u05DE\u05D1\u05E0\u05D4 \u05D2\u05D5\u05E3",buildSlim:"\u05E6\u05E8",buildRegular:"\u05E8\u05D2\u05D9\u05DC",buildBroad:"\u05E8\u05D7\u05D1",pose:"\u05EA\u05E0\u05D5\u05D7\u05D4",poseStanding:"\u05E2\u05DE\u05D9\u05D3\u05D4",poseSeated:"\u05D9\u05E9\u05D9\u05D1\u05D4",placement:"\u05DE\u05D9\u05E7\u05D5\u05DD",sideLeft:"\u05E9\u05DE\u05D0\u05DC",sideRight:"\u05D9\u05DE\u05D9\u05DF",facingAngle:"\u05D6\u05D5\u05D5\u05D9\u05EA \u05E4\u05E0\u05D9\u05DD",figureColors:"\u05E6\u05D1\u05E2\u05D9 \u05D4\u05D3\u05DE\u05D5\u05EA",skinTone:"\u05D2\u05D5\u05D5\u05DF \u05E2\u05D5\u05E8",topColor:"\u05E6\u05D1\u05E2 \u05D7\u05D5\u05DC\u05E6\u05D4",trouserColor:"\u05E6\u05D1\u05E2 \u05DE\u05DB\u05E0\u05E1\u05D9\u05D9\u05DD",resetDefaults:"\u05D0\u05D9\u05E4\u05D5\u05E1 \u05DC\u05D1\u05E8\u05D9\u05E8\u05D5\u05EA \u05D4\u05DE\u05D7\u05D3\u05DC",exportTitle:"\u05D9\u05D9\u05E6\u05D5\u05D0 \u05EA\u05DE\u05D5\u05E0\u05EA \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 (PNG)",closeDialog:"\u05E1\u05D2\u05D9\u05E8\u05EA \u05D7\u05DC\u05D5\u05DF \u05D4\u05D9\u05D9\u05E6\u05D5\u05D0",exportHint:"\u05D4\u05E4\u05E7\u05EA \u05EA\u05DE\u05D5\u05E0\u05EA \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 \u05D1\u05E8\u05D6\u05D5\u05DC\u05D5\u05E6\u05D9\u05D4 \u05D2\u05D1\u05D5\u05D4\u05D4 \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05DE\u05D4\u05DE\u05D1\u05D8 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9.",resolution:"\u05E8\u05D6\u05D5\u05DC\u05D5\u05E6\u05D9\u05D4",scale1:"1\xD7 \u05D2\u05D5\u05D3\u05DC \u05EA\u05E6\u05D5\u05D2\u05D4",scale2:"2\xD7 \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 HD",scale3:"3\xD7 \u05D4\u05D3\u05E4\u05E1\u05D4 \u05D0\u05D5\u05DC\u05D8\u05E8\u05D4",outputSize:"\u05D2\u05D5\u05D3\u05DC \u05E4\u05DC\u05D8: ",backdrop:"\u05E8\u05E7\u05E2",bgStudio:"\u05E8\u05E7\u05E2 \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5",bgTransparent:"PNG \u05E9\u05E7\u05D5\u05E3",includeGuides:"\u05DB\u05DC\u05D5\u05DC \u05E7\u05D5\u05D5\u05D9 \u05DE\u05D9\u05D3\u05D4",includeCaption:"\u05DB\u05DC\u05D5\u05DC \u05E4\u05E1 \u05DE\u05E4\u05E8\u05D8 \u05D1\u05EA\u05D7\u05EA\u05D9\u05EA",cancel:"\u05D1\u05D9\u05D8\u05D5\u05DC",downloadPng:"\u05D4\u05D5\u05E8\u05D3\u05EA PNG",captionDisclaimer:"\u05DE\u05D7\u05E7\u05E8 \u05E6\u05D5\u05E8\u05D4 \xB7 \u05DC\u05D4\u05DE\u05D7\u05E9\u05D4 \u05D7\u05D6\u05D5\u05EA\u05D9\u05EA \u05D1\u05DC\u05D1\u05D3",captionVisualOnly:"\u05DC\u05D4\u05DE\u05D7\u05E9\u05D4 \u05D7\u05D6\u05D5\u05EA\u05D9\u05EA \u05D1\u05DC\u05D1\u05D3",modelViewShort:"\u05EA\u05E6\u05D5\u05D2\u05EA \u05D3\u05D2\u05DD",ledTempLabel:"\u05D8\u05DE\u05E4\u05E8\u05D8\u05D5\u05E8\u05EA \u05EA\u05D0\u05D5\u05E8\u05D4",ledTemp2700:"2700K \u05D7\u05DD",ledTemp3500:"3500K \u05E0\u05D9\u05D8\u05E8\u05DC\u05D9",ledTemp4500:"4500K \u05D0\u05D5\u05E8 \u05D9\u05D5\u05DD",specSheetBtn:"\u05D3\u05E3 \u05DE\u05E4\u05E8\u05D8",specSheetTitle:"\u05D3\u05E3 \u05DE\u05E4\u05E8\u05D8 \u05D5\u05D4\u05D3\u05DE\u05D9\u05D4 \u05DC\u05DC\u05E7\u05D5\u05D7",specSheetHint:"\u05D4\u05E9\u05D5\u05D5\u05D0\u05D4 \u05E8\u05D1\u05BE\u05D6\u05D5\u05D5\u05D9\u05EA\u05D9\u05EA \u05E2\u05DD \u05DE\u05D9\u05D3\u05D5\u05EA, \u05D2\u05D9\u05DE\u05D5\u05E8\u05D9\u05DD \u05D5\u05D4\u05E2\u05E8\u05D5\u05EA \u05EA\u05DB\u05E0\u05D5\u05DF \u05DE\u05D5\u05DB\u05E0\u05D4 \u05DC\u05D4\u05D3\u05E4\u05E1\u05D4 \u05DB\u05BEPDF \u05D0\u05D5 \u05DC\u05D4\u05D5\u05E8\u05D3\u05D4 \u05DB\u05EA\u05DE\u05D5\u05E0\u05EA \u05DC\u05D5\u05D7.",specSheetPrint:"\u05D4\u05D3\u05E4\u05E1\u05D4 / PDF",specSheetPng:"\u05D4\u05D5\u05E8\u05D3\u05EA \u05DC\u05D5\u05D7 PNG",specSheetClose:"\u05E1\u05D2\u05D9\u05E8\u05EA \u05D7\u05DC\u05D5\u05DF \u05DE\u05E4\u05E8\u05D8",specSheetGenerating:"\u05DE\u05E4\u05D9\u05E7 \u05DE\u05D1\u05D8\u05D9 \u05DE\u05E4\u05E8\u05D8\u2026",sheetViewStudio:"\u05DE\u05D1\u05D8 \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5",sheetViewFront:"\u05D7\u05D6\u05D9\u05EA \u05D0\u05D5\u05E8\u05EA\u05D5\u05D2\u05E8\u05E4\u05D9\u05EA",sheetViewSide:"\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E6\u05D3",sheetViewInterior:"\u05DE\u05D1\u05D8 \u05E4\u05E0\u05D9\u05DD / \u05E2\u05DC",sheetDate:"\u05EA\u05D0\u05E8\u05D9\u05DA",sheetDimensions:"\u05DE\u05D9\u05D3\u05D5\u05EA \u05DE\u05E2\u05D8\u05E4\u05EA",sheetFinishes:"\u05DE\u05E4\u05E8\u05D8 \u05D7\u05D5\u05DE\u05E8\u05D9\u05DD \u05D5\u05D2\u05D9\u05DE\u05D5\u05E8\u05D9\u05DD",sheetOptions:"\u05EA\u05E6\u05D5\u05E8\u05D4 \u05D5\u05EA\u05D5\u05E1\u05E4\u05D5\u05EA",sheetCustomTint:"\u05D2\u05D5\u05D5\u05DF \u05DE\u05D5\u05EA\u05D0\u05DD",sheetNotes:"\u05D4\u05E2\u05E8\u05D5\u05EA \u05D5\u05D0\u05D5\u05DE\u05D3\u05E0\u05D9\u05DD",hoverClosed:"\u05E1\u05D2\u05D5\u05E8 \xB7 \u05DC\u05D7\u05E6\u05D5 \u05DC\u05E4\u05EA\u05D9\u05D7\u05D4",hoverOpen:"\u05E4\u05EA\u05D5\u05D7 {pct}% \xB7 \u05DC\u05D7\u05E6\u05D5 \u05DC\u05E1\u05D2\u05D9\u05E8\u05D4",hoverTurnOn:"\u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05D3\u05DC\u05E7\u05D4",hoverTurnOff:"\u05DC\u05D7\u05E6\u05D5 \u05DC\u05DB\u05D9\u05D1\u05D5\u05D9",hoverSwitchOption:"\u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05D0\u05E4\u05E9\u05E8\u05D5\u05EA",hoverEditFinish:"\u05DC\u05D7\u05E6\u05D5 \u05DC\u05E2\u05E8\u05D9\u05DB\u05EA \u05D2\u05D9\u05DE\u05D5\u05E8",hoverPerson:"\u05D3\u05DE\u05D5\u05EA \u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4",hoverStand:"\u05D9\u05E9\u05D9\u05D1\u05D4 \xB7 \u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05E2\u05DE\u05D3\u05D4",hoverSit:"\u05E2\u05DE\u05D9\u05D3\u05D4 \xB7 \u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05D5\u05E9\u05D1\u05D4",hotspotOpen:"{label}: \u05E4\u05EA\u05D5\u05D7 ({pct}%), \u05DC\u05D7\u05E6\u05D5 \u05DC\u05E1\u05D2\u05D9\u05E8\u05D4",hotspotClosed:"{label}: \u05E1\u05D2\u05D5\u05E8, \u05DC\u05D7\u05E6\u05D5 \u05DC\u05E4\u05EA\u05D9\u05D7\u05D4",hotspotOn:"{label}: \u05D3\u05DC\u05D5\u05E7, \u05DC\u05D7\u05E6\u05D5 \u05DC\u05DB\u05D9\u05D1\u05D5\u05D9",hotspotOff:"{label}: \u05DB\u05D1\u05D5\u05D9, \u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05D3\u05DC\u05E7\u05D4",noticeDefaultsRestored:"\u05D1\u05E8\u05D9\u05E8\u05D5\u05EA \u05D4\u05DE\u05D7\u05D3\u05DC \u05E9\u05DC \u05D4\u05D3\u05D2\u05DD \u05E9\u05D5\u05D7\u05D6\u05E8\u05D5.",noticeLighting:"\u05EA\u05D0\u05D5\u05E8\u05EA \u05E1\u05D8\u05D5\u05D3\u05D9\u05D5: {name}.",noticeOrthoOn:"\u05D4\u05D9\u05D8\u05DC \u05D0\u05D5\u05E8\u05EA\u05D5\u05D2\u05E8\u05E4\u05D9 \u05D4\u05D5\u05E4\u05E2\u05DC.",noticeOrthoOff:"\u05D4\u05D9\u05D8\u05DC \u05E4\u05E8\u05E1\u05E4\u05E7\u05D8\u05D9\u05D1\u05D4 \u05D4\u05D5\u05E4\u05E2\u05DC.",noticeExportedPng:"\u05D9\u05D5\u05E6\u05D0\u05D4 \u05EA\u05DE\u05D5\u05E0\u05EA PNG \u05D1\u05D2\u05D5\u05D3\u05DC {width} \xD7 {height}.",noticeExportFailed:"\u05D9\u05D9\u05E6\u05D5\u05D0 \u05D4\u05BEPNG \u05E0\u05DB\u05E9\u05DC: {message}",noticeWait3d:"\u05D9\u05E9 \u05DC\u05D4\u05DE\u05EA\u05D9\u05DF \u05DC\u05E1\u05D9\u05D5\u05DD \u05D8\u05E2\u05D9\u05E0\u05EA \u05EA\u05E6\u05D5\u05D2\u05EA \u05D4\u05EA\u05DC\u05EA\u05BE\u05DE\u05DE\u05D3.",noticeSetupSaved:"\u05E7\u05D5\u05D1\u05E5 \u05D4\u05D4\u05D2\u05D3\u05E8\u05D4 \u05D4\u05D5\u05E8\u05D3. \u05E0\u05D9\u05EA\u05DF \u05DC\u05D8\u05E2\u05D5\u05DF \u05D0\u05D5\u05EA\u05D5 \u05DC\u05D3\u05D2\u05DD \u05D6\u05D4 \u05DC\u05E9\u05D7\u05D6\u05D5\u05E8 \u05D4\u05DE\u05E6\u05D1.",noticeSetupRestored:"\u05D4\u05D4\u05D2\u05D3\u05E8\u05D4 \u05D4\u05E9\u05DE\u05D5\u05E8\u05D4 \u05E9\u05D5\u05D7\u05D6\u05E8\u05D4.",noticeSetupFailed:"\u05D8\u05E2\u05D9\u05E0\u05EA \u05D4\u05D4\u05D2\u05D3\u05E8\u05D4 \u05E0\u05DB\u05E9\u05DC\u05D4: {message}",errSetupTooLarge:"\u05E7\u05D5\u05D1\u05E5 \u05D4\u05D4\u05D2\u05D3\u05E8\u05D4 \u05D7\u05D5\u05E8\u05D2 \u05DE\u05BE256 KiB.",errWrongModel:"\u05E7\u05D5\u05D1\u05E5 \u05D6\u05D4 \u05DC\u05D0 \u05E0\u05E9\u05DE\u05E8 \u05DE\u05D3\u05D2\u05DD \u05D6\u05D4.",personRun:"\u25B6 \u05D4\u05E4\u05E2\u05DC",personStop:"\u25A0 \u05E2\u05E6\u05D5\u05E8",personRunTitle:"\u05D4\u05E4\u05E2\u05DC\u05EA \u05D0\u05E0\u05D9\u05DE\u05E6\u05D9\u05D4 \u05D0\u05D5\u05D8\u05D5\u05E0\u05D5\u05DE\u05D9\u05EA \u05DC\u05D3\u05DE\u05D5\u05EA (\u05D0\u05D9\u05E0\u05D8\u05E8\u05D0\u05E7\u05E6\u05D9\u05D4 \u05D0\u05E7\u05E8\u05D0\u05D9\u05EA \u05DB\u05DC 10 \u05E9\u05E0\u05D9\u05D5\u05EA)",personStopTitle:"\u05E2\u05E6\u05D9\u05E8\u05EA \u05D0\u05E0\u05D9\u05DE\u05E6\u05D9\u05D9\u05EA \u05D4\u05D3\u05DE\u05D5\u05EA",personAutoTitle:"\u05D0\u05D9\u05E0\u05D8\u05E8\u05D0\u05E7\u05E6\u05D9\u05D4 \u05D0\u05D5\u05D8\u05D5\u05E0\u05D5\u05DE\u05D9\u05EA \u05E2\u05DD \u05D4\u05E8\u05D4\u05D9\u05D8",personAutoHint:"\u05D1\u05DC\u05D7\u05D9\u05E6\u05D4 \u05E2\u05DC \u05D4\u05E4\u05E2\u05DC\u05D4 \u05D4\u05D3\u05DE\u05D5\u05EA \u05DE\u05EA\u05D4\u05DC\u05DB\u05EA, \u05DE\u05EA\u05D9\u05D9\u05E9\u05D1\u05EA \u05E2\u05DC \u05DE\u05D5\u05E9\u05D1\u05D9\u05DD \u05D5\u05E4\u05D5\u05EA\u05D7\u05EA/\u05E1\u05D5\u05D2\u05E8\u05EA \u05D3\u05DC\u05EA\u05D5\u05EA \u05D0\u05D5 \u05DE\u05EA\u05D2\u05D9\u05DD \u05D1\u05D0\u05E7\u05E8\u05D0\u05D9 \u05E2\u05DD \u05D4\u05E9\u05D4\u05D9\u05D4 \u05E9\u05DC 10 \u05E9\u05E0\u05D9\u05D5\u05EA \u05D1\u05D9\u05DF \u05E4\u05E2\u05D5\u05DC\u05D5\u05EA.",personAutoIdle:"\u05DE\u05D5\u05DB\u05DF \u05DC\u05D4\u05E4\u05E2\u05DC\u05D4",personAutoStarting:"\u05DE\u05D7\u05E4\u05E9 \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D0\u05E7\u05E8\u05D0\u05D9\u05EA\u2026",personAutoWaiting:"\u05D4\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D4\u05D1\u05D0\u05D4 \u05D1\u05E2\u05D5\u05D3 {sec} \u05E9\u05E0\u05D9\u05D5\u05EA\u2026",personActOpen:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05E4\u05D5\u05EA\u05D7\u05EA: {label}",personActClose:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05E1\u05D5\u05D2\u05E8\u05EA: {label}",personActSwitchOn:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05DE\u05D3\u05DC\u05D9\u05E7\u05D4: {label}",personActSwitchOff:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05DE\u05DB\u05D1\u05D4: {label}",personActSit:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05DE\u05EA\u05D9\u05D9\u05E9\u05D1\u05EA \u05E2\u05DC {label}",personActStand:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05E7\u05DE\u05D4 \u05DE\u05D4\u05DE\u05D5\u05E9\u05D1",personActInspect:"\u05D4\u05D3\u05DE\u05D5\u05EA \u05E1\u05D5\u05E7\u05E8\u05EA \u05D0\u05EA {label}",noticePersonRunStart:"\u05DE\u05E6\u05D1 \u05D4\u05E4\u05E2\u05DC\u05D4 \u05E9\u05DC \u05D4\u05D3\u05DE\u05D5\u05EA \u05D4\u05D5\u05E4\u05E2\u05DC (\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D0\u05E7\u05E8\u05D0\u05D9\u05EA \u05DB\u05DC 10 \u05E9\u05E0\u05D9\u05D5\u05EA).",noticePersonRunStop:"\u05DE\u05E6\u05D1 \u05D4\u05D4\u05E4\u05E2\u05DC\u05D4 \u05E9\u05DC \u05D4\u05D3\u05DE\u05D5\u05EA \u05E0\u05E2\u05E6\u05E8.",matImportTitle:"\u05E7\u05D1\u05DC\u05EA \u05D7\u05D5\u05DE\u05E8\u05D9\u05DD \u05DE\u05E1\u05E7\u05D9\u05E6\u05D4 \u05D0\u05D5 \u05EA\u05D9\u05D0\u05D5\u05E8",matImportHint:"\u05D4\u05D3\u05D1\u05D9\u05E7\u05D5 \u05E9\u05DE\u05D5\u05EA \u05D7\u05D5\u05DE\u05E8\u05D9\u05DD (\u05E2\u05D1\u05E8\u05D9\u05EA/\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA) \u05D0\u05D5 \u05D4\u05E2\u05DC\u05D5 \u05EA\u05DE\u05D5\u05E0\u05EA \u05E1\u05E7\u05D9\u05E6\u05D4/\u05E4\u05DC\u05D8\u05D4 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05D5\u05E1\u05D9\u05E3 \u05D2\u05D9\u05DE\u05D5\u05E8\u05D9\u05DD \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4.",matTextLabel:"\u05D7\u05D5\u05DE\u05E8\u05D9\u05DD \u05DE\u05EA\u05D5\u05DA \u05D8\u05E7\u05E1\u05D8",matTextPlaceholder:"\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: \u05D0\u05DC\u05D5\u05DF \u05D8\u05D1\u05E2\u05D9, \u05E7\u05E9\u05DE\u05D9\u05E8 \u05DE\u05D8, \u05E4\u05DC\u05D9\u05D6 \u05DE\u05D5\u05D1\u05E8\u05E9 #b49963",matParseBtn:"\u05D7\u05DC\u05E5 \u05DE\u05D8\u05E7\u05E1\u05D8",matSketchBtn:"\u05D8\u05E2\u05DF \u05E1\u05E7\u05D9\u05E6\u05D4 / \u05EA\u05DE\u05D5\u05E0\u05D4",matSurfaceLabel:"\u05E1\u05D5\u05D2 \u05DE\u05E8\u05E7\u05DD \u05DC\u05E1\u05E7\u05D9\u05E6\u05D4",matSketchHint:"\u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05D4\u05E1\u05E7\u05D9\u05E6\u05D4 \u05DC\u05D3\u05D2\u05D9\u05DE\u05EA \u05E6\u05D1\u05E2 \u05DE\u05D3\u05D5\u05D9\u05E7, \u05D0\u05D5 \u05D1\u05D7\u05E8\u05D5 \u05DE\u05D4\u05D2\u05D5\u05D5\u05E0\u05D9\u05DD \u05E9\u05D7\u05D5\u05DC\u05E6\u05D5:",matDetectedLabel:"\u05D7\u05D5\u05DE\u05E8\u05D9\u05DD \u05E9\u05D6\u05D5\u05D4\u05D5 (\u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05D5\u05E1\u05E4\u05D4 \u05D5\u05D1\u05D7\u05D9\u05E8\u05D4):",matEmptyResult:"\u05DC\u05D0 \u05D6\u05D5\u05D4\u05D5 \u05D7\u05D5\u05DE\u05E8\u05D9\u05DD \u05DE\u05D5\u05DB\u05E8\u05D9\u05DD \u2014 \u05E0\u05E1\u05D5 \u05DC\u05E6\u05D9\u05D9\u05DF \u05E9\u05DD \u05D7\u05D5\u05DE\u05E8 \u05D0\u05D5 \u05E7\u05D5\u05D3 #RRGGBB.",matAppliedNotice:'\u05E0\u05D5\u05E1\u05E3 \u05D4\u05D7\u05D5\u05DE\u05E8 "{name}" \u05DC\u05D0\u05D6\u05D5\u05E8 {slot}.',matAddedToSlot:"\u05E0\u05D5\u05E1\u05E3 \u05D5\u05E0\u05D1\u05D7\u05E8: {name}",matSketchError:"\u05D8\u05E2\u05D9\u05E0\u05EA \u05EA\u05DE\u05D5\u05E0\u05EA \u05D4\u05E1\u05E7\u05D9\u05E6\u05D4 \u05E0\u05DB\u05E9\u05DC\u05D4.",noticeSwitchOn:"{label} \u05D4\u05D5\u05E4\u05E2\u05DC.",noticeSwitchOff:"{label} \u05DB\u05D5\u05D1\u05D4.",noticeJointOpened:"{label} \u05E0\u05E4\u05EA\u05D7.",noticeJointClosed:"{label} \u05E0\u05E1\u05D2\u05E8.",noticePersonPose:"\u05EA\u05E0\u05D5\u05D7\u05EA \u05D4\u05D3\u05DE\u05D5\u05EA: {pose}.",noticeEditingFinish:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05D2\u05D9\u05DE\u05D5\u05E8: {label}.",noticeBlocked:"{label} \u05E0\u05E2\u05E6\u05E8 \u2014 \u05E0\u05D7\u05E1\u05DD \u05E2\u05DC \u05D9\u05D3\u05D9 {blocker} ({pct}%).",noticePreviewError:"\u05E9\u05D2\u05D9\u05D0\u05EA \u05EA\u05E6\u05D5\u05D2\u05D4: {message}",noticeLangSwitched:"\u05D4\u05E9\u05E4\u05D4 \u05D4\u05D5\u05D7\u05DC\u05E4\u05D4 \u05DC\u05E2\u05D1\u05E8\u05D9\u05EA.",noticeXrayOn:"\u05DE\u05E6\u05D1 \u05E8\u05E0\u05D8\u05D2\u05DF \u05D4\u05D5\u05E4\u05E2\u05DC: \u05D7\u05D6\u05D9\u05EA\u05D5\u05EA \u05D4\u05E4\u05DB\u05D5 \u05DC\u05E9\u05E7\u05D5\u05E4\u05D5\u05EA \u05DC\u05D4\u05E6\u05D2\u05EA \u05DE\u05D3\u05E4\u05D9\u05DD \u05D5\u05DE\u05D2\u05D9\u05E8\u05D5\u05EA.",noticeXrayOff:"\u05DE\u05E6\u05D1 \u05E8\u05E0\u05D8\u05D2\u05DF \u05DB\u05D5\u05D1\u05D4.",noticeAoOn:"\u05D4\u05E6\u05DC\u05DC\u05EA \u05E2\u05D5\u05DE\u05E7 \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA (GTAO) \u05D4\u05D5\u05E4\u05E2\u05DC\u05D4.",noticeAoOff:"\u05D4\u05E6\u05DC\u05DC\u05EA \u05E2\u05D5\u05DE\u05E7 \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA \u05DB\u05D5\u05D1\u05EA\u05D4.",noticeBackdropRoom:"\u05E8\u05E7\u05E2 \u05D4\u05D5\u05D7\u05DC\u05E3 \u05DC\u05D4\u05D3\u05DE\u05D9\u05D9\u05EA \u05D7\u05D3\u05E8.",noticeBackdropStudio:"\u05E8\u05E7\u05E2 \u05D4\u05D5\u05D7\u05DC\u05E3 \u05DC\u05E1\u05D8\u05D5\u05D3\u05D9\u05D5.",noticeEveningLightsTip:"\u05DE\u05E6\u05D1 \u05E2\u05E8\u05D1 \u05E4\u05E2\u05D9\u05DC \u2014 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05D3\u05DC\u05D9\u05E7 \u05D0\u05EA \u05D2\u05D5\u05E4\u05D9 \u05D4\u05EA\u05D0\u05D5\u05E8\u05D4 \u05D1\u05D3\u05D2\u05DD.",noticeLedTemp:"\u05D8\u05DE\u05E4\u05E8\u05D8\u05D5\u05E8\u05EA \u05EA\u05D0\u05D5\u05E8\u05EA LED \u05D4\u05D5\u05D2\u05D3\u05E8\u05D4 \u05DC\u05BE{kelvin}K.",noticeSheetPng:"\u05DC\u05D5\u05D7 \u05DE\u05E4\u05E8\u05D8 PNG ({width} \xD7 {height}) \u05D4\u05D5\u05E8\u05D3.",noticeSheetFailed:"\u05D9\u05E6\u05D9\u05E8\u05EA \u05D3\u05E3 \u05D4\u05DE\u05E4\u05E8\u05D8 \u05E0\u05DB\u05E9\u05DC\u05D4: {message}",cabinetStructure:"\u05E9\u05DC\u05D3 \u05D4\u05D0\u05E8\u05D5\u05DF",canvasAriaLabel:"\u05EA\u05E6\u05D5\u05D2\u05EA \u05EA\u05DC\u05EA\u05BE\u05DE\u05DE\u05D3 \u05D0\u05D9\u05E0\u05D8\u05E8\u05D0\u05E7\u05D8\u05D9\u05D1\u05D9\u05EA \u05E9\u05DC {name}. \u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05D3\u05DC\u05EA\u05D5\u05EA, \u05DE\u05D2\u05D9\u05E8\u05D5\u05EA, \u05DE\u05EA\u05D2\u05D9\u05DD \u05D0\u05D5 \u05D7\u05DC\u05E7\u05D9\u05DD \u05DC\u05D4\u05E4\u05E2\u05DC\u05D4, \u05D5\u05E6\u05D1\u05D8\u05D5 \u05D0\u05D5 \u05D2\u05DC\u05DC\u05D5 \u05D1\u05E9\u05EA\u05D9 \u05D0\u05E6\u05D1\u05E2\u05D5\u05EA \u05DC\u05D6\u05D5\u05DD.",docTitleSuffix:"\u05DE\u05D7\u05E7\u05E8 \u05E6\u05D5\u05E8\u05D4",mmUnit:"\u05DE\u05F4\u05DE",axes:["\u05E8","\u05D2","\u05E2"]},en:{brandName:"Form Study",brandSubtitle:"Furniture configurator",skip:"Skip to customization",langGroupLabel:"Interface language",exportPng:"Export PNG",loadSetup:"Load setup",saveSetup:"Save setup",objectStudy:"Object study",offlineEdition:"Offline edition",modelViewPlate:"FS / MODEL VIEW",preparing3d:"Preparing the 3D view\u2026",webglUnavailable:"3D preview unavailable. Use a WebGL 2 capable browser with graphics acceleration. {message}",viewportControls:"Viewport controls",viewsAndLighting:"Views and lighting",cameraPreset:"Camera preset",cameraViews:"Camera views",viewStudio:"Studio view",viewFront:"Front",viewSide:"Side",viewTop:"Top",viewBack:"Back",studioLighting:"Studio lighting",lightDaylight:"Daylight",lightGallery:"Warm gallery",lightCrisp:"Crisp neutral",lightEvening:"Warm evening",backdropMode:"Backdrop environment",backdropStudio:"Studio",backdropRoom:"Room",roomSettings:"Wall and floor settings",roomWall:"Wall",roomWallCustom:"Custom wall color",roomFloor:"Floor",wallPlaster:"Warm plaster",wallGallery:"Gallery white",wallStone:"Warm stone",wallSage:"Soft sage",wallCharcoal:"Charcoal",floorOak:"White oak parquet",floorStone:"Warm travertine",floorConcrete:"Microcement",xrayToggle:"X-Ray",xrayTitle:"Toggle translucent front panels (X-Ray)",aoToggle:"Crevice AO",aoTitle:"Toggle real-time crevice ambient occlusion",orthographic:"Orthographic",orthographicTitle:"Toggle orthographic projection",orbit:"Orbit",orbitLeft:"Orbit left",orbitRight:"Orbit right",orbitUp:"Orbit up",orbitDown:"Orbit down",zoom:"Zoom",zoomOut:"Zoom out",zoomIn:"Zoom in",pins:"Pins",pinsTitle:"Toggle interactive 3D pins",quickPng:"PNG",quickPngTitle:"Quick export studio PNG",enclosureLabel:"Enclosure \xB7 W \xD7 D \xD7 H",scaleReference:"Scale reference",notShown:"Not shown",aboutStudy:"About this study",aboutBody:"This is a visual model, not a fabrication drawing or an ergonomic assessment. Colors depend on the display and lighting. Click doors, drawers, switches, or parts directly in the 3D scene to interact, drag to orbit, and pinch or scroll with two fingers on a trackpad to zoom.",noEstimates:"No estimates were flagged in the reviewed design.",estimatesPrefix:"Design estimates: {items}.",estimateSingular:"1 estimate",estimatePlural:"{count} estimates",editStudy:"Edit the study",configuration:"Configuration",categoryGroup:"Customization category",tabFurniture:"Furniture",tabPerson:"Person",finishes:"Finishes",applyFinishTo:"Apply finish to",finishPalette:"Finish palette",customTint:"Custom tint",usePresetColor:"Use preset color",finishHiddenHint:"This material group is not visible with the current construction options.",surfaceWood:"Wood",surfaceFabric:"Fabric",surfaceMetal:"Metal",surfacePaint:"Paint",dimensions:"Dimensions",dimensionsHint:"Enclosure dimensions in millimeters. Protruding hardware and open parts can extend beyond them.",axisWidth:"Width",axisHeight:"Height",axisDepth:"Depth",fixedByDesign:"Fixed by the design",showGuides:"Show measurement guides",invalidWholeNumber:"Enter a whole number from {min} to {max} {unit}.",construction:"Construction",doorsAndMovement:"Doors & movement",openAll:"Open all",closeAll:"Close all",open:"Open",close:"Close",openActionLabel:"Open {label}",closeActionLabel:"Close {label}",notVisibleHint:"Not visible in this configuration.",switchesAndLighting:"Switches & lighting",switchOn:"On",switchOff:"Off",personalization:"Personalization",nameplateText:"Nameplate text",nameplatePlaceholder:"e.g. Studio No. 04",nameplateHint:"Up to 32 characters. Leave blank to remove the plate.",humanScale:"Human scale",humanScaleHint:"A reference mannequin beside the piece. Standing stature sets its scale in either pose; it is not a fit assessment.",showPerson:"Show reference person",personSettingsLegend:"Reference person settings",sizeAndPose:"Size & pose",standingStature:"Standing stature",build:"Build",buildSlim:"Slim",buildRegular:"Regular",buildBroad:"Broad",pose:"Pose",poseStanding:"Standing",poseSeated:"Seated",placement:"Placement",sideLeft:"Left",sideRight:"Right",facingAngle:"Facing angle",figureColors:"Figure colors",skinTone:"Skin tone",topColor:"Top color",trouserColor:"Trouser color",resetDefaults:"Reset to design defaults",exportTitle:"Export studio PNG",closeDialog:"Close export dialog",exportHint:"Render a high-resolution studio image directly from the current view.",resolution:"Resolution",scale1:"1\xD7 Viewport",scale2:"2\xD7 Studio HD",scale3:"3\xD7 Print Ultra",outputSize:"Output size: ",backdrop:"Backdrop",bgStudio:"Studio backdrop",bgTransparent:"Transparent PNG",includeGuides:"Include measurement guides",includeCaption:"Include specification strip",cancel:"Cancel",downloadPng:"Download PNG",captionDisclaimer:"Form Study \xB7 Visual reference only",captionVisualOnly:"Visual reference only",modelViewShort:"MODEL VIEW",ledTempLabel:"LED color temperature",ledTemp2700:"2700K Warm",ledTemp3500:"3500K Neutral",ledTemp4500:"4500K Daylight",specSheetBtn:"Spec sheet",specSheetTitle:"Client Specification Sheet",specSheetHint:"Multi-angle presentation board with dimensions, finishes, and planning notes ready for PDF print or high-res PNG.",specSheetPrint:"Print / PDF",specSheetPng:"Download Board PNG",specSheetClose:"Close specification sheet",specSheetGenerating:"Capturing multi-view board\u2026",sheetViewStudio:"Studio 3/4",sheetViewFront:"Front Elevation",sheetViewSide:"Side Section",sheetViewInterior:"Interior / X-Ray",sheetDate:"Date",sheetDimensions:"Envelope Dimensions",sheetFinishes:"Materials & Finishes",sheetOptions:"Configuration",sheetCustomTint:"Custom tint",sheetNotes:"Study Notes & Estimates",hoverClosed:"Closed \xB7 Click to open",hoverOpen:"Open {pct}% \xB7 Click to close",hoverTurnOn:"Click to turn on",hoverTurnOff:"Click to turn off",hoverSwitchOption:"Click to switch option",hoverEditFinish:"Click to edit finish",hoverPerson:"Reference person",hoverStand:"Seated \xB7 Click to stand",hoverSit:"Standing \xB7 Click to sit",hotspotOpen:"{label}: Open ({pct}%), click to close",hotspotClosed:"{label}: Closed, click to open",hotspotOn:"{label}: On, click to turn off",hotspotOff:"{label}: Off, click to turn on",noticeDefaultsRestored:"Design defaults restored.",noticeLighting:"Studio lighting: {name}.",noticeOrthoOn:"Orthographic projection enabled.",noticeOrthoOff:"Perspective projection enabled.",noticeExportedPng:"Exported {width} \xD7 {height} PNG.",noticeExportFailed:"PNG export failed: {message}",noticeWait3d:"Wait for the 3D view to finish loading.",noticeSetupSaved:"Setup downloaded. Load it into this model to restore it.",noticeSetupRestored:"Saved setup restored.",noticeSetupFailed:"Setup not loaded: {message}",errSetupTooLarge:"Setup exceeds 256 KiB.",errWrongModel:"This is not a setup saved from this model.",personRun:"\u25B6 Run",personStop:"\u25A0 Stop",personRunTitle:"Run autonomous person animation (random interaction every 10s)",personStopTitle:"Stop autonomous person animation",personAutoTitle:"Autonomous interaction",personAutoHint:"Press Run to animate the person walking around the furniture and randomly sitting, opening/closing doors, or toggling switches every 10 seconds.",personAutoIdle:"Idle \xB7 ready",personAutoStarting:"Picking next action\u2026",personAutoWaiting:"Next action in {sec}s\u2026",personActOpen:"Person opening: {label}",personActClose:"Person closing: {label}",personActSwitchOn:"Person turning on: {label}",personActSwitchOff:"Person turning off: {label}",personActSit:"Person sitting on {label}",personActStand:"Person standing up",personActInspect:"Person inspecting {label}",noticePersonRunStart:"Person autonomous animation started (random action every 10s).",noticePersonRunStop:"Person autonomous animation stopped.",matImportTitle:"Receive materials from sketch or text",matImportHint:"Type material names/hex colors or load a sketch/palette image to add selectable finishes.",matTextLabel:"Materials from description",matTextPlaceholder:"e.g. Natural oak, Sage green, Brushed brass #b49963",matParseBtn:"Extract from text",matSketchBtn:"Load sketch image",matSurfaceLabel:"Surface type for sketch",matSketchHint:"Click anywhere on the sketch to sample a color, or pick a detected swatch:",matDetectedLabel:"Detected materials (click to add & apply):",matEmptyResult:"No recognized materials found \u2014 try naming wood/metal/paint or #RRGGBB.",matAppliedNotice:'Added finish "{name}" to {slot}.',matAddedToSlot:"Added & applied: {name}",matSketchError:"Could not decode the selected sketch image.",noticeSwitchOn:"{label} turned on.",noticeSwitchOff:"{label} turned off.",noticeJointOpened:"{label} opened.",noticeJointClosed:"{label} closed.",noticePersonPose:"Reference person pose: {pose}.",noticeEditingFinish:"Editing finish: {label}.",noticeBlocked:"{label} stopped \u2014 blocked by {blocker} ({pct}%).",noticePreviewError:"Preview error: {message}",noticeLangSwitched:"Language switched to English.",noticeXrayOn:"X-Ray enabled: fronts turned translucent to reveal interior.",noticeXrayOff:"X-Ray disabled.",noticeAoOn:"Real-time crevice AO enabled.",noticeAoOff:"Real-time crevice AO disabled.",noticeBackdropRoom:"Backdrop switched to architectural room.",noticeBackdropStudio:"Backdrop switched to studio.",noticeEveningLightsTip:"Evening mode active \u2014 switch on interior lights to preview glow.",noticeLedTemp:"LED color temperature set to {kelvin}K.",noticeSheetPng:"Spec sheet board PNG ({width} \xD7 {height}) downloaded.",noticeSheetFailed:"Specification sheet failed: {message}",cabinetStructure:"Cabinet structure",canvasAriaLabel:"Interactive 3D view of {name}. Click doors, drawers, switches, or parts to interact, or pinch/scroll with two fingers to zoom.",docTitleSuffix:"Form Study",mmUnit:"mm",axes:["W","H","D"]}},yb=new Map([["Linea sideboard","\u05DE\u05D6\u05E0\u05D5\u05DF \u05DC\u05D9\u05E0\u05D0\u05D4"],["A low cabinet with a hinged door, a pull-out drawer and an open display bay. Explore the joinery, finishes and scale.","\u05D0\u05E8\u05D5\u05DF \u05E0\u05DE\u05D5\u05DA \u05E2\u05DD \u05D3\u05DC\u05EA \u05E6\u05D9\u05E8, \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E0\u05E9\u05DC\u05E4\u05EA \u05D5\u05EA\u05D0 \u05EA\u05E6\u05D5\u05D2\u05D4 \u05E4\u05EA\u05D5\u05D7. \u05E0\u05D9\u05EA\u05DF \u05DC\u05D1\u05D7\u05D5\u05DF \u05D0\u05EA \u05D4\u05E0\u05D2\u05E8\u05D5\u05EA, \u05D4\u05D2\u05D9\u05DE\u05D5\u05E8\u05D9\u05DD \u05D5\u05E7\u05E0\u05D4 \u05D4\u05DE\u05D9\u05D3\u05D4."],["Primary bedroom \xB7 built-in joinery","\u05D7\u05D3\u05E8 \u05E9\u05D9\u05E0\u05D4 \u05E8\u05D0\u05E9\u05D9 \xB7 \u05E0\u05D2\u05E8\u05D5\u05EA \u05D1\u05D4\u05EA\u05D0\u05DE\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA"],["L-shaped primary-bedroom wardrobes with a blind corner, double hanging, internal drawers and a recessed walnut vanity. Open the doors to inspect the storage; use Person to check scale. Visualization only.","\u05D0\u05E8\u05D5\u05E0\u05D5\u05EA \u05E7\u05D9\u05E8 \u05D1\u05E6\u05D5\u05E8\u05EA \u05E8\u05F3 \u05DC\u05D7\u05D3\u05E8 \u05E9\u05D9\u05E0\u05D4 \u05E8\u05D0\u05E9\u05D9 \u05E2\u05DD \u05E4\u05D9\u05E0\u05D4 \u05E2\u05D9\u05D5\u05D5\u05E8\u05EA, \u05EA\u05DC\u05D9\u05D9\u05D4 \u05DB\u05E4\u05D5\u05DC\u05D4, \u05DE\u05D2\u05D9\u05E8\u05D5\u05EA \u05E4\u05E0\u05D9\u05DE\u05D9\u05D5\u05EA \u05D5\u05E0\u05D9\u05E9\u05EA \u05DB\u05D9\u05D5\u05E8 \u05D0\u05D2\u05D5\u05D6 \u05E9\u05E7\u05D5\u05E2\u05D4. \u05E4\u05EA\u05D7\u05D5 \u05D0\u05EA \u05D4\u05D3\u05DC\u05EA\u05D5\u05EA \u05DC\u05D1\u05D7\u05D9\u05E0\u05EA \u05D4\u05D0\u05D7\u05E1\u05D5\u05DF \u05D5\u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1\u05D3\u05DE\u05D5\u05EA \u05DC\u05D1\u05D3\u05D9\u05E7\u05EA \u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4. \u05DC\u05D4\u05DE\u05D7\u05E9\u05D4 \u05D1\u05DC\u05D1\u05D3."],["Cabinet body","\u05D2\u05D5\u05E3 \u05D4\u05D0\u05E8\u05D5\u05DF"],["Door & drawer fronts","\u05D7\u05D6\u05D9\u05EA\u05D5\u05EA \u05D3\u05DC\u05EA \u05D5\u05DE\u05D2\u05D9\u05E8\u05D4"],["Hardware","\u05E4\u05E8\u05D6\u05D5\u05DC \u05D5\u05D9\u05D3\u05D9\u05D5\u05EA"],["Carcass","\u05E9\u05DC\u05D3 \u05D4\u05D0\u05E8\u05D5\u05DF"],["Frame","\u05DE\u05E1\u05D2\u05E8\u05EA"],["Upholstery","\u05E8\u05D9\u05E4\u05D5\u05D3"],["Top","\u05DE\u05E9\u05D8\u05D7 \u05E2\u05DC\u05D9\u05D5\u05DF"],["Base","\u05D1\u05E1\u05D9\u05E1"],["Legs","\u05E8\u05D2\u05DC\u05D9\u05D9\u05DD"],["Wardrobe fronts","\u05D7\u05D6\u05D9\u05EA\u05D5\u05EA \u05D4\u05D0\u05E8\u05D5\u05DF"],["Carcass and shelves","\u05D2\u05D5\u05E3 \u05D5\u05DE\u05D3\u05E4\u05D9\u05DD"],["Vanity flap","\u05D3\u05DC\u05EA \u05E9\u05D9\u05E8\u05D5\u05EA \u05D0\u05D2\u05D5\u05D6"],["Basin","\u05DB\u05D9\u05D5\u05E8"],["Tap","\u05D1\u05E8\u05D6"],["Pulls and hanging rails","\u05D9\u05D3\u05D9\u05D5\u05EA \u05D5\u05DE\u05D5\u05D8\u05D5\u05EA \u05EA\u05DC\u05D9\u05D9\u05D4"],["Mirrored fronts","\u05D7\u05D6\u05D9\u05EA\u05D5\u05EA \u05DE\u05E8\u05D0\u05D4"],["Recesses and appliance","\u05E9\u05E7\u05E2\u05D9\u05DD \u05D5\u05DE\u05DB\u05E9\u05D9\u05E8"],["LED diffuser","\u05DE\u05E4\u05D6\u05E8 \u05EA\u05D0\u05D5\u05E8\u05EA \u05DC\u05D3"],["Natural oak","\u05D0\u05DC\u05D5\u05DF \u05D8\u05D1\u05E2\u05D9"],["Smoked walnut","\u05D0\u05D2\u05D5\u05D6 \u05DE\u05E2\u05D5\u05E9\u05DF"],["Chalk","\u05D2\u05D9\u05E8 \u05DE\u05D0\u05D8"],["Moss","\u05D9\u05E8\u05D5\u05E7 \u05D8\u05D7\u05D1"],["Clay","\u05D7\u05D9\u05DE\u05E8 \u05D8\u05E8\u05E7\u05D5\u05D8\u05D4"],["Brushed brass","\u05E4\u05DC\u05D9\u05D6 \u05DE\u05D5\u05D1\u05E8\u05E9"],["Graphite","\u05D2\u05E8\u05E4\u05D9\u05D8"],["Satin nickel","\u05E0\u05D9\u05E7\u05DC \u05E1\u05D0\u05D8\u05DF"],["Oak","\u05D0\u05DC\u05D5\u05DF"],["Walnut","\u05D0\u05D2\u05D5\u05D6"],["White","\u05DC\u05D1\u05DF"],["Black","\u05E9\u05D7\u05D5\u05E8"],["Gray","\u05D0\u05E4\u05D5\u05E8"],["Brass","\u05E4\u05DC\u05D9\u05D6"],["Chrome","\u05DB\u05E8\u05D5\u05DD"],["EGGER U702 PM \xB7 matte cashmere","EGGER U702 PM \xB7 \u05E7\u05E9\u05DE\u05D9\u05E8 \u05DE\u05D0\u05D8"],["EGGER F416 ST10 \xB7 fabric effect","EGGER F416 ST10 \xB7 \u05DE\u05E8\u05E7\u05DD \u05D1\u05D3"],["Oberflex \xB7 American walnut","Oberflex \xB7 \u05D0\u05D2\u05D5\u05D6 \u05D0\u05DE\u05E8\u05D9\u05E7\u05D0\u05D9"],["Dekton Khalo \xB7 polished stone approximation","\u05D3\u05E7\u05D8\u05D5\u05DF Khalo \xB7 \u05D0\u05D1\u05DF \u05DE\u05DC\u05D5\u05D8\u05E9\u05EA (\u05DC\u05D4\u05DE\u05D7\u05E9\u05D4)"],["hansgrohe \xB7 brushed bronze","hansgrohe \xB7 \u05D1\u05E8\u05D5\u05E0\u05D6\u05D4 \u05DE\u05D5\u05D1\u05E8\u05E9\u05EA"],["Dark brushed brass","\u05E4\u05DC\u05D9\u05D6 \u05DE\u05D5\u05D1\u05E8\u05E9 \u05DB\u05D4\u05D4"],["Polished mirror \xB7 illustrative metallic surface","\u05DE\u05E8\u05D0\u05D4 \u05DE\u05DC\u05D5\u05D8\u05E9\u05EA \xB7 \u05DE\u05E9\u05D8\u05D7 \u05DE\u05EA\u05DB\u05EA\u05D9 \u05DC\u05D4\u05DE\u05D7\u05E9\u05D4"],["Neutral graphite","\u05D2\u05E8\u05E4\u05D9\u05D8 \u05E0\u05D9\u05D8\u05E8\u05DC\u05D9"],["Opal white","\u05DC\u05D1\u05DF \u05D0\u05D5\u05E4\u05D0\u05DC"],["Handle style","\u05E1\u05D2\u05E0\u05D5\u05DF \u05D9\u05D3\u05D9\u05D5\u05EA"],["Bar pulls","\u05D9\u05D3\u05D9\u05D5\u05EA \u05DE\u05D5\u05D8"],["Round knobs","\u05DB\u05E4\u05EA\u05D5\u05E8\u05D9\u05DD \u05E2\u05D2\u05D5\u05DC\u05D9\u05DD"],["Open bay","\u05DE\u05D3\u05E4\u05D9 \u05EA\u05E6\u05D5\u05D2\u05D4"],["One shelf","\u05DE\u05D3\u05E3 \u05D0\u05D7\u05D3"],["Two shelves","\u05E9\u05E0\u05D9 \u05DE\u05D3\u05E4\u05D9\u05DD"],["No shelves","\u05DC\u05DC\u05D0 \u05DE\u05D3\u05E4\u05D9\u05DD"],["Base style","\u05E1\u05D2\u05E0\u05D5\u05DF \u05D1\u05E1\u05D9\u05E1"],["Timber feet","\u05E8\u05D2\u05DC\u05D9 \u05E2\u05E5"],["Recessed plinth","\u05E6\u05D5\u05E7\u05DC \u05E9\u05E7\u05D5\u05E2"],["Left door","\u05D3\u05DC\u05EA \u05E9\u05DE\u05D0\u05DC\u05D9\u05EA"],["Right door","\u05D3\u05DC\u05EA \u05D9\u05DE\u05E0\u05D9\u05EA"],["Upper drawer","\u05DE\u05D2\u05D9\u05E8\u05D4 \u05E2\u05DC\u05D9\u05D5\u05E0\u05D4"],["Lower drawer","\u05DE\u05D2\u05D9\u05E8\u05D4 \u05EA\u05D7\u05EA\u05D5\u05E0\u05D4"],["Drawer","\u05DE\u05D2\u05D9\u05E8\u05D4"],["Door","\u05D3\u05DC\u05EA"],["Drop front","\u05D3\u05DC\u05EA \u05E0\u05D5\u05E4\u05DC\u05EA"],["Sliding door","\u05D3\u05DC\u05EA \u05D4\u05D6\u05D6\u05D4"],["Display bay light","\u05EA\u05D0\u05D5\u05E8\u05EA \u05EA\u05D0 \u05EA\u05E6\u05D5\u05D2\u05D4"],["Task lamp","\u05DE\u05E0\u05D5\u05E8\u05EA \u05DE\u05E9\u05D9\u05DE\u05D4"],["Mirror-side LED strips","\u05E4\u05E1\u05D9 \u05DC\u05D3 \u05D1\u05E6\u05D9\u05D3\u05D9 \u05D4\u05DE\u05E8\u05D0\u05D4"],["B \xB7 hanging bay drawer 1","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05EA \u05EA\u05DC\u05D9\u05D9\u05D4 1"],["B \xB7 hanging bay drawer 2","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05EA \u05EA\u05DC\u05D9\u05D9\u05D4 2"],["B \xB7 hanging bay drawer 3","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05EA \u05EA\u05DC\u05D9\u05D9\u05D4 3"],["B \xB7 shelving bay drawer 1","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05EA \u05DE\u05D3\u05E4\u05D9\u05DD 1"],["B \xB7 shelving bay drawer 2","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05EA \u05DE\u05D3\u05E4\u05D9\u05DD 2"],["B \xB7 shelving bay drawer 3","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05EA \u05DE\u05D3\u05E4\u05D9\u05DD 3"],["B \xB7 drawer above mini fridge","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05DE\u05E2\u05DC \u05DE\u05D9\u05E0\u05D9\u05BE\u05D1\u05E8"],["B \xB7 short drawer","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E7\u05E6\u05E8\u05D4"],["B \xB7 full-width drawer 1","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E8\u05D7\u05D1\u05D4 1"],["B \xB7 full-width drawer 2","\u05E6\u05D9\u05E8 B \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E8\u05D7\u05D1\u05D4 2"],["B \xB7 left door","\u05E6\u05D9\u05E8 B \xB7 \u05D3\u05DC\u05EA \u05E9\u05DE\u05D0\u05DC\u05D9\u05EA"],["B \xB7 middle door","\u05E6\u05D9\u05E8 B \xB7 \u05D3\u05DC\u05EA \u05D0\u05DE\u05E6\u05E2\u05D9\u05EA"],["B \xB7 utility door","\u05E6\u05D9\u05E8 B \xB7 \u05D3\u05DC\u05EA \u05EA\u05D0 \u05E9\u05D9\u05E8\u05D5\u05EA"],["B \xB7 right bay left door","\u05E6\u05D9\u05E8 B \xB7 \u05D3\u05DC\u05EA \u05E9\u05DE\u05D0\u05DC\u05D9\u05EA (\u05EA\u05D0 \u05D9\u05DE\u05D9\u05DF)"],["B \xB7 right bay right door","\u05E6\u05D9\u05E8 B \xB7 \u05D3\u05DC\u05EA \u05D9\u05DE\u05E0\u05D9\u05EA (\u05EA\u05D0 \u05D9\u05DE\u05D9\u05DF)"],["B \xB7 mirrored storage","\u05E6\u05D9\u05E8 B \xB7 \u05D0\u05E8\u05D5\u05DF \u05DE\u05E8\u05D0\u05D4"],["B \xB7 walnut sink service flap","\u05E6\u05D9\u05E8 B \xB7 \u05E7\u05DC\u05D0\u05E4\u05EA \u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05DB\u05D9\u05D5\u05E8"],["A \xB7 internal drawer 1","\u05E6\u05D9\u05E8 A \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E4\u05E0\u05D9\u05DE\u05D9\u05EA 1"],["A \xB7 internal drawer 2","\u05E6\u05D9\u05E8 A \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E4\u05E0\u05D9\u05DE\u05D9\u05EA 2"],["A \xB7 internal drawer 3","\u05E6\u05D9\u05E8 A \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E4\u05E0\u05D9\u05DE\u05D9\u05EA 3"],["A \xB7 internal drawer 4","\u05E6\u05D9\u05E8 A \xB7 \u05DE\u05D2\u05D9\u05E8\u05D4 \u05E4\u05E0\u05D9\u05DE\u05D9\u05EA 4"],["A \xB7 door 1","\u05E6\u05D9\u05E8 A \xB7 \u05D3\u05DC\u05EA 1"],["A \xB7 door 2","\u05E6\u05D9\u05E8 A \xB7 \u05D3\u05DC\u05EA 2"],["Cabinet structure","\u05E9\u05DC\u05D3 \u05D4\u05D0\u05E8\u05D5\u05DF"],["Reference person","\u05D3\u05DE\u05D5\u05EA \u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4"],["hardware setback and shelf spacing","\u05DE\u05D9\u05E7\u05D5\u05DD \u05D9\u05D3\u05D9\u05D5\u05EA \u05D5\u05DE\u05E8\u05D5\u05D5\u05D7 \u05DE\u05D3\u05E4\u05D9\u05DD"],["switches.bay_light","\u05EA\u05D0\u05D5\u05E8\u05EA \u05EA\u05D0 \u05D4\u05EA\u05E6\u05D5\u05D2\u05D4"],["return-and-bay-widths","\u05E8\u05D5\u05D7\u05D1\u05D9 \u05EA\u05D0\u05D9\u05DD \u05D5\u05E4\u05D9\u05E0\u05D4"],["wardrobe-hardware","\u05E4\u05E8\u05D6\u05D5\u05DC, \u05E2\u05D5\u05D1\u05D9\u05D9 \u05E4\u05DC\u05D8\u05D5\u05EA \u05D5\u05D2\u05D5\u05D5\u05E0\u05D9\u05DD"],["vanity","\u05E0\u05D9\u05E9\u05EA \u05DB\u05D9\u05D5\u05E8 \u05D5\u05DE\u05E8\u05D0\u05D4"],["mirror-leds","\u05EA\u05D0\u05D5\u05E8\u05EA \u05DC\u05D3 \u05E1\u05D1\u05D9\u05D1 \u05D4\u05DE\u05E8\u05D0\u05D4"],["pull-down-hanging","\u05DE\u05E0\u05D2\u05E0\u05D5\u05DF \u05EA\u05DC\u05D9\u05D9\u05D4 \u05E0\u05E9\u05DC\u05E3"],["post-and-site","\u05E2\u05DE\u05D5\u05D3 \u05E7\u05D9\u05D9\u05DD \u05D5\u05D4\u05EA\u05D0\u05DE\u05D4 \u05DC\u05E9\u05D8\u05D7"],["dimensions.width","\u05E8\u05D5\u05D7\u05D1 \u05DB\u05D5\u05DC\u05DC"],["dimensions.height","\u05D2\u05D5\u05D1\u05D4 \u05DB\u05D5\u05DC\u05DC"],["dimensions.depth","\u05E2\u05D5\u05DE\u05E7 \u05DB\u05D5\u05DC\u05DC"]]);function vb(i,e){return e!=="he"||typeof i!="string"?i:yb.get(i)??i}function Ad(i="he"){let e=i==="en"?"en":"he",t=vm[e];return{lang:e,dir:e==="he"?"rtl":"ltr",axes:t.axes,mmUnit:t.mmUnit,t(n,s={}){let r=t[n]??vm.en[n]??n;return String(r).replace(/\{(\w+)\}/g,(o,a)=>a in s?String(s[a]):"")},term(n){return vb(n,e)}}}function Ed({spec:i,state:e,brand:t=null,tr:n,ledTempId:s="3500",backdropMode:r="studio"}){let o=n.term(i.name),a=n.term(i.description),l=t?.businessName||n.t("brandName"),c=t?.description||"",h=t?.logo||null,u=e.dimensions,f=`${u.width.toLocaleString("en-US")} \xD7 ${u.depth.toLocaleString("en-US")} \xD7 ${u.height.toLocaleString("en-US")} ${n.mmUnit}`,d=new Date().toLocaleDateString(n.lang==="he"?"he-IL":"en-US"),m=(i.slots||[]).map(v=>{let w=e.finishes?.[v.id]||{index:0,tint:null},S=v.finishes?.[w.index]||v.finishes?.[0];return{slotId:v.id,label:n.term(v.label),presetName:S?n.term(S.name):"",swatch:w.tint||S?.color||"#cccccc",tint:w.tint?w.tint.toUpperCase():null}}),_=(i.options||[]).map(v=>({id:v.id,label:n.term(v.label),value:n.term(e.options?.[v.id]??v.defaultChoice)})),x=(i.switches||[]).some(v=>!!v.light)?{2700:"2700K",3500:"3500K",4500:"4500K"}[String(s)]||"3500K":null,y=[...new Set((i.evidence||[]).filter(v=>v.status==="estimated").map(v=>n.term(v.field)))],M=y.length?n.t("estimatesPrefix",{items:y.join(", ")}):n.t("noEstimates");return{modelName:o,description:a,businessName:l,businessDesc:c,logo:h,dimensionsText:f,dateText:d,finishes:m,options:_,ledKelvin:x,backdropMode:r,estimates:y,notesText:M,disclaimer:n.t("captionDisclaimer"),rtl:n.dir==="rtl"}}var mt=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!=null&&(n.textContent=t),n};function Pa(i,e,t,n){i.replaceChildren();let s=mt("article","spec-sheet");s.dir=e.rtl?"rtl":"ltr";let r=mt("header","ss-head"),o=mt("div","ss-brand-row");if(e.logo){let g=mt("img","ss-logo");g.src=e.logo,g.alt="",o.append(g)}let a=mt("div","ss-title-block"),l=mt("p","ss-brand-name",e.businessDesc?`${e.businessName} \xB7 ${e.businessDesc}`:e.businessName),c=mt("h3","ss-model-name",e.modelName),h=mt("p","ss-model-desc",e.description);a.append(l,c,h),o.append(a);let u=mt("div","ss-meta-box"),f=mt("div","ss-meta-item");f.append(mt("span","ss-meta-k",n.t("sheetDimensions")),mt("strong","ss-meta-v ss-ltr",e.dimensionsText));let d=mt("div","ss-meta-item");d.append(mt("span","ss-meta-k",n.t("sheetDate")),mt("strong","ss-meta-v ss-ltr",e.dateText)),u.append(f,d),r.append(o,u);let m=mt("div","ss-grid"),_=[["studio",n.t("sheetViewStudio"),t.studio],["front",n.t("sheetViewFront"),t.front],["side",n.t("sheetViewSide"),t.side],["interior",n.t("sheetViewInterior"),t.interior]];for(let[,g,b]of _){let L=mt("figure","ss-view"),I=mt("img");I.src=b,I.alt=g,L.append(I,mt("figcaption","ss-cap",g)),m.append(L)}let p=mt("div","ss-details"),x=mt("section","ss-card");x.append(mt("h4","ss-card-title",n.t("sheetFinishes")));let y=mt("ul","ss-fin-list");for(let g of e.finishes){let b=mt("li","ss-fin-item"),L=mt("span","ss-swatch");L.style.backgroundColor=g.swatch;let I=mt("div","ss-fin-text"),P=mt("strong",null,g.label),T=g.tint?`${g.presetName} (${n.t("sheetCustomTint")}: ${g.tint})`:g.presetName,D=mt("span",null,T);I.append(P,D),b.append(L,I),y.append(b)}x.append(y);let M=mt("section","ss-card");M.append(mt("h4","ss-card-title",n.t("sheetOptions")));let v=mt("ul","ss-opt-list");for(let g of e.options){let b=mt("li","ss-opt-item");b.append(mt("span","ss-opt-k",g.label),mt("strong","ss-opt-v",g.value)),v.append(b)}if(e.ledKelvin){let g=mt("li","ss-opt-item");g.append(mt("span","ss-opt-k",n.t("ledTempLabel")),mt("strong","ss-opt-v ss-ltr",e.ledKelvin)),v.append(g)}let w=mt("li","ss-opt-item");w.append(mt("span","ss-opt-k",n.t("backdropMode")),mt("strong","ss-opt-v",n.t(e.backdropMode==="room"?"backdropRoom":"backdropStudio"))),v.append(w),M.append(v);let S=mt("section","ss-card");S.append(mt("h4","ss-card-title",n.t("sheetNotes")),mt("p","ss-note-body",e.notesText),mt("p","ss-disclaimer",e.disclaimer)),p.append(x,M,S),s.append(r,m,p),i.append(s)}function bm(i){return new Promise(e=>{if(typeof i!="string"||!i.startsWith("data:image/")){e(null);return}let t=new Image;t.onload=()=>e(t),t.onerror=()=>e(null),t.src=i})}function Ca(i,e,t,n,s,r){i.beginPath(),i.roundRect(e,t,n,s,r)}async function Sm(i,e,t){let r=document.createElement("canvas");r.width=2400,r.height=1700;let o=r.getContext("2d");o.fillStyle="#f6f3ec",o.fillRect(0,0,2400,1700);let a=56,l=i.rtl,c=152;o.fillStyle="#fffdfa",Ca(o,a,a,2400-a*2,c,16),o.fill(),o.strokeStyle="#dad7cb",o.lineWidth=2,o.stroke();let h=0;if(i.logo){let O=await bm(i.logo);if(O){let $=O.naturalWidth||160,B=O.naturalHeight||64,V=Math.min(200/$,88/B),J=Math.max(1,Math.round($*V)),ue=Math.max(1,Math.round(B*V)),xe=l?2400-a-28-J:a+28,te=a+Math.round((c-ue)*.5);o.drawImage(O,xe,te,J,ue),h=J+24}}let u=l?2400-a-28-h:a+28+h,f=l?a+28:2400-a-28;o.textAlign=l?"right":"left",o.fillStyle="#244e3c",o.font="600 18px system-ui, -apple-system, sans-serif",o.textBaseline="top";let d=i.businessDesc?`${i.businessName} \xB7 ${i.businessDesc}`:i.businessName;o.fillText(d,u,a+22,1300),o.fillStyle="#1f231e",o.font='600 40px Georgia, "Times New Roman", serif',o.fillText(i.modelName,u,a+52,1320),o.fillStyle="#5c6459",o.font="400 20px system-ui, -apple-system, sans-serif",o.fillText(i.description,u,a+106,1320),o.textAlign=l?"left":"right",o.fillStyle="#5c6459",o.font="600 16px system-ui, -apple-system, sans-serif",o.fillText(t.t("sheetDimensions"),f,a+28),o.fillStyle="#1f231e",o.font="700 26px ui-monospace, SFMono-Regular, Consolas, monospace",o.fillText(i.dimensionsText,f,a+52),o.fillStyle="#5c6459",o.font="500 18px system-ui, -apple-system, sans-serif",o.fillText(`${t.t("sheetDate")}: ${i.dateText}`,f,a+96);let m=a+c+28,_=24,p=(2400-a*2-_)/2,x=528,y=44,M=[{key:"studio",label:t.t("sheetViewStudio"),col:l?1:0,row:0},{key:"front",label:t.t("sheetViewFront"),col:l?0:1,row:0},{key:"side",label:t.t("sheetViewSide"),col:l?1:0,row:1},{key:"interior",label:t.t("sheetViewInterior"),col:l?0:1,row:1}],v=await Promise.all(M.map(O=>bm(e[O.key])));M.forEach((O,$)=>{let B=a+O.col*(p+_),V=m+O.row*(x+_);o.fillStyle="#fffdfa",Ca(o,B,V,p,x,14),o.fill(),o.strokeStyle="#dad7cb",o.lineWidth=2,o.stroke();let J=v[$];if(J){let ue=x-y-4,xe=p-4,te=Math.min(xe/J.width,ue/J.height),pe=Math.round(J.width*te),ge=Math.round(J.height*te),De=B+2+Math.round((xe-pe)*.5),ye=V+2+Math.round((ue-ge)*.5);o.save(),Ca(o,B+2,V+2,xe,ue,12),o.clip(),o.drawImage(J,De,ye,pe,ge),o.restore()}o.fillStyle="#eae6dc",o.fillRect(B+2,V+x-y,p-4,1),o.fillStyle="#252923",o.font="600 18px system-ui, -apple-system, sans-serif",o.textAlign=l?"right":"left",o.textBaseline="middle",o.fillText(O.label,l?B+p-22:B+22,V+x-y*.5)});let w=m+x*2+_*2,S=1700-a-w,g=(2400-a*2-_*2)/3,b=(O,$)=>{let B=l?2-O:O,V=a+B*(g+_);return o.fillStyle="#fffdfa",Ca(o,V,w,g,S,14),o.fill(),o.strokeStyle="#dad7cb",o.lineWidth=2,o.stroke(),o.fillStyle="#244e3c",o.font="700 18px system-ui, -apple-system, sans-serif",o.textAlign=l?"right":"left",o.textBaseline="top",o.fillText($,l?V+g-24:V+24,w+20,g-48),V},L=b(0,t.t("sheetFinishes"));i.finishes.slice(0,6).forEach((O,$)=>{let B=$%2,V=Math.floor($/2),J=(g-56)/2,ue=l?L+g-24-B*(J+8):L+24+B*(J+8),xe=w+56+V*72,te=32,pe=l?ue-te:ue;o.fillStyle=O.swatch,Ca(o,pe,xe+4,te,te,6),o.fill(),o.strokeStyle="#b9b4a7",o.lineWidth=1.5,o.stroke();let ge=l?pe-12:pe+te+12;o.textAlign=l?"right":"left",o.fillStyle="#1f231e",o.font="600 17px system-ui, -apple-system, sans-serif",o.fillText(O.label,ge,xe+2,J-te-16),o.fillStyle="#5c6459",o.font="400 15px system-ui, -apple-system, sans-serif",o.fillText(O.tint?`${O.presetName} (${O.tint})`:O.presetName,ge,xe+24,J-te-16)});let I=b(1,t.t("sheetOptions"));[...i.options.map(O=>`${O.label}: ${O.value}`),...i.ledKelvin?[`${t.t("ledTempLabel")}: ${i.ledKelvin}`]:[],`${t.t("backdropMode")}: ${t.t(i.backdropMode==="room"?"backdropRoom":"backdropStudio")}`].slice(0,6).forEach((O,$)=>{o.fillStyle="#252923",o.font="500 17px system-ui, -apple-system, sans-serif",o.textAlign=l?"right":"left",o.fillText(O,l?I+g-24:I+24,w+58+$*34,g-48)});let T=b(2,t.t("sheetNotes"));o.textAlign=l?"right":"left",o.fillStyle="#474f45",o.font="400 17px system-ui, -apple-system, sans-serif";let D=i.notesText.split(/\s+/),A=[],N="";for(let O of D){let $=N?`${N} ${O}`:O;o.measureText($).width>g-48&&N?(A.push(N),N=O):N=$}return N&&A.push(N),A.slice(0,4).forEach((O,$)=>{o.fillText(O,l?T+g-24:T+24,w+58+$*28,g-48)}),o.fillStyle="#6f776c",o.font="600 15px system-ui, -apple-system, sans-serif",o.fillText(i.disclaimer,l?T+g-24:T+24,w+S-36,g-48),{blob:await new Promise((O,$)=>{r.toBlob(B=>B?O(B):$(new Error("Failed to encode spec sheet board PNG.")),"image/png")}),width:2400,height:1700}}var{spec:Vt,assets:bb,identity:Mm,brand:bn=null}=JSON.parse(document.getElementById("study-data").textContent),ie=i=>document.getElementById(i),sr="he",W=Ad(sr);document.documentElement.lang=W.lang;document.documentElement.dir=W.dir;var wm=i=>({lang:i.lang,dir:i.dir,axes:i.axes,mmUnit:i.mmUnit,term:i.term,formatCanvasLabel:e=>i.t("canvasAriaLabel",{name:e}),formatHotspot:(e,t,n)=>e==="joint"?n>.02?i.t("hotspotOpen",{label:t,pct:Math.round(n*100)}):i.t("hotspotClosed",{label:t}):n>=.5?i.t("hotspotOn",{label:t}):i.t("hotspotOff",{label:t})});ie("app").innerHTML=`<a id="skip-link" class="skip" href="#inspector"></a>
<header class="mast"><div class="brand"><img id="brand-logo" class="brand-logo" alt="" hidden><svg id="brand-mark-fallback" aria-hidden="true" viewBox="0 0 32 32"><path d="m4 10 12-6 12 6-12 6z M4 16l12 6 12-6 M4 22l12 6 12-6"/></svg><span id="brand-name"></span></div><span id="brand-sub" class="mast-note"></span><div class="actions"><div class="lang-switch" role="group" id="lang-group"><button id="lang-he" type="button" lang="he" aria-pressed="true">\u05E2\u05D1\u05E8\u05D9\u05EA</button><button id="lang-en" type="button" lang="en" aria-pressed="false">EN</button></div><button id="spec-sheet" type="button"></button><button id="export-png" type="button"></button><button id="load" type="button"></button><button id="save" type="button" class="primary"><span id="save-label"></span> <span aria-hidden="true">\u2193</span></button><input id="file" type="file" accept="application/json,.json" hidden></div></header>
<main><div class="intro"><div><p class="eyebrow"><span class="rule"></span><span id="eyebrow-study"></span></p><h1 id="name"></h1><p id="description" class="description"></p></div><span class="edition"><i></i><span id="edition-text"></span></span></div>
<div class="workbench"><section class="preview" aria-label="Furniture preview"><div class="stage"><div id="canvas-wrap"></div><div id="plate-id" class="plate-id" aria-hidden="true"></div><div id="hover-pill" aria-hidden="true" hidden><span class="hover-head"><span class="hover-swatch" aria-hidden="true"></span><strong class="hover-title"></strong><span class="hover-finish"></span></span><span class="hover-action"></span></div><div id="scene-message" role="status"></div></div>
<div class="camera-bar" role="toolbar" focusgroup="toolbar wrap" aria-controls="canvas-wrap">
<div id="group-views" class="toolbar-group" role="group">
<label class="camera-select"><span id="lbl-cam" class="sr-only"></span><select id="camera"><option value=""></option><option value="studio"></option><option value="front"></option><option value="side"></option><option value="top"></option><option value="back"></option></select></label>
<label class="camera-select"><span id="lbl-light" class="sr-only"></span><select id="lighting"><option value="daylight"></option><option value="gallery"></option><option value="crisp"></option><option value="evening"></option></select></label>
<label class="camera-select"><span id="lbl-backdrop" class="sr-only"></span><select id="backdrop"><option value="studio"></option><option value="room"></option></select></label>
<button id="projection" type="button" aria-pressed="false"></button>
<button id="xray-toggle" type="button" aria-pressed="false"></button>
<button id="ao-toggle" type="button" aria-pressed="true"></button>
</div>
<span role="separator" aria-orientation="vertical"></span>
<div id="group-orbit" class="nudges" dir="ltr" role="group"><span id="lbl-orbit" class="camera-label" aria-hidden="true"></span><button type="button" data-yaw="-15">\u2190</button><button type="button" data-yaw="15">\u2192</button><button type="button" data-pitch="10">\u2191</button><button type="button" data-pitch="-10">\u2193</button></div>
<span role="separator" aria-orientation="vertical"></span>
<div id="group-zoom" class="nudges" dir="ltr" role="group"><span id="lbl-zoom" class="camera-label" aria-hidden="true"></span><button type="button" data-zoom="0.84">\u2212</button><button type="button" data-zoom="1.19">+</button><button id="pins-toggle" type="button" aria-pressed="false"></button><button id="person-run" type="button" aria-pressed="false"></button><button id="quick-png" type="button"></button></div></div>
<div id="room-bar" class="room-bar" role="group" hidden><span id="lbl-room-wall" class="room-label"></span><div id="room-wall-swatches" class="room-swatches" role="group"></div><input id="room-wall-color" class="room-color-input" type="color"><label class="room-floor-wrap"><span id="lbl-room-floor" class="room-label"></span><select id="room-floor"></select></label></div>
<div class="facts"><div><span id="lbl-enclosure" class="eyebrow"></span><strong id="envelope"></strong></div><div><span id="lbl-scale-ref" class="eyebrow"></span><strong id="figure-summary"></strong></div></div><details class="notes"><summary id="notes-summary"><span id="about-title"></span></summary><p id="brand-about" class="brand-about" hidden></p><p id="about-body"></p><p id="estimates"></p></details></section>
<aside id="inspector" tabindex="-1"><p id="eyebrow-edit" class="eyebrow"></p><h2 id="heading-config"></h2><div id="mode-group" class="mode" role="group"><button id="furniture-tab" type="button" aria-pressed="true" aria-controls="furniture"></button><button id="person-tab" type="button" aria-pressed="false" aria-controls="person"></button></div><div id="furniture"></div><div id="person" hidden></div><div class="reset"><button id="reset" type="button" class="text-button"></button></div></aside></div>
<div id="notice" role="status" aria-live="polite"></div></main>
<dialog id="export-dialog" aria-labelledby="export-title"><form method="dialog" class="export-form"><div class="export-head"><h2 id="export-title"></h2><button id="exp-close" type="button" class="icon-close">\xD7</button></div><p id="export-hint" class="hint"></p><label class="field"><span id="lbl-exp-res" class="field-title"></span><select id="exp-scale"><option value="1"></option><option value="2" selected></option><option value="3"></option></select></label><p class="export-dims"><span id="lbl-exp-dims"></span><strong id="exp-dims">\u2014</strong></p><label class="field"><span id="lbl-exp-bg" class="field-title"></span><select id="exp-bg"><option value="studio"></option><option value="transparent"></option></select></label><label class="check-row"><input id="exp-guides" type="checkbox"><span id="lbl-exp-guides"></span></label><label class="check-row"><input id="exp-caption" type="checkbox"><span id="lbl-exp-caption"></span></label><div class="export-actions"><button id="exp-cancel" type="button"></button><button id="exp-go" type="button" class="primary"><span id="exp-go-label"></span> <span aria-hidden="true">\u2193</span></button></div></form></dialog>
<dialog id="sheet-dialog" aria-labelledby="sheet-title"><div class="sheet-shell"><div class="export-head"><h2 id="sheet-title"></h2><button id="sheet-close" type="button" class="icon-close">\xD7</button></div><p id="sheet-hint" class="hint"></p><div id="sheet-preview-body" class="sheet-preview-body"></div><div class="export-actions"><button id="sheet-cancel" type="button"></button><button id="sheet-print" type="button"></button><button id="sheet-png" type="button" class="primary"><span id="sheet-png-label"></span> <span aria-hidden="true">\u2193</span></button></div></div></dialog>`;var oo=ie("print-sheet");oo||(oo=document.createElement("div"),oo.id="print-sheet",document.body.append(oo));var oh=[...new Set(Vt.evidence.filter(i=>i.status==="estimated").map(i=>i.field))],Sb=Object.fromEntries(Vt.slots.map(i=>[i.id,i.finishes.length])),Mb=Vt.joints.length>0||(Vt.switches?.length??0)>0;Mb||(ie("pins-toggle").hidden=!0);var wb=Vt.joints.some(i=>i.type==="hinge"||i.type==="flap");wb||(ie("xray-toggle").hidden=!0);if(bn?.logo){let i=ie("brand-logo");i.src=bn.logo,i.hidden=!1,ie("brand-mark-fallback").hidden=!0}var yt=fh(Vt),It=null,Rd=0,Cd=!1,on=null,Tm=!1,Id=null,Da=null,Na="3500",ir="studio",Oi=Ea[0].hex,Ua=Cs[0].id,Ia=!1,La=!0,Fi=!1,Tn=null,ao=null,lo=null;for(let i of Ea){let e=document.createElement("button");e.type="button",e.className="room-swatch",e.dataset.wallHex=i.hex,e.dataset.wallKey=i.key,e.style.backgroundColor=i.hex,e.setAttribute("aria-pressed",String(i.hex===Oi)),ie("room-wall-swatches").append(e)}ie("room-wall-color").value=Oi;for(let i of Cs){let e=document.createElement("option");e.value=i.id,e.dataset.floorKey=i.key,ie("room-floor").add(e)}ie("room-floor").value=Ua;function Tt(i){ie("notice").textContent=i}function Tb(){let i=oh.map(n=>W.term(n));ie("estimates").textContent=i.length?W.t("estimatesPrefix",{items:i.join(", ")}):W.t("noEstimates");let e=ie("notes-summary"),t=e.querySelector(".est-badge");if(t&&t.remove(),oh.length){let n=document.createElement("span");n.className="est-badge",n.textContent=oh.length===1?W.t("estimateSingular"):W.t("estimatePlural",{count:oh.length}),e.append(" ",n)}}function Ld(){let i=yt.dimensions,e=yt.person;ie("envelope").textContent=`${i.width} \xD7 ${i.depth} \xD7 ${i.height} ${W.mmUnit}`,ie("figure-summary").textContent=e.visible?`${e.height} ${W.mmUnit} \xB7 ${W.t(e.pose==="seated"?"poseSeated":"poseStanding")}`:W.t("notShown")}function ls(i="immediate"){Ld(),i==="animate"&&(Cd=!0),It&&!Rd&&(Rd=requestAnimationFrame(()=>{Rd=0;let e=Cd;Cd=!1;try{It.update(yt,{animate:e})}catch(t){Tt(W.t("noticePreviewError",{message:t.message}))}}))}var Ab={getLedTemp:()=>Na,onLedTemp:i=>{Na=i,It?.setLedTemp(i),on?.sync(),Tt(W.t("noticeLedTemp",{kelvin:i}))},onMaterialNotice:(i,e)=>{Tt(W.t("matAppliedNotice",{name:i,slot:e}))}};function Eb(){return Fi?Tn?Tn.key==="waiting"?W.t("personAutoWaiting",{sec:Tn.sec}):Tn.key?W.t(Tn.key,{label:W.term(Tn.label||"")}):W.t("personAutoStarting"):W.t("personAutoStarting"):W.t("personAutoIdle")}function ah(){let i=ie("person-run");if(!i)return;i.setAttribute("aria-pressed",String(Fi)),i.textContent=Fi?W.t("personStop"):W.t("personRun");let e=Fi?W.t("personStopTitle"):W.t("personRunTitle");i.title=e,i.setAttribute("aria-label",e)}function Am(){if(!It){Tt(W.t("noticeWait3d"));return}yt.person.visible||(yt.person.visible=!0,on?.sync(),ls("immediate")),Fi=!0,Tn=null,It.setPersonAutoRun(!0),ah(),on?.sync(),Tt(W.t("noticePersonRunStart"))}function lh({resetPos:i=!1,quiet:e=!1}={}){let t=Fi;Fi=!1,Tn=null,i?It?.resetPersonPosition?.():It?.setPersonAutoRun?.(!1),ah(),on?.sync(),!e&&t&&Tt(W.t("noticePersonRunStop"))}var Rb={isRunning:()=>Fi,getStatusText:()=>Eb(),onRun:Am,onStop:()=>lh()};function ch(i="immediate",e=null){on=ym(ie("furniture"),ie("person"),Vt,yt,ls,W,e,Ab,Rb),ls(i)}function Em(){document.documentElement.lang=W.lang,document.documentElement.dir=W.dir;let i=W.term(Vt.name),e=bn?.businessName||W.t("brandName");document.title=`${i} \xB7 ${bn?.businessName||W.t("docTitleSuffix")}`,ie("skip-link").textContent=W.t("skip"),ie("brand-name").textContent=e,ie("brand-sub").textContent=bn?.description||W.t("brandSubtitle"),ie("lang-group").setAttribute("aria-label",W.t("langGroupLabel")),ie("lang-he").setAttribute("aria-pressed",String(sr==="he")),ie("lang-en").setAttribute("aria-pressed",String(sr==="en")),ie("spec-sheet").textContent=W.t("specSheetBtn"),ie("export-png").textContent=W.t("exportPng"),ie("load").textContent=W.t("loadSetup"),ie("save-label").textContent=W.t("saveSetup"),ie("eyebrow-study").textContent=W.t("objectStudy"),ie("name").textContent=i,ie("description").textContent=W.term(Vt.description),ie("edition-text").textContent=W.t("offlineEdition"),ie("plate-id").textContent=bn?.businessName?`${bn.businessName} / ${W.t("modelViewShort")}`:W.t("modelViewPlate");let t=ie("brand-about");bn?.description?(t.textContent=`${bn.businessName} \u2014 ${bn.description}`,t.hidden=!1):t.hidden=!0,ie("canvas-wrap").setAttribute("aria-label",W.t("canvasAriaLabel",{name:i})),Tm||(ie("scene-message").textContent=Id?W.t("webglUnavailable",{message:Id}):W.t("preparing3d"));let n=document.querySelector(".camera-bar");n.setAttribute("aria-label",W.t("viewportControls")),ie("group-views").setAttribute("aria-label",W.t("viewsAndLighting")),ie("group-orbit").setAttribute("aria-label",W.t("orbit")),ie("group-zoom").setAttribute("aria-label",W.t("zoom")),ie("lbl-cam").textContent=W.t("cameraPreset");let s=ie("camera"),r=[W.t("cameraViews"),W.t("viewStudio"),W.t("viewFront"),W.t("viewSide"),W.t("viewTop"),W.t("viewBack")];[...s.options].forEach((d,m)=>{d.textContent=r[m]}),ie("lbl-light").textContent=W.t("studioLighting");let o=ie("lighting"),a=[W.t("lightDaylight"),W.t("lightGallery"),W.t("lightCrisp"),W.t("lightEvening")];[...o.options].forEach((d,m)=>{d.textContent=a[m]}),ie("lbl-backdrop").textContent=W.t("backdropMode");let l=ie("backdrop"),c=[W.t("backdropStudio"),W.t("backdropRoom")];[...l.options].forEach((d,m)=>{d.textContent=c[m]}),ie("projection").textContent=W.t("orthographic"),ie("projection").title=W.t("orthographicTitle"),ie("xray-toggle").textContent=W.t("xrayToggle"),ie("xray-toggle").title=W.t("xrayTitle"),ie("ao-toggle").textContent=W.t("aoToggle"),ie("ao-toggle").title=W.t("aoTitle"),ie("room-bar").setAttribute("aria-label",W.t("roomSettings")),ie("lbl-room-wall").textContent=W.t("roomWall"),ie("lbl-room-floor").textContent=W.t("roomFloor"),ie("room-wall-color").setAttribute("aria-label",W.t("roomWallCustom")),ie("room-wall-color").title=W.t("roomWallCustom");for(let d of ie("room-wall-swatches").querySelectorAll(".room-swatch")){let m=W.t(d.dataset.wallKey);d.setAttribute("aria-label",m),d.title=m}for(let d of ie("room-floor").options)d.textContent=W.t(d.dataset.floorKey);ie("lbl-orbit").textContent=W.t("orbit"),ie("lbl-zoom").textContent=W.t("zoom");let h={"yaw:-15":W.t("orbitLeft"),"yaw:15":W.t("orbitRight"),"pitch:10":W.t("orbitUp"),"pitch:-10":W.t("orbitDown"),"zoom:0.84":W.t("zoomOut"),"zoom:1.19":W.t("zoomIn")};for(let d of n.querySelectorAll("[data-yaw],[data-pitch],[data-zoom]")){let m=d.dataset.yaw?`yaw:${d.dataset.yaw}`:d.dataset.pitch?`pitch:${d.dataset.pitch}`:`zoom:${d.dataset.zoom}`;d.setAttribute("aria-label",h[m]),d.title=h[m]}ie("pins-toggle").textContent=W.t("pins"),ie("pins-toggle").title=W.t("pinsTitle"),ah(),ie("quick-png").textContent=W.t("quickPng"),ie("quick-png").setAttribute("aria-label",W.t("quickPngTitle")),ie("quick-png").title=W.t("quickPngTitle"),ie("lbl-enclosure").textContent=W.t("enclosureLabel"),ie("lbl-scale-ref").textContent=W.t("scaleReference"),ie("about-title").textContent=W.t("aboutStudy"),ie("about-body").textContent=W.t("aboutBody"),Tb(),ie("eyebrow-edit").textContent=W.t("editStudy"),ie("heading-config").textContent=W.t("configuration"),ie("mode-group").setAttribute("aria-label",W.t("categoryGroup")),ie("furniture-tab").textContent=W.t("tabFurniture"),ie("person-tab").textContent=W.t("tabPerson"),ie("reset").textContent=W.t("resetDefaults"),ie("export-title").textContent=W.t("exportTitle"),ie("exp-close").setAttribute("aria-label",W.t("closeDialog")),ie("export-hint").textContent=W.t("exportHint"),ie("lbl-exp-res").textContent=W.t("resolution");let u=[W.t("scale1"),W.t("scale2"),W.t("scale3")];[...ie("exp-scale").options].forEach((d,m)=>{d.textContent=u[m]}),ie("lbl-exp-dims").textContent=W.t("outputSize"),ie("lbl-exp-bg").textContent=W.t("backdrop");let f=[W.t("bgStudio"),W.t("bgTransparent")];[...ie("exp-bg").options].forEach((d,m)=>{d.textContent=f[m]}),ie("lbl-exp-guides").textContent=W.t("includeGuides"),ie("lbl-exp-caption").textContent=W.t("includeCaption"),ie("exp-cancel").textContent=W.t("cancel"),ie("exp-go-label").textContent=W.t("downloadPng"),ie("sheet-title").textContent=W.t("specSheetTitle"),ie("sheet-close").setAttribute("aria-label",W.t("specSheetClose")),ie("sheet-hint").textContent=W.t("specSheetHint"),ie("sheet-cancel").textContent=W.t("cancel"),ie("sheet-print").textContent=W.t("specSheetPrint"),ie("sheet-png-label").textContent=W.t("specSheetPng"),Fa?.open&&lo&&(ao=Ed({spec:Vt,state:yt,brand:bn,tr:W,ledTempId:Na,backdropMode:ir}),Pa(ie("sheet-preview-body"),ao,lo,W),Pa(oo,ao,lo,W))}function Rm(i,{announce:e=!1}={}){if(i!=="he"&&i!=="en")return;let t=new Set([...ie("inspector").querySelectorAll("details.section[open]")].map(s=>s.dataset.section)),n=on?.getSelectedSlot?.()??null;sr=i,W=Ad(sr),Em(),ch("immediate",{openSections:t,selectedSlot:n}),It?.setLocale(wm(W)),Da&&Dd(Da),Oa.open&&hh(),e&&Tt(W.t("noticeLangSwitched"))}ie("lang-he").addEventListener("click",()=>{sr!=="he"&&Rm("he",{announce:!0})});ie("lang-en").addEventListener("click",()=>{sr!=="en"&&Rm("en",{announce:!0})});for(let i of["furniture","person"])ie(`${i}-tab`).addEventListener("click",()=>{for(let e of["furniture","person"])ie(e).hidden=e!==i,ie(`${e}-tab`).setAttribute("aria-pressed",String(e===i))});ie("reset").addEventListener("click",()=>{lh({resetPos:!0,quiet:!0}),yt=fh(Vt),ir="studio",Ia=!1,La=!0,Na="3500",ie("lighting").value="daylight",ie("backdrop").value="studio",ie("room-bar").hidden=!0,ie("xray-toggle").setAttribute("aria-pressed","false"),ie("ao-toggle").setAttribute("aria-pressed","true"),It?.setLighting("daylight"),It?.setBackdrop("studio"),It?.setXray(!1),It?.setAO(!0),It?.setLedTemp("3500"),ch("animate"),It?.view("studio"),Tt(W.t("noticeDefaultsRestored"))});var Bi=i=>i.getAttribute("aria-disabled")==="true";ie("camera").addEventListener("change",i=>{if(Bi(i.target)){i.target.value="";return}i.target.value&&It?.view(i.target.value),i.target.value=""});ie("lighting").addEventListener("change",i=>{if(Bi(i.target))return;let e=i.target.value;It?.setLighting(e),e==="evening"&&Vt.switches?.some(t=>!!t.light)?Tt(W.t("noticeEveningLightsTip")):Tt(W.t("noticeLighting",{name:i.target.selectedOptions[0].textContent}))});ie("backdrop").addEventListener("change",i=>{Bi(i.target)||(ir=i.target.value==="room"?"room":"studio",ie("room-bar").hidden=ir!=="room",It?.setBackdrop(ir),Tt(W.t(ir==="room"?"noticeBackdropRoom":"noticeBackdropStudio")))});function Cm(i){let e=i.toLowerCase();for(let t of ie("room-wall-swatches").querySelectorAll(".room-swatch"))t.setAttribute("aria-pressed",String(t.dataset.wallHex.toLowerCase()===e))}ie("room-wall-swatches").addEventListener("click",i=>{let e=i.target.closest(".room-swatch");e&&(Oi=e.dataset.wallHex,ie("room-wall-color").value=Oi,Cm(Oi),It?.setRoomStyle({wallColor:Oi,floorKind:Ua}))});ie("room-wall-color").addEventListener("input",i=>{Oi=i.target.value,Cm(Oi),It?.setRoomStyle({wallColor:Oi,floorKind:Ua})});ie("room-floor").addEventListener("change",i=>{Ua=i.target.value,It?.setRoomStyle({wallColor:Oi,floorKind:Ua})});ie("xray-toggle").addEventListener("click",i=>{let e=i.currentTarget;Bi(e)||(Ia=e.getAttribute("aria-pressed")!=="true",e.setAttribute("aria-pressed",String(Ia)),It?.setXray(Ia),Tt(W.t(Ia?"noticeXrayOn":"noticeXrayOff")))});ie("ao-toggle").addEventListener("click",i=>{let e=i.currentTarget;Bi(e)||(La=e.getAttribute("aria-pressed")!=="true",e.setAttribute("aria-pressed",String(La)),It?.setAO(La),Tt(W.t(La?"noticeAoOn":"noticeAoOff")))});ie("projection").addEventListener("click",i=>{let e=i.currentTarget;if(Bi(e))return;let t=e.getAttribute("aria-pressed")!=="true";e.setAttribute("aria-pressed",String(t)),It?.setProjection(t?"orthographic":"perspective"),Tt(W.t(t?"noticeOrthoOn":"noticeOrthoOff"))});ie("pins-toggle").addEventListener("click",i=>{let e=i.currentTarget;if(Bi(e))return;let t=e.getAttribute("aria-pressed")!=="true";e.setAttribute("aria-pressed",String(t)),It?.setHotspots(t)});ie("person-run").addEventListener("click",i=>{Bi(i.currentTarget)||(Fi?lh():Am())});for(let i of document.querySelectorAll("[data-zoom],[data-yaw],[data-pitch]"))i.addEventListener("click",()=>{if(Bi(i))return;let e=i.dataset;e.zoom?It?.zoom(Number(e.zoom)):It?.turn(Number(e.yaw??0),Number(e.pitch??0))});function Cb(){let i=yt.dimensions,e=Vt.slots.map(t=>{let n=yt.finishes[t.id],s=t.finishes[n.index],r=n.tint?`${W.term(s.name)} (${n.tint.toUpperCase()})`:W.term(s.name);return`${W.term(t.label)}: ${r}`}).join("  \xB7  ");return{name:W.term(Vt.name),dimensions:`${i.width.toLocaleString("en-US")} \xD7 ${i.depth.toLocaleString("en-US")} \xD7 ${i.height.toLocaleString("en-US")} ${W.mmUnit}`,finishes:e||W.term(Vt.description),disclaimer:bn?`${bn.businessName} \xB7 ${W.t("captionVisualOnly")}`:W.t("captionDisclaimer"),brand:bn?{name:bn.businessName,logo:bn.logo,description:bn.description??null}:null,rtl:W.dir==="rtl"}}async function Pm(i){if(!It)return;let e=yt.dimensions,t=Vt.name.replace(/[^a-z\d]+/gi,"-").replace(/^-|-$/g,"").slice(0,64)||"furniture",{blob:n,width:s,height:r}=await It.exportPng({...i,caption:i.includeCaption?Cb():null}),o=URL.createObjectURL(n),a=document.createElement("a");a.href=o,a.download=`${t}-${e.width}x${e.depth}x${e.height}.png`,a.click(),setTimeout(()=>URL.revokeObjectURL(o),1e3),Tt(W.t("noticeExportedPng",{width:s,height:r}))}var Oa=ie("export-dialog"),Fa=ie("sheet-dialog");function hh(){let i=ie("canvas-wrap"),e=Number(ie("exp-scale").value)||2,t=Math.round(i.clientWidth*e),n=Math.round(i.clientHeight*e)+(ie("exp-caption").checked?Math.round(74*e):0);ie("exp-dims").textContent=t&&n?`${t.toLocaleString("en-US")} \xD7 ${n.toLocaleString("en-US")} px`:"\u2014"}ie("export-png").addEventListener("click",()=>{if(!It){Tt(W.t("noticeWait3d"));return}ie("exp-guides").checked=yt.showDimensions,hh(),Oa.showModal()});ie("exp-scale").addEventListener("change",hh);ie("exp-caption").addEventListener("change",hh);ie("exp-cancel").addEventListener("click",()=>Oa.close());ie("exp-close").addEventListener("click",()=>Oa.close());ie("exp-go").addEventListener("click",async()=>{let i=ie("exp-go");i.disabled=!0;try{await Pm({scale:Number(ie("exp-scale").value)||2,transparent:ie("exp-bg").value==="transparent",includeGuides:ie("exp-guides").checked,includeCaption:ie("exp-caption").checked}),Oa.close()}catch(e){Tt(W.t("noticeExportFailed",{message:e.message}))}finally{i.disabled=!1}});ie("quick-png").addEventListener("click",async i=>{if(!Bi(i.currentTarget))try{await Pm({scale:2,transparent:!1,includeGuides:yt.showDimensions,includeCaption:!1})}catch(e){Tt(W.t("noticeExportFailed",{message:e.message}))}});ie("spec-sheet").addEventListener("click",async()=>{if(!It){Tt(W.t("noticeWait3d"));return}let i=ie("spec-sheet");i.disabled=!0,Tt(W.t("specSheetGenerating"));try{let e=await It.captureSpecSheetViews(),t=Ed({spec:Vt,state:yt,brand:bn,tr:W,ledTempId:Na,backdropMode:ir});lo=e,ao=t,Pa(ie("sheet-preview-body"),t,e,W),Pa(oo,t,e,W),Tt(""),Fa.showModal()}catch(e){Tt(W.t("noticeSheetFailed",{message:e.message}))}finally{i.disabled=!1}});ie("sheet-cancel").addEventListener("click",()=>Fa.close());ie("sheet-close").addEventListener("click",()=>Fa.close());ie("sheet-print").addEventListener("click",()=>{window.print()});ie("sheet-png").addEventListener("click",async()=>{if(!ao||!lo)return;let i=ie("sheet-png");i.disabled=!0;try{let{blob:e,width:t,height:n}=await Sm(ao,lo,W),s=Vt.name.replace(/[^a-z\d]+/gi,"-").replace(/^-|-$/g,"").slice(0,64)||"furniture",r=yt.dimensions,o=URL.createObjectURL(e),a=document.createElement("a");a.href=o,a.download=`${s}-${r.width}x${r.depth}x${r.height}-spec-sheet.png`,a.click(),setTimeout(()=>URL.revokeObjectURL(o),1e3),Tt(W.t("noticeSheetPng",{width:t,height:n})),Fa.close()}catch(e){Tt(W.t("noticeSheetFailed",{message:e.message}))}finally{i.disabled=!1}});ie("save").addEventListener("click",()=>{let i={};for(let r of Vt.slots){let o=yt.finishes[r.id],a=Sb[r.id]??r.finishes.length;if(o.index>=a){let l=r.finishes[o.index];i[r.id]={index:0,tint:o.tint||l?.color||r.finishes[0].color}}else i[r.id]={index:o.index,tint:o.tint}}let e={...yt,finishes:i},t=new Blob([JSON.stringify({format:"form-study/setup@1",model:Mm,state:e},null,2)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`${Vt.name.replace(/[^a-z\d]+/gi,"-").slice(0,64)||"furniture"}-setup.json`,s.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3),Tt(W.t("noticeSetupSaved"))});ie("load").addEventListener("click",()=>ie("file").click());ie("file").addEventListener("change",async i=>{let e=i.target.files[0];if(i.target.value="",!!e)try{if(e.size>262144)throw new Error(W.t("errSetupTooLarge"));let t=JSON.parse(await e.text());if(t?.format!=="form-study/setup@1"||t.model!==Mm)throw new Error(W.t("errWrongModel"));let n=Nd(Vt,t.state);lh({resetPos:!0,quiet:!0}),yt=n,ch(),Tt(W.t("noticeSetupRestored"))}catch(t){Tt(W.t("noticeSetupFailed",{message:t.message}))}});if(!("focusGroup"in HTMLElement.prototype)){let i=document.querySelector(".camera-bar"),e=[...i.querySelectorAll("button, select")].filter(t=>!t.hidden);e.forEach((t,n)=>{t.tabIndex=n?-1:0}),i.addEventListener("focusin",({target:t})=>{e.includes(t)&&e.forEach(n=>{n.tabIndex=n===t?0:-1})}),i.addEventListener("keydown",t=>{let n=e.indexOf(document.activeElement);if(n<0)return;let s=getComputedStyle(i).direction==="rtl",r=-1;t.key==="ArrowRight"?r=(n+(s?-1:1)+e.length)%e.length:t.key==="ArrowLeft"?r=(n+(s?1:-1)+e.length)%e.length:t.key==="Home"?r=0:t.key==="End"&&(r=e.length-1),r>=0&&(t.preventDefault(),e[r].focus())})}function Pb(i){if(!i?.action)return null;let{action:e,slotId:t}=i,n=W.term(e.label),s="",r="",o="";if(t&&yt.finishes[t]){let a=Vt.slots.find(h=>h.id===t),l=yt.finishes[t],c=a?.finishes[l.index];if(c){o=l.tint||c.color;let h=W.term(c.name);r=l.tint?`${h} (${l.tint.toUpperCase()})`:h}}if(e.type==="switch"){let a=!!yt.switches[e.id],l=Vt.switches?.find(c=>c.id===e.id);a&&l?.light?.color&&(o=l.light.color),r=a?W.t("switchOn"):W.t("switchOff"),s=W.t(a?"hoverTurnOff":"hoverTurnOn")}else if(e.type==="joint"){let a=yt.joints[e.id]??0,l=Math.round(a*100);s=a>.02?W.t("hoverOpen",{pct:l}):W.t("hoverClosed")}else if(e.type==="option"){let a=W.term(yt.options[e.id]);n=`${W.term(e.label)}: ${a}`,s=W.t("hoverSwitchOption")}else e.type==="person"?(n=W.t("hoverPerson"),o=yt.person.top,r=`${yt.person.height} ${W.mmUnit}`,s=W.t(yt.person.pose==="standing"?"hoverSit":"hoverStand")):e.type==="slot"&&(s=W.t("hoverEditFinish"));return{title:n,finishName:r,swatchColor:o,actionText:s}}function Dd(i){let e=ie("hover-pill"),t=Pb(i);if(!t){e.hidden=!0;return}let n=e.querySelector(".hover-swatch");e.querySelector(".hover-title").textContent=t.title;let s=e.querySelector(".hover-finish");s.textContent=t.finishName,s.hidden=!t.finishName,t.swatchColor?(n.style.backgroundColor=t.swatchColor,n.hidden=!1):n.hidden=!0,e.querySelector(".hover-action").textContent=t.actionText,e.hidden=!1;let r=document.querySelector(".stage"),o=r.clientWidth,a=r.clientHeight,l=e.offsetWidth,c=e.offsetHeight,h=i.x+14,u=i.y-c-12;h+l>o-10&&(h=Math.max(10,i.x-l-14)),u<10&&(u=Math.min(a-c-10,i.y+18)),h=Math.max(10,Math.min(h,Math.max(10,o-l-10))),u=Math.max(10,Math.min(u,Math.max(10,a-c-10))),e.style.transform=`translate3d(${Math.round(h)}px, ${Math.round(u)}px, 0)`}function Ib(i){if(i)if(i.type==="switch"){let e=!yt.switches[i.id];yt.switches[i.id]=e,on?.sync(),ls("animate"),Tt(W.t(e?"noticeSwitchOn":"noticeSwitchOff",{label:W.term(i.label)}))}else if(i.type==="joint"){let e=yt.joints[i.id]>.02?0:1;yt.joints[i.id]=e,on?.sync(),ls("animate"),Tt(W.t(e?"noticeJointOpened":"noticeJointClosed",{label:W.term(i.label)}))}else if(i.type==="option"){let e=Vt.options.find(s=>s.id===i.id);if(!e)return;let t=e.choices.indexOf(yt.options[e.id]),n=e.choices[(t+1)%e.choices.length];yt.options[e.id]=n,on?.sync(),ls("immediate"),Tt(`${W.term(e.label)}: ${W.term(n)}.`)}else if(i.type==="person"){let e=yt.person.pose==="standing"?"seated":"standing";yt.person.pose=e,on?.sync(),ls("immediate"),Tt(W.t("noticePersonPose",{pose:W.t(e==="seated"?"poseSeated":"poseStanding")}))}else i.type==="slot"&&(on?.focusSlot(i.id),Tt(W.t("noticeEditingFinish",{label:W.term(i.label)})))}Em();ch();var Im=[...document.querySelectorAll(".camera-bar button,.camera-bar select")];for(let i of Im)i.setAttribute("aria-disabled","true");ie("export-png").disabled=!0;ie("spec-sheet").disabled=!0;var Pd={key:"",time:0};hm(ie("canvas-wrap"),Vt,bb,{onHover(i){Da=i,Dd(i)},onInteract(i){Ib(i),Da&&Dd(Da)},onJointBlocked({id:i,label:e,blockerLabel:t,progress:n}){yt.joints[i]=Math.round(n*1e3)/1e3,on?.sync();let s=performance.now(),r=`${i}:${t}`;(Pd.key!==r||s-Pd.time>400)&&(Pd={key:r,time:s},Tt(W.t("noticeBlocked",{label:W.term(e),blocker:W.term(t),pct:Math.round(n*100)})))},onJointSync(i){for(let[e,t]of Object.entries(i))yt.joints[e]=Math.round(t*1e3)/1e3;on?.sync()},onPersonAutoAction(i){if(i){if(i.phase==="stopped"){Fi=!1,Tn=null,ah(),on?.sync();return}if(i.phase==="waiting"){Tn={key:"waiting",sec:i.nextDelaySec??10},on?.sync();return}i.phase==="action"&&(i.actionType==="joint"?(yt.joints[i.id]=i.goal,Tn={key:i.isOpening?"personActOpen":"personActClose",label:i.label},on?.sync(),ls("animate"),Tt(W.t(Tn.key,{label:W.term(i.label)}))):i.actionType==="switch"?(yt.switches[i.id]=!!i.goal,Tn={key:i.isOpening?"personActSwitchOn":"personActSwitchOff",label:i.label},on?.sync(),ls("animate"),Tt(W.t(Tn.key,{label:W.term(i.label)}))):i.actionType==="sit"?(yt.person.pose="seated",Tn={key:"personActSit",label:i.label},Ld(),on?.sync(),Tt(W.t("personActSit",{label:W.term(i.label)}))):i.actionType==="stand"?(yt.person.pose="standing",Tn={key:"personActStand",label:i.label},Ld(),on?.sync(),Tt(W.t("personActStand"))):i.actionType==="inspect"&&(Tn={key:"personActInspect",label:i.label},on?.sync(),Tt(W.t("personActInspect",{label:W.term(i.label)}))))}}},wm(W)).then(i=>{It=i,Tm=!0,i.hasXrayTargets||(ie("xray-toggle").hidden=!0),i.update(yt,{animate:!1}),i.view("studio"),ie("scene-message").hidden=!0;for(let e of Im)e.removeAttribute("aria-disabled");ie("export-png").disabled=!1,ie("spec-sheet").disabled=!1}).catch(i=>{Id=i.message,ie("scene-message").textContent=W.t("webglUnavailable",{message:i.message})});})();
