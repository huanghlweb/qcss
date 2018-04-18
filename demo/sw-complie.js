var qcss=function(b){var e={dn:"display: none",di:"display: inline",dib:"display: inline-block",db:"display: block",dt:"display: table",dtc:"display: table-cell",m:"margin: ",ml:"margin-left: ",mt:"margin-top: ",mr:"margin-right: ",mb:"margin-bottom: ",ma:"margin: auto",mla:"margin-left: auto",mra:"margin-right: auto",p:"padding: ",pl:"padding-left: ",pt:"padding-top: ",pr:"padding-right: ",pb:"padding-bottom: ",l:"float: left",r:"float: right",bg:"background: ",bgc:"background-color: ",bgi:"background-image: ",bgr:"background-repeat: ",bgp:"background-position: ",c:"color: ",bd:"border: ",bdl:"border-left: ",bdr:"border-right: ",bdt:"border-top: ",bdb:"border-bottom: ",bds:"border-style: ",bdw:"border-width: ",bdc:"border-color: ",br:"border-radius: ",bbb:"box-sizing: border-box",o:"outline: ",f:"font-size: ",ff:"font-family: ",fs:"font-style: ",fw:"font-weight: ",b:"font-weight: bold",i:"font-style: italic",n:"font-weight: normal; font-style: normal",tdl:"text-decoration: underline",tdn:"text-decoration: none",tc:"text-align: center",tl:"text-align: left",tr:"text-align: right",tj:"text-align: justify",ti:"text-indent: ",cl:"clear: both",abs:"position: absolute",rel:"position: relative",fix:"position: fixed",op:"opacity: ",z:"zoom: ",zx:"z-index: ",h:"height: ",w:"width: ",minw:"min-width: ",maxw:"max-width: ",minh:"min-height: ",maxh:"max-height: ",lh:"line-height: ",v:"vertical-align: ",vt:"vertical-align: top",vm:"vertical-align: middle",vb:"vertical-align: bottom",poi:"cursor: pointer",def:"cursor: default",tex:"cursor: text",ovh:"overflow: hidden",ova:"overflow: auto",vh:"visibility: hidden",vv:"visibility: visible",prew:"white-space: pre-wrap",pre:"white-space: pre",nowrap:"white-space: nowrap",bk:"word-break: break-all",bkw:"word-wrap: break-word",ws:"word-spacing: ",ls:"letter-spacing: ",a:"animation: ",tsf:"transform: ",tsl:"transition: ",bs:"box-shadow: ",ts:"text-shadow: ",con:"content: ",center:"position: absolute; top: 0; bottom: 0; right: 0; left: 0; margin: auto",ell:"text-overflow: ellipsis; white-space: nowrap; overflow: hidden",clip:"position: absolute; clip: rect(0 0 0 0)"};var d={a:"auto",s:"solid",d:"dashed",tt:"transparent",cc:"currentColor",n:"normal",c:"center",rx:"repeat-x",ry:"repeat-y",no:"no-repeat",ih:"inherit",l:"left",t:"top",r:"right",b:"bottom"};var c={};b.replace(/\/\*([\w\W]*?)\*\//,function(g,f){f.split(";").forEach(function(j){var i=j.split("$")[1];if(i&&i.split(/=|:/).length==2){var h=i.split(/=|:/);if(h[1].trim()&&h[0].trim()){c[h[0].trim()]=h[1].trim()}}})});b=b.replace(/;base64,/g,"%%%%%%");b=b.replace(/:\/\//g,"#@#@#");var a=b.replace(/\{([\w\W]*?)\}/g,function(j,f){f=f.replace(/\/\*([\w\W]*?)\*\//g,"");var h="    ";var g="{\n"+h,i="\n}";if(/\{/.test(f)){i="\n"+h+"}";h=h+h;g="{"+f.split("{")[0]+"{\n"+h;f=f.split("{")[1]}return g+f.split(";").map(function(k){k=k.trim();if(!k){return""}if(k.indexOf(":")!=-1){return k}return k.replace(/^([a-z]+)(.*)$/g,function(n,l,m){m=(m||"").split(",").map(function(o){return(o||"").split(" ").map(function(p){p=p.trim();if(!p){return""}if(l=="l"){l="left: "}else{if(l=="t"){l="top: "}else{if(l=="r"){l="right: "}else{if(l=="b"){l="bottom: "}}}}if(!isNaN(p)){if(l=="lh"&&p<5){return p}else{if(/^(?:zx|op|z|fw)$/.test(l)==false&&p!="0"&&/^calc/.test(o.trim())==false){p=p+"px"}}}else{if(l=="tsl"){p=(e[p]||p).replace(":","").trim()}else{if(l!="a"){p=c[p]||d[p]||p}}}return p}).join(" ")}).join(", ");if(/:/.test(l)==false){l=e[l]||l+": "}m=m.trim();if(!m){l=l.split(";").map(function(o){return o.trim().replace(/:\s+/,": ")}).join(";\n"+h)}return l+m})}).join(";\n"+h).trim()+i}).replace(/\w\{/g,function(f){return f.replace("{"," {")}).replace(/\}(\.|#|\:|\[|\w)/g,function(f){return f.replace("}","}\n")}).replace(/^\s{8}/gm,"    ").replace(/^\s{4}\}/gm,"}");a=a.replace(/%%%%%%/g,";base64,").replace(/#@#@#/g,"://");return a};

self.addEventListener('fetch', function(event) {
  event.respondWith(async function () {
    if (/\.qcss/.test(event.request.url)) {
      let res = await fetch(event.request);
      let text = await res.text();
      let now  = +new Date();
      return new Response(qcss(text) + '/*'+ (+new Date() - now) +'ms*/', {
        headers: {
          'content-type': 'text/css; charset=utf-8'
        }
      });
    } else {
      return fetch(event.request);
    }
  }());
});