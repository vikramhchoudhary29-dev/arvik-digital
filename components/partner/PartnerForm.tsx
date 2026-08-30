"use client";
import { useState } from "react";
const initial = { name:"", email:"", phone:"", socialProfile:"", city:"", upiId:"", message:"" };
export default function PartnerForm() {
 const [form,setForm]=useState(initial); const [loading,setLoading]=useState(false); const [result,setResult]=useState<string | null>(null);
 const update=(key:string,value:string)=>setForm(p=>({...p,[key]:value}));
 async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setResult(null);try{const r=await fetch('/api/partner',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const d=await r.json();if(!r.ok) throw new Error(d.error||'Something went wrong.');setResult('Application submitted successfully! We will review your profile and contact you soon.');setForm(initial)}catch(err){setResult(err instanceof Error?err.message:'Something went wrong.')}finally{setLoading(false)}}
 return <form onSubmit={submit} className="rounded-[32px] border border-yellow-400/20 bg-black/50 p-6 shadow-2xl backdrop-blur-xl md:p-8">
  <div className="mb-7"><p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Join the program</p><h2 className="mt-2 text-3xl font-black">Become an Arvik Partner</h2></div>
  <div className="grid gap-4 md:grid-cols-2"><Field label="Full Name *" value={form.name} onChange={v=>update('name',v)} required/><Field label="Email Address *" type="email" value={form.email} onChange={v=>update('email',v)} required/><Field label="Phone Number *" value={form.phone} onChange={v=>update('phone',v)} required/><Field label="City" value={form.city} onChange={v=>update('city',v)}/><Field label="Instagram / Social Profile" value={form.socialProfile} onChange={v=>update('socialProfile',v)}/><Field label="UPI ID (for commission payout)" value={form.upiId} onChange={v=>update('upiId',v)}/></div>
  <textarea value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Tell us why you want to partner with Arvik Digital..." rows={4} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white outline-none placeholder:text-zinc-500 focus:border-yellow-300/50" />
  {result&&<p className={`mt-4 rounded-xl border p-4 text-sm ${result.startsWith('Application')?'border-green-400/30 bg-green-400/10 text-green-200':'border-red-400/30 bg-red-400/10 text-red-200'}`}>{result}</p>}
  <button disabled={loading} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-6 py-4 font-black text-black transition hover:scale-[1.01] disabled:opacity-60">{loading?'Submitting...':'Apply to Become a Partner'}</button>
 </form>
}
function Field({label,value,onChange,type='text',required=false}:{label:string;value:string;onChange:(v:string)=>void;type?:string;required?:boolean}){return <div><label className="mb-2 block text-sm font-semibold text-zinc-300">{label}</label><input type={type} required={required} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none placeholder:text-zinc-500 focus:border-yellow-300/50"/></div>}
