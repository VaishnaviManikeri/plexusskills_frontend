import{r as n,g as T,j as e}from"./index-D4T1pXsi.js";const F={title:"",description:"",category:"General",mediaType:"image",sourceType:"upload",mediaUrl:""},Q=o=>new Promise(s=>{try{const i=document.createElement("video");i.preload="metadata",i.muted=!0,i.playsInline=!0,i.src=URL.createObjectURL(o),i.onloadeddata=()=>{i.currentTime=Math.min(.5,(i.duration||1)/2)},i.onseeked=()=>{const c=document.createElement("canvas");c.width=i.videoWidth||400,c.height=i.videoHeight||300,c.getContext("2d").drawImage(i,0,0,c.width,c.height),s(c.toDataURL("image/jpeg",.8)),URL.revokeObjectURL(i.src)},i.onerror=()=>s(null)}catch{s(null)}}),Y=()=>e.jsx("div",{className:"ga-play-overlay",children:e.jsx("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"#fff",children:e.jsx("path",{d:"M8 5v14l11-7z"})})}),_=(o="")=>{const s=o.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return s?s[1]:null},O=o=>{if(o.thumbnailUrl)return o.thumbnailUrl;const s=o.mediaType==="video"?_(o.mediaUrl):null;return s?`https://img.youtube.com/vi/${s}/hqdefault.jpg`:""},X=({item:o,previewUrl:s})=>{const i=s||O(o)||(o.mediaType==="image"?o.mediaUrl:"");return o.mediaType==="video"?e.jsxs("div",{className:"ga-thumb ga-thumb--video",children:[i?e.jsx("img",{src:i,alt:o.title}):e.jsx("div",{className:"ga-thumb-fallback",children:"🎬"}),e.jsx(Y,{})]}):e.jsx("div",{className:"ga-thumb",children:i?e.jsx("img",{src:i,alt:o.title}):e.jsx("div",{className:"ga-thumb-fallback",children:"🖼️"})})};function ae(){const[o,s]=n.useState([]),[i,c]=n.useState(!0),[C,u]=n.useState(""),[m,h]=n.useState(null),[z,V]=n.useState("All"),[v,$]=n.useState(""),[q,U]=n.useState(!1),[f,I]=n.useState(null),[r,p]=n.useState(F),[b,y]=n.useState(null),[L,g]=n.useState(""),[R,M]=n.useState(!1),[j,w]=n.useState(null),[k,A]=n.useState(!1),x=n.useRef(null),S=n.useCallback(async()=>{var a,t,l;c(!0),u("");try{const d=await T.getAll();s(((a=d.data)==null?void 0:a.data)||[])}catch(d){u(((l=(t=d.response)==null?void 0:t.data)==null?void 0:l.error)||"Failed to load gallery items")}finally{c(!1)}},[]);n.useEffect(()=>{S()},[S]),n.useEffect(()=>{if(!m)return;const a=setTimeout(()=>h(null),3500);return()=>clearTimeout(a)},[m]);const E=()=>{p(F),y(null),g(""),I(null),x.current&&(x.current.value="")},B=()=>{E(),U(!0)},H=a=>{p({title:a.title||"",description:a.description||"",category:a.category||"General",mediaType:a.mediaType||"image",sourceType:a.sourceType||"upload",mediaUrl:a.sourceType==="url"?a.mediaUrl:""}),y(null),g(a.mediaType==="image"?a.mediaUrl:O(a)),I(a._id),U(!0)},N=()=>{U(!1),E()},W=async a=>{var l;const t=(l=a.target.files)==null?void 0:l[0];if(t)if(y(t),r.mediaType==="video"){g("");const d=await Q(t);g(d||"")}else g(URL.createObjectURL(t))},P=a=>{p(t=>({...t,mediaType:a})),y(null),g(""),x.current&&(x.current.value="")},Z=a=>{if(p(l=>({...l,mediaUrl:a})),r.mediaType==="image"){g(a.trim());return}const t=_(a);g(t?`https://img.youtube.com/vi/${t}/hqdefault.jpg`:"")},D=a=>{p(t=>({...t,sourceType:a})),y(null),g(""),x.current&&(x.current.value="")},J=async a=>{var t,l;if(a.preventDefault(),u(""),!r.title.trim()){u("Title is required");return}if(r.sourceType==="upload"&&!b&&!f){u("Please choose a file to upload");return}if(r.sourceType==="url"&&!r.mediaUrl.trim()){u("Please paste a media URL");return}M(!0);try{const d={title:r.title,description:r.description,category:r.category,mediaType:r.mediaType,sourceType:r.sourceType};r.sourceType==="url"&&(d.mediaUrl=r.mediaUrl),r.sourceType==="upload"&&b&&(d.file=b),f?(await T.update(f,d),h({type:"success",text:"Gallery item updated"})):(await T.create(d),h({type:"success",text:"Gallery item added"})),N(),S()}catch(d){u(((l=(t=d.response)==null?void 0:t.data)==null?void 0:l.error)||"Something went wrong. Please try again.")}finally{M(!1)}},K=async()=>{var a,t;if(j){A(!0);try{await T.delete(j),h({type:"success",text:"Gallery item deleted"}),s(l=>l.filter(d=>d._id!==j))}catch(l){h({type:"error",text:((t=(a=l.response)==null?void 0:a.data)==null?void 0:t.error)||"Failed to delete item"})}finally{A(!1),w(null)}}},G=o.filter(a=>{const t=z==="All"||a.mediaType===z,l=!v.trim()||a.title.toLowerCase().includes(v.toLowerCase())||(a.category||"").toLowerCase().includes(v.toLowerCase());return t&&l});return e.jsxs("div",{className:"ga-page",children:[e.jsx("style",{children:`
        .ga-page {
          --navy-900: #0b1f3a;
          --navy-700: #16305a;
          --navy-500: #2b4a80;
          --pink-500: #ec4899;
          --pink-600: #db2777;
          --pink-100: #fce7f3;
          --gray-50: #f7f8fb;
          --gray-100: #eef1f6;
          --gray-500: #64748b;
          --gray-900: #1e293b;
          min-height: 100vh;
          background: var(--gray-50);
          font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
          color: var(--gray-900);
        }
        .ga-header {
          background: linear-gradient(135deg, var(--navy-900), var(--navy-700));
          padding: 28px 32px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ga-header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.2px; }
        .ga-header p { margin: 4px 0 0; color: #cdd8ee; font-size: 13.5px; }
        .ga-btn {
          border: none; cursor: pointer; border-radius: 10px; font-weight: 600;
          font-size: 14px; padding: 10px 18px; transition: transform .12s ease, box-shadow .12s ease;
        }
        .ga-btn:active { transform: translateY(1px); }
        .ga-btn-primary { background: var(--pink-500); color: #fff; box-shadow: 0 6px 16px rgba(236,72,153,.35); }
        .ga-btn-primary:hover { background: var(--pink-600); }
        .ga-btn-ghost { background: rgba(255,255,255,.12); color: #fff; }
        .ga-btn-ghost:hover { background: rgba(255,255,255,.2); }
        .ga-btn-outline { background: #fff; color: var(--navy-900); border: 1.5px solid var(--gray-100); }
        .ga-btn-outline:hover { border-color: var(--pink-500); color: var(--pink-600); }
        .ga-btn-danger { background: #fff; color: #dc2626; border: 1.5px solid #fecaca; }
        .ga-btn-danger:hover { background: #fef2f2; }

        .ga-toolbar {
          display: flex; align-items: center; gap: 12px; padding: 20px 32px 0;
          flex-wrap: wrap;
        }
        .ga-tabs { display: flex; gap: 6px; background: #fff; padding: 4px; border-radius: 10px; border: 1px solid var(--gray-100); }
        .ga-tab {
          border: none; background: transparent; padding: 8px 16px; border-radius: 8px;
          font-size: 13.5px; font-weight: 600; color: var(--gray-500); cursor: pointer;
        }
        .ga-tab.active { background: var(--navy-900); color: #fff; }
        .ga-search {
          flex: 1; min-width: 200px; padding: 10px 14px; border-radius: 10px;
          border: 1px solid var(--gray-100); font-size: 14px; background: #fff;
        }
        .ga-search:focus { outline: none; border-color: var(--pink-500); }

        .ga-banner {
          margin: 16px 32px 0; padding: 12px 16px; border-radius: 10px; font-size: 14px; font-weight: 500;
        }
        .ga-banner.success { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
        .ga-banner.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

        .ga-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px; padding: 24px 32px 48px;
        }
        .ga-card {
          background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid var(--gray-100);
          transition: transform .15s ease, box-shadow .15s ease; display: flex; flex-direction: column;
        }
        .ga-card:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(11,31,58,.12); }
        .ga-thumb { position: relative; width: 100%; aspect-ratio: 4/3; background: var(--gray-100); overflow: hidden; }
        .ga-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ga-thumb-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 34px; background: linear-gradient(135deg,var(--navy-900),var(--navy-500)); }
        .ga-thumb--video .ga-thumb-fallback { color: #fce7f3; }
        .ga-play-overlay {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        }
        .ga-play-overlay svg { background: rgba(11,31,58,.55); border-radius: 999px; padding: 10px; box-shadow: 0 0 0 3px rgba(236,72,153,.55); }
        .ga-badge {
          position: absolute; top: 10px; left: 10px; background: var(--pink-500); color: #fff;
          font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; letter-spacing: .3px;
        }
        .ga-card-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .ga-card-title { font-size: 15px; font-weight: 700; color: var(--navy-900); line-height: 1.3; }
        .ga-card-cat { font-size: 12px; color: var(--pink-600); font-weight: 600; }
        .ga-card-desc { font-size: 13px; color: var(--gray-500); line-height: 1.4; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .ga-card-actions { display: flex; gap: 8px; margin-top: 6px; }
        .ga-card-actions .ga-btn { flex: 1; padding: 8px 10px; font-size: 13px; }

        .ga-empty { text-align: center; padding: 60px 20px; color: var(--gray-500); }
        .ga-empty .emoji { font-size: 40px; margin-bottom: 10px; }
        .ga-loading { padding: 60px; text-align: center; color: var(--gray-500); }

        .ga-modal-overlay {
          position: fixed; inset: 0; background: rgba(11,31,58,.55); display: flex;
          align-items: flex-start; justify-content: center; padding: 40px 16px; overflow-y: auto; z-index: 50;
        }
        .ga-modal {
          background: #fff; border-radius: 16px; width: 100%; max-width: 560px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,.3);
        }
        .ga-modal-header {
          background: linear-gradient(135deg, var(--navy-900), var(--navy-700)); color: #fff;
          padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;
        }
        .ga-modal-header h2 { margin: 0; font-size: 18px; }
        .ga-modal-close { background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; opacity: .8; }
        .ga-modal-close:hover { opacity: 1; }
        .ga-modal-body { padding: 22px 24px; max-height: 70vh; overflow-y: auto; }
        .ga-field { margin-bottom: 16px; }
        .ga-field label { display: block; font-size: 13px; font-weight: 600; color: var(--navy-900); margin-bottom: 6px; }
        .ga-field input[type="text"], .ga-field input[type="url"], .ga-field textarea, .ga-field select {
          width: 100%; padding: 10px 12px; border: 1.5px solid var(--gray-100); border-radius: 9px;
          font-size: 14px; font-family: inherit; box-sizing: border-box;
        }
        .ga-field input:focus, .ga-field textarea:focus, .ga-field select:focus { outline: none; border-color: var(--pink-500); }
        .ga-field textarea { resize: vertical; min-height: 70px; }
        .ga-row { display: flex; gap: 12px; }
        .ga-row .ga-field { flex: 1; }
        .ga-segmented { display: flex; gap: 8px; }
        .ga-segmented button {
          flex: 1; padding: 9px 0; border-radius: 9px; border: 1.5px solid var(--gray-100); background: #fff;
          font-size: 13.5px; font-weight: 600; color: var(--gray-500); cursor: pointer;
        }
        .ga-segmented button.active { border-color: var(--pink-500); background: var(--pink-100); color: var(--pink-600); }
        .ga-file-drop {
          border: 1.5px dashed var(--gray-100); border-radius: 10px; padding: 16px; text-align: center;
          background: var(--gray-50); cursor: pointer;
        }
        .ga-file-drop:hover { border-color: var(--pink-500); }
        .ga-preview-wrap { margin-top: 12px; display: flex; justify-content: center; }
        .ga-preview { position: relative; width: 100%; max-width: 260px; aspect-ratio: 4/3; border-radius: 10px; overflow: hidden; background: var(--gray-100); }
        .ga-preview img { width: 100%; height: 100%; object-fit: cover; }
        .ga-modal-footer { padding: 16px 24px 22px; display: flex; gap: 10px; justify-content: flex-end; }
        .ga-error-text { color: #dc2626; font-size: 13px; margin-bottom: 12px; font-weight: 500; }
        .ga-hint { font-size: 12px; color: var(--gray-500); margin-top: 6px; }

        .ga-confirm-overlay {
          position: fixed; inset: 0; background: rgba(11,31,58,.55); display: flex;
          align-items: center; justify-content: center; z-index: 60; padding: 16px;
        }
        .ga-confirm-box { background: #fff; border-radius: 14px; padding: 24px; max-width: 360px; text-align: center; }
        .ga-confirm-box h3 { margin: 0 0 8px; color: var(--navy-900); font-size: 17px; }
        .ga-confirm-box p { margin: 0 0 18px; color: var(--gray-500); font-size: 14px; }
        .ga-confirm-actions { display: flex; gap: 10px; }
        .ga-confirm-actions .ga-btn { flex: 1; }
      `}),e.jsxs("div",{className:"ga-header",children:[e.jsxs("div",{children:[e.jsx("h1",{children:"Gallery Manager"}),e.jsx("p",{children:"Add, edit, and organize photos and videos shown on the public Gallery page"})]}),e.jsx("button",{className:"ga-btn ga-btn-primary",onClick:B,children:"+ Add Media"})]}),e.jsxs("div",{className:"ga-toolbar",children:[e.jsx("div",{className:"ga-tabs",children:["All","image","video"].map(a=>e.jsx("button",{className:`ga-tab ${z===a?"active":""}`,onClick:()=>V(a),children:a==="All"?"All":a==="image"?"Images":"Videos"},a))}),e.jsx("input",{className:"ga-search",placeholder:"Search by title or category...",value:v,onChange:a=>$(a.target.value)})]}),m&&e.jsx("div",{className:`ga-banner ${m.type}`,children:m.text}),i?e.jsx("div",{className:"ga-loading",children:"Loading gallery items..."}):G.length===0?e.jsxs("div",{className:"ga-empty",children:[e.jsx("div",{className:"emoji",children:"🖼️"}),e.jsx("p",{children:o.length===0?"No gallery items yet. Add your first photo or video.":"Nothing matches your filters."})]}):e.jsx("div",{className:"ga-grid",children:G.map(a=>e.jsxs("div",{className:"ga-card",children:[e.jsx(X,{item:a}),e.jsx("span",{className:"ga-badge",style:{top:10,left:10},children:a.mediaType==="video"?"Video":"Image"}),e.jsxs("div",{className:"ga-card-body",children:[e.jsx("div",{className:"ga-card-title",children:a.title}),e.jsx("div",{className:"ga-card-cat",children:a.category}),a.description&&e.jsx("div",{className:"ga-card-desc",children:a.description}),e.jsxs("div",{className:"ga-card-actions",children:[e.jsx("button",{className:"ga-btn ga-btn-outline",onClick:()=>H(a),children:"Edit"}),e.jsx("button",{className:"ga-btn ga-btn-danger",onClick:()=>w(a._id),children:"Delete"})]})]})]},a._id))}),q&&e.jsx("div",{className:"ga-modal-overlay",onClick:N,children:e.jsxs("div",{className:"ga-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"ga-modal-header",children:[e.jsx("h2",{children:f?"Edit Gallery Item":"Add Gallery Item"}),e.jsx("button",{className:"ga-modal-close",onClick:N,children:"✕"})]}),e.jsxs("form",{onSubmit:J,children:[e.jsxs("div",{className:"ga-modal-body",children:[C&&e.jsx("div",{className:"ga-error-text",children:C}),e.jsxs("div",{className:"ga-field",children:[e.jsx("label",{children:"Media Type"}),e.jsxs("div",{className:"ga-segmented",children:[e.jsx("button",{type:"button",className:r.mediaType==="image"?"active":"",onClick:()=>P("image"),children:"🖼️ Image"}),e.jsx("button",{type:"button",className:r.mediaType==="video"?"active":"",onClick:()=>P("video"),children:"🎬 Video"})]})]}),e.jsxs("div",{className:"ga-field",children:[e.jsx("label",{children:"Source"}),e.jsxs("div",{className:"ga-segmented",children:[e.jsx("button",{type:"button",className:r.sourceType==="upload"?"active":"",onClick:()=>D("upload"),children:"⬆ Upload File"}),e.jsx("button",{type:"button",className:r.sourceType==="url"?"active":"",onClick:()=>D("url"),children:"🔗 Paste URL"})]})]}),r.sourceType==="upload"?e.jsxs("div",{className:"ga-field",children:[e.jsx("label",{children:r.mediaType==="video"?"Video file (any size)":"Image file"}),e.jsx("div",{className:"ga-file-drop",onClick:()=>{var a;return(a=x.current)==null?void 0:a.click()},children:b?b.name:f?"Click to replace the current file":"Click to choose a file"}),e.jsx("input",{ref:x,type:"file",accept:r.mediaType==="video"?"video/*":"image/*",onChange:W,style:{display:"none"}})]}):e.jsxs("div",{className:"ga-field",children:[e.jsx("label",{children:"Media URL"}),e.jsx("input",{type:"url",placeholder:r.mediaType==="video"?"YouTube link or direct .mp4 URL":"https://example.com/photo.jpg",value:r.mediaUrl,onChange:a=>Z(a.target.value)}),r.mediaType==="video"&&e.jsx("div",{className:"ga-hint",children:"Paste a YouTube link (played via embed) or a direct video file URL (e.g. ending in .mp4)."})]}),L&&e.jsx("div",{className:"ga-preview-wrap",children:e.jsxs("div",{className:"ga-preview",children:[e.jsx("img",{src:L,alt:"preview"}),r.mediaType==="video"&&e.jsx(Y,{})]})}),e.jsxs("div",{className:"ga-field",style:{marginTop:16},children:[e.jsx("label",{children:"Title"}),e.jsx("input",{type:"text",value:r.title,onChange:a=>p(t=>({...t,title:a.target.value})),placeholder:"e.g. Annual Sports Day 2026"})]}),e.jsx("div",{className:"ga-row",children:e.jsxs("div",{className:"ga-field",children:[e.jsx("label",{children:"Category"}),e.jsx("input",{type:"text",value:r.category,onChange:a=>p(t=>({...t,category:a.target.value})),placeholder:"e.g. Events"})]})}),e.jsxs("div",{className:"ga-field",children:[e.jsx("label",{children:"Description (optional)"}),e.jsx("textarea",{value:r.description,onChange:a=>p(t=>({...t,description:a.target.value})),placeholder:"Short caption shown with the media"})]})]}),e.jsxs("div",{className:"ga-modal-footer",children:[e.jsx("button",{type:"button",className:"ga-btn ga-btn-outline",onClick:N,children:"Cancel"}),e.jsx("button",{type:"submit",className:"ga-btn ga-btn-primary",disabled:R,children:R?"Saving...":f?"Save Changes":"Add to Gallery"})]})]})]})}),j&&e.jsx("div",{className:"ga-confirm-overlay",onClick:()=>!k&&w(null),children:e.jsxs("div",{className:"ga-confirm-box",onClick:a=>a.stopPropagation(),children:[e.jsx("h3",{children:"Delete this item?"}),e.jsx("p",{children:"This will permanently remove the media from the gallery."}),e.jsxs("div",{className:"ga-confirm-actions",children:[e.jsx("button",{className:"ga-btn ga-btn-outline",onClick:()=>w(null),disabled:k,children:"Cancel"}),e.jsx("button",{className:"ga-btn ga-btn-danger",onClick:K,disabled:k,children:k?"Deleting...":"Delete"})]})]})})]})}export{ae as default};
