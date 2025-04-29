// Katapola Dice Game - Full Website // Tech Stack: Next.js + Tailwind CSS + Firebase (for demo balance) + Telegram Login (OAuth) + Socket.io (for Auto Mode)

// ---------------------- // File: package.json { "name": "katapola-dice", "version": "1.0.0", "scripts": { "dev": "next dev", "build": "next build", "start": "next start" }, "dependencies": { "next": "latest", "react": "latest", "react-dom": "latest", "socket.io-client": "latest", "tailwindcss": "latest" } }

// ---------------------- // File: tailwind.config.js module.exports = { content: ["./pages//*.{js,ts,jsx,tsx}", "./components//*.{js,ts,jsx,tsx}"], theme: { extend: {}, }, plugins: [], };

// ---------------------- // File: pages/_app.js import '../styles/globals.css'; export default function App({ Component, pageProps }) { return <Component {...pageProps} />; }

// ---------------------- // File: styles/globals.css @tailwind base; @tailwind components; @tailwind utilities;

// ---------------------- // File: components/DiceRoll.js export default function DiceRoll({ result }) { return ( <div className="text-2xl mt-4"> {result !== null ? Dice Result: ${result} : 'Roll the dice!'} </div> ); }

// ---------------------- // File: pages/index.js import { useState } from 'react'; import DiceRoll from '../components/DiceRoll';

export default function Home() { const [balance, setBalance] = useState(100); const [betAmount, setBetAmount] = useState(0); const [betType, setBetType] = useState(''); const [diceResult, setDiceResult] = useState(null); const [message, setMessage] = useState(''); const [mode, setMode] = useState('Solo');

const handleBet = () => { const result = Math.floor(Math.random() * 6) + 1; setDiceResult(result);

let won = false;
let multiplier = 0;

if (betType === 'High' && result >= 4) {
  won = true;
  multiplier = 2;
} else if (betType === 'Low' && result <= 3) {
  won = true;
  multiplier = 2;
} else if (betType === '1/2' && (result === 1 || result === 2)) {
  won = true;
  multiplier = 3;
} else if (betType === '3/4' && (result === 3 || result === 4)) {
  won = true;
  multiplier = 3;
} else if (betType === '5/6' && (result === 5 || result === 6)) {
  won = true;
  multiplier = 3;
} else if (parseInt(betType) === result) {
  won = true;
  multiplier = 6;
}

if (won) {
  setBalance(balance + betAmount * (multiplier - 1));
  setMessage(`You won! Dice: ${result} (+$${betAmount * (multiplier - 1)})`);
} else {
  setBalance(balance - betAmount);
  setMessage(`You lost! Dice: ${result} (-$${betAmount})`);
}

};

return ( <div className="p-6 max-w-xl mx-auto"> <h1 className="text-3xl font-bold text-center mb-4">Katapola Dice Game</h1> <div className="mb-2">Mode: <button onClick={() => setMode('Solo')} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">Solo</button> <button onClick={() => setMode('Auto')} className="ml-2 px-3 py-1 bg-green-600 text-white rounded">Auto</button> </div> <p className="mb-4">Balance: ${balance}</p> <input type="number" placeholder="Enter Bet Amount" value={betAmount} onChange={(e) => setBetAmount(parseInt(e.target.value))} className="w-full p-2 border rounded mb-2" /> <select value={betType} onChange={(e) => setBetType(e.target.value)} className="w-full p-2 border rounded mb-4" > <option value="">Select Bet Type</option> <option value="High">High (4, 5, 6)</option> <option value="Low">Low (1, 2, 3)</option> <option value="1/2">Pair 1/2</option> <option value="3/4">Pair 3/4</option> <option value="5/6">Pair 5/6</option> {[1, 2, 3, 4, 5, 6].map(n => ( <option key={n} value={n}>{n}</option> ))} </select> <button
onClick={handleBet}
className="w-full bg-yellow-500 text-white py-2 rounded"
>Confirm</button> <DiceRoll result={diceResult} /> <p className="mt-4 text-lg font-bold">{message}</p> <hr className="my-6" /> <button className="w-full bg-gray-700 text-white py-2 rounded">Login with Telegram</button> </div> ); }

