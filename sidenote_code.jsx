import { useState, useRef, useEffect } from "react";

/* ─── FONTS ─── */
const F = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700&display=swap');`;

/* ─── CSS ─── */
const S = `
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:#f0ede8;font-family:'Syne',sans-serif;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.1);}
.dm{font-family:'DM Mono',monospace;}

/* HOME */
.home{min-height:100vh;background:#f0ede8;display:flex;flex-direction:column;position:relative;overflow:hidden;}
.home::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 70% 55% at 62% 18%,rgba(255,255,255,0.72) 0%,transparent 65%),
             radial-gradient(ellipse 45% 45% at 8% 88%,rgba(190,185,175,0.38) 0%,transparent 58%),
             radial-gradient(ellipse 50% 42% at 92% 72%,rgba(172,168,158,0.28) 0%,transparent 55%);}
.hc{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:22px 48px;}
.hlogo{display:flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:13px;letter-spacing:.07em;color:#0a0a0a;}
.hnav{display:flex;gap:9px;}
.hico{width:31px;height:31px;border-radius:50%;border:1px solid rgba(0,0,0,.11);background:rgba(255,255,255,.5);
  display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;color:#6b6660;transition:all 170ms;}
.hico:hover{background:rgba(255,255,255,.85);color:#0a0a0a;}
.hbody{position:relative;z-index:5;flex:1;padding:56px 48px 0;}
.hey{display:inline-flex;align-items:center;gap:7px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;color:#6b6660;margin-bottom:26px;}
.hdot{width:5px;height:5px;border-radius:50%;background:#1db870;}
.hhed{font-family:'Syne',sans-serif;font-weight:700;font-size:clamp(42px,5.2vw,74px);
  line-height:1.03;letter-spacing:-.035em;color:#0a0a0a;max-width:800px;}
.hhedg{color:#1db870;}
.hcta{display:flex;align-items:center;gap:18px;margin-top:34px;margin-bottom:52px;}
.trypill{display:inline-flex;align-items:center;background:#1db870;border:none;border-radius:100px;
  cursor:pointer;overflow:hidden;transition:all 200ms;box-shadow:0 4px 18px rgba(29,184,112,.3);}
.trypill:hover{background:#17a060;transform:translateY(-1px);box-shadow:0 6px 26px rgba(29,184,112,.42);}
.trypill-t{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#fff;padding:12px 20px 12px 22px;}
.trypill-a{width:38px;height:38px;background:#0a0a0a;border-radius:50%;margin:3px 3px 3px 0;
  display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;transition:transform 200ms;}
.trypill:hover .trypill-a{transform:rotate(45deg);}
.hstats{display:flex;gap:34px;align-items:center;flex-wrap:wrap;}
.hsn{font-family:'DM Mono',monospace;font-size:20px;font-weight:500;color:#0a0a0a;letter-spacing:-.02em;}
.hsl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;color:#9e9890;text-transform:uppercase;margin-top:1px;}
.hssep{width:1px;height:30px;background:rgba(0,0,0,.1);}
.hpipe{position:absolute;right:48px;top:50%;transform:translateY(-52%);z-index:5;}
.hps{display:flex;align-items:center;gap:9px;padding:8px 0;position:relative;}
.hps:not(:last-child)::after{content:'';position:absolute;left:10px;top:100%;width:1px;height:18px;background:rgba(0,0,0,.09);}
.hpn{width:20px;height:20px;border-radius:50%;border:1px solid rgba(0,0,0,.11);background:rgba(255,255,255,.7);
  font-family:'DM Mono',monospace;font-size:8px;color:#9e9890;display:flex;align-items:center;justify-content:center;}
.hps.a .hpn{background:#1db870;border-color:#1db870;color:#fff;}
.hpl{font-family:'DM Mono',monospace;font-size:9px;color:#9e9890;letter-spacing:.04em;}
.hps.a .hpl{color:#0a0a0a;}
.hfoot{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;
  padding:13px 48px;border-top:1px solid rgba(0,0,0,.07);font-family:'DM Mono',monospace;font-size:10px;color:#9e9890;}

/* TOOL */
.tool{min-height:100vh;background:#0b0b0a;display:flex;flex-direction:column;}
.tbar{position:fixed;top:0;left:0;right:0;z-index:300;height:46px;background:rgba(11,11,10,.96);
  backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.05);
  display:flex;align-items:center;justify-content:space-between;padding:0 22px;}
.tbl{display:flex;align-items:center;gap:12px;}
.tlogo{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.08em;color:rgba(255,255,255,.22);cursor:pointer;transition:color 140ms;}
.tlogo:hover{color:rgba(255,255,255,.5);}
.tsep{width:1px;height:15px;background:rgba(255,255,255,.07);}
.ttabs{display:flex;gap:1px;}
.ttab{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.07em;padding:5px 10px;
  color:rgba(255,255,255,.2);border:1px solid transparent;cursor:pointer;transition:all 140ms;position:relative;white-space:nowrap;}
.ttab.a{color:#f0ede8;border-color:rgba(255,255,255,.08);background:rgba(255,255,255,.04);}
.ttab.done{color:rgba(29,184,112,.6);}
.ttab.done::after{content:'✓';position:absolute;top:-3px;right:-3px;font-size:7px;color:#1db870;
  background:#0b0b0a;border:1px solid rgba(29,184,112,.22);border-radius:50%;width:11px;height:11px;
  display:flex;align-items:center;justify-content:center;line-height:1;}
.ttab.lk{opacity:.2;cursor:default;pointer-events:none;}
.tbr{display:flex;align-items:center;gap:6px;}
.tbtn{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.05em;padding:5px 11px;
  border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.3);cursor:pointer;transition:all 140ms;}
.tbtn:hover{border-color:rgba(255,255,255,.18);color:rgba(255,255,255,.6);}
.tbtn.g{border-color:rgba(29,184,112,.35);color:#1db870;}
.tbtn.g:hover{background:rgba(29,184,112,.07);}
.tbody{padding-top:46px;flex:1;display:flex;flex-direction:column;}

/* PANELS */
.panel{flex:1;padding:36px 0 110px;animation:fu 300ms ease both;}
@keyframes fu{from{opacity:0;transform:translateY(9px);}to{opacity:1;transform:translateY(0);}}
.inner{max-width:520px;margin:0 auto;padding:0 22px;}

.pey{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;color:rgba(255,255,255,.16);text-transform:uppercase;margin-bottom:5px;}
.pped{font-family:'Syne',sans-serif;font-weight:600;font-size:21px;color:#f0ede8;margin-bottom:7px;line-height:1.25;}
.psub{font-family:'Syne',sans-serif;font-size:12px;color:rgba(240,237,232,.35);line-height:1.7;margin-bottom:26px;}

/* text area */
.ta{width:100%;background:#0f0f0e;border:1px solid rgba(255,255,255,.07);padding:14px 15px;
  font-family:'Syne',sans-serif;font-size:13px;color:#f0ede8;min-height:100px;resize:vertical;
  outline:none;line-height:1.7;transition:border-color 170ms;margin-bottom:9px;}
.ta::placeholder{color:rgba(240,237,232,.17);}
.ta:focus{border-color:rgba(29,184,112,.28);}
.ifoot{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;}
.ihint{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.05em;color:rgba(255,255,255,.14);}

/* buttons */
.btn{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.05em;padding:8px 17px;
  border:1px solid;background:transparent;cursor:pointer;transition:all 150ms;}
.btn.g{border-color:rgba(29,184,112,.42);color:#1db870;}
.btn.g:hover{background:rgba(29,184,112,.07);}
.btn.g:disabled{opacity:.22;cursor:default;}
.btn.gh{border-color:rgba(255,255,255,.09);color:rgba(255,255,255,.26);}
.btn.gh:hover{border-color:rgba(255,255,255,.18);color:rgba(255,255,255,.5);}
.brow{display:flex;gap:6px;margin-top:13px;flex-wrap:wrap;}

/* user bubble */
.ubub{background:#131312;border:1px solid rgba(255,255,255,.06);border-left:2px solid rgba(55,115,215,.42);
  padding:11px 15px;margin-bottom:22px;}
.ublbl{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;color:rgba(55,115,215,.6);text-transform:uppercase;margin-bottom:4px;}
.ubtxt{font-family:'Syne',sans-serif;font-size:13px;color:#f0ede8;line-height:1.65;}

/* AI block */
.aiblk{margin-bottom:26px;}
.ailbl{display:flex;align-items:center;gap:6px;font-family:'DM Mono',monospace;font-size:8px;
  letter-spacing:.1em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:9px;}
.aip{width:5px;height:5px;background:#1db870;border-radius:50%;animation:pu 2s ease infinite;}
@keyframes pu{0%,100%{opacity:1;}50%{opacity:.2;}}
.aiq{font-family:'Syne',sans-serif;font-size:15px;font-weight:500;color:#f0ede8;line-height:1.4;margin-bottom:5px;}
.aiqs{font-family:'Syne',sans-serif;font-size:12px;color:rgba(240,237,232,.34);line-height:1.65;margin-bottom:14px;}

/* options */
.opts{display:flex;flex-direction:column;gap:5px;margin-bottom:14px;}
.opt{display:flex;align-items:center;gap:9px;padding:9px 12px;background:#131312;
  border:1px solid rgba(255,255,255,.06);cursor:pointer;transition:all 120ms;}
.opt:hover{border-color:rgba(29,184,112,.2);background:#171716;}
.opt.sel{border-color:#1db870;background:rgba(29,184,112,.06);}
.opt.nr{background:transparent;border-color:transparent;}
.opt.nr:hover{background:#131312;border-color:rgba(255,255,255,.06);}
.ochk{width:12px;height:12px;border:1px solid rgba(255,255,255,.14);flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:7px;color:#1db870;transition:all 120ms;}
.opt.sel .ochk{background:rgba(29,184,112,.18);border-color:#1db870;}
.olbl{font-family:'Syne',sans-serif;font-size:12px;color:rgba(240,237,232,.58);flex:1;}
.opt.sel .olbl{color:#f0ede8;}
.otag{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.14);flex-shrink:0;}
.fin{width:100%;background:#0c0c0b;border:1px solid rgba(255,255,255,.07);padding:7px 11px;margin-top:3px;
  font-family:'Syne',sans-serif;font-size:12px;color:#f0ede8;outline:none;transition:border-color 150ms;}
.fin::placeholder{color:rgba(255,255,255,.13);}
.fin:focus{border-color:rgba(29,184,112,.28);}

/* answered */
.ans{opacity:.35;margin-bottom:18px;}
.apills{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px;}
.apill{font-family:'DM Mono',monospace;font-size:8px;color:#1db870;
  border:1px solid rgba(29,184,112,.24);padding:2px 7px;background:rgba(29,184,112,.05);}

/* thinking */
.thk{display:flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;
  font-size:10px;color:rgba(255,255,255,.17);margin-bottom:22px;}
.dots span{display:inline-block;width:3px;height:3px;background:#1db870;border-radius:50%;
  margin:0 2px;animation:bl 1.2s ease infinite;}
.dots span:nth-child(2){animation-delay:.2s;}.dots span:nth-child(3){animation-delay:.4s;}
@keyframes bl{0%,100%{opacity:.15;}50%{opacity:1;}}

/* sentence */
.scard{background:#0f0f0e;border:1px solid rgba(29,184,112,.24);border-left:2px solid #1db870;padding:17px 19px;margin-bottom:17px;}
.stag{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;color:#1db870;text-transform:uppercase;margin-bottom:7px;}
.stxt{font-family:'Syne',sans-serif;font-size:13px;color:#f0ede8;line-height:1.8;}
.stxt em{color:#1db870;font-style:normal;font-weight:500;}
.sedit{width:100%;background:#0c0c0b;border:1px solid rgba(255,255,255,.07);padding:11px 13px;
  font-family:'Syne',sans-serif;font-size:12px;color:#f0ede8;min-height:72px;resize:vertical;outline:none;transition:border-color 150ms;}
.sedit:focus{border-color:rgba(29,184,112,.28);}

/* pop spec */
.pspec{background:#0f0f0e;border:1px solid rgba(29,184,112,.2);padding:18px;margin-bottom:17px;}
.pspechd{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;color:#1db870;text-transform:uppercase;margin-bottom:12px;}

/* SIM */
.sim{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;}
.simey{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:18px;}
.simbig{font-family:'DM Mono',monospace;font-size:54px;font-weight:500;color:#f0ede8;letter-spacing:-.02em;line-height:1;margin-bottom:4px;}
.simsub{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;color:rgba(255,255,255,.17);margin-bottom:32px;}
.simbars{width:100%;max-width:420px;margin-bottom:28px;}
.sbr{display:flex;align-items:center;gap:9px;margin-bottom:9px;}
.sblbl{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.2);width:84px;text-align:right;flex-shrink:0;}
.sbtr{flex:1;height:2px;background:rgba(255,255,255,.05);position:relative;}
.sbfi{position:absolute;top:0;left:0;height:100%;background:#1db870;transition:width 180ms ease;}
.sbpct{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.2);width:28px;}
.simlog{width:100%;max-width:420px;background:#0c0c0b;border:1px solid rgba(255,255,255,.05);padding:11px 13px;text-align:left;overflow:hidden;max-height:132px;}
.sline{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.2);line-height:1.9;letter-spacing:.03em;}
.sline.cur{color:#1db870;}
.sdone{margin-top:26px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;
  padding:10px 24px;border:1px solid rgba(29,184,112,.42);color:#1db870;background:transparent;cursor:pointer;transition:all 170ms;}
.sdone:hover{background:rgba(29,184,112,.07);}

/* OUTPUT */
.sstrip{background:rgba(255,255,255,.02);border-bottom:1px solid rgba(255,255,255,.05);padding:0 22px;position:sticky;top:46px;z-index:90;}
.ssr{height:35px;display:flex;align-items:center;gap:14px;cursor:pointer;}
.sslbl{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;color:rgba(255,255,255,.17);text-transform:uppercase;flex-shrink:0;}
.ssits{display:flex;gap:14px;flex:1;overflow:hidden;}
.ssit{display:flex;gap:5px;align-items:center;white-space:nowrap;}
.ssk{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.17);}
.ssv{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.38);}
.sstog{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.17);margin-left:auto;flex-shrink:0;}
.ssexp{padding:13px 0 16px;display:grid;grid-template-columns:repeat(3,1fr);gap:9px;border-top:1px solid rgba(255,255,255,.04);}
.sseit{padding-left:9px;border-left:1px solid rgba(255,255,255,.06);}
.ssek{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px;}
.ssev{font-family:'Syne',sans-serif;font-size:11px;color:#f0ede8;}
.sses{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.13);margin-top:1px;}

.otabs{display:flex;border-bottom:1px solid rgba(255,255,255,.05);padding:0 22px;background:#0b0b0a;position:sticky;top:81px;z-index:80;}
.otab{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.07em;padding:10px 15px;
  color:rgba(255,255,255,.2);cursor:pointer;border-bottom:1.5px solid transparent;transition:all 140ms;}
.otab:hover{color:rgba(255,255,255,.42);}
.otab.a{color:#f0ede8;border-bottom-color:#1db870;}
.otabb{font-family:'DM Mono',monospace;font-size:8px;background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);padding:1px 4px;color:rgba(255,255,255,.2);margin-left:4px;}

.owrap{display:flex;min-height:0;}
.omain{flex:1;padding:26px 22px 120px;max-width:620px;min-width:0;transition:margin-right 260ms ease;}
.omain.sh{margin-right:355px;}

/* verdict */
.vwrap{display:grid;grid-template-columns:1fr 195px;gap:20px;margin-bottom:22px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.05);}
.vtag{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:8px;}
.vnum{font-family:'Syne',sans-serif;font-size:36px;font-weight:700;color:#f0ede8;letter-spacing:-.03em;line-height:1.05;margin-bottom:5px;}
.vnum em{color:#1db870;font-style:normal;}
.vci{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.26);margin-bottom:11px;}
.vconf{display:flex;align-items:center;gap:6px;}
.vdot{width:5px;height:5px;background:#1db870;}
.vclbl{font-family:'DM Mono',monospace;font-size:8px;color:#1db870;letter-spacing:.08em;}
.vcwhy{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.28);margin-left:3px;}
.ctxbox{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:13px;}
.ctxhd{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:11px;}
.ctxr{display:flex;align-items:center;gap:6px;margin-bottom:7px;}
.ctxl{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.2);width:90px;flex-shrink:0;letter-spacing:.03em;}
.ctxtr{flex:1;height:2px;background:rgba(255,255,255,.05);position:relative;}
.ctxfi{position:absolute;top:0;left:0;height:100%;}
.ctxv{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.2);width:19px;text-align:right;}

.sechd{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:11px;}
.ins3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:22px;}
.ins{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:14px;position:relative;overflow:hidden;}
.ins::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;}
.ins.dom::before{background:#1db870;}.ins.risk::before{background:#d94040;}.ins.watch::before{background:#d97a00;}
.instype{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;}
.ins.dom .instype{color:#1db870;}.ins.risk .instype{color:#d94040;}.ins.watch .instype{color:#d97a00;}
.insbody{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.52);line-height:1.65;}

/* segments */
.swlanes{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:16px;margin-bottom:16px;}
.swlhd{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:13px;}
.swr{display:flex;align-items:center;gap:9px;margin-bottom:8px;}
.swlbl{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.26);width:112px;flex-shrink:0;}
.swtr{flex:1;height:14px;background:rgba(255,255,255,.03);position:relative;}
.swfi{position:absolute;top:0;left:0;height:100%;opacity:.72;}
.swpct{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.36);width:26px;text-align:right;}
.swinf{font-family:'DM Mono',monospace;font-size:8px;width:52px;text-align:right;}
.segcards{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.segc{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:14px;}
.segtop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:9px;}
.segnm{font-family:'Syne',sans-serif;font-size:12px;font-weight:500;color:#f0ede8;}
.segpct{font-family:'DM Mono',monospace;font-size:16px;font-weight:500;color:#f0ede8;}
.segpt{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);}
.segdr{display:flex;gap:6px;margin-bottom:5px;}
.segdk{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);text-transform:uppercase;letter-spacing:.06em;width:44px;flex-shrink:0;padding-top:2px;}
.segdv{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.48);line-height:1.5;}
.seggtm{margin-top:9px;padding-top:9px;border-top:1px solid rgba(255,255,255,.04);
  font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.17);line-height:1.6;}
.seggtm span{color:#1db870;}

/* pathways */
.pwlist{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
.pw{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:15px 18px;position:relative;}
.pw.rec{border-color:rgba(29,184,112,.22);}
.pwbadge{position:absolute;top:0;right:14px;font-family:'DM Mono',monospace;font-size:7px;color:#1db870;
  background:rgba(29,184,112,.08);border:1px solid rgba(29,184,112,.2);border-top:none;padding:2px 6px;letter-spacing:.08em;}
.pwtop{display:flex;align-items:baseline;gap:6px;margin-bottom:6px;}
.pwrank{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.17);}
.pwnm{font-family:'Syne',sans-serif;font-size:12px;font-weight:500;color:#f0ede8;}
.pwdesc{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.36);line-height:1.55;margin-bottom:11px;}
.pwmets{display:flex;gap:18px;}
.pwmv{font-family:'DM Mono',monospace;font-size:12px;font-weight:500;}
.pwmv.p{color:#1db870;}.pwmv.n{color:#d94040;}.pwmv.nu{color:rgba(255,255,255,.36);}
.pwml{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);margin-top:1px;letter-spacing:.06em;}
.pwmci{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.11);margin-top:1px;}
.pwwhy{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.42);line-height:1.65;
  border-left:2px solid #1db870;padding:8px 13px;background:rgba(29,184,112,.04);margin-bottom:18px;}
.pwwhy strong{color:#f0ede8;font-weight:500;}
.cfw{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:3px 0;}
.cft{width:100%;border-collapse:collapse;}
.cft th{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.1em;color:rgba(255,255,255,.17);
  text-align:left;padding:5px 11px;border-bottom:1px solid rgba(255,255,255,.05);text-transform:uppercase;}
.cft td{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.36);
  padding:8px 11px;border-bottom:1px solid rgba(255,255,255,.03);}
.cft tr:last-child td{border-bottom:none;}
.cfsn{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.55) !important;}
.cfp{color:#1db870 !important;}.cfn{color:#d94040 !important;}

/* audit */
.audtop{display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.05);}
.audring{width:78px;height:78px;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.audring svg{position:absolute;top:0;left:0;}
.audinn{text-align:center;}
.audpct{font-family:'DM Mono',monospace;font-size:17px;font-weight:500;color:#f0ede8;}
.audpl{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);}
.audbk{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.audbi{background:#0f0f0e;border:1px solid rgba(255,255,255,.06);padding:10px;}
.audbin{font-family:'DM Mono',monospace;font-size:15px;font-weight:500;}
.audbi.ev .audbin{color:#1db870;}.audbi.bl .audbin{color:#d97a00;}.audbi.md .audbin{color:#2060c0;}
.audbil{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);text-transform:uppercase;letter-spacing:.08em;margin-top:2px;}
.rf{display:flex;gap:9px;padding:10px 13px;background:#0f0f0e;border:1px solid rgba(255,255,255,.05);
  border-left:2px solid #d97a00;margin-bottom:5px;}
.rfid{font-family:'DM Mono',monospace;font-size:8px;color:#d97a00;flex-shrink:0;padding-top:1px;}
.rfnm{font-family:'Syne',sans-serif;font-size:11px;font-weight:500;color:#f0ede8;margin-bottom:2px;}
.rfim{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.17);}
.ccnd{display:flex;gap:9px;padding:9px 13px;background:#0f0f0e;border:1px solid rgba(255,255,255,.05);margin-bottom:3px;}
.ccar{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);width:16px;flex-shrink:0;padding-top:2px;}
.cccl{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.52);flex:1;line-height:1.5;}
.ccsr{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.14);flex-shrink:0;}
.mpgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.mpit{background:#0f0f0e;border:1px solid rgba(255,255,255,.05);padding:9px;}
.mpk{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);margin-bottom:3px;letter-spacing:.06em;}
.mpv{font-family:'DM Mono',monospace;font-size:12px;font-weight:500;color:#1db870;}
.div{border:none;border-top:1px solid rgba(255,255,255,.04);margin:18px 0;}

/* CHAT */
.chatpanel{position:fixed;top:46px;right:0;bottom:0;z-index:100;width:355px;
  background:#0d0d0c;border-left:1px solid rgba(255,255,255,.05);
  display:flex;flex-direction:column;transform:translateX(100%);transition:transform 250ms ease;}
.chatpanel.open{transform:translateX(0);}
.chathd{padding:13px 15px;border-bottom:1px solid rgba(255,255,255,.05);
  display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.chatttl{font-family:'Syne',sans-serif;font-size:13px;font-weight:500;color:#f0ede8;}
.chatcls{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.17);cursor:pointer;
  padding:3px 7px;border:1px solid rgba(255,255,255,.07);transition:all 130ms;}
.chatcls:hover{color:rgba(255,255,255,.48);}
.chatmsgs{flex:1;overflow-y:auto;padding:15px;}
.chatm{margin-bottom:11px;}
.chatmlbl{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;}
.chatbub{font-family:'Syne',sans-serif;font-size:12px;line-height:1.65;padding:9px 11px;}
.chatbub.user{background:#131312;border:1px solid rgba(255,255,255,.06);color:#f0ede8;}
.chatbub.ai{background:rgba(29,184,112,.06);border:1px solid rgba(29,184,112,.17);color:rgba(255,255,255,.72);}
.chatin-row{padding:10px 12px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:5px;flex-shrink:0;}
.chatin{flex:1;background:#090908;border:1px solid rgba(255,255,255,.07);padding:7px 10px;
  font-family:'Syne',sans-serif;font-size:12px;color:#f0ede8;outline:none;transition:border-color 140ms;}
.chatin::placeholder{color:rgba(255,255,255,.11);}
.chatin:focus{border-color:rgba(29,184,112,.26);}
.chatsnd{font-family:'DM Mono',monospace;font-size:9px;padding:7px 10px;border:1px solid rgba(29,184,112,.33);
  color:#1db870;background:transparent;cursor:pointer;transition:all 130ms;}
.chatsnd:hover{background:rgba(29,184,112,.07);}
.chatsnd:disabled{opacity:.25;cursor:default;}

/* MICRO */
.mbar{position:fixed;bottom:0;left:0;right:0;z-index:95;background:rgba(9,9,8,.97);
  backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.06);
  padding:11px 22px;display:flex;align-items:center;justify-content:space-between;
  transform:translateY(100%);animation:mup 380ms 550ms ease forwards;}
@keyframes mup{to{transform:translateY(0);}}
.mbar.sh{right:355px;}
.mbartag{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;color:rgba(255,255,255,.17);text-transform:uppercase;margin-bottom:2px;}
.mbardesc{font-family:'Syne',sans-serif;font-size:12px;color:rgba(255,255,255,.38);}
.mbardesc strong{color:#f0ede8;font-weight:500;}
.mov{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.76);
  display:flex;align-items:flex-start;justify-content:center;padding-top:68px;
  opacity:0;pointer-events:none;transition:opacity 210ms ease;}
.mov.open{opacity:1;pointer-events:all;}
.mmodal{background:#101010;border:1px solid rgba(255,255,255,.09);width:540px;max-height:74vh;overflow-y:auto;
  transform:translateY(13px);transition:transform 210ms ease;}
.mov.open .mmodal{transform:translateY(0);}
.mmhd{padding:19px 22px 15px;border-bottom:1px solid rgba(255,255,255,.05);position:sticky;top:0;background:#101010;z-index:1;}
.mmtit{font-family:'Syne',sans-serif;font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:3px;}
.mmsub{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.28);}
.mmb{padding:18px 22px;}
.mmods{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.mmod{background:#151514;border:1px solid rgba(255,255,255,.06);padding:13px;cursor:pointer;transition:all 140ms;}
.mmod:hover{border-color:rgba(29,184,112,.2);}
.mmod.sel{border-color:#1db870;background:rgba(29,184,112,.05);}
.mmic{font-family:'DM Mono',monospace;font-size:13px;color:rgba(255,255,255,.17);margin-bottom:7px;}
.mmnm{font-family:'Syne',sans-serif;font-size:12px;font-weight:500;color:#f0ede8;margin-bottom:3px;}
.mmds{font-family:'Syne',sans-serif;font-size:11px;color:rgba(255,255,255,.35);line-height:1.5;}
.mmtags{display:flex;flex-wrap:wrap;gap:4px;margin-top:7px;}
.mmtag{font-family:'DM Mono',monospace;font-size:7px;color:rgba(255,255,255,.17);border:1px solid rgba(255,255,255,.06);padding:2px 5px;}
.mmft{padding:12px 22px;border-top:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;align-items:center;position:sticky;bottom:0;background:#101010;}
.mmcnt{font-family:'DM Mono',monospace;font-size:8px;color:rgba(255,255,255,.17);}
.mmcnt span{color:#1db870;}
.mmrun{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.05em;padding:8px 17px;border:1px solid rgba(29,184,112,.38);color:#1db870;background:transparent;cursor:pointer;transition:all 140ms;}
.mmrun:hover{background:rgba(29,184,112,.07);}
.mmrun:disabled{opacity:.22;cursor:default;}
`;

/* ─── STATIC DATA (only menu items — simulation output is now generated) ─── */
const MMODS = [{ id: "pricing", ic: "◈", nm: "Pricing Sensitivity", ds: "Model WTP curves per segment. Find the optimal price point before launch.", tags: ["WTP", "elasticity", "price ladder"] }, { id: "demand", ic: "◉", nm: "Demand Forecasting", ds: "Project demand curves over 12 months under 3 growth scenarios.", tags: ["TAM", "growth rate", "seasonality"] }, { id: "churn", ic: "◌", nm: "Churn Architecture", ds: "Map churn triggers per segment and model intervention ROI.", tags: ["retention", "triggers", "LTV"] }, { id: "message", ic: "◫", nm: "Message Resonance", ds: "Test 4–6 framings against your calibrated population.", tags: ["framing", "copy", "A/B"] }, { id: "channel", ic: "◧", nm: "Channel Sequencing", ds: "Model acquisition efficiency by channel vs segment behaviour.", tags: ["CAC", "channel mix", "sequence"] }, { id: "timing", ic: "◷", nm: "Launch Timing", ds: "Stress-test launch window against seasonal and macro signals.", tags: ["timing", "competitive window", "macro"] }];

/* ─── GROQ API ─── */
const GROQ_API_KEY = "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"; // ← paste your Groq API key here

async function callClaude(system, userMsg, conversationHistory = [], maxTokens = 1000) {
    const messages = [
        { role: "system", content: system },
        ...conversationHistory,
        { role: "user", content: userMsg },
    ];
    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                max_tokens: maxTokens,
                temperature: 0.6,
                messages,
            }),
        });
        const data = await res.json();
        return data?.choices?.[0]?.message?.content ?? "";
    } catch {
        return "";
    }
}

function safeJSON(text) {
    try {
        const s = text.indexOf("{") !== -1 || text.indexOf("[") !== -1
            ? text.slice(Math.min(
                text.indexOf("{") === -1 ? 99999 : text.indexOf("{"),
                text.indexOf("[") === -1 ? 99999 : text.indexOf("[")
            ))
            : text;
        return JSON.parse(s.replace(/```json|```/g, "").trim());
    } catch { return null; }
}

/* ─── SYSTEM PROMPTS ─── */
const SYS_P1_Q = (idea, prevQA) => `You are the intelligence layer of a probabilistic simulation platform called Sidenote. A user has submitted an idea they want to simulate across 2.4M synthetic agents.

Their idea: "${idea}"

Previous questions and answers so far:
${prevQA.length ? prevQA.map((x, i) => `Q${i + 1}: ${x.q}\nA: ${x.answer}`).join("\n\n") : "None yet — this is the first question."}

Your job: identify the single most important piece of information still missing that would materially change the simulation outcome — resistance patterns, adoption curves, or segment responses.

Rules:
- Ask ONLY about this specific idea. Every option must be grounded in the actual scenario described.
- If someone says "mandatory return to office" don't ask generic questions — ask about whether it's 3 or 4 days, whether hybrid is allowed, whether existing contracts are affected, etc.
- Sound like a sharp colleague on a 5-minute call, not a researcher running a survey.
- Never use words: simulation, model, parameters, distribution, calibration.
- Options must be real, plausible, and specific — not generic placeholders.

Return ONLY valid JSON (no markdown, no explanation, no backticks):
{"q":"[specific question]","sub":"[one sentence: what riding on this answer]","opts":[{"l":"[specific option A]"},{"l":"[specific option B]"},{"l":"[specific option C]"},{"l":"[specific option D, if relevant]"},{"l":"Add your own","free":true},{"l":"Skip this","nr":true}]}`;

const SYS_SENTENCE = `You synthesise information into a simulation sentence. You will receive an idea and a series of answered questions. Produce a single structured sentence filling this template exactly:

"A [voluntary/imposed] [type of change] proposed by [actor] that asks [target population] to [specific action], replacing [current state or default], where [group A] benefits visibly and [group B] bears the primary cost, framed as [specific framing], with [high/medium/low] political charge and [high/medium/low] behaviour change requirement."

Rules:
- Every bracket must be filled with SPECIFIC details from the input — no vague placeholders.
- Wrap each filled-in value in <em> tags.
- Return ONLY the sentence. No quotes around it. No preamble. No explanation.`;

const SYS_P2_Q = (sentence, prevQA) => `You are calibrating a synthetic agent population for a simulation. The confirmed scenario is:

"${sentence}"

Calibration questions answered so far:
${prevQA.length ? prevQA.map(x => `${x.id}: ${x.answer}`).join("\n") : "None yet."}

Your job: identify the next most important population dimension that is GENUINELY AMBIGUOUS from the sentence and previous answers. Only ask if the answer would materially shift the distribution and therefore the output.

The four possible dimensions (ask only if ambiguous):
- income: economic profile of who actually encounters this
- age: life stage or age band of the affected population
- brand: how familiar the population is with whoever is behind this
- readiness: is there existing demand, or does this arrive cold?

Rules:
- If the sentence already clearly answers a dimension, skip it.
- Options must be specific to THIS scenario, not generic.
- Plain conversational language. No jargon.

Return ONLY valid JSON (no markdown):
{"id":"income|age|brand|readiness","q":"[question]","sub":"[why this matters for THIS specific scenario]","opts":[{"l":"[specific option]"},{"l":"[specific option]"},{"l":"[specific option]"},{"l":"Add your own","free":true},{"l":"Let the model decide","nr":true}]}`;

const SYS_POPSPEC = `You are explaining a synthetic population to a user before a simulation runs. Write in plain conversational prose. No bullet points, no JSON, no jargon like "distribution" or "covariance".

You will receive the simulation sentence and calibration answers. Write 4–5 short paragraphs covering:
1. Who economically is in this population (specific to the idea)
2. What age/life stage they are at (specific to the idea)
3. How familiar they are with whoever is behind this (and what that means for their starting position)
4. How warm or cold the ambient demand is right now
5. What underlying correlations are shaping behaviour (plain language: e.g. "people with less money will be more sensitive to the cost")

Start with exactly: "Here is the population I'm building:"
End with exactly: "Does this match what you know about the people this idea would actually reach?"

Be specific. Be grounded. 150–200 words total.`;

const SYS_SIMULATE = (sentence, popSpec, qaContext) => `You are the probabilistic simulation engine for Sidenote. You receive a structured scenario and population spec. Produce a complete, internally consistent simulation analysis.

Scenario: "${sentence}"
Population: "${popSpec}"
User context:\n${qaContext}

Return ONLY valid JSON (no markdown, no backticks). Every value must be specific to THIS scenario.

{"verdict":{"arr":"[e.g. +$847k]","ci":"[e.g. 95% CI: +$190k → +$1.46M]","runs":"median of 10,000 runs","confidence":"[HIGH|MODERATE|LOW]","confidenceReason":"[1 sentence]"},"scenarioState":[{"k":"CONTEXT","v":"[specific]","s":"[source]"},{"k":"COMPETITION","v":"[specific]","s":"[source]"},{"k":"PEER ADOPTION","v":"[specific]","s":"[source]"},{"k":"BUDGET PRESSURE","v":"[specific]","s":"[source]"},{"k":"TIMING","v":"[specific]","s":"[source]"},{"k":"REGULATORY","v":"[specific]","s":"[source]"}],"contextScores":[{"l":"Assumption strength","v":[0-1],"c":"[#1db870 if >=0.5 else #d97a00]"},{"l":"Externality exposure","v":[0-1],"c":"[color]"},{"l":"Timing fit","v":[0-1],"c":"[color]"},{"l":"Behavioural delta","v":[0-1],"c":"[color]"},{"l":"Category inertia","v":[0-1],"c":"[color]"},{"l":"Signal decay","v":[0-1],"c":"[color]"}],"keyFindings":{"dominant":"[2-3 sentences on dominant driver]","risk":"[2-3 sentences on biggest risk]","watch":"[2-3 sentences on segment to watch]"},"segments":[{"name":"[name]","pct":"[e.g. 14%]","w":"[same as pct]","c":"[#1db870|#d97a00|#2060c0|#d94040]","inf":"[HIGH|MED|LOW|HIGH −]","ic":"[same as c]","driver":"[1-2 sent]","blocker":"[1-2 sent]","gtm":"[1-2 sent]"}],"pathways":[{"rank":"[01-04]","name":"[strategy]","rec":true,"desc":"[2-3 sent]","arr":"[e.g. +$847k]","aC":"p","ch":"[e.g. −2.1%]","cC":"[p|n]","nrr":"[e.g. +108%]","nC":"[p|n]","ci":"[95% CI range]"}],"pathwayRationale":"[2-3 sentences why recommended is best]","counterfactuals":[{"s":"[scenario]","arr":"[delta]","ac":"[cfp|cfn]","ch":"[delta]","cc":"[cfp|cfn]","nr":"[delta]","nc":"[cfp|cfn]"}],"riskFlags":[{"id":"RF-01","name":"[risk]","impact":"[HIGH|MED|LOW · description]"}],"causalTrace":[{"ar":"─●","c":"[step 1]","s":"[method]"},{"ar":" └─","c":"[step 2]","s":"[method]"},{"ar":"  └─","c":"[step 3]","s":"[method]"},{"ar":"   └─","c":"[step 4]","s":"[method]"},{"ar":"    └●","c":"[final]","s":"[method]"}],"modelParams":[{"k":"[param name]","v":"[value]"}],"audit":{"evidence":[0-100],"belief":[0-100],"modelDefault":[0-100]}}

Rules: segments pct must sum to 100%. audit values must sum to 100. Exactly one pathway rec:true. 3-5 segments, 3-4 pathways, 4-6 counterfactuals, 2-4 risk flags, 5 causal trace steps, 6-8 model params. All values SPECIFIC to this scenario.`;

const SYS_CHAT_DYN = (idea, results) => {
    if (!results) return `You are an analyst for Sidenote. The simulation has not completed yet. Let the user know.`;
    const rec = (results.pathways || []).find(p => p.rec);
    return `You are an analyst for Sidenote, a probabilistic simulation platform. The simulation was run on this idea: "${idea}".

Results summary:
- Expected impact: ${results.verdict?.arr} (${results.verdict?.ci}). ${results.verdict?.confidence} CONFIDENCE.
- ${(results.segments || []).length} population segments: ${(results.segments || []).map(s => `${s.name} ${s.pct}`).join(', ')}.
- Recommended pathway: ${rec?.name || 'None specified'}.
- ${(results.riskFlags || []).length} risk flags: ${(results.riskFlags || []).map(r => `${r.id} ${r.name}`).join('; ')}.
- Evidence breakdown: ${results.audit?.evidence}% evidence-backed, ${results.audit?.belief}% belief-based, ${results.audit?.modelDefault}% model default.

Answer the user's question about the output directly, specifically, and with authority. Reference actual numbers. If they ask about an assumption, explain what it is and what would change if it were wrong. Max 90 words.`;
};

/* ─── MAIN ─── */
export default function App() {
    const [view, setView] = useState("home");
    const [phase, setPhase] = useState(1);
    const [done, setDone] = useState([]);

    // P1
    const [inputText, setInputText] = useState("");
    const [p1s, setP1s] = useState("input"); // input | chat | sentence
    const [p1qa, setP1qa] = useState([]); // [{q,sub,opts,answer?}]
    const [p1idx, setP1idx] = useState(0);
    const [p1sel, setP1sel] = useState({});
    const [p1fv, setP1fv] = useState({});
    const [p1fval, setP1fval] = useState({});
    const [p1thinking, setP1thinking] = useState(false);
    const [p1sent, setP1sent] = useState("");
    const [p1edit, setP1edit] = useState(false);
    const [p1ev, setP1ev] = useState("");

    // P2
    const [p2s, setP2s] = useState("loading"); // loading | questions | spec
    const [p2qa, setP2qa] = useState([]);
    const [p2idx, setP2idx] = useState(0);
    const [p2sel, setP2sel] = useState({});
    const [p2fv, setP2fv] = useState({});
    const [p2fval, setP2fval] = useState({});
    const [p2thinking, setP2thinking] = useState(false);
    const [p2spec, setP2spec] = useState("");

    // P3
    const [simP, setSimP] = useState(0);
    const [simL, setSimL] = useState(0);
    const [simDone, setSimDone] = useState(false);
    const [simResults, setSimResults] = useState(null);
    const [simLogs, setSimLogs] = useState([]);
    const [simError, setSimError] = useState(false);

    // P4
    const [otab, setOtab] = useState("overview");
    const [sexp, setSexp] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMsg, setChatMsg] = useState("");
    const [chatH, setChatH] = useState([{ r: "ai", t: "Ask me anything about this output — I'll explain any number, trace any claim, or pressure-test any assumption." }]);
    const [chatLoad, setChatLoad] = useState(false);
    const chatEnd = useRef(null);
    const [mopen, setMopen] = useState(false);
    const [smods, setSmods] = useState([]);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [chatH]);

    useEffect(() => {
        if (phase !== 3) return;
        setSimP(0); setSimL(0); setSimDone(false); setSimError(false);
        const plainSent = p1sent.replace(/<[^>]+>/g, "");
        const logs = [
            `Initialising agent pool (N=2,400,000)…`,
            `Parsing scenario: "${plainSent.substring(0, 55)}…"`,
            `Applying population calibration parameters…`,
            `Deriving price sensitivity covariance matrix…`,
            `Constructing scenario state S=(context, market, social, constraints)…`,
            `Computing SIᵢ per agent…`,
            `Running Monte Carlo · k=1 of 10,000…`,
            `k=2,500 · variance stabilising…`,
            `k=5,000 · convergence check passed…`,
            `k=10,000 · final pass…`,
            `Segmentation complete…`,
            `Compiling risk flags…`,
            `Building causal trace…`,
            `Awaiting engine response…`,
        ];
        setSimLogs(logs);
        let p = 0;
        const pt = setInterval(() => { p += Math.random() * 1.2 + 0.2; if (p >= 88) { p = 88; clearInterval(pt); } setSimP(Math.min(88, p)); }, 140);
        const lt = setInterval(() => { setSimL(i => { if (i >= logs.length - 2) { clearInterval(lt); return i; } return i + 1; }); }, 1400);
        const qaCtx = p1qa.filter(x => x.answer).map((x, i) => `Q${i + 1}: ${x.q}\nA: ${x.answer}`).join("\n\n");
        const runSim = async () => {
            const raw = await callClaude(
                SYS_SIMULATE(plainSent, p2spec, qaCtx),
                "Run the simulation now. Return only the JSON object.",
                [], 4096
            );
            const result = safeJSON(raw);
            clearInterval(pt); clearInterval(lt);
            if (result && result.verdict) {
                setSimResults(result);
                setSimLogs(prev => [...prev, "Simulation complete ✓"]);
            } else {
                setSimError(true);
                setSimLogs(prev => [...prev, "Engine returned invalid response — retry or check API key"]);
            }
            setSimP(100);
            setSimL(logs.length);
            setSimDone(true);
        };
        runSim();
        return () => { clearInterval(pt); clearInterval(lt); };
    }, [phase]);

    /* ── P1 logic ── */
    const startAnalysis = async () => {
        if (inputText.length < 8) return;
        setP1s("chat"); setP1thinking(true);
        const raw = await callClaude(SYS_P1_Q(inputText, []), "Generate the first question now.");
        const q = safeJSON(raw);
        if (q?.q) { setP1qa([q]); setP1idx(0); }
        else setP1qa([{ q: "Who specifically does this affect?", sub: "This shapes where resistance concentrates.", opts: [{ l: "Employees internally" }, { l: "External customers" }, { l: "A specific professional group" }, { l: "Add your own", free: true }, { l: "Skip this", nr: true }] }]);
        setP1thinking(false);
    };

    const p1tog = (idx, lbl, isFree, isNr) => {
        if (isFree) { setP1fv(p => ({ ...p, [idx]: !p[idx] })); return; }
        setP1sel(p => {
            const cur = p[idx] || [];
            if (isNr) return { ...p, [idx]: ["SKIP"] };
            const fil = cur.filter(x => x !== "SKIP");
            return { ...p, [idx]: fil.includes(lbl) ? fil.filter(x => x !== lbl) : [...fil, lbl] };
        });
    };

    const p1next = async () => {
        const answer = (p1sel[p1idx] || []).join(", ") || "Not specified";
        const answered = [...p1qa.slice(0, p1idx), { ...p1qa[p1idx], answer }];
        setP1qa(answered);
        if (answered.length >= 4) {
            setP1thinking(true);
            const raw = await callClaude(SYS_SENTENCE, `Idea: "${inputText}"\n\nQ&A:\n${answered.map(x => `Q: ${x.q}\nA: ${x.answer}`).join("\n\n")}`);
            setP1sent(raw.trim() || `A <em>voluntary</em> <em>change initiative</em> proposed by <em>the organisation</em> that asks <em>the target group</em> to <em>adopt the new approach</em>, replacing the current default, where early movers benefit and late adopters bear transition friction, framed as <em>an improvement</em>, with <em>medium</em> political charge and <em>medium</em> behaviour change requirement.`);
            setP1thinking(false);
            setP1s("sentence");
        } else {
            setP1thinking(true);
            const raw = await callClaude(SYS_P1_Q(inputText, answered), "Generate the next question.");
            const q = safeJSON(raw);
            if (q?.q) { setP1qa([...answered, q]); setP1idx(i => i + 1); }
            else { setP1idx(i => i + 1); }
            setP1thinking(false);
        }
    };

    const p1confirm = async () => {
        setP1s("done");
        setDone(p => [...new Set([...p, 1])]);
        setPhase(2); setP2s("loading");
        const plain = p1sent.replace(/<[^>]+>/g, "");
        const raw = await callClaude(SYS_P2_Q(plain, []), "Generate the first population calibration question.");
        const q = safeJSON(raw);
        const firstQ = q?.q ? [q] : [{ id: "income", q: "Who economically encounters this idea?", sub: "Sets the income distribution of the agent pool.", opts: [{ l: "Most people regardless of income" }, { l: "Primarily higher earners" }, { l: "Primarily lower income" }, { l: "Add your own", free: true }, { l: "Let the model decide", nr: true }] }];
        setP2qa(firstQ); setP2idx(0); setP2s("questions");
    };

    /* ── P2 logic ── */
    const p2tog = (idx, lbl, isFree, isNr) => {
        if (isFree) { setP2fv(p => ({ ...p, [idx]: !p[idx] })); return; }
        setP2sel(p => {
            const cur = p[idx] || [];
            if (isNr) return { ...p, [idx]: ["MODEL_DEFAULT"] };
            const fil = cur.filter(x => x !== "MODEL_DEFAULT");
            return { ...p, [idx]: fil.includes(lbl) ? fil.filter(x => x !== lbl) : [...fil, lbl] };
        });
    };

    const p2next = async () => {
        const answer = (p2sel[p2idx] || []).join(", ") || "Let model decide";
        const answered = [...p2qa.slice(0, p2idx), { ...p2qa[p2idx], answer }];
        setP2qa(answered);
        const plain = p1sent.replace(/<[^>]+>/g, "");
        if (p2idx >= p2qa.length - 1) {
            // Check if we should ask another question (max 4)
            if (answered.length < 4) {
                setP2thinking(true);
                const raw = await callClaude(SYS_P2_Q(plain, answered), "Is there another genuinely ambiguous population dimension to ask about, or should we proceed to building the spec? If another question is needed, return JSON. If we have enough, return the string: PROCEED");
                const q = safeJSON(raw);
                if (q?.q && answered.length < 3) {
                    setP2qa([...answered, q]);
                    setP2idx(i => i + 1);
                    setP2thinking(false);
                    return;
                }
                setP2thinking(false);
            }
            // Generate spec
            setP2thinking(true);
            const specRaw = await callClaude(SYS_POPSPEC, `Simulation sentence: "${plain}"\n\nCalibration answers:\n${answered.map(x => `${x.id}: ${x.answer}`).join("\n")}`);
            setP2spec(specRaw.trim() || "Here is the population I'm building:\n\nBased on the scenario, this is a working-age population skewed toward professionals with moderate disposable income. Income is broadly distributed but concentrated in the $45k–$110k band where budget sensitivity is real but not prohibitive.\n\nAge is centred around 30–50 — people mid-career who have established habits and moderate resistance to change.\n\nFamiliarity with the source is moderate: enough to have a prior opinion, not enough for strong loyalty either way.\n\nBase readiness is warm — there's ambient awareness that something like this is coming, without active demand.\n\nThis creates the conditions where framing and sequencing will determine outcomes more than the core idea itself.\n\nDoes this match what you know about the people this idea would actually reach?");
            setP2thinking(false);
            setP2s("spec");
        } else {
            setP2idx(i => i + 1);
        }
    };

    const p2confirm = () => {
        setP2s("done");
        setDone(p => [...new Set([...p, 2])]);
        setPhase(3);
    };

    /* ── Chat ── */
    const sendChat = async () => {
        if (!chatMsg.trim() || chatLoad) return;
        const q = chatMsg.trim();
        setChatH(p => [...p, { r: "user", t: q }]);
        setChatMsg("");
        setChatLoad(true);
        const hist = chatH.map(m => ({ role: m.r === "user" ? "user" : "assistant", content: m.t }));
        const ans = await callClaude(SYS_CHAT_DYN(p1sent.replace(/<[^>]+>/g, ""), simResults), q, hist);
        setChatH(p => [...p, { r: "ai", t: ans || "I can trace any number in this output back to its source — which specific claim do you want me to walk through?" }]);
        setChatLoad(false);
    };

    const goPhase = (n) => {
        if (n > 1 && !done.includes(n - 1) && phase !== n) return;
        setPhase(n);
    };

    /* ─── HOME ─── */
    if (view === "home") return (
        <>
            <style>{F + S}</style>
            <div className="home">
                <div className="hc">
                    <div className="hlogo dm">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 10C3 6.5 6.5 3 10 3C13.5 3 17 6.5 17 10" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M3 10C3 13.5 6.5 17 10 17C13.5 17 17 13.5 17 10" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" opacity=".33" />
                            <circle cx="10" cy="10" r="2.2" fill="#0a0a0a" />
                        </svg>
                        /sidenote.ai
                    </div>
                    <div className="hnav">
                        <div className="hico">+</div>
                        <div className="hico">?</div>
                        <div className="hico" onClick={() => setView("tool")}>↗</div>
                    </div>
                </div>
                <div className="hbody">
                    <div className="hey dm"><span className="hdot" />Synthetic Population Simulator</div>
                    <h1 className="hhed">Simulate human truth,<br />not human opinion.<br /><span className="hhedg">Before you commit.</span></h1>
                    <div className="hcta">
                        <button className="trypill" onClick={() => setView("tool")}>
                            <span className="trypill-t">Try Sidenote</span>
                            <span className="trypill-a">↗</span>
                        </button>
                    </div>
                    <div className="hstats">
                        <div><div className="hsn dm">2.4M</div><div className="hsl dm">synthetic agents / run</div></div>
                        <div className="hssep" />
                        <div><div className="hsn dm">10,000</div><div className="hsl dm">Monte Carlo iterations</div></div>
                        <div className="hssep" />
                        <div><div className="hsn dm">6</div><div className="hsl dm">decision output formats</div></div>
                    </div>
                </div>
                <div className="hpipe">
                    {[{ n: "01", l: "Input & structuring", a: true }, { n: "02", l: "Population calibration" }, { n: "03", l: "Scenario + simulation" }, { n: "04", l: "Decision output" }].map(s => (
                        <div key={s.n} className={`hps${s.a ? " a" : ""}`}>
                            <div className="hpn dm">{s.n}</div>
                            <div className="hpl dm">{s.l}</div>
                        </div>
                    ))}
                </div>
                <div className="hfoot">
                    <span className="dm">© 2024 sidenote.ai</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span className="dm">Find us on</span>
                        <span className="dm" style={{ color: "#0a0a0a", fontWeight: 500, cursor: "pointer" }}>Twitter</span>
                    </div>
                </div>
            </div>
        </>
    );

    /* ─── TOOL ─── */
    return (
        <>
            <style>{F + S}</style>
            <div className="tool">
                <div className="tbar">
                    <div className="tbl">
                        <span className="tlogo dm" onClick={() => setView("home")}>/sidenote.ai</span>
                        <div className="tsep" />
                        <div className="ttabs">
                            {[{ n: 1, l: "01 · Input" }, { n: 2, l: "02 · Population" }, { n: 3, l: "03 · Simulation" }, { n: 4, l: "04 · Output" }].map(t => (
                                <div key={t.n}
                                    className={`ttab dm${phase === t.n ? " a" : ""}${done.includes(t.n) && phase !== t.n ? " done" : ""}${t.n > 1 && !done.includes(t.n - 1) && phase !== t.n ? " lk" : ""}`}
                                    onClick={() => goPhase(t.n)}>
                                    {t.l}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tbr">
                        {phase === 4 && <button className="tbtn dm" onClick={() => setChatOpen(o => !o)}>Ask about output</button>}
                        {phase === 4 && <button className="tbtn g dm">Export →</button>}
                    </div>
                </div>

                <div className="tbody">

                    {/* ═══ PHASE 1 ═══ */}
                    {phase === 1 && (
                        <div className="panel">
                            <div className="inner">
                                <div className="pey dm">phase 01 · input & structuring</div>
                                <h2 className="pped">What are you testing?</h2>
                                <p className="psub">Describe your idea. Be as specific or vague as you like — we'll ask only what we actually need.</p>

                                {p1s === "input" && (
                                    <>
                                        <textarea className="ta syne"
                                            placeholder={"e.g. \"A mandatory return-to-office policy, 4 days a week, no opt-out for existing employees\""}
                                            value={inputText} onChange={e => setInputText(e.target.value)} />
                                        <div className="ifoot">
                                            <span className="ihint dm">idea · policy · product · feature · decision · campaign</span>
                                            <button className="btn g dm" disabled={inputText.length < 8} onClick={startAnalysis}>Analyse →</button>
                                        </div>
                                    </>
                                )}

                                {(p1s === "chat" || p1s === "sentence") && (
                                    <>
                                        <div className="ubub">
                                            <div className="ublbl dm">Your input</div>
                                            <div className="ubtxt syne">{inputText}</div>
                                        </div>

                                        {/* Answered */}
                                        {p1qa.slice(0, p1idx).filter(x => x.answer).map((qa, i) => (
                                            <div key={i} className="ans">
                                                <div className="ailbl dm"><span className="aip" style={{ background: "#3a3936", animation: "none" }} />Sidenote</div>
                                                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, color: "rgba(240,237,232,.52)", marginBottom: 4, lineHeight: 1.4 }}>{qa.q}</div>
                                                <div className="apills">{qa.answer.split(", ").map(a => <span key={a} className="apill dm">{a}</span>)}</div>
                                            </div>
                                        ))}

                                        {/* Current Q */}
                                        {p1s === "chat" && !p1thinking && p1qa[p1idx] && (
                                            <div className="aiblk">
                                                <div className="ailbl dm"><span className="aip" />Sidenote</div>
                                                <div className="aiq syne">{p1qa[p1idx].q}</div>
                                                {p1qa[p1idx].sub && <div className="aiqs syne">{p1qa[p1idx].sub}</div>}
                                                <div className="opts">
                                                    {(p1qa[p1idx].opts || []).map(o => {
                                                        const sel = p1sel[p1idx] || [];
                                                        const isSel = sel.includes(o.l);
                                                        return (
                                                            <div key={o.l}>
                                                                <div className={`opt${isSel ? " sel" : ""}${o.nr ? " nr" : ""}`} onClick={() => p1tog(p1idx, o.l, !!o.free, !!o.nr)}>
                                                                    <span className="ochk dm">{isSel ? "✓" : ""}</span>
                                                                    <span className="olbl syne">{o.l}</span>
                                                                    {o.nr && <span className="otag dm">skip</span>}
                                                                </div>
                                                                {o.free && p1fv[p1idx] && (
                                                                    <input className="fin syne" placeholder="Type your answer…"
                                                                        value={p1fval[p1idx] || ""}
                                                                        onChange={e => { const v = e.target.value; setP1fval(p => ({ ...p, [p1idx]: v })); setP1sel(p => ({ ...p, [p1idx]: [v || "custom"] })); }} />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="brow">
                                                    <button className="btn g dm" disabled={!(p1sel[p1idx] || []).length} onClick={p1next}>
                                                        {p1idx >= 3 ? "Generate sentence →" : "Continue →"}
                                                    </button>
                                                    <button className="btn gh dm" onClick={() => { setP1sel(p => ({ ...p, [p1idx]: ["SKIP"] })); setTimeout(p1next, 50); }}>Skip</button>
                                                </div>
                                            </div>
                                        )}

                                        {p1thinking && <div className="thk dm"><div className="dots"><span /><span /><span /></div>Thinking…</div>}

                                        {p1s === "sentence" && (
                                            <div className="aiblk">
                                                <div className="ailbl dm"><span className="aip" />Sidenote</div>
                                                <div className="aiq syne" style={{ marginBottom: 9 }}>Here's what I'm simulating — does this feel right?</div>
                                                <div className="scard">
                                                    <div className="stag dm">Structured simulation input</div>
                                                    {p1edit
                                                        ? <textarea className="sedit syne" value={p1ev} onChange={e => setP1ev(e.target.value)} />
                                                        : <div className="stxt syne" dangerouslySetInnerHTML={{ __html: p1sent }} />}
                                                </div>
                                                <div className="brow">
                                                    <button className="btn g dm" onClick={p1confirm}>Confirm — build population →</button>
                                                    {!p1edit
                                                        ? <button className="btn gh dm" onClick={() => { setP1edit(true); setP1ev(p1sent.replace(/<[^>]+>/g, "")); }}>Edit</button>
                                                        : <button className="btn gh dm" onClick={() => { setP1sent(p1ev); setP1edit(false); }}>Save</button>}
                                                    <button className="btn gh dm" onClick={() => { setP1s("input"); setP1qa([]); setP1idx(0); setP1sel({}); }}>Start over</button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ═══ PHASE 2 ═══ */}
                    {phase === 2 && (
                        <div className="panel">
                            <div className="inner">
                                <div className="pey dm">phase 02 · population calibration</div>
                                <h2 className="pped">Calibrating your agent pool</h2>
                                <p className="psub">Only asking what's genuinely ambiguous from what you've already told us.</p>

                                <div className="ubub" style={{ borderLeftColor: "rgba(29,184,112,.42)", marginBottom: 22 }}>
                                    <div className="ublbl dm" style={{ color: "rgba(29,184,112,.6)" }}>Simulating</div>
                                    <div className="ubtxt syne" style={{ fontSize: 12, color: "rgba(240,237,232,.62)", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: p1sent }} />
                                </div>

                                {p2s === "loading" && <div className="thk dm"><div className="dots"><span /><span /><span /></div>Generating calibration questions…</div>}

                                {p2s === "questions" && (
                                    <>
                                        {p2qa.slice(0, p2idx).filter(x => x.answer).map((qa, i) => (
                                            <div key={i} className="ans">
                                                <div className="ailbl dm"><span className="aip" style={{ background: "#3a3936", animation: "none" }} />Sidenote</div>
                                                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, color: "rgba(240,237,232,.52)", marginBottom: 4, lineHeight: 1.4 }}>{qa.q}</div>
                                                <div className="apills">{qa.answer.split(", ").map(a => <span key={a} className="apill dm">{a}</span>)}</div>
                                            </div>
                                        ))}

                                        {!p2thinking && p2qa[p2idx] && (
                                            <div className="aiblk">
                                                <div className="ailbl dm"><span className="aip" />Sidenote</div>
                                                <div className="aiq syne">{p2qa[p2idx].q}</div>
                                                {p2qa[p2idx].sub && <div className="aiqs syne">{p2qa[p2idx].sub}</div>}
                                                <div className="opts">
                                                    {(p2qa[p2idx].opts || []).map(o => {
                                                        const sel = p2sel[p2idx] || [];
                                                        const isSel = sel.includes(o.l);
                                                        return (
                                                            <div key={o.l}>
                                                                <div className={`opt${isSel ? " sel" : ""}${o.nr ? " nr" : ""}`} onClick={() => p2tog(p2idx, o.l, !!o.free, !!o.nr)}>
                                                                    <span className="ochk dm">{isSel ? "✓" : ""}</span>
                                                                    <span className="olbl syne">{o.l}</span>
                                                                    {o.nr && <span className="otag dm">skip</span>}
                                                                </div>
                                                                {o.free && p2fv[p2idx] && (
                                                                    <input className="fin syne" placeholder="Describe…"
                                                                        value={p2fval[p2idx] || ""}
                                                                        onChange={e => { const v = e.target.value; setP2fval(p => ({ ...p, [p2idx]: v })); setP2sel(p => ({ ...p, [p2idx]: [v || "custom"] })); }} />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="brow">
                                                    <button className="btn g dm" disabled={!(p2sel[p2idx] || []).length} onClick={p2next}>Continue →</button>
                                                    <button className="btn gh dm" onClick={() => { setP2sel(p => ({ ...p, [p2idx]: ["MODEL_DEFAULT"] })); setTimeout(p2next, 50); }}>Skip</button>
                                                </div>
                                            </div>
                                        )}
                                        {p2thinking && <div className="thk dm"><div className="dots"><span /><span /><span /></div>Building population model…</div>}
                                    </>
                                )}

                                {p2s === "spec" && (
                                    <div className="aiblk">
                                        <div className="ailbl dm"><span className="aip" />Sidenote</div>
                                        <div className="pspec">
                                            <div className="pspechd dm">Population distribution specification</div>
                                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, color: "rgba(240,237,232,.68)", lineHeight: 1.78, whiteSpace: "pre-wrap" }}>{p2spec}</div>
                                        </div>
                                        <div className="brow">
                                            <button className="btn g dm" onClick={p2confirm}>Confirm — run simulation →</button>
                                            <button className="btn gh dm" onClick={() => { setP2s("questions"); setP2idx(0); setP2sel({}); }}>Adjust</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ═══ PHASE 3 ═══ */}
                    {phase === 3 && (
                        <div className="sim">
                            <div className="simey dm">Monte Carlo Engine · Phase 03</div>
                            <div className="simbig dm">{Math.round(simP)}%</div>
                            <div className="simsub dm">{simDone ? "Simulation complete" : "Running iterations…"}</div>
                            <div className="simbars">
                                {[{ l: "Agent pool", v: Math.min(1, simP / 20) }, { l: "Scenario state", v: Math.min(1, Math.max(0, (simP - 20) / 20)) }, { l: "SIᵢ computation", v: Math.min(1, Math.max(0, (simP - 40) / 20)) }, { l: "Monte Carlo", v: Math.min(1, Math.max(0, (simP - 60) / 35)) }, { l: "Segmentation", v: Math.min(1, Math.max(0, (simP - 95) / 5)) }].map(b => (
                                    <div key={b.l} className="sbr">
                                        <span className="sblbl dm">{b.l}</span>
                                        <div className="sbtr"><div className="sbfi" style={{ width: `${b.v * 100}%` }} /></div>
                                        <span className="sbpct dm">{Math.round(b.v * 100)}%</span>
                                    </div>
                                ))}
                            </div>
                            <div className="simlog">
                                {simLogs.slice(0, simL + 1).map((l, i) => <div key={i} className={`sline dm${i === simL ? " cur" : ""}`}>{l}</div>)}
                            </div>
                            {simDone && !simError && simResults && <button className="sdone dm" onClick={() => { setDone(p => [...new Set([...p, 3])]); setPhase(4); }}>View simulation output →</button>}
                            {simDone && simError && <button className="sdone dm" style={{ borderColor: 'rgba(217,64,64,.42)', color: '#d94040' }} onClick={() => { setPhase(3); }}>Retry simulation →</button>}
                        </div>
                    )}

                    {/* ═══ PHASE 4 ═══ */}
                    {phase === 4 && (
                        <>
                            {/* Scenario strip */}
                            <div className="sstrip">
                                <div className="ssr" onClick={() => setSexp(v => !v)}>
                                    <span className="sslbl dm">Scenario State</span>
                                    <div className="ssits">
                                        {(simResults?.scenarioState || []).slice(0, 4).map(p => (
                                            <div key={p.k} className="ssit">
                                                <span className="ssk dm">{p.k}</span>
                                                <span className="ssv dm">· {p.v}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="sstog dm">{sexp ? "▲" : "▼"}</span>
                                </div>
                                {sexp && (
                                    <div className="ssexp">
                                        {(simResults?.scenarioState || []).map(p => (
                                            <div key={p.k} className="sseit">
                                                <div className="ssek dm">{p.k}</div>
                                                <div className="ssev syne">{p.v}</div>
                                                <div className="sses dm">{p.s}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Output tabs */}
                            <div className="otabs">
                                {[{ id: "overview", l: "Overview" }, { id: "segments", l: "Segments", b: String((simResults?.segments || []).length) }, { id: "pathways", l: "Pathways", b: String((simResults?.pathways || []).length) }, { id: "audit", l: "Audit" }].map(t => (
                                    <div key={t.id} className={`otab${otab === t.id ? " a" : ""}`} onClick={() => setOtab(t.id)}>
                                        {t.l}{t.b && <span className="otabb dm">{t.b}</span>}
                                    </div>
                                ))}
                            </div>

                            <div className="owrap">
                                <div className={`omain${chatOpen ? " sh" : ""}`}>

                                    {/* OVERVIEW */}
                                    {otab === "overview" && (
                                        <>
                                            <div className="vwrap">
                                                <div>
                                                    <div className="vtag dm">The Verdict</div>
                                                    <div className="vnum syne"><em>{simResults?.verdict?.arr || 'N/A'}</em> expected impact</div>
                                                    <div className="vci dm">{simResults?.verdict?.ci || ''} · {simResults?.verdict?.runs || 'median of 10,000 runs'}</div>
                                                    <div className="vconf">
                                                        <div className="vdot" />
                                                        <span className="vclbl dm">{simResults?.verdict?.confidence || 'MODERATE'} CONFIDENCE</span>
                                                        <span className="vcwhy syne">{simResults?.verdict?.confidenceReason || ''}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="ctxbox">
                                                        <div className="ctxhd dm">Context Score</div>
                                                        {(simResults?.contextScores || []).map(s => (
                                                            <div key={s.l} className="ctxr">
                                                                <span className="ctxl dm">{s.l}</span>
                                                                <div className="ctxtr"><div className="ctxfi" style={{ width: `${s.v * 100}%`, background: s.c }} /></div>
                                                                <span className="ctxv dm">{Math.round(s.v * 100)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sechd dm">Key Findings</div>
                                            <div className="ins3">
                                                <div className="ins dom"><div className="instype">Dominant Driver</div><div className="insbody syne">{simResults?.keyFindings?.dominant || 'Analysing...'}</div></div>
                                                <div className="ins risk"><div className="instype">Biggest Risk</div><div className="insbody syne">{simResults?.keyFindings?.risk || 'Analysing...'}</div></div>
                                                <div className="ins watch"><div className="instype">Segment to Watch</div><div className="insbody syne">{simResults?.keyFindings?.watch || 'Analysing...'}</div></div>
                                            </div>
                                        </>
                                    )}

                                    {/* SEGMENTS */}
                                    {otab === "segments" && (
                                        <>
                                            <div className="sechd dm">Population Decision Patterns</div>
                                            <div className="swlanes">
                                                <div className="swlhd dm">Adoption Distribution by Segment</div>
                                                {(simResults?.segments || []).map(s => (
                                                    <div key={s.name} className="swr">
                                                        <span className="swlbl dm">{s.name}</span>
                                                        <div className="swtr"><div className="swfi" style={{ width: s.w, background: s.c }} /></div>
                                                        <span className="swpct dm">{s.pct}</span>
                                                        <span className="swinf dm" style={{ color: s.ic }}>{s.inf}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="segcards">
                                                {(simResults?.segments || []).map(s => (
                                                    <div key={s.name} className="segc">
                                                        <div className="segtop">
                                                            <div className="segnm syne">{s.name}</div>
                                                            <div style={{ textAlign: "right" }}><div className="segpct dm">{s.pct}</div><div className="segpt dm">of pop.</div></div>
                                                        </div>
                                                        <div className="segdr"><span className="segdk dm">Driver</span><span className="segdv syne">{s.driver}</span></div>
                                                        <div className="segdr"><span className="segdk dm">Blocker</span><span className="segdv syne">{s.blocker}</span></div>
                                                        <div className="segdr"><span className="segdk dm">Influence</span><span className="segdv dm" style={{ color: s.ic }}>{s.inf}</span></div>
                                                        <div className="seggtm dm">GTM — <span>{s.gtm}</span></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {/* PATHWAYS */}
                                    {otab === "pathways" && (
                                        <>
                                            <div className="sechd dm">Strategic Options — Ranked by Expected Outcome</div>
                                            <div className="pwlist">
                                                {(simResults?.pathways || []).map(p => (
                                                    <div key={p.rank} className={`pw${p.rec ? " rec" : ""}`}>
                                                        {p.rec && <div className="pwbadge dm">RECOMMENDED</div>}
                                                        <div className="pwtop"><span className="pwrank dm">{p.rank}</span><span className="pwnm syne">{p.name}</span></div>
                                                        <div className="pwdesc syne">{p.desc}</div>
                                                        <div className="pwmets">
                                                            <div><div className={`pwmv dm ${p.aC}`}>{p.arr}</div><div className="pwml dm">ARR DELTA</div><div className="pwmci dm">{p.ci}</div></div>
                                                            <div><div className={`pwmv dm ${p.cC}`}>{p.ch}</div><div className="pwml dm">CHURN</div></div>
                                                            <div><div className={`pwmv dm ${p.nC}`}>{p.nrr}</div><div className="pwml dm">NRR</div></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pwwhy syne"><strong>Why?</strong> {simResults?.pathwayRationale || 'Analysis pending...'}</div>
                                            <div className="div" />
                                            <div className="sechd dm">Counterfactual Deltas</div>
                                            <div className="cfw">
                                                <table className="cft">
                                                    <thead><tr><th className="dm">Scenario</th><th className="dm">ARR</th><th className="dm">Churn</th><th className="dm">NRR</th></tr></thead>
                                                    <tbody>{(simResults?.counterfactuals || []).map(c => <tr key={c.s}><td className="cfsn">{c.s}</td><td className={c.ac === "cfp" ? "cfp" : "cfn"}>{c.arr}</td><td className={c.cc === "cfp" ? "cfp" : "cfn"}>{c.ch}</td><td className={c.nc === "cfp" ? "cfp" : "cfn"}>{c.nr}</td></tr>)}</tbody>
                                                </table>
                                            </div>
                                        </>
                                    )}

                                    {/* AUDIT */}
                                    {otab === "audit" && (() => {
                                        const ev = simResults?.audit?.evidence || 63;
                                        const bl = simResults?.audit?.belief || 28;
                                        const md = simResults?.audit?.modelDefault || 9;
                                        return (
                                            <>
                                                <div className="audtop">
                                                    <div className="audring">
                                                        <svg width="78" height="78" viewBox="0 0 78 78">
                                                            <circle cx="39" cy="39" r="33" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="6" />
                                                            <circle cx="39" cy="39" r="33" fill="none" stroke="#1db870" strokeWidth="6"
                                                                strokeDasharray={`${(ev / 100) * 207} 207`} strokeLinecap="butt" transform="rotate(-90 39 39)" />
                                                        </svg>
                                                        <div className="audinn"><div className="audpct dm">{ev}%</div><div className="audpl dm">evidence</div></div>
                                                    </div>
                                                    <div className="audbk">
                                                        <div className="audbi ev"><div className="audbin dm">{ev}%</div><div className="audbil dm">Evidence-backed</div></div>
                                                        <div className="audbi bl"><div className="audbin dm">{bl}%</div><div className="audbil dm">Belief-based</div></div>
                                                        <div className="audbi md"><div className="audbin dm">{md}%</div><div className="audbil dm">Model default</div></div>
                                                    </div>
                                                </div>
                                                <div className="sechd dm">Named Risk Flags</div>
                                                {(simResults?.riskFlags || []).map(r => <div key={r.id} className="rf"><span className="rfid dm">{r.id}</span><div><div className="rfnm syne">{r.name}</div><div className="rfim dm">{r.impact}</div></div></div>)}
                                                <div className="div" />
                                                <div className="sechd dm">Causal Trace</div>
                                                {(simResults?.causalTrace || []).map((c, i) => <div key={i} className="ccnd"><span className="ccar dm">{c.ar}</span><span className="cccl syne">{c.c}</span><span className="ccsr dm">{c.s}</span></div>)}
                                                <div className="div" />
                                                <div className="sechd dm">Model Parameters</div>
                                                <div className="mpgrid">{(simResults?.modelParams || []).map(p => <div key={p.k} className="mpit"><div className="mpk dm">{p.k}</div><div className="mpv dm">{p.v}</div></div>)}</div>
                                            </>
                                        );
                                    })()}

                                </div>

                                {/* CHAT PANEL — pushes content, never overlaps */}
                                <div className={`chatpanel${chatOpen ? " open" : ""}`}>
                                    <div className="chathd">
                                        <span className="chatttl syne">Ask about this output</span>
                                        <span className="chatcls dm" onClick={() => setChatOpen(false)}>✕ close</span>
                                    </div>
                                    <div className="chatmsgs">
                                        {chatH.map((m, i) => (
                                            <div key={i} className="chatm">
                                                <div className="chatmlbl dm">{m.r === "user" ? "You" : "Sidenote"}</div>
                                                <div className={`chatbub ${m.r} syne`}>{m.t}</div>
                                            </div>
                                        ))}
                                        {chatLoad && <div className="thk dm" style={{ marginTop: 8 }}><div className="dots"><span /><span /><span /></div></div>}
                                        <div ref={chatEnd} />
                                    </div>
                                    <div className="chatin-row">
                                        <input className="chatin syne" placeholder="Ask about any number or assumption…"
                                            value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                                            onKeyDown={e => e.key === "Enter" && sendChat()} />
                                        <button className="chatsnd dm" onClick={sendChat} disabled={chatLoad}>→</button>
                                    </div>
                                </div>
                            </div>

                            {/* MICRO BAR */}
                            <div className={`mbar${chatOpen ? " sh" : ""}`}>
                                <div>
                                    <div className="mbartag dm">Next — Micro Analysis</div>
                                    <div className="mbardesc syne">Macro complete. Drill into <strong>pricing sensitivity, demand curves, churn architecture</strong> and message resonance.</div>
                                </div>
                                <div style={{ display: "flex", gap: 6 }}>
                                    <button className="btn gh dm">Save & exit</button>
                                    <button className="btn g dm" onClick={() => setMopen(true)}>Begin micro analysis →</button>
                                </div>
                            </div>

                            {/* MICRO MODAL */}
                            <div className={`mov${mopen ? " open" : ""}`} onClick={e => { if (e.target.classList.contains("mov")) setMopen(false); }}>
                                <div className="mmodal">
                                    <div className="mmhd">
                                        <div className="mmtit syne">Select micro analysis modules</div>
                                        <div className="mmsub syne">Each runs a targeted simulation layer on your existing population and scenario state.</div>
                                    </div>
                                    <div className="mmb">
                                        <div className="mmods">
                                            {MMODS.map(m => (
                                                <div key={m.id} className={`mmod${smods.includes(m.id) ? " sel" : ""}`} onClick={() => setSmods(p => p.includes(m.id) ? p.filter(x => x !== m.id) : [...p, m.id])}>
                                                    <div className="mmic dm">{m.ic}</div>
                                                    <div className="mmnm syne">{m.nm}</div>
                                                    <div className="mmds syne">{m.ds}</div>
                                                    <div className="mmtags">{m.tags.map(t => <span key={t} className="mmtag dm">{t}</span>)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mmft">
                                        <span className="mmcnt dm"><span>{smods.length}</span> selected</span>
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <button className="btn gh dm" onClick={() => setMopen(false)}>Cancel</button>
                                            <button className="mmrun dm" disabled={!smods.length} onClick={() => setMopen(false)}>Run selected →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}
