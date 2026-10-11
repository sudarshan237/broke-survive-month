import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const budget=10000,daysLeft=18,spent=4380;
function App(){
 const [tab,setTab]=useState("Overview");
 const [amount,setAmount]=useState("");
 const [name,setName]=useState("");
 const [applied,setApplied]=useState(0);
 const remaining=budget-spent-applied;
 const allowance=Math.max(0,Math.floor(remaining/daysLeft));
 const health=Math.max(0,Math.min(100,Math.round(100-(spent+applied)/budget*45+allowance/10)));
 const risk=remaining<2000?"High":remaining<3500?"Medium":"Low";
 const preview=Number(amount)||0;
 const after=Math.max(0,remaining-preview);
 const afterAllowance=Math.floor(after/daysLeft);
 return <div className="app">
  <header><div><span className="eyebrow">30-DAY MONEY SURVIVAL</span><h1>Broke But Functional</h1><p>₹10,000. One month. Make every rupee count.</p></div><div className="score"><b>{health}</b><span>Health</span></div></header>
  <nav>{["Overview","What If?","Activity"].map(x=><button className={tab===x?"active":""} onClick={()=>setTab(x)} key={x}>{x}</button>)}</nav>
  {tab==="Overview"&&<main>
   <section className="hero"><div><span>Remaining balance</span><strong>₹{remaining.toLocaleString()}</strong><small>of ₹10,000 starting budget</small></div><div className="risk"><span>Risk</span><b>{risk}</b></div></section>
   <div className="grid"><article><span>Safe to spend / day</span><strong>₹{allowance}</strong><small>{daysLeft} days left</small></article><article><span>Already spent</span><strong>₹{(spent+applied).toLocaleString()}</strong><small>{Math.round((spent+applied)/budget*100)}% of budget</small></article><article><span>Savings target</span><strong>₹2,000</strong><small>Keep this protected</small></article></div>
   <section className="panel"><h2>Money plan</h2><div className="bar"><i style={{width:`${Math.min(100,(spent+applied)/budget*100)}%`}}/></div><div className="row"><span>Spent</span><b>₹{(spent+applied).toLocaleString()}</b></div><div className="row"><span>Remaining</span><b>₹{remaining.toLocaleString()}</b></div></section>
  </main>}
  {tab==="What If?"&&<main><section className="panel"><h2>What if I buy it?</h2><p className="muted">Simulate first. Apply only when you're sure.</p><input placeholder="What are you buying?" value={name} onChange={e=>setName(e.target.value)}/><input type="number" placeholder="Amount ₹" value={amount} onChange={e=>setAmount(e.target.value)}/><div className="compare"><div><span>Current</span><b>₹{remaining.toLocaleString()}</b><small>₹{allowance}/day</small></div><div><span>After purchase</span><b>₹{after.toLocaleString()}</b><small>₹{afterAllowance}/day</small></div></div><button className="apply" disabled={!preview||preview>remaining} onClick={()=>{setApplied(applied+preview);setAmount("");setName("")}}>Apply Purchase</button></section></main>}
  {tab==="Activity"&&<main><section className="panel"><h2>Recent activity</h2><div className="row"><span>Food & essentials</span><b>₹2,180</b></div><div className="row"><span>Transport</span><b>₹900</b></div><div className="row"><span>Entertainment</span><b>₹700</b></div><div className="row"><span>Subscriptions</span><b>₹600</b></div></section></main>}
  <footer>Built for the month you need your money to last.</footer>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);