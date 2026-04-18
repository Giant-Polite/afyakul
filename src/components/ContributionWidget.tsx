'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

// This tells TypeScript what "pockets" (props) the widget has
interface ContributionWidgetProps {
  onContributionSuccess: () => Promise<void>;
}

export default function ContributionWidget({ onContributionSuccess }: ContributionWidgetProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContribute = async () => {
    if (!amount || isNaN(Number(amount))) return alert("Enter a valid amount");
    
    setLoading(true);
    try {
      // 1. Connect to MetaMask
      if (!window.ethereum) throw new Error("No crypto wallet found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 2. Point to your Smart Contract
      // Replace with your actual Pool Address from the deployment terminal if different
      const POOL_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      
      // 3. Send the Transaction
      const tx = await signer.sendTransaction({
        to: POOL_ADDRESS,
        value: ethers.parseEther(amount)
      });

      console.log("Transaction sent!", tx.hash);
      await tx.wait(); // Wait for the blockchain to confirm
      
      alert(`Alhamdulillah! Contribution of ${amount} ETH successful.`);
      setAmount('');
      
      // 4. Tell the main page to refresh the balance
      await onContributionSuccess();
      
    } catch (error: any) {
      console.error("Contribution failed:", error);
      alert("Transaction failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
      <h3 className="text-white font-bold mb-4">Make a Contribution</h3>
      
      <div className="relative mb-4">
        <input 
          type="text" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
        />
        <span className="absolute right-4 top-3 text-slate-500 font-bold">ETH</span>
      </div>

      <button 
        onClick={handleContribute}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-slate-900 transition-all ${
          loading 
            ? "bg-slate-700 cursor-not-allowed" 
            : "bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)] active:scale-95"
        }`}
      >
        {loading ? "Processing..." : "Contribute (Tabarru')"}
      </button>

      <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest">
        Funds are locked in the community smart contract.
      </p>
    </div>
  );
}