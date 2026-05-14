

import { useState, useRef, useEffect } from "react";

const API = "https://farmai-backendd.onrender.com";
const api = {
  get: async (path) => { const r = await fetch(`${API}${path}`); return r.json(); },
  post: async (path, body) => { const r = await fetch(`${API}${path}`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) }); return r.json(); },
  upload: async (path, file) => { const f = new FormData(); f.append("file", file); const r = await fetch(`${API}${path}`, { method:"POST", body:f }); return r.json(); },
};

const Icons = {
  Leaf:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>),
  Sun:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>),
  Camera:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>),
  TrendingUp:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>),
  TrendingDown:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>),
  Droplets:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>),
  Mic:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>),
  MicOff:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>),
  Globe:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Check:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="20 6 9 17 4 12"/></svg>),
  X:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Eye:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
  EyeOff:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>),
  RefreshCw:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>),
  Plus:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  Search:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  MapPin:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Bell:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>),
  Cloud:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>),
  CloudRain:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>),
  Wind:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>),
  Upload:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>),
  AlertTriangle:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),
  ArrowRight:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  Activity:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
  LogOut:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>),
  BookOpen:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>),
  Thermometer:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>),
  Trash:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>),
  ShieldCheck:()=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>),
};

const IC = ({ name, size=18, color }) => {
  const I = Icons[name];
  if (!I) return null;
  return <span style={{width:size,height:size,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:color||"currentColor"}}><I/></span>;
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --g900:#1a3a2a;--g800:#1e4d35;--g700:#2d6a4f;--g600:#3a7d5a;--g500:#4a9068;
    --g200:#a8d5b5;--g100:#d4eddc;--g50:#f0f7f2;
    --orange:#e8921a;--orange-l:#f5a832;
    --cream:#f5f0e8;--td:#1a2e22;--tm:#4a6355;--tl:#7a9585;--white:#ffffff;
    --sh-sm:0 2px 8px rgba(26,58,42,0.08);--sh-md:0 8px 32px rgba(26,58,42,0.14);--sh-lg:0 24px 64px rgba(26,58,42,0.18);
    --r-sm:10px;--r-md:16px;--r-lg:24px;--r-xl:32px;--tr:all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  html{scroll-behavior:smooth;}
  body{font-family:'DM Sans',sans-serif;background:var(--white);color:var(--td);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:var(--g50);}::-webkit-scrollbar-thumb{background:var(--g500);border-radius:99px;}
  .page-enter{animation:pageIn 0.45s cubic-bezier(0.22,1,0.36,1) both;}
  @keyframes pageIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes floatAnim{0%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-30px) rotate(180deg)}100%{transform:translateY(0) rotate(360deg)}}
  @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.7}}
  @keyframes voicePulse{0%,100%{box-shadow:0 0 0 0 rgba(74,144,104,0.35)}50%{box-shadow:0 0 0 18px rgba(74,144,104,0)}}
  @keyframes spinR{to{transform:rotate(360deg)}}
  @keyframes overlayIn{from{opacity:0}to{opacity:1}}
  @keyframes dropIn{from{opacity:0;transform:translateY(-6px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes toastIn{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}

  .navbar{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2.5rem;height:60px;background:rgba(245,240,232,0.94);backdrop-filter:blur(16px);border-bottom:1px solid rgba(26,58,42,0.08);transition:var(--tr);}
  .navbar.dark{background:rgba(26,42,34,0.9);border-bottom:1px solid rgba(255,255,255,0.06);}
  .nav-logo{display:flex;align-items:center;gap:0.55rem;cursor:pointer;font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:var(--g900);background:none;border:none;}
  .navbar.dark .nav-logo{color:var(--white);}
  .nav-logo-icon{width:34px;height:34px;border-radius:9px;background:var(--g800);display:flex;align-items:center;justify-content:center;color:white;padding:8px;flex-shrink:0;}
  .nav-links{display:flex;align-items:center;gap:0.25rem;}
  .nav-link{padding:0.4rem 0.85rem;border-radius:8px;cursor:pointer;font-size:0.88rem;font-weight:500;color:var(--tm);transition:var(--tr);background:none;border:none;}
  .nav-link:hover,.nav-link.active{color:var(--g700);background:var(--g100);}
  .navbar.dark .nav-link{color:rgba(255,255,255,0.65);}
  .navbar.dark .nav-link:hover,.navbar.dark .nav-link.active{color:var(--white);background:rgba(255,255,255,0.1);}
  .nav-right{display:flex;align-items:center;gap:0.75rem;}
  .lang-btn{display:flex;align-items:center;gap:0.4rem;padding:0.35rem 0.75rem;border-radius:8px;cursor:pointer;font-size:0.84rem;font-weight:500;color:var(--tm);background:none;border:1px solid rgba(26,58,42,0.12);transition:var(--tr);position:relative;}
  .navbar.dark .lang-btn{color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.15);}
  .lang-dropdown{position:absolute;top:calc(100% + 8px);right:0;min-width:145px;background:var(--white);border-radius:12px;box-shadow:var(--sh-md);border:1px solid rgba(26,58,42,0.1);overflow:hidden;animation:dropIn 0.2s ease both;z-index:200;}
  .lang-option{display:flex;align-items:center;justify-content:space-between;padding:0.65rem 1rem;cursor:pointer;font-size:0.88rem;transition:var(--tr);}
  .lang-option:hover{background:var(--g50);}
  .lang-option.sel{color:var(--g700);font-weight:600;}
  .btn-outline{padding:0.4rem 1rem;border-radius:8px;cursor:pointer;font-size:0.88rem;font-weight:500;color:var(--td);background:none;border:1px solid rgba(26,58,42,0.18);transition:var(--tr);}
  .btn-outline:hover{background:var(--g50);}
  .navbar.dark .btn-outline{color:var(--white);border-color:rgba(255,255,255,0.2);}
  .btn-primary{padding:0.45rem 1.15rem;border-radius:8px;cursor:pointer;font-size:0.88rem;font-weight:600;color:var(--white);background:var(--g800);border:none;transition:var(--tr);}
  .btn-primary:hover{background:var(--g700);transform:translateY(-1px);}
  .btn-logout{display:flex;align-items:center;gap:0.4rem;font-size:0.88rem;font-weight:500;color:var(--tm);background:none;border:none;cursor:pointer;padding:0.4rem 0.65rem;border-radius:8px;transition:var(--tr);}
  .btn-logout:hover{color:#c0392b;background:#fef2f2;}
  .navbar.dark .btn-logout{color:rgba(255,255,255,0.6);}

  .hero{min-height:100vh;position:relative;overflow:hidden;display:flex;align-items:center;}
  .hero-bg{position:absolute;inset:0;overflow:hidden;}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(26,42,34,0.78) 0%,rgba(45,106,79,0.48) 60%,transparent 100%);}
  .float-el{position:absolute;border-radius:50%;animation:floatAnim linear infinite;opacity:0.1;}
  .hero-content{position:relative;z-index:2;max-width:680px;padding:0 3rem;padding-top:80px;animation:pageIn 0.9s cubic-bezier(0.22,1,0.36,1) both;}
  .hero-badge{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1rem;border-radius:99px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:var(--white);font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;backdrop-filter:blur(8px);margin-bottom:1.5rem;}
  .badge-dot{width:7px;height:7px;border-radius:50%;background:var(--orange);animation:pulse 2s infinite;flex-shrink:0;}
  .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:900;color:var(--white);line-height:1.08;margin-bottom:0.2rem;}
  .hero-accent{color:var(--orange);display:block;}
  .hero-sub{color:rgba(255,255,255,0.82);font-size:1.05rem;line-height:1.65;max-width:500px;margin-top:1.25rem;margin-bottom:0.75rem;}
  .hero-users{display:flex;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.65);font-size:0.84rem;margin-bottom:2rem;}
  .hero-dot{width:7px;height:7px;border-radius:50%;background:var(--orange);flex-shrink:0;}
  .hero-actions{display:flex;gap:1rem;flex-wrap:wrap;}
  .btn-hp{display:flex;align-items:center;gap:0.5rem;padding:0.85rem 1.75rem;border-radius:12px;background:var(--orange);color:var(--td);font-size:1rem;font-weight:700;border:none;cursor:pointer;transition:var(--tr);box-shadow:0 4px 24px rgba(232,146,26,0.35);}
  .btn-hp:hover{background:var(--orange-l);transform:translateY(-2px);}
  .btn-hs{display:flex;align-items:center;gap:0.5rem;padding:0.85rem 1.75rem;border-radius:12px;background:rgba(255,255,255,0.12);color:var(--white);font-size:1rem;font-weight:600;border:1px solid rgba(255,255,255,0.25);cursor:pointer;backdrop-filter:blur(8px);transition:var(--tr);}
  .btn-hs:hover{background:rgba(255,255,255,0.2);transform:translateY(-2px);}

  .features-sec{padding:6rem 3rem;background:var(--cream);}
  .sec-label{font-size:0.78rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem;text-align:center;}
  .sec-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:900;text-align:center;color:var(--td);margin-bottom:0.75rem;}
  .sec-sub{text-align:center;color:var(--tl);font-size:1rem;max-width:520px;margin:0 auto 3.5rem;}
  .features-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem;max-width:1100px;margin:0 auto;}
  .fcard{background:var(--white);border-radius:var(--r-md);padding:2rem;border:1px solid rgba(26,58,42,0.08);transition:var(--tr);cursor:pointer;position:relative;overflow:hidden;}
  .fcard::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--g50) 0%,transparent 60%);opacity:0;transition:var(--tr);}
  .fcard:hover{transform:translateY(-6px);box-shadow:var(--sh-lg);border-color:var(--g200);}
  .fcard:hover::before{opacity:1;}
  .fcard.feat{background:var(--g50);border-color:var(--g200);}
  .fcard-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;position:relative;z-index:1;padding:13px;}
  .fcard-label{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--orange);margin-bottom:0.4rem;position:relative;z-index:1;}
  .fcard-name{font-size:1.12rem;font-weight:700;color:var(--td);margin-bottom:0.65rem;position:relative;z-index:1;}
  .fcard-desc{font-size:0.9rem;color:var(--tl);line-height:1.6;position:relative;z-index:1;}
  .fcard-arrow{position:absolute;bottom:1.5rem;right:1.5rem;width:28px;height:28px;border-radius:8px;background:var(--g100);display:flex;align-items:center;justify-content:center;opacity:0;transition:var(--tr);padding:6px;color:var(--g700);}
  .fcard:hover .fcard-arrow{opacity:1;transform:translateX(3px);}

  .dash-sec{padding:6rem 3rem;background:var(--white);}
  .cfarm-card{max-width:700px;margin:0 auto 3rem;background:var(--g50);border-radius:var(--r-xl);padding:2.5rem;border:1px solid var(--g200);text-align:center;}
  .cfarm-title{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;color:var(--td);margin-bottom:0.5rem;}
  .cfarm-sub{color:var(--tl);font-size:0.95rem;margin-bottom:1.75rem;}
  .btn-cfarm{display:inline-flex;align-items:center;gap:0.6rem;padding:0.85rem 2rem;border-radius:12px;background:var(--g800);color:var(--white);font-size:0.95rem;font-weight:600;border:none;cursor:pointer;transition:var(--tr);}
  .btn-cfarm:hover{background:var(--g700);transform:translateY(-2px);}
  .alerts-sec{max-width:900px;margin:0 auto;}
  .alerts-title{display:flex;align-items:center;gap:0.5rem;font-size:1.15rem;font-weight:700;color:var(--td);margin-bottom:1.25rem;}
  .alerts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
  .alert-card{padding:1.1rem 1.25rem;border-radius:var(--r-md);display:flex;align-items:flex-start;gap:0.75rem;font-size:0.88rem;font-weight:500;line-height:1.5;transition:var(--tr);}
  .alert-card:hover{transform:translateY(-3px);box-shadow:var(--sh-sm);}
  .a-blue{background:#e8f0fe;color:#1a56db;}.a-green{background:#e6f9f0;color:#1a7a3c;}.a-orange{background:#fff4e0;color:#b45309;}

  .cta-sec{padding:6rem 3rem;text-align:center;background:linear-gradient(135deg,var(--g900) 0%,var(--g700) 100%);position:relative;overflow:hidden;}
  .cta-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(74,144,104,0.3) 0%,transparent 60%);}
  .cta-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:var(--white);margin-bottom:1rem;position:relative;z-index:1;}
  .cta-sub{color:rgba(255,255,255,0.72);font-size:1rem;margin-bottom:2rem;position:relative;z-index:1;}
  .btn-cta{display:inline-flex;align-items:center;gap:0.5rem;padding:0.9rem 2.25rem;border-radius:12px;background:var(--orange);color:var(--td);font-size:1rem;font-weight:700;border:none;cursor:pointer;transition:var(--tr);position:relative;z-index:1;}
  .btn-cta:hover{background:var(--orange-l);transform:translateY(-2px);}

  .footer{background:var(--cream);padding:2rem 3rem;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(26,58,42,0.08);}
  .footer-logo{display:flex;align-items:center;gap:0.5rem;font-family:'Playfair Display',serif;font-weight:700;font-size:1.15rem;color:var(--td);}
  .footer-tag{font-size:0.78rem;color:var(--tl);margin-top:0.2rem;}
  .footer-links{display:flex;gap:1.5rem;}
  .footer-link{font-size:0.88rem;color:var(--tm);cursor:pointer;background:none;border:none;transition:var(--tr);text-decoration:underline;}
  .footer-link:hover{color:var(--g700);}
  .footer-copy{font-size:0.82rem;color:var(--tl);text-align:right;}

  .auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--cream);padding:2rem;padding-top:80px;}
  .auth-card{background:var(--white);border-radius:var(--r-xl);padding:2.5rem 2rem;width:100%;max-width:400px;box-shadow:var(--sh-lg);border:1px solid rgba(26,58,42,0.08);animation:cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;}
  .auth-logo{display:flex;align-items:center;justify-content:center;gap:0.6rem;margin-bottom:1.75rem;}
  .auth-logo-icon{width:42px;height:42px;border-radius:12px;background:var(--g800);display:flex;align-items:center;justify-content:center;color:white;padding:10px;}
  .auth-logo-name{font-family:'Playfair Display',serif;font-weight:700;font-size:1.5rem;color:var(--td);}
  .auth-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1.65rem;text-align:center;color:var(--td);margin-bottom:0.4rem;}
  .auth-sub{text-align:center;color:var(--tl);font-size:0.9rem;margin-bottom:2rem;}
  .err-msg{background:#fef2f2;color:#c0392b;padding:0.75rem 1rem;border-radius:8px;font-size:0.88rem;margin-bottom:1rem;border:1px solid #fecaca;}
  .field-grp{margin-bottom:1.25rem;}
  .field-lbl{font-size:0.88rem;font-weight:600;color:var(--td);margin-bottom:0.45rem;display:block;}
  .field-inp{width:100%;padding:0.8rem 1rem;border-radius:10px;background:var(--g50);border:1.5px solid transparent;font-size:0.95rem;color:var(--td);outline:none;transition:var(--tr);font-family:'DM Sans',sans-serif;}
  .field-inp:focus{border-color:var(--g500);background:var(--white);box-shadow:0 0 0 3px rgba(74,144,104,0.12);}
  .field-wrap{position:relative;}
  .field-eye{position:absolute;right:0.85rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--tl);width:20px;height:20px;display:flex;align-items:center;justify-content:center;}
  .btn-auth{width:100%;padding:0.9rem;border-radius:12px;background:var(--g800);color:var(--white);font-size:1rem;font-weight:700;border:none;cursor:pointer;transition:var(--tr);font-family:'DM Sans',sans-serif;margin-top:0.5rem;display:flex;align-items:center;justify-content:center;gap:0.5rem;}
  .btn-auth:hover{background:var(--g700);transform:translateY(-1px);}
  .btn-auth:disabled{opacity:0.7;cursor:not-allowed;transform:none;}
  .auth-sw{text-align:center;margin-top:1.5rem;font-size:0.9rem;color:var(--tl);}
  .auth-sw-link{color:var(--g700);font-weight:700;cursor:pointer;background:none;border:none;font-size:inherit;}

  .overlay{position:fixed;inset:0;z-index:200;background:rgba(26,42,34,0.65);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:overlayIn 0.25s ease both;}
  .voice-modal{background:var(--white);border-radius:var(--r-xl);padding:2.25rem;width:100%;max-width:440px;box-shadow:var(--sh-lg);position:relative;animation:cardIn 0.4s cubic-bezier(0.22,1,0.36,1) both;}
  .modal-close{position:absolute;top:1.25rem;right:1.25rem;background:none;border:none;cursor:pointer;color:var(--tl);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:var(--tr);}
  .modal-close:hover{background:var(--g50);}
  .vm-title{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:var(--td);margin-bottom:0.35rem;}
  .vm-sub{font-size:0.88rem;color:var(--tl);margin-bottom:1.5rem;}
  .voice-circle{width:90px;height:90px;border-radius:50%;background:var(--g50);border:2px solid var(--g200);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;transition:var(--tr);color:var(--g700);padding:26px;}
  .voice-circle.on{background:var(--g100);border-color:var(--g500);animation:voicePulse 1.2s infinite;}
  .vm-status{text-align:center;font-size:0.84rem;color:var(--tl);margin-bottom:0.35rem;}
  .vm-prompt{text-align:center;font-size:1rem;font-weight:600;color:var(--td);margin-bottom:1rem;}
  .vm-transcript{background:var(--g50);border-radius:10px;padding:1rem;margin-bottom:0.75rem;min-height:56px;}
  .vm-response{background:#e8f0fe;border-radius:10px;padding:1rem;margin-bottom:1.25rem;min-height:56px;}
  .vm-t-lbl{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--tl);margin-bottom:0.4rem;}
  .vm-t-text{font-size:0.9rem;color:var(--tm);font-style:italic;}
  .vm-r-text{font-size:0.9rem;color:#1a56db;font-weight:500;}
  .btn-listen{width:100%;padding:0.9rem;border-radius:12px;background:var(--g800);color:var(--white);font-size:0.95rem;font-weight:700;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:var(--tr);}
  .btn-listen:hover{background:var(--g700);}
  .vm-commands{margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem;}
  .vm-cmd{padding:0.3rem 0.8rem;border-radius:99px;background:var(--g100);color:var(--g700);font-size:0.78rem;font-weight:600;border:none;cursor:pointer;transition:var(--tr);}
  .vm-cmd:hover{background:var(--g200);}

  .rain-popup{position:fixed;top:76px;right:1.5rem;z-index:500;background:linear-gradient(135deg,#1a56db,#1d4ed8);color:white;padding:1rem 1.25rem;border-radius:16px;max-width:300px;box-shadow:0 8px 32px rgba(29,78,216,0.4);animation:slideDown 0.4s ease both;display:flex;gap:0.75rem;align-items:flex-start;}
  .rain-popup-close{background:rgba(255,255,255,0.2);border:none;color:white;padding:0.2rem 0.5rem;border-radius:6px;cursor:pointer;font-size:0.85rem;margin-left:auto;flex-shrink:0;line-height:1;}

  .modal-page{position:fixed;inset:0;z-index:300;background:rgba(26,42,34,0.7);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:overlayIn 0.25s ease both;}
  .modal-box{background:var(--white);border-radius:var(--r-xl);padding:2.5rem;width:100%;max-width:540px;max-height:85vh;overflow-y:auto;box-shadow:var(--sh-lg);animation:cardIn 0.4s ease both;position:relative;}
  .modal-box h2{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:900;color:var(--td);margin-bottom:1.25rem;}
  .modal-box p{font-size:0.92rem;color:var(--tm);line-height:1.7;margin-bottom:0.75rem;}
  .modal-box h3{font-size:1rem;font-weight:700;color:var(--td);margin:1rem 0 0.5rem;}

  .inner-page{min-height:100vh;padding:80px 0 4rem;background:var(--cream);}
  .inner-content{max-width:900px;margin:0 auto;padding:2.5rem 2rem;}
  .pg-heading{font-family:'Playfair Display',serif;font-weight:900;font-size:2rem;color:var(--td);margin-bottom:0.4rem;}
  .pg-sub{color:var(--tl);font-size:0.95rem;margin-bottom:2rem;}
  .card{background:var(--white);border-radius:var(--r-xl);border:1px solid rgba(26,58,42,0.08);box-shadow:var(--sh-sm);overflow:hidden;margin-bottom:1.5rem;}
  .card-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.75rem;border-bottom:1px solid var(--g50);}
  .card-title{display:flex;align-items:center;gap:0.5rem;font-size:1rem;font-weight:700;color:var(--td);}
  .card-actions{display:flex;align-items:center;gap:0.5rem;}
  .card-body{padding:1.75rem;}
  .icon-btn{width:34px;height:34px;border-radius:8px;border:1px solid rgba(26,58,42,0.12);background:none;cursor:pointer;color:var(--tm);display:flex;align-items:center;justify-content:center;transition:var(--tr);padding:8px;}
  .icon-btn:hover{background:var(--g50);color:var(--g700);}
  .icon-btn.spinning svg{animation:spinR 0.8s linear;}
  .empty-state{padding:3rem 2rem;text-align:center;color:var(--tl);font-size:0.9rem;}

  .w-temp{font-size:4rem;font-weight:900;color:var(--td);font-family:'Playfair Display',serif;line-height:1;letter-spacing:-2px;}
  .w-cond{display:flex;align-items:center;gap:0.5rem;font-size:1rem;font-weight:600;color:var(--tm);margin-top:0.5rem;}
  .w-loc-tag{font-size:0.82rem;color:var(--tl);margin-top:0.3rem;}
  .w-meta{display:flex;gap:1.25rem;margin-top:0.75rem;}
  .w-meta-item{display:flex;align-items:center;gap:0.35rem;font-size:0.85rem;color:var(--tl);}
  .w-loc-wrap{display:flex;align-items:center;gap:0.4rem;padding:0.45rem 0.75rem;border-radius:8px;border:1px solid rgba(26,58,42,0.15);background:var(--g50);}
  .w-loc-inp{border:none;background:transparent;outline:none;font-size:0.88rem;color:var(--td);font-family:'DM Sans',sans-serif;width:80px;}
  .w-go{padding:0.45rem 0.85rem;border-radius:8px;background:var(--g800);color:var(--white);font-size:0.85rem;font-weight:600;border:none;cursor:pointer;transition:var(--tr);}
  .w-go:hover{background:var(--g700);}
  .forecast-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:0.75rem;margin-top:1.5rem;}
  .fday{background:var(--g50);border-radius:12px;padding:1rem 0.5rem;text-align:center;border:1.5px solid transparent;transition:var(--tr);}
  .fday:hover{border-color:var(--g200);transform:translateY(-3px);box-shadow:var(--sh-sm);}
  .fday-lbl{font-size:0.8rem;color:var(--tl);margin-bottom:0.6rem;font-weight:500;}
  .fday-icon{display:flex;justify-content:center;color:var(--g700);margin-bottom:0.6rem;}
  .fday-temp{font-size:1rem;font-weight:700;color:var(--td);}
  .fday-rain{font-size:0.75rem;color:var(--tl);margin-top:0.2rem;}
  .advice-box{background:var(--g50);border-radius:var(--r-md);padding:1.25rem 1.5rem;border:1px solid var(--g200);margin-top:1.5rem;}
  .advice-title{font-size:0.85rem;font-weight:700;color:var(--g700);margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.06em;}
  .advice-item{font-size:0.9rem;color:var(--tm);padding:0.3rem 0;line-height:1.5;}

  .market-row{display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr 1fr;align-items:center;padding:1rem 1.75rem;border-bottom:1px solid var(--g50);transition:var(--tr);}
  .market-row:hover{background:var(--g50);}
  .market-head{font-size:0.78rem;font-weight:700;color:var(--tl);text-transform:uppercase;letter-spacing:0.06em;padding:0.75rem 1.75rem;border-bottom:2px solid var(--g100);background:var(--g50);}
  .crop-name{font-weight:600;color:var(--td);}
  .price-val{font-weight:700;color:var(--g700);font-size:1.05rem;}
  .trend-up{display:inline-flex;align-items:center;gap:0.25rem;color:#16a34a;font-size:0.82rem;font-weight:600;}
  .trend-down{display:inline-flex;align-items:center;gap:0.25rem;color:#dc2626;font-size:0.82rem;font-weight:600;}
  .trend-stable{display:inline-flex;align-items:center;gap:0.25rem;color:var(--tl);font-size:0.82rem;font-weight:600;}
  .mkt-search-wrap{display:flex;align-items:center;gap:0.4rem;padding:0.4rem 0.75rem;border-radius:8px;border:1px solid rgba(26,58,42,0.12);background:var(--g50);}
  .mkt-inp{border:none;background:transparent;outline:none;font-size:0.85rem;color:var(--td);font-family:'DM Sans',sans-serif;width:150px;}

  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem;}
  .soil-row{display:flex;align-items:flex-start;gap:0.75rem;padding:0.65rem 0;border-bottom:1px solid var(--g50);font-size:0.9rem;color:var(--tm);line-height:1.55;}
  .soil-row:last-child{border-bottom:none;}
  .rec-row{display:flex;align-items:flex-start;justify-content:space-between;padding:1rem 1.75rem;border-bottom:1px solid var(--g50);gap:1rem;}
  .rec-row:last-child{border-bottom:none;}
  .rec-field{font-weight:600;color:var(--td);font-size:0.9rem;}
  .rec-date{font-size:0.78rem;color:var(--tl);margin-top:0.15rem;}
  .rec-advice{display:flex;flex-direction:column;gap:0.25rem;flex:1;}
  .rec-tag{font-size:0.78rem;padding:0.2rem 0.6rem;border-radius:99px;background:var(--g100);color:var(--g700);font-weight:600;width:fit-content;}

  .dropzone{border:2.5px dashed rgba(26,58,42,0.2);border-radius:var(--r-lg);padding:3.5rem 2rem;text-align:center;cursor:pointer;transition:var(--tr);background:var(--g50);}
  .dropzone:hover,.dropzone.drag{border-color:var(--g500);background:var(--g100);}
  .dz-icon{width:60px;height:60px;border-radius:16px;background:var(--g800);color:white;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;padding:15px;}
  .dz-text{font-size:1rem;font-weight:600;color:var(--td);margin-bottom:0.35rem;}
  .dz-hint{font-size:0.84rem;color:var(--tl);}

  /* RESULT BOX */
  .result-box{margin-top:1.5rem;background:var(--white);border-radius:var(--r-lg);border:2px solid var(--g200);animation:cardIn 0.4s ease both;overflow:hidden;}
  .result-header{background:var(--g50);padding:1.5rem 1.75rem;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--g100);}
  .result-disease-name{font-weight:800;font-size:1.3rem;color:var(--td);margin-bottom:0.25rem;}
  .result-conf{font-size:0.88rem;color:var(--tl);}
  .result-badge-healthy{background:#dcfce7;color:#16a34a;padding:0.4rem 1rem;border-radius:99px;font-size:0.85rem;font-weight:700;}
  .result-badge-disease{background:#fef2f2;color:#c0392b;padding:0.4rem 1rem;border-radius:99px;font-size:0.85rem;font-weight:700;}
  .result-body{padding:1.75rem;}
  .result-section{margin-bottom:1.25rem;}
  .result-section:last-child{margin-bottom:0;}
  .result-label{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--tl);margin-bottom:0.5rem;}
  .result-text{font-size:0.95rem;color:var(--tm);line-height:1.65;background:var(--g50);padding:0.85rem 1rem;border-radius:10px;border-left:3px solid var(--g500);}
  .result-text-ta{font-size:0.95rem;color:var(--tm);line-height:1.65;background:#fef3c7;padding:0.85rem 1rem;border-radius:10px;border-left:3px solid var(--orange);}

  .spinner{width:18px;height:18px;border:2.5px solid rgba(255,255,255,0.3);border-top-color:var(--white);border-radius:50%;animation:spinR 0.7s linear infinite;flex-shrink:0;}
  .spinner.dk{border-color:rgba(26,58,42,0.15);border-top-color:var(--g700);}
  .toast{position:fixed;bottom:2rem;right:2rem;z-index:300;background:var(--g900);color:var(--white);padding:0.85rem 1.5rem;border-radius:12px;font-size:0.9rem;font-weight:500;box-shadow:var(--sh-lg);animation:toastIn 0.35s cubic-bezier(0.22,1,0.36,1) both;display:flex;align-items:center;gap:0.5rem;}
  .toast.err{background:#c0392b;}

  @media(max-width:768px){
    .navbar{padding:0 1.25rem;}.nav-links{display:none;}
    .hero-content{padding:0 1.5rem;padding-top:80px;}
    .features-sec,.dash-sec{padding:4rem 1.5rem;}
    .alerts-grid{grid-template-columns:1fr;}
    .forecast-grid{grid-template-columns:repeat(3,1fr);}
    .footer{flex-direction:column;gap:1rem;text-align:center;}
    .inner-content{padding:2rem 1.25rem;}
    .form-grid{grid-template-columns:1fr;}
    .market-row,.market-head{grid-template-columns:2fr 1fr 1fr;}
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const FEATURES = [
  { Icon:Icons.Sun,        color:"#2563eb", bg:"#dbeafe", label:"WEATHER",       name:"Weather Updates",        page:"weather",     desc:"Real-time weather forecasts tailored to your farm's location.",               featured:true },
  { Icon:Icons.Camera,     color:"#16a34a", bg:"#dcfce7", label:"CROP DISEASE",  name:"Crop Disease Detection", page:"detect-crop", desc:"Upload a photo of your crop and our AI model identifies diseases instantly." },
  { Icon:Icons.TrendingUp, color:"#d97706", bg:"#fef3c7", label:"MARKET PRICES", name:"Market Price Insights",  page:"market",      desc:"Track mandi prices and get AI-predicted price trends to sell at the best time." },
  { Icon:Icons.Droplets,   color:"#0891b2", bg:"#cffafe", label:"SOIL HEALTH",   name:"Irrigation Advice",      page:"soil",        desc:"Smart irrigation scheduling based on soil moisture, weather, and crop water needs." },
  { Icon:Icons.Mic,        color:"#7c3aed", bg:"#ede9fe", label:"LANGUAGE",      name:"Voice Interface",        page:null,          desc:"Speak and get instant advice — no typing needed." },
];

// ── RAIN NOTIFICATION ─────────────────────────────────────────────────────────
function RainPopup({ onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 10000); return () => clearTimeout(t); }, []);
  return (
    <div className="rain-popup">
      <div style={{fontSize:"1.75rem",flexShrink:0}}>🌧️</div>
      <div style={{flex:1}}>
        <p style={{fontWeight:700,fontSize:"0.95rem",marginBottom:"0.25rem"}}>Rain Alert!</p>
        <p style={{fontSize:"0.82rem",opacity:0.9}}>Rain expected soon. Avoid irrigation today and protect your crops.</p>
      </div>
      <button className="rain-popup-close" onClick={onClose}>✕</button>
    </div>
  );
}

// ── MODAL PAGES (About / Privacy / Contact) ────────────────────────────────────
function ModalPage({ type, onClose }) {
  const content = {
    about: {
      title:"About FarmAI",
      body: (<>
        <p>FarmAI is an AI-powered farming assistant built specifically for Indian farmers. Our mission is to empower every farmer with smart technology — regardless of education or technical skill.</p>
        <h3>What We Offer</h3>
        <p>🌤️ Real-time weather forecasts with farming advice for your exact location.</p>
        <p>🌿 AI-powered crop disease detection using your phone camera — get instant diagnosis and treatment.</p>
        <p>📈 Live market prices from mandis across Tamil Nadu so you know the best time to sell.</p>
        <p>💧 Soil health monitoring with actionable advice for better yields.</p>

       
      </>)
    },
    privacy: {
      title:"Privacy Policy",
      body: (<>
        <p>Your privacy is important to us. Here's what you need to know:</p>
        <h3>Data We Collect</h3>
        <p>• Email address (for login only)</p>
        <p>• Crop images you upload (processed for disease detection, not stored permanently)</p>
        <p>• Soil records you manually enter</p>
        <h3>How We Use Your Data</h3>
        <p>Your data is used only to provide FarmAI services. We do not sell, share, or rent your personal information to any third party.</p>
        <h3>Crop Images</h3>
        <p>Images you upload for disease detection are processed by our AI model. Images are not stored after analysis is complete.</p>
        <h3>Your Rights</h3>
        <p>You can delete your account and all associated data at any time by contacting us at farmai.help@gmail.com.</p>
        <p style={{color:"var(--tl)",fontSize:"0.85rem"}}>Last updated: May 2026</p>
      </>)
    },
    contact: {
      title:"Contact Us",
      body: (<>
        <p>We're here to help farmers across Tamil Nadu. Reach out to us anytime.</p>
        <h3>📧 Email</h3>
        <p>farmai.help@gmail.com</p>
        <h3>📞 Farmer Helpline</h3>
        <p>1800-425-1551 (Tamil Nadu Agriculture — Free)</p>
        <h3>🏢 Office</h3>
        <p>FarmAI Technologies<br/>Madurai, Tamil Nadu 625001<br/>India</p>
        <h3>🕐 Support Hours</h3>
        <p>Monday – Saturday: 8:00 AM – 6:00 PM IST</p>
        <h3>🐛 Report a Bug</h3>
        <p>Found an issue? Email us at bugs@farmai.in and we'll fix it within 24 hours.</p>
      </>)
    }
  };
  const c = content[type];
  return (
    <div className="modal-page" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} style={{position:"absolute",top:"1.25rem",right:"1.25rem"}}><IC name="X" size={16}/></button>
        <h2>{c.title}</h2>
        {c.body}
      </div>
    </div>
  );
}

// ── VOICE MODAL (REAL WEB SPEECH API) ─────────────────────────────────────────
function VoiceModal({ onClose, navigate }) {
  const [on,setOn]       = useState(false);
  const [txt,setTxt]     = useState("");
  const [resp,setResp]   = useState("");
  const recRef           = useRef(null);

  const CMDS = [
    { keys:["weather","rain","temperature","forecast"], page:"weather",    reply_en:"Going to Weather page. Check rain forecast and temperature for your farm." },
    { keys:["crop","disease","detect","leaf","plant"], page:"detect-crop", reply_en:"Going to Crop Disease Detection. Upload a photo to detect plant diseases." },
    { keys:["market","price","sell","mandi"], page:"market",    reply_en:"Going to Market Prices. See today's crop rates across Tamil Nadu." },
    { keys:["soil","fertilizer","ph"],          page:"soil",      reply_en:"Going to Soil Health. Track your field soil records."},
    { keys:["home","main"],                  page:"home",      reply_en:"Going to Home page."},
  ];
  const HELP_EN = "I am FarmAI Voice Assistant. Say: weather, crop disease, market prices, soil health, or home. I will take you there instantly.";
  

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88; u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  const process = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("help") || lower.includes("how") || lower.includes("what") || lower.includes("உதவி")) {
      setResp(HELP_EN + " | " + HELP_TA); speak(HELP_EN); return;
    }
    for (const cmd of CMDS) {
      if (cmd.keys.some(k => lower.includes(k))) {
        const r = cmd.reply_en;
        setResp(r + " | " + cmd.reply_ta);
        speak(r);
        setTimeout(() => { navigate(cmd.page); onClose(); }, 1500);
        return;
      }
    }
    const fallback = "I didn't understand. Say: weather, crop disease, market prices, soil, or home.";
    setResp(fallback); speak(fallback);
  };

  const start = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice recognition requires Chrome browser. Please open in Chrome."); return; }
    const rec = new SR();
    rec.lang = "en-US"; rec.continuous = false; rec.interimResults = true;
    rec.onstart = () => setOn(true);
    rec.onend   = () => setOn(false);
    rec.onerror = () => setOn(false);
    rec.onresult = (e) => {
      let final="", interim="";
      for (let i=e.resultIndex; i<e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setTxt(final || interim);
      if (final) process(final);
    };
    rec.start(); recRef.current = rec;
  };
  const stop = () => { recRef.current?.stop(); setOn(false); };

  const quickCmd = (cmd) => { setTxt(cmd); process(cmd); };

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="voice-modal">
        <button className="modal-close" onClick={onClose}><IC name="X" size={16}/></button>
        <h3 className="vm-title">Voice Assistant 🎙️</h3>
        <p className="vm-sub">Speak in English or Tamil — I will navigate and help you instantly.</p>

        <div className={`voice-circle${on?" on":""}`}>{on?<Icons.Mic/>:<Icons.MicOff/>}</div>
        <p className="vm-status">{on?"🔴 Recording...":"Speak in English or Tamil"}</p>
        <p className="vm-prompt">{on?"Listening — say a command":"Press Start Listening"}</p>

        <div className="vm-transcript">
          <p className="vm-t-lbl">You Said</p>
          <p className="vm-t-text">{txt||"Your speech will appear here..."}</p>
        </div>
        {resp && (
          <div className="vm-response">
            <p className="vm-t-lbl">Response</p>
            <p className="vm-r-text">{resp}</p>
          </div>
        )}
        <button className="btn-listen" onClick={on?stop:start}>
          <IC name="Mic" size={17}/>{on?"Stop Listening":"Start Listening"}
        </button>
        <div className="vm-commands">
          {["weather","crop disease","market","soil","home","help"].map(c=>(
            <button key={c} className="vm-cmd" onClick={()=>quickCmd(c)}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, loggedIn, setLoggedIn, dark }) {
 
  const links = loggedIn
    ? [["Home","home"],["Weather","weather"],["Soil","soil"],["Market","market"],["Detect Crop","detect-crop"]]
    : [];
  return (
    <nav className={`navbar${dark?" dark":""}`}>
      <button className="nav-logo" onClick={()=>setPage("home")}>
        <span className="nav-logo-icon"><Icons.Leaf/></span>FarmAI
      </button>
      {loggedIn && (
        <div className="nav-links">
          {links.map(([lbl,key])=>(
            <button key={key} className={`nav-link${page===key?" active":""}`} onClick={()=>setPage(key)}>{lbl}</button>
          ))}
        </div>
      )}
      <div className="nav-right">
       
        {loggedIn
          ? <button className="btn-logout" onClick={()=>{setLoggedIn(false);setPage("home");localStorage.removeItem("farmai_token");}}><IC name="LogOut" size={15}/>Logout</button>
          : <><button className="btn-outline" onClick={()=>setPage("login")}>Login</button><button className="btn-primary" onClick={()=>setPage("signup")}>Sign Up</button></>
        }
      </div>
    </nav>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({ setPage, setVoiceOpen, loggedIn }) {
  const lastScan = JSON.parse(localStorage.getItem("farmai_last_prediction") || "null");
  return (
    <div className="page-enter">
      <section className="hero">
        <div className="hero-bg">
          <div style={{width:"100%",height:"100%",background:"linear-gradient(160deg,#1a5c3a 0%,#3a8c5a 35%,#5ab07a 60%,#8ace9a 100%)"}}/>
          <div className="hero-overlay"/>
        </div>
        {[{s:180,t:"8%",r:"12%",d:"12s"},{s:100,t:"60%",r:"5%",d:"9s"},{s:60,t:"25%",l:"5%",d:"15s"}].map((e,i)=>(
          <div key={i} className="float-el" style={{width:e.s,height:e.s,background:"rgba(255,255,255,0.08)",top:e.t,right:e.r,left:e.l,animationDuration:e.d,animationDelay:`${i*1.2}s`}}/>
        ))}
        <div className="hero-content">
          <div className="hero-badge"><span className="badge-dot"/>AI Farming Assistant for Indian Farmers</div>
          <h1 className="hero-title">Smart Farming.<span className="hero-accent">Simple Decisions.</span></h1>
          <p className="hero-sub">AI-powered farming assistant for smarter decisions — weather, soil, crop disease and market prices.</p>
          
          <div className="hero-actions">
            {!loggedIn && (
              <button className="btn-hp" onClick={()=>setPage("signup")}>Get Started Free <IC name="ArrowRight" size={17}/></button>
            )}
            <button className="btn-hs" onClick={()=>setVoiceOpen(true)}><IC name="Mic" size={17}/>Try Voice Assistant</button>
          </div>
        </div>
      </section>

      <section className="features-sec">
        <p className="sec-label">Features</p>
        <h2 className="sec-title">Smart Farming, Made Simple</h2>
        <p className="sec-sub">Everything a farmer needs — powered by AI.</p>
        <div className="features-grid">
          {FEATURES.map((f,i)=>(
            <div key={i} className={`fcard${f.featured?" feat":""}`} onClick={()=>f.page&&setPage(f.page)} style={f.page?{}:{cursor:"default"}}>
              <div className="fcard-icon" style={{background:f.bg,color:f.color}}><f.Icon/></div>
              <p className="fcard-label">{f.label}</p>
              <h3 className="fcard-name">{f.name}</h3>
              <p className="fcard-desc">{f.desc}</p>
              {f.page&&<div className="fcard-arrow"><Icons.ArrowRight/></div>}
            </div>
          ))}
        </div>
      </section>

      <section className="dash-sec">
        <p className="sec-label">One-Click Farm Status</p>
        <div className="cfarm-card">
          <h2 className="cfarm-title">Check My Farm</h2>
          {lastScan && loggedIn ? (
            <>
              <p style={{color:"var(--orange)",fontWeight:700,fontSize:"1.05rem",marginBottom:"0.35rem"}}>Last Scan: {lastScan.disease}</p>
              <p style={{fontSize:"0.88rem",color:"var(--tl)",marginBottom:"0.5rem"}}>{lastScan.confidence}% confidence • {lastScan.date}</p>
              <p style={{fontSize:"0.9rem",color:"var(--tm)",marginBottom:"1.5rem",maxWidth:480,margin:"0 auto 1.5rem"}}>{lastScan.solution_english}</p>
              <button className="btn-cfarm" onClick={()=>setPage("detect-crop")}><IC name="Camera" size={17}/>Scan Again</button>
            </>
          ) : (
            <>
              <p className="cfarm-sub">{loggedIn?"Upload a crop photo to start your first farm analysis.":"Get a complete snapshot of your farm in one tap."}</p>
              <button className="btn-cfarm" onClick={()=>setPage(loggedIn?"detect-crop":"signup")}>
                <IC name="Activity" size={17}/>{loggedIn?"Start Analysis":"Check My Farm"}
              </button>
            </>
          )}
        </div>
        <div className="alerts-sec">
          <h3 className="alerts-title"><IC name="Bell" size={18}/>Smart Alerts</h3>
          <div className="alerts-grid">
            <div className="alert-card a-blue"><IC name="CloudRain" size={18}/><span>Rain expected tomorrow — avoid irrigation</span></div>
            <div className="alert-card a-green"><IC name="TrendingUp" size={18}/><span>Market price is high — good time to sell</span></div>
            <div className="alert-card a-orange"><IC name="AlertTriangle" size={18}/><span>Crop disease detected early — inspect soon</span></div>
          </div>
        </div>
      </section>

      {!loggedIn && (
        <section className="cta-sec">
          <h2 className="cta-title">Start Today</h2>
          <p className="cta-sub">Join thousands of farmers already using AI to grow smarter.</p>
          <button className="btn-cta" onClick={()=>setPage("signup")}>Sign Up Free <IC name="ArrowRight" size={17}/></button>
        </section>
      )}

      <footer className="footer">
        <div>
          <div className="footer-logo">
            <span style={{width:28,height:28,background:"var(--g800)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",padding:6}}><Icons.Leaf/></span>FarmAI
          </div>
          <p className="footer-tag">Smart Farming. Simple Decisions.</p>
        </div>
        <div className="footer-links">
          <button className="footer-link" onClick={()=>window._showModal("about")}>About</button>
          <button className="footer-link" onClick={()=>window._showModal("privacy")}>Privacy</button>
          <button className="footer-link" onClick={()=>window._showModal("contact")}>Contact</button>
        </div>
        <div className="footer-copy"><div>© 2026 FarmAI</div><div>Built for farmers in India 🇮🇳</div></div>
      </footer>
    </div>
  );
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage, setLoggedIn, showToast }) {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const isLogin=mode==="login";
  const submit=async()=>{
    if(!email||!pass){setError("Please fill in all fields");return;}
    setError(""); setLoading(true);
    try{
      const data=await api.post(`/auth/${isLogin?"login":"signup"}`,{email,password:pass});
      if(data.token||data.demo){
        localStorage.setItem("farmai_token",data.token||"demo");
        setLoggedIn(true); setPage("home");
        showToast(isLogin?"Welcome back! 🌿":"Account created! Welcome to FarmAI 🎉");
      } else { setError(data.detail||"Something went wrong. Try again."); }
    } catch(e){ setError("Cannot reach server. Make sure backend is running on port 8000."); }
    setLoading(false);
  };
  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <div className="auth-logo"><div className="auth-logo-icon"><Icons.Leaf/></div><span className="auth-logo-name">FarmAI</span></div>
        <h2 className="auth-title">{isLogin?"Welcome Back":"Create Account"}</h2>
        <p className="auth-sub">{isLogin?"Sign in to continue":"Sign up to get started"}</p>
        {error&&<div className="err-msg">{error}</div>}
        <div className="field-grp">
          <label className="field-lbl">Email</label>
          <input className="field-inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/>
        </div>
        <div className="field-grp">
          <label className="field-lbl">Password</label>
          <div className="field-wrap">
            <input className="field-inp" type={show?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" style={{paddingRight:"2.75rem"}}/>
            <button className="field-eye" onClick={()=>setShow(v=>!v)}>{show?<Icons.EyeOff/>:<Icons.Eye/>}</button>
          </div>
        </div>
        <button className="btn-auth" onClick={submit} disabled={loading}>
          {loading?<><div className="spinner"/>{isLogin?"Signing in…":"Creating…"}</>:isLogin?"Login":"Create Account"}
        </button>
        <p className="auth-sw">
          {isLogin?"Don't have an account? ":"Already have an account? "}
          <button className="auth-sw-link" onClick={()=>setPage(isLogin?"signup":"login")}>{isLogin?"Sign Up":"Login"}</button>
        </p>
      </div>
    </div>
  );
}

// ── WEATHER ───────────────────────────────────────────────────────────────────
function WeatherPage({ onRainAlert }) {
  const [loc,setLoc]=useState("Madurai"); const [input,setInput]=useState("Madurai");
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const [error,setError]=useState(""); const [spin,setSpin]=useState(false);
  const alertShown = useRef(false);

  const fetchWeather=async(city)=>{
    setLoading(true); setError("");
    try{
      const res=await api.get(`/weather/${city}`);
      if(res.error){setError(res.error);}
      else{
        setData(res); setLoc(city);
        if(res.has_rain_alert && !alertShown.current){ alertShown.current=true; onRainAlert(); }
      }
    }catch(e){setError("Cannot connect to backend. Check that it is running.");}
    setLoading(false);
  };
  useEffect(()=>{fetchWeather("Madurai");},[]);
  const refresh=()=>{setSpin(true);fetchWeather(loc);setTimeout(()=>setSpin(false),900);};
  const getDayName=(dateStr,i)=>{ if(i===0)return"Today"; return new Date(dateStr).toLocaleDateString("en",{weekday:"short"}); };

  return (
    <div className="inner-page page-enter">
      <div className="inner-content">
        <h1 className="pg-heading">Weather</h1>
        <p className="pg-sub">Current conditions and 5-day forecast for your farm.</p>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><IC name="Sun" size={18} color="var(--orange)"/>Weather</div>
            <div className="card-actions">
              <div className="w-loc-wrap">
                <IC name="MapPin" size={14} color="var(--tl)"/>
                <input className="w-loc-inp" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchWeather(input)}/>
              </div>
              <button className="w-go" onClick={()=>fetchWeather(input)}>Go</button>
              <button className={`icon-btn${spin?" spinning":""}`} onClick={refresh}><Icons.RefreshCw/></button>
            </div>
          </div>
          <div className="card-body">
            {loading&&<div style={{display:"flex",alignItems:"center",gap:"0.75rem",color:"var(--tl)"}}><div className="spinner dk"/>Fetching weather data...</div>}
            {error&&<div className="err-msg">{error}</div>}
            {data&&!loading&&(<>
              <div className="w-temp">{Math.round(data.current.temp_c)}°C</div>
              <div className="w-cond"><IC name="Sun" size={18}/>{data.current.condition}</div>
              <div className="w-loc-tag">{data.current.city}, {data.current.region}, {data.current.country}</div>
              <div className="w-meta">
                <div className="w-meta-item"><IC name="Droplets" size={15}/>{data.current.humidity}%</div>
                <div className="w-meta-item"><IC name="Wind" size={15}/>{data.current.wind_kph} km/h</div>
                <div className="w-meta-item"><IC name="Sun" size={15}/>UV: {data.current.uv}</div>
              </div>
              <div className="forecast-grid">
                {data.forecast.map((f,i)=>(
                  <div key={i} className="fday">
                    <div className="fday-lbl">{getDayName(f.date,i)}</div>
                    <div className="fday-icon"><IC name={f.rain_chance>50?"CloudRain":"Sun"} size={24}/></div>
                    <div className="fday-temp">{Math.round(f.max_temp)}°</div>
                    <div className="fday-rain">{f.rain_chance}% rain</div>
                  </div>
                ))}
              </div>
              {data.advice?.length>0&&(
                <div className="advice-box">
                  <p className="advice-title">🌾 Farming Advice</p>
                  {data.advice.map((a,i)=><p key={i} className="advice-item">{a}</p>)}
                </div>
              )}
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SOIL ──────────────────────────────────────────────────────────────────────
function SoilPage({ showToast }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding,  setAdding]  = useState(false);
  const [form, setForm] = useState({ field_name:"", ph:"", nitrogen:"", moisture:"", notes:"" });

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const d = await api.get("/soil/");
      setRecords(d.records || []);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchRecords(); }, []);

  const addRecord = async () => {
    if (!form.field_name || !form.ph || !form.nitrogen || !form.moisture) {
      showToast("Please fill all fields", "err"); return;
    }
    setAdding(true);
    try {
      const data = await api.post("/soil/add", {
        field_name: form.field_name,
        ph:         parseFloat(form.ph),
        nitrogen:   parseFloat(form.nitrogen),
        moisture:   parseFloat(form.moisture),
        notes:      form.notes,
      });
      if (data.record) {
        showToast("✅ Soil record added!");
        setForm({ field_name:"", ph:"", nitrogen:"", moisture:"", notes:"" });
        fetchRecords();
      } else {
        showToast(data.detail || "Error adding record", "err");
      }
    } catch(e) {
      showToast("Cannot connect to backend", "err");
    }
    setAdding(false);
  };

  const deleteRecord = async (id) => {
    try {
      await api.get(`/soil/delete/${id}`);
      showToast("Record deleted");
      fetchRecords();
    } catch(e) {}
  };

  const SOIL_INFO = [
    { icon:"🌡️", text:"pH 6.0–7.5 is ideal. Below 6 = acidic (add lime). Above 7.5 = alkaline (add sulfur)." },
    { icon:"🌿", text:"Nitrogen 30–80% is good. Low = yellow leaves, add urea. High = reduce fertilizer." },
    { icon:"💧", text:"Moisture 40–80% is ideal. Below 40% = irrigate more. Above 80% = improve drainage." },
    { icon:"🔬", text:"Test your soil with a kit or send to a nearby agriculture lab for accuracy." },
  ];

  return (
    <div className="inner-page page-enter">
      <div className="inner-content">
        <h1 className="pg-heading">Soil Health</h1>
        <p className="pg-sub">Monitor your field's soil — get instant good/bad recommendations.</p>

        {/* INFO GUIDE */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><IC name="BookOpen" size={18}/>Soil Guide</div>
          </div>
          <div className="card-body">
            {SOIL_INFO.map((s, i) => (
              <div key={i} style={{display:"flex",gap:"0.75rem",padding:"0.6rem 0",borderBottom:i<SOIL_INFO.length-1?"1px solid var(--g50)":"none",fontSize:"0.9rem",color:"var(--tm)",lineHeight:1.55}}>
                <span style={{fontSize:"1.1rem",flexShrink:0}}>{s.icon}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ADD FORM */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><IC name="Plus" size={18}/>Add Soil Record</div>
          </div>
          <div className="card-body">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div>
                <label className="field-lbl">Field Name *</label>
                <input className="field-inp" placeholder="e.g. North Field" value={form.field_name} onChange={e=>setForm(f=>({...f,field_name:e.target.value}))}/>
              </div>
              <div>
                <label className="field-lbl">pH Level (0–14) *</label>
                <input className="field-inp" type="number" step="0.1" min="0" max="14" placeholder="e.g. 6.5" value={form.ph} onChange={e=>setForm(f=>({...f,ph:e.target.value}))}/>
              </div>
              <div>
                <label className="field-lbl">Nitrogen (%) *</label>
                <input className="field-inp" type="number" step="1" min="0" max="100" placeholder="e.g. 45" value={form.nitrogen} onChange={e=>setForm(f=>({...f,nitrogen:e.target.value}))}/>
              </div>
              <div>
                <label className="field-lbl">Moisture (%) *</label>
                <input className="field-inp" type="number" step="1" min="0" max="100" placeholder="e.g. 65" value={form.moisture} onChange={e=>setForm(f=>({...f,moisture:e.target.value}))}/>
              </div>
            </div>
            <div style={{marginBottom:"1.25rem"}}>
              <label className="field-lbl">Notes (optional)</label>
              <input className="field-inp" placeholder="Any observations about this field" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
            </div>
            <button className="btn-auth" style={{marginTop:0}} onClick={addRecord} disabled={adding}>
              {adding
                ? <><div className="spinner"/>Adding...</>
                : <><IC name="Plus" size={17}/>Add Record</>
              }
            </button>
          </div>
        </div>

        {/* RECORDS LIST */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><IC name="Activity" size={18}/>Soil Records ({records.length})</div>
            <button className="icon-btn" onClick={fetchRecords}><Icons.RefreshCw/></button>
          </div>

          {loading && <div className="empty-state"><div className="spinner dk" style={{margin:"0 auto"}}/></div>}
          {!loading && records.length === 0 && (
            <div className="empty-state">No soil records yet. Add one above!</div>
          )}

          {records.map((r) => (
            <div key={r.id} style={{padding:"1.25rem 1.75rem",borderBottom:"1px solid var(--g50)"}}>
              {/* Header row */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.75rem"}}>
                <div>
                  <p style={{fontWeight:700,fontSize:"1rem",color:"var(--td)"}}>{r.field_name}</p>
                  <p style={{fontSize:"0.78rem",color:"var(--tl)",marginTop:"0.15rem"}}>
                    {r.date} &nbsp;|&nbsp; pH: {r.ph} &nbsp;|&nbsp; N: {r.nitrogen}% &nbsp;|&nbsp; Moisture: {r.moisture}%
                  </p>
                  {r.notes && <p style={{fontSize:"0.82rem",color:"var(--tl)",marginTop:"0.2rem",fontStyle:"italic"}}>{r.notes}</p>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  <span style={{
                    padding:"0.3rem 0.85rem", borderRadius:99, fontSize:"0.8rem", fontWeight:700,
                    background: r.overall==="good" ? "#dcfce7" : "#fff7ed",
                    color:      r.overall==="good" ? "#16a34a" : "#b45309",
                  }}>
                    {r.overall==="good" ? "✅ All Good" : "⚠️ Needs Attention"}
                  </span>
                  <button className="icon-btn" style={{color:"#c0392b"}} onClick={()=>deleteRecord(r.id)}>
                    <Icons.Trash/>
                  </button>
                </div>
              </div>

              {/* Advice rows */}
              <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                {r.advice?.map((a, i) => (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:"0.75rem",
                    background: a.status==="good" ? "#f0fdf4" : a.status==="bad" ? "#fef2f2" : "#fff7ed",
                    borderRadius:8, padding:"0.5rem 0.85rem",
                    border:`1px solid ${a.status==="good"?"#a7f3d0":a.status==="bad"?"#fecaca":"#fed7aa"}`,
                  }}>
                    <span style={{fontSize:"0.95rem"}}>
                      {a.status==="good" ? "✅" : a.status==="bad" ? "❌" : "⚠️"}
                    </span>
                    <span style={{fontSize:"0.88rem",color:a.color,fontWeight:500}}>{a.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── MARKET ────────────────────────────────────────────────────────────────────
function MarketPage() {
  const [prices,setPrices]=useState([]); const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false); const [spin,setSpin]=useState(false); const [updated,setUpdated]=useState("");
  const fetch=async()=>{ setLoading(true); try{const d=await api.get("/market/");setPrices(d.prices||[]);setUpdated(d.last_updated||"");}catch(e){} setLoading(false); };
  useEffect(()=>{fetch();},[]);
  const filtered=prices.filter(p=>p.crop.toLowerCase().includes(search.toLowerCase()));
  const TrendIcon=({trend})=>{
    if(trend==="up")   return <span className="trend-up"><IC name="TrendingUp" size={14}/>Up</span>;
    if(trend==="down") return <span className="trend-down"><IC name="TrendingDown" size={14}/>Down</span>;
    return <span className="trend-stable">— Stable</span>;
  };
  return (
    <div className="inner-page page-enter">
      <div className="inner-content">
        <h1 className="pg-heading">Market Prices</h1>
        <p className="pg-sub">Today's crop prices across major Tamil Nadu mandis.{updated&&<span style={{color:"var(--tl)",fontSize:"0.82rem"}}> Updated: {updated}</span>}</p>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><IC name="TrendingUp" size={18}/>Market Prices</div>
            <div className="card-actions">
              <div className="mkt-search-wrap"><IC name="Search" size={14} color="var(--tl)"/><input className="mkt-inp" placeholder="Search crop..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
              <button className={`icon-btn${spin?" spinning":""}`} onClick={()=>{setSpin(true);fetch();setTimeout(()=>setSpin(false),900);}}><Icons.RefreshCw/></button>
            </div>
          </div>
          <div className="market-head" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.5fr 1fr",padding:"0.75rem 1.75rem"}}>
            <span>Crop</span><span>Price</span><span>Trend</span><span>Market</span><span>Unit</span>
          </div>
          {loading&&<div className="empty-state"><div className="spinner dk" style={{margin:"0 auto"}}/></div>}
          {!loading&&filtered.length===0&&<div className="empty-state">No results found</div>}
          {filtered.map((p,i)=>(
            <div key={i} className="market-row">
              <span className="crop-name">{p.crop}</span>
              <span className="price-val">₹{p.price}</span>
              <TrendIcon trend={p.trend}/>
              <span style={{fontSize:"0.88rem",color:"var(--tm)"}}>{p.market}</span>
              <span style={{fontSize:"0.82rem",color:"var(--tl)"}}>{p.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── DETECT CROP ───────────────────────────────────────────────────────────────
function DetectPage({ showToast }) {
  const [drag,setDrag]=useState(false); const [file,setFile]=useState(null);
  const [preview,setPreview]=useState(null); const [busy,setBusy]=useState(false);
  const [result,setResult]=useState(null); const [error,setError]=useState("");
  const ref=useRef();

  const handleFile=async(f)=>{
    // Validate file type
    const allowed=["image/jpeg","image/jpg","image/png","image/webp"];
    if(!allowed.includes(f.type)){showToast("Use JPG, PNG or WEBP image only","err");return;}

    setFile(f); setResult(null); setError("");
    setPreview(URL.createObjectURL(f));
    setBusy(true);

    try{
      const data = await api.upload("/predict", f);

      if(data.detail || data.error){
        // Error from backend
        setError(data.detail || data.error);
      } else if(data.disease && data.confidence !== undefined){
        // ✅ Success — backend returned correct fields
        setResult(data);
        // Save to localStorage for "Check My Farm"
        localStorage.setItem("farmai_last_prediction", JSON.stringify({
          disease:          data.disease,
          confidence:       data.confidence,
          solution_english: data.solution_english,
          solution_tamil:   data.solution_tamil,
          date:             new Date().toLocaleDateString("en-IN"),
        }));
        showToast("Disease analysis complete!");
      } else {
        setError("Unexpected response from server. Please try again.");
      }
    } catch(e){
      setError("Cannot connect to backend. Make sure uvicorn is running on port 8000.");
    }
    setBusy(false);
  };

  const isHealthy = result && result.disease.toLowerCase().includes("healthy");

  return (
    <div className="inner-page page-enter">
      <div className="inner-content">
        <h1 className="pg-heading">Crop Disease Detection</h1>
        <p className="pg-sub">Upload a clear crop leaf photo to get an instant AI diagnosis with treatment advice.</p>
        <div className="card">
          <div className="card-body">

            {/* DROP ZONE */}
            <div
              className={`dropzone${drag?" drag":""}`}
              onDragOver={e=>{e.preventDefault();setDrag(true);}}
              onDragLeave={()=>setDrag(false)}
              onDrop={e=>{e.preventDefault();setDrag(false);if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0]);}}
              onClick={()=>ref.current.click()}
            >
              {preview
                ? <img src={preview} alt="crop preview" style={{maxHeight:200,maxWidth:"100%",borderRadius:12,marginBottom:"1rem",objectFit:"contain"}}/>
                : <div className="dz-icon"><Icons.Upload/></div>
              }
              <p className="dz-text">{file?file.name:"Drag & drop your crop image here, or click to browse"}</p>
              <p className="dz-hint">PNG, JPG, WEBP up to 5MB</p>
              <input ref={ref} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" style={{display:"none"}} onChange={e=>e.target.files[0]&&handleFile(e.target.files[0])}/>
            </div>

            {/* LOADING */}
            {busy && (
              <div style={{textAlign:"center",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.75rem",color:"var(--tm)"}}>
                <div className="spinner dk"/>
                <span>Analyzing with AI — please wait a few seconds…</span>
              </div>
            )}

            {/* ERROR */}
            {error && <div className="err-msg" style={{marginTop:"1rem"}}>⚠️ {error}</div>}

            {/* RESULT */}
            {result && !busy && (
              <div className="result-box">
                {/* Header */}
                <div className="result-header">
                  <div>
                    <p className="result-disease-name">
                      {isHealthy ? "✅ " : "⚠️ "}{result.disease}
                    </p>
                    <p className="result-conf">
                      Confidence: <strong>{result.confidence}%</strong>
                    </p>
                  </div>
                  <span className={isHealthy?"result-badge-healthy":"result-badge-disease"}>
                    {isHealthy?"Healthy":"Disease Detected"}
                  </span>
                </div>

                {/* Body */}
                <div className="result-body">
                  {/* English Treatment */}
                  <div className="result-section">
                    <p className="result-label">🇬🇧 Recommended Treatment (English)</p>
                    <p className="result-text">{result.solution_english}</p>
                  </div>

                 
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]          = useState("home");
  const [loggedIn,setLoggedIn]  = useState(!!localStorage.getItem("farmai_token"));
  const [toast,setToast]        = useState(null);
  const [toastType,setToastType]= useState("ok");
  const [voiceOpen,setVoice]    = useState(false);
  const [rainAlert,setRainAlert]= useState(false);
  const [modal,setModal]        = useState(null); // "about"|"privacy"|"contact"

  // Expose modal setter globally for footer buttons
  window._showModal = setModal;

  const showToast=(msg,type="ok")=>{ setToast(msg); setToastType(type); setTimeout(()=>setToast(null),3000); };

  const nav=p=>{
    if(["weather","soil","market","detect-crop"].includes(p)&&!loggedIn){ setPage("login"); return; }
    setPage(p);
  };

  return (
    <>
      <style>{styles}</style>

      <Navbar page={page} setPage={nav} loggedIn={loggedIn} setLoggedIn={setLoggedIn} dark={page==="home"&&!loggedIn}/>

      {/* Rain Notification Popup */}
      {rainAlert && <RainPopup onClose={()=>setRainAlert(false)}/>}

      {/* Page Router */}
      {page==="home"        && <HomePage   setPage={nav} setVoiceOpen={setVoice} loggedIn={loggedIn}/>}
      {page==="login"       && <AuthPage   mode="login"  setPage={nav} setLoggedIn={setLoggedIn} showToast={showToast}/>}
      {page==="signup"      && <AuthPage   mode="signup" setPage={nav} setLoggedIn={setLoggedIn} showToast={showToast}/>}
      {page==="weather"     && <WeatherPage onRainAlert={()=>setRainAlert(true)}/>}
      {page==="soil"        && <SoilPage   showToast={showToast}/>}
      {page==="market"      && <MarketPage/>}
      {page==="detect-crop" && <DetectPage showToast={showToast}/>}

      {/* Voice Modal */}
      {voiceOpen && <VoiceModal onClose={()=>setVoice(false)} navigate={nav}/>}

      {/* Footer Modals */}
      {modal && <ModalPage type={modal} onClose={()=>setModal(null)}/>}

      {/* Toast Notification */}
      {toast && <div className={`toast${toastType==="err"?" err":""}`}><IC name={toastType==="err"?"X":"Check"} size={16}/>{toast}</div>}
    </>
  );
}


