import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 92 },
    { name: "JavaScript (ES6+)", level: 88 },
    { name: "HTML5 & CSS3", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Redux", level: 80 },
  ],
  Backend: [
    { name: "Node.js", level: 88 },
    { name: "Express.js", level: 85 },
    { name: "REST APIs", level: 90 },
    { name: "JWT Auth", level: 82 },
    { name: "Socket.io", level: 75 },
  ],
  Database: [
    { name: "MongoDB", level: 87 },
    { name: "Mongoose", level: 84 },
    { name: "MySQL", level: 70 },
    { name: "Firebase", level: 72 },
  ],
  Tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 65 },
    { name: "Postman", level: 88 },
    { name: "Vercel / Netlify", level: 85 },
  ],
};

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack MERN e-commerce app with cart, payments, admin dashboard, and real-time order tracking.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "#", live: "#", color: "#e8f0fe", accent: "#1a56db", emoji: "🛒",
  },
  {
    title: "Chat Application",
    desc: "Real-time chat app with Socket.io, user authentication, group chats, and media sharing.",
    tech: ["React", "Socket.io", "Express", "MongoDB", "JWT"],
    github: "#", live: "#", color: "#f0fdf4", accent: "#16a34a", emoji: "💬",
  },
  {
    title: "Task Management App",
    desc: "Collaborative project management tool with drag & drop, deadlines, and team collaboration features.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    github: "#", live: "#", color: "#fdf4ff", accent: "#9333ea", emoji: "✅",
  },
  {
    title: "Blog CMS Platform",
    desc: "Content management system with rich text editor, categories, tags, comments, and SEO optimization.",
    tech: ["React", "Express", "MongoDB", "Node.js", "JWT"],
    github: "#", live: "#", color: "#fff7ed", accent: "#ea580c", emoji: "📝",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "NetSpace ",
    period: "2023 – Present",
    points: [
      "Built scalable REST APIs using Node.js & Express serving 10k+ users",
      "Developed responsive React.js frontend with Redux state management",
      "Optimized MongoDB queries reducing load time by 40%",
    ],
  },
];

// ── scroll spy ──
function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((n) => document.getElementById(n.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= 80) {
          setActive(NAV_LINKS[i]); return;
        }
      }
      setActive("Home");
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

// ── scroll reveal ──
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── animated counter ──
function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── typing effect ──
function useTyping(words, speed = 100, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) setTimeout(() => setDel(true), pause);
        else setCi(c => c + 1);
      } else {
        setDisplay(cur.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi(w => (w + 1) % words.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

// ── Reveal wrapper ──
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, visible] = useReveal();
  const t = { up: "0,28px", down: "0,-28px", left: "28px,0", right: "-28px,0" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : `translate(${t[direction]})`,
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ── skill bar ──
function SkillBar({ name, level, delay, animate }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{name}</span>
        <span style={{ fontSize: 12, color: "#1a56db", fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: 8, background: "#e8f0fe", borderRadius: 100, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 100,
          background: "linear-gradient(90deg,#1a56db,#60a5fa)",
          width: animate ? `${level}%` : "0%",
          transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

// ── stat card ──
function StatCard({ target, label, suffix, start }) {
  const c = useCounter(target, 1400, start);
  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#1a56db" }}>{c}{suffix}</div>
      <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ── SectionTitle ──
function SectionTitle({ children }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: -0.5, margin: "0 0 14px" }}>
        {children}
      </h2>
      <div style={{ width: 48, height: 4, background: "#1a56db", borderRadius: 4, margin: "0 auto" }} />
    </div>
  );
}

const inputStyle = {
  padding: "13px 16px", borderRadius: 10, border: "1.5px solid #e5e7eb",
  fontSize: 15, fontFamily: "inherit", outline: "none",
  background: "#fff", width: "100%", boxSizing: "border-box",
};

// ═══════════════════════════════════════════════════════════
export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Frontend");
  const active = useScrollSpy();
  const typing = useTyping(["MERN Stack Developer", "React.js Expert", "Node.js Engineer", "Full Stack Developer"]);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSkillsVisible(true); o1.disconnect(); } }, { threshold: 0.2 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); o2.disconnect(); } }, { threshold: 0.3 });
    if (skillsRef.current) o1.observe(skillsRef.current);
    if (statsRef.current) o2.observe(statsRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ fontFamily: "'Sora','Inter',sans-serif", color: "#111", background: "#fff", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ping { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        nav { animation: fadeDown 0.6s ease both; }
        .nav-btn:hover { background:#f0f5ff!important; color:#1a56db!important; }
        .hire-btn:hover { background:#1640b0!important; transform:scale(1.05); }
        .hire-btn { transition:all 0.2s; }
        .cta-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,86,219,0.28); }
        .cta-primary { transition:all 0.25s; }
        .cta-outline:hover { background:#1a56db!important; color:#fff!important; }
        .cta-outline { transition:all 0.25s; }
        .p-card:hover { transform:translateY(-6px)!important; box-shadow:0 16px 48px rgba(26,86,219,0.12)!important; }
        .p-card { transition:transform 0.3s ease,box-shadow 0.3s ease; }
        .tab:hover { background:#e8f0fe!important; }
        .tab { transition:all 0.2s; }
        .skill-pill:hover { background:#1a56db!important; color:#fff!important; transform:scale(1.06); border-color:#1a56db!important; }
        .skill-pill { transition:all 0.2s; }
        .gh-link:hover { border-color:#1a56db!important; color:#1a56db!important; }
        .gh-link { transition:all 0.2s; }
        .ci-card:hover { transform:translateY(-4px); }
        .ci-card { transition:transform 0.2s; }
        @media(max-width:768px){
          .hero-right{display:none!important;}
          .nav-center{display:none!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .cg{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background:"rgba(255,255,255,0.93)",backdropFilter:"blur(14px)",
        borderBottom:"1px solid #f0f0f0",padding:"0 2rem",
        display:"flex",alignItems:"center",justifyContent:"space-between",height:64,
      }}>
        <span style={{fontWeight:700,fontSize:20,letterSpacing:-0.5}}>
          <span style={{color:"#1a56db"}}>&lt;</span>Dev<span style={{color:"#1a56db"}}>/&gt;</span>
        </span>
        <div className="nav-center" style={{display:"flex",gap:4}}>
          {NAV_LINKS.map(n=>(
            <button key={n} onClick={()=>scrollTo(n)} className="nav-btn"
              style={{
                background:active===n?"#f0f5ff":"none",border:"none",cursor:"pointer",
                padding:"6px 14px",borderRadius:8,fontSize:14,
                fontWeight:active===n?600:400,color:active===n?"#1a56db":"#444",
              }}>{n}</button>
          ))}
        </div>
        <button onClick={()=>window.open("mailto:manishprajapat96302@gmail.com")} className="hire-btn"
          style={{background:"#1a56db",color:"#fff",border:"none",padding:"8px 20px",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:600}}>
          Hire Me
        </button>
      </nav>

      {/* HERO */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"100px 2rem 4rem",maxWidth:1100,margin:"0 auto"}}>
        <div style={{flex:1}}>
          <Reveal delay={0.1}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#f0f5ff",color:"#1a56db",padding:"6px 16px",borderRadius:100,fontSize:13,fontWeight:600,marginBottom:24}}>
              <span style={{position:"relative",width:8,height:8,display:"inline-block"}}>
                <span style={{position:"absolute",inset:0,borderRadius:"50%",background:"#16a34a",animation:"ping 1.4s ease-out infinite"}} />
                <span style={{position:"absolute",inset:0,borderRadius:"50%",background:"#16a34a"}} />
              </span>
              Available for work
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 style={{fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:700,lineHeight:1.15,margin:"0 0 16px",letterSpacing:-1}}>
              Hi, I'm <span style={{color:"#1a56db"}}>Manish Prajapat</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 style={{fontSize:"clamp(1rem,2.4vw,1.5rem)",fontWeight:400,color:"#555",margin:"0 0 24px",minHeight:"2em"}}>
              {typing}<span style={{animation:"blink 1s infinite",color:"#1a56db"}}>|</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p style={{fontSize:17,color:"#666",lineHeight:1.8,maxWidth:520,margin:"0 0 40px"}}>
              I build fast, scalable, and beautiful full-stack web applications using MongoDB, Express, React & Node.js. Turning ideas into production-ready products.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <button onClick={()=>scrollTo("Projects")} className="cta-primary"
                style={{background:"#1a56db",color:"#fff",border:"none",padding:"14px 32px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:600}}>
                View Projects →
              </button>
              <button onClick={()=>scrollTo("Contact")} className="cta-outline"
                style={{background:"#fff",color:"#1a56db",border:"1.5px solid #1a56db",padding:"14px 32px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:600}}>
                Contact Me
              </button>
            </div>
          </Reveal>

          <div ref={statsRef} style={{display:"flex",gap:40,marginTop:56,flexWrap:"wrap"}}>
            {[[3,"Years Exp.","+",0.6],[15,"Projects Done","+",0.7],[10,"k+ Users","k+",0.8]].map(([n,l,s,d])=>(
              <Reveal key={l} delay={d}>
                <StatCard target={n} label={l} suffix={s} start={statsVisible} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* floating avatar */}
        <div className="hero-right" style={{flex:"0 0 340px",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{position:"relative",width:300,height:300}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{
                position:"absolute",
                inset:-i*18, borderRadius:"50%",
                border:"1.5px solid rgba(26,86,219,0.12)",
                animation:`ping ${1.8+i*0.5}s ease-out ${i*0.4}s infinite`,
              }} />
            ))}
            <div style={{
              width:280,height:280,borderRadius:"50%",
              background:"linear-gradient(135deg,#e8f0fe,#c7d7fd)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:100,border:"3px solid #e0e7ff",
              animation:"float 3.5s ease-in-out infinite",
              position:"absolute",top:10,left:10,zIndex:1,
            }}>👨‍💻</div>
            {[
              {label:"React",style:{top:-12,left:36,delay:"0s"}},
              {label:"Node.js",style:{bottom:24,right:-18,delay:"0.7s"}},
              {label:"MongoDB",style:{bottom:-8,left:24,delay:"1.3s"}},
            ].map(({label,style:{delay,...pos}})=>(
              <div key={label} style={{
                position:"absolute",...pos,zIndex:2,
                background:"#fff",borderRadius:10,padding:"6px 14px",
                boxShadow:"0 4px 16px rgba(0,0,0,0.1)",
                fontSize:12,fontWeight:700,color:"#1a56db",
                animation:`float 3.5s ease-in-out ${delay} infinite`,
              }}>{label}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{background:"#fafafa",padding:"80px 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <Reveal><SectionTitle>About Me</SectionTitle></Reveal>
          <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div>
              <Reveal delay={0.1}>
                <p style={{fontSize:16,color:"#555",lineHeight:1.9,marginBottom:20}}>
                  I'm a passionate MERN Stack Developer with 3+ years of experience building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{fontSize:16,color:"#555",lineHeight:1.9,marginBottom:32}}>
                  When I'm not coding, I contribute to open source, write technical blogs, and mentor junior developers. Clean code, good documentation, and continuous learning are my mantras.
                </p>
              </Reveal>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[["📍","Location","India"],["💼","Experience","3+ Years"],["🎓","Education","B.SC & MCA (Pursuing)"],["🌐","Languages","Hindi, English"]].map(([icon,label,val],i)=>(
                  <Reveal key={label} delay={0.1*i}>
                    <div style={{background:"#fff",padding:"16px 20px",borderRadius:12,border:"1px solid #eee"}}>
                      <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
                      <div style={{fontSize:11,color:"#aaa",fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>{label}</div>
                      <div style={{fontSize:14,fontWeight:600,color:"#222",marginTop:2}}>{val}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {[["🚀","Fast Delivery","On-time project delivery"],["🔒","Secure Code","Security best practices"],["📱","Responsive","Mobile-first approach"],["⚡","Optimized","Performance-first dev"]].map(([icon,title,desc],i)=>(
                <Reveal key={title} delay={0.1*i} direction={i%2===0?"left":"right"}>
                  <div style={{background:"#fff",padding:"24px 20px",borderRadius:14,border:"1px solid #eee",textAlign:"center"}}>
                    <div style={{fontSize:28,marginBottom:12}}>{icon}</div>
                    <div style={{fontWeight:600,fontSize:14,marginBottom:6}}>{title}</div>
                    <div style={{fontSize:12,color:"#888",lineHeight:1.6}}>{desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{padding:"80px 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <Reveal><SectionTitle>Skills & Technologies</SectionTitle></Reveal>

          {/* Tab switcher */}
          <Reveal delay={0.1}>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:40,flexWrap:"wrap"}}>
              {Object.keys(SKILLS).map(cat=>(
                <button key={cat} onClick={()=>setActiveTab(cat)} className="tab"
                  style={{
                    padding:"8px 22px",borderRadius:100,border:"1.5px solid",
                    borderColor:activeTab===cat?"#1a56db":"#e0e0e0",
                    background:activeTab===cat?"#1a56db":"#fff",
                    color:activeTab===cat?"#fff":"#555",
                    fontWeight:600,fontSize:13,cursor:"pointer",
                    transition:"all 0.25s",
                  }}>{cat}</button>
              ))}
            </div>
          </Reveal>

          <div ref={skillsRef} style={{maxWidth:680,margin:"0 auto",background:"#fafafa",borderRadius:16,padding:36,border:"1px solid #f0f0f0"}}>
            {SKILLS[activeTab].map((s,i)=>(
              <SkillBar key={s.name} name={s.name} level={s.level} delay={i*0.1} animate={skillsVisible} />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:40}}>
              {["MongoDB","Express.js","React.js","Node.js","JavaScript","Git","Docker","REST API","JWT","Socket.io","Redux","Tailwind CSS"].map(tag=>(
                <span key={tag} className="skill-pill"
                  style={{background:"#f0f5ff",color:"#1a56db",border:"1.5px solid #e0e7ff",padding:"6px 16px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"default"}}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{background:"#fafafa",padding:"80px 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <Reveal><SectionTitle>Projects</SectionTitle></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {PROJECTS.map((p,i)=>(
              <Reveal key={p.title} delay={i*0.12} direction={i%2===0?"left":"right"}>
                <div className="p-card" style={{background:"#fff",borderRadius:16,overflow:"hidden",border:"1px solid #eee"}}>
                  <div style={{background:p.color,height:150,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                    <div style={{fontSize:56,animation:`float ${3+i*0.3}s ease-in-out infinite`}}>{p.emoji}</div>
                    <div style={{position:"absolute",bottom:12,right:12,background:"#fff",borderRadius:8,padding:"4px 12px",fontWeight:700,fontSize:11,color:p.accent,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>MERN Stack</div>
                  </div>
                  <div style={{padding:24}}>
                    <h3 style={{fontWeight:700,fontSize:16,margin:"0 0 10px",color:"#111"}}>{p.title}</h3>
                    <p style={{color:"#666",fontSize:13,lineHeight:1.7,margin:"0 0 16px"}}>{p.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
                      {p.tech.map(t=>(
                        <span key={t} style={{background:p.color,color:p.accent,padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600}}>{t}</span>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:10}}>
                      <a href={p.github} className="gh-link" style={{flex:1,textAlign:"center",padding:"9px 0",borderRadius:8,fontSize:13,fontWeight:600,border:"1.5px solid #ddd",color:"#333",textDecoration:"none",display:"block"}}>GitHub</a>
                      <a href={p.live} style={{flex:1,textAlign:"center",padding:"9px 0",borderRadius:8,fontSize:13,fontWeight:600,background:p.accent,color:"#fff",textDecoration:"none",display:"block"}}>Live →</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{padding:"80px 2rem"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <Reveal><SectionTitle>Experience</SectionTitle></Reveal>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:19,top:0,bottom:0,width:2,background:"#e8f0fe"}} />
            {EXPERIENCE.map((exp,i)=>(
              <Reveal key={i} delay={i*0.15} direction="left">
                <div style={{display:"flex",gap:32,marginBottom:40}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:"#1a56db",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,flexShrink:0,zIndex:1,boxShadow:"0 0 0 5px #e8f0fe"}}>{i+1}</div>
                  <div style={{background:"#fff",border:"1px solid #f0f0f0",borderRadius:14,padding:24,flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:16}}>{exp.role}</div>
                        <div style={{color:"#1a56db",fontSize:14,fontWeight:600}}>{exp.company}</div>
                      </div>
                      <span style={{background:"#f0f5ff",color:"#1a56db",padding:"4px 14px",borderRadius:100,fontSize:12,fontWeight:600,height:"fit-content"}}>{exp.period}</span>
                    </div>
                    <ul style={{margin:"12px 0 0",paddingLeft:20}}>
                      {exp.points.map((pt,j)=>(
                        <li key={j} style={{color:"#666",fontSize:14,lineHeight:1.8,marginBottom:4}}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:"#fafafa",padding:"80px 2rem"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <Reveal><SectionTitle>Get In Touch</SectionTitle></Reveal>
          <Reveal delay={0.1}>
            <p style={{textAlign:"center",color:"#666",marginBottom:40,fontSize:16,lineHeight:1.8}}>
              Have a project in mind? I'd love to hear from you. Send a message and I'll get back within 24 hours.
            </p>
          </Reveal>
          {sent && (
            <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"14px 20px",color:"#16a34a",fontWeight:600,textAlign:"center",marginBottom:24,animation:"fadeDown 0.4s ease"}}>
              ✅ Message sent! I'll reply soon.
            </div>
          )}
          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
              <div className="cg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <input required placeholder="Your Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={inputStyle} />
                <input required type="email" placeholder="Your Email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} style={inputStyle} />
              </div>
              <textarea required rows={5} placeholder="Your Message..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} style={{...inputStyle,resize:"vertical"}} />
              <button type="submit" className="cta-primary"
                style={{background:"#1a56db",color:"#fff",border:"none",padding:"15px",borderRadius:10,cursor:"pointer",fontSize:16,fontWeight:600}}>
                Send Message →
              </button>
            </form>
          </Reveal>
         <div style={{display:"flex",justifyContent:"center",gap:40,marginTop:52,flexWrap:"wrap"}}>
  {[["📧","Email","manishprajapat96302@gmail.com"],
    ["💼","LinkedIn","https://www.linkedin.com/in/manish-prajapat-bb6365265"],
    ["🐙","GitHub","https://github.com/MANISHPRAJAPATII/"]
  ].map(([icon,label,val],i)=>(
    <Reveal key={label} delay={i*0.1}>
      <div className="ci-card" style={{textAlign:"center",cursor:"pointer"}}>
        
        <div style={{fontSize:28,marginBottom:6}}>{icon}</div>
        
        <div style={{
          fontSize:11,
          color:"#aaa",
          fontWeight:600,
          textTransform:"uppercase",
          letterSpacing:0.5
        }}>
          {label}
        </div>

        <div style={{fontSize:13,marginTop:2}}>
          <a 
            href={label === "Email" ? `mailto:${val}` : val}
            target="_blank"
            rel="noopener noreferrer"
            style={{color:"#1a56db",fontWeight:600,textDecoration:"none"}}
          >
            {val}
          </a>
        </div>

      </div>
    </Reveal>
  ))}
</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{textAlign:"center",padding:"28px 2rem",borderTop:"1px solid #f0f0f0",color:"#999",fontSize:13}}>
        Designed & Built by <strong style={{color:"#1a56db"}}>Manish</strong> · MERN Stack Developer · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
