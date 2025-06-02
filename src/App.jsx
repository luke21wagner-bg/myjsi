import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f6f5f3] text-neutral-800 font-sans px-4 py-6">
      <header className="mb-6 text-center">
        <img src="/favicon.svg" alt="JSI Logo" className="mx-auto h-12 mb-2" />
        <h1 className="text-2xl font-bold">Welcome to MyJSI</h1>
        <p className="text-sm text-neutral-500">Your sales tools, wherever you go.</p>
      </header>

      <div className="grid gap-4">
        <button className="bg-white rounded-xl p-4 shadow text-left">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-sm text-neutral-500">Track NESD, lead times, and active POs</p>
        </button>
        <button className="bg-white rounded-xl p-4 shadow text-left">
          <h2 className="text-lg font-semibold">Sales</h2>
          <p className="text-sm text-neutral-500">Rewards, booking goals, and rep analytics</p>
        </button>
        <button className="bg-white rounded-xl p-4 shadow text-left">
          <h2 className="text-lg font-semibold">Resources</h2>
          <p className="text-sm text-neutral-500">Contracts, sample discounts, and docs</p>
        </button>
        <button className="bg-white rounded-xl p-4 shadow text-left">
          <h2 className="text-lg font-semibold">Dealer Directory</h2>
          <p className="text-sm text-neutral-500">View and manage all JSI dealers</p>
        </button>
      </div>
    </div>
  );
}

export default App;
