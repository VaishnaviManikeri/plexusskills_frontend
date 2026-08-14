import{r,j as e,P as j,p as N,L as c,Q as u,R as v,S as y,T as E,U as B,V as C,N as k,y as z,G as S,O as F,E as U}from"./index-D4T1pXsi.js";const A=()=>{const[n,t]=r.useState(0);return r.useEffect(()=>{const l=()=>{const d=document.documentElement.scrollHeight-document.documentElement.clientHeight,x=window.scrollY/d*100;t(x)};return window.addEventListener("scroll",l),()=>window.removeEventListener("scroll",l)},[]),e.jsx("div",{className:"fixed top-0 left-0 w-full h-1 bg-gray-200 z-50",children:e.jsx("div",{className:"h-full bg-purple transition-all duration-150",style:{width:`${n}%`}})})},R=()=>{const{slug:n}=j(),[t,l]=r.useState(null),[d,m]=r.useState(!0),[x,f]=r.useState(""),[g,h]=r.useState(!1),p=r.useCallback(async()=>{try{m(!0);const s=await N.getBySlug(n);let o;s.data&&(s.data.data?o=s.data.data:o=s.data),l(o),document.title=(o==null?void 0:o.metaTitle)||(o==null?void 0:o.title)||"Blog Post";const a=document.querySelector('meta[name="description"]');a&&(o!=null&&o.metaDescription)&&(a.content=o.metaDescription)}catch(s){console.error("Fetch blog error:",s),f("Blog post not found")}finally{m(!1)}},[n]);r.useEffect(()=>{window.scrollTo(0,0),n&&p()},[n,p]);const i=s=>{const o=window.location.href,a=(t==null?void 0:t.title)||"Check out this blog post",w={whatsapp:`https://wa.me/?text=${encodeURIComponent(a+" "+o)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(o)}`,email:`mailto:?subject=${encodeURIComponent(a)}&body=${encodeURIComponent(o)}`,twitter:`https://twitter.com/intent/tweet?text=${encodeURIComponent(a)}&url=${encodeURIComponent(o)}`};window.open(w[s],"_blank"),h(!1)},b=s=>s?{__html:s}:{__html:""};return d?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-[#761E6B] mx-auto"}),e.jsx("p",{className:"mt-4 text-gray-600 font-medium",children:"Loading blog post..."})]})}):x||!t?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:e.jsxs("div",{className:"text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg",children:[e.jsx("div",{className:"text-6xl mb-4",children:"📖"}),e.jsx("h2",{className:"text-2xl font-bold text-[#001C46] mb-2",children:"Blog Post Not Found"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"The blog post you're looking for doesn't exist."}),e.jsxs(c,{to:"/blogs",className:"inline-flex items-center gap-2 text-[#761E6B] hover:text-[#E31B23] font-medium transition-colors",children:[e.jsx(u,{size:14})," Back to Blog"]})]})}):e.jsxs(e.Fragment,{children:[e.jsx(A,{}),e.jsxs("article",{className:"min-h-screen bg-white",children:[e.jsx("div",{className:"sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm",children:e.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-3 flex justify-between items-center",children:[e.jsxs(c,{to:"/blogs",className:"text-[#001C46] hover:text-[#761E6B] transition-colors flex items-center gap-2 font-medium",children:[e.jsx(u,{size:16})," Back to Blogs"]}),e.jsxs("div",{className:"flex gap-2 relative",children:[e.jsx("button",{onClick:()=>h(!g),className:"p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#761E6B]/10 hover:text-[#761E6B] transition-colors","aria-label":"Share",children:e.jsx(v,{size:18})}),g&&e.jsxs("div",{className:"absolute top-12 right-0 bg-white rounded-xl shadow-lg p-2 flex gap-2 z-50 border border-gray-100",children:[e.jsx("button",{onClick:()=>i("whatsapp"),className:"p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors","aria-label":"Share on WhatsApp",children:e.jsx(y,{size:18})}),e.jsx("button",{onClick:()=>i("linkedin"),className:"p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors","aria-label":"Share on LinkedIn",children:e.jsx(E,{size:18})}),e.jsx("button",{onClick:()=>i("twitter"),className:"p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors","aria-label":"Share on Twitter",children:e.jsx(B,{size:18})}),e.jsx("button",{onClick:()=>i("email"),className:"p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors","aria-label":"Share via Email",children:e.jsx(C,{size:18})})]})]})]})}),e.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-8",children:[e.jsxs("header",{className:"mb-8",children:[t.imageUrl&&e.jsx("div",{className:"mb-8 rounded-xl overflow-hidden shadow-lg",children:e.jsx("img",{src:t.imageUrl,alt:t.title,className:"w-full max-h-[500px] object-cover",onError:s=>{s.target.onerror=null,s.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23f0f2f5"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="24" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'}})}),e.jsx("h1",{className:"text-4xl md:text-5xl lg:text-6xl font-bold text-[#001C46] leading-tight mb-4",children:t.title}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-sm text-gray-600",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(k,{className:"text-[#761E6B]"}),t.author||"Unknown Author"]}),e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(z,{className:"text-[#761E6B]"}),new Date(t.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})]}),e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(S,{className:"text-[#761E6B]"}),t.readingTime||"5"," min read"]})]}),t.tags&&t.tags.length>0&&e.jsx("div",{className:"flex flex-wrap gap-2 mt-4",children:t.tags.map((s,o)=>e.jsxs("span",{className:"px-3 py-1 bg-[#761E6B]/10 text-[#761E6B] rounded-full text-sm font-medium",children:["#",s]},o))})]}),e.jsx("div",{className:"blog-content prose prose-lg max-w-none",children:t.content&&e.jsx("div",{dangerouslySetInnerHTML:b(t.content)})}),t.author&&e.jsx("div",{className:"mt-12 pt-8 border-t border-gray-200",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 bg-gradient-to-r from-[#761E6B] to-[#E31B23] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md",children:t.author.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-[#001C46] text-lg",children:t.author}),e.jsx("p",{className:"text-gray-500 text-sm",children:"Author"})]})]})}),e.jsxs("div",{className:"mt-12 bg-[#001C46] rounded-2xl p-8 md:p-10 text-white text-center relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-[#761E6B] opacity-20 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-64 h-64 bg-[#E31B23] opacity-20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx(F,{className:"text-4xl text-[#E31B23] mx-auto mb-4"}),e.jsx("h2",{className:"text-2xl md:text-3xl font-bold mb-2",children:"Ready to Transform Your Career?"}),e.jsx("p",{className:"text-white/80 mb-6 max-w-xl mx-auto",children:"Join Plexus Skills and gain industry-ready skills with our expert-led courses"}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-4",children:[e.jsxs(c,{to:"/contact",className:"bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2",children:["Enroll Now ",e.jsx(U,{size:16})]}),e.jsx(c,{to:"/#courses",className:"border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#001C46] transition-all",children:"Explore Courses"})]})]})]})]})]}),e.jsx("style",{children:`
        .blog-content {
          font-size: 18px;
          line-height: 1.8;
          color: #1a1a2e;
        }
        
        .blog-content h1 {
          font-size: 40px;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #001C46;
        }
        
        .blog-content h2 {
          font-size: 30px;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
          color: #001C46;
        }
        
        .blog-content h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem;
          color: #001C46;
        }
        
        .blog-content h4 {
          font-size: 20px;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: #001C46;
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
          font-size: 18px;
          line-height: 1.8;
          color: #2a3a5a;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          color: #2a3a5a;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #761E6B;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: #f8f5ff;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #2a3a5a;
        }
        
        .blog-content blockquote p {
          margin-bottom: 0;
        }
        
        .blog-content a {
          color: #761E6B;
          text-decoration: none;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          color: #E31B23;
          text-decoration: underline;
        }
        
        .blog-content code {
          background: #f0f2f5;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: 'Courier New', monospace;
        }
        
        .blog-content pre {
          background: #0a0a1a;
          color: #e0e0e0;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .blog-content pre code {
          background: transparent;
          color: #e0e0e0;
          padding: 0;
        }
        
        .blog-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        
        .blog-content .drop-cap::first-letter {
          font-size: 4rem;
          float: left;
          line-height: 1;
          margin-right: 0.5rem;
          color: #761E6B;
          font-weight: bold;
          font-family: 'Georgia', serif;
        }
        
        .blog-content .highlight-box {
          background: #fef9e7;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
          border-left: 4px solid #f1c40f;
        }
        
        @media (max-width: 768px) {
          .blog-content {
            font-size: 16px;
          }
          .blog-content h1 {
            font-size: 32px;
          }
          .blog-content h2 {
            font-size: 24px;
          }
          .blog-content h3 {
            font-size: 20px;
          }
          .blog-content p {
            font-size: 16px;
          }
          .blog-content .drop-cap::first-letter {
            font-size: 3rem;
          }
        }
      `})]})};export{R as default};
