'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [poolBalance, setPoolBalance] = useState("0.00");

  // Wallet Connection Logic
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
      } catch (error) { console.error(error); }
    } else { alert("Please install MetaMask!"); }
  };

  // Balance Fetching Logic
 const fetchBalance = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/pool/balance');
    
    // Check if the server actually sent a successful response
    if (!response.ok) throw new Error("Backend unreachable");
    
    const data = await response.json();
    setPoolBalance(data.balance);
  } catch (e) {
    console.error("Connection issue:", e);
    // Fallback to 0 so the UI doesn't crash
    setPoolBalance("0.00");
  }
};

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-emerald-500/30">
      
      {/* --- NAVIGATION --- */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900">A</div>
          <h1 className="text-xl font-bold text-white tracking-tighter uppercase">Afyakul</h1>
        </div>
        <button onClick={connectWallet} className="bg-emerald-500 text-slate-900 px-5 py-2 rounded-full font-bold text-xs hover:bg-emerald-400 transition-all uppercase tracking-widest">
          {wallet ? `${wallet.substring(0,6)}...${wallet.substring(38)}` : "Connect Wallet"}
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.3em] mb-6">Our Ecosystem</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          The Future of <span className="text-emerald-500 text-glow">Ethical Finance</span>
        </h1>
        <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
          Afyakul is designed for ethical and inclusive growth. Experience a community-led system that protects what matters most.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-emerald-500 text-slate-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform uppercase text-sm">
            Login / Register Dashboard
          </button>
          <button className="border border-slate-700 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-900 transition-all uppercase text-sm">
            Join DAO Platform
          </button>
        </div>
      </section>

      {/* --- PRODUCTS & SERVICES (The "Pillars") --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Core Ecosystem</h2>
          <p className="text-slate-500 italic">Three foundational pillars working in harmony.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard 
            title="Afyasure" 
            desc="Decentralized community-owned insurance alternative built on trust and absolute transparency." 
            icon="🛡️" 
          />
          <ProductCard 
            title="Afyamarket" 
            desc="Yield-generating savings and Shariah-compliant investment opportunities for sustainable growth." 
            icon="📈" 
          />
          <ProductCard 
            title="Afyakul Governance" 
            desc="Governance and community empowerment through our decentralized autonomous organization." 
            icon="⚖️" 
          />
        </div>
      </section>

      {/* --- REDESIGNED AFYADAO PROTOCOL SECTION --- */}
      <section className="bg-slate-900/20 py-24 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN: DAO Benefits as Stacked Cards */}
          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Live Product</h2>
              <h3 className="text-4xl font-bold text-white mb-8 tracking-tight">AfyaDAO Protocol</h3>
              <p className="text-slate-400 mb-12 leading-relaxed max-w-lg">Our comprehensive, community-governed solution for ethical health and asset protection.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <DAOFeatureCard 
                title="Afya Protection Benefit" 
                desc="Fast, compassionate financial support through smart-contract execution." 
                icon="🩸" // Heart/Life blood symbol
              />
              <DAOFeatureCard 
                title="The AfyaCard" 
                desc="The first crypto-to-fiat debit card powered by community ownership." 
                icon="💳" // Debit Card symbol
              />
              <DAOFeatureCard 
                title="Collective Investment Pools" 
                desc="Shariah-compliant opportunities managed for sustainable community growth." 
                icon="🤝" // Handshake/Community symbol
              />
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE DASHBOARD WIDGET */}
          <div className="bg-slate-900 border border-emerald-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group lg:sticky lg:top-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Protocol Health</h4>
            <div className="text-6xl font-bold text-white mb-4">
               {poolBalance} <span className="text-emerald-500 text-2xl font-medium">ETH</span>
            </div>
            <p className="text-slate-500 text-sm mb-8">100% Transparent. No Riba. Real-time Blockchain Audit enabled.</p>
            <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all border border-slate-700">
              Enter Protocol Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS FOOTER --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800/30">
        <StatItem label="Total Members" value="953" />
        <StatItem label="Pool Assets" value={`$${(parseFloat(poolBalance) * 3200).toLocaleString()}k`} />
        <StatItem label="H/W Exposure" value="208" />
        <StatItem label="Active Coverage" value="414" />
      </section>

      <footer className="py-10 text-center text-slate-600 text-[10px] uppercase tracking-[0.4em]">
        &copy; 2026 Afyakul Protocol. All Rights Reserved.
      </footer>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </main>
  );
}

// Sub-Components

// Product Card (Original layout with Left Border)
function ProductCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="p-8 border-l border-emerald-500/20 hover:bg-slate-900/50 transition-all group">
      <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// DAO Feature Card (New Vertical Box layout to match original requirement)
function DAOFeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="flex gap-6 p-6 border border-slate-800/50 rounded-2xl bg-slate-900/10 hover:border-emerald-500/30 hover:bg-slate-900/50 transition-all group">
      <div className="text-3xl grayscale group-hover:grayscale-0 transition-all mt-1">{icon}</div>
      <div>
        <h5 className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{title}</h5>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center p-6 border border-slate-800/50 rounded-3xl bg-slate-900/10 hover:border-slate-700 transition-all">
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{label}</div>
    </div>
  );
}