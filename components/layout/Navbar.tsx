"use client";
import Link from "next/link";
import { ChevronDown, Gem, Menu, Nfc, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createWhatsAppLink, quoteMessage } from "@/lib/whatsapp";

const links = [{name:"Home",href:"/"},{name:"Services",href:"/#services"},{name:"Portfolio",href:"/#portfolio"},{name:"About",href:"/about"},{name:"Contact",href:"/contact"}];
const marketing = [{name:"Jewellery Marketing",href:"/jewellery-social-media-management",description:"Social content for jewellery brands",icon:Gem},{name:"NFC Smart Reviews",href:"/smart-reviews",description:"Tap. Scan. Share genuine feedback.",icon:Nfc}];
const linkClass = "rounded-lg text-sm font-medium text-zinc-300 transition hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-yellow-300 focus-visible:outline-offset-4";

export default function Navbar() {
  const [open,setOpen] = useState(false);
  const [expanded,setExpanded] = useState(false);
  const header = useRef<HTMLElement>(null);
  const desktopButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const outside = (event:PointerEvent) => { if (!header.current?.contains(event.target as Node)) { setOpen(false); setExpanded(false); } };
    const escape = (event:KeyboardEvent) => {
      if(event.key !== "Escape") return;
      if(expanded) { setExpanded(false); (open ? mobileButton : desktopButton).current?.focus(); }
      else if(open) { setOpen(false); header.current?.querySelector<HTMLButtonElement>("#navigation-toggle")?.focus(); }
    };
    document.addEventListener("pointerdown",outside); document.addEventListener("keydown",escape);
    return () => { document.removeEventListener("pointerdown",outside); document.removeEventListener("keydown",escape); };
  },[open,expanded]);
  const close = () => {setOpen(false);setExpanded(false);};
  return <header ref={header} className="fixed left-0 top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between gap-4">
      <Link href="/" aria-label="Arvik Digital home" className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="h-15 w-15 rounded-xl object-contain"/><div className="leading-none"><span className="text-lg font-black tracking-[.18em] text-white">ARVIK</span><p className="mt-1 text-xs font-bold tracking-[.3em] text-yellow-300">DIGITAL</p></div>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
        {links.slice(0,2).map(link=><a key={link.name} href={link.href} className={linkClass}>{link.name}</a>)}
        <div className="relative" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setExpanded(false);}}>
          <button ref={desktopButton} type="button" aria-expanded={expanded} aria-controls="desktop-marketing" onClick={()=>setExpanded(value=>!value)} className="marketing-highlight flex items-center gap-2 rounded-full border border-yellow-300/35 px-4 py-2 text-sm font-bold text-yellow-200 focus-visible:outline-2 focus-visible:outline-yellow-300 focus-visible:outline-offset-4"><Sparkles size={15} aria-hidden="true"/>Marketing<ChevronDown size={15} aria-hidden="true" className={expanded?"rotate-180":""}/></button>
          {expanded&&<div id="desktop-marketing" className="absolute left-0 top-full mt-3 w-80 rounded-2xl border border-yellow-300/20 bg-zinc-950 p-2 shadow-2xl shadow-black/60">{marketing.map(({name,href,description,icon:Icon})=><a key={href} href={href} onClick={close} className="flex gap-3 rounded-xl p-4 hover:bg-yellow-300/10 focus-visible:bg-yellow-300/10 focus-visible:outline-2 focus-visible:outline-yellow-300"><Icon size={22} className="shrink-0 text-yellow-300" aria-hidden="true"/><span><span className="block text-sm font-bold">{name}</span><span className="mt-1 block text-xs leading-5 text-zinc-400">{description}</span></span></a>)}</div>}
        </div>
        {links.slice(2).map(link=><a key={link.name} href={link.href} className={linkClass}>{link.name}</a>)}
      </nav>
      <a href={createWhatsAppLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="hidden rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 text-sm font-bold text-black xl:inline-flex">Get Quote</a>
      <button id="navigation-toggle" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>{setOpen(value=>!value);setExpanded(false);}} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 xl:hidden">{open?<X size={20}/>:<Menu size={20}/>}</button>
    </div>
    {open&&<nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-zinc-950 px-5 py-6 xl:hidden"><div className="flex flex-col gap-5">
      {links.slice(0,2).map(link=><a key={link.name} href={link.href} onClick={close} className={linkClass}>{link.name}</a>)}
      <div><button ref={mobileButton} type="button" aria-expanded={expanded} aria-controls="mobile-marketing" onClick={()=>setExpanded(value=>!value)} className="marketing-highlight flex w-full items-center gap-2 rounded-xl border border-yellow-300/35 px-4 py-3 font-bold text-yellow-200"><Sparkles size={16} aria-hidden="true"/>Marketing<ChevronDown size={16} aria-hidden="true" className={`ml-auto ${expanded?"rotate-180":""}`}/></button>
      {expanded&&<div id="mobile-marketing" className="mt-2 space-y-1 border-l border-yellow-300/25 pl-4">{marketing.map(({name,href,icon:Icon})=><a key={href} href={href} onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-yellow-300"><Icon size={18} aria-hidden="true"/>{name}</a>)}</div>}</div>
      {links.slice(2).map(link=><a key={link.name} href={link.href} onClick={close} className={linkClass}>{link.name}</a>)}
      <a href={createWhatsAppLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 text-center font-bold text-black">Get Quote</a>
    </div></nav>}
  </header>;
}
